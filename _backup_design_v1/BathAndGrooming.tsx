
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BathAndGrooming: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col pb-24 bg-background-light dark:bg-background-dark min-h-screen">
      <header className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md p-4 pb-2 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-primary flex size-12 items-center">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-extrabold flex-1 text-center">Banho e Tosa</h2>
        <button className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="p-4">
        {/* Progress Tracker */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-accent-yellow p-6 text-white shadow-lg mb-6">
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium opacity-90">Meta de Banhos Mensais</p>
              <h3 className="text-3xl font-extrabold">Falta só 1! 🧼</h3>
            </div>
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle className="text-white/20" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" strokeWidth="8"></circle>
                <circle className="text-white" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" strokeDasharray="351.85" strokeDashoffset="87.96" strokeLinecap="round" strokeWidth="10"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black">3/4</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Concluído</span>
              </div>
            </div>
            <p className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full">Ganhe 15% de desconto no próximo banho!</p>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
          {['Todos', 'Banho', 'Tosa', 'Hidratação'].map((f, i) => (
            <button key={f} className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 border shadow-sm ${i === 0 ? 'bg-primary text-white border-primary' : 'bg-white text-zinc-700'}`}>
              <span className="text-sm font-bold">{f}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 pb-2">
          <h3 className="text-xl font-extrabold tracking-tight">Pet Shops Próximos</h3>
          <span onClick={() => navigate('/vets')} className="text-primary text-sm font-bold cursor-pointer">Ver Mapa</span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-zinc-900 p-4 shadow-sm border border-orange-50">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <div>
                  <p className="text-lg font-bold leading-tight">Paws & Bubbles</p>
                  <div className="flex items-center gap-1.5 text-zinc-500 text-sm font-medium">
                    <span className="material-symbols-outlined text-sm text-yellow-500 material-symbols-fill">star</span>
                    <span>4.8 • 1.2 km • <span className="text-green-600 font-bold">R$ 50-120</span></span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-tight bg-primary/10 text-primary px-2 py-0.5 rounded">Mais Próximo</span>
                  <span className="text-[10px] font-bold uppercase tracking-tight bg-green-100 text-green-700 px-2 py-0.5 rounded">Aberto</span>
                </div>
              </div>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ82tNYGqiLatYlfBjVN5B3TvlOfgKtD_BX8ZX5jXsyuJCOOSyN1P2BQZc3_XTEaDGDn-vXMTJUP29THx2FFrLAxki3G1di4HINa14VUIwHbGJZOVjBcIzeiDUAj4jVwqRpZQbF85Lh9vKcXRw33eO8xqQI04lcqp0aTYd13hhRT8dBzNofA2EMU1DlbM_5ZmZhskKfqderlFJxkkYwOzbGo7QsZxxJvVIoHxzNfH7NwdbpmcPpdElrgtCd5EXQfTcDeRkUkcOsA1h" alt="Paws" className="w-24 h-24 rounded-xl object-cover" />
            </div>
            <button className="w-full flex items-center justify-center rounded-full h-11 bg-primary text-white gap-2 text-sm font-bold shadow-md">
              <span className="material-symbols-outlined text-lg">calendar_today</span>
              <span>Agendar Banho</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BathAndGrooming;
