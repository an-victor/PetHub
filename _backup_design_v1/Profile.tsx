
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    { icon: 'pets', label: 'Meus Pets', path: '/vaccines', badge: '2' },
    { icon: 'notifications', label: 'Notificações', path: '#', toggle: true },
    { icon: 'dark_mode', label: 'Modo Escuro', path: '#', toggle: true, isOn: darkMode },
    { icon: 'help', label: 'Ajuda & Suporte', path: '#' },
    { icon: 'privacy_tip', label: 'Privacidade', path: '#' },
    { icon: 'info', label: 'Sobre o App', path: '#' },
  ];

  const stats = [
    { value: '2', label: 'Pets' },
    { value: '8', label: 'Vacinas' },
    { value: '12', label: 'Consultas' },
  ];

  return (
    <div className="flex flex-col pb-24 bg-background-light dark:bg-background-dark min-h-screen">
      {/* Header com Gradiente */}
      <div className="relative bg-gradient-to-br from-primary to-accent-yellow pt-12 pb-20 px-4">
        <div className="absolute top-4 right-4">
          <button className="flex size-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
        
        <div className="flex flex-col items-center text-white">
          <div className="relative">
            <div 
              className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-xl bg-cover bg-center"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD92u6__KXrIa8H6BpnLvP3Lf-pQWB8AvIYaKaQaQHsRyG8WL8E8_fBXSwX82FHy9CJkOX5SzE2wxW4302Zu2lhgABfInMDeRwK4KXnqkcCpXmeKUuef5XFIFIlaRT8K75t6658Fe6DWuliERvUTCZF0nHHRnI3bUwnbANykK_iTVFp2ih-Y1gTkOFcbHPlxxCVBweHmncfIVqn04HHByOeWh25_brWLxVCSBMH9-QBEFe64wX3263MOoJwhYxgYWLpPUuKYrnN5Atd")' }}
            ></div>
            <button className="absolute bottom-0 right-0 bg-white text-primary p-1.5 rounded-full shadow-lg border-2 border-white">
              <span className="material-symbols-outlined text-lg">edit</span>
            </button>
          </div>
          <h2 className="text-2xl font-bold mt-4">Maria Silva</h2>
          <p className="text-white/80 text-sm">@maria.pets</p>
        </div>
      </div>

      {/* Stats Card */}
      <div className="px-4 -mt-10 relative z-10">
        <div className="bg-white dark:bg-[#2d2218] rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-[#3d2e21]">
          <div className="flex justify-around">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-2xl font-black text-primary">{stat.value}</span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meus Pets */}
      <div className="px-4 pt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">Meus Pets</h3>
          <span className="text-primary text-sm font-bold cursor-pointer">Ver todos</span>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {/* Pet 1 */}
          <div className="shrink-0 bg-white dark:bg-[#2d2218] rounded-xl p-3 shadow-sm border border-gray-100 dark:border-[#3d2e21] flex items-center gap-3 min-w-[180px]">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5n3qQRfTBx2PvsUgS4ObKBJnt_Ny7cTDsNzJDTpDEVp_pnYj2dySpOPcLoS34HrGAgGm2DhevJjFbo3Qr7CPvCG3ugGXn55-WqPFX7eF6_Li_Bll4zT0GmlxWslWIB28oXOtmvw2EI8pRvFN6bTbCrzHOoWZZZ6rCWdq6d6X-RLgwUBebaJa7qtmu03VJ4nFoRSYTOrVAqqPQdYT6yNoycG2wybMu0hPV_0FMB9g7EE2Ft4rJrW-5wSqfEVzg05NBCVnkZDtBAmsd"
              alt="Max"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
            />
            <div>
              <p className="font-bold text-sm">Max</p>
              <p className="text-xs text-gray-500">Golden Retriever</p>
            </div>
          </div>
          
          {/* Pet 2 */}
          <div className="shrink-0 bg-white dark:bg-[#2d2218] rounded-xl p-3 shadow-sm border border-gray-100 dark:border-[#3d2e21] flex items-center gap-3 min-w-[180px]">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYqaodse2MOVUmzTz73w6ntEu1vdleJeBbtaozJuHs_XfYh670ZmpRVWDzGQswTslxmB61vqhbjvSYkIFZD8eQ38X92pEQ_ql_xVWY2Sp0pLmLfY9fREb29_KvMNIQLL2tLnFrxdyjHdbwZCVVkaR66Erwrd_O5chI_OfX0WzVz1cYxLQVQqZQWwd-dtWTq6PjRO4vDTliX2gGijGRG9p68wHDurwlM_Ynoa3Gr45bvjEt8KwcQndpuKXluEHS0NjqlJSkshlOnKOO"
              alt="Luna"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
            />
            <div>
              <p className="font-bold text-sm">Luna</p>
              <p className="text-xs text-gray-500">Gata SRD</p>
            </div>
          </div>

          {/* Add Pet Button */}
          <div className="shrink-0 bg-primary/10 rounded-xl p-3 border-2 border-dashed border-primary/30 flex items-center justify-center min-w-[80px] cursor-pointer hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-primary text-2xl">add</span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 pt-6">
        <h3 className="text-lg font-bold mb-3">Configurações</h3>
        <div className="bg-white dark:bg-[#2d2218] rounded-2xl shadow-sm border border-gray-100 dark:border-[#3d2e21] overflow-hidden">
          {menuItems.map((item, index) => (
            <button 
              key={index}
              onClick={() => {
                if (item.label === 'Modo Escuro') {
                  setDarkMode(!darkMode);
                  document.documentElement.classList.toggle('dark');
                } else if (item.path !== '#') {
                  navigate(item.path);
                }
              }}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#3d2e21] transition-colors ${index !== menuItems.length - 1 ? 'border-b border-gray-100 dark:border-[#3d2e21]' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                )}
                {item.toggle ? (
                  <div className={`w-12 h-7 rounded-full p-1 transition-colors ${item.isOn ? 'bg-primary' : 'bg-gray-200'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${item.isOn ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                ) : (
                  <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 pt-6 pb-8">
        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-red-200 text-red-500 font-bold hover:bg-red-50 transition-colors">
          <span className="material-symbols-outlined">logout</span>
          <span>Sair da Conta</span>
        </button>
      </div>

      {/* Versão */}
      <div className="text-center pb-4">
        <p className="text-xs text-gray-400">PetHub v1.0.0</p>
      </div>
    </div>
  );
};

export default Profile;
