import React, { useEffect, useCallback } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'full';
    showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
}) => {
    const handleEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleEscape]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        full: 'max-w-[calc(100%-2rem)] h-[calc(100%-4rem)]',
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={`
          relative w-full ${sizes[size]} mx-4 
          bg-surface rounded-t-3xl sm:rounded-3xl 
          shadow-soft-xl overflow-hidden
          animate-slideUp
          ${size === 'full' ? 'flex flex-col' : ''}
        `}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-5 border-b border-border">
                        {title && (
                            <h2 className="text-text-primary text-lg font-bold transition-colors duration-300">
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="flex items-center justify-center w-10 h-10 rounded-xl bg-background hover:bg-border text-text-muted hover:text-text-primary transition-all duration-200 active:scale-95"
                                aria-label="Fechar"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className={`p-5 ${size === 'full' ? 'flex-1 overflow-y-auto' : 'max-h-[70vh] overflow-y-auto'}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
