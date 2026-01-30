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
        // Determine uniqueness by ID to allow overriding static data if needed (though usually we append)
        // For simplicity, we just concatenate unique IDs.
        const allVaccines = [...staticVaccines, ...localVaccines];
        // Deduplicate based on ID just in case
        const uniqueVaccines = Array.from(new Map(allVaccines.map(item => [item.id, item])).values());
        return uniqueVaccines;
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
        const allPets = [...staticPets, ...localPets];
        return Array.from(new Map(allPets.map(item => [item.id, item])).values());
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
            // Filter unique by ID just in case
            const uniquePets = Array.from(new Map(pets.map(item => [item.id, item])).values());
            // Filter out static data (we only save dynamic/local data to LS)
            const localOnly = uniquePets.filter(p => !staticPets.find(sp => sp.id === p.id));
            localStorage.setItem(STORAGE_KEYS.PETS, JSON.stringify(localOnly));
        }
    },

    removePet: (id: string) => {
        const pets = OfflineService.getPets();
        const filtered = pets.filter(p => p.id !== id);
        // Filter out static data
        const localOnly = filtered.filter(p => !staticPets.find(sp => sp.id === p.id));
        localStorage.setItem(STORAGE_KEYS.PETS, JSON.stringify(localOnly));
    },

    updateVaccine: (oldId: string, newVaccine: Vaccine) => {
        const vaccines = OfflineService.getVaccines();
        const index = vaccines.findIndex(v => v.id === oldId);
        if (index !== -1) {
            vaccines[index] = newVaccine;
            const localOnly = vaccines.filter(v => !staticVaccines.find(sv => sv.id === v.id));
            localStorage.setItem(STORAGE_KEYS.VACCINES, JSON.stringify(localOnly));
        }
    },

    removeVaccine: (id: string) => {
        const vaccines = OfflineService.getVaccines();
        const filtered = vaccines.filter(v => v.id !== id);
        const localOnly = filtered.filter(v => !staticVaccines.find(sv => sv.id === v.id));
        localStorage.setItem(STORAGE_KEYS.VACCINES, JSON.stringify(localOnly));
    },

    // --- TREATMENTS ---
    getTreatments: (): Treatment[] => {
        const localData = localStorage.getItem(STORAGE_KEYS.TREATMENTS);
        const localTreatments: Treatment[] = localData ? JSON.parse(localData) : [];
        const allTreatments = [...staticTreatments, ...localTreatments];
        return Array.from(new Map(allTreatments.map(item => [item.id, item])).values());
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
