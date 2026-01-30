import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLeaderboard, getUserLevel } from '@/src/services/gamification';
import { levelDefinitions } from '@/src/data/gamification';
import type { LeaderboardEntry, LeaderboardScope, UserLevel } from '@/src/types/gamification';

const Leaderboard: React.FC = () => {
    const navigate = useNavigate();
    const [scope, setScope] = useState<LeaderboardScope>('global');
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [userLevel, setUserLevel] = useState<UserLevel | null>(null);

    useEffect(() => {
        setEntries(getLeaderboard(scope));
        setUserLevel(getUserLevel());
    }, [scope]);

    if (!userLevel) return null;

    const currentLevelDef = levelDefinitions.find(l => l.level === userLevel.currentLevel);

    // Mock user position
    const userPosition = 127;

    const getRankStyle = (rank: number) => {
        if (rank === 1) return 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg';
        if (rank === 2) return 'bg-gradient-to-br from-gray-300 to-gray-400 text-white';
        if (rank === 3) return 'bg-gradient-to-br from-amber-600 to-amber-700 text-white';
        return 'bg-background text-text-primary';
    };

    const getRankIcon = (rank: number) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return rank.toString();
    };

    return (
        <div className="flex flex-col pb-28 min-h-screen bg-background transition-colors duration-300">
            {/* Header */}
            <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-primary pt-12 pb-8 px-5 relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>

                <div className="text-center pt-6">
                    <span className="text-5xl mb-2 block">🏆</span>
                    <h1 className="text-white text-2xl font-bold">Ranking</h1>
                    <p className="text-white/70 text-sm">Os melhores tutores do PetHub</p>
                </div>

                {/* Scope Selector */}
                <div className="flex bg-white/20 backdrop-blur-sm rounded-xl p-1 mt-6">
                    {(['weekly', 'city', 'state', 'global'] as LeaderboardScope[]).map((s) => (
                        <button
                            key={s}
                            onClick={() => setScope(s)}
                            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${scope === s
                                    ? 'bg-white text-primary shadow-soft'
                                    : 'text-white/80'
                                }`}
                        >
                            {s === 'weekly' ? 'Semana' : s === 'city' ? 'Cidade' : s === 'state' ? 'Estado' : 'Global'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Top 3 Podium */}
            <div className="px-5 -mt-4">
                <div className="bg-surface rounded-3xl p-5 shadow-soft-xl">
                    <div className="flex justify-center items-end gap-4">
                        {/* 2nd Place */}
                        {entries[1] && (
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    <img
                                        src={entries[1].userAvatar}
                                        alt={entries[1].userName}
                                        className="w-16 h-16 rounded-full object-cover border-4 border-gray-300"
                                    />
                                    <div className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-xs font-bold shadow">
                                        2
                                    </div>
                                </div>
                                <p className="text-text-primary font-semibold text-sm mt-2 truncate max-w-[80px]">
                                    {entries[1].userName.split(' ')[0]}
                                </p>
                                <p className="text-text-muted text-xs">{entries[1].points.toLocaleString()} 🐾</p>
                                <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-t-lg mt-2 flex items-end justify-center pb-1">
                                    <span className="text-2xl">🥈</span>
                                </div>
                            </div>
                        )}

                        {/* 1st Place */}
                        {entries[0] && (
                            <div className="flex flex-col items-center -mt-4">
                                <div className="relative">
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                                        <span className="text-3xl">👑</span>
                                    </div>
                                    <img
                                        src={entries[0].userAvatar}
                                        alt={entries[0].userName}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
                                    />
                                    <div className="absolute -bottom-2 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                                        1
                                    </div>
                                </div>
                                <p className="text-text-primary font-bold mt-2 truncate max-w-[100px]">
                                    {entries[0].userName.split(' ')[0]}
                                </p>
                                <p className="text-primary font-semibold text-sm">{entries[0].points.toLocaleString()} 🐾</p>
                                <div className="h-24 w-20 bg-gradient-to-t from-yellow-400 to-amber-300 rounded-t-lg mt-2 flex items-end justify-center pb-2">
                                    <span className="text-3xl">🥇</span>
                                </div>
                            </div>
                        )}

                        {/* 3rd Place */}
                        {entries[2] && (
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    <img
                                        src={entries[2].userAvatar}
                                        alt={entries[2].userName}
                                        className="w-16 h-16 rounded-full object-cover border-4 border-amber-600"
                                    />
                                    <div className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white text-xs font-bold shadow">
                                        3
                                    </div>
                                </div>
                                <p className="text-text-primary font-semibold text-sm mt-2 truncate max-w-[80px]">
                                    {entries[2].userName.split(' ')[0]}
                                </p>
                                <p className="text-text-muted text-xs">{entries[2].points.toLocaleString()} 🐾</p>
                                <div className="h-12 w-16 bg-amber-200 dark:bg-amber-900/30 rounded-t-lg mt-2 flex items-end justify-center pb-1">
                                    <span className="text-2xl">🥉</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Rest of Leaderboard */}
            <div className="px-5 mt-5">
                <h2 className="text-text-primary font-bold mb-3">Classificação Geral</h2>

                <div className="bg-surface rounded-2xl shadow-soft overflow-hidden">
                    {entries.slice(3).map((entry, index) => (
                        <div
                            key={entry.userId}
                            className={`flex items-center gap-4 p-4 ${index < entries.length - 4 ? 'border-b border-border' : ''
                                }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getRankStyle(entry.rank)}`}>
                                {entry.rank}
                            </div>
                            <img
                                src={entry.userAvatar}
                                alt={entry.userName}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-text-primary font-semibold truncate">{entry.userName}</p>
                                <p className="text-text-muted text-xs">{entry.levelName}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-primary font-bold">{entry.points.toLocaleString()}</p>
                                <p className="text-text-muted text-xs">patinhas</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* My Position - Fixed Bottom */}
            <div className="fixed bottom-20 left-0 right-0 max-w-[480px] mx-auto px-5">
                <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-4 shadow-glow flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white">
                        {userPosition}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                        {currentLevelDef?.badge}
                    </div>
                    <div className="flex-1">
                        <p className="text-white font-bold">Você</p>
                        <p className="text-white/70 text-xs">{userLevel.levelName}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-white font-bold">{userLevel.totalPoints.toLocaleString()}</p>
                        <p className="text-white/70 text-xs">patinhas</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
