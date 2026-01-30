import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeTest3: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-[#FFF8F0] pb-28 font-sans transition-colors">
            {/* Playful Header with Curved Shape */}
            <div className="relative bg-[#FFAD60] pt-12 pb-16 px-6 rounded-b-[3rem] shadow-soft-lg z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold mb-2 animate-bounce">
                            👋 Olá, Aumigo!
                        </div>
                        <h1 className="text-3xl font-extrabold text-white leading-tight">
                            Hora de cuidar <br /> do <span className="text-[#FFE8C2]">Thor</span>!
                        </h1>
                    </div>
                    <div className="w-14 h-14 bg-white p-1 rounded-full shadow-lg rotate-3 hover:rotate-6 transition-transform">
                        <img
                            src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                            alt="Thor"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>

                {/* Search Bar - Floating */}
                <div className="absolute -bottom-6 left-6 right-6">
                    <div className="bg-white rounded-2xl shadow-soft-lg p-3 flex items-center gap-3 animate-slideUp">
                        <span className="material-symbols-outlined text-[#FFAD60] ml-2">search</span>
                        <input
                            type="text"
                            placeholder="Buscar vacinas, vets..."
                            className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted text-sm"
                        />
                        <button className="bg-[#FFAD60] w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-glow hover:scale-105 active:scale-95 transition-all">
                            <span className="material-symbols-outlined text-lg">tune</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content - Padded top for search bar */}
            <div className="px-6 mt-12 animate-fadeIn stagger-1">

                {/* Mood Tracker (Fun/Ludic) */}
                <div className="mb-8">
                    <h3 className="text-text-primary font-bold text-sm mb-3 ml-1 flex items-center gap-2">
                        <span className="text-xl">✨</span> Como o Thor está hoje?
                    </h3>
                    <div className="flex justify-between bg-white p-4 rounded-3xl shadow-soft">
                        {[
                            { emoji: '😴', label: 'Preguiça' },
                            { emoji: '😋', label: 'Faminto' },
                            { emoji: '⚡', label: 'Energia' },
                            { emoji: '🥰', label: 'Carinho' },
                        ].map((mood, idx) => (
                            <button key={idx} className="flex flex-col items-center gap-1 group">
                                <div className="w-12 h-12 bg-[#FFF8F0] rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-[#FFAD60] transition-all cursor-pointer shadow-sm">
                                    {mood.emoji}
                                </div>
                                <span className="text-[10px] font-bold text-text-secondary group-hover:text-[#FFAD60]">{mood.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Categories - Bubbles Style */}
                <div className="mb-8">
                    <h3 className="text-text-primary font-bold text-sm mb-3 ml-1">Explorar</h3>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                        {[
                            { name: 'Banho', icon: 'shower', bg: 'bg-blue-100', text: 'text-blue-500' },
                            { name: 'Vacina', icon: 'vaccines', bg: 'bg-green-100', text: 'text-green-500' },
                            { name: 'Hotel', icon: 'hotel', bg: 'bg-purple-100', text: 'text-purple-500' },
                            { name: 'Treino', icon: 'pets', bg: 'bg-orange-100', text: 'text-orange-500' },
                        ].map((cat, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer group">
                                <div className={`w-16 h-16 rounded-full ${cat.bg} flex items-center justify-center shadow-soft group-hover:rotate-12 transition-transform`}>
                                    <span className={`material-symbols-outlined text-2xl ${cat.text}`}>{cat.icon}</span>
                                </div>
                                <span className="text-xs font-bold text-text-secondary">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured Card (Ludic) */}
                <div className="bg-gradient-to-r from-[#FF9966] to-[#FF5E62] rounded-3xl p-6 text-white shadow-glow relative overflow-hidden mb-8 hover:scale-[1.02] transition-transform cursor-pointer">
                    <div className="relative z-10 w-2/3">
                        <h3 className="text-xl font-bold mb-1">Clube de Vantagens</h3>
                        <p className="text-white/90 text-xs mb-4">Ganhe desconto em rações e brinquedos!</p>
                        <button className="bg-white text-[#FF5E62] px-4 py-2 rounded-full text-xs font-bold hover:bg-[#FFF8F0]">
                            Ver ofertas
                        </button>
                    </div>
                    {/* Decorative Image/Emoji */}
                    <div className="absolute -right-4 -bottom-4 text-8xl rotate-12 opacity-90 grayscale-0">
                        🎁
                    </div>
                </div>

                {/* "My Pets" Floating List */}
                <div>
                    <h3 className="text-text-primary font-bold text-sm mb-3 ml-1">Meus Pets</h3>
                    <div className="flex flex-col gap-3">
                        <div className="bg-white p-3 rounded-2xl shadow-soft flex items-center gap-3 border-l-4 border-green-400">
                            <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="w-12 h-12 rounded-xl object-cover" />
                            <div className="flex-1">
                                <h4 className="font-bold text-text-primary text-sm">Thor</h4>
                                <p className="text-text-muted text-xs">Golden Retriever • 2 anos</p>
                            </div>
                            <button className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                                <span className="material-symbols-outlined text-lg">edit</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Docked Floating Nav (Island) */}
            <div className="fixed bottom-6 left-6 right-6 bg-surface/90 backdrop-blur-md rounded-2xl shadow-soft-xl p-2 border border-white/50 z-50 flex justify-between px-6">
                {[
                    { icon: 'home', active: true },
                    { icon: 'favorite', active: false },
                    { icon: 'add_circle', active: false, large: true },
                    { icon: 'chat', active: false },
                    { icon: 'person', active: false },
                ].map((item, idx) => (
                    <button key={idx} className={`relative flex items-center justify-center ${item.large ? '-mt-8 bg-primary w-14 h-14 rounded-full shadow-glow text-white' : 'w-10 h-10 text-text-secondary'}`}>
                        <span className={`material-symbols-outlined ${item.large ? 'text-3xl' : 'text-xl'} ${item.active ? 'text-primary' : ''}`}>
                            {item.icon}
                        </span>
                        {item.active && !item.large && <span className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"></span>}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HomeTest3;
