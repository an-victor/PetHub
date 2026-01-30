import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clinics, getClinicsByState } from '@/src/data';
import { getSavedLocation } from '@/src/services/location';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet Icon Issue
const vetIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149060.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

// Component to handle map updates
const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

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

  const getStatusText = (clinic: any) => {
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

      {/* Map Implementation (Leaflet) */}
      <div className="px-5 pb-4 animate-slideUp stagger-3 relative z-10">
        <div className="w-full h-56 rounded-3xl overflow-hidden shadow-soft-lg border-2 border-white relative z-0">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossOrigin="" />

          <MapContainer
            center={userLocation.coordinates ? [userLocation.coordinates.latitude, userLocation.coordinates.longitude] : [-25.4284, -49.2733]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ width: '100%', height: '100%' }}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* User Location Marker */}
            {userLocation.coordinates && (
              <Marker position={[userLocation.coordinates.latitude, userLocation.coordinates.longitude]} icon={userIcon}>
                <Popup>Você está aqui!</Popup>
              </Marker>
            )}

            {/* Clinic Markers */}
            {localClinics.map((clinic) => (
              <Marker
                key={clinic.id}
                position={[-25.4284 + (Math.random() * 0.05 - 0.025), -49.2733 + (Math.random() * 0.05 - 0.025)]} // Mock coords around center
                icon={vetIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedClinic(clinic.id);
                  },
                }}
              >
                <Popup>
                  <strong>{clinic.name}</strong><br />
                  {clinic.rating} ⭐ ({clinic.reviewCount})
                </Popup>
              </Marker>
            ))}
            <MapUpdater center={userLocation.coordinates ? [userLocation.coordinates.latitude, userLocation.coordinates.longitude] : [-25.4284, -49.2733]} />
          </MapContainer>
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
                  <a
                    href={`https://wa.me/55${clinic.phone.replace(/\D/g, '')}?text=Olá, encontrei a clínica no PetHub e gostaria de agendar uma consulta.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { e.stopPropagation(); }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3.5 rounded-2xl font-bold shadow-glow-sm hover:shadow-glow active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-5 h-5 filter brightness-0 invert" alt="WhatsApp" />
                    Chamar no WhatsApp
                  </a>
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
