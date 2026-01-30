// PetHub - Mock Data: Adoption Pets (with location)
import type { AdoptionPet } from '../types';

export const adoptionPets: AdoptionPet[] = [
    // PARANÁ (PR)
    {
        id: 'adopt-001',
        name: 'Bento',
        type: 'dog',
        breed: 'Golden Retriever filhote',
        age: '6 meses',
        gender: 'male',
        size: 'large',
        city: 'Curitiba',
        stateCode: 'PR',
        location: 'Curitiba, PR',
        distance: '2.5 km',
        urgent: true,
        featured: true,
        description: 'Muito dócil, brincalhão e já iniciou o adestramento básico.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHf8mNse6RRDiFhFi8O-r2AX0fF_Sia-vEmkDUWkOHtYTEVGjn04bOLjOk7p5ZKo7gaJwPrmgOldbFfSgMObdihrDyb0AGjMVoxc5csUEQv6LyCfi5843a3ZmtBH9M-LDKvwXghnCFJ1I2T6zGr5vGO0FluCPxaXBmnyPdlq2d6TfJEuGz1ukVcB2YVKiEC9oj8-TlcEtbt0nJWLEs71kAZMzvymv1I3ez6z0a9E8Vsn85uPJSdAfqhJA9BbSsKEaLfBWj8yAK-lZA',
        vaccinated: true,
        neutered: false,
        traits: ['Brincalhão', 'Dócil', 'Bom com crianças'],
        donor: { id: 'user-002', name: 'Ricardo S.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD92u6__KXrIa8H6BpnLvP3Lf-pQWB8AvIYaKaQaQHsRyG8WL8E8_fBXSwX82FHy9CJkOX5SzE2wxW4302Zu2lhgABfInMDeRwK4KXnqkcCpXmeKUuef5XFIFIlaRT8K75t6658Fe6DWuliERvUTCZF0nHHRnI3bUwnbANykK_iTVFp2ih-Y1gTkOFcbHPlxxCVBweHmncfIVqn04HHByOeWh25_brWLxVCSBMH9-QBEFe64wX3263MOoJwhYxgYWLpPUuKYrnN5Atd' },
        createdAt: '2026-01-10',
    },
    {
        id: 'adopt-002',
        name: 'Luna',
        type: 'cat',
        breed: 'Gata SRD adulta',
        age: '2 anos',
        gender: 'female',
        size: 'small',
        city: 'Londrina',
        stateCode: 'PR',
        location: 'Londrina, PR',
        distance: '5.0 km',
        description: 'Castrada, vacinada e muito carinhosa.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYqaodse2MOVUmzTz73w6ntEu1vdleJeBbtaozJuHs_XfYh670ZmpRVWDzGQswTslxmB61vqhbjvSYkIFZD8eQ38X92pEQ_ql_xVWY2Sp0pLmLfY9fREb29_KvMNIQLL2tLnFrxdyjHdbwZCVVkaR66Erwrd_O5chI_OfX0WzVz1cYxLQVQqZQWwd-dtWTq6PjRO4vDTliX2gGijGRG9p68wHDurwlM_Ynoa3Gr45bvjEt8KwcQndpuKXluEHS0NjqlJSkshlOnKOO',
        vaccinated: true,
        neutered: true,
        traits: ['Carinhosa', 'Calma', 'Independente'],
        donor: { id: 'user-003', name: 'Maria Clara', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5n3qQRfTBx2PvsUgS4ObKBJnt_Ny7cTDsNzJDTpDEVp_pnYj2dySpOPcLoS34HrGAgGm2DhevJjFbo3Qr7CPvCG3ugGXn55-WqPFX7eF6_Li_Bll4zT0GmlxWslWIB28oXOtmvw2EI8pRvFN6bTbCrzHOoWZZZ6rCWdq6d6X-RLgwUBebaJa7qtmu03VJ4nFoRSYTOrVAqqPQdYT6yNoycG2wybMu0hPV_0FMB9g7EE2Ft4rJrW-5wSqfEVzg05NBCVnkZDtBAmsd' },
        createdAt: '2026-01-15',
    },

    // SÃO PAULO (SP)
    {
        id: 'adopt-sp-001',
        name: 'Thor',
        type: 'dog',
        breed: 'Pit Bull mestiço',
        age: '3 anos',
        gender: 'male',
        size: 'large',
        city: 'São Paulo',
        stateCode: 'SP',
        location: 'São Paulo, SP',
        distance: '3.2 km',
        description: 'Muito protetor e leal. Precisa de espaço.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEeoOk8BagLEIQs2tKJLqNvJq0C7XGTAierUzlOFVqDA-EQiJopJV--dSKvQAZaZe4KyviTaiGlOsg9AM05IlOxCas2acnWg6r1L4RbLvZfqo-ulqN68CZKvZeBMmIvW9dOr2vb_eia9oiglovbccm8O9tA-_u7Y2TfIWnOvGskycWsIWxIumM2S1abXChEaIVIp2jdiIXajUPfnw40l3VkOtO0iLd6JNN4XuD4O-bePi27VKY_0YbgCbVjPP0ypEItq83hbOcTVGJ',
        vaccinated: true,
        neutered: true,
        traits: ['Protetor', 'Leal', 'Energético'],
        donor: { id: 'user-002', name: 'Ricardo S.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD92u6__KXrIa8H6BpnLvP3Lf-pQWB8AvIYaKaQaQHsRyG8WL8E8_fBXSwX82FHy9CJkOX5SzE2wxW4302Zu2lhgABfInMDeRwK4KXnqkcCpXmeKUuef5XFIFIlaRT8K75t6658Fe6DWuliERvUTCZF0nHHRnI3bUwnbANykK_iTVFp2ih-Y1gTkOFcbHPlxxCVBweHmncfIVqn04HHByOeWh25_brWLxVCSBMH9-QBEFe64wX3263MOoJwhYxgYWLpPUuKYrnN5Atd' },
        createdAt: '2026-01-08',
    },
    {
        id: 'adopt-sp-002',
        name: 'Mel',
        type: 'dog',
        breed: 'Vira-lata caramelo',
        age: '1 ano',
        gender: 'female',
        size: 'medium',
        city: 'Campinas',
        stateCode: 'SP',
        location: 'Campinas, SP',
        distance: '1.8 km',
        urgent: true,
        description: 'Resgatada da rua, muito dócil e carente de amor.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5n3qQRfTBx2PvsUgS4ObKBJnt_Ny7cTDsNzJDTpDEVp_pnYj2dySpOPcLoS34HrGAgGm2DhevJjFbo3Qr7CPvCG3ugGXn55-WqPFX7eF6_Li_Bll4zT0GmlxWslWIB28oXOtmvw2EI8pRvFN6bTbCrzHOoWZZZ6rCWdq6d6X-RLgwUBebaJa7qtmu03VJ4nFoRSYTOrVAqqPQdYT6yNoycG2wybMu0hPV_0FMB9g7EE2Ft4rJrW-5wSqfEVzg05NBCVnkZDtBAmsd',
        vaccinated: true,
        neutered: true,
        traits: ['Dócil', 'Carente', 'Calma'],
        donor: { id: 'ong-001', name: 'ONG Amigo Fiel', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHf8mNse6RRDiFhFi8O-r2AX0fF_Sia-vEmkDUWkOHtYTEVGjn04bOLjOk7p5ZKo7gaJwPrmgOldbFfSgMObdihrDyb0AGjMVoxc5csUEQv6LyCfi5843a3ZmtBH9M-LDKvwXghnCFJ1I2T6zGr5vGO0FluCPxaXBmnyPdlq2d6TfJEuGz1ukVcB2YVKiEC9oj8-TlcEtbt0nJWLEs71kAZMzvymv1I3ez6z0a9E8Vsn85uPJSdAfqhJA9BbSsKEaLfBWj8yAK-lZA' },
        createdAt: '2026-01-18',
    },

    // RIO DE JANEIRO (RJ)
    {
        id: 'adopt-rj-001',
        name: 'Simba',
        type: 'cat',
        breed: 'Gato laranja',
        age: '8 meses',
        gender: 'male',
        size: 'small',
        city: 'Rio de Janeiro',
        stateCode: 'RJ',
        location: 'Rio de Janeiro, RJ',
        distance: '4.0 km',
        featured: true,
        description: 'Gatinho brincalhão, adora brincar de correr atrás de bolinhas.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYqaodse2MOVUmzTz73w6ntEu1vdleJeBbtaozJuHs_XfYh670ZmpRVWDzGQswTslxmB61vqhbjvSYkIFZD8eQ38X92pEQ_ql_xVWY2Sp0pLmLfY9fREb29_KvMNIQLL2tLnFrxdyjHdbwZCVVkaR66Erwrd_O5chI_OfX0WzVz1cYxLQVQqZQWwd-dtWTq6PjRO4vDTliX2gGijGRG9p68wHDurwlM_Ynoa3Gr45bvjEt8KwcQndpuKXluEHS0NjqlJSkshlOnKOO',
        vaccinated: true,
        neutered: false,
        traits: ['Brincalhão', 'Ativo', 'Curioso'],
        donor: { id: 'user-004', name: 'Ana Paula', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5n3qQRfTBx2PvsUgS4ObKBJnt_Ny7cTDsNzJDTpDEVp_pnYj2dySpOPcLoS34HrGAgGm2DhevJjFbo3Qr7CPvCG3ugGXn55-WqPFX7eF6_Li_Bll4zT0GmlxWslWIB28oXOtmvw2EI8pRvFN6bTbCrzHOoWZZZ6rCWdq6d6X-RLgwUBebaJa7qtmu03VJ4nFoRSYTOrVAqqPQdYT6yNoycG2wybMu0hPV_0FMB9g7EE2Ft4rJrW-5wSqfEVzg05NBCVnkZDtBAmsd' },
        createdAt: '2026-01-12',
    },

    // MINAS GERAIS (MG)
    {
        id: 'adopt-mg-001',
        name: 'Bob',
        type: 'dog',
        breed: 'Labrador',
        age: '4 anos',
        gender: 'male',
        size: 'large',
        city: 'Belo Horizonte',
        stateCode: 'MG',
        location: 'Belo Horizonte, MG',
        distance: '2.1 km',
        description: 'Cão tranquilo, ótimo para apartamento. Muito educado.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEeoOk8BagLEIQs2tKJLqNvJq0C7XGTAierUzlOFVqDA-EQiJopJV--dSKvQAZaZe4KyviTaiGlOsg9AM05IlOxCas2acnWg6r1L4RbLvZfqo-ulqN68CZKvZeBMmIvW9dOr2vb_eia9oiglovbccm8O9tA-_u7Y2TfIWnOvGskycWsIWxIumM2S1abXChEaIVIp2jdiIXajUPfnw40l3VkOtO0iLd6JNN4XuD4O-bePi27VKY_0YbgCbVjPP0ypEItq83hbOcTVGJ',
        vaccinated: true,
        neutered: true,
        traits: ['Tranquilo', 'Educado', 'Companheiro'],
        donor: { id: 'ong-002', name: 'Abrigo Vida Animal', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD92u6__KXrIa8H6BpnLvP3Lf-pQWB8AvIYaKaQaQHsRyG8WL8E8_fBXSwX82FHy9CJkOX5SzE2wxW4302Zu2lhgABfInMDeRwK4KXnqkcCpXmeKUuef5XFIFIlaRT8K75t6658Fe6DWuliERvUTCZF0nHHRnI3bUwnbANykK_iTVFp2ih-Y1gTkOFcbHPlxxCVBweHmncfIVqn04HHByOeWh25_brWLxVCSBMH9-QBEFe64wX3263MOoJwhYxgYWLpPUuKYrnN5Atd' },
        createdAt: '2026-01-05',
    },
];

// Filter functions
export const getAdoptionPetById = (id: string) => adoptionPets.find(p => p.id === id);
export const getAdoptionDogs = () => adoptionPets.filter(p => p.type === 'dog');
export const getAdoptionCats = () => adoptionPets.filter(p => p.type === 'cat');
export const getUrgentPets = () => adoptionPets.filter(p => p.urgent);

// NEW: Filter by state
export const getAdoptionPetsByState = (stateCode: string) =>
    adoptionPets.filter(p => p.stateCode === stateCode);

export const getAdoptionPetsByStateAndCity = (stateCode: string, city?: string) => {
    let result = adoptionPets.filter(p => p.stateCode === stateCode);
    if (city) {
        result = result.filter(p => p.city === city);
    }
    return result;
};
