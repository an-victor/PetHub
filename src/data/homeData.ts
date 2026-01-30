// Mock data for Home Screen components

export interface DailyTip {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
}

export interface ONG {
    id: string;
    name: string;
    cause: string;
    image: string;
    urgent?: boolean;
}

export const dailyTips: DailyTip[] = [
    {
        id: '1',
        title: 'Hidratação é vital!',
        description: 'Em dias quentes, espalhe bebedouros pela casa.',
        icon: 'water_drop',
        color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
    },
    {
        id: '2',
        title: 'Passeios Seguros',
        description: 'Evite o sol forte entre 10h e 16h.',
        icon: 'sunny',
        color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
    },
    {
        id: '3',
        title: 'Vacinação em dia',
        description: 'Confira a carteirinha do seu pet regularmente.',
        icon: 'vaccines',
        color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
    }
];

export const ongs: ONG[] = [
    {
        id: '1',
        name: 'Abrigo Patas Felizes',
        cause: 'Resgate de cães idosos',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHf8mNse6RRDiFhFi8O-r2AX0fF_Sia-vEmkDUWkOHtYTEVGjn04bOLjOk7p5ZKo7gaJwPrmgOldbFfSgMObdihrDyb0AGjMVoxc5csUEQv6LyCfi5843a3ZmtBH9M-LDKvwXghnCFJ1I2T6zGr5vGO0FluCPxaXBmnyPdlq2d6TfJEuGz1ukVcB2YVKiEC9oj8-TlcEtbt0nJWLEs71kAZMzvymv1I3ez6z0a9E8Vsn85uPJSdAfqhJA9BbSsKEaLfBWj8yAK-lZA',
        urgent: true
    },
    {
        id: '2',
        name: 'Gatinhos da Vila',
        cause: 'Castração e lar temporário',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYqaodse2MOVUmzTz73w6ntEu1vdleJeBbtaozJuHs_XfYh670ZmpRVWDzGQswTslxmB61vqhbjvSYkIFZD8eQ38X92pEQ_ql_xVWY2Sp0pLmLfY9fREb29_KvMNIQLL2tLnFrxdyjHdbwZCVVkaR66Erwrd_O5chI_OfX0WzVz1cYxLQVQqZQWwd-dtWTq6PjRO4vDTliX2gGijGRG9p68wHDurwlM_Ynoa3Gr45bvjEt8KwcQndpuKXluEHS0NjqlJSkshlOnKOO'
    },
    {
        id: '3',
        name: 'Amigo Fiel',
        cause: 'Reabilitação de animais feridos',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEeoOk8BagLEIQs2tKJLqNvJq0C7XGTAierUzlOFVqDA-EQiJopJV--dSKvQAZaZe4KyviTaiGlOsg9AM05IlOxCas2acnWg6r1L4RbLvZfqo-ulqN68CZKvZeBMmIvW9dOr2vb_eia9oiglovbccm8O9tA-_u7Y2TfIWnOvGskycWsIWxIumM2S1abXChEaIVIp2jdiIXajUPfnw40l3VkOtO0iLd6JNN4XuD4O-bePi27VKY_0YbgCbVjPP0ypEItq83hbOcTVGJ',
        urgent: true
    }
];
