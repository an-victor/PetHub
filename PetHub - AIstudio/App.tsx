
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: 'HOME', icon: 'home', path: '/' },
    { name: 'AGENDA', icon: 'calendar_today', path: '/agenda' },
    { name: 'LOJA', icon: 'shopping_bag', path: '/nutrition' },
    { name: 'PERFIL', icon: 'person', path: '/profile' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-[#f4ede7] dark:border-[#3d2e21] py-3 pb-8 flex justify-around items-center z-50">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => navigate(tab.path)}
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive(tab.path) ? 'text-primary' : 'text-[#9c7349] dark:text-[#d1b394]'
          }`}
        >
          <span className={`material-symbols-outlined ${isActive(tab.path) ? 'material-symbols-fill' : ''}`}>
            {tab.icon}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider">{tab.name}</span>
        </button>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 flex justify-center">
        <div className="relative w-full max-w-[480px] min-h-screen bg-white dark:bg-background-dark shadow-2xl flex flex-col overflow-x-hidden">
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
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<div className="p-8 text-center">Perfil do Usuário - Em Breve</div>} />
          </Routes>
          
          {/* Bottom Nav is shown on most main screens */}
          <ConditionalBottomNav />
        </div>
      </div>
    </HashRouter>
  );
};

const ConditionalBottomNav = () => {
  const location = useLocation();
  const hideOn = ['/chat', '/breed'];
  const shouldHide = hideOn.some(path => location.pathname.startsWith(path));
  
  if (shouldHide) return null;
  return <BottomNav />;
};

export default App;
