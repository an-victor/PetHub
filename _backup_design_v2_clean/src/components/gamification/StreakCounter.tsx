import React from 'react';

interface StreakCounterProps {
    days: number;
    showLabel?: boolean;
    showBonus?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'card' | 'inline';
    className?: string;
}

const StreakCounter: React.FC<StreakCounterProps> = ({
    days,
    showLabel = true,
    showBonus = false,
    size = 'md',
    variant = 'default',
    className = '',
}) => {
    const bonusDays = 7;
    const daysUntilBonus = bonusDays - (days % bonusDays);
    const isNearBonus = daysUntilBonus <= 2 && daysUntilBonus > 0;

    const sizeClasses = {
        sm: { icon: 'text-lg', text: 'text-xs', days: 'text-base' },
        md: { icon: 'text-2xl', text: 'text-sm', days: 'text-xl' },
        lg: { icon: 'text-3xl', text: 'text-base', days: 'text-2xl' },
    };

    if (variant === 'inline') {
        return (
            <div className={`inline-flex items-center gap-1 ${className}`}>
                <span className={sizeClasses[size].icon}>🔥</span>
                <span className={`font-bold text-text-primary ${sizeClasses[size].days}`}>
                    {days}
                </span>
                {showLabel && (
                    <span className={`text-text-muted ${sizeClasses[size].text}`}>
                        dias
                    </span>
                )}
            </div>
        );
    }

    if (variant === 'card') {
        return (
            <div className={`bg-surface rounded-2xl p-4 shadow-soft text-center ${className}`}>
                <div className={`${sizeClasses[size].icon} mb-2`}>🔥</div>
                <p className={`font-bold text-text-primary ${sizeClasses[size].days}`}>
                    {days}
                </p>
                {showLabel && (
                    <p className={`text-text-muted ${sizeClasses[size].text} mt-0.5`}>
                        dias seguidos
                    </p>
                )}
                {showBonus && daysUntilBonus > 0 && (
                    <div className={`mt-3 pt-3 border-t border-border ${sizeClasses[size].text}`}>
                        {isNearBonus ? (
                            <p className="text-success font-semibold animate-pulse">
                                +{daysUntilBonus} dia{daysUntilBonus > 1 ? 's' : ''} para bônus! 🎁
                            </p>
                        ) : (
                            <p className="text-text-muted">
                                Bônus em {daysUntilBonus} dias
                            </p>
                        )}
                    </div>
                )}
            </div>
        );
    }

    // Default variant
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                ${days >= 7 ? 'bg-gradient-to-br from-orange-400 to-red-500' : 'bg-orange-100 dark:bg-orange-900/30'}
            `}>
                <span className={`${sizeClasses[size].icon} ${days >= 7 ? 'animate-bounce' : ''}`}>
                    🔥
                </span>
            </div>
            <div>
                <p className={`font-bold text-text-primary ${sizeClasses[size].days}`}>
                    {days} <span className={`font-normal text-text-muted ${sizeClasses[size].text}`}>dias</span>
                </p>
                {showBonus && (
                    <p className={`text-text-muted ${sizeClasses[size].text}`}>
                        {isNearBonus
                            ? <span className="text-success">Bônus em {daysUntilBonus}!</span>
                            : `Bônus a cada 7 dias`
                        }
                    </p>
                )}
            </div>
        </div>
    );
};

export default StreakCounter;
