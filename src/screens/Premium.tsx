import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscriptionPlans, pointsComparison, isUserPremium, upgradeToPremium, downgradeToFree } from '@/src/data/subscription';

const Premium: React.FC = () => {
    const navigate = useNavigate();
    const [isPremium, setIsPremium] = useState(isUserPremium());
    const [showPayment, setShowPayment] = useState(false);
    const [processing, setProcessing] = useState(false);

    const freePlan = subscriptionPlans.find(p => p.id === 'free')!;
    const premiumPlan = subscriptionPlans.find(p => p.id === 'premium')!;

    const handleSubscribe = async () => {
        setShowPayment(true);
    };

    const handleConfirmPayment = async () => {
        setProcessing(true);
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        upgradeToPremium();
        setIsPremium(true);
        setProcessing(false);
        setShowPayment(false);
    };

    const handleCancel = () => {
        downgradeToFree();
        setIsPremium(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-surface/80 backdrop-blur-md shadow-soft">
                <div className="flex items-center justify-between p-4 pt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex size-11 items-center justify-center rounded-2xl bg-background/50 hover:bg-background active:scale-95 transition-all border border-border/50"
                    >
                        <span className="material-symbols-outlined text-text-primary">arrow_back_ios_new</span>
                    </button>
                    <h1 className="text-text-primary text-xl font-bold">Premium</h1>
                    <div className="w-11"></div>
                </div>
            </header>

            <main className="flex-1 pb-32">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-br from-primary via-amber-500 to-primary-dark p-6 pt-8 pb-12 overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute left-0 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>

                    <div className="relative z-10 text-center text-white">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm mb-4">
                            <span className="text-4xl">💎</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">PetHub Premium</h2>
                        <p className="text-white/80 text-sm mb-6 max-w-xs mx-auto">
                            A experiência completa para tutores dedicados que amam seus pets
                        </p>

                        {isPremium ? (
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 inline-flex items-center gap-2">
                                <span className="material-symbols-outlined text-white">verified</span>
                                <span className="font-bold">Você é Premium!</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-4xl font-bold">R$ 19,90</span>
                                    <span className="text-white/70">/mês</span>
                                </div>
                                <span className="text-white/60 text-xs">Cancele quando quiser</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Current Status for Premium Users */}
                {isPremium && (
                    <div className="px-5 -mt-6 relative z-10 animate-slideUp">
                        <div className="bg-surface rounded-2xl shadow-soft-lg p-5 border border-success/30">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-success text-2xl">workspace_premium</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-text-primary font-bold">Assinatura Ativa</h3>
                                    <p className="text-text-muted text-sm">Próxima cobrança: 25/02/2026</p>
                                </div>
                                <button
                                    onClick={handleCancel}
                                    className="text-danger text-sm font-semibold"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Points Comparison */}
                <div className="px-5 pt-8 animate-slideUp stagger-1">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary">trending_up</span>
                        <h3 className="text-text-primary font-bold text-lg">Ganhe 1.5x mais pontos</h3>
                    </div>

                    <div className="bg-surface rounded-2xl shadow-soft p-4 border border-border/50">
                        <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                            <div className="text-text-muted text-xs font-semibold">Ação</div>
                            <div className="text-text-muted text-xs font-semibold">🆓 Free</div>
                            <div className="text-primary text-xs font-semibold">💎 Premium</div>
                        </div>

                        {pointsComparison.slice(0, 6).map((item, index) => (
                            <div key={index} className="grid grid-cols-3 gap-2 py-2 border-t border-border/50 text-center items-center">
                                <span className="text-text-primary text-xs font-medium text-left truncate">{item.action}</span>
                                <span className="text-text-muted text-sm">{item.free} pts</span>
                                <span className="text-primary font-bold text-sm">{item.premium} pts</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Premium Benefits */}
                <div className="px-5 pt-8 animate-slideUp stagger-2">
                    <h3 className="text-text-primary font-bold text-lg mb-4">Benefícios Exclusivos</h3>

                    <div className="space-y-3">
                        {premiumPlan.features.slice(1).map((feature, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-4 p-4 rounded-2xl ${feature.highlight
                                    ? 'bg-gradient-to-r from-primary/10 to-amber-400/10 border border-primary/20'
                                    : 'bg-surface shadow-soft border border-border/50'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${feature.highlight ? 'bg-primary text-white' : 'bg-background text-primary'
                                    }`}>
                                    <span className="material-symbols-outlined">{feature.icon}</span>
                                </div>
                                <span className={`flex-1 font-medium text-sm ${feature.highlight ? 'text-text-primary' : 'text-text-secondary'
                                    }`}>
                                    {feature.text}
                                </span>
                                {feature.highlight && (
                                    <span className="text-lg">✨</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Exclusive Rewards Preview */}
                <div className="px-5 pt-8 animate-slideUp stagger-3">
                    <h3 className="text-text-primary font-bold text-lg mb-4">Prêmios Exclusivos Premium</h3>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { name: 'Consulta Veterinária', points: 1200, icon: '🩺' },
                            { name: 'Banho + Tosa', points: 800, icon: '🛁' },
                            { name: 'Brinquedo Premium', points: 2000, icon: '🎾' },
                            { name: 'Pet Hotel', points: 10000, icon: '🏨' },
                        ].map((reward, index) => (
                            <div key={index} className="bg-surface rounded-2xl p-4 shadow-soft border border-border/50">
                                <div className="text-2xl mb-2">{reward.icon}</div>
                                <h4 className="text-text-primary font-bold text-sm">{reward.name}</h4>
                                <p className="text-primary font-bold text-xs mt-1">{reward.points.toLocaleString()} 🐾</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div className="px-5 pt-8 animate-slideUp stagger-4">
                    <h3 className="text-text-primary font-bold text-lg mb-4">Perguntas Frequentes</h3>

                    <div className="space-y-4">
                        <div className="bg-surface rounded-2xl p-4 shadow-soft border border-border/50">
                            <h4 className="text-text-primary font-bold text-sm mb-2">Posso cancelar a qualquer momento?</h4>
                            <p className="text-text-muted text-xs">Sim! Você pode cancelar sua assinatura quando quiser, sem multas ou taxas extras.</p>
                        </div>
                        <div className="bg-surface rounded-2xl p-4 shadow-soft border border-border/50">
                            <h4 className="text-text-primary font-bold text-sm mb-2">Como funciona a pontuação 10x?</h4>
                            <p className="text-text-muted text-xs">Usuários Premium ganham 1.5x mais pontos por cada ação no app, acelerando o resgate de prêmios.</p>
                        </div>
                        <div className="bg-surface rounded-2xl p-4 shadow-soft border border-border/50">
                            <h4 className="text-text-primary font-bold text-sm mb-2">Quais formas de pagamento?</h4>
                            <p className="text-text-muted text-xs">Aceitamos cartão de crédito, PIX e boleto. A cobrança é mensal e automática.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* CTA Button */}
            {!isPremium && (
                <div className="fixed bottom-24 left-0 right-0 px-5 z-30 flex justify-center">
                    <div className="max-w-[480px] w-full">
                        <button
                            onClick={handleSubscribe}
                            className="w-full bg-gradient-to-r from-primary via-amber-500 to-primary-dark text-white font-bold py-4 px-6 rounded-2xl shadow-glow flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:shadow-glow-lg"
                        >
                            <span className="text-xl">💎</span>
                            Assinar Premium • R$ 19,90/mês
                        </button>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {showPayment && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center animate-fadeIn">
                    <div className="bg-surface w-full max-w-[480px] rounded-t-3xl p-6 pb-10 animate-slideUp">
                        <div className="w-12 h-1 bg-border rounded-full mx-auto mb-6"></div>

                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-amber-500 mb-4">
                                <span className="text-3xl">💎</span>
                            </div>
                            <h3 className="text-text-primary font-bold text-xl">Confirmar Assinatura</h3>
                            <p className="text-text-muted text-sm mt-2">PetHub Premium • R$ 19,90/mês</p>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-background rounded-2xl p-4 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">credit_card</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-text-primary font-medium text-sm">Cartão de Crédito</p>
                                    <p className="text-text-muted text-xs">**** **** **** 1234</p>
                                </div>
                                <span className="material-symbols-outlined text-text-muted">check_circle</span>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="bg-background rounded-2xl p-4 mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-text-muted text-sm">PetHub Premium</span>
                                <span className="text-text-primary font-medium">R$ 19,90</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-border">
                                <span className="text-text-primary font-bold">Total mensal</span>
                                <span className="text-primary font-bold text-lg">R$ 19,90</span>
                            </div>
                        </div>

                        <p className="text-text-muted text-xs text-center mb-6">
                            Ao confirmar, você concorda com os{' '}
                            <span className="text-primary">Termos de Uso</span> e{' '}
                            <span className="text-primary">Política de Privacidade</span>
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowPayment(false)}
                                className="flex-1 bg-background text-text-primary font-bold py-4 rounded-2xl border border-border"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmPayment}
                                disabled={processing}
                                className="flex-1 bg-gradient-to-r from-primary to-amber-500 text-white font-bold py-4 rounded-2xl shadow-glow disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <span className="animate-spin">⏳</span>
                                        Processando...
                                    </>
                                ) : (
                                    <>
                                        Confirmar
                                        <span className="material-symbols-outlined">check</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Premium;
