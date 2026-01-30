import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getRewards,
    getUserLevel,
    redeemReward,
} from '@/src/services/gamification';
import { levelDefinitions } from '@/src/data/gamification';
import type { Reward, UserLevel, Badge } from '@/src/types/gamification';
import { Modal } from '@/src/components/ui';
import { RewardCard } from '@/src/components/gamification';
import { useGamification } from '@/src/contexts/GamificationContext';

const Rewards: React.FC = () => {
    const navigate = useNavigate();
    const { isPremium } = useGamification();
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
    const [filter, setFilter] = useState<'all' | 'available'>('all');
    const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
    const [redeeming, setRedeeming] = useState(false);
    const [redeemResult, setRedeemResult] = useState<{ success: boolean; code?: string; error?: string } | null>(null);

    useEffect(() => {
        setRewards(getRewards());
        setUserLevel(getUserLevel());
    }, []);

    if (!userLevel) return null;

    const filteredRewards = filter === 'available'
        ? rewards.filter(r => r.minLevel <= userLevel.currentLevel && userLevel.availablePoints >= r.pointsCost && r.currentStock > 0)
        : rewards;

    const canRedeem = (reward: Reward) => {
        return reward.minLevel <= userLevel.currentLevel &&
            userLevel.availablePoints >= reward.pointsCost &&
            reward.currentStock > 0;
    };

    const getLevelName = (level: number) => {
        return levelDefinitions.find(l => l.level === level)?.name || `Nível ${level}`;
    };

    const getCategoryIcon = (category: string) => {
        const icons: Record<string, string> = {
            discount: 'sell',
            service: 'spa',
            product: 'inventory_2',
            subscription: 'workspace_premium',
            donation: 'volunteer_activism',
            experience: 'celebration',
        };
        return icons[category] || 'redeem';
    };

    const getCategoryLabel = (category: string) => {
        const labels: Record<string, string> = {
            discount: 'Desconto',
            service: 'Serviço',
            product: 'Produto',
            subscription: 'Assinatura',
            donation: 'Doação',
            experience: 'Experiência',
        };
        return labels[category] || category;
    };

    const handleUpgrade = () => {
        navigate('/premium');
    };

    const handleRedeem = async () => {
        if (!selectedReward) return;

        setRedeeming(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const result = await redeemReward(selectedReward.id);
        setRedeemResult(result);

        if (result.success) {
            setUserLevel(getUserLevel());
            setRewards(getRewards());
        }

        setRedeeming(false);
    };

    const closeModal = () => {
        setSelectedReward(null);
        setRedeemResult(null);
    };

    return (
        <div className="flex flex-col pb-28 min-h-screen bg-background transition-colors duration-300">
            {/* Header */}
            <div className="bg-surface pt-12 pb-4 px-5 border-b border-border">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex size-10 items-center justify-center rounded-xl bg-background text-text-primary"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div className="flex-1">
                        <h1 className="text-text-primary text-xl font-bold">Prêmios</h1>
                        <p className="text-text-muted text-sm">Troque patinhas por recompensas</p>
                    </div>
                    <div className="bg-primary/10 rounded-xl px-3 py-2">
                        <span className="text-primary font-bold">{userLevel.availablePoints.toLocaleString()} 🐾</span>
                    </div>
                </div>

                {/* Filter */}
                <div className="flex bg-background rounded-xl p-1 mt-4">
                    <button
                        onClick={() => setFilter('all')}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${filter === 'all'
                            ? 'bg-surface shadow-soft text-primary'
                            : 'text-text-muted'
                            }`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setFilter('available')}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${filter === 'available'
                            ? 'bg-surface shadow-soft text-primary'
                            : 'text-text-muted'
                            }`}
                    >
                        Disponíveis
                    </button>
                </div>
            </div>

            {/* Rewards Grid */}
            <div className="px-5 py-5 grid grid-cols-2 gap-4">
                {filteredRewards.map((reward) => {
                    return (
                        <div key={reward.id}> {/* Wrapper needed for layout if needed, but RewardCard handles click */}
                            <RewardCard
                                {...reward}
                                userLevel={userLevel.currentLevel}
                                userPoints={userLevel.availablePoints}
                                isUserPremium={isPremium}
                                onSelect={() => setSelectedReward(reward)}
                                onUpgrade={handleUpgrade}
                            />
                        </div>
                    );
                })}
            </div>

            {filteredRewards.length === 0 && (
                <div className="px-5 py-10 text-center">
                    <span className="text-5xl block mb-4">🎁</span>
                    <h3 className="text-text-primary font-bold mb-2">Nenhum prêmio encontrado</h3>
                    <p className="text-text-muted text-sm">
                        {filter === 'available'
                            ? 'Continue ganhando patinhas para desbloquear prêmios!'
                            : 'Prêmios em breve...'
                        }
                    </p>
                </div>
            )}

            {/* Redeem Modal */}
            <Modal
                isOpen={!!selectedReward}
                onClose={closeModal}
                title={redeemResult ? (redeemResult.success ? 'Resgatado!' : 'Ops!') : 'Resgatar Prêmio'}
                size="md"
            >
                {selectedReward && !redeemResult && (
                    <div className="space-y-4">
                        <div className="rounded-2xl overflow-hidden">
                            <img
                                src={selectedReward.image}
                                alt={selectedReward.name}
                                className="w-full h-40 object-cover"
                            />
                        </div>

                        <div>
                            <h3 className="text-text-primary font-bold text-lg">{selectedReward.name}</h3>
                            <p className="text-text-secondary text-sm mt-1">{selectedReward.description}</p>
                        </div>

                        <div className="bg-background rounded-xl p-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-text-muted text-sm">Custo</span>
                                <span className="text-primary font-bold">{selectedReward.pointsCost.toLocaleString()} 🐾</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-muted text-sm">Seu saldo</span>
                                <span className="text-text-primary font-bold">{userLevel.availablePoints.toLocaleString()} 🐾</span>
                            </div>
                            <hr className="border-border" />
                            <div className="flex justify-between">
                                <span className="text-text-muted text-sm">Saldo após resgate</span>
                                <span className={`font-bold ${userLevel.availablePoints >= selectedReward.pointsCost ? 'text-success' : 'text-danger'}`}>
                                    {(userLevel.availablePoints - selectedReward.pointsCost).toLocaleString()} 🐾
                                </span>
                            </div>
                        </div>

                        {selectedReward.conditions && (
                            <div className="bg-warning/10 rounded-xl p-3 flex items-start gap-2">
                                <span className="material-symbols-outlined text-warning text-lg">info</span>
                                <p className="text-text-secondary text-sm">{selectedReward.conditions}</p>
                            </div>
                        )}

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={closeModal}
                                className="flex-1 py-3 rounded-xl border-2 border-border text-text-secondary font-semibold"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleRedeem}
                                disabled={!canRedeem(selectedReward) || redeeming}
                                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold shadow-glow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {redeeming ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"></span>
                                ) : (
                                    'Confirmar Resgate'
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {redeemResult && (
                    <div className="text-center py-4">
                        {redeemResult.success ? (
                            <>
                                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                                    <span className="material-symbols-outlined text-success text-4xl">celebration</span>
                                </div>
                                <h3 className="text-text-primary font-bold text-xl mb-2">Prêmio Resgatado!</h3>
                                <p className="text-text-secondary text-sm mb-4">
                                    Seu código de resgate:
                                </p>
                                <div className="bg-background rounded-xl p-4 mb-4">
                                    <p className="text-primary font-mono font-bold text-lg tracking-wider">
                                        {redeemResult.code}
                                    </p>
                                </div>
                                <p className="text-text-muted text-xs">
                                    Código copiado para a área de transferência
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="w-20 h-20 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
                                    <span className="material-symbols-outlined text-danger text-4xl">error</span>
                                </div>
                                <h3 className="text-text-primary font-bold text-xl mb-2">Não foi possível resgatar</h3>
                                <p className="text-text-secondary text-sm">
                                    {redeemResult.error}
                                </p>
                            </>
                        )}

                        <button
                            onClick={closeModal}
                            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold"
                        >
                            Fechar
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Rewards;
