import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    icon?: string;
    iconPosition?: 'left' | 'right';
    onIconClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    hint,
    icon,
    iconPosition = 'left',
    onIconClick,
    className = '',
    id,
    ...props
}, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasIcon = Boolean(icon);

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-text-primary text-sm font-semibold mb-2 transition-colors duration-300"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {hasIcon && iconPosition === 'left' && (
                    <span
                        className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg transition-colors duration-200 ${error ? 'text-danger' : 'text-primary'} ${onIconClick ? 'cursor-pointer hover:text-primary-dark' : ''}`}
                        onClick={onIconClick}
                    >
                        {icon}
                    </span>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={`
            w-full bg-surface rounded-2xl py-3.5 text-sm
            border-2 transition-all duration-300 text-text-primary
            placeholder:text-text-muted
            focus:outline-none focus:shadow-glow-sm
            ${error
                            ? 'border-danger focus:border-danger'
                            : 'border-transparent focus:border-primary'
                        }
            ${hasIcon && iconPosition === 'left' ? 'pl-12 pr-4' : ''}
            ${hasIcon && iconPosition === 'right' ? 'pl-4 pr-12' : ''}
            ${!hasIcon ? 'px-4' : ''}
            ${className}
          `}
                    {...props}
                />
                {hasIcon && iconPosition === 'right' && (
                    <span
                        className={`material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-lg transition-colors duration-200 ${error ? 'text-danger' : 'text-text-muted hover:text-primary'} ${onIconClick ? 'cursor-pointer' : ''}`}
                        onClick={onIconClick}
                    >
                        {icon}
                    </span>
                )}
            </div>
            {error && (
                <p className="text-danger text-xs mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">error</span>
                    {error}
                </p>
            )}
            {hint && !error && (
                <p className="text-text-muted text-xs mt-1.5">{hint}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
