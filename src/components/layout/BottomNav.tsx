import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '@/src/App';
// Note: We're importing useAppContext from App, but usually context should be in its own file.
// For now, we will assume App exports it. If strict separation is needed, we should move context to src/contexts/AppContext.tsx.
// But doing that now might break too many things. We'll stick to importing from App.

export const BottomNav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsMenuOpen } = useAppContext();

    const tabs = [
        { name: 'Home', icon: 'home', path: '/' },
        { name: 'Agenda', icon: 'calendar_today', path: '/agenda' },
        { name: 'Loja', icon: 'shopping_bag', path: '/nutrition' },
        { name: 'Menu', icon: 'menu', path: null, action: () => setIsMenuOpen(true) },
    ];

    const hideNavRoutes = ['/login', '/register', '/profile', '/settings', '/vaccines', '/donation'];
    const shouldHide = hideNavRoutes.some(route => location.pathname.startsWith(route)) || location.pathname.includes('/pet/');

    if (shouldHide) return null;

    return (
        <div className="fixed bottom-6 left-6 right-6 max-w-[480px] mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-soft-xl p-2 border border-white/50 z-50 flex justify-between px-6 transition-all duration-300">
            {tabs.map((tab) => {
                const isActive = tab.path && location.pathname === tab.path;
                return (
                    <button
                        key={tab.name}
                        onClick={() => tab.action ? tab.action() : tab.path && navigate(tab.path)}
                        className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${isActive
                            ? 'bg-primary text-white shadow-glow'
                            : 'text-gray-400 hover:text-primary hover:bg-orange-50'
                            }`}
                    >
                        <span className={`material-symbols-outlined text-2xl ${isActive ? 'material-symbols-fill' : ''}`}>
                            {tab.icon}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};
