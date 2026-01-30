import React from 'react';

interface LevelProgressProps {
    currentPoints: number;
    pointsForNextLevel: number;
    currentLevel: number;
    currentLevelName: string;
    nextLevelName?: string;
    showLabels?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const LevelProgress: React.FC<LevelProgressProps> = ({
    currentPoints,
    pointsForNextLevel,
    currentLevel,
    currentLevelName,
    nextLevelName,
    showLabels = true,
    size = 'md',
    className = '',
}) => {
    const progressPercent = pointsForNextLevel > 0
        ? Math.min(100, Math.floor((currentPoints / (currentPoints + pointsForNextLevel)) * 100))
        : 100;

    const heightClasses = {
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
    };

    const textClasses = {
        sm: 'text-[10px]',
        md: 'text-xs',
        lg: 'text-sm',
    };

    // Generate paw print markers
    const pawPositions = [0, 25, 50, 75, 100];

    return (
        <div className={`w-full ${className}`}>
            {showLabels && (
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        <span className={`font-bold text-text-primary ${textClasses[size]}`}>
                            Nível {currentLevel}
                        </span>
                        <span className={`text-text-muted ${textClasses[size]}`}>
                            {currentLevelName}
                        </span>
                    </div>
                    <span className={`text-primary font-bold ${textClasses[size]}`}>
                        {progressPercent}%
                    </span>
                </div>
            )}

            {/* Progress Bar Container */}
            <div className={`relative ${heightClasses[size]} bg-surface rounded-full overflow-visible`}>
                {/* Background track */}
                <div className="absolute inset-0 bg-background rounded-full"></div>

                {/* Filled progress */}
                <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full"></div>
                </div>

                {/* Paw markers */}
                {size !== 'sm' && pawPositions.map((pos) => (
                    <div
                        key={pos}
                        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300 ${pos <= progressPercent ? 'opacity-100 scale-100' : 'opacity-30 scale-75'
                            }`}
                        style={{ left: `${pos}%` }}
                    >
                        <span className={`${size === 'lg' ? 'text-sm' : 'text-[10px]'}`}>
                            🐾
                        </span>
                    </div>
                ))}
            </div>

            {showLabels && nextLevelName && pointsForNextLevel > 0 && (
                <p className={`text-text-muted ${textClasses[size]} mt-1.5 text-center`}>
                    Faltam <span className="text-primary font-bold">{pointsForNextLevel.toLocaleString()} 🐾</span> para {nextLevelName}
                </p>
            )}
        </div>
    );
};

export default LevelProgress;
