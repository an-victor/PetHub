import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { LocationSettings } from '@/src/components/settings';
import { LevelProgress } from '@/src/components/gamification';
import { useGamification } from '@/src/contexts';
import { pets, currentUser } from '@/src/data';
import { getSavedLocation } from '@/src/services/location';
import { levelDefinitions } from '@/src/data/gamification';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { setIsPetFormOpen } = useAppContext();
  const [isLocationSettingsOpen, setIsLocationSettingsOpen] = React.useState(false);
  const userLocation = getSavedLocation();
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userPets = pets.filter(p => p.ownerId === currentUser.id);
  const { userLevel } = useGamification();
  const currentLevelDef = levelDefinitions.find(l => l.level === (userLevel?.currentLevel || 1));

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        // Here you would typically upload the file to your backend
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col pb-28 min-h-screen bg-background transition-colors duration-300">
      {/* Header with Gradient */}
      <div className="relative bg-gradient-to-br from-primary via-primary to-primary-dark pt-12 pb-24 px-5 animate-fadeIn">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex size-11 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 active:scale-95 transition-all duration-200"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        {/* Settings Gear Button - NOW WORKING */}
        <button
          onClick={() => navigate('/settings')}
          className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 active:scale-95 transition-all duration-200"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>

        <div className="flex flex-col items-center text-white animate-slideUp stagger-1">
          <div className="relative group">
            <div
              className="w-28 h-28 rounded-3xl bg-white border-4 border-white shadow-xl bg-cover bg-center group-hover:brightness-90 transition-all cursor-pointer"
              style={{ backgroundImage: `url("${avatar}")` }}
              onClick={handleAvatarClick}
            ></div>
            <button
              onClick={handleAvatarClick}
              className="absolute -bottom-1 -right-1 bg-white text-primary p-2.5 rounded-xl shadow-lg border-2 border-white hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <span className="material-symbols-outlined text-lg">edit</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <h2 className="text-2xl font-bold mt-4">{currentUser.name}</h2>
          <p className="text-white/70 text-sm font-medium">{currentUser.username}</p>

          {/* Level Badge */}
          {userLevel && (
            <button
              onClick={() => navigate('/gamification')}
              className="mt-3 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl flex items-center gap-2 hover:bg-white/30 transition-colors"
            >
              <span className="text-lg">{currentLevelDef?.badge}</span>
              <span className="text-white font-semibold text-sm">Nível {userLevel.currentLevel}</span>
              <span className="text-white/70 text-xs">• {userLevel.availablePoints} 🐾</span>
            </button>
          )}
        </div>

        <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-white/10 rounded-full"></div>
        <div className="absolute left-10 bottom-0 w-24 h-24 bg-white/5 rounded-full"></div>
      </div>

      {/* User Info Card */}
      <div className="px-5 -mt-14 relative z-10 animate-slideUp stagger-2">
        <div className="bg-surface rounded-3xl shadow-soft-lg p-5 transition-colors duration-300">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider">Email</p>
                <p className="text-text-primary font-medium text-sm">{currentUser.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">call</span>
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider">Telefone</p>
                <p className="text-text-primary font-medium text-sm">{currentUser.phone || '(41) 99999-9999'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 cursor-pointer hover:bg-background rounded-xl transition-colors" onClick={() => setIsLocationSettingsOpen(true)}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div className="flex-1">
                <p className="text-text-muted text-xs uppercase tracking-wider">Localização</p>
                <p className="text-text-primary font-medium text-sm">{userLocation.city}, {userLocation.stateCode}</p>
              </div>
              <span className="material-symbols-outlined text-primary text-sm">edit</span>
            </div>
          </div>
        </div>
      </div>

      {/* My Pets */}
      <div className="px-5 pt-6 animate-slideUp stagger-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-text-primary font-bold text-lg transition-colors duration-300">Meus Pets</h3>
          <button
            onClick={() => setIsPetFormOpen(true)}
            className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
          >
            Adicionar Novo
            <span className="material-symbols-outlined text-sm">add_circle</span>
          </button>
        </div>

        <div className="space-y-4">
          {userPets.map((pet, index) => (
            <div
              key={pet.id}
              onClick={() => navigate(`/pet/${pet.id}`)}
              className="bg-surface rounded-2xl p-4 shadow-soft flex items-center gap-4 cursor-pointer hover:shadow-soft-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img src={pet.avatar} alt={pet.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/20" />
              <div className="flex-1">
                <h4 className="text-text-primary font-bold text-lg transition-colors duration-300">{pet.name}</h4>
                <p className="text-text-muted text-sm transition-colors duration-300">{pet.breed} • {pet.age}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">chevron_right</span>
              </div>
            </div>
          ))}

          {userPets.length === 0 && (
            <div className="text-center py-8 bg-surface rounded-2xl border-2 border-dashed border-border">
              <p className="text-text-muted text-sm mb-2">Você ainda não tem pets cadastrados.</p>
              <button
                onClick={() => setIsPetFormOpen(true)}
                className="text-primary font-bold hover:underline"
              >
                Cadastrar agora
              </button>
            </div>
          )}
        </div>
      </div>

      <LocationSettings
        isOpen={isLocationSettingsOpen}
        onClose={() => setIsLocationSettingsOpen(false)}
      />
    </div>
  );
};

export default Profile;
