import React, { forwardRef } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    error,
    options,
    placeholder = 'Selecione...',
    className = '',
    id,
    ...props
}, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={selectId}
                    className="block text-text-primary text-sm font-semibold mb-2 transition-colors duration-300"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    ref={ref}
                    id={selectId}
                    className={`
            w-full bg-surface rounded-2xl py-3.5 px-4 pr-10 text-sm
            border-2 transition-all duration-300 text-text-primary
            focus:outline-none focus:shadow-glow-sm appearance-none
            ${error
                            ? 'border-danger focus:border-danger'
                            : 'border-transparent focus:border-primary'
                        }
            ${className}
          `}
                    {...props}
                >
                    <option value="" disabled className="text-text-muted">
                        {placeholder}
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                    expand_more
                </span>
            </div>
            {error && (
                <p className="text-danger text-xs mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">error</span>
                    {error}
                </p>
            )}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;
