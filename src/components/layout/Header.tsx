import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    title: string;
    showBack?: boolean;
    showMenu?: boolean;
    onMenuClick?: () => void;
    rightAction?: React.ReactNode;
    rightIcon?: string;
    onRightClick?: () => void;
    transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    title,
    showBack = true,
    showMenu = false,
    onMenuClick,
    rightAction,
    rightIcon,
    onRightClick,
    transparent = false,
}) => {
    const navigate = useNavigate();

    return (
        <header
            className={`
        sticky top-0 z-20 transition-colors duration-300 animate-slideDown
        ${transparent
                    ? 'bg-transparent'
                    : 'bg-surface shadow-soft'
                }
      `}
        >
            <div className="flex items-center justify-between p-4">
                {/* Left Action */}
                {showMenu ? (
                    <button
                        onClick={onMenuClick}
                        className="flex size-11 items-center justify-center rounded-xl hover:bg-background active:scale-95 transition-all duration-200"
                        aria-label="Abrir menu"
                    >
                        <span className="material-symbols-outlined text-text-primary">menu</span>
                    </button>
                ) : showBack ? (
                    <button
                        onClick={() => navigate(-1)}
                        className="flex size-11 items-center justify-center rounded-xl hover:bg-background active:scale-95 transition-all duration-200"
                        aria-label="Voltar"
                    >
                        <span className="material-symbols-outlined text-text-primary">arrow_back_ios</span>
                    </button>
                ) : (
                    <div className="w-11" />
                )}

                {/* Title */}
                <h1 className="text-text-primary text-lg font-bold transition-colors duration-300">
                    {title}
                </h1>

                {/* Right Action */}
                {rightAction ? (
                    rightAction
                ) : rightIcon ? (
                    <button
                        onClick={onRightClick}
                        className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all duration-200"
                    >
                        <span className="material-symbols-outlined">{rightIcon}</span>
                    </button>
                ) : (
                    <div className="w-11" />
                )}
            </div>
        </header>
    );
};

export default Header;
