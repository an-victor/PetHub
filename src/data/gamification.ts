// PetHub Gamification - Mock Data

import type {
    LevelDefinition,
    ActionPoints,
    Mission,
    Reward,
    Badge,
    SeasonalEvent,
    UserLevel,
    UserMission,
    PointTransaction,
} from '../types/gamification';

// ============================================
// DEFINIÇÕES DE NÍVEIS
// ============================================

// ============================================
// DEFINIÇÕES DE NÍVEIS (v2.0)
// Progresso exponencial
// ============================================

export const levelDefinitions: LevelDefinition[] = [
    {
        level: 1,
        name: 'Filhote',
        pointsRequired: 0,
        benefits: ['Acesso básico ao app'],
        badge: '🍼',
    },
    {
        level: 2,
        name: 'Adulto I',
        pointsRequired: 800,
        benefits: ['Desbloqueia Marketplace de Cupons'],
        badge: '🐕',
    },
    {
        level: 3,
        name: 'Adulto II',
        pointsRequired: 2500,
        benefits: ['Badge "Tutor Dedicado" no perfil'],
        badge: '🦮',
    },
    {
        level: 4,
        name: 'Sênior I',
        pointsRequired: 6000,
        benefits: ['Acesso a Sorteios Mensais'],
        badge: '🎖️',
    },
    {
        level: 5,
        name: 'Sênior II',
        pointsRequired: 12000,
        benefits: ['Status VIP (Suporte priorizado)', 'Descontos maiores'],
        badge: '👑',
    },
    {
        level: 6,
        name: 'Pet Lenda',
        pointsRequired: 30000,
        benefits: ['Hall da Fama', 'Kit Físico Exclusivo', 'Concierge Pet'],
        badge: '🏆',
    },
];

// ============================================
// TABELA DE PONTUAÇÃO POR AÇÃO (v2.0)
// Premium = 1.5x pontos (Acelerador)
// Valor Base: 1000 pts ≈ R$ 5,00
// ============================================

export const actionPointsTable: ActionPoints[] = [
    {
        action: 'comparecer_consulta',
        freePoints: 100,
        premiumPoints: 150,
        frequencyLimit: '-',
        proofRequired: 'GPS na clínica (Obrigatório)',
        cooldownDays: 0,
    },
    {
        action: 'registrar_vacina',
        freePoints: 50,
        premiumPoints: 75,
        frequencyLimit: '2x/ano por tipo',
        proofRequired: 'Foto carteira + Lote + Data',
        cooldownDays: 0,
    },
    {
        action: 'doar_abrigo',
        freePoints: 50,
        premiumPoints: 75,
        frequencyLimit: '1x/mês',
        proofRequired: 'Comprovante fiscal',
        cooldownDays: 0,
    },
    {
        action: 'reportar_abandono',
        freePoints: 50,
        premiumPoints: 75,
        frequencyLimit: '2x/mês',
        proofRequired: 'Foto + GPS (Validado)',
        cooldownDays: 0,
    },
    {
        action: 'completar_perfil',
        freePoints: 50,
        premiumPoints: 75,
        frequencyLimit: 'Único',
        proofRequired: 'Todos os dados preenchidos',
        cooldownDays: 0,
    },
    {
        action: 'marcar_banho', // Banho e Tosa (Check-in)
        freePoints: 30,
        premiumPoints: 45,
        frequencyLimit: '2x/mês',
        proofRequired: 'Foto fiscal/recibo',
        cooldownDays: 0,
    },
    {
        action: 'atualizar_peso',
        freePoints: 20,
        premiumPoints: 30,
        frequencyLimit: '1x/mês',
        proofRequired: 'Foto do pet na balança',
        cooldownDays: 0,
    },
    {
        action: 'agendar_consulta',
        freePoints: 10,
        premiumPoints: 15,
        frequencyLimit: '1x/mês',
        proofRequired: 'Integração ou Print',
        cooldownDays: 0,
    },
    {
        action: 'avaliar_servico',
        freePoints: 10,
        premiumPoints: 15,
        frequencyLimit: '1x/serviço',
        proofRequired: 'Texto > 15 caracteres',
        cooldownDays: 0,
    },
    {
        action: 'indicar_amigo',
        freePoints: 10,
        premiumPoints: 15, // Indicar amigo (Cadastro simples)
        frequencyLimit: '5x/mês',
        proofRequired: 'Amigo valida e-mail',
        cooldownDays: 0,
    },
    // New Action needed: Indicar amigo (Assinou Premium) -> 300 / 500
    {
        action: 'ler_dica',
        freePoints: 2,
        premiumPoints: 3,
        frequencyLimit: '3x/dia',
        proofRequired: 'Scroll até o fim + 30s tela',
        cooldownDays: 0,
    },
    // Adding dummy actions to match types or keep robust
    {
        action: 'adicionar_pet',
        freePoints: 20,
        premiumPoints: 30,
        frequencyLimit: '3x/conta',
        proofRequired: 'Foto',
        cooldownDays: 0,
    }
];

