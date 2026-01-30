import React, { useEffect, useState } from 'react';

interface PointsToastProps {
    points: number;
    message?: string;
    isVisible: boolean;
    onComplete?: () => void;
    duration?: number;
    position?: 'top' | 'center' | 'bottom';
}

const PointsToast: React.FC<PointsToastProps> = ({
    points,
    message = 'Patinhas ganhas!',
    isVisible,
    onComplete,
    duration = 2500,
    position = 'top',
}) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
            // Small delay to trigger animation
            requestAnimationFrame(() => {
                setIsAnimating(true);
            });

            const timer = setTimeout(() => {
                setIsAnimating(false);
                setTimeout(() => {
                    setShouldRender(false);
                    onComplete?.();
                }, 300);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onComplete]);

    if (!shouldRender) return null;

    const positionClasses = {
        top: 'top-20',
        center: 'top-1/2 -translate-y-1/2',
        bottom: 'bottom-28',
    };

    return (
        <div
            className={`
                fixed left-1/2 -translate-x-1/2 z-[100] pointer-events-none
                ${positionClasses[position]}
                transition-all duration-300 ease-out
                ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
            `}
        >
            <div className="bg-gradient-to-r from-success to-emerald-500 px-6 py-4 rounded-2xl shadow-glow flex flex-col items-center gap-1">
                {/* Animated paw */}
                <div className="relative">
                    <span className={`text-4xl ${isAnimating ? 'animate-bounce' : ''}`}>🐾</span>
                    {/* Sparkles */}
                    <span className="absolute -top-1 -left-2 text-sm animate-ping">✨</span>
                    <span className="absolute -top-1 -right-2 text-sm animate-ping delay-100">✨</span>
                </div>

                {/* Points */}
                <p className="text-white text-2xl font-bold">
                    +{points.toLocaleString()}
                </p>

                {/* Message */}
                <p className="text-white/80 text-sm">{message}</p>
            </div>

            {/* Rising paws animation */}
            {isAnimating && (
                <div className="absolute inset-0 pointer-events-none overflow-visible">
                    {[...Array(5)].map((_, i) => (
                        <span
                            key={i}
                            className="absolute text-xl animate-float-up"
                            style={{
                                left: `${20 + i * 15}%`,
                                animationDelay: `${i * 100}ms`,
                                animationDuration: '1.5s',
                            }}
                        >
                            🐾
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PointsToast;
