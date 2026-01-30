// PetHub - Mock Data: Pets
import type { Pet } from '../types';

export const pets: Pet[] = [
    {
        id: 'pet-001',
        name: 'Max',
        type: 'dog',
        breed: 'Golden Retriever',
        age: '2 anos',
        birthDate: '2024-01-15',
        weight: '32kg',
        color: 'Dourado',
        gender: 'male',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5n3qQRfTBx2PvsUgS4ObKBJnt_Ny7cTDsNzJDTpDEVp_pnYj2dySpOPcLoS34HrGAgGm2DhevJjFbo3Qr7CPvCG3ugGXn55-WqPFX7eF6_Li_Bll4zT0GmlxWslWIB28oXOtmvw2EI8pRvFN6bTbCrzHOoWZZZ6rCWdq6d6X-RLgwUBebaJa7qtmu03VJ4nFoRSYTOrVAqqPQdYT6yNoycG2wybMu0hPV_0FMB9g7EE2Ft4rJrW-5wSqfEVzg05NBCVnkZDtBAmsd',
        microchip: '981020012345678',
        neutered: true,
        vaccinesUpToDate: true,
        ownerId: 'user-001',
    },
    {
        id: 'pet-002',
        name: 'Luna',
        type: 'cat',
        breed: 'Gata SRD',
        age: '3 anos',
        birthDate: '2023-06-20',
        weight: '4.5kg',
        color: 'Cinza tigrado',
        gender: 'female',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYqaodse2MOVUmzTz73w6ntEu1vdleJeBbtaozJuHs_XfYh670ZmpRVWDzGQswTslxmB61vqhbjvSYkIFZD8eQ38X92pEQ_ql_xVWY2Sp0pLmLfY9fREb29_KvMNIQLL2tLnFrxdyjHdbwZCVVkaR66Erwrd_O5chI_OfX0WzVz1cYxLQVQqZQWwd-dtWTq6PjRO4vDTliX2gGijGRG9p68wHDurwlM_Ynoa3Gr45bvjEt8KwcQndpuKXluEHS0NjqlJSkshlOnKOO',
        microchip: '981020098765432',
        neutered: true,
        vaccinesUpToDate: true,
        ownerId: 'user-001',
    },
    {
        id: 'pet-003',
        name: 'Thor',
        type: 'dog',
        breed: 'Labrador',
        age: '4 anos',
        birthDate: '2022-03-10',
        weight: '35kg',
        color: 'Chocolate',
        gender: 'male',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEeoOk8BagLEIQs2tKJLqNvJq0C7XGTAierUzlOFVqDA-EQiJopJV--dSKvQAZaZe4KyviTaiGlOsg9AM05IlOxCas2acnWg6r1L4RbLvZfqo-ulqN68CZKvZeBMmIvW9dOr2vb_eia9oiglovbccm8O9tA-_u7Y2TfIWnOvGskycWsIWxIumM2S1abXChEaIVIp2jdiIXajUPfnw40l3VkOtO0iLd6JNN4XuD4O-bePi27VKY_0YbgCbVjPP0ypEItq83hbOcTVGJ',
        neutered: false,
        vaccinesUpToDate: false,
        ownerId: 'user-001',
    },
];

export const getPetById = (id: string): Pet | undefined => pets.find(p => p.id === id);
export const getPetsByOwner = (ownerId: string): Pet[] => pets.filter(p => p.ownerId === ownerId);
export const getDogs = (): Pet[] => pets.filter(p => p.type === 'dog');
export const getCats = (): Pet[] => pets.filter(p => p.type === 'cat');
