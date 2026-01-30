
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Vaccines: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'history' | 'upcoming'>('history');

  const historyVaccines = [
    { id: '1', name: 'Raiva (Antirrábica)', date: '15/05/2025', status: 'applied' },
    { id: '2', name: 'V10 (Polivalente)', date: '20/06/2025', status: 'applied' },
  ];

  const upcomingVaccines = [
    { id: '3', name: 'Gripe Canina', date: '15/02/2026', status: 'upcoming' },
    { id: '4', name: 'Antirrábica (Reforço)', date: '15/05/2026', status: 'upcoming' },
  ];

  const displayVaccines = activeTab === 'history' ? historyVaccines : upcomingVaccines;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#e8dbce] dark:border-[#423428]">
        <div className="flex items-center p-4 pb-2 justify-between">
          <button onClick={() => navigate(-1)} className="text-[#1c140d] dark:text-[#fcfaf8] flex size-10 shrink-0 items-center justify-center rounded-full">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <h2 className="text-[#1c140d] dark:text-white text-lg font-bold leading-tight flex-1 text-center pr-10">Caderneta de Vacinação</h2>
        </div>
        <div className="px-6 py-4 flex items-center gap-4">
          <div className="relative">
            <img
              className="w-16 h-16 rounded-full object-cover border-4 border-primary/20"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5n3qQRfTBx2PvsUgS4ObKBJnt_Ny7cTDsNzJDTpDEVp_pnYj2dySpOPcLoS34HrGAgGm2DhevJjFbo3Qr7CPvCG3ugGXn55-WqPFX7eF6_Li_Bll4zT0GmlxWslWIB28oXOtmvw2EI8pRvFN6bTbCrzHOoWZZZ6rCWdq6d6X-RLgwUBebaJa7qtmu03VJ4nFoRSYTOrVAqqPQdYT6yNoycG2wybMu0hPV_0FMB9g7EE2Ft4rJrW-5wSqfEVzg05NBCVnkZDtBAmsd"
              alt="Max"
            />
            <div className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full border-2 border-white">
              <span className="material-symbols-outlined !text-[14px]">pets</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold dark:text-white">Max</h3>
            <p className="text-[#9c7349] dark:text-[#cbb094] text-sm">Golden Retriever • 2 anos</p>
          </div>
        </div>
        <div className="flex border-b border-[#e8dbce] dark:border-[#423428] px-4 justify-between">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 flex-1 transition-colors ${activeTab === 'history'
                ? 'border-primary text-[#1c140d] dark:text-white'
                : 'border-transparent text-[#9c7349] dark:text-[#9c7349]'
              }`}
          >
            <p className="text-sm font-bold tracking-wide">Histórico</p>
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 flex-1 transition-colors ${activeTab === 'upcoming'
                ? 'border-primary text-[#1c140d] dark:text-white'
                : 'border-transparent text-[#9c7349] dark:text-[#9c7349]'
              }`}
          >
            <p className="text-sm font-bold tracking-wide">Próximas</p>
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 bg-background-light dark:bg-background-dark">
        <div className="grid grid-cols-[40px_1fr] gap-x-2">
          {displayVaccines.map((vaccine, index) => (
            <React.Fragment key={vaccine.id}>
              {/* Timeline indicator */}
              <div className="flex flex-col items-center gap-1 pt-3">
                <div className={`rounded-full p-1 ${vaccine.status === 'applied'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                    : 'bg-orange-100 dark:bg-orange-900/30 text-primary'
                  }`}>
                  <span className={`material-symbols-outlined !text-[24px] ${vaccine.status === 'applied' ? 'material-symbols-fill' : ''}`}>
                    {vaccine.status === 'applied' ? 'check_circle' : 'schedule'}
                  </span>
                </div>
                {index < displayVaccines.length - 1 && (
                  <div className={`w-[2px] h-full grow ${vaccine.status === 'applied'
                      ? 'bg-primary/20'
                      : 'border-l-2 border-dashed border-primary/30'
                    }`}></div>
                )}
              </div>

              {/* Vaccine card */}
              <div className="flex flex-1 flex-col py-3 pb-8">
                <div className={`bg-white dark:bg-[#2d2218] p-4 rounded-xl shadow-sm border ${vaccine.status === 'upcoming'
                    ? 'border-l-4 border-l-primary border-[#e8dbce]/40 dark:border-[#423428]'
                    : 'border-[#e8dbce]/40 dark:border-[#423428]'
                  }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[#1c140d] dark:text-white text-base font-bold">{vaccine.name}</p>
                        {vaccine.status === 'upcoming' && (
                          <span className="px-2 py-0.5 bg-orange-100 text-primary text-[10px] font-bold rounded-full uppercase">Próxima</span>
                        )}
                      </div>
                      <p className="text-[#9c7349] dark:text-[#cbb094] text-sm mt-1 font-medium">
                        {vaccine.status === 'applied' ? 'Aplicada em' : 'Agendada para'} {vaccine.date}
                      </p>
                    </div>
                    {vaccine.status === 'applied' && (
                      <span className="material-symbols-outlined text-[#9c7349]/50">info</span>
                    )}
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {displayVaccines.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">vaccines</span>
            <p className="text-gray-500 font-medium">
              {activeTab === 'history' ? 'Nenhuma vacina aplicada ainda' : 'Nenhuma vacina agendada'}
            </p>
          </div>
        )}
      </main>

      <div className="sticky bottom-24 px-4 py-3 pointer-events-none">
        <button className="pointer-events-auto flex w-full items-center justify-center rounded-xl h-14 bg-accent-yellow shadow-lg shadow-accent-yellow/30 text-[#1c140d] gap-2 font-bold leading-normal transition-transform active:scale-95">
          <span className="material-symbols-outlined">add</span>
          <span>Adicionar Nova Vacina</span>
        </button>
      </div>
    </div>
  );
};

export default Vaccines;
