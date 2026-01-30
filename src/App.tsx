import React, { useEffect, useState, useRef, createContext, useContext, Suspense, lazy } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { OfflineService } from '@/src/services/offlineStorage';
import { PetService } from '@/src/services/petService';
import { Loading } from '@/src/components/ui';
import { Toaster, toast } from 'sonner';

// Lazy Load Heavy Components
const NutritionCalculator = lazy(() => import('./screens/NutritionCalculator'));
const BreedScanner = lazy(() => import('./screens/BreedScanner'));

import Home from './screens/Home';
import Nutrition from './screens/Nutrition';
import Vaccines from './screens/Vaccines';
import Vets from './screens/Vets';
import Appointments from './screens/Appointments';
import BathAndGrooming from './screens/BathAndGrooming';
import Training from './screens/Training';
import Adoption from './screens/Adoption';
import Donation from './screens/Donation';
import Encyclopedia from './screens/Encyclopedia';
import BreedDetails from './screens/BreedDetails';
import Chat from './screens/Chat';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import Login from './screens/Login';
import Register from './screens/Register';
import MyPets from './screens/MyPets';
import Pets from './screens/Pets';
import PetDetails from './screens/PetDetails';
import DigitalID from './screens/DigitalID';
import Gamification from './screens/Gamification';
import Missions from './screens/Missions';
import Rewards from './screens/Rewards';
import Leaderboard from './screens/Leaderboard';
import BadgesScreen from './screens/Badges';
import PointsHistory from './screens/PointsHistory';

import Premium from './screens/Premium';
import { SideMenu, BottomNav } from '@/src/components/layout';
import { PetForm, VaccineForm } from '@/src/components/forms';
import { GamificationFeedback } from '@/src/components/gamification';
import { PrivateRoute } from '@/src/components/auth';
import { GamificationProvider } from '@/src/contexts';
import { initializeGamification } from '@/src/services/gamification';
import { isAuthenticated as checkAuth, getCurrentUser } from '@/src/services/auth';

// ... (Contexts and BottomNav remain unchanged)
const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('pethub-dark-mode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('pethub-dark-mode', JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return [isDark, setIsDark] as const;
};

interface AppContextType {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  isPetFormOpen: boolean;
  setIsPetFormOpen: (value: boolean) => void;
  isVaccineFormOpen: boolean;
  setIsVaccineFormOpen: (value: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
  isDark: false,
  setIsDark: () => { },
  isMenuOpen: false,
  setIsMenuOpen: () => { },
  isPetFormOpen: false,
  setIsPetFormOpen: () => { },
  isVaccineFormOpen: false,
  setIsVaccineFormOpen: () => { },
  isAuthenticated: true,
  setIsAuthenticated: () => { },
});

export const useAppContext = () => useContext(AppContext);

export const DarkModeContext = createContext<{
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}>({ isDark: false, setIsDark: () => { } });



