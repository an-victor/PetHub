import React, { useEffect, useState } from 'react';

interface LevelUpModalProps {
    isVisible: boolean;
    newLevel: number;
    levelName: string;
    levelBadge: string;
    benefits: string[];
    bonusPoints: number;
    onClose: () => void;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({
    isVisible,
    newLevel,
    levelName,
    levelBadge,
    benefits,
    bonusPoints,
    onClose,
}) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
            setShowConfetti(true);

            // Stop confetti after animation
            const confettiTimer = setTimeout(() => {
                setShowConfetti(false);
            }, 3000);

            return () => clearTimeout(confettiTimer);
        } else {
            setIsAnimating(false);
        }
    }, [isVisible]);

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
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            {/* Confetti */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(30)].map((_, i) => {
                        const emojis = ['🎉', '🎊', '✨', '⭐', '🐾', '💫'];
                        const emoji = emojis[i % emojis.length];
                        return (
                            <span
                                key={i}
                                className="absolute animate-confetti-fall"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    animationDuration: `${2 + Math.random() * 2}s`,
                                    fontSize: `${16 + Math.random() * 16}px`,
                                }}
                            >
                                {emoji}
                            </span>
                        );
                    })}
                </div>
            )}

            {/* Modal Content */}
            <div
                className={`
                    relative bg-surface rounded-3xl p-6 w-full max-w-sm
                    transform transition-all duration-500
                    ${isAnimating ? 'scale-100 translate-y-0' : 'scale-75 translate-y-10'}
                `}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background flex items-center justify-center text-text-muted hover:text-text-primary"
                >
                    <span className="material-symbols-outlined text-lg">close</span>
                </button>

                {/* Header */}
                <div className="text-center pt-4">
                    {/* Level badge */}
                    <div className="relative inline-block">
                        <div className={`
                            w-24 h-24 rounded-3xl flex items-center justify-center text-5xl
                            bg-gradient-to-br from-primary via-primary to-primary-dark
                            shadow-glow animate-scaleSpring
                        `}>
                            {levelBadge}
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-3xl bg-primary/30 blur-xl -z-10 animate-pulse"></div>
                    </div>

                    {/* Title */}
                    <h2 className="text-text-primary text-2xl font-bold mt-6">
                        Subiu de Nível! 🎉
                    </h2>
                    <p className="text-primary text-xl font-bold mt-1">
                        Nível {newLevel} - {levelName}
                    </p>
                </div>

                {/* Bonus points */}
                <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-xl p-4 mt-6 text-center">
                    <p className="text-text-secondary text-sm">Bônus de nível</p>
                    <p className="text-success text-2xl font-bold mt-1">
                        +{bonusPoints} 🐾
                    </p>
                </div>

                {/* Benefits */}
                {benefits.length > 0 && (
                    <div className="mt-6">
                        <p className="text-text-muted text-xs uppercase tracking-wider mb-3">
                            Novos benefícios desbloqueados
                        </p>
                        <div className="space-y-2">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 bg-background rounded-xl p-3"
                                >
                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                    <span className="text-text-primary text-sm font-medium">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <button
                    onClick={onClose}
                    className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-lg shadow-glow-sm hover:shadow-glow active:scale-[0.98] transition-all"
                >
                    Continuar 🐾
                </button>
            </div>
        </div>
    );
};

export default LevelUpModal;
