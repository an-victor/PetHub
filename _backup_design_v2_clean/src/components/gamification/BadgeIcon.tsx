import React from 'react';

interface BadgeIconProps {
    icon: string;
    name: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    isEarned?: boolean;
    size?: 'sm' | 'md' | 'lg';
    showName?: boolean;
    onClick?: () => void;
    className?: string;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({
    icon,
    name,
    rarity,
    isEarned = false,
    size = 'md',
    showName = false,
    onClick,
    className = '',
}) => {
    const rarityGradients = {
        common: 'from-gray-400 to-gray-500',
        rare: 'from-blue-400 to-blue-600',
        epic: 'from-purple-400 to-purple-600',
        legendary: 'from-yellow-400 to-amber-500',
    };

    const rarityGlow = {
        common: '',
        rare: 'shadow-blue-500/30',
        epic: 'shadow-purple-500/30',
        legendary: 'shadow-amber-500/40',
    };

    const sizeClasses = {
        sm: 'w-10 h-10 text-lg',
        md: 'w-14 h-14 text-2xl',
        lg: 'w-20 h-20 text-4xl',
    };

    const containerSizes = {
        sm: 'w-12 h-12 rounded-lg',
        md: 'w-16 h-16 rounded-xl',
        lg: 'w-24 h-24 rounded-2xl',
    };

    const nameClasses = {
        sm: 'text-[10px]',
        md: 'text-xs',
        lg: 'text-sm',
    };

    return (
        <div
            onClick={onClick}
            className={`flex flex-col items-center gap-1 ${onClick ? 'cursor-pointer' : ''} ${className}`}
        >
            <div
                className={`
                    ${containerSizes[size]} flex items-center justify-center
                    ${isEarned
                        ? `bg-gradient-to-br ${rarityGradients[rarity]} shadow-lg ${rarityGlow[rarity]}`
                        : 'bg-text-muted/20'
                    }
                    transition-all duration-300
                    ${onClick ? 'hover:scale-105 active:scale-95' : ''}
                `}
            >
                <span className={sizeClasses[size]}>
                    {isEarned ? icon : '❓'}
                </span>
            </div>

            {showName && (
                <span className={`font-semibold text-center ${nameClasses[size]} ${isEarned ? 'text-text-primary' : 'text-text-muted'
                    }`}>
                    {isEarned ? name : '???'}
                </span>
            )}

            {/* Rarity indicator dot */}
            {isEarned && (
                <div className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br ${rarityGradients[rarity]} border-2 border-surface`}></div>
            )}
        </div>
    );
};

export default BadgeIcon;
