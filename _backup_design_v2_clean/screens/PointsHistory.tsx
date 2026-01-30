import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTransactionHistory, getUserLevel } from '@/src/services/gamification';
import type { PointTransaction, UserLevel } from '@/src/types/gamification';

const PointsHistory: React.FC = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState<PointTransaction[]>([]);
    const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
    const [filter, setFilter] = useState<'all' | 'earned' | 'spent'>('all');

    useEffect(() => {
        setTransactions(getTransactionHistory());
        setUserLevel(getUserLevel());
    }, []);

    if (!userLevel) return null;

    const getActionLabel = (action: string): string => {
        const labels: Record<string, string> = {
            registrar_vacina: 'Vacina registrada',
            agendar_consulta: 'Consulta agendada',
            comparecer_consulta: 'Check-in na clínica',
            ler_dica: 'Dica lida',
            doar_abrigo: 'Doação para abrigo',
            marcar_banho: 'Banho marcado',
            avaliar_servico: 'Serviço avaliado',
            indicar_amigo: 'Amigo indicado',
            adicionar_pet: 'Pet adicionado',
            completar_perfil: 'Perfil completado',
            assistir_video: 'Vídeo assistido',
            participar_forum: 'Participação no fórum',
            reportar_abandono: 'Denúncia registrada',
            atualizar_peso: 'Peso atualizado',
            criar_alerta_medicamento: 'Alerta criado',
            level_up_bonus: 'Bônus de nível',
            streak_bonus: 'Bônus de streak',
            badge_bonus: 'Bônus de badge',
            reward_redemption: 'Prêmio resgatado',
        };
        return labels[action] || action;
    };

    const getActionIcon = (action: string): string => {
        const icons: Record<string, string> = {
            registrar_vacina: 'vaccines',
            agendar_consulta: 'calendar_today',
            comparecer_consulta: 'location_on',
            ler_dica: 'menu_book',
            doar_abrigo: 'volunteer_activism',
            marcar_banho: 'shower',
            avaliar_servico: 'star',
            indicar_amigo: 'group_add',
            adicionar_pet: 'pets',
            completar_perfil: 'person',
            assistir_video: 'play_circle',
            participar_forum: 'forum',
            reportar_abandono: 'report',
            atualizar_peso: 'monitor_weight',
            criar_alerta_medicamento: 'alarm',
            level_up_bonus: 'arrow_upward',
            streak_bonus: 'local_fire_department',
            badge_bonus: 'emoji_events',
            reward_redemption: 'redeem',
        };
        return icons[action] || 'stars';
    };

    // Extended transaction type with isSpent flag
    type ExtendedTransaction = PointTransaction & { isSpent: boolean };

    // For demo, simulate some spent transactions
    const allTransactions: ExtendedTransaction[] = transactions.map(t => ({
        ...t,
        isSpent: t.action === 'reward_redemption',
    }));

    const filteredTransactions = allTransactions.filter(t => {
        if (filter === 'earned') return !t.isSpent;
        if (filter === 'spent') return t.isSpent;
        return true;
    });

    // Group transactions by date
    const groupedTransactions: Record<string, ExtendedTransaction[]> = filteredTransactions.reduce((groups, transaction) => {
        const date = new Date(transaction.createdAt).toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        });
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
    }, {} as Record<string, ExtendedTransaction[]>);

    const totalEarned = transactions.reduce((sum, t) => sum + t.points, 0);
    const totalSpent = userLevel.spentPoints;

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
                    <div>
                        <h1 className="text-text-primary text-xl font-bold">Histórico</h1>
                        <p className="text-text-muted text-sm">Suas patinhas ganhas e gastas</p>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="px-5 py-4">
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-success/10 rounded-2xl p-4 text-center">
                        <span className="material-symbols-outlined text-success text-2xl">trending_up</span>
                        <p className="text-success font-bold text-lg mt-1">+{totalEarned.toLocaleString()}</p>
                        <p className="text-text-muted text-[10px] uppercase tracking-wider">Ganhas</p>
                    </div>
                    <div className="bg-danger/10 rounded-2xl p-4 text-center">
                        <span className="material-symbols-outlined text-danger text-2xl">trending_down</span>
                        <p className="text-danger font-bold text-lg mt-1">-{totalSpent.toLocaleString()}</p>
                        <p className="text-text-muted text-[10px] uppercase tracking-wider">Gastas</p>
                    </div>
                    <div className="bg-primary/10 rounded-2xl p-4 text-center">
                        <span className="material-symbols-outlined text-primary text-2xl">account_balance_wallet</span>
                        <p className="text-primary font-bold text-lg mt-1">{userLevel.availablePoints.toLocaleString()}</p>
                        <p className="text-text-muted text-[10px] uppercase tracking-wider">Saldo</p>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-5 pb-4">
                <div className="flex bg-surface rounded-xl p-1 shadow-soft">
                    {(['all', 'earned', 'spent'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${filter === f
                                ? 'bg-background shadow-soft text-primary'
                                : 'text-text-muted'
                                }`}
                        >
                            {f === 'all' ? 'Todas' : f === 'earned' ? 'Ganhas' : 'Gastas'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Transactions List */}
            <div className="px-5 space-y-4">
                {Object.entries(groupedTransactions).map(([date, txs]) => (
                    <div key={date}>
                        <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-2 capitalize">
                            {date}
                        </p>
                        <div className="bg-surface rounded-2xl shadow-soft overflow-hidden">
                            {txs.map((tx, index) => (
                                <div
                                    key={tx.id}
                                    className={`flex items-center gap-4 p-4 ${index < txs.length - 1 ? 'border-b border-border' : ''
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.isSpent ? 'bg-danger/10' : 'bg-success/10'
                                        }`}>
                                        <span className={`material-symbols-outlined ${tx.isSpent ? 'text-danger' : 'text-success'
                                            }`}>
                                            {getActionIcon(tx.action)}
                                        </span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-text-primary font-medium text-sm truncate">
                                            {getActionLabel(tx.action)}
                                        </p>
                                        <p className="text-text-muted text-xs">
                                            {new Date(tx.createdAt).toLocaleTimeString('pt-BR', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className={`font-bold ${tx.isSpent ? 'text-danger' : 'text-success'}`}>
                                            {tx.isSpent ? '-' : '+'}{tx.points} 🐾
                                        </p>
                                        {tx.multiplier !== 1 && (
                                            <p className="text-text-muted text-xs">
                                                x{tx.multiplier.toFixed(1)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {filteredTransactions.length === 0 && (
                    <div className="bg-surface rounded-2xl p-8 text-center">
                        <span className="text-5xl block mb-4">📋</span>
                        <h3 className="text-text-primary font-bold mb-2">Nenhuma transação</h3>
                        <p className="text-text-muted text-sm">
                            {filter === 'earned'
                                ? 'Comece a ganhar patinhas usando o app!'
                                : filter === 'spent'
                                    ? 'Você ainda não resgatou nenhum prêmio'
                                    : 'Seu histórico aparecerá aqui'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PointsHistory;
