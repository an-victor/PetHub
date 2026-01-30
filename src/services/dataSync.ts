import { supabase } from './supabase';
import { OfflineService } from './offlineStorage';
import { PetService } from './petService';
import { toast } from 'sonner';

/**
 * Service responsible for synchronizing local data with Supabase
 */
export const DataSyncService = {
    syncAll: async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return; // Only sync if authenticated

            const pets = OfflineService.getPets();
            const localPets = pets.filter(p => p.id.startsWith('local-'));

            if (localPets.length > 0) {
                toast.info('Sincronizando dados offline...');

                for (const pet of localPets) {
                    console.log(`Syncing local pet: ${pet.name} (${pet.id})`);

                    // Force types to match DTO - Data from LS can be messy, so we use 'any' cast or defaults
                    const petDto: any = {
                        ...pet,
                        ownerId: user.id,
                        owner_id: user.id,
                        birthDate: pet.birthDate || new Date().toISOString().split('T')[0] // Default if missing
                    };

                    const result = await PetService.createPet(petDto, user);

                    if (result.mode === 'online' && result.data) {
                        const newId = result.data.id;
                        const oldId = pet.id;

                        console.log(`Pet synced! Old ID: ${oldId} -> New ID: ${newId}`);

                        // 1. Remove the old local pet
                        OfflineService.removePet(oldId);

                        // 2. Update orphaned vaccines
                        const vaccines = OfflineService.getVaccinesByPet(oldId);
                        for (const vacc of vaccines) {
                            const updatedVacc = { ...vacc, petId: newId };
                            OfflineService.updateVaccine(vacc.id, updatedVacc);
                        }
                    }
                }

                toast.success('Pets sincronizados!');
            }

            // Always try to sync vaccines, even if no local pets
            await DataSyncService.syncVaccines();

        } catch (error) {
            console.error('Sync failed:', error);
        }
    },

    syncVaccines: async () => {
        const vaccines = OfflineService.getVaccines();
        const localVaccines = vaccines.filter(v => v.id.startsWith('local-'));

        if (localVaccines.length === 0) return;

        console.log(`Syncing ${localVaccines.length} vaccines...`);

        for (const vacc of localVaccines) {
            // Only sync if petId is a valid UUID (meaning the pet is already synced)
            const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(vacc.petId);

            if (isUuid) {
                // Re-use createVaccine logic
                // Ensure DTO shape
                const vaccineDto: any = { ...vacc };

                const result = await PetService.createVaccine(vaccineDto);

                if (result.mode === 'online' && result.data) {
                    // Remove old local vaccine
                    OfflineService.removeVaccine(vacc.id);
                    // createVaccine already added the new one to LS
                }
            }
        }
    }
};
