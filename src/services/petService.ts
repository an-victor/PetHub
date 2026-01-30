import { supabase } from './supabase';
import { OfflineService } from './offlineStorage';

// Minimal types for creation to avoid circular deps or complex partials
interface CreatePetDTO {
    name: string;
    type: string;
    breed: string;
    birthDate: string;
    gender: string;
    weight: string;
    color: string;
    microchip: string;
    neutered: boolean;
    avatar: string;
    ownerId?: string; // Legacy
    owner_id?: string; // Supabase
}

interface CreateVaccineDTO {
    petId: string;
    name: string;
    date: string;
    vet?: string;
    clinic?: string;
    batch?: string;
    notes?: string;
}

export const PetService = {
    async createPet(data: CreatePetDTO, user: any) {
        const basePet: any = {
            ...data,
            owner_id: user?.id || '00000000-0000-0000-0000-000000000000',
            ownerId: user?.id || 'user-001',
            vaccinesUpToDate: true
        };

        // 1. Try Supabase
        try {
            const { data: supabaseData, error } = await supabase
                .from('pets')
                .insert([{
                    name: basePet.name,
                    type: basePet.type,
                    breed: basePet.breed,
                    birth_date: basePet.birthDate,
                    gender: basePet.gender,
                    weight: parseFloat(basePet.weight) || 0,
                    color: basePet.color,
                    microchip: basePet.microchip,
                    neutered: basePet.neutered,
                    avatar_url: basePet.avatar,
                    owner_id: basePet.owner_id
                }])
                .select()
                .single();

            if (error) throw error;

            // Success: Use Real ID
            const finalPet = { ...basePet, ...supabaseData, id: supabaseData.id };
            OfflineService.addPet(finalPet);

            return { success: true, data: finalPet, mode: 'online' };

        } catch (err) {
            console.error('Supabase Pet Create Error:', err);

            // Failure: Use Local ID
            const localId = `local-pet-${Date.now()}`;
            const finalPet = { ...basePet, id: localId };
            OfflineService.addPet(finalPet);

            return { success: true, data: finalPet, mode: 'offline' };
        }
    },

    async createVaccine(data: CreateVaccineDTO) {
        const baseVaccine: any = {
            ...data,
            status: 'applied'
        };

        // 1. Try Supabase (Only if petId is UUID)
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.petId);

        if (isUuid) {
            try {
                const { data: supabaseData, error } = await supabase
                    .from('vaccines')
                    .insert([{
                        pet_id: data.petId,
                        name: data.name,
                        status: 'applied',
                        date: data.date,
                        vet_name: data.vet,
                        clinic_name: data.clinic,
                        batch_number: data.batch,
                        notes: data.notes
                    }])
                    .select()
                    .single();

                if (error) throw error;

                // Success: Use Real ID
                const finalVaccine = { ...baseVaccine, ...supabaseData, id: supabaseData.id };
                OfflineService.addVaccine(finalVaccine);

                return { success: true, mode: 'online', data: finalVaccine };

            } catch (err) {
                console.error('Supabase Vaccine Create Error:', err);
                // Fallback to offline logic below
            }
        }

        // 2. Offline Fallback (or if petId is local)
        const localId = `local-vac-${Date.now()}`;
        const finalVaccine = { ...baseVaccine, id: localId };
        OfflineService.addVaccine(finalVaccine);

        return {
            success: true,
            mode: 'offline',
            data: finalVaccine,
            reason: isUuid ? 'network_error' : 'local_pet_id'
        };
    }
};
