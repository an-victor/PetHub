import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DonationForm } from '@/src/components/forms';

const Donation: React.FC = () => {
  const navigate = useNavigate();
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'donate-pet' | 'help-ongs'>('donate-pet');
  const [isDonationFormOpen, setIsDonationFormOpen] = useState(false);

  const campaigns = [
    {
      id: '1',
      title: 'Ajude o Abrigo Patas Felizes',
      target: 'R$ 5.000',
      reached: 'R$ 3.850',
      progress: 77,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHf8mNse6RRDiFhFi8O-r2AX0fF_Sia-vEmkDUWkOHtYTEVGjn04bOLjOk7p5ZKo7gaJwPrmgOldbFfSgMObdihrDyb0AGjMVoxc5csUEQv6LyCfi5843a3ZmtBH9M-LDKvwXghnCFJ1I2T6zGr5vGO0FluCPxaXBmnyPdlq2d6TfJEuGz1ukVcB2YVKiEC9oj8-TlcEtbt0nJWLEs71kAZMzvymv1I3ez6z0a9E8Vsn85uPJSdAfqhJA9BbSsKEaLfBWj8yAK-lZA',
      description: 'Precisamos de ajuda para reformar o telhado do canil principal antes do inverno.',
      daysLeft: 15
    }
  ];

  const donationKits = [
    { id: 'k1', name: 'Kit Alimentação', price: 'R$ 35', icon: 'restaurant', color: 'from-amber-400 to-orange-500', description: 'Ração para 1 semana' },
    { id: 'k2', name: 'Kit Saúde', price: 'R$ 60', icon: 'medical_services', color: 'from-emerald-400 to-teal-500', description: 'Vermífugo + vitaminas' },
    { id: 'k3', name: 'Kit Acolhimento', price: 'R$ 100', icon: 'home', color: 'from-sky-400 to-blue-500', description: 'Cama + cobertores' }
  ];

  const handleDonationSubmit = (data: Record<string, unknown>) => {
    // Future: integrate with API to persist adoption data
    localStorage.setItem('pethub-donation-submission', JSON.stringify(data));
    alert('Pet cadastrado para adoção com sucesso! 🐾\nEm breve aparecerá na lista.');
  };

  useEffect(() => {
    if (activeTab === 'help-ongs') {
      const timer = setTimeout(() => {
        setAnimatedProgress(campaigns[0].progress);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col pb-28 min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="bg-surface shadow-soft sticky top-0 z-20 transition-colors duration-300 animate-slideDown">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="flex size-11 items-center justify-center rounded-xl hover:bg-background active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined text-text-primary transition-colors duration-300">arrow_back_ios</span>
          </button>
          <h1 className="text-text-primary text-lg font-bold transition-colors duration-300">Doar</h1>
          <button className="flex size-11 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-900/30 text-rose-500 hover:bg-rose-200 dark:hover:bg-rose-900/50 active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined material-symbols-fill">favorite</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="px-4 pb-4">
          <div className="flex bg-background rounded-2xl p-1.5">
            <button
              onClick={() => setActiveTab('donate-pet')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'donate-pet'
                ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm'
                : 'text-text-muted hover:text-text-secondary'
                }`}
            >
              <span className="material-symbols-outlined text-lg">pets</span>
              Doar um Pet
            </button>
            <button
              onClick={() => setActiveTab('help-ongs')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'help-ongs'
                ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm'
                : 'text-text-muted hover:text-text-secondary'
                }`}
            >
              <span className="material-symbols-outlined text-lg">volunteer_activism</span>
              Ajudar ONGs
            </button>
          </div>
        </div>
      </header>

      <main className="p-5">
        {activeTab === 'donate-pet' ? (
          /* DOAR UM PET */
          <div className="space-y-6 animate-fadeIn">
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-3xl p-6 border border-rose-200/50 dark:border-rose-800/30">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-surface flex items-center justify-center shadow-soft">
                  <span className="material-symbols-outlined text-3xl text-rose-500">pets</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-text-primary font-bold text-lg">Encontre uma nova família</h3>
                  <p className="text-text-secondary text-sm">Cadastre seu pet para adoção responsável</p>
                </div>
              </div>

              <button
                onClick={() => setIsDonationFormOpen(true)}
                className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-4 rounded-2xl font-bold shadow-glow-sm hover:shadow-glow active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">add_circle</span>
                Cadastrar Pet para Adoção
              </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface rounded-2xl p-4 shadow-soft text-center">
                <div className="w-12 h-12 rounded-xl bg-success/10 mx-auto mb-3 flex items-center justify-center">
                  <span className="material-symbols-outlined text-success text-xl">verified</span>
                </div>
                <p className="text-text-primary font-semibold text-sm">Adoção Segura</p>
                <p className="text-text-muted text-xs mt-1">Verificamos os adotantes</p>
              </div>
              <div className="bg-surface rounded-2xl p-4 shadow-soft text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">diversity_3</span>
                </div>
                <p className="text-text-primary font-semibold text-sm">Suporte</p>
                <p className="text-text-muted text-xs mt-1">Acompanhamos o processo</p>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-surface rounded-3xl p-5 shadow-soft">
              <h4 className="text-text-primary font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">help</span>
                Como funciona?
              </h4>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Cadastre', desc: 'Preencha as informações do pet' },
                  { step: '2', title: 'Aguarde', desc: 'Interessados entrarão em contato' },
                  { step: '3', title: 'Conheça', desc: 'Conheça os candidatos' },
                  { step: '4', title: 'Entregue', desc: 'Faça a adoção com segurança' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">{item.step}</span>
                    </div>
                    <div>
                      <p className="text-text-primary font-semibold text-sm">{item.title}</p>
                      <p className="text-text-muted text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* AJUDAR ONGS */
          <div className="space-y-6 animate-fadeIn">
            {/* Impact Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '150+', label: 'Pets Ajudados', icon: 'pets', color: 'text-primary' },
                { value: '24', label: 'ONGs Parceiras', icon: 'groups', color: 'text-amber-500' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-surface rounded-3xl p-5 shadow-soft text-center hover:shadow-soft-lg hover:-translate-y-1 active:scale-[0.98] cursor-pointer transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                    <span className={`material-symbols-outlined text-2xl ${stat.color}`}>{stat.icon}</span>
                  </div>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-text-muted text-[10px] font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Featured Campaign */}
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-surface rounded-3xl shadow-soft overflow-hidden transition-colors duration-300 group">
                <div
                  className="h-44 bg-cover bg-center relative"
                  style={{ backgroundImage: `url("${campaign.image}")` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-danger text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg">
                      Urgente
                    </span>
                    <span className="bg-black/50 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm">
                      {campaign.daysLeft} dias restantes
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-text-primary font-bold text-lg mb-2">{campaign.title}</h3>
                  <p className="text-text-muted text-sm line-clamp-2 mb-5">{campaign.description}</p>

                  <div className="mb-5">
                    <div className="flex justify-between items-end mb-3">
                      <div>
                        <span className="text-primary text-xl font-bold">{campaign.reached}</span>
                        <span className="text-text-muted text-sm ml-1">arrecadados</span>
                      </div>
                      <span className="text-text-muted text-sm">Meta: {campaign.target}</span>
                    </div>
                    <div className="w-full h-3 bg-background dark:bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary via-primary-light to-primary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${animatedProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-4 rounded-2xl font-bold shadow-glow-sm hover:shadow-glow active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">volunteer_activism</span>
                    Contribuir agora
                  </button>
                </div>
              </div>
            ))}

            {/* Donation Kits */}
            <div>
              <h2 className="text-text-primary font-bold text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">inventory_2</span>
                Kits de Doação
              </h2>
              <div className="space-y-3">
                {donationKits.map((kit, index) => (
                  <div
                    key={kit.id}
                    className="bg-surface rounded-2xl p-4 shadow-soft flex items-center justify-between hover:shadow-soft-lg hover:-translate-y-1 active:scale-[0.99] cursor-pointer transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${kit.color} flex items-center justify-center text-white shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                        <span className="material-symbols-outlined text-xl">{kit.icon}</span>
                      </div>
                      <div>
                        <p className="text-text-primary font-semibold">{kit.name}</p>
                        <p className="text-text-muted text-xs">{kit.description}</p>
                        <p className="text-primary font-bold mt-0.5">{kit.price}</p>
                      </div>
                    </div>
                    <button className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center text-primary hover:bg-primary hover:text-white active:scale-95 transition-all duration-300">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Donation Form Modal */}
      <DonationForm
        isOpen={isDonationFormOpen}
        onClose={() => setIsDonationFormOpen(false)}
        onSubmit={handleDonationSubmit}
      />
    </div>
  );
};

export default Donation;
