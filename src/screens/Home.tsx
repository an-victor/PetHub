import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { adoptionPets, dailyTips, ongs, getActiveCampaigns } from '@/src/data';
import { OfflineService } from '@/src/services/offlineStorage';
import { GamificationWidget } from '@/src/components/gamification';
import { Pet } from '@/src/types';
import { useUser } from '@clerk/clerk-react';
import { detectLocation, getSavedLocation, saveLocation, UserLocation } from '@/src/services/location';
import { toast } from 'sonner';

const Home: React.FC = () => {

    const navigate = useNavigate();
    const { setIsPetFormOpen, isPetFormOpen } = useAppContext();
    const { user } = useUser();

    const [currentAdoptionIndex, setCurrentAdoptionIndex] = useState(0);
    const [currentOngIndex, setCurrentOngIndex] = useState(0);

    const [mood, setMood] = useState<string | null>(null);
    const [currentTip, setCurrentTip] = useState(dailyTips[0]);

    // Location State
    const [userLocation, setUserLocation] = useState<UserLocation>(getSavedLocation());

    const initLocation = async () => {
        toast.info("📍 Obtendo sua localização...");
        try {
            const loc = await detectLocation();
            setUserLocation(loc);
            saveLocation(loc);
            toast.success(`📍 Localização atualizada: ${loc.city}`);
        } catch (e) {
            toast.error("Não foi possível obter sua localização. Verifique as permissões do navegador.");
        }
    };

    // Auto-detect on first load if default
    useEffect(() => {
        if (userLocation.city === 'Curitiba' && userLocation.state === 'Paraná') { // Default check
            // Optionally auto-trigger, but let's leave it to user click or explicit permission first to be polite
            // initLocation(); 
        }
    }, []);

    // Dynamic Pets State
    const [userDogs, setUserDogs] = useState<Pet[]>([]);
    const [userCats, setUserCats] = useState<Pet[]>([]);

    useEffect(() => {
        const allPets = OfflineService.getPets();
        setUserDogs(allPets.filter(p => p.type === 'dog'));
        setUserCats(allPets.filter(p => p.type === 'cat'));
    }, [isPetFormOpen]); // Refresh when form state changes (closing it triggers refresh)

    // Search & Filters State
    const [searchText, setSearchText] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Smart Search Logic
    const handleSearch = () => {
        if (!searchText.trim()) return;
        const term = searchText.toLowerCase();

        if (term.includes('vet') || term.includes('clín') || term.includes('hospi') || term.includes('dout')) {
            navigate('/vets');
        } else if (term.includes('vac') || term.includes('imun')) {
            navigate('/vaccines');
        } else if (term.includes('banh') || term.includes('tos') || term.includes('estét')) {
            navigate('/bath');
        } else if (term.includes('comid') || term.includes('raç') || term.includes('petisc')) {
            navigate('/nutrition');
        } else if (term.includes('adoç') || term.includes('ong') || term.includes('amigo')) {
            navigate('/adoption');
        } else {
            // Default to Encyclopedia for content search
            navigate(`/encyclopedia`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

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

    // Random tip
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * dailyTips.length);
        setCurrentTip(dailyTips[randomIndex]);
    }, []);

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
        <div className="flex flex-col min-h-screen bg-[#FFF8F0] pb-32 font-sans transition-colors">
            {/* Playful Header with Curved Shape */}
            {/* Playful Header with Curved Shape (Brand Gradient) */}
            <div className="relative bg-gradient-to-br from-primary via-orange-500 to-rose-500 pt-12 pb-16 px-6 rounded-b-[3rem] shadow-soft-lg z-10 transition-colors duration-500">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold mb-2 animate-bounce cursor-pointer flex items-center gap-1" onClick={() => initLocation()}>
                            <span className="material-symbols-outlined text-xs">near_me</span> {userLocation.city}, {userLocation.stateCode}
                        </div>
                        <h1 className="text-3xl font-extrabold text-white leading-tight">
                            Hora de cuidar <br /> dos <span className="text-[#FFE8C2]">seus pets</span>!
                        </h1>
                    </div>
                    <div
                        className="w-14 h-14 bg-white p-1 rounded-full shadow-lg rotate-3 hover:rotate-6 transition-transform cursor-pointer"
                        onClick={() => navigate('/profile')}
                    >
                        <img
                            src={user?.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuD92u6__KXrIa8H6BpnLvP3Lf-pQWB8AvIYaKaQaQHsRyG8WL8E8_fBXSwX82FHy9CJkOX5SzE2wxW4302Zu2lhgABfInMDeRwK4KXnqkcCpXmeKUuef5XFIFIlaRT8K75t6658Fe6DWuliERvUTCZF0nHHRnI3bUwnbANykK_iTVFp2ih-Y1gTkOFcbHPlxxCVBweHmncfIVqn04HHByOeWh25_brWLxVCSBMH9-QBEFe64wX3263MOoJwhYxgYWLpPUuKYrnN5Atd"}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>

                <div className="absolute -bottom-6 left-6 right-6">
                    <div className="bg-white rounded-2xl shadow-soft-lg p-3 flex items-center gap-3 animate-slideUp">
                        <span className="material-symbols-outlined text-primary ml-2">search</span>
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Buscar em ${userLocation.city}...`}
                            className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted text-sm"
                        />
                        <button
                            onClick={() => setShowFilters(true)}
                            className="bg-primary w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-glow hover:scale-105 active:scale-95 transition-all"
                        >
                            <span className="material-symbols-outlined text-lg">tune</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter Modal */}
            {showFilters && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-surface w-full max-w-[480px] sm:rounded-3xl rounded-t-3xl p-6 animate-slideUp">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-text-primary">Filtros de Busca</h3>
                            <button onClick={() => setShowFilters(false)} className="bg-surface-elevated p-2 rounded-full hover:bg-border/50 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Filter Section: Order By */}
                            <div>
                                <h4 className="text-sm font-bold text-text-secondary mb-3 uppercase tracking-wide">Ordenar por</h4>
                                <div className="flex gap-2 flex-wrap">
                                    {['Mais relevantes', 'Próximos', 'Melhor avaliados', 'Preço: Menor'].map((filter) => (
                                        <button key={filter} className="px-4 py-2 rounded-xl bg-background border border-border text-xs font-semibold text-text-secondary hover:border-primary hover:text-primary active:bg-primary/5 transition-all">
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Filter Section: Categories */}
                            <div>
                                <h4 className="text-sm font-bold text-text-secondary mb-3 uppercase tracking-wide">Categorias</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Veterinários 24h', 'Pet Friendly', 'Delivery', 'Promoções'].map((cat) => (
                                        <label key={cat} className="flex items-center gap-3 p-3 bg-background rounded-xl cursor-pointer hover:bg-surface border border-transparent hover:border-border transition-all">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                                            <span className="text-sm font-medium text-text-primary">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => {
                                    setShowFilters(false);
                                    handleSearch();
                                }}
                                className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-glow hover:shadow-glow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">search</span>
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content - Padded top for search bar */}
            <div className="px-6 mt-12 animate-fadeIn stagger-1 space-y-8">

                {/* Gamification Widget */}
                <div>
                    <GamificationWidget variant="compact" className="bg-white/90 border-none shadow-soft" />
                </div>

                {/* Dica do Dia ou Campanha */}
                <div>
                    {activeCampaign ? (
                        <div
                            onClick={() => navigate('/vaccines')}
                            className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-[2rem] p-5 shadow-glow-sm relative overflow-hidden cursor-pointer active:scale-[0.98] transition-all"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <span className="material-symbols-outlined text-[80px] text-white">campaign</span>
                            </div>
                            <div className="relative z-10 text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs animate-pulse">new_releases</span>
                                        Campanha Ativa
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg mb-1">{activeCampaign.title}</h3>
                                <div className="flex items-center justify-between mt-3">
                                    <div className="text-[10px] font-semibold bg-black/20 px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-xs">calendar_month</span>
                                        Até {new Date(activeCampaign.endDate).toLocaleDateString('pt-BR')}
                                    </div>
                                    <div className="bg-white text-rose-600 rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={`p-5 rounded-[2rem] flex items-start gap-4 shadow-soft bg-white border border-transparent`}>
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm shrink-0 ${currentTip.color.split(' ')[1].replace('bg-', 'bg-').replace('text-', 'text-')}`}>
                                <span className="material-symbols-outlined text-2xl">{currentTip.icon}</span>
                            </div>
                            <div className="flex-1 pt-1">
                                <h4 className="font-bold text-sm text-text-primary mb-1 flex items-center gap-2">
                                    Dica do Dia
                                    <span className="material-symbols-outlined text-xs text-yellow-500">lightbulb</span>
                                </h4>
                                <p className="text-text-secondary text-xs leading-relaxed">{currentTip.description}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mood Tracker (Fun/Ludic) */}
                <div>
                    <h3 className="text-text-primary font-bold text-sm mb-3 ml-1 flex items-center gap-2">
                        <span className="text-xl">✨</span> Como seus pets estão hoje?
                    </h3>
                    <div className="flex justify-between bg-white p-4 rounded-3xl shadow-soft">
                        {[
                            { emoji: '😴', label: 'Preguiça' },
                            { emoji: '😋', label: 'Faminto' },
                            { emoji: '⚡', label: 'Energia' },
                            { emoji: '🥰', label: 'Carinho' },
                        ].map((m, idx) => (
                            <button
                                key={idx}
                                onClick={() => setMood(m.label)}
                                className={`flex flex-col items-center gap-1 group transition-all ${mood === m.label ? 'scale-110' : ''}`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all cursor-pointer shadow-sm ${mood === m.label ? 'bg-[#FFAD60] shadow-glow' : 'bg-[#FFF8F0] group-hover:bg-[#FFAD60]'}`}>
                                    {m.emoji}
                                </div>
                                <span className={`text-[10px] font-bold ${mood === m.label ? 'text-[#FFAD60]' : 'text-text-secondary group-hover:text-[#FFAD60]'}`}>{m.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Categories - Bubbles Style (Acesso Rápido) */}
                <div>
                    <h3 className="text-text-primary font-bold text-sm mb-3 ml-1">Explorar</h3>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                        {[
                            { name: 'Vets', icon: 'medical_services', path: '/vets', bg: 'bg-emerald-100', text: 'text-emerald-500' },
                            { name: 'Loja', icon: 'shopping_bag', path: '/nutrition', bg: 'bg-amber-100', text: 'text-amber-500' },
                            { name: 'Banho', icon: 'shower', path: '/bath', bg: 'bg-blue-100', text: 'text-blue-500' },
                            { name: 'Vacina', icon: 'vaccines', path: '/vaccines', bg: 'bg-purple-100', text: 'text-purple-500' },
                            { name: 'Treino', icon: 'pets', path: '/training', bg: 'bg-orange-100', text: 'text-orange-500' },
                            { name: 'Adoção', icon: 'volunteer_activism', path: '/adoption', bg: 'bg-rose-100', text: 'text-rose-500' },
                        ].map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => navigate(cat.path)}
                                className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer group"
                            >
                                <div className={`w-16 h-16 rounded-full ${cat.bg} flex items-center justify-center shadow-soft group-hover:rotate-12 transition-transform`}>
                                    <span className={`material-symbols-outlined text-2xl ${cat.text}`}>{cat.icon}</span>
                                </div>
                                <span className="text-xs font-bold text-text-secondary">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Meus Pets Section (Ludic List) */}
                <div>
                    <div className="flex justify-between items-center mb-3 ml-1">
                        <h3 className="text-text-primary font-bold text-sm">Meus Pets</h3>
                        <button onClick={() => navigate('/pets')} className="text-[#FFAD60] text-xs font-bold">Ver todos</button>
                    </div>

                    <div className="flex flex-col gap-3">
                        {/* Dynamic Dog Card */}
                        <div className="bg-white p-3 rounded-2xl shadow-soft flex items-center gap-3 border-l-4 border-orange-400 cursor-pointer hover:shadow-md transition-all" onClick={() => handlePetCardClick('dog')}>
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">🐕</div>
                            <div className="flex-1">
                                <h4 className="font-bold text-text-primary text-sm">Cães</h4>
                                <p className="text-text-muted text-xs">
                                    {userDogs.length > 0 ? `${userDogs.length} amigos` : 'Toque para cadastrar'}
                                </p>
                            </div>
                            <button className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                                <span className="material-symbols-outlined text-lg">chevron_right</span>
                            </button>
                        </div>

                        {/* Dynamic Cat Card */}
                        <div className="bg-white p-3 rounded-2xl shadow-soft flex items-center gap-3 border-l-4 border-blue-400 cursor-pointer hover:shadow-md transition-all" onClick={() => handlePetCardClick('cat')}>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">🐈</div>
                            <div className="flex-1">
                                <h4 className="font-bold text-text-primary text-sm">Gatos</h4>
                                <p className="text-text-muted text-xs">
                                    {userCats.length > 0 ? `${userCats.length} amigos` : 'Toque para cadastrar'}
                                </p>
                            </div>
                            <button className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                <span className="material-symbols-outlined text-lg">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Featured Card (Adoption) */}
                <div
                    onClick={() => navigate('/adoption')}
                    className="bg-gradient-to-r from-[#FF9966] to-[#FF5E62] rounded-3xl p-6 text-white shadow-glow relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                >
                    <div className="relative z-10 w-2/3">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wide">Destaque</span>
                        </div>
                        <h3 className="text-xl font-bold mb-1">{currentAdoptionPet.name} para Adoção</h3>
                        <p className="text-white/90 text-xs mb-4 line-clamp-1">{currentAdoptionPet.breed} • {currentAdoptionPet.city}</p>
                        <button className="bg-white text-[#FF5E62] px-4 py-2 rounded-full text-xs font-bold hover:bg-[#FFF8F0]">
                            Conhecer
                        </button>
                    </div>
                    {/* Decorative Image/Emoji */}
                    <div
                        className="absolute -right-4 -bottom-4 w-32 h-32 bg-cover bg-center rounded-tl-[40px] border-4 border-white/20"
                        style={{ backgroundImage: `url("${currentAdoptionPet.image}")` }}
                    ></div>
                </div>

                {/* ONG Support */}
                <div
                    onClick={() => navigate('/donation')}
                    className="bg-white rounded-3xl p-5 shadow-soft hover:shadow-lg transition-all cursor-pointer relative overflow-hidden border border-rose-100"
                >
                    <div className="flex gap-4 items-center relative z-10">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                            <img
                                src={currentOng.image}
                                alt={currentOng.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-text-primary text-sm truncate">{currentOng.name}</h4>
                            <p className="text-rose-500 font-bold text-xs mt-1">Precisa de ajuda ❤️</p>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                            <span className="material-symbols-outlined">volunteer_activism</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
