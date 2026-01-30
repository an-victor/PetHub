import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeTest2: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-[#F9F8F4] pb-24 font-sans">
            {/* Header */}
            <header className="px-6 pt-12 pb-4 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                        <img
                            src="https://randomuser.me/api/portraits/women/44.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-text-secondary text-xs font-medium">Bem-vinda de volta,</p>
                        <h2 className="text-text-primary text-lg font-bold">Maria Silva</h2>
                    </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-surface shadow-soft flex items-center justify-center relative hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-primary">notifications</span>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border border-white"></span>
                </button>
            </header>

            {/* Hero Section */}
            <div className="px-6 py-6 animate-fadeIn">
                <h1 className="text-3xl font-extrabold text-text-primary leading-tight mb-6">
                    Seu pet está <br />
                    <span className="text-primary">bem hoje?</span> 🐾
                </h1>

                {/* Categories - Large Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <button onClick={() => navigate('/pets?type=dog')} className="h-40 rounded-[2rem] bg-gradient-to-br from-[#FFD1A6] to-[#F39C12] p-5 relative overflow-hidden shadow-glow-sm hover:shadow-glow transition-all active:scale-[0.98] group">
                        <div className="absolute top-4 left-4 bg-white/30 backdrop-blur-md rounded-2xl p-2">
                            <span className="text-2xl">🐕</span>
                        </div>
                        <span className="absolute bottom-5 left-5 text-white font-bold text-xl group-hover:translate-x-1 transition-transform">Cães</span>
                        {/* Blob decoration */}
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                    </button>

                    <button onClick={() => navigate('/pets?type=cat')} className="h-40 rounded-[2rem] bg-gradient-to-br from-[#A6D1FF] to-[#3498DB] p-5 relative overflow-hidden shadow-soft hover:shadow-lg transition-all active:scale-[0.98] group">
                        <div className="absolute top-4 left-4 bg-white/30 backdrop-blur-md rounded-2xl p-2">
                            <span className="text-2xl">🐈</span>
                        </div>
                        <span className="absolute bottom-5 left-5 text-white font-bold text-xl group-hover:translate-x-1 transition-transform">Gatos</span>
                        {/* Blob decoration */}
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                    </button>
                </div>

                {/* Health Summary */}
                <div className="mb-8 animate-slideUp stagger-1">
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="text-lg font-bold text-text-primary">Resumo de Saúde</h3>
                        <span className="text-primary text-sm font-semibold cursor-pointer">Ver tudo</span>
                    </div>

                    <div className="bg-white rounded-[1.5rem] p-5 shadow-soft border border-border/40 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[3rem]"></div>

                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">vaccines</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-text-primary">Próxima Vacina</h4>
                                <p className="text-text-muted text-xs">V8 (Polivalente) • Thor</p>
                            </div>
                            <span className="bg-warning/10 text-warning px-2 py-1 rounded-lg text-xs font-bold">Pendente</span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-text-secondary">Prazo</span>
                                <span className="text-primary">Falta 1 Mês</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full w-[70%] bg-primary rounded-full"></div>
                            </div>
                        </div>

                        <button className="w-full mt-4 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-glow-sm hover:shadow-glow active:scale-[0.98] transition-all">
                            Ver Detalhes
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-8 animate-slideUp stagger-2">
                    <h3 className="text-lg font-bold text-text-primary mb-4">Acesso Rápido</h3>
                    <div className="flex justify-between">
                        {[
                            { icon: 'medical_services', label: 'Vet', color: 'bg-blue-100 text-blue-600' },
                            { icon: 'restaurant', label: 'Comida', color: 'bg-green-100 text-green-600' },
                            { icon: 'pets', label: 'Passeio', color: 'bg-orange-100 text-orange-600' },
                            { icon: 'soap', label: 'Banho', color: 'bg-purple-100 text-purple-600' },
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 cursor-pointer group">
                                <div className={`w-16 h-16 rounded-3xl ${item.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                </div>
                                <span className="text-xs font-medium text-text-secondary group-hover:text-primary transition-colors">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Nav (Mock for Test Layout) */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
                {[
                    { icon: 'home', label: 'Início', active: true },
                    { icon: 'calendar_month', label: 'Agenda', active: false },
                    { icon: 'storefront', label: 'Loja', active: false },
                    { icon: 'person', label: 'Perfil', active: false },
                ].map((item, index) => (
                    <button key={index} className={`flex flex-col items-center gap-1 ${item.active ? 'text-primary' : 'text-gray-400'}`}>
                        <span className={`material-symbols-outlined ${item.active ? 'material-symbols-fill' : ''}`}>{item.icon}</span>
                        {item.active && <span className="w-1 h-1 bg-primary rounded-full"></span>}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HomeTest2;
