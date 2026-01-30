import React from 'react';

interface RewardCardProps {
    id: string;
    name: string;
    description: string;
    image: string;
    category: string;
    pointsCost: number;
    minLevel: number;
    currentStock: number;
    userLevel: number;
    userPoints: number;
    isPremiumOnly?: boolean;
    isUserPremium?: boolean;
    onSelect?: () => void;
    onUpgrade?: () => void;
    size?: 'sm' | 'md';
    className?: string;
}

const RewardCard: React.FC<RewardCardProps> = ({
    name,
    description,
    image,
    category,
    pointsCost,
    minLevel,
    currentStock,
    userLevel,
    userPoints,
    isPremiumOnly = false,
    isUserPremium = false,
    onSelect,
    onUpgrade,
    size = 'md',
    className = '',
}) => {
    const canAfford = userPoints >= pointsCost;
    const levelUnlocked = userLevel >= minLevel;
    const inStock = currentStock > 0;
    const premiumLocked = isPremiumOnly && !isUserPremium;
    const available = canAfford && levelUnlocked && inStock && !premiumLocked;

    const getCategoryIcon = () => {
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

    const getCategoryLabel = () => {
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

    const handleClick = () => {
        if (premiumLocked && onUpgrade) {
            onUpgrade();
        } else if (available && onSelect) {
            onSelect();
        }
    };

    if (size === 'sm') {
        return (
            <div
                onClick={handleClick}
                className={`bg-surface rounded-xl shadow-soft overflow-hidden transition-all relative ${!inStock ? 'opacity-50' : premiumLocked ? 'cursor-pointer' : available || levelUnlocked ? 'cursor-pointer hover:shadow-soft-lg active:scale-[0.98]' : 'opacity-70'
                    } ${className}`}
            >
                <div className="relative h-24 bg-white">
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                    {premiumLocked && (
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/50 flex items-center justify-center">
                            <span className="text-white text-lg">💎</span>
                        </div>
                    )}
                    {!inStock && !premiumLocked && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">ESGOTADO</span>
                        </div>
                    )}
                </div>
                <div className="p-2">
                    <h4 className="text-text-primary font-bold text-xs truncate">{name}</h4>
                    <p className={`font-bold text-xs mt-1 ${premiumLocked ? 'text-primary' : available ? 'text-primary' : 'text-text-muted'}`}>
                        {premiumLocked ? '💎 Premium' : `${pointsCost.toLocaleString()} 🐾`}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={handleClick}
            className={`bg-surface rounded-2xl shadow-soft overflow-hidden transition-all relative ${!inStock && !premiumLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-soft-lg active:scale-[0.98]'
                } ${className}`}
        >
            {/* Premium Gradient Border */}
            {isPremiumOnly && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-amber-400 to-primary opacity-0 hover:opacity-100 transition-opacity -z-10 blur-sm"></div>
            )}

            {/* Image */}
            <div className="relative h-32 bg-white">
                <img src={image} alt={name} className={`w-full h-full object-cover ${premiumLocked ? 'brightness-75' : ''}`} />

                {/* Premium Badge */}
                {isPremiumOnly && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-primary to-amber-500 rounded-lg px-2 py-1 flex items-center gap-1 shadow-glow-sm">
                        <span className="text-white text-sm">💎</span>
                        <span className="text-white text-[10px] font-bold">PREMIUM</span>
                    </div>
                )}

                {/* Category Badge (only if not premium) */}
                {!isPremiumOnly && (
                    <div className="absolute top-2 left-2 bg-surface/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-primary text-sm">{getCategoryIcon()}</span>
                        <span className="text-text-primary text-[10px] font-semibold">{getCategoryLabel()}</span>
                    </div>
                )}

                {/* Status Badges */}
                {premiumLocked && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="bg-white/95 rounded-xl px-4 py-2 text-center shadow-lg">
                            <span className="material-symbols-outlined text-primary text-2xl">lock</span>
                            <p className="text-primary font-bold text-xs mt-1">Exclusivo Premium</p>
                        </div>
                    </div>
                )}
                {!inStock && !premiumLocked && (
                    <div className="absolute top-2 right-2 bg-danger text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                        ESGOTADO
                    </div>
                )}
                {!levelUnlocked && inStock && !premiumLocked && (
                    <div className="absolute top-2 right-2 bg-surface/90 backdrop-blur-sm text-text-muted text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">lock</span>
                        Nível {minLevel}+
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-3">
                <h3 className="text-text-primary font-bold text-sm truncate">{name}</h3>
                <p className="text-text-muted text-xs truncate mt-0.5">{description}</p>

                <div className="flex items-center justify-between mt-3">
                    <span className={`font-bold ${available ? 'text-primary' : 'text-text-muted'}`}>
                        {pointsCost.toLocaleString()} 🐾
                    </span>
                    {premiumLocked ? (
                        <span className="text-primary text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            Assinar
                        </span>
                    ) : levelUnlocked && inStock ? (
                        <span className={`text-xs ${canAfford ? 'text-success' : 'text-warning'}`}>
                            {canAfford ? '✓ Disponível' : 'Faltam pontos'}
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default RewardCard;
