import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { register } from '@/src/services/auth';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAppContext();
    const [step, setStep] = useState(1);
    const [accountType, setAccountType] = useState<'tutor' | 'vet' | 'business'>('tutor');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await register({
            name,
            email,
            phone,
            password,
            accountType,
        });

        if (result.success) {
            setIsAuthenticated(true);
            navigate('/');
        } else {
            setError(result.error || 'Erro ao criar conta');
        }

        setLoading(false);
    };

    const AccountTypeCard = ({ type, icon, title, desc }: { type: typeof accountType, icon: string, title: string, desc: string }) => (
        <div
            onClick={() => setAccountType(type)}
            className={`relative rounded-3xl p-5 cursor-pointer border-2 transition-all duration-300 ${accountType === type
                ? 'border-primary bg-primary/5 shadow-glow-sm scale-[1.02]'
                : 'border-transparent bg-surface shadow-soft hover:shadow-soft-lg hover:bg-surface-elevated'
                }`}
        >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${accountType === type ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                }`}>
                <span className="material-symbols-outlined text-2xl">{icon}</span>
            </div>
            {accountType === type && (
                <div className="absolute top-4 right-4 text-primary">
                    <span className="material-symbols-outlined">check_circle</span>
                </div>
            )}
            <h3 className={`font-bold text-lg mb-1 ${accountType === type ? 'text-primary' : 'text-text-primary'}`}>{title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">
            {/* Header decorative */}
            <div className="relative bg-gradient-to-br from-primary via-primary to-primary-dark py-8 px-6 overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>
                <div className="absolute left-0 bottom-0 w-20 h-20 bg-white/5 rounded-full"></div>

                <button
                    onClick={() => step === 1 ? navigate('/login') : setStep(1)}
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white mb-4"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>

                <h1 className="text-white text-2xl font-bold">
                    {step === 1 ? 'Criar Conta' : 'Seus Dados'}
                </h1>
                <p className="text-white/70 text-sm mt-1">
                    {step === 1 ? 'Escolha como você quer usar o app' : 'Complete seu cadastro'}
                </p>

                {/* Step indicator */}
                <div className="flex gap-2 mt-4">
                    <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-white' : 'bg-white/30'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-white' : 'bg-white/30'}`}></div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 py-6 animate-slideUp">
                <div className="max-w-md mx-auto">
                    {error && (
                        <div className="bg-danger/10 border border-danger/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
                            <span className="material-symbols-outlined text-danger">error</span>
                            <p className="text-danger text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {step === 1 ? (
                        <div className="space-y-4 animate-fadeIn">
                            <AccountTypeCard
                                type="tutor"
                                icon="pets"
                                title="Tutor / Dono de Pet"
                                desc="Para quem quer cuidar da saúde e bem-estar dos seus pets."
                            />

                            <AccountTypeCard
                                type="vet"
                                icon="medical_services"
                                title="Veterinário / Clínica"
                                desc="Para profissionais de saúde que querem gerenciar pacientes."
                            />

                            <AccountTypeCard
                                type="business"
                                icon="storefront"
                                title="Pet Shop / Serviços"
                                desc="Para empresas de banho, tosa, adestramento e produtos."
                            />

                            <button
                                onClick={() => setStep(2)}
                                className="w-full mt-6 bg-gradient-to-r from-primary to-primary-dark text-white py-4 rounded-2xl font-bold shadow-glow-sm hover:shadow-glow active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                Continuar
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleRegister} className="space-y-5 animate-fadeIn">
                            {/* Name */}
                            <div>
                                <label className="block text-text-primary text-sm font-semibold mb-2">Nome Completo</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted">
                                        person
                                    </span>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Maria Silva"
                                        required
                                        className="w-full bg-surface rounded-2xl py-4 pl-12 pr-4 text-text-primary border-2 border-transparent focus:border-primary focus:outline-none focus:shadow-glow-sm transition-all placeholder:text-text-muted"
                                    />
                                </div>
                            </div>

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
                                        placeholder="maria@email.com"
                                        required
                                        className="w-full bg-surface rounded-2xl py-4 pl-12 pr-4 text-text-primary border-2 border-transparent focus:border-primary focus:outline-none focus:shadow-glow-sm transition-all placeholder:text-text-muted"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-text-primary text-sm font-semibold mb-2">Telefone</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted">
                                        call
                                    </span>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="(00) 00000-0000"
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
                                        placeholder="Mínimo 6 caracteres"
                                        required
                                        minLength={6}
                                        className="w-full bg-surface rounded-2xl py-4 pl-12 pr-4 text-text-primary border-2 border-transparent focus:border-primary focus:outline-none focus:shadow-glow-sm transition-all placeholder:text-text-muted"
                                    />
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-3 pt-2">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    required
                                    className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary"
                                />
                                <label htmlFor="terms" className="text-text-secondary text-sm">
                                    Eu concordo com os{' '}
                                    <span className="text-primary font-semibold">Termos de Serviço</span> e{' '}
                                    <span className="text-primary font-semibold">Política de Privacidade</span> do PetHub.
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-4 rounded-2xl font-bold shadow-glow-sm hover:shadow-glow active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2 mt-4"
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                ) : (
                                    <>
                                        Criar Conta
                                        <span className="material-symbols-outlined">check</span>
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* Login CTA */}
                    <div className="text-center mt-8">
                        <span className="text-text-secondary text-sm">Já tem uma conta? </span>
                        <button
                            onClick={() => navigate('/login')}
                            className="text-primary font-bold text-sm hover:underline"
                        >
                            Entrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
