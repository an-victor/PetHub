import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { pets, getDogs, getCats, adoptionPets, dailyTips, ongs, getActiveCampaigns } from '@/src/data';
import { GamificationWidget } from '@/src/components/gamification';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { setIsPetFormOpen } = useAppContext();

    const [currentAdoptionIndex, setCurrentAdoptionIndex] = useState(0);
    const [currentOngIndex, setCurrentOngIndex] = useState(0);
    const [currentTip, setCurrentTip] = useState(dailyTips[0]);

    // Rotate Adoption Pets every 5s
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAdoptionIndex((prev) => (prev + 1) % adoptionPets.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Rotate ONGs every 5s
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentOngIndex((prev) => (prev + 1) % ongs.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Random tip on mount
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * dailyTips.length);
        setCurrentTip(dailyTips[randomIndex]);
    }, []);

    const userDogs = getDogs();
    const userCats = getCats();
    const currentAdoptionPet = adoptionPets[currentAdoptionIndex];
    const currentOng = ongs[currentOngIndex];
    const activeCampaigns = getActiveCampaigns();
    const activeCampaign = activeCampaigns.length > 0 ? activeCampaigns[0] : null;

    // Handler for pet cards
    const handlePetCardClick = (type: 'dog' | 'cat') => {
        const hasPets = type === 'dog' ? userDogs.length > 0 : userCats.length > 0;
        if (hasPets) {
            navigate(`/my-pets/${type}s`);
        } else {
            setIsPetFormOpen(true);
        }
    };

    return (
        <div className="flex flex-col pb-32 min-h-screen bg-background transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pt-10 animate-slideUp stagger-1">
                <div className="flex flex-col gap-1">
                    <span className="text-text-secondary text-xs font-semibold uppercase tracking-widest">Bem-vinda de volta</span>
                    <h1 className="text-text-primary text-2xl font-bold transition-colors duration-300">Olá, Maria! 👋</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button className="relative flex size-11 items-center justify-center rounded-2xl bg-surface shadow-soft text-text-secondary hover:shadow-soft-md active:scale-95 transition-all duration-200 border border-border/50">
                        <span className="material-symbols-outlined text-xl">notifications</span>
                        <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-danger rounded-full border-2 border-surface animate-pulse"></span>
                    </button>
                    <div
                        className="w-12 h-12 rounded-2xl bg-cover bg-center shadow-soft border-2 border-surface hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD92u6__KXrIa8H6BpnLvP3Lf-pQWB8AvIYaKaQaQHsRyG8WL8E8_fBXSwX82FHy9CJkOX5SzE2wxW4302Zu2lhgABfInMDeRwK4KXnqkcCpXmeKUuef5XFIFIlaRT8K75t6658Fe6DWuliERvUTCZF0nHHRnI3bUwnbANykK_iTVFp2ih-Y1gTkOFcbHPlxxCVBweHmncfIVqn04HHByOeWh25_brWLxVCSBMH9-QBEFe64wX3263MOoJwhYxgYWLpPUuKYrnN5Atd")' }}
                        onClick={() => navigate('/profile')}
                    ></div>
                </div>
            </div>

            {/* Hero Title */}
            <div className="px-6 pb-6 animate-slideUp stagger-2">
                <h2 className="text-[2.5rem] leading-[1.1] font-bold text-text-primary tracking-tight">
                    Seu pet está<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">bem hoje?</span>
                </h2>
            </div>

            {/* Dica do Dia ou Campanha */}
            <div className="px-6 pb-8 animate-slideUp stagger-3">
                {activeCampaign ? (
                    <div
                        onClick={() => navigate('/vaccines')}
                        className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-[24px] p-5 shadow-glow-sm relative overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-200"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <span className="material-symbols-outlined text-[80px] text-white">campaign</span>
                        </div>
                        <div className="relative z-10 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm animate-pulse">new_releases</span>
                                    Campanha Nacional
                                </span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">{activeCampaign.title}</h3>
                            <p className="text-white/90 text-sm font-medium mb-3 line-clamp-2">
                                {activeCampaign.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="text-xs font-semibold bg-black/20 px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                                    Até {new Date(activeCampaign.endDate).toLocaleDateString('pt-BR')}
                                </div>
                                <div className="bg-white text-rose-600 rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`p-5 rounded-[24px] flex items-start gap-4 shadow-soft border border-transparent ${currentTip.color.split(' ')[0]} bg-opacity-50 backdrop-blur-sm`}>
                        <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0 ${currentTip.color.split(' ')[1]}`}>
                            <span className="material-symbols-outlined text-2xl">{currentTip.icon}</span>
                        </div>
                        <div className="flex-1 pt-0.5">
                            <div className="flex items-center justify-between mb-1">
                                <h4 className={`font-bold text-sm uppercase tracking-wide ${currentTip.color.split(' ')[1]}`}>Dica do Dia</h4>
                                <span className="material-symbols-outlined text-sm opacity-50">lightbulb</span>
                            </div>
                            <p className="text-text-primary font-medium text-sm leading-relaxed">{currentTip.title}: {currentTip.description}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Meus Pets Section */}
            <div className="px-6 pb-8 animate-slideUp stagger-4">
                <h3 className="text-text-primary text-lg font-bold mb-4">Meus Pets</h3>
                <div className="flex gap-4">
                    {/* Card Cães */}
                    <div
                        onClick={() => handlePetCardClick('dog')}
                        className="flex-[1.8] bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-[28px] p-5 flex flex-col justify-between min-h-[140px] cursor-pointer shadow-soft hover:shadow-soft-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 border border-orange-200/50 dark:border-orange-700/30 group relative overflow-hidden"
                    >
                        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-orange-200/50 dark:bg-orange-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                        <div className="w-14 h-14 bg-white dark:bg-orange-950/50 rounded-2xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-3xl">🐕</span>
                        </div>
                        <div className="relative z-10">
                            <span className="text-text-primary text-xl font-bold block mb-1">Cães</span>
                            {userDogs.length > 0 ? (
                                <span className="text-text-secondary text-xs font-medium">{userDogs.length} cadastrado{userDogs.length > 1 ? 's' : ''}</span>
                            ) : (
                                <span className="bg-white/80 dark:bg-black/20 text-orange-600 dark:text-orange-400 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 w-fit mt-1">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                    Cadastrar
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Card Gatos */}
                    <div
                        onClick={() => handlePetCardClick('cat')}
                        className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-[28px] p-5 flex flex-col justify-between min-h-[140px] cursor-pointer shadow-soft hover:shadow-soft-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 border border-blue-200/50 dark:border-blue-700/30 group relative overflow-hidden"
                    >
                        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-200/50 dark:bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                        <div className="w-12 h-12 bg-white dark:bg-blue-950/50 rounded-2xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-2xl">🐈</span>
                        </div>
                        <div className="relative z-10">
                            <span className="text-text-primary text-lg font-bold block mb-1">Gatos</span>
                            <span className="text-text-secondary text-xs font-medium block">
                                {userCats.length > 0 ? `${userCats.length} cadastrado${userCats.length > 1 ? 's' : ''}` : 'Cadastrar'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gamificação Widget */}
            <div className="px-6 pb-8 animate-slideUp stagger-5">
                <GamificationWidget variant="full" />
            </div>

            {/* Carrossel de Adoção */}
            <div className="px-6 pb-8 animate-slideUp stagger-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-text-primary text-lg font-bold">Adoção</h3>
                    <button
                        onClick={() => navigate('/adoption')}
                        className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all duration-200 bg-primary/5 px-3 py-1.5 rounded-xl hover:bg-primary/10"
                    >
                        Ver todos
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>

                <div
                    onClick={() => navigate('/adoption')}
                    className="relative h-64 rounded-[32px] overflow-hidden shadow-lg cursor-pointer hover:shadow-xl active:scale-[0.99] transition-all duration-300 group"
                >
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 h-1 bg-white/30 w-full z-20">
                        <div
                            key={currentAdoptionIndex}
                            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-progress"
                            style={{ animationDuration: '5000ms' }}
                        ></div>
                    </div>

                    <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url("${currentAdoptionPet.image}")` }}
                    ></div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">pets</span>
                            Adoção
                        </span>
                        {currentAdoptionPet.urgent && (
                            <span className="bg-danger text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg animate-pulse">
                                Urgente
                            </span>
                        )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex justify-between items-end">
                            <div>
                                <h4 className="text-2xl font-bold mb-1">{currentAdoptionPet.name}</h4>
                                <p className="text-white/90 font-medium text-sm mb-2">{currentAdoptionPet.breed}</p>
                                <div className="flex items-center gap-1 text-white/70 text-xs">
                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                    {currentAdoptionPet.city}, {currentAdoptionPet.stateCode}
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined">favorite</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carrossel de ONGs */}
            <div className="px-6 pb-8 animate-slideUp stagger-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-text-primary text-lg font-bold flex items-center gap-2">
                        <span className="text-rose-500 material-symbols-outlined">volunteer_activism</span>
                        Ajude uma ONG
                    </h3>
                    <button
                        onClick={() => navigate('/donation')}
                        className="text-text-secondary text-sm font-semibold hover:text-primary transition-colors"
                    >
                        Ver todas
                    </button>
                </div>

                <div
                    onClick={() => navigate('/donation')}
                    className="bg-surface rounded-[24px] p-5 shadow-soft border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                >
                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 h-1 bg-rose-100 dark:bg-rose-900/30 w-full">
                        <div
                            key={currentOngIndex}
                            className="h-full bg-rose-500 animate-progress"
                            style={{ animationDuration: '5000ms' }}
                        ></div>
                    </div>

                    <div className="flex gap-5 items-center relative z-10">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                            <img
                                src={currentOng.image}
                                alt={currentOng.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-text-primary text-lg truncate mb-1">{currentOng.name}</h4>
                            <p className="text-text-secondary text-sm line-clamp-2 mb-2">{currentOng.cause}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-rose-500 text-xs font-bold bg-rose-50 dark:bg-rose-900/20 px-2.5 py-1 rounded-lg">
                                    Precisa de doações
                                </span>
                                <span className="text-text-muted text-xs">• Toque para ajudar</span>
                            </div>
                        </div>
                        <div className="self-center">
                            <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">chevron_right</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid de Serviços */}
            <div className="px-6 pb-6 animate-slideUp stagger-7">
                <h3 className="text-text-primary text-lg font-bold mb-5">Acesso Rápido</h3>
                <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                    {[
                        { name: 'Veterinário', icon: 'medical_services', path: '/vets', color: 'from-emerald-400 to-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400' },
                        { name: 'Loja', icon: 'shopping_bag', path: '/nutrition', color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400' },
                        { name: 'Treino', icon: 'school', path: '/training', color: 'from-sky-400 to-blue-500', bg: 'bg-sky-50 dark:bg-sky-900/20', text: 'text-sky-600 dark:text-sky-400' },
                        { name: 'Banho', icon: 'content_cut', path: '/bath', color: 'from-pink-400 to-rose-500', bg: 'bg-pink-50 dark:bg-pink-900/20', text: 'text-pink-600 dark:text-pink-400' },
                        { name: 'Vacinas', icon: 'vaccines', path: '/vaccines', color: 'from-purple-400 to-indigo-500', bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400' },
                        { name: 'Adoção', icon: 'favorite', path: '/adoption', color: 'from-rose-400 to-pink-500', bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-600 dark:text-rose-400' },
                        { name: 'Doação', icon: 'volunteer_activism', path: '/donation', color: 'from-red-400 to-rose-600', bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400' },
                        { name: 'Raças', icon: 'menu_book', path: '/encyclopedia', color: 'from-teal-400 to-cyan-600', bg: 'bg-teal-50 dark:bg-teal-900/20', text: 'text-teal-600 dark:text-teal-400' },
                    ].map((service, index) => (
                        <button
                            key={service.name}
                            onClick={() => navigate(service.path)}
                            className="flex flex-col items-center gap-2 group"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className={`relative w-[60px] h-[60px] rounded-[20px] ${service.bg} flex items-center justify-center transition-all duration-300 group-hover:scale-95 group-active:scale-90 shadow-sm group-hover:shadow-md overflow-hidden`}>
                                <span className={`material-symbols-outlined text-2xl ${service.text} transition-colors duration-300`}>
                                    {service.icon}
                                </span>
                            </div>
                            <span className="text-text-secondary text-[11px] font-semibold text-center leading-tight tracking-wide group-hover:text-text-primary transition-colors duration-200">
                                {service.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
