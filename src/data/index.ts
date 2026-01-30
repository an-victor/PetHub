// PetHub - Centralized Data Exports
export * from './pets';
export * from './users';
export * from './products';
export * from './clinics';
export * from './vaccines';
export { adoptionPets, getAdoptionPetById, getUrgentPets, getAdoptionDogs, getAdoptionCats, getAdoptionPetsByState, getAdoptionPetsByStateAndCity } from './adoption';
export * from './training';
export * from './homeData';
export * from './campaigns';
export * from './treatments';
export * from './gamification';
export * from './subscription';



// Navigation services
export const mainServices = [
    { id: 'vets', name: 'Veterinário', icon: 'medical_services', path: '/vets', color: 'from-emerald-400 to-emerald-600' },
    { id: 'nutrition', name: 'Loja', icon: 'shopping_bag', path: '/nutrition', color: 'from-amber-400 to-orange-500' },
    { id: 'training', name: 'Treino', icon: 'school', path: '/training', color: 'from-sky-400 to-blue-500' },
    { id: 'bath', name: 'Banho', icon: 'content_cut', path: '/bath', color: 'from-pink-400 to-rose-500' },
    { id: 'calculator', name: 'Calculadora', icon: 'calculate', path: '/nutrition-calculator', color: 'from-purple-400 to-indigo-500' },
    { id: 'scanner', name: 'IA Raças', icon: 'center_focus_weak', path: '/breed-scanner', color: 'from-blue-500 to-cyan-500' },
];

export const allSections = [
    { id: 'home', name: 'Início', icon: 'home', path: '/' },
    { id: 'pets', name: 'Meus Pets', icon: 'pets', path: '/pets' },
    { id: 'vaccines', name: 'Vacinas', icon: 'vaccines', path: '/vaccines' },
    { id: 'vets', name: 'Veterinários', icon: 'medical_services', path: '/vets' },
    { id: 'agenda', name: 'Agenda', icon: 'calendar_today', path: '/agenda' },
    { id: 'nutrition', name: 'Loja', icon: 'shopping_bag', path: '/nutrition' },
    { id: 'training', name: 'Treinamento', icon: 'school', path: '/training' },
    { id: 'bath', name: 'Banho e Tosa', icon: 'content_cut', path: '/bath' },
    { id: 'calculator', name: 'Calculadora Nutri', icon: 'calculate', path: '/nutrition-calculator' },
    { id: 'scanner', name: 'Scanner de Raças', icon: 'center_focus_weak', path: '/breed-scanner' },
    { id: 'adoption', name: 'Adoção', icon: 'favorite', path: '/adoption' },
    { id: 'donation', name: 'Doação', icon: 'volunteer_activism', path: '/donation' },
    { id: 'encyclopedia', name: 'Enciclopédia', icon: 'menu_book', path: '/encyclopedia' },
    { id: 'profile', name: 'Perfil', icon: 'person', path: '/profile' },
];
