import React from 'react';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'gradient' | 'outline';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    clickable?: boolean;
    onClick?: () => void;
    className?: string;
}

const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    padding = 'md',
    clickable = false,
    onClick,
    className = '',
}) => {
    const baseStyles = 'rounded-3xl transition-all duration-300';

    const variants = {
        default: 'bg-surface shadow-soft',
        elevated: 'bg-surface shadow-soft-lg',
        gradient: 'bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border border-primary/20',
        outline: 'bg-surface border-2 border-border',
    };

    const paddings = {
        none: '',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
    };

    const clickableStyles = clickable
        ? 'cursor-pointer hover:shadow-soft-lg hover:-translate-y-1 active:scale-[0.99]'
        : '';

    return (
        <div
            className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${clickableStyles} ${className}`}
            onClick={clickable ? onClick : undefined}
            role={clickable ? 'button' : undefined}
            tabIndex={clickable ? 0 : undefined}
            onKeyDown={clickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
        >
            {children}
        </div>
    );
};

export default Card;
