// PetHub - Mock Data: Users
import type { User } from '../types';

export const users: User[] = [
    {
        id: 'user-001',
        name: 'Maria Silva',
        email: 'maria.silva@email.com',
        phone: '(41) 99999-1234',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD92u6__KXrIa8H6BpnLvP3Lf-pQWB8AvIYaKaQaQHsRyG8WL8E8_fBXSwX82FHy9CJkOX5SzE2wxW4302Zu2lhgABfInMDeRwK4KXnqkcCpXmeKUuef5XFIFIlaRT8K75t6658Fe6DWuliERvUTCZF0nHHRnI3bUwnbANykK_iTVFp2ih-Y1gTkOFcbHPlxxCVBweHmncfIVqn04HHByOeWh25_brWLxVCSBMH9-QBEFe64wX3263MOoJwhYxgYWLpPUuKYrnN5Atd',
        username: '@maria.pets',
        pets: ['pet-001', 'pet-002', 'pet-003'],
        location: 'Curitiba, PR',
    },
    {
        id: 'user-002',
        name: 'Ricardo Santos',
        email: 'ricardo@email.com',
        phone: '(41) 98888-5678',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHf8mNse6RRDiFhFi8O-r2AX0fF_Sia-vEmkDUWkOHtYTEVGjn04bOLjOk7p5ZKo7gaJwPrmgOldbFfSgMObdihrDyb0AGjMVoxc5csUEQv6LyCfi5843a3ZmtBH9M-LDKvwXghnCFJ1I2T6zGr5vGO0FluCPxaXBmnyPdlq2d6TfJEuGz1ukVcB2YVKiEC9oj8-TlcEtbt0nJWLEs71kAZMzvymv1I3ez6z0a9E8Vsn85uPJSdAfqhJA9BbSsKEaLfBWj8yAK-lZA',
        username: '@ricardo.pets',
        pets: [],
        location: 'São Paulo, SP',
    },
    {
        id: 'user-003',
        name: 'Ana Paula Costa',
        email: 'ana.costa@email.com',
        phone: '(11) 97777-9012',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5n3qQRfTBx2PvsUgS4ObKBJnt_Ny7cTDsNzJDTpDEVp_pnYj2dySpOPcLoS34HrGAgGm2DhevJjFbo3Qr7CPvCG3ugGXn55-WqPFX7eF6_Li_Bll4zT0GmlxWslWIB28oXOtmvw2EI8pRvFN6bTbCrzHOoWZZZ6rCWdq6d6X-RLgwUBebaJa7qtmu03VJ4nFoRSYTOrVAqqPQdYT6yNoycG2wybMu0hPV_0FMB9g7EE2Ft4rJrW-5wSqfEVzg05NBCVnkZDtBAmsd',
        username: '@ana.pets',
        pets: [],
        location: 'Rio de Janeiro, RJ',
    },
];

// Note: In the actual app, currentUser is handled by Clerk (Auth Context).
// These mocks are for development/fallback or admin views.
export const currentUser = users[0];
export const getUserById = (id: string): User | undefined => users.find(u => u.id === id);
