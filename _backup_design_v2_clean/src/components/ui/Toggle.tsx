import React from 'react';

interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    size?: 'sm' | 'md';
}

const Toggle: React.FC<ToggleProps> = ({
    checked,
    onChange,
    label,
    disabled = false,
    size = 'md',
}) => {
    const sizes = {
        sm: {
            track: 'w-10 h-6',
            knob: 'w-4 h-4',
            translate: 'translate-x-4',
        },
        md: {
            track: 'w-14 h-8',
            knob: 'w-6 h-6',
            translate: 'translate-x-6',
        },
    };

    const currentSize = sizes[size];

    return (
        <label className={`inline-flex items-center gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => !disabled && onChange(!checked)}
                className={`
          relative ${currentSize.track} rounded-full p-1 
          transition-all duration-300
          ${checked
                        ? 'bg-gradient-to-r from-primary to-primary-light shadow-glow-sm'
                        : 'bg-border'
                    }
          ${!disabled ? 'active:scale-95' : ''}
        `}
            >
                <span
                    className={`
            block ${currentSize.knob} rounded-full bg-white shadow-md
            transition-all duration-300
            ${checked ? currentSize.translate : 'translate-x-0'}
          `}
                />
            </button>
            {label && (
                <span className="text-text-primary text-sm font-medium transition-colors duration-300">
                    {label}
                </span>
            )}
        </label>
    );
};

export default Toggle;
