import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import {
    getUserLevel,
    addPoints,
    initializeGamification,
    updateStreak,
} from '@/src/services/gamification';
import { levelDefinitions } from '@/src/data/gamification';
import type { UserLevel, ActionType } from '@/src/types/gamification';

// Types
interface GamificationContextType {
    userLevel: UserLevel | null;
    isPremium: boolean;
    // Actions
    awardPoints: (action: ActionType, metadata?: Record<string, unknown>) => Promise<AwardResult>;
    refreshUserLevel: () => void;
    // Feedback state
    showToast: boolean;
    toastData: ToastData | null;
    showLevelUp: boolean;
    levelUpData: LevelUpData | null;
    // Dismiss
    dismissToast: () => void;
    dismissLevelUp: () => void;
}

interface ToastData {
    points: number;
    message: string;
}

interface LevelUpData {
    newLevel: number;
    levelName: string;
    levelBadge: string;
    benefits: string[];
    bonusPoints: number;
}

interface AwardResult {
    success: boolean;
    points: number;
    levelUp: boolean;
}

// Context
const GamificationContext = createContext<GamificationContextType | null>(null);

// Hook
export const useGamification = () => {
    const context = useContext(GamificationContext);
    if (!context) {
        throw new Error('useGamification must be used within a GamificationProvider');
    }
    return context;
};

// Action labels for toast messages
const actionLabels: Record<ActionType, string> = {
    registrar_vacina: 'Vacina registrada!',
    agendar_consulta: 'Consulta agendada!',
    comparecer_consulta: 'Check-in realizado!',
    ler_dica: 'Dica lida!',
    doar_abrigo: 'Doação para abrigo!',
    marcar_banho: 'Banho agendado!',
    avaliar_servico: 'Avaliação enviada!',
    indicar_amigo: 'Amigo indicado!',
    adicionar_pet: 'Pet adicionado!',
    completar_perfil: 'Perfil completado!',
    assistir_video: 'Vídeo assistido!',
    participar_forum: 'Participação no fórum!',
    reportar_abandono: 'Denúncia registrada!',
    atualizar_peso: 'Peso atualizado!',
    criar_alerta_medicamento: 'Alerta criado!',
};

// Provider
interface GamificationProviderProps {
    children: ReactNode;
    isPremium?: boolean;
}

export const GamificationProvider: React.FC<GamificationProviderProps> = ({
    children,
    isPremium = false,
}) => {
    const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastData, setToastData] = useState<ToastData | null>(null);
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [levelUpData, setLevelUpData] = useState<LevelUpData | null>(null);

    // Initialize on mount
    useEffect(() => {
        const init = async () => {
            await initializeGamification();
            const level = await getUserLevel();
            setUserLevel(level);
            await updateStreak();
        };
        init();
    }, []);

    // Refresh user level
    const refreshUserLevel = useCallback(async () => {
        const level = await getUserLevel();
        setUserLevel(level);
    }, []);

    // Award points for an action
    const awardPoints = useCallback(async (
        action: ActionType,
        metadata: Record<string, unknown> = {}
    ): Promise<AwardResult> => {
        const result = await addPoints(action, metadata, isPremium);

        if (result.success && result.points > 0) {
            // Show toast
            setToastData({
                points: result.points,
                message: actionLabels[action] || 'Patinhas ganhas!',
            });
            setShowToast(true);

            // If level up, show level up modal after toast
            if (result.levelUp && result.newLevel) {
                const newLevelDef = levelDefinitions.find(l => l.level === result.newLevel);
                if (newLevelDef) {
                    // Delay level up modal until toast finishes
                    setTimeout(() => {
                        setLevelUpData({
                            newLevel: result.newLevel!,
                            levelName: newLevelDef.name,
                            levelBadge: newLevelDef.badge,
                            benefits: newLevelDef.benefits,
                            bonusPoints: 100, // Level up bonus
                        });
                        setShowLevelUp(true);
                    }, 2500);
                }
            }

            // Refresh user level
            refreshUserLevel();
        }

        return result;
    }, [isPremium, refreshUserLevel]);

    // Dismiss handlers
    const dismissToast = useCallback(() => {
        setShowToast(false);
        setToastData(null);
    }, []);

    const dismissLevelUp = useCallback(() => {
        setShowLevelUp(false);
        setLevelUpData(null);
    }, []);

    const value: GamificationContextType = {
        userLevel,
        isPremium,
        awardPoints,
        refreshUserLevel,
        showToast,
        toastData,
        showLevelUp,
        levelUpData,
        dismissToast,
        dismissLevelUp,
    };

    return (
        <GamificationContext.Provider value={value}>
            {children}
        </GamificationContext.Provider>
    );
};

export default GamificationContext;
