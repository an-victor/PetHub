import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'soft' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    icon?: string;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    fullWidth?: boolean;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    loading = false,
    fullWidth = false,
    children,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-300 active:scale-[0.98]';

    const variants = {
        primary: 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm hover:shadow-glow',
        secondary: 'bg-surface text-text-primary border-2 border-border hover:border-primary shadow-soft hover:shadow-soft-md',
        soft: 'bg-primary/10 text-primary hover:bg-primary/20',
        ghost: 'text-text-secondary hover:text-primary hover:bg-primary/5',
        danger: 'bg-danger/10 text-danger border-2 border-danger/30 hover:bg-danger/20 hover:border-danger/50',
    };

    const sizes = {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base',
    };

    const iconSizes = {
        sm: 'text-sm',
        md: 'text-lg',
        lg: 'text-xl',
    };

    const isDisabled = disabled || loading;

    return (
        <button
            className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
            disabled={isDisabled}
            {...props}
        >
            {loading ? (
                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
            ) : (
                <>
                    {icon && iconPosition === 'left' && (
                        <span className={`material-symbols-outlined ${iconSizes[size]}`}>{icon}</span>
                    )}
                    {children}
                    {icon && iconPosition === 'right' && (
                        <span className={`material-symbols-outlined ${iconSizes[size]}`}>{icon}</span>
                    )}
                </>
            )}
        </button>
    );
};

export default Button;
