import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getUserLevel,
    getMissions,
    getUserMissions,
    updateStreak,
    getTransactionHistory,
} from '@/src/services/gamification';
import { levelDefinitions, getMissionById } from '@/src/data/gamification';
import type { UserLevel, Mission, UserMission, PointTransaction } from '@/src/types/gamification';

const Gamification: React.FC = () => {
    const navigate = useNavigate();
    const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
    const [missions, setMissions] = useState<Mission[]>([]);
    const [userMissions, setUserMissions] = useState<UserMission[]>([]);
    const [recentTransactions, setRecentTransactions] = useState<PointTransaction[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setUserLevel(await getUserLevel());
            setMissions(getMissions());
            setUserMissions(getUserMissions());
            const history = await getTransactionHistory();
            setRecentTransactions(history.slice(0, 5));
            await updateStreak();
        };
        fetchData();
    }, []);

    if (!userLevel) return null;

    const currentLevelDef = levelDefinitions.find(l => l.level === userLevel.currentLevel);
    const nextLevelDef = levelDefinitions.find(l => l.level === userLevel.currentLevel + 1);

    const getActiveMissions = () => {
        return userMissions
            .filter(um => !um.completedAt || !um.rewardClaimed)
            .slice(0, 3)
            .map(um => {
                const mission = getMissionById(um.missionId);
                return { userMission: um, mission };
            })
            .filter(m => m.mission);
    };

    const formatAction = (action: string): string => {
        const labels: Record<string, string> = {
            registrar_vacina: 'Vacina registrada',
            agendar_consulta: 'Consulta agendada',
            comparecer_consulta: 'Check-in na clínica',
            ler_dica: 'Dica lida',
            doar_abrigo: 'Doação para abrigo',
            marcar_banho: 'Banho marcado',
            avaliar_servico: 'Serviço avaliado',
            adicionar_pet: 'Pet adicionado',
            completar_perfil: 'Perfil completado',
        };
        return labels[action] || action;
    };

    return (
        <div className="flex flex-col pb-28 min-h-screen bg-background transition-colors duration-300">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary via-primary-dark to-orange-600 pt-16 pb-20 px-5 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>

                <div className="text-center pt-8">
                    <div className="text-6xl mb-3">{currentLevelDef?.badge}</div>
                    <h1 className="text-white text-2xl font-bold mb-1">{userLevel.levelName}</h1>
                    <p className="text-white/70 text-sm">Nível {userLevel.currentLevel}</p>
                </div>
            </div>

            {/* Points Card - Overlapping */}
            <div className="px-5 -mt-12">
                <div className="bg-surface rounded-3xl p-5 shadow-soft-xl">
                    {/* Available Points */}
                    <div className="text-center mb-4">
                        <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Patinhas Disponíveis</p>
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-4xl">🐾</span>
                            <span className="text-text-primary text-4xl font-bold">{userLevel.availablePoints.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Level Progress */}
                    <div className="bg-background rounded-2xl p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-text-secondary text-xs font-medium">Progresso para {nextLevelDef?.name || 'Máximo'}</span>
                            <span className="text-primary text-xs font-bold">{userLevel.progressPercent}%</span>
                        </div>
                        <div className="h-3 bg-surface rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
                                style={{ width: `${userLevel.progressPercent}%` }}
                            ></div>
                        </div>
                        {nextLevelDef && (
                            <p className="text-text-muted text-xs mt-2 text-center">
                                Faltam <span className="text-primary font-bold">{userLevel.pointsToNextLevel.toLocaleString()} 🐾</span> para {nextLevelDef.name}
                            </p>
                        )}
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="text-center p-3 bg-background rounded-xl">
                            <span className="text-2xl">🔥</span>
                            <p className="text-text-primary font-bold text-lg">{userLevel.streakDays}</p>
                            <p className="text-text-muted text-[10px] uppercase">Dias Seguidos</p>
                        </div>
                        <div className="text-center p-3 bg-background rounded-xl">
                            <span className="text-2xl">⭐</span>
                            <p className="text-text-primary font-bold text-lg">{userLevel.totalPoints.toLocaleString()}</p>
                            <p className="text-text-muted text-[10px] uppercase">Total Ganho</p>
                        </div>
                        <div className="text-center p-3 bg-background rounded-xl">
                            <span className="text-2xl">🎁</span>
                            <p className="text-text-primary font-bold text-lg">{userLevel.spentPoints.toLocaleString()}</p>
                            <p className="text-text-muted text-[10px] uppercase">Resgatados</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="px-5 mt-5">
                <div className="grid grid-cols-4 gap-3">
                    {[
                        { icon: '🎯', label: 'Missões', path: '/missions' },
                        { icon: '🎁', label: 'Prêmios', path: '/rewards' },
                        { icon: '🏆', label: 'Ranking', path: '/leaderboard' },
                        { icon: '🏅', label: 'Badges', path: '/badges' },
                    ].map((item) => (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className="flex flex-col items-center gap-2 p-4 bg-surface rounded-2xl shadow-soft hover:shadow-soft-lg active:scale-95 transition-all"
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-text-primary text-xs font-semibold">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Active Missions */}
            <div className="px-5 mt-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-text-primary font-bold text-lg">Missões Ativas</h2>
                    <button onClick={() => navigate('/missions')} className="text-primary text-sm font-semibold">
                        Ver todas
                    </button>
                </div>

                <div className="space-y-3">
                    {getActiveMissions().map(({ userMission, mission }) => {
                        if (!mission) return null;
                        const progress = userMission.progress[0];
                        const progressPercent = Math.floor((progress.currentCount / progress.targetCount) * 100);

                        return (
                            <div
                                key={userMission.id}
                                className="bg-surface rounded-2xl p-4 shadow-soft flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-xl">{mission.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-text-primary font-semibold truncate">{mission.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                                                style={{ width: `${progressPercent}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-text-muted text-xs">{progress.currentCount}/{progress.targetCount}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-primary font-bold text-sm">+{mission.freeReward.points} 🐾</span>
                                </div>
                            </div>
                        );
                    })}

                    {getActiveMissions().length === 0 && (
                        <div className="bg-surface rounded-2xl p-6 text-center">
                            <span className="text-4xl mb-2 block">🎯</span>
                            <p className="text-text-muted text-sm">Nenhuma missão ativa</p>
                            <button
                                onClick={() => navigate('/missions')}
                                className="mt-3 text-primary font-semibold text-sm"
                            >
                                Explorar missões
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="px-5 mt-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-text-primary font-bold text-lg">Atividade Recente</h2>
                    <button onClick={() => navigate('/points-history')} className="text-primary text-sm font-semibold">
                        Ver histórico
                    </button>
                </div>

                <div className="bg-surface rounded-2xl shadow-soft overflow-hidden">
                    {recentTransactions.map((tx, index) => (
                        <div
                            key={tx.id}
                            className={`flex items-center justify-between p-4 ${index < recentTransactions.length - 1 ? 'border-b border-border' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-success">add_circle</span>
                                </div>
                                <div>
                                    <p className="text-text-primary font-medium text-sm">{formatAction(tx.action)}</p>
                                    <p className="text-text-muted text-xs">
                                        {new Date(tx.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                                    </p>
                                </div>
                            </div>
                            <span className="text-success font-bold">+{tx.points} 🐾</span>
                        </div>
                    ))}

                    {recentTransactions.length === 0 && (
                        <div className="p-6 text-center">
                            <p className="text-text-muted text-sm">Nenhuma atividade recente</p>
                        </div>
                    )}
                </div>
            </div>

            {/* How to Earn */}
            <div className="px-5 mt-6 mb-6">
                <h2 className="text-text-primary font-bold text-lg mb-3">Como Ganhar Patinhas</h2>

                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 border border-primary/20">
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { icon: 'vaccines', action: 'Vacinar pet', points: 50 },
                            { icon: 'calendar_today', action: 'Agendar consulta', points: 30 },
                            { icon: 'shower', action: 'Banho e tosa', points: 25 },
                            { icon: 'volunteer_activism', action: 'Doar para abrigo', points: 100 },
                        ].map((item) => (
                            <div key={item.action} className="flex items-center gap-2 p-2 bg-white/50 dark:bg-white/5 rounded-xl">
                                <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-text-primary text-xs font-medium truncate">{item.action}</p>
                                    <p className="text-primary text-xs font-bold">+{item.points} 🐾</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gamification;
