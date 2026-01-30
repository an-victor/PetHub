import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext, useAppContext } from '../App';
import { NotificationSettings } from '@/src/components/settings';
import { logout } from '@/src/services/auth';

const Settings: React.FC = () => {
    const navigate = useNavigate();
    const { isDark, setIsDark } = useContext(DarkModeContext);
    const { setIsAuthenticated } = useAppContext();
    const [isNotificationSettingsOpen, setIsNotificationSettingsOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
        navigate('/login');
    };

    const menuItems = [
        { icon: 'notifications', label: 'Notificações', action: () => setIsNotificationSettingsOpen(true) },
        { icon: 'dark_mode', label: 'Modo Escuro', toggle: true, isOn: isDark, onToggle: () => setIsDark(!isDark) },
        { icon: 'language', label: 'Idioma', subtitle: 'Português (Brasil)', path: '#' },
        { icon: 'lock', label: 'Privacidade e Segurança', path: '#' },
        { icon: 'help', label: 'Ajuda e Suporte', path: '#' },
        { icon: 'info', label: 'Sobre o App', path: '#' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
            {/* Header */}
            <header className="bg-surface shadow-soft sticky top-0 z-20 transition-colors duration-300 animate-slideDown">
                <div className="flex items-center justify-between p-4">
                    <button onClick={() => navigate(-1)} className="flex size-11 items-center justify-center rounded-xl hover:bg-background active:scale-95 transition-all duration-200">
                        <span className="material-symbols-outlined text-text-primary transition-colors duration-300">arrow_back</span>
                    </button>
                    <h1 className="text-text-primary text-lg font-bold transition-colors duration-300">Configurações</h1>
                    <div className="w-11"></div> {/* Spacer */}
                </div>
            </header>

            <main className="p-5 animate-slideUp stagger-1">
                {/* Menu Items */}
                <div className="bg-surface rounded-3xl shadow-soft overflow-hidden transition-colors duration-300">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (item.onToggle) item.onToggle();
                                else if (item.action) item.action();
                                else if (item.path && item.path !== '#') navigate(item.path);
                            }}
                            className={`w-full flex items-center justify-between p-4 hover:bg-background active:bg-background transition-colors duration-200 ${index !== menuItems.length - 1 ? 'border-b border-border' : ''
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center transition-colors duration-300">
                                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                                </div>
                                <div className="text-left">
                                    <span className="text-text-primary font-medium block transition-colors duration-300">{item.label}</span>
                                    {item.subtitle && (
                                        <span className="text-text-muted text-xs">{item.subtitle}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {item.toggle ? (
                                    <div
                                        className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${item.isOn
                                            ? 'bg-gradient-to-r from-primary to-primary-light shadow-glow-sm'
                                            : 'bg-border'
                                            }`}
                                    >
                                        <div
                                            className={`w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${item.isOn ? 'translate-x-6' : 'translate-x-0'
                                                }`}
                                        ></div>
                                    </div>
                                ) : (
                                    <span className="material-symbols-outlined text-text-muted">chevron_right</span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Logout Button */}
                <div className="mt-8">
                    <button
                        onClick={() => setShowLogoutConfirm(true)}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-danger/30 text-danger font-semibold hover:bg-danger/5 hover:border-danger/50 active:scale-[0.98] transition-all duration-300"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <span>Sair da Conta</span>
                    </button>
                    <p className="text-center text-text-muted text-xs mt-4">PetHub v2.0.0</p>
                </div>
            </main>

            {/* Modals */}
            <NotificationSettings
                isOpen={isNotificationSettingsOpen}
                onClose={() => setIsNotificationSettingsOpen(false)}
            />

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fadeIn">
                    <div className="bg-surface w-full max-w-sm rounded-3xl p-6 animate-scaleSpring text-center">
                        <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-danger text-3xl">logout</span>
                        </div>
                        <h3 className="text-text-primary font-bold text-lg mb-2">Sair da Conta?</h3>
                        <p className="text-text-muted text-sm mb-6">
                            Você precisará fazer login novamente para acessar sua conta.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="flex-1 bg-background text-text-primary font-bold py-3 rounded-2xl border border-border"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 bg-danger text-white font-bold py-3 rounded-2xl"
                            >
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
