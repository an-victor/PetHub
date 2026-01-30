import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { adoptionPets, getAdoptionPetsByState } from '@/src/data';
import { getSavedLocation } from '@/src/services/location';
import { DonationForm } from '@/src/components/forms';

const Adoption: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'dog' | 'cat'>('all');
  const [isDonationFormOpen, setIsDonationFormOpen] = useState(false);
  const userLocation = getSavedLocation();

  const filters = [
    { id: 'all', label: 'Todos', icon: 'apps' },
    { id: 'dog', label: 'Cães', icon: 'pets' },
    { id: 'cat', label: 'Gatos', icon: 'cruelty_free' },
  ];

  // Filter pets by user's location
  const localPets = useMemo(() => {
    let result = getAdoptionPetsByState(userLocation.stateCode);

    // If no pets in user's state, show all
    if (result.length === 0) {
      result = adoptionPets;
    }

    // Filter by type
    if (activeFilter !== 'all') {
      result = result.filter(p => p.type === activeFilter);
    }

    return result;
  }, [userLocation.stateCode, activeFilter]);

  const featuredPet = localPets.find(p => p.featured || p.urgent);
  const otherPets = localPets.filter(p => p.id !== featuredPet?.id);

  const handleDonationSubmit = (data: Record<string, unknown>) => {
    // Future: integrate with API to persist adoption data
    localStorage.setItem('pethub-adoption-submission', JSON.stringify(data));
    alert('Pet cadastrado para adoção com sucesso! 🐾');
  };

  return (
    <div className="flex flex-col pb-28 min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="bg-surface shadow-soft sticky top-0 z-20 transition-colors duration-300 animate-slideDown">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="flex size-11 items-center justify-center rounded-xl hover:bg-background active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined text-text-primary transition-colors duration-300">arrow_back_ios</span>
          </button>
          <h1 className="text-text-primary text-lg font-bold transition-colors duration-300">Adoção</h1>
          <button className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </header>

      <main className="p-5">
        {/* Location Indicator */}
        <div className="flex items-center justify-between mb-4 animate-slideUp stagger-1">
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <span className="material-symbols-outlined text-primary text-lg">location_on</span>
            <span>Pets em <strong className="text-text-primary">{userLocation.city}, {userLocation.stateCode}</strong></span>
          </div>
          <button
            onClick={() => setIsDonationFormOpen(true)}
            className="flex items-center gap-1 text-primary text-sm font-semibold hover:underline"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            Doar
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-5 overflow-x-auto no-scrollbar animate-slideUp stagger-2">
          {filters.map((filter, index) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as typeof activeFilter)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeFilter === filter.id
                ? 'bg-primary text-white shadow-glow-sm'
                : 'bg-surface text-text-secondary shadow-soft hover:shadow-soft-md'
                }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="material-symbols-outlined text-sm">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>

        {localPets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fadeIn">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-5xl text-primary">pets</span>
            </div>
            <p className="text-text-primary font-semibold text-lg mb-1">Nenhum pet disponível</p>
            <p className="text-text-muted text-sm mb-4">Não há pets para adoção na sua região</p>
            <button
              onClick={() => setIsDonationFormOpen(true)}
              className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-semibold"
            >
              <span className="material-symbols-outlined">add</span>
              Cadastrar um pet para adoção
            </button>
          </div>
        ) : (
          <>
            {/* Featured Pet */}
            {featuredPet && (
              <div className="mb-5 animate-slideUp stagger-3">
                <div
                  onClick={() => navigate('/chat')}
                  className="bg-surface rounded-3xl shadow-soft-lg overflow-hidden cursor-pointer hover:shadow-soft-xl active:scale-[0.99] transition-all duration-300 group"
                >
                  <div
                    className="relative h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url("${featuredPet.image}")` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      {featuredPet.urgent && (
                        <span className="bg-danger text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg">
                          Urgente
                        </span>
                      )}
                      <span className="bg-success/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">verified</span>
                        Vacinado
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-2xl drop-shadow-lg">{featuredPet.name}</h3>
                      <p className="text-white/90 text-sm">{featuredPet.breed}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-text-secondary text-sm mb-4">{featuredPet.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={featuredPet.donor.avatar}
                          alt={featuredPet.donor.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div>
                          <p className="text-text-primary text-sm font-semibold">{featuredPet.donor.name}</p>
                          <p className="text-text-muted text-xs flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">location_on</span>
                            {featuredPet.location} • {featuredPet.distance}
                          </p>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-5 py-3 rounded-2xl font-bold shadow-glow-sm hover:shadow-glow active:scale-95 transition-all duration-300">
                        <span className="material-symbols-outlined text-sm">chat</span>
                        Contato
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Pets Grid */}
            {otherPets.length > 0 && (
              <div className="animate-slideUp stagger-4">
                <h2 className="text-text-primary font-bold text-lg mb-4">Mais Pets</h2>
                <div className="grid grid-cols-2 gap-4">
                  {otherPets.map((pet, index) => (
                    <div
                      key={pet.id}
                      onClick={() => navigate('/chat')}
                      className="bg-surface rounded-2xl shadow-soft overflow-hidden cursor-pointer hover:shadow-soft-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
                      style={{ animationDelay: `${(index + 4) * 100}ms` }}
                    >
                      <div
                        className="relative h-28 bg-cover bg-center"
                        style={{ backgroundImage: `url("${pet.image}")` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        {pet.urgent && (
                          <span className="absolute top-2 left-2 bg-danger text-white text-[8px] font-bold px-2 py-1 rounded-md uppercase">
                            Urgente
                          </span>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="text-text-primary text-sm font-semibold">{pet.name}</h3>
                        <p className="text-text-muted text-xs truncate">{pet.breed}</p>
                        <div className="flex items-center gap-1 mt-2 text-text-muted text-[10px]">
                          <span className="material-symbols-outlined text-[10px]">location_on</span>
                          {pet.city}, {pet.stateCode}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* CTA - Doar Pet */}
        <div className="mt-6 p-5 bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-3xl border border-rose-200/50 dark:border-rose-800/30 animate-slideUp stagger-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-surface flex items-center justify-center shadow-soft">
              <span className="material-symbols-outlined text-2xl text-rose-500">volunteer_activism</span>
            </div>
            <div className="flex-1">
              <h4 className="text-text-primary font-bold">Quer doar um pet?</h4>
              <p className="text-text-secondary text-sm">Encontre uma nova família</p>
            </div>
          </div>
          <button
            onClick={() => setIsDonationFormOpen(true)}
            className="w-full py-3.5 rounded-2xl border-2 border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-400 font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">add_circle</span>
            Cadastrar Pet para Adoção
          </button>
        </div>
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

export default Adoption;
