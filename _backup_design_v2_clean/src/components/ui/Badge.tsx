import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
    size?: 'sm' | 'md';
    icon?: string;
    pulse?: boolean;
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    pulse = false,
    className = '',
}) => {
    const variants = {
        primary: 'bg-primary/10 text-primary dark:bg-primary/20',
        success: 'bg-success/10 text-success dark:bg-success/20',
        warning: 'bg-warning/15 text-[#D4AC0D] dark:bg-warning/20',
        danger: 'bg-danger/10 text-danger dark:bg-danger/20',
        neutral: 'bg-border text-text-secondary dark:bg-surface-elevated',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-[9px]',
        md: 'px-3 py-1 text-[11px]',
    };

    return (
        <span
            className={`
        inline-flex items-center gap-1 rounded-lg font-bold uppercase tracking-wider
        ${variants[variant]}
        ${sizes[size]}
        ${pulse ? 'animate-pulse' : ''}
        ${className}
      `}
        >
            {icon && <span className="material-symbols-outlined text-xs">{icon}</span>}
            {children}
        </span>
    );
};

export default Badge;
