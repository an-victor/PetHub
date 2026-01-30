// PetHub Gamification System - Type Definitions

// ============================================
// PONTUAÇÃO (PET Score / Patinhas 🐾)
// ============================================

export type ActionType =
    | 'registrar_vacina'
    | 'agendar_consulta'
    | 'comparecer_consulta'
    | 'ler_dica'
    | 'doar_abrigo'
    | 'marcar_banho'
    | 'avaliar_servico'
    | 'indicar_amigo'
    | 'adicionar_pet'
    | 'completar_perfil'
    | 'assistir_video'
    | 'participar_forum'
    | 'reportar_abandono'
    | 'atualizar_peso'
    | 'criar_alerta_medicamento';

export interface ActionPoints {
    action: ActionType;
    freePoints: number;
    premiumPoints: number;
    frequencyLimit: string;
    proofRequired: string;
    cooldownDays: number;
}

export interface PointTransaction {
    id: string;
    userId: string;
    action: ActionType;
    points: number;
    multiplier: number;
    validated: boolean;
    metadata: {
        photoUrl?: string;
        location?: { lat: number; lng: number };
        deviceId?: string;
        timestamp: string;
        clinicId?: string;
        petId?: string;
    };
    createdAt: string;
    status: 'pending' | 'validated' | 'rejected';
    rejectionReason?: string;
}

// ============================================
// NÍVEIS E PROGRESSÃO
// ============================================

export type LevelName =
    | 'Filhote'
    | 'Adulto I'
    | 'Adulto II'
    | 'Sênior I'
    | 'Sênior II'
    | 'Pet Lenda';

export interface LevelDefinition {
    level: number;
    name: LevelName;
    pointsRequired: number;
    benefits: string[];
    badge: string;
}

export interface UserLevel {
    userId: string;
    currentLevel: number;
    levelName: LevelName;
    totalPoints: number;
    availablePoints: number;
    spentPoints: number;
    pointsToNextLevel: number;
    progressPercent: number;
    lastLevelUpAt: string | null;
    streakDays: number;
    lastActivityAt: string;
}

// ============================================
// MISSÕES
// ============================================

export type MissionDifficulty = 1 | 2 | 3 | 4 | 5;
export type MissionType = 'permanent' | 'seasonal';
export type MissionCategory = 'health' | 'social' | 'donation' | 'education' | 'care';

export interface Mission {
    id: string;
    name: string;
    description: string;
    type: MissionType;
    category: MissionCategory;
    difficulty: MissionDifficulty;
    requirements: MissionRequirement[];
    freeReward: MissionReward;
    premiumReward: MissionReward;
    icon: string;
    isPremiumOnly: boolean;
    seasonStartDate?: string;
    seasonEndDate?: string;
}

export interface MissionRequirement {
    action: ActionType | string;
    count: number;
    description: string;
}

export interface MissionReward {
    points: number;
    badgeId?: string;
    prize?: string;
    discountPercent?: number;
}

export interface UserMission {
    id: string;
    missionId: string;
    userId: string;
    progress: MissionProgress[];
    startedAt: string;
    completedAt: string | null;
    rewardClaimed: boolean;
}

export interface MissionProgress {
    requirementIndex: number;
    currentCount: number;
    targetCount: number;
    completed: boolean;
}

// ============================================
// RECOMPENSAS / MARKETPLACE
// ============================================

export type RewardCategory = 'discount' | 'service' | 'product' | 'subscription' | 'donation' | 'experience';

export interface Reward {
    id: string;
    name: string;
    description: string;
    category: RewardCategory;
    pointsCost: number;
    monthlyStock: number;
    currentStock: number;
    minLevel: number;
    image: string;
    conditions: string;
    expiresAt?: string;
    isPremiumOnly?: boolean;
}

export interface RewardRedemption {
    id: string;
    userId: string;
    rewardId: string;
    pointsSpent: number;
    redeemedAt: string;
    status: 'pending' | 'fulfilled' | 'expired';
    code?: string;
}

// ============================================
// BADGES / CONQUISTAS
// ============================================

export type BadgeCategory = 'health' | 'social' | 'donation' | 'streak' | 'special' | 'level';

export interface Badge {
    id: string;
    name: string;
    description: string;
    category: BadgeCategory;
    icon: string;
    requirement: string;
    pointsAwarded: number;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserBadge {
    badgeId: string;
    userId: string;
    earnedAt: string;
    displayed: boolean;
}

// ============================================
// EVENTOS SAZONAIS
// ============================================

export interface SeasonalEvent {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    missions: string[];
    collectiveGoal?: {
        target: number;
        current: number;
        prize: string;
    };
    banner: string;
    theme: string;
}

// ============================================
// RANKING / LEADERBOARD
// ============================================

export type LeaderboardScope = 'city' | 'state' | 'global' | 'weekly';

export interface LeaderboardEntry {
    rank: number;
    userId: string;
    userName: string;
    userAvatar: string;
    level: number;
    levelName: LevelName;
    points: number;
    badges: string[];
}

// ============================================
// SISTEMA ANTI-FRAUDE
// ============================================

export type UserReputation = 'novato' | 'confiavel' | 'verificado' | 'embaixador';

export interface UserReputationData {
    userId: string;
    reputation: UserReputation;
    validActionsCount: number;
    reportedCount: number;
    pointsPenaltyPercent: number;
    isSuspended: boolean;
    suspendedUntil?: string;
}

export interface ActionValidation {
    isValid: boolean;
    reason?: string;
    confidence: number;
    warnings: string[];
}

// ============================================
// ESTADO GLOBAL DA GAMIFICAÇÃO
// ============================================

export interface GamificationState {
    userLevel: UserLevel;
    activeMissions: UserMission[];
    earnedBadges: UserBadge[];
    reputation: UserReputationData;
    isPremium: boolean;
    currentEvent: SeasonalEvent | null;
    recentTransactions: PointTransaction[];
}
