import React from 'react';

interface MissionCardProps {
    id: string;
    name: string;
    description: string;
    icon: string;
    difficulty: 1 | 2 | 3 | 4 | 5;
    currentProgress: number;
    targetProgress: number;
    reward: number;
    rewardPrize?: string;
    isCompleted?: boolean;
    isClaimed?: boolean;
    isPremium?: boolean;
    onClaim?: () => void;
    onClick?: () => void;
    size?: 'sm' | 'md';
    className?: string;
}

const MissionCard: React.FC<MissionCardProps> = ({
    name,
    description,
    icon,
    difficulty,
    currentProgress,
    targetProgress,
    reward,
    rewardPrize,
    isCompleted = false,
    isClaimed = false,
    isPremium = false,
    onClaim,
    onClick,
    size = 'md',
    className = '',
}) => {
    const progressPercent = Math.min(100, Math.floor((currentProgress / targetProgress) * 100));
    const canClaim = isCompleted && !isClaimed;

    const getDifficultyStars = () => {
        return Array(5).fill(0).map((_, i) => (
            <span key={i} className={`text-xs ${i < difficulty ? 'text-warning' : 'text-text-muted/30'}`}>
                ★
            </span>
        ));
    };

    if (size === 'sm') {
        return (
            <div
                onClick={onClick}
                className={`bg-surface rounded-xl p-3 shadow-soft flex items-center gap-3 cursor-pointer hover:shadow-soft-lg active:scale-[0.98] transition-all ${className}`}
            >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isCompleted ? 'bg-success/10' : 'bg-primary/10'
                    }`}>
                    <span className={`material-symbols-outlined text-lg ${isCompleted ? 'text-success' : 'text-primary'
                        }`}>
                        {icon}
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-text-primary font-semibold text-sm truncate">{name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all ${isCompleted ? 'bg-success' : 'bg-primary'
                                    }`}
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                        <span className="text-text-muted text-[10px]">{currentProgress}/{targetProgress}</span>
                    </div>
                </div>
                <span className="text-primary font-bold text-xs">+{reward} 🐾</span>
            </div>
        );
    }

    return (
        <div
            onClick={onClick}
            className={`bg-surface rounded-2xl shadow-soft overflow-hidden transition-all ${canClaim ? 'ring-2 ring-success' : ''
                } ${onClick ? 'cursor-pointer hover:shadow-soft-lg active:scale-[0.99]' : ''} ${className}`}
        >
            {/* Header */}
            <div className="p-4 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isClaimed
                        ? 'bg-text-muted/10'
                        : isCompleted
                            ? 'bg-success/10'
                            : 'bg-primary/10'
                    }`}>
                    <span className={`material-symbols-outlined text-xl ${isClaimed
                            ? 'text-text-muted'
                            : isCompleted
                                ? 'text-success'
                                : 'text-primary'
                        }`}>
                        {icon}
                    </span>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="text-text-primary font-bold truncate">{name}</h3>
                        {isPremium && (
                            <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                PREMIUM
                            </span>
                        )}
                    </div>
                    <p className="text-text-secondary text-sm mt-0.5 line-clamp-2">{description}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex">{getDifficultyStars()}</div>
                    </div>
                </div>
            </div>

            {/* Progress */}
            {!isClaimed && (
                <div className="px-4 pb-4">
                    <div className="bg-background rounded-xl p-3">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-text-secondary text-xs">
                                {currentProgress}/{targetProgress}
                            </span>
                            <span className="text-primary text-xs font-bold">{progressPercent}%</span>
                        </div>
                        <div className="h-2 bg-surface rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${isCompleted
                                        ? 'bg-success'
                                        : 'bg-gradient-to-r from-primary to-primary-light'
                                    }`}
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reward / Action */}
            <div className="bg-background/50 px-4 py-3 flex items-center justify-between border-t border-border">
                <div>
                    <span className="text-text-muted text-xs">Recompensa</span>
                    <div className="flex items-center gap-2">
                        <span className="text-primary font-bold">+{reward} 🐾</span>
                        {rewardPrize && (
                            <span className="text-text-secondary text-xs">+ {rewardPrize}</span>
                        )}
                    </div>
                </div>

                {canClaim && onClaim && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClaim();
                        }}
                        className="bg-gradient-to-r from-success to-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-glow-sm hover:shadow-glow active:scale-95 transition-all"
                    >
                        Resgatar!
                    </button>
                )}

                {isClaimed && (
                    <div className="flex items-center gap-1 text-success">
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                        <span className="text-sm font-semibold">Resgatado</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MissionCard;
