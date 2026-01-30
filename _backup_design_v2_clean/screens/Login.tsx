import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { login, loginWithProvider, forgotPassword } from '@/src/services/auth';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | null>(null);
    const [error, setError] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotSent, setForgotSent] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            setIsAuthenticated(true);
            navigate('/');
        } else {
            setError(result.error || 'Erro ao fazer login');
        }

        setLoading(false);
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook') => {
        setSocialLoading(provider);
        setError('');

        const result = await loginWithProvider(provider);

        if (result.success) {
            setIsAuthenticated(true);
            navigate('/');
        } else {
            setError(result.error || 'Erro ao fazer login');
        }

        setSocialLoading(null);
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await forgotPassword(forgotEmail);
        if (result.success) {
            setForgotSent(true);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">
            {/* Header decorative */}
            <div className="relative bg-gradient-to-br from-primary via-primary to-primary-dark h-48 overflow-hidden">
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/10 rounded-full"></div>
                <div className="absolute left-10 bottom-0 w-24 h-24 bg-white/5 rounded-full"></div>
                <div className="absolute right-20 bottom-10 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>

                {/* Logo */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10">
                    <div className="w-24 h-24 bg-surface rounded-3xl flex items-center justify-center shadow-soft-lg border-4 border-surface">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-glow-sm">
                            <span className="material-symbols-outlined text-3xl text-white">pets</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 pt-16 pb-8 animate-slideUp">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-text-primary mb-2">Bem-vindo!</h1>
                        <p className="text-text-secondary text-sm">Entre para cuidar do seu pet</p>
                    </div>

                    {error && (
                        <div className="bg-danger/10 border border-danger/20 rounded-2xl p-4 mb-6 flex items-center gap-3 animate-slideUp">
                            <span className="material-symbols-outlined text-danger">error</span>
                            <p className="text-danger text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-text-primary text-sm font-semibold mb-2">Email</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted">
                                    mail
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    required
                                    className="w-full bg-surface rounded-2xl py-4 pl-12 pr-4 text-text-primary border-2 border-transparent focus:border-primary focus:outline-none focus:shadow-glow-sm transition-all placeholder:text-text-muted"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-text-primary text-sm font-semibold mb-2">Senha</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted">
                                    lock
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-surface rounded-2xl py-4 pl-12 pr-4 text-text-primary border-2 border-transparent focus:border-primary focus:outline-none focus:shadow-glow-sm transition-all placeholder:text-text-muted"
                                />
                            </div>
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                                />
                                <span className="text-text-secondary text-sm">Lembrar de mim</span>
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className="text-primary text-sm font-semibold hover:underline"
                            >
                                Esqueceu a senha?
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 rounded-2xl shadow-glow-sm hover:shadow-glow active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    Entrar
                                    <span className="material-symbols-outlined">login</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-background px-4 text-text-muted text-sm">ou continue com</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => handleSocialLogin('google')}
                            disabled={socialLoading !== null}
                            className="flex items-center justify-center gap-2 bg-surface rounded-2xl py-3 px-4 border border-border hover:border-primary/30 hover:shadow-soft transition-all disabled:opacity-70"
                        >
                            {socialLoading === 'google' ? (
                                <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M12 20.41c4.64 0 8.54-3.16 8.54-8.41 0-.58-.05-1.15-.17-1.69H12v3.44h4.79c-.2 1.12-.82 2-.77 2.72v2.26h2.87c1.68-1.55 2.65-3.83 2.65-6.73z" />
                                        <path fill="#34A853" d="M12 24c2.4 0 4.42-.8 5.9-2.17l-2.87-2.23c-.8.54-1.82.86-3.03.86-2.36 0-4.35-1.59-5.06-3.74H3.97v2.31C5.47 21.98 8.53 24 12 24z" />
                                        <path fill="#FBBC05" d="M6.94 16.7c-.18-.54-.28-.88-.28-1.7s.1-1.16.28-1.7V11H3.97C3.37 12.2 3 13.57 3 15c0 1.44.37 2.8.97 4l3-2.31z" />
                                        <path fill="#EA4335" d="M12 9.58c1.31 0 2.48.45 3.41 1.33l2.56-2.56C16.41 6.9 14.4 6 12 6 8.53 6 5.47 8.02 3.97 11l3 2.31c.7-2.15 2.69-3.74 5.06-3.74z" />
                                    </svg>
                                    <span className="text-text-primary font-medium text-sm">Google</span>
                                </>
                            )}
                        </button>

                        <button
                            onClick={() => handleSocialLogin('facebook')}
                            disabled={socialLoading !== null}
                            className="flex items-center justify-center gap-2 bg-surface rounded-2xl py-3 px-4 border border-border hover:border-primary/30 hover:shadow-soft transition-all disabled:opacity-70"
                        >
                            {socialLoading === 'facebook' ? (
                                <span className="w-5 h-5 border-2 border-[#1877F2]/30 border-t-[#1877F2] rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99h-2.54V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99C18.34 21.13 22 17 22 12z" />
                                    </svg>
                                    <span className="text-text-primary font-medium text-sm">Facebook</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Register CTA */}
                    <div className="text-center mt-8">
                        <span className="text-text-secondary text-sm">Não tem uma conta? </span>
                        <button
                            onClick={() => navigate('/register')}
                            className="text-primary font-bold text-sm hover:underline"
                        >
                            Cadastre-se grátis
                        </button>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fadeIn">
                    <div className="bg-surface w-full max-w-md rounded-3xl p-6 animate-scaleSpring">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-text-primary font-bold text-lg">Recuperar Senha</h3>
                            <button
                                onClick={() => { setShowForgotPassword(false); setForgotSent(false); }}
                                className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-text-muted hover:text-text-primary"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {forgotSent ? (
                            <div className="text-center py-6">
                                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                                    <span className="material-symbols-outlined text-success text-3xl">check_circle</span>
                                </div>
                                <h4 className="text-text-primary font-bold mb-2">Email Enviado!</h4>
                                <p className="text-text-muted text-sm mb-6">
                                    Verifique sua caixa de entrada para redefinir sua senha.
                                </p>
                                <button
                                    onClick={() => { setShowForgotPassword(false); setForgotSent(false); }}
                                    className="w-full bg-primary text-white font-bold py-3 rounded-2xl"
                                >
                                    Voltar ao Login
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleForgotPassword}>
                                <p className="text-text-muted text-sm mb-4">
                                    Digite seu email e enviaremos um link para recuperar sua senha.
                                </p>
                                <input
                                    type="email"
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    required
                                    className="w-full bg-background rounded-2xl py-4 px-4 text-text-primary border-2 border-transparent focus:border-primary focus:outline-none mb-4"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 rounded-2xl"
                                >
                                    Enviar Link
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