// ============================================
// MISSÕES PERMANENTES (v2.0)
// ============================================

export const permanentMissions: Mission[] = [
    {
        id: 'mission-imunidade',
        name: 'Imunidade Total',
        description: 'Registre 3 vacinas essenciais no ano',
        type: 'permanent',
        category: 'health',
        difficulty: 3,
        requirements: [
            { action: 'registrar_vacina', count: 3, description: '3 vacinas registradas' },
        ],
        freeReward: { points: 200, prize: 'Badge "Imune"' },
        premiumReward: { points: 300, prize: 'Badge "Imune" + Destaque' },
        icon: 'vaccines',
        isPremiumOnly: false,
    },
    {
        id: 'mission-influencer',
        name: 'Influencer Pet',
        description: 'Traga 5 amigos cadastrados e ativos',
        type: 'permanent',
        category: 'social',
        difficulty: 4,
        requirements: [
            { action: 'indicar_amigo', count: 5, description: '5 amigos indicados' },
        ],
        freeReward: { points: 300, prize: '1 mês Premium' },
        premiumReward: { points: 450, prize: '1 mês Premium Extra' },
        icon: 'share',
        isPremiumOnly: false,
    },
    {
        id: 'mission-checkup',
        name: 'Check-up Anual',
        description: 'Faça 1 check-in em veterinário e registre 1 exame/vacina',
        type: 'permanent',
        category: 'health',
        difficulty: 3,
        requirements: [
            { action: 'comparecer_consulta', count: 1, description: '1 Check-in Vet' },
            { action: 'registrar_vacina', count: 1, description: '1 Vacina/Exame' },
        ],
        freeReward: { points: 250, prize: 'Badge "Saudável"' },
        premiumReward: { points: 375, prize: 'Badge "Saudável" + 5% off Vet' },
        icon: 'medical_services',
        isPremiumOnly: false,
    },
    {
        id: 'mission-guardiao',
        name: 'Guardião',
        description: 'Doe 3 vezes para abrigos parceiros',
        type: 'permanent',
        category: 'donation',
        difficulty: 4,
        requirements: [
            { action: 'doar_abrigo', count: 3, description: '3 doações' },
        ],
        freeReward: { points: 400, prize: 'Destaque no Perfil' },
        premiumReward: { points: 600, prize: 'Destaque Oficial Doador' },
        icon: 'volunteer_activism',
        isPremiumOnly: false,
    },
];

// ============================================
// EVENTOS SAZONAIS
// ============================================

export const seasonalEvents: SeasonalEvent[] = [
    {
        id: 'event-outubro-rosa',
        name: 'Outubro Rosa Pet',
        description: 'Prevenção é amor! Marque consultas e ganhe em dobro.',
        startDate: '2026-10-01',
        endDate: '2026-10-31',
        missions: ['mission-imunidade'], // Reusing logic
        collectiveGoal: {
            target: 50000,
            current: 12500,
            prize: 'Doação de R$5.000 para abrigo parceiro',
        },
        banner: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=800',
        theme: 'pink',
    },
];

// ============================================
// PRÊMIOS / MARKETPLACE (v2.0)
// Free: Soft Rewards (Custo zero para o app)
// Premium: Hard Rewards (Produtos físicos/serviços)
// ============================================

