import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPetShopsByState } from '@/src/data';
import { getSavedLocation } from '@/src/services/location';

const BathAndGrooming: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [progressOffset, setProgressOffset] = useState(314);
  const userLocation = getSavedLocation();

  const filters = ['Todos', 'Banho', 'Tosa', 'Hidratação', 'Spa'];

  // Fetch PetShops based on user's location
  const petShops = useMemo(() => {
    let shops = getPetShopsByState(userLocation.stateCode);

    // Filter logic
    if (activeFilter !== 'Todos') {
      shops = shops.filter(shop =>
        shop.services.some(s => s.toLowerCase().includes(activeFilter.toLowerCase()))
      );
    }

    return shops;
  }, [userLocation.stateCode, activeFilter]);

  // Animate progress on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressOffset(78); // 75% progress
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col pb-28 min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="bg-surface shadow-soft sticky top-0 z-20 transition-colors duration-300 animate-slideDown">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="flex size-11 items-center justify-center rounded-xl hover:bg-background active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined text-text-primary transition-colors duration-300">arrow_back_ios</span>
          </button>
          <h1 className="text-text-primary text-lg font-bold transition-colors duration-300">Banho e Tosa</h1>
          <button className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined">history</span>
          </button>
        </div>
      </header>

      <main className="p-5">
        {/* Progress Card */}
        <div className="bg-gradient-to-br from-primary via-primary to-primary-dark rounded-3xl p-6 text-white shadow-glow mb-6 relative overflow-hidden animate-slideUp stagger-1">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full"></div>
          <div className="absolute left-10 -top-16 w-32 h-32 bg-white/5 rounded-full"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="text-white/80 text-sm mb-1">Meta de Banhos Mensais</p>
            <h2 className="text-2xl font-bold mb-4">Falta só 1! 🧼</h2>

            {/* Animated Progress Circle */}
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  className="text-white/20"
                  cx="64" cy="64" fill="transparent"
                  r="56" stroke="currentColor" strokeWidth="10"
                />
                <circle
                  className="text-white transition-all duration-1000 ease-out"
                  cx="64" cy="64" fill="transparent"
                  r="56" stroke="currentColor"
                  strokeDasharray="352" strokeDashoffset={progressOffset}
                  strokeLinecap="round" strokeWidth="10"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">3/4</span>
                <span className="text-[10px] uppercase tracking-wider opacity-80">Concluído</span>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">local_offer</span>
              <span className="text-sm font-medium">Ganhe 15% no próximo banho!</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar animate-slideUp stagger-2">
          {filters.map((filter, index) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeFilter === filter
                ? 'bg-primary text-white shadow-glow-sm'
                : 'bg-surface text-text-secondary shadow-soft hover:shadow-soft-md'
                }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Pet Shops */}
        <div className="flex items-center justify-between mb-4 animate-slideUp stagger-3">
          <h2 className="text-text-primary font-bold text-lg transition-colors duration-300">
            {petShops.length > 0 ? `Pet Shops em ${userLocation.city}` : 'Nenhum local encontrado'}
          </h2>
          {petShops.length > 0 && (
            <button onClick={() => navigate('/vets')} className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200">
              Ver Mapa
              <span className="material-symbols-outlined text-sm">map</span>
            </button>
          )}
        </div>

        {petShops.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 bg-surface rounded-3xl animate-fadeIn">
            <span className="material-symbols-outlined text-4xl text-text-muted mb-2">storefront</span>
            <p className="text-text-secondary font-medium">Nenhum pet shop encontrado nesta região.</p>
            <p className="text-text-muted text-xs mt-1">Tente mudar sua localização no Perfil.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {petShops.map((shop, index) => (
              <div
                key={shop.id}
                className="bg-surface rounded-3xl shadow-soft overflow-hidden transition-all duration-300 hover:shadow-soft-lg animate-slideUp group cursor-pointer"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
                onClick={() => navigate('/agenda')}
              >
                <div
                  className="h-40 bg-cover bg-center relative"
                  style={{ backgroundImage: `url("${shop.image}")` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3 bg-surface/95 dark:bg-surface-elevated/95 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-soft">
                    <span className="material-symbols-outlined text-warning text-sm material-symbols-fill">star</span>
                    <span className="text-text-primary text-sm font-bold">{shop.rating}</span>
                    <span className="text-text-muted text-xs">({shop.reviewCount})</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <h3 className="text-white font-bold text-lg drop-shadow-lg">{shop.name}</h3>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm ${shop.status === 'open' ? 'bg-success/90 text-white' : 'bg-danger/90 text-white'
                      }`}>
                      {shop.status === 'open' ? 'Aberto' : 'Fechado'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                    <span className="text-text-secondary text-sm font-medium">{shop.distance}</span>
                    <span className="text-text-muted">•</span>
                    <span className="text-text-muted text-sm">{shop.city}, {shop.stateCode}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {shop.services.slice(0, 3).map((service) => (
                      <span key={service} className="bg-background dark:bg-surface-elevated text-text-secondary text-xs font-medium px-3 py-1.5 rounded-lg">
                        {service}
                      </span>
                    ))}
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white py-3.5 rounded-2xl font-bold shadow-glow-sm hover:shadow-glow active:scale-[0.98] transition-all duration-300">
                    <span className="material-symbols-outlined">calendar_add_on</span>
                    <span>Agendar Banho</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BathAndGrooming;
