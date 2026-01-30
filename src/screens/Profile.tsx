import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { LocationSettings } from '@/src/components/settings';
import { supabase } from '@/src/services/supabase';
import { useGamification } from '@/src/contexts';
import { pets } from '@/src/data';
import { getSavedLocation } from '@/src/services/location';
import { levelDefinitions } from '@/src/data/gamification';
import { useUser, useClerk } from '@clerk/clerk-react';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { setIsPetFormOpen } = useAppContext();
  const { user } = useUser();
  const { signOut } = useClerk();

  const [isLocationSettingsOpen, setIsLocationSettingsOpen] = React.useState(false);

  // DB Status State
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [dbError, setDbError] = useState<string>('');

  // Check Connection on Mount
  React.useEffect(() => {
    const check = async () => {
      try {
        const { error, status } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
        if (error && status !== 406) {
          throw error;
        } else {
          setDbStatus('connected');
          setDbError('');
        }
      } catch (e: any) {
        console.error("Supabase Error:", e);
        setDbStatus('error');
        setDbError(e.message || 'Falha na conexão. Verifique .env e se rodou o SQL.');
      }
    };
    check();
  }, []);

  const userLocation = getSavedLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userPets = pets.filter(p => p.ownerId === user?.id); // Using Clerk ID for mapping
  const { userLevel } = useGamification();
  const currentLevelDef = levelDefinitions.find(l => l.level === (userLevel?.currentLevel || 1));

  const handleAvatarClick = () => {
    // Clerk handles avatar management via their profile component, but we keep this visual for now
    // or trigger Clerk's user profile modal
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
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

        {/* Edit Button */}
        <button
          onClick={() => setIsPetFormOpen(true)}
          className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 active:scale-95 transition-all duration-200"
        >
          <span className="material-symbols-outlined">edit</span>
        </button>

        <div className="flex flex-col items-center text-white animate-slideUp stagger-1">
          <div className="relative group">
            <div
              className="w-28 h-28 rounded-3xl bg-white border-4 border-white shadow-xl bg-cover bg-center group-hover:brightness-90 transition-all cursor-pointer"
              style={{ backgroundImage: `url("${user?.imageUrl}")` }}
            ></div>
            <button
              className="absolute -bottom-1 -right-1 bg-white text-primary p-2.5 rounded-xl shadow-lg border-2 border-white hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <span className="material-symbols-outlined text-lg">edit</span>
            </button>
          </div>
          <h2 className="text-2xl font-bold mt-4">{user?.fullName || user?.firstName}</h2>
          <p className="text-white/70 text-sm font-medium">{user?.username || user?.primaryEmailAddress?.emailAddress}</p>

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
                <p className="text-text-primary font-medium text-sm">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">call</span>
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider">Telefone</p>
                <p className="text-text-primary font-medium text-sm">{user?.primaryPhoneNumber?.phoneNumber || '(41) 99999-9999'}</p>
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

      {/* Database Status Indicator */}
      <div className="px-5 pb-8 mt-8 text-center animate-fadeIn opacity-80 flex flex-col items-center gap-1">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${dbStatus === 'connected' ? 'bg-green-50 border-green-200 text-green-700' :
          dbStatus === 'error' ? 'bg-red-50 border-red-200 text-red-700' :
            'bg-gray-50 border-gray-200 text-gray-700'
          }`}>
          <span className="material-symbols-outlined text-[10px]">
            {dbStatus === 'connected' ? 'wifi' : dbStatus === 'error' ? 'wifi_off' : 'sync'}
          </span>
          Supabase: {dbStatus === 'connected' ? 'Conectado' : dbStatus === 'error' ? 'Erro' : 'Verificando...'}
        </div>
        {dbStatus === 'error' && (
          <p className="text-[10px] text-red-500 font-medium max-w-[250px] leading-tight">
            {dbError}
          </p>
        )}
      </div>

      <LocationSettings
        isOpen={isLocationSettingsOpen}
        onClose={() => setIsLocationSettingsOpen(false)}
      />

      {/* Logout Button */}
      <div className="px-5 mt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-4 rounded-3xl border border-rose-200 transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined">logout</span>
          Sair da Conta
        </button>
      </div>
    </div>
  );
};

export default Profile;
