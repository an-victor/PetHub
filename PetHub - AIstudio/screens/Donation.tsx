
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Donation: React.FC = () => {
  const navigate = useNavigate();

  const campaigns = [
    {
      id: '1',
      title: 'Ajude o Abrigo Patas Felizes',
      target: 'R$ 5.000',
      reached: 'R$ 3.850',
      progress: 77,
      image: 'https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?auto=format&fit=crop&q=80&w=400',
      description: 'Precisamos de ajuda para reformar o telhado do canil principal antes do inverno.'
    }
  ];

  const donationKits = [
    { id: 'k1', name: 'Kit Alimentação', price: 'R$ 35', icon: 'restaurant', color: 'bg-orange-100 text-orange-600' },
    { id: 'k2', name: 'Kit Saúde', price: 'R$ 60', icon: 'medical_services', color: 'bg-blue-100 text-blue-600' },
    { id: 'k3', name: 'Kit Acolhimento', price: 'R$ 100', icon: 'home', color: 'bg-purple-100 text-purple-600' }
  ];

  return (
    <div className="flex flex-col pb-24 bg-background-light dark:bg-background-dark min-h-screen">
      <header className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center p-4 pb-2 justify-between">
          <button onClick={() => navigate(-1)} className="text-primary flex size-12 items-center">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="text-xl font-extrabold flex-1 text-center">Fazer o Bem</h2>
          <button className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined">favorite</span>
          </button>
        </div>
      </header>

      <main className="p-4 flex flex-col gap-6">
        {/* Impact Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#2d2116] p-4 rounded-2xl shadow-sm border border-orange-50 text-center">
            <p className="text-2xl font-black text-primary">150+</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Pets Ajudados</p>
          </div>
          <div className="bg-white dark:bg-[#2d2116] p-4 rounded-2xl shadow-sm border border-orange-50 text-center">
            <p className="text-2xl font-black text-accent-yellow">24</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">ONGs Parceiras</p>
          </div>
        </div>

        {/* Featured Campaign */}
        <section>
          <h3 className="text-lg font-bold mb-4">Campanha em Destaque</h3>
          {campaigns.map(campaign => (
            <div key={campaign.id} className="bg-white dark:bg-[#2d2116] rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800">
              <div 
                className="w-full h-40 bg-cover bg-center"
                style={{ backgroundImage: `url("${campaign.image}")` }}
              >
                <div className="p-3">
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">Urgente</span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <h4 className="font-bold text-base">{campaign.title}</h4>
                <p className="text-xs text-gray-500 line-clamp-2">{campaign.description}</p>
                
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-primary">{campaign.reached} arrecadados</span>
                    <span className="text-gray-400">Meta: {campaign.target}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${campaign.progress}%` }}></div>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 mt-2">
                  Contribuir agora
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Donation Kits */}
        <section className="mb-4">
          <h3 className="text-lg font-bold mb-4">Kits de Doação</h3>
          <div className="flex flex-col gap-3">
            {donationKits.map(kit => (
              <div key={kit.id} className="flex items-center justify-between p-4 bg-white dark:bg-[#2d2116] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-xl flex items-center justify-center ${kit.color}`}>
                    <span className="material-symbols-outlined">{kit.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{kit.name}</p>
                    <p className="text-primary font-black">{kit.price}</p>
                  </div>
                </div>
                <button className="size-10 rounded-full bg-gray-50 dark:bg-gray-800 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Donation;
