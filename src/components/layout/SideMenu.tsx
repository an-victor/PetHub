import React, { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { allSections } from '../../data';
import { useUser, useClerk } from '@clerk/clerk-react';

interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUser();
    const { signOut } = useClerk();

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

    const handleNavigation = (path: string) => {
        navigate(path);
        onClose();
    };

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex" aria-modal="true" role="dialog">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
                onClick={onClose}
            />

            {/* Menu Panel */}
            <div className="relative w-[280px] max-w-[85vw] h-full bg-surface shadow-soft-xl animate-slideInLeft flex flex-col">
                {/* Header with User Profile */}
                <div className="bg-gradient-to-br from-primary via-primary to-primary-dark p-5 pb-6">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center hover:bg-white/25 active:scale-95 transition-all"
                        aria-label="Fechar menu"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>

                    <div className="flex items-center gap-4 mt-6">
                        <img
                            src={user?.imageUrl || 'https://via.placeholder.com/150'}
                            alt={user?.firstName || 'User'}
                            className="w-16 h-16 rounded-2xl border-2 border-white/30 object-cover"
                        />
                        <div className="flex-1 min-w-0">
                            <h2 className="text-white font-bold text-lg truncate">{user?.firstName || 'Olá!'}</h2>
                            <p className="text-white/70 text-sm truncate">{user?.primaryEmailAddress?.emailAddress || 'Visitante'}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto py-4 px-3">
                    <div className="space-y-1">
                        {allSections.map((section, index) => {
                            const isActive = location.pathname === section.path;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => handleNavigation(section.path)}
                                    className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-xl
                    transition-all duration-200 animate-slideInLeft
                    ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-text-secondary hover:bg-background hover:text-text-primary'
                                        }
                  `}
                                    style={{ animationDelay: `${index * 30}ms` }}
                                >
                                    <span className={`material-symbols-outlined text-xl ${isActive ? 'material-symbols-fill' : ''}`}>
                                        {section.icon}
                                    </span>
                                    <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>
                                        {section.name}
                                    </span>
                                    {isActive && (
                                        <span className="ml-auto w-2 h-2 rounded-full bg-primary animate-scaleSpring" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Gamification Section */}
                    <div className="mt-6 pt-4 border-t border-border">
                        <p className="px-4 text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">
                            Gamificação
                        </p>
                        <div className="space-y-1">
                            {[
                                { id: 'gamification', name: 'Minhas Patinhas', icon: 'pets', path: '/gamification' },
                                { id: 'missions', name: 'Missões', icon: 'flag', path: '/missions' },
                                { id: 'rewards', name: 'Prêmios', icon: 'redeem', path: '/rewards' },
                                { id: 'leaderboard', name: 'Ranking', icon: 'leaderboard', path: '/leaderboard' },
                            ].map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavigation(item.path)}
                                        className={`
                            w-full flex items-center gap-4 px-4 py-3 rounded-xl
                            transition-all duration-200
                            ${isActive
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-text-secondary hover:bg-background hover:text-text-primary'
                                            }
                        `}
                                    >
                                        <span className={`material-symbols-outlined text-xl ${isActive ? 'material-symbols-fill' : ''}`}>
                                            {item.icon}
                                        </span>
                                        <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>
                                            {item.name}
                                        </span>
                                        {isActive && (
                                            <span className="ml-auto w-2 h-2 rounded-full bg-primary animate-scaleSpring" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Logout Button */}
                    <div className="mt-4 pt-4 border-t border-border">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-all font-medium"
                        >
                            <span className="material-symbols-outlined text-xl">logout</span>
                            <span>Sair da Conta</span>
                        </button>
                    </div>

                </nav>

                {/* Premium CTA */}
                <div className="p-4 border-t border-border">
                    <button
                        onClick={() => handleNavigation('/premium')}
                        className="w-full bg-gradient-to-r from-primary via-amber-500 to-primary-dark text-white font-bold py-3 px-4 rounded-xl shadow-glow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:shadow-glow"
                    >
                        <span className="text-lg">💎</span>
                        <span className="text-sm">Seja Premium</span>
                    </button>
                </div>

                {/* Footer */}
                <div className="p-4 pt-0">
                    <p className="text-text-muted text-xs text-center">PetHub v2.0.0</p>
                </div>
            </div>
        </div>
    );
};

export default SideMenu;
