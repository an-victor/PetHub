import React from 'react';

interface PointsBadgeProps {
    points: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'compact' | 'inline';
    showIcon?: boolean;
    animated?: boolean;
    className?: string;
}

const PointsBadge: React.FC<PointsBadgeProps> = ({
    points,
    size = 'md',
    variant = 'default',
    showIcon = true,
    animated = false,
    className = '',
}) => {
    const sizeClasses = {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-1.5',
        lg: 'text-base px-4 py-2',
    };

    const iconSizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };

    if (variant === 'inline') {
        return (
            <span className={`inline-flex items-center gap-1 font-bold text-primary ${className}`}>
                {points.toLocaleString()}
                {showIcon && <span>🐾</span>}
            </span>
        );
    }

    if (variant === 'compact') {
        return (
            <div className={`inline-flex items-center gap-1 bg-primary/10 text-primary font-bold rounded-lg ${sizeClasses[size]} ${className}`}>
                {showIcon && <span className={iconSizes[size]}>🐾</span>}
                <span>{points.toLocaleString()}</span>
            </div>
        );
    }

    return (
        <div
            className={`
                inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 
                border border-primary/20 text-primary font-bold rounded-xl
                ${sizeClasses[size]} ${animated ? 'animate-scaleSpring' : ''} ${className}
            `}
        >
            {showIcon && (
                <span className={`${iconSizes[size]} ${animated ? 'animate-bounce' : ''}`}>
                    🐾
                </span>
            )}
            <span>{points.toLocaleString()}</span>
        </div>
    );
};

export default PointsBadge;