export const rewards: Reward[] = [
    // --- SOFT REWARDS (Free & Premium) ---
    {
        id: 'reward-cupom-10',
        name: 'Cupom 10% Parceiros',
        description: 'Desconto em todas as lojas parceiras',
        category: 'discount',
        pointsCost: 300,
        monthlyStock: 9999,
        currentStock: 9999,
        minLevel: 2, // Adulto I
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400',
        conditions: 'Ilimitado',
        isPremiumOnly: false,
    },
    {
        id: 'reward-ebook-receitas',
        name: 'E-book: Receitas Pet',
        description: 'Livro digital com 20 receitas naturais',
        category: 'product',
        pointsCost: 600,
        monthlyStock: 9999,
        currentStock: 9999,
        minLevel: 1,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        conditions: 'Download digital',
        isPremiumOnly: false,
    },
    {
        id: 'reward-badge-doador',
        name: 'Badge "Super Doador"',
        description: 'Emblema exclusivo para seu perfil',
        category: 'experience',
        pointsCost: 800,
        monthlyStock: 9999,
        currentStock: 9999,
        minLevel: 2,
        image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=400',
        conditions: 'Item cosmético',
        isPremiumOnly: false,
    },
    {
        id: 'reward-doacao-5',
        name: 'Doação R$ 5,00',
        description: 'O PetHub doa R$ 5,00 em seu nome',
        category: 'donation',
        pointsCost: 1000,
        monthlyStock: 500,
        currentStock: 482,
        minLevel: 2,
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400',
        conditions: '1x/mês',
        isPremiumOnly: false, // Disponível para todos conforme tabela
    },
    {
        id: 'reward-premium-1mes',
        name: '1 Mês Premium',
        description: 'Experimente o Premium grátis por 1 mês',
        category: 'subscription',
        pointsCost: 4000,
        monthlyStock: 100,
        currentStock: 92,
        minLevel: 1,
        image: 'https://images.unsplash.com/photo-1635326444826-06c8f84991a9?w=400',
        conditions: 'Apenas usuários Free',
        isPremiumOnly: false,
    },

    // --- HARD REWARDS (Premium Only) ---
    {
        id: 'reward-brinquedo',
        name: 'Brinquedo Pet (Pequeno)',
        description: 'Brinquedo sortido enviado para sua casa',
        category: 'product',
        pointsCost: 6500,
        monthlyStock: 50,
        currentStock: 48,
        minLevel: 3, // Adulto II approx
        image: 'https://images.unsplash.com/photo-1585837575652-2c906ebd908e?w=400',
        conditions: 'Frete grátis • Assinante 3 meses+',
        isPremiumOnly: true,
    },
    {
        id: 'reward-kit-banho',
        name: 'Kit Banho (Shampoo+)',
        description: 'Kit com shampoo e condicionador premium',
        category: 'product',
        pointsCost: 8000,
        monthlyStock: 30,
        currentStock: 28,
        minLevel: 4,
        image: 'https://images.unsplash.com/photo-1592911296568-19e34e40236a?w=400',
        conditions: 'Frete grátis • Assinante 3 meses+',
        isPremiumOnly: true,
    },
    {
        id: 'reward-voucher-vet',
        name: 'Voucher R$ 50 Consulta',
        description: 'Crédito para usar em qualquer clínica parceira',
        category: 'service',
        pointsCost: 9000,
        monthlyStock: 20,
        currentStock: 15,
        minLevel: 4,
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400',
        conditions: 'Assinante 3 meses+',
        isPremiumOnly: true,
    },
    {
        id: 'reward-ensaio',
        name: 'Ensaio Fotográfico',
        description: 'Sessão de fotos profissional para seu pet',
        category: 'experience',
        pointsCost: 15000,
        monthlyStock: 5,
        currentStock: 5,
        minLevel: 5,
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
        conditions: 'Assinante 6 meses+',
        isPremiumOnly: true,
    },
    {
        id: 'reward-pet-hotel',
        name: 'Fim de Semana Pet Hotel',
        description: 'Estadia completa em resort pet parceiro',
        category: 'experience',
        pointsCost: 35000,
        monthlyStock: 1,
        currentStock: 1,
        minLevel: 6,
        image: 'https://images.unsplash.com/photo-1596272875729-ed2c21eb7474?w=400',
        conditions: 'Sorteio ou Resgate Direto • VIP',
        isPremiumOnly: true,
    },
];

// ============================================
// BADGES / CONQUISTAS
// ============================================

export const badges: Badge[] = [
    {
        id: 'badge-primeiro-pet',
        name: 'Primeiro Pet',
        description: 'Cadastrou seu primeiro pet no app',
        category: 'special',
        icon: '🐣',
        requirement: 'Adicionar 1 pet',
        pointsAwarded: 50,
        rarity: 'common',
    },
    {
        id: 'badge-tutor-responsavel',
        name: 'Tutor Responsável',
        description: 'Manteve todas as vacinas em dia por 1 ano',
        category: 'health',
        icon: '⭐',
        requirement: 'Vacinas em dia por 12 meses',
        pointsAwarded: 200,
        rarity: 'rare',
    },
    {
        id: 'badge-heroi',
        name: 'Herói',
        description: 'Fez 3 doações para abrigos',
        category: 'donation',
        icon: '🦸',
        requirement: 'Completar missão Guardião (Free)',
        pointsAwarded: 100,
        rarity: 'rare',
    },
    {
        id: 'badge-guardiao',
        name: 'Guardião',
        description: 'Doador exemplar - destaque especial',
        category: 'donation',
        icon: '🛡️',
        requirement: 'Completar missão Guardião (Premium)',
        pointsAwarded: 150,
        rarity: 'epic',
    },
    {
        id: 'badge-streak-7',
        name: 'Semana Perfeita',
        description: 'Usou o app por 7 dias consecutivos',
        category: 'streak',
        icon: '🔥',
        requirement: '7 dias de streak',
        pointsAwarded: 50,
        rarity: 'common',
    },
    {
        id: 'badge-streak-30',
        name: 'Mês Dedicado',
        description: 'Usou o app por 30 dias consecutivos',
        category: 'streak',
        icon: '💪',
        requirement: '30 dias de streak',
        pointsAwarded: 200,
        rarity: 'rare',
    },
    {
        id: 'badge-streak-100',
        name: 'Lenda Pet',
        description: 'Usou o app por 100 dias consecutivos',
        category: 'streak',
        icon: '🏅',
        requirement: '100 dias de streak',
        pointsAwarded: 500,
        rarity: 'legendary',
    },
    {
        id: 'badge-adotante',
        name: 'Adotante',
        description: 'Adotou um pet pelo app',
        category: 'social',
        icon: '💕',
        requirement: 'Completar processo de adoção',
        pointsAwarded: 500,
        rarity: 'epic',
    },
    {
        id: 'badge-influencer',
        name: 'Influencer Pet',
        description: 'Indicou 10 amigos para o app',
        category: 'social',
        icon: '📣',
        requirement: '10 indicações efetivas',
        pointsAwarded: 300,
        rarity: 'rare',
    },
];

