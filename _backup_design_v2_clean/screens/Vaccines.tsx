import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { getActiveCampaigns } from '@/src/data';

const Vaccines: React.FC = () => {
  const navigate = useNavigate();
  const { setIsVaccineFormOpen } = useAppContext();
  const activeCampaigns = getActiveCampaigns();
  const [activeTab, setActiveTab] = useState<'history' | 'upcoming'>('history');

  const historyVaccines = [
    { id: '1', name: 'Raiva', date: '28 Nov 2023', status: 'applied', vet: 'Dr. Carlos Silva' },
    { id: '2', name: 'V10', date: '27 Nov 2023', status: 'applied', vet: 'Dr. Carlos Silva' },
  ];

  const upcomingVaccines = [
    { id: '3', name: 'Gripe Canina', date: '28 Fev 2024', status: 'upcoming', badge: 'Próxima', daysLeft: 36 },
    { id: '4', name: 'Leishmaniose', date: '11 Jul 2024', status: 'upcoming', note: 'Prevista', daysLeft: 169 },
  ];

  const displayVaccines = activeTab === 'history' ? historyVaccines : upcomingVaccines;

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="bg-surface/80 backdrop-blur-md shadow-soft sticky top-0 z-20 transition-colors duration-300 animate-slideDown">
        <div className="flex items-center justify-between p-4 pt-6">
          <button onClick={() => navigate(-1)} className="flex size-11 items-center justify-center rounded-2xl bg-background/50 hover:bg-background active:scale-95 transition-all duration-200 border border-border/50">
            <span className="material-symbols-outlined text-text-primary transition-colors duration-300">arrow_back_ios_new</span>
          </button>
          <h1 className="text-text-primary text-xl font-bold transition-colors duration-300">Vacinas</h1>
          <button className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined">download</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 pb-4">
          <div className="flex p-1 bg-background/50 rounded-2xl border border-border/50">
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'history'
                ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm'
                : 'text-text-muted hover:text-text-secondary'
                }`}
            >
              <span className="material-symbols-outlined text-lg">history</span>
              Histórico
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'upcoming'
                ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm'
                : 'text-text-muted hover:text-text-secondary'
                }`}
            >
              <span className="material-symbols-outlined text-lg">event_upcoming</span>
              Próximas
            </button>
          </div>
        </div>
      </header>

      {/* Pet Hero */}
      <div className="px-5 pb-6 pt-2 animate-slideUp stagger-1">
        <div className="bg-surface rounded-[28px] p-5 shadow-soft border border-border/50 flex items-center gap-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl p-1 bg-gradient-to-br from-primary to-primary-light">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5n3qQRfTBx2PvsUgS4ObKBJnt_Ny7cTDsNzJDTpDEVp_pnYj2dySpOPcLoS34HrGAgGm2DhevJjFbo3Qr7CPvCG3ugGXn55-WqPFX7eF6_Li_Bll4zT0GmlxWslWIB28oXOtmvw2EI8pRvFN6bTbCrzHOoWZZZ6rCWdq6d6X-RLgwUBebaJa7qtmu03VJ4nFoRSYTOrVAqqPQdYT6yNoycG2wybMu0hPV_0FMB9g7EE2Ft4rJrW-5wSqfEVzg05NBCVnkZDtBAmsd"
                alt="Max"
                className="w-full h-full rounded-xl object-cover bg-white"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-surface flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white text-[10px] font-bold">check</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-text-primary text-xl font-bold transition-colors duration-300">Max</h2>
            <p className="text-text-secondary text-sm font-medium">Golden Retriever • 2 anos</p>
            <div className="flex items-center gap-1 mt-1 text-success text-xs font-bold">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
              Carteirinha em dia
            </div>
          </div>
        </div>
      </div>

      {/* Active Campaigns Banner */}
      {activeCampaigns.length > 0 && (
        <div className="px-5 pb-6 animate-slideUp stagger-2">
          {activeCampaigns.map(campaign => (
            <div key={campaign.id} className="rounded-[28px] overflow-hidden relative shadow-glow-sm">
              {/* Background with pattern */}
              <div className={`absolute inset-0 ${campaign.color} opacity-90`}></div>
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>

              <div className="relative p-5 text-white">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex flex-col">
                    <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider backdrop-blur-md w-fit mb-2 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs animate-pulse">campaign</span>
                      Campanha Nacional
                    </span>
                    <h3 className="text-xl font-bold leading-tight">{campaign.title}</h3>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md shrink-0">
                    <span className="material-symbols-outlined">{campaign.icon}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 text-white/90 text-sm bg-black/10 p-2 rounded-xl w-fit">
                  <span className="material-symbols-outlined text-sm">date_range</span>
                  <span className="font-semibold">
                    {new Date(campaign.startDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                    {' - '}
                    {new Date(campaign.endDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                  </span>
                </div>

                <p className="text-white/90 text-sm mb-4 leading-relaxed font-medium">
                  {campaign.description}
                </p>

                <button
                  onClick={() => setIsVaccineFormOpen(true)}
                  className="w-full bg-white text-rose-600 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all hover:bg-gray-50"
                >
                  <span className="material-symbols-outlined">vaccines</span>
                  Registrar Vacina da Campanha
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vaccine List */}
      <main className="flex-1 px-5 pb-32">
        <div className="space-y-0">
          {displayVaccines.map((vaccine, index) => (
            <div
              key={vaccine.id}
              className="flex gap-4 items-stretch animate-slideUp group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-soft z-10 border-4 border-background transition-all duration-300 group-hover:scale-110 ${activeTab === 'history'
                  ? 'bg-success/10 text-success'
                  : 'bg-primary/10 text-primary'
                  }`}>
                  <span className={`material-symbols-outlined text-xl ${activeTab === 'history' ? 'material-symbols-fill' : ''}`}>
                    {activeTab === 'history' ? 'check_circle' : 'vaccines'}
                  </span>
                </div>
                {index < displayVaccines.length - 1 && (
                  <div className={`w-0.5 flex-grow my-1 rounded-full ${activeTab === 'history' ? 'bg-success/20' : 'bg-primary/20'
                    }`}></div>
                )}
              </div>

              {/* Card */}
              <div className="flex-1 pb-6">
                <div className={`bg-surface rounded-3xl p-5 shadow-soft border border-border/50 hover:border-primary/30 hover:shadow-soft-lg transition-all duration-300 cursor-pointer active:scale-[0.99] relative overflow-hidden`}>
                  {vaccine.status === 'upcoming' && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
                  )}

                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-text-primary font-bold text-lg">{vaccine.name}</h3>
                    {vaccine.badge && (
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider">
                        {vaccine.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-text-muted text-sm">event</span>
                    <p className="text-text-primary text-sm font-medium">
                      {vaccine.date}
                    </p>
                  </div>

                  {vaccine.vet && (
                    <div className="flex items-center gap-2 p-2 bg-background dark:bg-surface-elevated rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-surface shadow-sm flex items-center justify-center text-xs text-primary font-bold border border-border">
                        Dr
                      </div>
                      <span className="text-text-secondary text-xs font-medium">{vaccine.vet}</span>
                    </div>
                  )}

                  {vaccine.daysLeft && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-1.5 flex-1 bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/3 rounded-full"></div>
                      </div>
                      <span className="text-primary text-xs font-bold whitespace-nowrap">
                        Faltam {vaccine.daysLeft} dias
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayVaccines.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fadeIn opacity-50">
            <span className="material-symbols-outlined text-6xl text-text-muted mb-4">vaccines</span>
            <p className="text-text-primary font-semibold text-lg">Nenhuma vacina encontrada</p>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-28 z-50 transition-all duration-300 pointer-events-none w-full flex justify-center">
        <button
          onClick={() => setIsVaccineFormOpen(true)}
          className="pointer-events-auto flex size-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-primary to-primary-dark text-white shadow-glow hover:shadow-glow-lg hover:scale-110 active:scale-95 transition-all duration-300 relative group"
        >
          <div className="absolute inset-0 bg-white/20 rounded-[20px] animate-ping opacity-0 group-hover:opacity-100 duration-1000"></div>
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </div>
  );
};

export default Vaccines;
