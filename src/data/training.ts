// PetHub - Mock Data: Training Courses
import type { TrainingCourse } from '../types';

export const trainingCourses: TrainingCourse[] = [
    {
        id: 'course-001',
        title: 'Comandos Básicos de Obediência',
        description: 'Aprenda a ensinar seu cão a sentar, deitar, ficar e vir quando chamado.',
        duration: '4 semanas',
        level: 'beginner',
        category: 'obedience',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB1tie9Tsp0z-0NfffPfw7lyP7hZ7fL_G89ZVnsIsdzYwWUb85Jh5ZV0A1jIl1Cj5xFYniyV4c1Zl1Um-YpAPZJmTWvlkZsfnV3_QOcTi3L6-8RkI0IkMiOuVxjnF8cQpwuXUSpg8-_kAUaGNmgN1d2QKz11LsaAz2s-EehguG0jLs7WKQafa2EoMgLrk3gpqBoe-wQAxmQwbinUzCSPMNWsihpT9AVfn0c9Eo8OZajGMMc5M8-rjyBKoYt4A8NjiZo68T1IV1o8fr',
        instructor: 'Carlos Trainer',
        rating: 4.9,
        free: true,
        lessons: 12,
    },
    {
        id: 'course-002',
        title: 'Truques Divertidos',
        description: 'Ensine truques impressionantes como dar a pata, rolar e fingir de morto.',
        duration: '3 semanas',
        level: 'intermediate',
        category: 'tricks',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyeDMZIL4P19X-EGMyIs_z1Mz2NA4HePqu6kLAJJqaoUWJUMT0v6Zn95b8-Nt0vGvAvnCG2RkXyUc8Q1rLsmW9FfP2G2PdgUat9puI1SPrzkPBuasDiYcfk0XeguiU1ErqAQLbeabYlxECB5TcASJzKt0dpylHOjGITvKIARO0pm8epda30zgIU4K6fe5aiuaBJiwcu-p53-yNincY3miN7YS58kkOC98e1lklPjKS5dvM6ZrVmjFjxoWTx0HUurYRXshdo6YtZyUk',
        instructor: 'Ana Pet Trainer',
        rating: 4.7,
        price: 49.90,
        free: false,
        lessons: 8,
    },
    {
        id: 'course-003',
        title: 'Correção de Comportamento',
        description: 'Técnicas para corrigir latidos excessivos, pular em pessoas e destruição.',
        duration: '6 semanas',
        level: 'advanced',
        category: 'behavior',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5n3qQRfTBx2PvsUgS4ObKBJnt_Ny7cTDsNzJDTpDEVp_pnYj2dySpOPcLoS34HrGAgGm2DhevJjFbo3Qr7CPvCG3ugGXn55-WqPFX7eF6_Li_Bll4zT0GmlxWslWIB28oXOtmvw2EI8pRvFN6bTbCrzHOoWZZZ6rCWdq6d6X-RLgwUBebaJa7qtmu03VJ4nFoRSYTOrVAqqPQdYT6yNoycG2wybMu0hPV_0FMB9g7EE2Ft4rJrW-5wSqfEVzg05NBCVnkZDtBAmsd',
        instructor: 'Dr. Pet Behavior',
        rating: 4.8,
        price: 89.90,
        free: false,
        lessons: 18,
    },
    {
        id: 'course-004',
        title: 'Agility para Iniciantes',
        description: 'Introdução ao agility: obstáculos, túneis e saltos.',
        duration: '5 semanas',
        level: 'beginner',
        category: 'agility',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHf8mNse6RRDiFhFi8O-r2AX0fF_Sia-vEmkDUWkOHtYTEVGjn04bOLjOk7p5ZKo7gaJwPrmgOldbFfSgMObdihrDyb0AGjMVoxc5csUEQv6LyCfi5843a3ZmtBH9M-LDKvwXghnCFJ1I2T6zGr5vGO0FluCPxaXBmnyPdlq2d6TfJEuGz1ukVcB2YVKiEC9oj8-TlcEtbt0nJWLEs71kAZMzvymv1I3ez6z0a9E8Vsn85uPJSdAfqhJA9BbSsKEaLfBWj8yAK-lZA',
        instructor: 'Pedro Agility',
        rating: 4.6,
        free: true,
        lessons: 15,
    },
];

export const getCourseById = (id: string) => trainingCourses.find(c => c.id === id);
export const getCoursesByLevel = (level: TrainingCourse['level']) => trainingCourses.filter(c => c.level === level);
export const getCoursesByCategory = (cat: TrainingCourse['category']) => trainingCourses.filter(c => c.category === cat);
export const getFreeCourses = () => trainingCourses.filter(c => c.free);
