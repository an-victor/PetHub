// PetHub - Mock Data: Clinics and Vets (with location)
import type { Clinic, Vet } from '../types';

export const clinics: Clinic[] = [
    // PARANÁ (PR)
    {
        id: 'clinic-001',
        name: 'Clínica VetCare Amigo',
        address: 'R. das Flores, 123 - Centro',
        city: 'Curitiba',
        stateCode: 'PR',
        distance: '1.2 km',
        rating: 4.9,
        reviewCount: 567,
        status: 'open',
        openingHours: '08h - 20h',
        phone: '(41) 3333-1234',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi-2QKE1SNN73rQxu9O6_QohpltT7kQjiiMtpP_-GCwROxS0Az5zzngMYLMeKvIDczT1HuYvDKvC2RNkYG4DiwcZ5lGkyGBOaRwwU6go_2p_IaEoo3p1cH8FV5SmalFUM4EODqMr6dPiByt0bCcbBlvXRqi7UWNKnhmiOi5CriwrCq17HpmgItXobBWIq-G7KLVpxIel11UYLm9nSYhZ-WyHmPMmluRQ5r4pN3Wx82Rrp5b57WVwkFL7Herq0chXaBhXKD_-AP_BhH',
        services: ['Consultas', 'Cirurgias', 'Vacinação', 'Radiologia', 'Laboratório'],
        emergency: true,
    },
    {
        id: 'clinic-002',
        name: 'Pet Hospital 24h',
        address: 'Av. Brasil, 456 - Batel',
        city: 'Curitiba',
        stateCode: 'PR',
        distance: '2.5 km',
        rating: 4.8,
        reviewCount: 892,
        status: 'open',
        openingHours: '24 horas',
        phone: '(41) 3333-5678',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD92u6__KXrIa8H6BpnLvP3Lf-pQWB8AvIYaKaQaQHsRyG8WL8E8_fBXSwX82FHy9CJkOX5SzE2wxW4302Zu2lhgABfInMDeRwK4KXnqkcCpXmeKUuef5XFIFIlaRT8K75t6658Fe6DWuliERvUTCZF0nHHRnI3bUwnbANykK_iTVFp2ih-Y1gTkOFcbHPlxxCVBweHmncfIVqn04HHByOeWh25_brWLxVCSBMH9-QBEFe64wX3263MOoJwhYxgYWLpPUuKYrnN5Atd',
        services: ['Emergência 24h', 'UTI', 'Cirurgias', 'Internamento', 'Exames'],
        emergency: true,
    },
    {
        id: 'clinic-003',
        name: 'Dr. Pet Clínica Veterinária',
        address: 'R. XV de Novembro, 789 - Centro',
        city: 'Londrina',
        stateCode: 'PR',
        distance: '3.1 km',
        rating: 4.7,
        reviewCount: 345,
        status: 'closed',
        openingHours: '09h - 18h',
        phone: '(43) 3333-9012',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5n3qQRfTBx2PvsUgS4ObKBJnt_Ny7cTDsNzJDTpDEVp_pnYj2dySpOPcLoS34HrGAgGm2DhevJjFbo3Qr7CPvCG3ugGXn55-WqPFX7eF6_Li_Bll4zT0GmlxWslWIB28oXOtmvw2EI8pRvFN6bTbCrzHOoWZZZ6rCWdq6d6X-RLgwUBebaJa7qtmu03VJ4nFoRSYTOrVAqqPQdYT6yNoycG2wybMu0hPV_0FMB9g7EE2Ft4rJrW-5wSqfEVzg05NBCVnkZDtBAmsd',
        services: ['Consultas', 'Vacinação', 'Banho e Tosa', 'Petshop'],
        emergency: false,
    },

    // SÃO PAULO (SP)
    {
        id: 'clinic-sp-001',
        name: 'Hospital Veterinário Paulista',
        address: 'Av. Paulista, 1000 - Bela Vista',
        city: 'São Paulo',
        stateCode: 'SP',
        distance: '1.5 km',
        rating: 4.9,
        reviewCount: 1234,
        status: 'open',
        openingHours: '24 horas',
        phone: '(11) 3333-1234',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi-2QKE1SNN73rQxu9O6_QohpltT7kQjiiMtpP_-GCwROxS0Az5zzngMYLMeKvIDczT1HuYvDKvC2RNkYG4DiwcZ5lGkyGBOaRwwU6go_2p_IaEoo3p1cH8FV5SmalFUM4EODqMr6dPiByt0bCcbBlvXRqi7UWNKnhmiOi5CriwrCq17HpmgItXobBWIq-G7KLVpxIel11UYLm9nSYhZ-WyHmPMmluRQ5r4pN3Wx82Rrp5b57WVwkFL7Herq0chXaBhXKD_-AP_BhH',
        services: ['Emergência 24h', 'UTI', 'Cirurgias', 'Oncologia', 'Cardiologia'],
        emergency: true,
    },
    {
        id: 'clinic-sp-002',
        name: 'PetCare Moema',
        address: 'Al. dos Anapurus, 500 - Moema',
        city: 'São Paulo',
        stateCode: 'SP',
        distance: '3.2 km',
        rating: 4.7,
        reviewCount: 456,
        status: 'open',
        openingHours: '08h - 20h',
        phone: '(11) 3333-5678',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5n3qQRfTBx2PvsUgS4ObKBJnt_Ny7cTDsNzJDTpDEVp_pnYj2dySpOPcLoS34HrGAgGm2DhevJjFbo3Qr7CPvCG3ugGXn55-WqPFX7eF6_Li_Bll4zT0GmlxWslWIB28oXOtmvw2EI8pRvFN6bTbCrzHOoWZZZ6rCWdq6d6X-RLgwUBebaJa7qtmu03VJ4nFoRSYTOrVAqqPQdYT6yNoycG2wybMu0hPV_0FMB9g7EE2Ft4rJrW-5wSqfEVzg05NBCVnkZDtBAmsd',
        services: ['Consultas', 'Vacinação', 'Dermatologia'],
        emergency: false,
    },
    {
        id: 'clinic-sp-003',
        name: 'Clínica Vet Campinas',
        address: 'R. Barão de Jaguara, 200 - Centro',
        city: 'Campinas',
        stateCode: 'SP',
        distance: '2.0 km',
        rating: 4.6,
        reviewCount: 289,
        status: 'open',
        openingHours: '08h - 19h',
        phone: '(19) 3333-9012',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD92u6__KXrIa8H6BpnLvP3Lf-pQWB8AvIYaKaQaQHsRyG8WL8E8_fBXSwX82FHy9CJkOX5SzE2wxW4302Zu2lhgABfInMDeRwK4KXnqkcCpXmeKUuef5XFIFIlaRT8K75t6658Fe6DWuliERvUTCZF0nHHRnI3bUwnbANykK_iTVFp2ih-Y1gTkOFcbHPlxxCVBweHmncfIVqn04HHByOeWh25_brWLxVCSBMH9-QBEFe64wX3263MOoJwhYxgYWLpPUuKYrnN5Atd',
        services: ['Consultas', 'Cirurgias', 'Vacinação'],
        emergency: false,
    },

    // RIO DE JANEIRO (RJ)
    {
        id: 'clinic-rj-001',
        name: 'Pet Hospital Copacabana',
        address: 'Av. Nossa Senhora de Copacabana, 800',
        city: 'Rio de Janeiro',
        stateCode: 'RJ',
        distance: '0.8 km',
        rating: 4.8,
        reviewCount: 678,
        status: 'open',
        openingHours: '24 horas',
        phone: '(21) 3333-1234',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHf8mNse6RRDiFhFi8O-r2AX0fF_Sia-vEmkDUWkOHtYTEVGjn04bOLjOk7p5ZKo7gaJwPrmgOldbFfSgMObdihrDyb0AGjMVoxc5csUEQv6LyCfi5843a3ZmtBH9M-LDKvwXghnCFJ1I2T6zGr5vGO0FluCPxaXBmnyPdlq2d6TfJEuGz1ukVcB2YVKiEC9oj8-TlcEtbt0nJWLEs71kAZMzvymv1I3ez6z0a9E8Vsn85uPJSdAfqhJA9BbSsKEaLfBWj8yAK-lZA',
        services: ['Emergência 24h', 'UTI', 'Cirurgias', 'Exames'],
        emergency: true,
    },
    {
        id: 'clinic-rj-002',
        name: 'VetCare Barra',
        address: 'Av. das Américas, 4500 - Barra da Tijuca',
        city: 'Rio de Janeiro',
        stateCode: 'RJ',
        distance: '5.2 km',
        rating: 4.7,
        reviewCount: 423,
        status: 'open',
        openingHours: '08h - 20h',
        phone: '(21) 3333-5678',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEeoOk8BagLEIQs2tKJLqNvJq0C7XGTAierUzlOFVqDA-EQiJopJV--dSKvQAZaZe4KyviTaiGlOsg9AM05IlOxCas2acnWg6r1L4RbLvZfqo-ulqN68CZKvZeBMmIvW9dOr2vb_eia9oiglovbccm8O9tA-_u7Y2TfIWnOvGskycWsIWxIumM2S1abXChEaIVIp2jdiIXajUPfnw40l3VkOtO0iLd6JNN4XuD4O-bePi27VKY_0YbgCbVjPP0ypEItq83hbOcTVGJ',
        services: ['Consultas', 'Vacinação', 'Banho e Tosa'],
        emergency: false,
    },

    // MINAS GERAIS (MG)
    {
        id: 'clinic-mg-001',
        name: 'Hospital Veterinário BH',
        address: 'Av. Afonso Pena, 1500 - Centro',
        city: 'Belo Horizonte',
        stateCode: 'MG',
        distance: '1.8 km',
        rating: 4.8,
        reviewCount: 567,
        status: 'open',
        openingHours: '24 horas',
        phone: '(31) 3333-1234',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYqaodse2MOVUmzTz73w6ntEu1vdleJeBbtaozJuHs_XfYh670ZmpRVWDzGQswTslxmB61vqhbjvSYkIFZD8eQ38X92pEQ_ql_xVWY2Sp0pLmLfY9fREb29_KvMNIQLL2tLnFrxdyjHdbwZCVVkaR66Erwrd_O5chI_OfX0WzVz1cYxLQVQqZQWwd-dtWTq6PjRO4vDTliX2gGijGRG9p68wHDurwlM_Ynoa3Gr45bvjEt8KwcQndpuKXluEHS0NjqlJSkshlOnKOO',
        services: ['Emergência 24h', 'UTI', 'Cirurgias', 'Oncologia'],
        emergency: true,
    },
    // PET SHOPS & ESTÉTICA
    {
        id: 'shop-pr-001',
        name: 'Paws & Bubbles',
        address: 'R. Mateus Leme, 100 - Centro Cívico',
        city: 'Curitiba',
        stateCode: 'PR',
        distance: '1.2 km',
        rating: 4.8,
        reviewCount: 156,
        status: 'open',
        openingHours: '09h - 19h',
        phone: '(41) 3222-4444',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ82tNYGqiLatYlfBjVN5B3TvlOfgKtD_BX8ZX5jXsyuJCOOSyN1P2BQZc3_XTEaDGDn-vXMTJUP29THx2FFrLAxki3G1di4HINa14VUIwHbGJZOVjBcIzeiDUAj4jVwqRpZQbF85Lh9vKcXRw33eO8xqQI04lcqp0aTYd13hhRT8dBzNofA2EMU1DlbM_5ZmZhskKfqderlFJxkkYwOzbGo7QsZxxJvVIoHxzNfH7NwdbpmcPpdElrgtCd5EXQfTcDeRkUkcOsA1h',
        services: ['Banho', 'Tosa', 'Hidratação', 'Petshop'],
        emergency: false,
    },
    {
        id: 'shop-sp-001',
        name: 'Pet Glamour Spa',
        address: 'R. Oscar Freire, 800 - Jardins',
        city: 'São Paulo',
        stateCode: 'SP',
        distance: '2.8 km',
        rating: 4.9,
        reviewCount: 234,
        status: 'open',
        openingHours: '10h - 20h',
        phone: '(11) 3000-5000',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOzrGy5Zppn_YfG041LNE4pj84u22O_NOB7iA6-WEYUnoHA52macnwq0e-xkh5Mo5ovZApMMyj1WGKYcwoaFPx-cCiGbl-G1Q_kIE_PcWnCR6x7Zs3Z7CIEJNpsX5CgL-HQUmtKb82A1oaGbM98qPpycihurzpqde3Piuc2erCme0ln1AzS7EOCjepRCYcTd5Reqorkan19WfO_pAGTk3sqUwAc3ULyvGJOk-3TuD1UtnunQiB60JZuhO8xY2_zYLDwBLb-rsGxTpc',
        services: ['Banho', 'Tosa', 'Spa', 'Aromaterapia'],
        emergency: false,
    }
];

