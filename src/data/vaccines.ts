// PetHub - Mock Data: Vaccines
import type { Vaccine } from '../types';

export const vaccines: Vaccine[] = [
    {
        id: 'vac-001',
        petId: 'pet-001',
        name: 'Antirrábica',
        status: 'applied',
        date: '2025-11-28',
        nextDoseDate: '2026-11-28',
        vet: 'Dr. Carlos Silva',
        clinic: 'Clínica VetCare Amigo',
        batch: 'RAB2025-1234',
    },
    {
        id: 'vac-002',
        petId: 'pet-001',
        name: 'V10 (Polivalente)',
        status: 'applied',
        date: '2025-11-27',
        nextDoseDate: '2026-11-27',
        vet: 'Dr. Carlos Silva',
    },
    {
        id: 'vac-003',
        petId: 'pet-001',
        name: 'Gripe Canina',
        status: 'upcoming',
        date: '2026-02-28',
    },
    {
        id: 'vac-004',
        petId: 'pet-001',
        name: 'Leishmaniose',
        status: 'upcoming',
        date: '2026-07-11',
    },
    {
        id: 'vac-005',
        petId: 'pet-002',
        name: 'V4 Felina',
        status: 'applied',
        date: '2025-10-15',
    },
    {
        id: 'vac-006',
        petId: 'pet-003',
        name: 'Antirrábica',
        status: 'overdue',
        date: '2025-12-01',
        notes: 'Vacina atrasada!',
    },
];

export const getVaccinesByPet = (petId: string): Vaccine[] =>
    vaccines.filter(v => v.petId === petId);

export const getUpcomingVaccines = (petId?: string): Vaccine[] => {
    const filtered = vaccines.filter(v => v.status === 'upcoming');
    return petId ? filtered.filter(v => v.petId === petId) : filtered;
};

export const getAppliedVaccines = (petId?: string): Vaccine[] => {
    const filtered = vaccines.filter(v => v.status === 'applied');
    return petId ? filtered.filter(v => v.petId === petId) : filtered;
};
