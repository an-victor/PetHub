import { supabase } from './supabase';
import type {
    ActionType,
    UserLevel,
    PointTransaction,
    Mission,
    UserMission,
    Reward,
    Badge, // Added missing type
    UserBadge,
    ActionValidation,
    LeaderboardEntry,
    LeaderboardScope,
    GamificationState
} from '../types/gamification';

import {
    levelDefinitions,
    actionPointsTable,
    permanentMissions,
    rewards,
    badges,
    currentUserLevel,
    currentUserMissions,
    recentTransactions,
    getLevelByPoints,
    getNextLevel,
    getActionPoints,
} from '../data/gamification';

// ============================================
// CONSTANTS
// ============================================

const STREAK_BONUS_DAYS = 7;
const STREAK_BONUS_POINTS = 50;
const LEVEL_UP_BONUS = 100;

// ============================================
// USER LEVEL FUNCTIONS (SUPABASE)
// ============================================

/**
 * Fetch the current user profile (Level, Points) from Supabase.
 * Falls back to local constants/state if offline or error,
 * but emphasizes the DB as the source of truth.
 */
export const getUserLevel = async (userId?: string): Promise<UserLevel> => {
    // If no userId provided, try to get from current session
    if (!userId) {
        const { data: { session } } = await supabase.auth.getSession();
        userId = session?.user?.id;
    }

    if (!userId) {
        // Fallback for unauthenticated/demo mode
        return currentUserLevel;
    }

    const { data, error } = await supabase
        .from('gamification_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error || !data) {
        console.warn('Error fetching user level from DB, using fallback', error);
        return {
            ...currentUserLevel,
            userId: userId
        };
    }

    // Map DB columns to Frontend Model
    return {
        userId: data.user_id,
        currentLevel: data.level,
        levelName: data.level_name,
        totalPoints: data.total_points,
        availablePoints: data.available_points,
        spentPoints: data.spent_points,
        streakDays: data.streak_days,
        lastActivityAt: data.last_activity_at,
        lastLevelUpAt: data.last_level_up_at,
        // Calculated fields needed for UI
        pointsToNextLevel: calculatePointsToNext(data.total_points),
        progressPercent: calculateProgress(data.total_points),
    };
};

// Utilities for frontend calculation (since DB stores raw totals)
const calculatePointsToNext = (totalPoints: number): number => {
    const currentDef = getLevelByPoints(totalPoints);
    const nextDef = getNextLevel(currentDef.level);
    if (!nextDef) return 0;
    return nextDef.pointsRequired - totalPoints;
};

const calculateProgress = (totalPoints: number): number => {
    const currentDef = getLevelByPoints(totalPoints);
    const nextDef = getNextLevel(currentDef.level);
    if (!nextDef) return 100;

    const pointsInLevel = totalPoints - currentDef.pointsRequired;
    const required = nextDef.pointsRequired - currentDef.pointsRequired;
    return Math.min(100, Math.floor((pointsInLevel / required) * 100));
};

// ============================================
// POINTS FUNCTIONS (SUPABASE TRANSACTIONS)
// ============================================

/**
 * Add points by creating a secure transaction in Supabase.
 * The DB trigger 'on_transaction_verified' will automatically update the User Profile.
 */
export const addPoints = async (
    action: ActionType,
    metadata: Partial<PointTransaction['metadata']> = {},
    isPremium: boolean = false
): Promise<{ success: boolean; points: number; levelUp: boolean; newLevel?: number }> => {

    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    if (!userId) {
        console.warn('User not logged in, points not saved to DB');
        return { success: false, points: 0, levelUp: false };
    }

    // 1. Validate on Client (Fast Feedback)
    const validation = validateAction(action, metadata);
    if (!validation.isValid) {
        return { success: false, points: 0, levelUp: false };
    }

    const basePoints = getActionPoints(action, isPremium);
    const points = Math.floor(basePoints * validation.confidence);

    if (points <= 0) return { success: false, points: 0, levelUp: false };

    // 2. Insert Transaction into Real DB
    const { data: txData, error } = await supabase
        .from('gamification_transactions')
        .insert({
            user_id: userId,
            action_id: action, // Ensure this matches gamification_actions.id
            points_awarded: points,
            status: 'validated', // In a stricter app, this might be 'pending'
            metadata: metadata
        })
        .select()
        .single();

    if (error) {
        console.error('Transaction Failed:', error);
        return { success: false, points: 0, levelUp: false };
    }

    // 3. Check Protocol for Level Up (Optimistic or Refetch)
    // We fetch the updated profile to see if a level up occurred
    const updatedProfile = await getUserLevel(userId);
    // Ideally compare with previous state if we had it, but for now:
    // We check if the level in DB matches what we expect from the new points

    // We can assume success if no error
    return {
        success: true,
        points: points,
        levelUp: false, // You might need a more sophisticated check here
        newLevel: updatedProfile.currentLevel
    };
};