// ============================================
// DADOS MOCK DO USUÁRIO ATUAL
// ============================================

export const currentUserLevel: UserLevel = {
    userId: 'd3d1f1e1-e1e1-4e1e-8e1e-d1d1f1e1d1d1',
    currentLevel: 3,
    levelName: 'Adulto II',
    totalPoints: 1750,
    availablePoints: 1250,
    spentPoints: 500,
    pointsToNextLevel: 1250,
    progressPercent: 50,
    lastLevelUpAt: '2026-01-10T14:00:00Z',
    streakDays: 12,
    lastActivityAt: '2026-01-25T02:30:00Z',
};

export const currentUserMissions: UserMission[] = [
    {
        id: 'user-mission-1',
        missionId: 'mission-vacina-em-dia',
        userId: 'user-1',
        progress: [{ requirementIndex: 0, currentCount: 2, targetCount: 3, completed: false }],
        startedAt: '2026-01-01T00:00:00Z',
        completedAt: null,
        rewardClaimed: false,
    },
    {
        id: 'user-mission-2',
        missionId: 'mission-educacao',
        userId: 'user-1',
        progress: [{ requirementIndex: 0, currentCount: 18, targetCount: 30, completed: false }],
        startedAt: '2026-01-05T00:00:00Z',
        completedAt: null,
        rewardClaimed: false,
    },
];

export const recentTransactions: PointTransaction[] = [
    {
        id: 'tx-1',
        userId: 'user-1',
        action: 'registrar_vacina',
        points: 50,
        multiplier: 1.0,
        validated: true,
        metadata: {
            timestamp: '2026-01-24T10:00:00Z',
            petId: 'pet-1',
            clinicId: 'clinic-1',
        },
        createdAt: '2026-01-24T10:00:00Z',
        status: 'validated',
    },
    {
        id: 'tx-2',
        userId: 'user-1',
        action: 'ler_dica',
        points: 5,
        multiplier: 1.0,
        validated: true,
        metadata: {
            timestamp: '2026-01-24T15:30:00Z',
        },
        createdAt: '2026-01-24T15:30:00Z',
        status: 'validated',
    },
    {
        id: 'tx-3',
        userId: 'user-1',
        action: 'marcar_banho',
        points: 25,
        multiplier: 1.0,
        validated: true,
        metadata: {
            timestamp: '2026-01-23T11:00:00Z',
            clinicId: 'petshop-1',
        },
        createdAt: '2026-01-23T11:00:00Z',
        status: 'validated',
    },
];

// ============================================
// HELPERS
// ============================================

export const getLevelByPoints = (points: number): LevelDefinition => {
    for (let i = levelDefinitions.length - 1; i >= 0; i--) {
        if (points >= levelDefinitions[i].pointsRequired) {
            return levelDefinitions[i];
        }
    }
    return levelDefinitions[0];
};

export const getNextLevel = (currentLevel: number): LevelDefinition | null => {
    const nextLevel = levelDefinitions.find(l => l.level === currentLevel + 1);
    return nextLevel || null;
};

export const getActionPoints = (action: string, isPremium: boolean): number => {
    const actionDef = actionPointsTable.find(a => a.action === action);
    if (!actionDef) return 0;
    return isPremium ? actionDef.premiumPoints : actionDef.freePoints;
};

export const getMissionById = (id: string): Mission | undefined => {
    return permanentMissions.find(m => m.id === id);
};

export const getRewardById = (id: string): Reward | undefined => {
    return rewards.find(r => r.id === id);
};

export const getBadgeById = (id: string): Badge | undefined => {
    return badges.find(b => b.id === id);
};

export const getAvailableRewards = (userLevel: number, userPoints: number): Reward[] => {
    return rewards.filter(r => r.minLevel <= userLevel && r.pointsCost <= userPoints && r.currentStock > 0);
};
