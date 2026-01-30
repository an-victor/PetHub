import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBadges, getUserBadges } from '@/src/services/gamification';
import type { Badge, UserBadge, BadgeCategory } from '@/src/types/gamification';

const Badges: React.FC = () => {
    const navigate = useNavigate();
    const [allBadges, setAllBadges] = useState<Badge[]>([]);
    const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<BadgeCategory | 'all'>('all');
    const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

    useEffect(() => {
        setAllBadges(getBadges());
        setUserBadges(getUserBadges());
    }, []);

    const categories: { id: BadgeCategory | 'all'; label: string; icon: string }[] = [
        { id: 'all', label: 'Todos', icon: 'grid_view' },
        { id: 'health', label: 'Saúde', icon: 'favorite' },
        { id: 'social', label: 'Social', icon: 'group' },
        { id: 'donation', label: 'Doação', icon: 'volunteer_activism' },
        { id: 'streak', label: 'Streak', icon: 'local_fire_department' },
        { id: 'special', label: 'Especial', icon: 'star' },
        { id: 'level', label: 'Nível', icon: 'workspace_premium' },
    ];

    const filteredBadges = selectedCategory === 'all'
        ? allBadges
        : allBadges.filter(b => b.category === selectedCategory);

    const isEarned = (badgeId: string) => {
        return userBadges.some(ub => ub.badgeId === badgeId);
    };

    const getEarnedDate = (badgeId: string) => {
        const ub = userBadges.find(ub => ub.badgeId === badgeId);
        return ub ? new Date(ub.earnedAt).toLocaleDateString('pt-BR') : null;
    };

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'from-gray-400 to-gray-500';
            case 'rare': return 'from-blue-400 to-blue-600';
            case 'epic': return 'from-purple-400 to-purple-600';
            case 'legendary': return 'from-yellow-400 to-amber-500';
            default: return 'from-gray-400 to-gray-500';
        }
    };

    const getRarityLabel = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'Comum';
            case 'rare': return 'Raro';
            case 'epic': return 'Épico';
            case 'legendary': return 'Lendário';
            default: return rarity;
        }
    };

    const earnedCount = userBadges.length;
    const totalCount = allBadges.length;
    const progressPercent = totalCount > 0 ? Math.floor((earnedCount / totalCount) * 100) : 0;

    return (
        <div className="flex flex-col pb-28 min-h-screen bg-background transition-colors duration-300">
            {/* Header */}
            <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 pt-12 pb-8 px-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>

                <div className="text-center pt-6">
                    <span className="text-5xl mb-2 block">🏅</span>
                    <h1 className="text-white text-2xl font-bold">Conquistas</h1>
                    <p className="text-white/70 text-sm">Suas medalhas e badges</p>
                </div>

                {/* Progress */}
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mt-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80 text-sm">Progresso</span>
                        <span className="text-white font-bold">{earnedCount}/{totalCount}</span>
                    </div>
                    <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                    <p className="text-white/60 text-xs mt-2 text-center">
                        {totalCount - earnedCount} badges para desbloquear
                    </p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="px-5 py-4 overflow-x-auto">
                <div className="flex gap-2 min-w-max">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${selectedCategory === cat.id
                                    ? 'bg-primary text-white shadow-glow-sm'
                                    : 'bg-surface text-text-secondary shadow-soft'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Badges Grid */}
            <div className="px-5 pb-5">
                <div className="grid grid-cols-3 gap-4">
                    {filteredBadges.map((badge) => {
                        const earned = isEarned(badge.id);

                        return (
                            <button
                                key={badge.id}
                                onClick={() => setSelectedBadge(badge)}
                                className={`relative flex flex-col items-center p-4 rounded-2xl transition-all ${earned
                                        ? 'bg-surface shadow-soft hover:shadow-soft-lg'
                                        : 'bg-surface/50 opacity-60'
                                    }`}
                            >
                                {/* Badge Icon */}
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${earned
                                        ? `bg-gradient-to-br ${getRarityColor(badge.rarity)}`
                                        : 'bg-text-muted/20'
                                    }`}>
                                    {earned ? badge.icon : '❓'}
                                </div>

                                {/* Name */}
                                <p className={`text-xs font-semibold mt-2 text-center ${earned ? 'text-text-primary' : 'text-text-muted'
                                    }`}>
                                    {earned ? badge.name : '???'}
                                </p>

                                {/* Rarity indicator */}
                                {earned && (
                                    <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br ${getRarityColor(badge.rarity)}`}></div>
                                )}

                                {/* Lock icon for locked badges */}
                                {!earned && (
                                    <span className="material-symbols-outlined text-text-muted/50 text-sm mt-1">lock</span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {filteredBadges.length === 0 && (
                    <div className="text-center py-10">
                        <span className="text-5xl block mb-4">🏅</span>
                        <p className="text-text-muted">Nenhum badge nesta categoria</p>
                    </div>
                )}
            </div>

            {/* Badge Detail Modal */}
            {selectedBadge && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center"
                    onClick={() => setSelectedBadge(null)}
                >
                    <div
                        className="bg-surface rounded-t-3xl w-full max-w-[480px] p-6 animate-slideUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close handle */}
                        <div className="w-10 h-1 bg-border rounded-full mx-auto mb-6"></div>

                        <div className="text-center">
                            {/* Badge Icon Large */}
                            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mx-auto ${isEarned(selectedBadge.id)
                                    ? `bg-gradient-to-br ${getRarityColor(selectedBadge.rarity)} shadow-lg`
                                    : 'bg-text-muted/20'
                                }`}>
                                {isEarned(selectedBadge.id) ? selectedBadge.icon : '❓'}
                            </div>

                            {/* Name & Description */}
                            <h2 className="text-text-primary text-xl font-bold mt-4">
                                {isEarned(selectedBadge.id) ? selectedBadge.name : '???'}
                            </h2>

                            <p className="text-text-secondary text-sm mt-2">
                                {selectedBadge.description}
                            </p>

                            {/* Rarity */}
                            <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-gradient-to-r ${getRarityColor(selectedBadge.rarity)}/10`}>
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${getRarityColor(selectedBadge.rarity)}`}></div>
                                <span className="text-text-primary text-sm font-semibold">
                                    {getRarityLabel(selectedBadge.rarity)}
                                </span>
                            </div>

                            {/* Requirement */}
                            <div className="bg-background rounded-xl p-4 mt-4">
                                <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Como desbloquear</p>
                                <p className="text-text-primary font-medium">{selectedBadge.requirement}</p>
                            </div>

                            {/* Earned date or status */}
                            {isEarned(selectedBadge.id) ? (
                                <div className="flex items-center justify-center gap-2 mt-4 text-success">
                                    <span className="material-symbols-outlined">check_circle</span>
                                    <span className="text-sm font-semibold">
                                        Conquistado em {getEarnedDate(selectedBadge.id)}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2 mt-4 text-text-muted">
                                    <span className="material-symbols-outlined">lock</span>
                                    <span className="text-sm">Ainda não desbloqueado</span>
                                </div>
                            )}

                            {/* Points awarded */}
                            {selectedBadge.pointsAwarded > 0 && (
                                <p className="text-primary font-bold mt-4">
                                    +{selectedBadge.pointsAwarded} 🐾 ao desbloquear
                                </p>
                            )}
                        </div>

                        <button
                            onClick={() => setSelectedBadge(null)}
                            className="w-full mt-6 py-3 rounded-xl bg-primary text-white font-bold"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Badges;