export const vets: Vet[] = [
    {
        id: 'vet-001',
        name: 'Dr. Ricardo Silva',
        specialty: 'Clínico Geral',
        clinicId: 'clinic-001',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD92u6__KXrIa8H6BpnLvP3Lf-pQWB8AvIYaKaQaQHsRyG8WL8E8_fBXSwX82FHy9CJkOX5SzE2wxW4302Zu2lhgABfInMDeRwK4KXnqkcCpXmeKUuef5XFIFIlaRT8K75t6658Fe6DWuliERvUTCZF0nHHRnI3bUwnbANykK_iTVFp2ih-Y1gTkOFcbHPlxxCVBweHmncfIVqn04HHByOeWh25_brWLxVCSBMH9-QBEFe64wX3263MOoJwhYxgYWLpPUuKYrnN5Atd',
        rating: 4.9,
        experience: '15 anos',
        available: true,
    },
    {
        id: 'vet-002',
        name: 'Dra. Marina Costa',
        specialty: 'Dermatologista',
        clinicId: 'clinic-001',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5n3qQRfTBx2PvsUgS4ObKBJnt_Ny7cTDsNzJDTpDEVp_pnYj2dySpOPcLoS34HrGAgGm2DhevJjFbo3Qr7CPvCG3ugGXn55-WqPFX7eF6_Li_Bll4zT0GmlxWslWIB28oXOtmvw2EI8pRvFN6bTbCrzHOoWZZZ6rCWdq6d6X-RLgwUBebaJa7qtmu03VJ4nFoRSYTOrVAqqPQdYT6yNoycG2wybMu0hPV_0FMB9g7EE2Ft4rJrW-5wSqfEVzg05NBCVnkZDtBAmsd',
        rating: 4.8,
        experience: '10 anos',
        available: true,
    },
    {
        id: 'vet-sp-001',
        name: 'Dr. Paulo Mendes',
        specialty: 'Cirurgião',
        clinicId: 'clinic-sp-001',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHf8mNse6RRDiFhFi8O-r2AX0fF_Sia-vEmkDUWkOHtYTEVGjn04bOLjOk7p5ZKo7gaJwPrmgOldbFfSgMObdihrDyb0AGjMVoxc5csUEQv6LyCfi5843a3ZmtBH9M-LDKvwXghnCFJ1I2T6zGr5vGO0FluCPxaXBmnyPdlq2d6TfJEuGz1ukVcB2YVKiEC9oj8-TlcEtbt0nJWLEs71kAZMzvymv1I3ez6z0a9E8Vsn85uPJSdAfqhJA9BbSsKEaLfBWj8yAK-lZA',
        rating: 4.9,
        experience: '20 anos',
        available: true,
    },
];

// Filter functions with location
export const getClinicById = (id: string): Clinic | undefined => clinics.find(c => c.id === id);
export const getOpenClinics = (): Clinic[] => clinics.filter(c => c.status === 'open');
export const getEmergencyClinics = (): Clinic[] => clinics.filter(c => c.emergency);
export const getVetById = (id: string): Vet | undefined => vets.find(v => v.id === id);
export const getVetsByClinic = (clinicId: string): Vet[] => vets.filter(v => v.clinicId === clinicId);

// NEW: Filter by state
export const getClinicsByState = (stateCode: string): Clinic[] =>
    clinics.filter(c => c.stateCode === stateCode);

export const getClinicsByStateAndCity = (stateCode: string, city?: string): Clinic[] => {
    let result = clinics.filter(c => c.stateCode === stateCode);
    if (city) {
        result = result.filter(c => c.city === city);
    }
    return result;
    return result;
};

export const getPetShopsByState = (stateCode: string): Clinic[] => {
    return clinics.filter(c =>
        c.stateCode === stateCode &&
        (c.services.includes('Banho') || c.services.includes('Banho e Tosa') || c.services.includes('Petshop'))
    );
};
