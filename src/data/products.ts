// PetHub - Mock Data: Products
import type { Product } from '../types';

export const products: Product[] = [
    // Dog Food
    {
        id: 'prod-001',
        name: 'Ração Premium Golden Retriever',
        brand: 'Royal Canin',
        price: 289.90,
        originalPrice: 329.90,
        rating: 4.9,
        reviewCount: 1247,
        tags: ['Premium', 'Raça Específica', 'Adulto'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB1tie9Tsp0z-0NfffPfw7lyP7hZ7fL_G89ZVnsIsdzYwWUb85Jh5ZV0A1jIl1Cj5xFYniyV4c1Zl1Um-YpAPZJmTWvlkZsfnV3_QOcTi3L6-8RkI0IkMiOuVxjnF8cQpwuXUSpg8-_kAUaGNmgN1d2QKz11LsaAz2s-EehguG0jLs7WKQafa2EoMgLrk3gpqBoe-wQAxmQwbinUzCSPMNWsihpT9AVfn0c9Eo8OZajGMMc5M8-rjyBKoYt4A8NjiZo68T1IV1o8fr',
        category: 'food',
        petType: 'dog',
        premium: true,
        inStock: true,
        description: 'Ração formulada especificamente para Golden Retrievers adultos, com nutrientes para pele e pelagem.'
    },
    {
        id: 'prod-002',
        name: 'Ração Natural Frango e Arroz',
        brand: 'PremieR',
        price: 189.90,
        rating: 4.7,
        reviewCount: 892,
        tags: ['Natural', 'Grãos Selecionados'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyeDMZIL4P19X-EGMyIs_z1Mz2NA4HePqu6kLAJJqaoUWJUMT0v6Zn95b8-Nt0vGvAvnCG2RkXyUc8Q1rLsmW9FfP2G2PdgUat9puI1SPrzkPBuasDiYcfk0XeguiU1ErqAQLbeabYlxECB5TcASJzKt0dpylHOjGITvKIARO0pm8epda30zgIU4K6fe5aiuaBJiwcu-p53-yNincY3miN7YS58kkOC98e1lklPjKS5dvM6ZrVmjFjxoWTx0HUurYRXshdo6YtZyUk',
        category: 'food',
        petType: 'dog',
        inStock: true,
    },
    {
        id: 'prod-003',
        name: 'Ração Filhotes Super Growth',
        brand: 'Hill\'s Science Diet',
        price: 249.90,
        rating: 4.8,
        reviewCount: 654,
        tags: ['Filhotes', 'Alto Crescimento'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5n3qQRfTBx2PvsUgS4ObKBJnt_Ny7cTDsNzJDTpDEVp_pnYj2dySpOPcLoS34HrGAgGm2DhevJjFbo3Qr7CPvCG3ugGXn55-WqPFX7eF6_Li_Bll4zT0GmlxWslWIB28oXOtmvw2EI8pRvFN6bTbCrzHOoWZZZ6rCWdq6d6X-RLgwUBebaJa7qtmu03VJ4nFoRSYTOrVAqqPQdYT6yNoycG2wybMu0hPV_0FMB9g7EE2Ft4rJrW-5wSqfEVzg05NBCVnkZDtBAmsd',
        category: 'food',
        petType: 'dog',
        premium: true,
        inStock: true,
    },
    // Cat Food
    {
        id: 'prod-004',
        name: 'Ração Gatos Castrados Light',
        brand: 'Whiskas',
        price: 89.90,
        rating: 4.5,
        reviewCount: 1023,
        tags: ['Castrados', 'Light', 'Controle de Peso'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYqaodse2MOVUmzTz73w6ntEu1vdleJeBbtaozJuHs_XfYh670ZmpRVWDzGQswTslxmB61vqhbjvSYkIFZD8eQ38X92pEQ_ql_xVWY2Sp0pLmLfY9fREb29_KvMNIQLL2tLnFrxdyjHdbwZCVVkaR66Erwrd_O5chI_OfX0WzVz1cYxLQVQqZQWwd-dtWTq6PjRO4vDTliX2gGijGRG9p68wHDurwlM_Ynoa3Gr45bvjEt8KwcQndpuKXluEHS0NjqlJSkshlOnKOO',
        category: 'food',
        petType: 'cat',
        inStock: true,
    },
    {
        id: 'prod-005',
        name: 'Sachê Gourmet Salmão Premium',
        brand: 'Fancy Feast',
        price: 12.90,
        rating: 4.9,
        reviewCount: 2341,
        tags: ['Sachê', 'Gourmet', 'Salmão'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEeoOk8BagLEIQs2tKJLqNvJq0C7XGTAierUzlOFVqDA-EQiJopJV--dSKvQAZaZe4KyviTaiGlOsg9AM05IlOxCas2acnWg6r1L4RbLvZfqo-ulqN68CZKvZeBMmIvW9dOr2vb_eia9oiglovbccm8O9tA-_u7Y2TfIWnOvGskycWsIWxIumM2S1abXChEaIVIp2jdiIXajUPfnw40l3VkOtO0iLd6JNN4XuD4O-bePi27VKY_0YbgCbVjPP0ypEItq83hbOcTVGJ',
        category: 'food',
        petType: 'cat',
        premium: true,
        inStock: true,
    },
    // Toys
    {
        id: 'prod-006',
        name: 'Bola Kong Classic',
        brand: 'Kong',
        price: 79.90,
        rating: 4.8,
        reviewCount: 567,
        tags: ['Interativo', 'Resistente', 'Para Treats'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHf8mNse6RRDiFhFi8O-r2AX0fF_Sia-vEmkDUWkOHtYTEVGjn04bOLjOk7p5ZKo7gaJwPrmgOldbFfSgMObdihrDyb0AGjMVoxc5csUEQv6LyCfi5843a3ZmtBH9M-LDKvwXghnCFJ1I2T6zGr5vGO0FluCPxaXBmnyPdlq2d6TfJEuGz1ukVcB2YVKiEC9oj8-TlcEtbt0nJWLEs71kAZMzvymv1I3ez6z0a9E8Vsn85uPJSdAfqhJA9BbSsKEaLfBWj8yAK-lZA',
        category: 'toy',
        petType: 'dog',
        inStock: true,
    },
    {
        id: 'prod-007',
        name: 'Arranhador com Bolinha',
        brand: 'CatLife',
        price: 129.90,
        originalPrice: 159.90,
        rating: 4.6,
        reviewCount: 234,
        tags: ['Arranhador', 'Interativo'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYqaodse2MOVUmzTz73w6ntEu1vdleJeBbtaozJuHs_XfYh670ZmpRVWDzGQswTslxmB61vqhbjvSYkIFZD8eQ38X92pEQ_ql_xVWY2Sp0pLmLfY9fREb29_KvMNIQLL2tLnFrxdyjHdbwZCVVkaR66Erwrd_O5chI_OfX0WzVz1cYxLQVQqZQWwd-dtWTq6PjRO4vDTliX2gGijGRG9p68wHDurwlM_Ynoa3Gr45bvjEt8KwcQndpuKXluEHS0NjqlJSkshlOnKOO',
        category: 'toy',
        petType: 'cat',
        inStock: true,
    },
    // Accessories
    {
        id: 'prod-008',
        name: 'Coleira GPS Smart',
        brand: 'PetTrack',
        price: 299.90,
        rating: 4.7,
        reviewCount: 189,
        tags: ['GPS', 'Smart', 'Rastreador'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5n3qQRfTBx2PvsUgS4ObKBJnt_Ny7cTDsNzJDTpDEVp_pnYj2dySpOPcLoS34HrGAgGm2DhevJjFbo3Qr7CPvCG3ugGXn55-WqPFX7eF6_Li_Bll4zT0GmlxWslWIB28oXOtmvw2EI8pRvFN6bTbCrzHOoWZZZ6rCWdq6d6X-RLgwUBebaJa7qtmu03VJ4nFoRSYTOrVAqqPQdYT6yNoycG2wybMu0hPV_0FMB9g7EE2Ft4rJrW-5wSqfEVzg05NBCVnkZDtBAmsd',
        category: 'accessory',
        petType: 'all',
        premium: true,
        inStock: true,
    },
    {
        id: 'prod-009',
        name: 'Cama Ortopédica Premium',
        brand: 'PetComfort',
        price: 349.90,
        originalPrice: 449.90,
        rating: 4.9,
        reviewCount: 456,
        tags: ['Ortopédica', 'Memory Foam', 'Grande'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEeoOk8BagLEIQs2tKJLqNvJq0C7XGTAierUzlOFVqDA-EQiJopJV--dSKvQAZaZe4KyviTaiGlOsg9AM05IlOxCas2acnWg6r1L4RbLvZfqo-ulqN68CZKvZeBMmIvW9dOr2vb_eia9oiglovbccm8O9tA-_u7Y2TfIWnOvGskycWsIWxIumM2S1abXChEaIVIp2jdiIXajUPfnw40l3VkOtO0iLd6JNN4XuD4O-bePi27VKY_0YbgCbVjPP0ypEItq83hbOcTVGJ',
        category: 'accessory',
        petType: 'dog',
        premium: true,
        inStock: true,
    },
    // Hygiene
    {
        id: 'prod-010',
        name: 'Shampoo Neutro Hipoalergênico',
        brand: 'PetClean',
        price: 39.90,
        rating: 4.6,
        reviewCount: 789,
        tags: ['Hipoalergênico', 'Neutro', 'Pele Sensível'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHf8mNse6RRDiFhFi8O-r2AX0fF_Sia-vEmkDUWkOHtYTEVGjn04bOLjOk7p5ZKo7gaJwPrmgOldbFfSgMObdihrDyb0AGjMVoxc5csUEQv6LyCfi5843a3ZmtBH9M-LDKvwXghnCFJ1I2T6zGr5vGO0FluCPxaXBmnyPdlq2d6TfJEuGz1ukVcB2YVKiEC9oj8-TlcEtbt0nJWLEs71kAZMzvymv1I3ez6z0a9E8Vsn85uPJSdAfqhJA9BbSsKEaLfBWj8yAK-lZA',
        category: 'hygiene',
        petType: 'all',
        inStock: true,
    },
    {
        id: 'prod-011',
        name: 'Kit Escovação Dental',
        brand: 'DentaPet',
        price: 59.90,
        rating: 4.5,
        reviewCount: 321,
        tags: ['Dental', 'Kit Completo', 'Saúde Bucal'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB1tie9Tsp0z-0NfffPfw7lyP7hZ7fL_G89ZVnsIsdzYwWUb85Jh5ZV0A1jIl1Cj5xFYniyV4c1Zl1Um-YpAPZJmTWvlkZsfnV3_QOcTi3L6-8RkI0IkMiOuVxjnF8cQpwuXUSpg8-_kAUaGNmgN1d2QKz11LsaAz2s-EehguG0jLs7WKQafa2EoMgLrk3gpqBoe-wQAxmQwbinUzCSPMNWsihpT9AVfn0c9Eo8OZajGMMc5M8-rjyBKoYt4A8NjiZo68T1IV1o8fr',
        category: 'hygiene',
        petType: 'all',
        inStock: true,
    },
    // Medicine
    {
        id: 'prod-012',
        name: 'Antipulgas e Carrapatos',
        brand: 'Frontline',
        price: 89.90,
        rating: 4.8,
        reviewCount: 2156,
        tags: ['Antipulgas', 'Carrapatos', '3 meses'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyeDMZIL4P19X-EGMyIs_z1Mz2NA4HePqu6kLAJJqaoUWJUMT0v6Zn95b8-Nt0vGvAvnCG2RkXyUc8Q1rLsmW9FfP2G2PdgUat9puI1SPrzkPBuasDiYcfk0XeguiU1ErqAQLbeabYlxECB5TcASJzKt0dpylHOjGITvKIARO0pm8epda30zgIU4K6fe5aiuaBJiwcu-p53-yNincY3miN7YS58kkOC98e1lklPjKS5dvM6ZrVmjFjxoWTx0HUurYRXshdo6YtZyUk',
        category: 'medicine',
        petType: 'dog',
        inStock: true,
    },
];

// Filter helpers
export const getProductsByCategory = (category: Product['category']): Product[] =>
    products.filter(p => p.category === category);

export const getProductsByPetType = (petType: Product['petType']): Product[] =>
    products.filter(p => p.petType === petType || p.petType === 'all');

export const getPremiumProducts = (): Product[] =>
    products.filter(p => p.premium);

export const searchProducts = (query: string): Product[] =>
    products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
    );

export const getProductById = (id: string): Product | undefined =>
    products.find(p => p.id === id);
