import React from 'react';
import { useGamification } from '@/src/contexts/GamificationContext';
import { PointsToast, LevelUpModal } from '@/src/components/gamification';

const GamificationFeedback: React.FC = () => {
    const {
        showToast,
        toastData,
        showLevelUp,
        levelUpData,
        dismissToast,
        dismissLevelUp,
    } = useGamification();

    return (
        <>
            {/* Points Toast */}
            <PointsToast
                isVisible={showToast}
                points={toastData?.points || 0}
                message={toastData?.message || 'Patinhas ganhas!'}
                onComplete={dismissToast}
            />

            {/* Level Up Modal */}
            <LevelUpModal
                isVisible={showLevelUp}
                newLevel={levelUpData?.newLevel || 0}
                levelName={levelUpData?.levelName || ''}
                levelBadge={levelUpData?.levelBadge || '🐾'}
                benefits={levelUpData?.benefits || []}
                bonusPoints={levelUpData?.bonusPoints || 0}
                onClose={dismissLevelUp}
            />
        </>
    );
};

export default GamificationFeedback;
