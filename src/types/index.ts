// PetHub - Centralized Type Definitions

export interface Pet {
    id: string;
    name: string;
    type: 'dog' | 'cat';
    breed: string;
    age: string;
    birthDate?: string;
    weight?: string;
    color?: string;
    gender: 'male' | 'female';
    avatar: string;
    microchip?: string;
    neutered: boolean;
    vaccinesUpToDate: boolean;
    ownerId: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar: string;
    username: string;
    pets: string[];
    location?: string;
}

export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    tags: string[];
    image: string;
    category: 'food' | 'toy' | 'accessory' | 'hygiene' | 'medicine';
    petType: 'dog' | 'cat' | 'all';
    premium?: boolean;
    inStock: boolean;
    description?: string;
}

export interface Vaccine {
    id: string;
    petId: string;
    name: string;
    status: 'applied' | 'upcoming' | 'overdue';
    date: string;
    nextDoseDate?: string;
    vet?: string;
    clinic?: string;
    batch?: string;
    notes?: string;
}

export interface Clinic {
    id: string;
    name: string;
    address: string;
    city: string;
    stateCode: string;
    distance: string;
    rating: number;
    reviewCount: number;
    status: 'open' | 'closed';
    openingHours: string;
    phone: string;
    image: string;
    services: string[];
    emergency: boolean;
}

export interface Vet {
    id: string;
    name: string;
    specialty: string;
    clinicId: string;
    avatar: string;
    rating: number;
    experience: string;
    available: boolean;
}

export interface Appointment {
    id: string;
    petId: string;
    vetId: string;
    clinicId: string;
    type: string;
    date: string;
    time: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    notes?: string;
    prescription?: string;
}

export interface AdoptionPet {
    id: string;
    name: string;
    type: 'dog' | 'cat';
    breed: string;
    age: string;
    gender: 'male' | 'female';
    size: 'small' | 'medium' | 'large';
    city: string;
    stateCode: string;
    location: string;
    distance: string;
    description: string;
    image: string;
    urgent?: boolean;
    featured?: boolean;
    vaccinated: boolean;
    neutered: boolean;
    traits: string[];
    donor: {
        id: string;
        name: string;
        avatar: string;
        phone?: string;
    };
    createdAt: string;
}

export interface Breed {
    id: string;
    name: string;
    type: 'dog' | 'cat';
    energy: number;
    size: 'P' | 'M' | 'G';
    friendliness: number;
    image: string;
    traits: string[];
    weight: string;
    lifespan: string;
    height: string;
    history: string;
    temperament: string;
    careNeeds: string;
    exerciseNeeds: string;
    groomingNeeds: string;
}

export interface TrainingCourse {
    id: string;
    title: string;
    description: string;
    duration: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    category: 'obedience' | 'tricks' | 'behavior' | 'agility';
    image: string;
    instructor: string;
    rating: number;
    price?: number;
    free: boolean;
    lessons: number;
}

export interface Service {
    id: string;
    name: string;
    icon: string;
    path: string;
    color: string;
    description?: string;
}

export interface Message {
    id: string;
    text: string;
    sender: 'me' | 'other';
    time: string;
    image?: string;
    status?: 'sending' | 'sent' | 'read';
}

export interface Notification {
    id: string;
    type: 'vaccine' | 'appointment' | 'adoption' | 'promo' | 'system';
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    actionUrl?: string;
}

// Gamification System Types
export * from './gamification';
