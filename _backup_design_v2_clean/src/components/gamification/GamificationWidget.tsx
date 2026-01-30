import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGamification } from '@/src/contexts/GamificationContext';
import { levelDefinitions } from '@/src/data/gamification';

interface GamificationWidgetProps {
    variant?: 'full' | 'compact' | 'mini';
    className?: string;
}

const GamificationWidget: React.FC<GamificationWidgetProps> = ({
    variant = 'full',
    className = '',
}) => {
    const navigate = useNavigate();
    const { userLevel } = useGamification();

    if (!userLevel) return null;

    const currentLevelDef = levelDefinitions.find(l => l.level === userLevel.currentLevel);

    if (variant === 'mini') {
        return (
            <button
                onClick={() => navigate('/gamification')}
                className={`flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl px-3 py-2 ${className}`}
            >
                <span className="text-lg">🐾</span>
                <span className="text-primary font-bold">{userLevel.availablePoints.toLocaleString()}</span>
            </button>
        );
    }

    if (variant === 'compact') {
        return (
            <button
                onClick={() => navigate('/gamification')}
                className={`bg-surface rounded-2xl p-3 shadow-soft flex items-center gap-3 w-full ${className}`}
            >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-lg">
                    {currentLevelDef?.badge}
                </div>
                <div className="flex-1 text-left">
                    <p className="text-text-primary font-bold text-sm">Nível {userLevel.currentLevel}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-primary font-bold text-xs">{userLevel.availablePoints.toLocaleString()} 🐾</span>
                        {userLevel.streakDays > 0 && (
                            <span className="text-text-muted text-xs">• 🔥 {userLevel.streakDays}</span>
                        )}
                    </div>
                </div>
                <span className="material-symbols-outlined text-text-muted">chevron_right</span>
            </button>
        );
    }

    // Full variant
    return (
        <div
            onClick={() => navigate('/gamification')}
            className={`bg-gradient-to-br from-primary via-primary to-primary-dark rounded-2xl p-4 shadow-glow-sm cursor-pointer hover:shadow-glow transition-all ${className}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                        {currentLevelDef?.badge}
                    </div>
                    <div>
                        <p className="text-white font-bold">{userLevel.levelName}</p>
                        <p className="text-white/70 text-sm">Nível {userLevel.currentLevel}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-white font-bold text-xl">{userLevel.availablePoints.toLocaleString()}</p>
                    <p className="text-white/70 text-xs">patinhas 🐾</p>
                </div>
            </div>

            {/* Progress bar */}
            {/* Progress bar with milestones */}
            <div className="mt-4 relative">
                <div className="h-3 bg-black/20 rounded-full overflow-hidden relative">
                    {/* Background track */}
                    <div className="absolute inset-0 w-full h-full bg-black/10"></div>

                    {/* Fill */}
                    <div
                        className="h-full bg-gradient-to-r from-white/80 to-white rounded-full transition-all duration-700 ease-out relative z-10"
                        style={{ width: `${userLevel.progressPercent}%` }}
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    </div>

                    {/* Milestones (20%, 40%, 60%, 80%) */}
                    {[20, 40, 60, 80].map((milestone) => (
                        <div
                            key={milestone}
                            className={`absolute top-0 bottom-0 w-[2px] z-20 transition-colors duration-300 ${userLevel.progressPercent >= milestone ? 'bg-primary/50' : 'bg-white/30'
                                }`}
                            style={{ left: `${milestone}%` }}
                        ></div>
                    ))}
                </div>

                {/* Motivational Message */}
                <div className="flex justify-between items-center mt-2.5">
                    <span className="text-white font-medium text-xs flex items-center gap-1.5">
                        {userLevel.progressPercent >= 90 ? '🚀 Falta muito pouco!' :
                            userLevel.progressPercent >= 75 ? '🔥 Você está voando!' :
                                userLevel.progressPercent >= 50 ? '⭐ Meio caminho andado!' :
                                    userLevel.progressPercent >= 25 ? '💪 Ótimo começo!' :
                                        '🌱 Vamos evoluir?'}
                    </span>
                    <span className="text-white/80 text-[10px] font-mono bg-black/20 px-1.5 py-0.5 rounded">
                        {Math.floor(userLevel.pointsToNextLevel)} pts p/ up
                    </span>
                </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 mt-4">
                <button
                    onClick={(e) => { e.stopPropagation(); navigate('/missions'); }}
                    className="bg-white/10 rounded-xl py-2 text-center hover:bg-white/20 transition-colors"
                >
                    <span className="text-lg">🎯</span>
                    <p className="text-white/80 text-[10px]">Missões</p>
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); navigate('/rewards'); }}
                    className="bg-white/10 rounded-xl py-2 text-center hover:bg-white/20 transition-colors"
                >
                    <span className="text-lg">🎁</span>
                    <p className="text-white/80 text-[10px]">Prêmios</p>
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); navigate('/leaderboard'); }}
                    className="bg-white/10 rounded-xl py-2 text-center hover:bg-white/20 transition-colors"
                >
                    <span className="text-lg">🏆</span>
                    <p className="text-white/80 text-[10px]">Ranking</p>
                </button>
            </div>
        </div>
    );
};

export default GamificationWidget;
