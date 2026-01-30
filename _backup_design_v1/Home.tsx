
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    { name: 'Veterinário', icon: 'medical_services', path: '/vets' },
    { name: 'Comida', icon: 'restaurant', path: '/nutrition' },
    { name: 'Passeio', icon: 'directions_walk', path: '/training' },
    { name: 'Banho', icon: 'content_cut', path: '/bath' }
  ];

  return (
    <div className="flex flex-col pb-24">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md z-50">
        <div className="flex size-12 shrink-0 items-center">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD92u6__KXrIa8H6BpnLvP3Lf-pQWB8AvIYaKaQaQHsRyG8WL8E8_fBXSwX82FHy9CJkOX5SzE2wxW4302Zu2lhgABfInMDeRwK4KXnqkcCpXmeKUuef5XFIFIlaRT8K75t6658Fe6DWuliERvUTCZF0nHHRnI3bUwnbANykK_iTVFp2ih-Y1gTkOFcbHPlxxCVBweHmncfIVqn04HHByOeWh25_brWLxVCSBMH9-QBEFe64wX3263MOoJwhYxgYWLpPUuKYrnN5Atd")' }}
          ></div>
        </div>
        <div className="flex flex-col flex-1 px-3">
          <p className="text-xs text-[#9c7349] dark:text-[#d1b394] font-medium uppercase tracking-wider">Bem-vinda</p>
          <h2 className="text-[#1c140d] dark:text-white text-lg font-bold leading-tight">Olá, Maria!</h2>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>

      {/* Hero */}
      <div className="px-4 pt-6">
        <h2 className="text-[#1c140d] dark:text-white tracking-tight text-[32px] font-extrabold leading-tight">
          Seu pet está <br/><span className="text-primary">bem hoje?</span>
        </h2>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <div onClick={() => navigate('/encyclopedia')} className="cursor-pointer bg-primary flex flex-col gap-3 rounded-xl justify-end p-5 aspect-square shadow-lg relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 size-24 bg-white/20 rounded-full blur-2xl"></div>
          <div className="z-10 bg-white/20 backdrop-blur-sm size-10 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white">pets</span>
          </div>
          <p className="text-white text-xl font-bold leading-tight z-10">Cães</p>
        </div>
        <div onClick={() => navigate('/adoption')} className="cursor-pointer bg-accent-yellow flex flex-col gap-3 rounded-xl justify-end p-5 aspect-square shadow-lg relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 size-24 bg-white/20 rounded-full blur-2xl"></div>
          <div className="z-10 bg-white/20 backdrop-blur-sm size-10 rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">handshake</span>
          </div>
          <p className="text-white text-xl font-bold leading-tight z-10">Adoção</p>
        </div>
      </div>

      {/* Health Summary */}
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
        <h3 className="text-[#1c140d] dark:text-white text-xl font-bold tracking-tight">Resumo de Saúde</h3>
        <span className="text-primary text-sm font-bold cursor-pointer" onClick={() => navigate('/vaccines')}>Ver todos</span>
      </div>
      <div className="px-4 pb-6">
        <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-[#2d2218] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f4ede7] dark:border-[#3d2e21]">
          <div className="flex flex-[2_2_0px] flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="flex size-2 rounded-full bg-primary animate-pulse"></span>
                <p className="text-primary text-xs font-bold uppercase tracking-widest">Importante</p>
              </div>
              <p className="text-[#1c140d] dark:text-white text-lg font-bold leading-tight mt-1">Próxima Vacina</p>
              <p className="text-[#9c7349] dark:text-[#d1b394] text-sm font-medium">Antirrábica - 15 de Outubro</p>
            </div>
            <button onClick={() => navigate('/vaccines')} className="flex h-10 px-5 items-center justify-center rounded-xl bg-primary text-white text-sm font-bold transition-transform active:scale-95 shadow-md shadow-primary/20">
              <span>Ver Detalhes</span>
            </button>
          </div>
          <div className="w-full bg-primary/10 flex items-center justify-center aspect-square max-w-[100px] rounded-xl text-primary">
            <span className="material-symbols-outlined !text-5xl">vaccines</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 mb-8">
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button 
              key={action.name} 
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="size-14 rounded-full bg-[#f4ede7] dark:bg-[#3d2e21] flex items-center justify-center text-[#1c140d] dark:text-white group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">{action.icon}</span>
              </div>
              <span className="text-xs font-semibold">{action.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
