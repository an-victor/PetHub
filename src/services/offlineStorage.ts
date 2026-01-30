import { vaccines as staticVaccines } from '../data/vaccines';
import { pets as staticPets } from '../data/pets';
import { treatments as staticTreatments, Treatment } from '../data/treatments';
import { Vaccine, Pet } from '../types';

const STORAGE_KEYS = {
    VACCINES: 'pethub-vaccines-local',
    PETS: 'pethub-pets-local',
    APPOINTMENTS: 'pethub-appointments-local',
    TREATMENTS: 'pethub-treatments-local'
};

export const OfflineService = {
    // --- VACCINES ---
    getVaccines: (): Vaccine[] => {
        const localData = localStorage.getItem(STORAGE_KEYS.VACCINES);
        const localVaccines: Vaccine[] = localData ? JSON.parse(localData) : [];
        // Removed staticVaccines to ensure clean state for new users
        return localVaccines;
    },

    getVaccinesByPet: (petId: string): Vaccine[] => {
        const all = OfflineService.getVaccines();
        return all.filter(v => v.petId === petId);
    },

    addVaccine: (vaccine: Vaccine) => {
        const localData = localStorage.getItem(STORAGE_KEYS.VACCINES);
        const localVaccines: Vaccine[] = localData ? JSON.parse(localData) : [];
        localVaccines.push(vaccine);
        localStorage.setItem(STORAGE_KEYS.VACCINES, JSON.stringify(localVaccines));
    },

    // --- PETS ---
    getPets: (): Pet[] => {
        const localData = localStorage.getItem(STORAGE_KEYS.PETS);
        const localPets: Pet[] = localData ? JSON.parse(localData) : [];
        // Removed staticPets to ensure clean state
        return localPets;
    },

    addPet: (pet: Pet) => {
        const localData = localStorage.getItem(STORAGE_KEYS.PETS);
        const localPets: Pet[] = localData ? JSON.parse(localData) : [];
        localPets.push(pet);
        localStorage.setItem(STORAGE_KEYS.PETS, JSON.stringify(localPets));
    },

    // --- APPOINTMENTS ---
    // Will implement when tackling the Calendar Sync if needed.

    // --- UTILS FOR SYNC ---
    updatePet: (oldId: string, newPet: Pet) => {
        const pets = OfflineService.getPets();
        const index = pets.findIndex(p => p.id === oldId);
        if (index !== -1) {
            pets[index] = newPet;
            localStorage.setItem(STORAGE_KEYS.PETS, JSON.stringify(pets));
        }
    },

    removePet: (id: string) => {
        const pets = OfflineService.getPets();
        const filtered = pets.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.PETS, JSON.stringify(filtered));
    },

    updateVaccine: (oldId: string, newVaccine: Vaccine) => {
        const vaccines = OfflineService.getVaccines();
        const index = vaccines.findIndex(v => v.id === oldId);
        if (index !== -1) {
            vaccines[index] = newVaccine;
            localStorage.setItem(STORAGE_KEYS.VACCINES, JSON.stringify(vaccines));
        }
    },

    removeVaccine: (id: string) => {
        const vaccines = OfflineService.getVaccines();
        const filtered = vaccines.filter(v => v.id !== id);
        localStorage.setItem(STORAGE_KEYS.VACCINES, JSON.stringify(filtered));
    },

    // --- TREATMENTS ---
    getTreatments: (): Treatment[] => {
        const localData = localStorage.getItem(STORAGE_KEYS.TREATMENTS);
        const localTreatments: Treatment[] = localData ? JSON.parse(localData) : [];
        // Removed staticTreatments to ensure clean state
        return localTreatments;
    },

    getTreatmentsByPet: (petId: string): Treatment[] => {
        const all = OfflineService.getTreatments();
        return all.filter(t => t.petId === petId);
    },

    addTreatment: (treatment: Treatment) => {
        const localData = localStorage.getItem(STORAGE_KEYS.TREATMENTS);
        const localTreatments: Treatment[] = localData ? JSON.parse(localData) : [];
        localTreatments.push(treatment);
        localStorage.setItem(STORAGE_KEYS.TREATMENTS, JSON.stringify(localTreatments));
    },

    updateTreatment: (oldId: string, newTreatment: Treatment) => {
        const treatments = OfflineService.getTreatments();
        const index = treatments.findIndex(t => t.id === oldId);
        if (index !== -1) {
            treatments[index] = newTreatment;
            const localOnly = treatments.filter(t => !staticTreatments.find(st => st.id === t.id));
            localStorage.setItem(STORAGE_KEYS.TREATMENTS, JSON.stringify(localOnly));
        }
    },

    removeTreatment: (id: string) => {
        const treatments = OfflineService.getTreatments();
        const filtered = treatments.filter(t => t.id !== id);
        const localOnly = filtered.filter(t => !staticTreatments.find(st => st.id === t.id));
        localStorage.setItem(STORAGE_KEYS.TREATMENTS, JSON.stringify(localOnly));
    }
};
