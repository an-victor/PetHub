
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-20 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="text-primary flex size-10 items-center">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <div className="flex flex-col items-center flex-1">
          <h2 className="text-base font-bold">Conversa sobre: Max</h2>
          <p className="text-green-500 text-[11px] font-medium uppercase tracking-wider">Online agora</p>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full">
          <span className="material-symbols-outlined">info</span>
        </button>
      </header>

      <div className="flex items-center gap-3 bg-primary/10 px-4 py-3 mx-4 my-3 rounded-xl border border-primary/20">
        <div 
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12 border-2 border-white" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDEeoOk8BagLEIQs2tKJLqNvJq0C7XGTAierUzlOFVqDA-EQiJopJV--dSKvQAZaZe4KyviTaiGlOsg9AM05IlOxCas2acnWg6r1L4RbLvZfqo-ulqN68CZKvZeBMmIvW9dOr2vb_eia9oiglovbccm8O9tA-_u7Y2TfIWnOvGskycWsIWxIumM2S1abXChEaIVIp2jdiIXajUPfnw40l3VkOtO0iLd6JNN4XuD4O-bePi27VKY_0YbgCbVjPP0ypEItq83hbOcTVGJ")' }}
        ></div>
        <div className="flex flex-col flex-1">
          <p className="text-sm font-bold leading-none">Max</p>
          <p className="text-primary text-xs font-medium">Golden Retriever • 2 anos</p>
        </div>
        <button className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg text-primary text-xs font-bold border border-gray-100">Ver Perfil</button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-28">
        <div className="flex justify-center my-4">
          <span className="text-[11px] font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full uppercase tracking-widest">Hoje</span>
        </div>

        {/* Receiver */}
        <div className="flex items-end gap-2">
          <img src="https://picsum.photos/seed/ana/40" className="w-8 h-8 rounded-full shadow-sm" alt="Ana" />
          <div className="flex flex-col gap-1 items-start">
            <p className="text-[#9c7349] text-[11px] font-bold ml-2 uppercase">Ana (Doadora)</p>
            <div className="text-sm rounded-t-2xl rounded-br-2xl rounded-bl-sm px-4 py-3 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 max-w-[280px]">
              Olá! O Max é muito dócil e adora crianças. Você tem espaço no quintal para ele brincar?
            </div>
          </div>
        </div>

        {/* Me */}
        <div className="flex items-end gap-2 justify-end">
          <div className="flex flex-col gap-1 items-end">
            <p className="text-primary text-[11px] font-bold mr-2 uppercase">Eu</p>
            <div className="text-sm font-medium rounded-t-2xl rounded-bl-2xl rounded-br-sm px-4 py-3 bg-accent-yellow text-gray-900 shadow-sm max-w-[280px]">
              Oi, Ana! Sim, temos um quintal bem grande e totalmente seguro. Vou te mandar uma foto!
            </div>
          </div>
          <img src="https://picsum.photos/seed/me/40" className="w-8 h-8 rounded-full shadow-sm" alt="Me" />
        </div>

        {/* Me with Image */}
        <div className="flex items-end gap-2 justify-end">
          <div className="flex flex-col gap-1 items-end">
            <div 
              className="bg-center bg-no-repeat aspect-video bg-cover rounded-xl w-full max-w-[280px] border-4 border-accent-yellow shadow-lg"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCEEOvITv42RIYUgtJ1ooXkakDYJoxdVldoL0PA4r2ICZpzCuNnjtMn4SIp5h8QXhk7JJw3pWrm3xQDXs2dTP11-QUMvj9aTXOOUI2sScKIuaYbGMpvTVVlhNTWeOIbOvCfMikahqEJm0sCQISCZcTABWe_eFlaCUughtZSVomNN4MoLkpZDuTtxn_D1Z4oIn2c2FtkHIImiPVzfoUvOl7N672zscor2GkScmSCw8jLCnWNxsOuDy-oMwfbFUTzhPt3jUEUfHTOQS8l")' }}
            ></div>
          </div>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/90 dark:bg-background-dark/90 backdrop-blur-md p-4 pb-8 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <button className="flex size-11 items-center justify-center rounded-full bg-gray-100 text-primary">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <div className="flex-1 relative">
            <input 
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="w-full h-11 bg-gray-100 dark:bg-gray-800 border-none rounded-full px-5 text-sm" 
              placeholder="Escreva uma mensagem..." 
            />
          </div>
          <button className="flex size-11 items-center justify-center rounded-full bg-primary text-white shadow-lg">
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
