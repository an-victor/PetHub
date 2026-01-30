
export interface Treatment {
    id: string;
    petId: string;
    type: 'flea' | 'worm' | 'medication'; // Antipulgas, Vermífugo, Medicação
    name: string; // ex: Bravecto, Nexgard
    frequencyDays: number; // dias entre doses
    lastDate: string; // YYYY-MM-DD
    nextDate: string; // YYYY-MM-DD
    status: 'ok' | 'due' | 'overdue' | 'late';
}

// Mock Data
export const treatments: Treatment[] = [
    {
        id: 't1',
        petId: '1', // Max (Dog)
        type: 'flea',
        name: 'Simparic',
        frequencyDays: 35,
        lastDate: '2025-12-20',
        nextDate: '2026-01-24', // Hoje! (Simulando alerta)
        status: 'due'
    },
    {
        id: 't2',
        petId: '1', // Max
        type: 'worm',
        name: 'Drontal',
        frequencyDays: 90,
        lastDate: '2025-11-15',
        nextDate: '2026-02-13',
        status: 'ok'
    },
    {
        id: 't3',
        petId: '2', // Bella (Cat)
        type: 'flea',
        name: 'Revolution',
        frequencyDays: 30,
        lastDate: '2025-12-10',
        nextDate: '2026-01-09',
        status: 'overdue' // Atrasado
    }
];

export const getTreatmentsByPet = (petId: string) => {
    return treatments.filter(t => t.petId === petId).sort((a, b) => new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime());
};
