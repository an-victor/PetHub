import { vaccines as staticVaccines } from '../data/vaccines';
import { pets as staticPets } from '../data/pets';
import { Vaccine, Pet } from '../types';

const STORAGE_KEYS = {
    VACCINES: 'pethub-vaccines-local',
    PETS: 'pethub-pets-local',
    APPOINTMENTS: 'pethub-appointments-local'
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
    }
};