const AppContent: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen, isPetFormOpen, setIsPetFormOpen, isVaccineFormOpen, setIsVaccineFormOpen } = useAppContext();
  const { user } = useUser();

  const handlePetSubmit = async (data: Record<string, any>) => {
    // Use clean service logic
    const result = await PetService.createPet(data as any, user);

    if (result.mode === 'online') {
      toast.success(`Pet sincronizado com a nuvem! ID: ${result.data.id}`);
    } else {
      toast.success('Pet salvo localmente! 🐾 (Sincronização pendente)');
    }
  };

  const handleVaccineSubmit = async (data: Record<string, any>) => {
    // Use clean service logic
    const result = await PetService.createVaccine(data as any);

    if (result.mode === 'online') {
      toast.success('Vacina sincronizada com a nuvem! 💉');
    } else if (result.reason === 'local_pet_id') {
      toast.success('Vacina registrada localmente! 💉 (O pet ainda não foi sincronizado)');
    } else {
      toast.success('Vacina salva localmente! 💉 (Sincronização pendente)');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background flex justify-center transition-colors duration-300">
        <div className="relative w-full max-w-[480px] min-h-screen bg-background flex flex-col overflow-x-hidden transition-colors duration-300">
          <Suspense fallback={<Loading fullScreen text="Carregando PetHub..." />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/vaccines" element={<Vaccines />} />
              <Route path="/vets" element={<Vets />} />
              <Route path="/agenda" element={<Appointments />} />
              <Route path="/bath" element={<BathAndGrooming />} />
              <Route path="/training" element={<Training />} />
              <Route path="/adoption" element={<Adoption />} />
              <Route path="/donation" element={<Donation />} />
              <Route path="/encyclopedia" element={<Encyclopedia />} />
              <Route path="/breed/:id" element={<BreedDetails />} />
              <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/pets" element={<PrivateRoute><Pets /></PrivateRoute>} />
              <Route path="/my-pets/:type" element={<PrivateRoute><MyPets /></PrivateRoute>} />
              <Route path="/pet/:id" element={<PrivateRoute><PetDetails /></PrivateRoute>} />
              <Route path="/pet/:id/id-card" element={<PrivateRoute><DigitalID /></PrivateRoute>} />
              <Route path="/gamification" element={<PrivateRoute><Gamification /></PrivateRoute>} />
              <Route path="/missions" element={<PrivateRoute><Missions /></PrivateRoute>} />
              <Route path="/rewards" element={<PrivateRoute><Rewards /></PrivateRoute>} />
              <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
              <Route path="/badges" element={<PrivateRoute><BadgesScreen /></PrivateRoute>} />
              <Route path="/points-history" element={<PrivateRoute><PointsHistory /></PrivateRoute>} />
              <Route path="/nutrition-calculator" element={<NutritionCalculator />} />
              <Route path="/breed-scanner" element={<BreedScanner />} />
              <Route path="/premium" element={<Premium />} />
            </Routes>
          </Suspense>

          <BottomNav />

          <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

          <PetForm
            isOpen={isPetFormOpen}
            onClose={() => setIsPetFormOpen(false)}
            onSubmit={handlePetSubmit}
          />

          <VaccineForm
            isOpen={isVaccineFormOpen}
            onClose={() => setIsVaccineFormOpen(false)}
            onSubmit={handleVaccineSubmit}
          />
        </div>
      </div>
    </>
  );
};

const App: React.FC = () => {
  const [isDark, setIsDark] = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPetFormOpen, setIsPetFormOpen] = useState(false);
  const [isVaccineFormOpen, setIsVaccineFormOpen] = useState(false);

  // Clerk Integration
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setIsAuthenticated(!!isSignedIn);
    }
  }, [isLoaded, isSignedIn]);

  // Sync Clerk user with local system if needed
  useEffect(() => {
    if (isSignedIn && user) {
      import('@/src/services/auth').then(({ syncUserToSupabase }) => {
        syncUserToSupabase(user);
      });

      // Sync Offline Data
      import('@/src/services/dataSync').then(({ DataSyncService }) => {
        DataSyncService.syncAll();
      });
    }
  }, [isSignedIn, user]);

  const isPremium = (user?.publicMetadata?.isPremium as boolean) || false;

  useEffect(() => {
    initializeGamification();
  }, []);

  const appContextValue = {
    isDark,
    setIsDark,
    isMenuOpen,
    setIsMenuOpen,
    isPetFormOpen,
    setIsPetFormOpen,
    isVaccineFormOpen,
    setIsVaccineFormOpen,
    isAuthenticated,
    setIsAuthenticated
  };

  return (
    <HashRouter>
      <AppContext.Provider value={appContextValue}>
        <DarkModeContext.Provider value={{ isDark, setIsDark }}>
          <GamificationProvider isPremium={isPremium}>
            <Toaster position="top-center" richColors />
            <AppContent />
            <GamificationFeedback />
          </GamificationProvider>
        </DarkModeContext.Provider>
      </AppContext.Provider>
    </HashRouter>
  );
};

export default App;
