// PetHub - Location Service
// Manages user location for filtering local services

export interface UserLocation {
    state: string;
    stateCode: string;
    city: string;
    country: string;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
}

export interface LocationOption {
    state: string;
    stateCode: string;
    cities: string[];
}

// Brazilian states for selection
export const brazilianStates: LocationOption[] = [
    { state: 'Acre', stateCode: 'AC', cities: ['Rio Branco', 'Cruzeiro do Sul'] },
    { state: 'Alagoas', stateCode: 'AL', cities: ['Maceió', 'Arapiraca'] },
    { state: 'Amapá', stateCode: 'AP', cities: ['Macapá', 'Santana'] },
    { state: 'Amazonas', stateCode: 'AM', cities: ['Manaus', 'Parintins'] },
    { state: 'Bahia', stateCode: 'BA', cities: ['Salvador', 'Feira de Santana', 'Vitória da Conquista'] },
    { state: 'Ceará', stateCode: 'CE', cities: ['Fortaleza', 'Juazeiro do Norte', 'Sobral'] },
    { state: 'Distrito Federal', stateCode: 'DF', cities: ['Brasília', 'Taguatinga', 'Ceilândia'] },
    { state: 'Espírito Santo', stateCode: 'ES', cities: ['Vitória', 'Vila Velha', 'Serra'] },
    { state: 'Goiás', stateCode: 'GO', cities: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis'] },
    { state: 'Maranhão', stateCode: 'MA', cities: ['São Luís', 'Imperatriz'] },
    { state: 'Mato Grosso', stateCode: 'MT', cities: ['Cuiabá', 'Várzea Grande', 'Rondonópolis'] },
    { state: 'Mato Grosso do Sul', stateCode: 'MS', cities: ['Campo Grande', 'Dourados'] },
    { state: 'Minas Gerais', stateCode: 'MG', cities: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora'] },
    { state: 'Pará', stateCode: 'PA', cities: ['Belém', 'Ananindeua', 'Santarém'] },
    { state: 'Paraíba', stateCode: 'PB', cities: ['João Pessoa', 'Campina Grande'] },
    { state: 'Paraná', stateCode: 'PR', cities: ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais'] },
    { state: 'Pernambuco', stateCode: 'PE', cities: ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru'] },
    { state: 'Piauí', stateCode: 'PI', cities: ['Teresina', 'Parnaíba'] },
    { state: 'Rio de Janeiro', stateCode: 'RJ', cities: ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Niterói', 'Nova Iguaçu'] },
    { state: 'Rio Grande do Norte', stateCode: 'RN', cities: ['Natal', 'Mossoró', 'Parnamirim'] },
    { state: 'Rio Grande do Sul', stateCode: 'RS', cities: ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas'] },
    { state: 'Rondônia', stateCode: 'RO', cities: ['Porto Velho', 'Ji-Paraná'] },
    { state: 'Roraima', stateCode: 'RR', cities: ['Boa Vista'] },
    { state: 'Santa Catarina', stateCode: 'SC', cities: ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Chapecó'] },
    { state: 'São Paulo', stateCode: 'SP', cities: ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'Sorocaba', 'Ribeirão Preto', 'Santos'] },
    { state: 'Sergipe', stateCode: 'SE', cities: ['Aracaju', 'Nossa Senhora do Socorro'] },
    { state: 'Tocantins', stateCode: 'TO', cities: ['Palmas', 'Araguaína'] },
];

// Default location (will be overwritten by user choice or GPS)
const DEFAULT_LOCATION: UserLocation = {
    state: 'Paraná',
    stateCode: 'PR',
    city: 'Curitiba',
    country: 'Brasil',
};

// Get saved location from localStorage
export const getSavedLocation = (): UserLocation => {
    const saved = localStorage.getItem('pethub-user-location');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch {
            return DEFAULT_LOCATION;
        }
    }
    return DEFAULT_LOCATION;
};

// Save location to localStorage
export const saveLocation = (location: UserLocation): void => {
    localStorage.setItem('pethub-user-location', JSON.stringify(location));
};

// Get state by code
export const getStateByCode = (code: string): LocationOption | undefined => {
    return brazilianStates.find(s => s.stateCode === code);
};

// Get cities by state code
export const getCitiesByStateCode = (code: string): string[] => {
    const state = getStateByCode(code);
    return state?.cities || [];
};

// Request browser geolocation (for future GPS integration)
export const requestBrowserLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocalização não suportada pelo navegador'));
            return;
        }

        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000, // 5 minutes cache
        });
    });
};

// AUTO-DETECT: Get City/State from Coordinates using OpenStreetMap (Free)
export const detectLocation = async (): Promise<UserLocation> => {
    try {
        const position = await requestBrowserLocation();
        const { latitude, longitude } = position.coords;

        // Use OSM Nominatim for free reverse geocoding
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`);
        const data = await response.json();

        const address = data.address;
        const city = address.city || address.town || address.village || address.municipality || 'Curitiba';
        const state = address.state || 'Paraná';
        // Map state name to code if needed, or stick to name.
        // For brevity, we'll try to find it in our list.
        const foundState = brazilianStates.find(s => s.state === state) || brazilianStates.find(s => state.includes(s.state));

        return {
            city: city,
            state: state,
            stateCode: foundState ? foundState.stateCode : 'PR', // Fallback
            country: 'Brasil',
            coordinates: { latitude, longitude }
        };

    } catch (error) {
        console.error("Location detection failed:", error);
        throw error;
    }
};

// Calculate distance (for sorting by proximity - placeholder)
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
