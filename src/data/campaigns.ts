
export interface VaccinationCampaign {
    id: string;
    title: string;
    description: string;
    startDate: string; // YYYY-MM-DD
    endDate: string; // YYYY-MM-DD
    vaccineType: 'rabies' | 'v10' | 'v8' | 'flu' | 'giardia' | 'leishmania'; // Tipos comuns
    vaccineLabel: string; // Nome amigável da vacina
    targetSpecies: ('dog' | 'cat')[];
    color: string;
    icon: string;
    isNational: boolean;
}

// Helper para data atual formatada
const today = new Date();
const currentYear = today.getFullYear();

export const campaigns: VaccinationCampaign[] = [
    {
        id: 'campanha-raiva-2026',
        title: 'Campanha Antirrábica Nacional',
        description: 'Proteja seu melhor amigo! Vacinação gratuita contra raiva em todos os postos de saúde. Obrigatória para cães e gatos.',
        startDate: `${currentYear}-01-20`, // Ativa agora (baseado na data atual 24/01/2026)
        endDate: `${currentYear}-01-30`,
        vaccineType: 'rabies',
        vaccineLabel: 'Antirrábica',
        targetSpecies: ['dog', 'cat'],
        color: 'bg-rose-500',
        icon: 'health_and_safety',
        isNational: true
    },
    {
        id: 'campanha-multiviral-2026',
        title: 'Campanha de Multivacinação',
        description: 'Atualize a carteirinha do seu pet. Proteção contra cinomose, parvovirose e outras doenças graves.',
        startDate: `${currentYear}-08-01`,
        endDate: `${currentYear}-08-31`,
        vaccineType: 'v10',
        vaccineLabel: 'V10 / V8',
        targetSpecies: ['dog'],
        color: 'bg-indigo-500',
        icon: 'vaccines',
        isNational: true
    }
];

export const getActiveCampaigns = (): VaccinationCampaign[] => {
    const now = new Date();
    // Zerar horas para comparar apenas datas
    now.setHours(0, 0, 0, 0);

    return campaigns.filter(campaign => {
        const start = new Date(campaign.startDate);
        const end = new Date(campaign.endDate);
        // Ajustar fuso se necessário, mas para comparação simples serve
        // Adicionar um dia ao fim para incluir o dia limite
        end.setHours(23, 59, 59, 999);

        return now >= start && now <= end;
    });
};

export const getUpcomingCampaigns = (): VaccinationCampaign[] => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return campaigns.filter(campaign => {
        const start = new Date(campaign.startDate);
        return start > now;
    });
};
