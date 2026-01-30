// PetHub - Notification Settings Service
// Granular control over notification preferences

export interface NotificationPreferences {
    // Master toggle
    enabled: boolean;

    // Saúde & Vacinas
    vaccines: boolean;           // Lembretes de vacinas
    vaccineReminders: boolean;   // Dias antes da vacina
    vaccineReminderDays: number; // Quantos dias antes (1, 3, 7)

    // Consultas
    appointments: boolean;       // Lembretes de consultas
    appointmentReminders: boolean;
    appointmentReminderHours: number; // Horas antes (1, 2, 24)

    // Banho e Tosa
    grooming: boolean;           // Lembretes de banho/tosa agendados
    groomingSuggestions: boolean; // Sugestões (ex: "Faz 30 dias desde o último banho")

    // Adoção
    adoptionMatches: boolean;    // Novos pets compatíveis disponíveis
    adoptionMessages: boolean;   // Mensagens de chat sobre adoção

    // Promoções e Ofertas
    promotions: boolean;         // Ofertas da loja
    partnerOffers: boolean;      // Ofertas de clínicas/pet shops parceiros

    // Sistema
    systemUpdates: boolean;      // Atualizações do app
    tips: boolean;               // Dicas de cuidado

    // Horários permitidos
    quietHoursEnabled: boolean;
    quietHoursStart: string;     // "22:00"
    quietHoursEnd: string;       // "08:00"
}

// Default preferences
const DEFAULT_PREFERENCES: NotificationPreferences = {
    enabled: true,

    vaccines: true,
    vaccineReminders: true,
    vaccineReminderDays: 7,

    appointments: true,
    appointmentReminders: true,
    appointmentReminderHours: 24,

    grooming: true,
    groomingSuggestions: false,

    adoptionMatches: true,
    adoptionMessages: true,

    promotions: false,
    partnerOffers: false,

    systemUpdates: true,
    tips: true,

    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
};

// Get saved preferences from localStorage
export const getNotificationPreferences = (): NotificationPreferences => {
    const saved = localStorage.getItem('pethub-notification-preferences');
    if (saved) {
        try {
            return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) };
        } catch {
            return DEFAULT_PREFERENCES;
        }
    }
    return DEFAULT_PREFERENCES;
};

// Save preferences to localStorage
export const saveNotificationPreferences = (prefs: Partial<NotificationPreferences>): void => {
    const current = getNotificationPreferences();
    const updated = { ...current, ...prefs };
    localStorage.setItem('pethub-notification-preferences', JSON.stringify(updated));
};

// Reset to defaults
export const resetNotificationPreferences = (): void => {
    localStorage.setItem('pethub-notification-preferences', JSON.stringify(DEFAULT_PREFERENCES));
};

// Notification category groups for UI
export interface NotificationCategory {
    id: string;
    title: string;
    icon: string;
    description: string;
    settings: {
        key: keyof NotificationPreferences;
        label: string;
        description?: string;
        type: 'toggle' | 'select';
        options?: { value: number | string; label: string }[];
    }[];
}

export const notificationCategories: NotificationCategory[] = [
    {
        id: 'health',
        title: 'Saúde & Vacinas',
        icon: 'vaccines',
        description: 'Lembretes sobre vacinação e saúde do pet',
        settings: [
            { key: 'vaccines', label: 'Lembretes de Vacinas', type: 'toggle', description: 'Avisar quando vacinas estiverem próximas' },
            { key: 'vaccineReminders', label: 'Aviso Antecipado', type: 'toggle', description: 'Notificar dias antes da vacina' },
            {
                key: 'vaccineReminderDays',
                label: 'Dias de Antecedência',
                type: 'select',
                options: [
                    { value: 1, label: '1 dia antes' },
                    { value: 3, label: '3 dias antes' },
                    { value: 7, label: '1 semana antes' },
                    { value: 14, label: '2 semanas antes' },
                ]
            },
        ],
    },
    {
        id: 'appointments',
        title: 'Consultas',
        icon: 'calendar_today',
        description: 'Lembretes de consultas veterinárias',
        settings: [
            { key: 'appointments', label: 'Lembretes de Consultas', type: 'toggle' },
            { key: 'appointmentReminders', label: 'Aviso Antecipado', type: 'toggle' },
            {
                key: 'appointmentReminderHours',
                label: 'Horas de Antecedência',
                type: 'select',
                options: [
                    { value: 1, label: '1 hora antes' },
                    { value: 2, label: '2 horas antes' },
                    { value: 24, label: '1 dia antes' },
                    { value: 48, label: '2 dias antes' },
                ]
            },
        ],
    },
    {
        id: 'grooming',
        title: 'Banho e Tosa',
        icon: 'content_cut',
        description: 'Lembretes de higiene e estética',
        settings: [
            { key: 'grooming', label: 'Agendamentos de Banho/Tosa', type: 'toggle' },
            { key: 'groomingSuggestions', label: 'Sugestões de Banho', type: 'toggle', description: 'Sugerir quando faz tempo desde o último banho' },
        ],
    },
    {
        id: 'adoption',
        title: 'Adoção',
        icon: 'favorite',
        description: 'Notificações sobre adoção de pets',
        settings: [
            { key: 'adoptionMatches', label: 'Pets Compatíveis', type: 'toggle', description: 'Novos pets disponíveis na sua região' },
            { key: 'adoptionMessages', label: 'Mensagens de Chat', type: 'toggle', description: 'Mensagens sobre processos de adoção' },
        ],
    },
    {
        id: 'promotions',
        title: 'Ofertas e Promoções',
        icon: 'local_offer',
        description: 'Ofertas de produtos e serviços',
        settings: [
            { key: 'promotions', label: 'Promoções da Loja', type: 'toggle' },
            { key: 'partnerOffers', label: 'Ofertas de Parceiros', type: 'toggle', description: 'Clínicas e pet shops parceiros' },
        ],
    },
    {
        id: 'system',
        title: 'Sistema',
        icon: 'settings',
        description: 'Atualizações e dicas',
        settings: [
            { key: 'systemUpdates', label: 'Atualizações do App', type: 'toggle' },
            { key: 'tips', label: 'Dicas de Cuidado', type: 'toggle', description: 'Dicas para cuidar melhor do seu pet' },
        ],
    },
];
