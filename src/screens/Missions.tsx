import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getMissions,
    getUserMissions,
    claimMissionReward,
    getUserLevel,
} from '@/src/services/gamification';
import type { Mission, UserMission } from '@/src/types/gamification';

const Missions: React.FC = () => {
    const navigate = useNavigate();
    const [missions, setMissions] = useState<Mission[]>([]);
    const [userMissions, setUserMissions] = useState<UserMission[]>([]);
    const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
    const [claimingId, setClaimingId] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setMissions(getMissions());
        setUserMissions(getUserMissions());
    };

    const getMissionWithProgress = (mission: Mission) => {
        const userMission = userMissions.find(um => um.missionId === mission.id);
        return { mission, userMission };
    };

    const getActiveMissions = () => {
        return missions
            .map(getMissionWithProgress)
            .filter(({ userMission }) => !userMission?.completedAt || !userMission?.rewardClaimed);
    };

    const getCompletedMissions = () => {
        return missions
            .map(getMissionWithProgress)
            .filter(({ userMission }) => userMission?.completedAt && userMission?.rewardClaimed);
    };

    const handleClaimReward = async (missionId: string) => {
        setClaimingId(missionId);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const result = await claimMissionReward(missionId, false);

        if (result.success) {
            loadData();
        }

        setClaimingId(null);
    };

    const getDifficultyStars = (difficulty: number) => {
        return Array(5).fill(0).map((_, i) => (
            <span key={i} className={i < difficulty ? 'text-warning' : 'text-text-muted/30'}>★</span>
        ));
    };

    const getProgressPercent = (userMission?: UserMission) => {
        if (!userMission || !userMission.progress[0]) return 0;
        const p = userMission.progress[0];
        return Math.floor((p.currentCount / p.targetCount) * 100);
    };

    const isCompleted = (userMission?: UserMission) => {
        return userMission?.completedAt && !userMission?.rewardClaimed;
    };

    const displayMissions = activeTab === 'active' ? getActiveMissions() : getCompletedMissions();

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
                        <h1 className="text-text-primary text-xl font-bold">Missões</h1>
                        <p className="text-text-muted text-sm">Complete desafios e ganhe recompensas</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex bg-background rounded-xl p-1 mt-4">
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'active'
                            ? 'bg-surface shadow-soft text-primary'
                            : 'text-text-muted'
                            }`}
                    >
                        Ativas ({getActiveMissions().length})
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'completed'
                            ? 'bg-surface shadow-soft text-primary'
                            : 'text-text-muted'
                            }`}
                    >
                        Concluídas ({getCompletedMissions().length})
                    </button>
                </div>
            </div>

            {/* Mission Cards */}
            <div className="px-5 py-5 space-y-4">
                {displayMissions.map(({ mission, userMission }) => {
                    const progressPercent = getProgressPercent(userMission);
                    const completed = isCompleted(userMission);
                    const claimed = userMission?.rewardClaimed;
                    const progress = userMission?.progress[0];

                    return (
                        <div
                            key={mission.id}
                            className={`bg-surface rounded-2xl shadow-soft overflow-hidden transition-all ${completed ? 'ring-2 ring-success' : ''
                                }`}
                        >
                            {/* Header */}
                            <div className="p-4 flex items-start gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${completed
                                    ? 'bg-success/10'
                                    : claimed
                                        ? 'bg-text-muted/10'
                                        : 'bg-primary/10'
                                    }`}>
                                    <span className={`material-symbols-outlined text-2xl ${completed
                                        ? 'text-success'
                                        : claimed
                                            ? 'text-text-muted'
                                            : 'text-primary'
                                        }`}>
                                        {mission.icon}
                                    </span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-text-primary font-bold">{mission.name}</h3>
                                        {mission.isPremiumOnly && (
                                            <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                PREMIUM
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-text-secondary text-sm mt-0.5">{mission.description}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="text-xs">{getDifficultyStars(mission.difficulty)}</div>
                                        <span className="text-text-muted text-xs">•</span>
                                        <span className="text-text-muted text-xs capitalize">{mission.category}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Progress */}
                            {!claimed && (
                                <div className="px-4 pb-4">
                                    <div className="bg-background rounded-xl p-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-text-secondary text-xs">
                                                {progress ? `${progress.currentCount}/${progress.targetCount}` : '0/0'}
                                            </span>
                                            <span className="text-primary text-xs font-bold">{progressPercent}%</span>
                                        </div>
                                        <div className="h-2 bg-surface rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${completed
                                                    ? 'bg-success'
                                                    : 'bg-gradient-to-r from-primary to-primary-light'
                                                    }`}
                                                style={{ width: `${progressPercent}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Reward / Action */}
                            <div className="bg-background/50 px-4 py-3 flex items-center justify-between border-t border-border">
                                <div>
                                    <span className="text-text-muted text-xs">Recompensa</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary font-bold">+{mission.freeReward.points} 🐾</span>
                                        {mission.freeReward.prize && (
                                            <span className="text-text-secondary text-xs">+ {mission.freeReward.prize}</span>
                                        )}
                                    </div>
                                </div>

                                {completed && (
                                    <button
                                        onClick={() => handleClaimReward(mission.id)}
                                        disabled={claimingId === mission.id}
                                        className="bg-gradient-to-r from-success to-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-glow-sm hover:shadow-glow active:scale-95 transition-all disabled:opacity-70"
                                    >
                                        {claimingId === mission.id ? (
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"></span>
                                        ) : (
                                            'Resgatar!'
                                        )}
                                    </button>
                                )}

                                {claimed && (
                                    <div className="flex items-center gap-1 text-success">
                                        <span className="material-symbols-outlined text-lg">check_circle</span>
                                        <span className="text-sm font-semibold">Resgatado</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                {displayMissions.length === 0 && (
                    <div className="bg-surface rounded-2xl p-8 text-center">
                        <span className="text-5xl block mb-4">
                            {activeTab === 'active' ? '🎯' : '🏆'}
                        </span>
                        <h3 className="text-text-primary font-bold mb-2">
                            {activeTab === 'active' ? 'Nenhuma missão ativa' : 'Nenhuma missão concluída'}
                        </h3>
                        <p className="text-text-muted text-sm">
                            {activeTab === 'active'
                                ? 'Continue usando o app para desbloquear missões!'
                                : 'Complete missões para ver aqui'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Missions;
