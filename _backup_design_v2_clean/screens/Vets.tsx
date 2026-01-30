import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { clinics, getClinicsByState } from '@/src/data';
import { getSavedLocation } from '@/src/services/location';

const Vets: React.FC = () => {
  const navigate = useNavigate();
  const [selectedClinic, setSelectedClinic] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const userLocation = getSavedLocation();

  // Filter clinics by user's state
  const localClinics = useMemo(() => {
    let result = getClinicsByState(userLocation.stateCode);

    // If no clinics in user's state, show all
    if (result.length === 0) {
      result = clinics;
    }

    // Filter by search
    if (searchQuery) {
      result = result.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return result;
  }, [userLocation.stateCode, searchQuery]);

  const getStatusColor = (status: 'open' | 'closed') => {
    return status === 'open' ? 'text-success' : 'text-danger';
  };

  const getStatusText = (clinic: typeof clinics[0]) => {
    if (clinic.status === 'closed') return 'Fechado';
    if (clinic.openingHours === '24 horas') return '24 horas';
    return 'Aberto';
  };

  return (
    <div className="flex flex-col pb-28 min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="bg-surface shadow-soft sticky top-0 z-20 transition-colors duration-300 animate-slideDown">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="flex size-11 items-center justify-center rounded-xl hover:bg-background active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined text-text-primary transition-colors duration-300">arrow_back_ios</span>
          </button>
          <h1 className="text-text-primary text-lg font-bold transition-colors duration-300">Veterinários</h1>
          <button className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>
      </header>

      {/* Location Indicator */}
      <div className="px-5 pt-4 animate-slideUp stagger-1">
        <div className="flex items-center gap-2 text-text-secondary text-sm">
          <span className="material-symbols-outlined text-primary text-lg">location_on</span>
          <span>Mostrando clínicas em <strong className="text-text-primary">{userLocation.city}, {userLocation.stateCode}</strong></span>
        </div>
      </div>

      {/* Search */}
      <div className="px-5 py-4 animate-slideUp stagger-2">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface rounded-2xl py-4 pl-12 pr-4 text-sm shadow-soft border-2 border-transparent placeholder:text-text-muted focus:border-primary focus:shadow-glow-sm transition-all duration-300 text-text-primary"
            placeholder="Buscar clínica ou especialidade..."
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="px-5 pb-4 animate-slideUp stagger-3">
        <div
          className="relative w-full h-56 rounded-3xl overflow-hidden shadow-soft-lg bg-cover bg-center"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCZe6lnmhsjk-TlXimxZ9Nc-Xo-O2hgt0jUNP5PXQrtV8iJctoW5YnEZ1WmRYb1VB2Bkl5NHENNjx2FNvAussWo8YDJyVSYS4BmA0mwJKxVODjjWcLgevJoG6irjqaEpIK_IGxCWE-AtjE_Lt2JMy_bJ0Dlzo-FZd3GHZjgJlVstSv9nUumbLun88AnClnPfwZXk-M0M--6K4ZfCMUW3iAE8JlliU4xFa0KzsZbEOuU7D32EGKNGn_T9bvGuED8hxcz_Mwtwg8EprhW")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>

          {/* Map Pins */}
          {localClinics.slice(0, 3).map((clinic, index) => (
            <button
              key={clinic.id}
              onClick={() => setSelectedClinic(clinic.id)}
              className={`absolute bg-gradient-to-br from-primary to-primary-dark text-white p-2.5 rounded-xl shadow-glow border-2 border-white transition-all duration-300 ${selectedClinic === clinic.id ? 'scale-125 z-10' : 'hover:scale-110'
                }`}
              style={{
                top: `${20 + index * 25}%`,
                left: `${25 + index * 20}%`
              }}
            >
              <span className="material-symbols-outlined text-sm material-symbols-fill">pets</span>
            </button>
          ))}

          {/* Current Location */}
          <div className="absolute bottom-4 right-4 bg-surface/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-soft flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">my_location</span>
            <span className="text-text-primary text-xs font-semibold">{userLocation.city}</span>
          </div>
        </div>
      </div>

      {/* Clinics List */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-4 animate-slideUp stagger-4">
          <h2 className="text-text-primary font-bold text-lg transition-colors duration-300">Clínicas Disponíveis</h2>
          <span className="text-primary text-sm font-semibold">{localClinics.length} encontradas</span>
        </div>

        {localClinics.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fadeIn">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-5xl text-primary">search_off</span>
            </div>
            <p className="text-text-primary font-semibold text-lg mb-1">Nenhuma clínica encontrada</p>
            <p className="text-text-muted text-sm">Tente outro termo de busca</p>
          </div>
        ) : (
          <div className="space-y-4">
            {localClinics.map((clinic, index) => (
              <div
                key={clinic.id}
                className={`bg-surface rounded-3xl shadow-soft overflow-hidden transition-all duration-300 hover:shadow-soft-lg cursor-pointer animate-slideUp ${selectedClinic === clinic.id ? 'ring-2 ring-primary' : ''
                  }`}
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
                onClick={() => setSelectedClinic(clinic.id)}
              >
                <div
                  className="h-36 bg-cover bg-center relative"
                  style={{ backgroundImage: `url("${clinic.image}")` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3 bg-surface/95 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-soft">
                    <span className="material-symbols-outlined text-warning text-sm material-symbols-fill">star</span>
                    <span className="text-text-primary text-sm font-bold">{clinic.rating}</span>
                    <span className="text-text-muted text-xs">({clinic.reviewCount})</span>
                  </div>
                  {clinic.emergency && (
                    <div className="absolute top-3 right-3 bg-danger text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg uppercase tracking-wider shadow-lg">
                      Emergência
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-lg drop-shadow-lg">{clinic.name}</h3>
                    <p className="text-white/80 text-xs">{clinic.city}, {clinic.stateCode}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                      <span className="text-text-secondary text-sm font-medium">{clinic.distance}</span>
                    </div>
                    <span className={`text-sm font-bold ${getStatusColor(clinic.status)}`}>
                      {getStatusText(clinic)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {clinic.services.slice(0, 3).map((spec) => (
                      <span key={spec} className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-lg">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate('/agenda'); }}
                    className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3.5 rounded-2xl font-bold shadow-glow-sm hover:shadow-glow active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">calendar_add_on</span>
                    Agendar Agora
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vets;
