import React, { useEffect, useState } from 'react';

interface MissionCompleteModalProps {
    isVisible: boolean;
    missionName: string;
    missionIcon: string;
    rewardPoints: number;
    rewardPrize?: string;
    badgeName?: string;
    badgeIcon?: string;
    onClose: () => void;
    onClaim?: () => void;
}

const MissionCompleteModal: React.FC<MissionCompleteModalProps> = ({
    isVisible,
    missionName,
    missionIcon,
    rewardPoints,
    rewardPrize,
    badgeName,
    badgeIcon,
    onClose,
    onClaim,
}) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isClaiming, setIsClaiming] = useState(false);
    const [claimed, setClaimed] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
            setClaimed(false);
        } else {
            setIsAnimating(false);
        }
    }, [isVisible]);

    const handleClaim = async () => {
        setIsClaiming(true);

        // Simulate claim process
        await new Promise(resolve => setTimeout(resolve, 1000));

        setClaimed(true);
        setIsClaiming(false);
        onClaim?.();

        // Auto close after claim animation
        setTimeout(() => {
            onClose();
        }, 1500);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`
                fixed inset-0 z-[100] flex items-center justify-center p-5
                transition-opacity duration-300
                ${isAnimating ? 'opacity-100' : 'opacity-0'}
            `}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={!isClaiming && !claimed ? onClose : undefined} />

            {/* Modal Content */}
            <div
                className={`
                    relative bg-surface rounded-3xl p-6 w-full max-w-sm
                    transform transition-all duration-500
                    ${isAnimating ? 'scale-100 translate-y-0' : 'scale-75 translate-y-10'}
                `}
            >
                {/* Close button */}
                {!isClaiming && !claimed && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background flex items-center justify-center text-text-muted hover:text-text-primary"
                    >
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                )}

                <div className="text-center pt-4">
                    {/* Success animation */}
                    <div className="relative inline-block">
                        <div className={`
                            w-20 h-20 rounded-2xl flex items-center justify-center
                            ${claimed
                                ? 'bg-gradient-to-br from-success to-emerald-500'
                                : 'bg-gradient-to-br from-primary to-primary-dark'
                            }
                            shadow-lg transition-all duration-500
                            ${claimed ? 'scale-110' : 'animate-scaleSpring'}
                        `}>
                            <span className="material-symbols-outlined text-white text-4xl">
                                {claimed ? 'check' : missionIcon}
                            </span>
                        </div>

                        {/* Pulse effect */}
                        <div className={`absolute inset-0 rounded-2xl ${claimed ? 'bg-success' : 'bg-primary'} opacity-30 blur-lg -z-10 animate-pulse`}></div>
                    </div>

                    {/* Title */}
                    <h2 className="text-text-primary text-xl font-bold mt-5">
                        {claimed ? 'Resgatado! 🎉' : 'Missão Completa!'}
                    </h2>
                    <p className="text-text-secondary mt-1">{missionName}</p>
                </div>

                {/* Rewards */}
                <div className="bg-background rounded-2xl p-4 mt-6 space-y-3">
                    <p className="text-text-muted text-xs uppercase tracking-wider">
                        {claimed ? 'Você ganhou' : 'Recompensas'}
                    </p>

                    {/* Points */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <span className="text-xl">🐾</span>
                            </div>
                            <span className="text-text-primary font-medium">Patinhas</span>
                        </div>
                        <span className={`font-bold ${claimed ? 'text-success' : 'text-primary'}`}>
                            +{rewardPoints.toLocaleString()}
                        </span>
                    </div>

                    {/* Prize */}
                    {rewardPrize && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-success">redeem</span>
                                </div>
                                <span className="text-text-primary font-medium">Prêmio</span>
                            </div>
                            <span className={`font-semibold ${claimed ? 'text-success' : 'text-text-secondary'}`}>
                                {rewardPrize}
                            </span>
                        </div>
                    )}

                    {/* Badge */}
                    {badgeName && badgeIcon && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                    <span className="text-xl">{badgeIcon}</span>
                                </div>
                                <span className="text-text-primary font-medium">Badge</span>
                            </div>
                            <span className={`font-semibold ${claimed ? 'text-success' : 'text-text-secondary'}`}>
                                {badgeName}
                            </span>
                        </div>
                    )}
                </div>

                {/* CTA */}
                {!claimed ? (
                    <button
                        onClick={handleClaim}
                        disabled={isClaiming}
                        className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-success to-emerald-500 text-white font-bold text-lg shadow-glow-sm hover:shadow-glow active:scale-[0.98] transition-all disabled:opacity-70"
                    >
                        {isClaiming ? (
                            <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"></span>
                        ) : (
                            'Resgatar Recompensas!'
                        )}
                    </button>
                ) : (
                    <div className="mt-6 py-4 text-center">
                        <span className="text-success text-lg font-bold">✓ Adicionado ao seu saldo</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MissionCompleteModal;
