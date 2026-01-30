// PetHub - Subscription Plans Configuration

export interface PlanFeature {
    text: string;
    icon: string;
    highlight?: boolean;
}

export interface SubscriptionPlan {
    id: 'free' | 'premium';
    name: string;
    price: number;
    priceFormatted: string;
    billingPeriod: 'monthly' | 'yearly' | 'free';
    description: string;
    features: PlanFeature[];
    pointsMultiplier: number;
    weekendBonus: boolean;
    streakBonusMultiplier: number;
    badge: string;
    color: string;
    recommended?: boolean;
}

export const subscriptionPlans: SubscriptionPlan[] = [
    {
        id: 'free',
        name: 'Básico',
        price: 0,
        priceFormatted: 'Grátis',
        billingPeriod: 'free',
        description: 'Acesso básico ao PetHub',
        pointsMultiplier: 1,
        weekendBonus: false,
        streakBonusMultiplier: 1,
        badge: '🐾',
        color: 'from-gray-400 to-gray-500',
        features: [
            { text: 'Cadastro de pets', icon: 'pets' },
            { text: 'Carteirinha de vacinação', icon: 'vaccines' },
            { text: 'Gamificação (Soft Rewards)', icon: 'stars' },
            { text: 'Progresso Nível 1-3', icon: 'trending_up' },
        ],
    },
    {
        id: 'premium',
        name: 'Premium',
        price: 19.90,
        priceFormatted: 'R$ 19,90/mês',
        billingPeriod: 'monthly',
        description: 'Acelerador de pontos e prêmios físicos',
        pointsMultiplier: 1.5,
        weekendBonus: true,
        streakBonusMultiplier: 1.5,
        badge: '💎',
        color: 'from-primary to-primary-dark',
        recommended: true,
        features: [
            { text: 'Tudo do plano Básico', icon: 'check' },
            { text: 'Acelerador 1.5x em Pontos', icon: 'fast_forward', highlight: true },
            { text: 'Acesso a Prêmios Físicos', icon: 'redeem', highlight: true },
            { text: 'Sorteios Mensais Exclusivos', icon: 'celebration', highlight: true },
            { text: 'Status VIP (Suporte priorizado)', icon: 'support_agent' },
            { text: 'Descontos maiores em parceiros', icon: 'sell' },
            { text: 'Badge Exclusivo 💎', icon: 'workspace_premium' },
        ],
    },
];

// Points comparison table for UI (v2.0)
export const pointsComparison = [
    { action: 'Check-in na Clínica', free: 100, premium: 150 },
    { action: 'Registrar Vacina', free: 50, premium: 75 },
    { action: 'Doar para Abrigo', free: 50, premium: 75 },
    { action: 'Reportar Abandono', free: 50, premium: 75 },
    { action: 'Banho e Tosa', free: 30, premium: 45 },
    { action: 'Atualizar Peso', free: 20, premium: 30 },
    { action: 'Indicar Amigo', free: 10, premium: 15 },
    { action: 'Ler Dica', free: 2, premium: 3 },
];

// Premium-only benefits
export const premiumBenefits = {
    weekendMultiplier: 1.5, // Reduced from 2.0 to conserve economy
    streakBonus: {
        7: 20,
        14: 50,
        30: 150,
    },
    exclusiveRewards: [
        'reward-brinquedo',
        'reward-kit-banho',
        'reward-voucher-vet',
        'reward-ensaio',
        'reward-pet-hotel',
    ],
    discountPartners: 0.15, // 15% off at partners
};

// Get current plan (mock - will be from user context)
export const getCurrentPlan = (): SubscriptionPlan => {
    // For now, return free plan. Will be determined by user subscription status
    const isPremium = localStorage.getItem('pethub-premium') === 'true';
    return subscriptionPlans.find(p => p.id === (isPremium ? 'premium' : 'free'))!;
};

// Check if user is premium
export const isUserPremium = (): boolean => {
    return localStorage.getItem('pethub-premium') === 'true';
};

// Upgrade to premium (mock)
export const upgradeToPremium = (): void => {
    localStorage.setItem('pethub-premium', 'true');
};

// Downgrade to free (mock)
export const downgradeToFree = (): void => {
    localStorage.setItem('pethub-premium', 'false');
};

export default subscriptionPlans;