export const spendPoints = async (amount: number): Promise<boolean> => {
    // Spending usually requires a secure function or a specific transaction type
    // For now, we stub it as a negative transaction if allowed, OR
    // we use a specific RPC call. 
    // Since we don't have the RPC setup for spending yet, we'll try a negative transaction
    // BUT our table might validation constraints.
    // Let's assume we can insert a 'redeem_reward' action with negative points?
    // Or better: update the profile directly via an Edge Function. 
    // Given the constraints, we will log a warning.
    console.warn("Spend Points requires Backend Implementation");
    return false;
};

export const getTransactionHistory = async (): Promise<PointTransaction[]> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return recentTransactions; // fallback

    const { data, error } = await supabase
        .from('gamification_transactions')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(50);

    if (error || !data) return recentTransactions;

    // Map to frontend type
    return data.map((tx: any) => ({
        id: tx.id,
        userId: tx.user_id,
        action: tx.action_id as ActionType,
        points: tx.points_awarded,
        multiplier: 1, // simplified
        validated: tx.status === 'validated',
        metadata: tx.metadata || {},
        createdAt: tx.created_at,
        status: tx.status
    }));
};

// ============================================
// STREAK FUNCTIONS
// ============================================

export const getLeaderboard = async (scope: LeaderboardScope = 'global'): Promise<LeaderboardEntry[]> => {
    // Mock implementation for now, should connect to Supabase view/RPC later
    return [
        { rank: 1, userId: '1', userName: 'Ana Souza', userAvatar: 'https://i.pravatar.cc/150?u=1', level: 12, levelName: 'Pet Lenda', points: 15400, badges: ['streak_30'] },
        { rank: 2, userId: '2', userName: 'Carlos Lima', userAvatar: 'https://i.pravatar.cc/150?u=2', level: 10, levelName: 'Adulto II', points: 12350, badges: [] },
        { rank: 3, userId: '3', userName: 'Beatriz Rocha', userAvatar: 'https://i.pravatar.cc/150?u=3', level: 9, levelName: 'Adulto I', points: 9800, badges: [] },
    ];
};

export const updateStreak = async (): Promise<{ streak: number; bonusAwarded: boolean }> => {
    // The DB profile has 'streak_days' and 'last_activity_at'.
    // We should ideally calculate this on the server (triggers), but here is a client check:
    const profile = await getUserLevel();
    return { streak: profile.streakDays, bonusAwarded: false };
};

// ============================================
// MISSION FUNCTIONS (Hybrid / Static)
// ============================================
// For Missions, since we haven't migrated the full schema, 
// we will keep using the local config matched against the DB transaction history.
// This is "Proof of Concept" level for Missions on DB.

export const getMissions = (): Mission[] => {
    return permanentMissions;
};

export const getUserMissions = (): UserMission[] => {
    return currentUserMissions; // Kept static/local for now
};

export const claimMissionReward = async (missionId: string, isPremium: boolean): Promise<{ success: boolean; points: number }> => {
    // This would become a transaction: action='mission_complete'
    // For now, mockup:
    return { success: true, points: 100 };
};

// ============================================
// REWARD FUNCTIONS
// ============================================

export const getRewards = (): Reward[] => rewards;

export const redeemReward = async (rewardId: string): Promise<{ success: boolean; code?: string; error?: string }> => {
    return { success: false, error: 'Database redemption not fully implemented yet' };
};

// ============================================
// BADGE FUNCTIONS
// ============================================

export const getBadges = (): Badge[] => badges;

export const getUserBadges = async (): Promise<UserBadge[]> => {
    // Could fetch from a 'user_badges' table
    return [];
};

// ============================================
// VALIDATION FUNCTIONS (Client Side)
// ============================================

export const validateAction = (
    action: ActionType,
    metadata: Partial<PointTransaction['metadata']>
): ActionValidation => {
    const actionDef = actionPointsTable.find(a => a.action === action);
    if (!actionDef) return { isValid: false, reason: 'Ação desconhecida', confidence: 0, warnings: [] };

    // Very basic checks
    return { isValid: true, confidence: 1, warnings: [] };
};

// ============================================
// INITIALIZATION
// ============================================

export const initializeGamification = async (): Promise<void> => {
    // Check auth
    const { data } = await supabase.auth.getSession();
    if (data.session) {
        console.log("Gamification Service: Online (Supabase)");
    } else {
        console.log("Gamification Service: Offline");
    }
};

