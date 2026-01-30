
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
  image?: string;
}

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! O Max é muito dócil e adora crianças. Você tem espaço no quintal para ele brincar?',
      sender: 'other',
      time: '10:30'
    },
    {
      id: '2',
      text: 'Oi, Ana! Sim, temos um quintal bem grande e totalmente seguro. Vou te mandar uma foto!',
      sender: 'me',
      time: '10:32'
    },
    {
      id: '3',
      text: '',
      sender: 'me',
      time: '10:33',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEEOvITv42RIYUgtJ1ooXkakDYJoxdVldoL0PA4r2ICZpzCuNnjtMn4SIp5h8QXhk7JJw3pWrm3xQDXs2dTP11-QUMvj9aTXOOUI2sScKIuaYbGMpvTVVlhNTWeOIbOvCfMikahqEJm0sCQISCZcTABWe_eFlaCUughtZSVomNN4MoLkpZDuTtxn_D1Z4oIn2c2FtkHIImiPVzfoUvOl7N672zscor2GkScmSCw8jLCnWNxsOuDy-oMwfbFUTzhPt3jUEUfHTOQS8l'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (msg.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: msg,
      sender: 'me',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMsg('');

    // Simular resposta automática após 1.5 segundos
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Que ótimo! Fico feliz em saber que você tem um bom espaço para ele! 🐕',
        sender: 'other',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, autoReply]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-20 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="text-primary flex size-10 items-center">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <div className="flex flex-col items-center flex-1">
          <h2 className="text-base font-bold">Conversa sobre: Max</h2>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-green-500 text-[11px] font-medium uppercase tracking-wider">Online agora</p>
          </div>
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

        {messages.map((message) => (
          <div key={message.id} className={`flex items-end gap-2 ${message.sender === 'me' ? 'justify-end' : ''}`}>
            {message.sender === 'other' && (
              <img src="https://picsum.photos/seed/ana/40" className="w-8 h-8 rounded-full shadow-sm" alt="Ana" />
            )}
            <div className={`flex flex-col gap-1 ${message.sender === 'me' ? 'items-end' : 'items-start'}`}>
              <p className={`text-[11px] font-bold uppercase ${message.sender === 'me' ? 'text-primary mr-2' : 'text-[#9c7349] ml-2'}`}>
                {message.sender === 'me' ? 'Eu' : 'Ana (Doadora)'}
              </p>

              {message.image ? (
                <div
                  className="bg-center bg-no-repeat aspect-video bg-cover rounded-xl w-full max-w-[280px] border-4 border-accent-yellow shadow-lg"
                  style={{ backgroundImage: `url("${message.image}")` }}
                ></div>
              ) : (
                <div className={`text-sm px-4 py-3 max-w-[280px] shadow-sm ${message.sender === 'me'
                    ? 'rounded-t-2xl rounded-bl-2xl rounded-br-sm bg-accent-yellow text-gray-900 font-medium'
                    : 'rounded-t-2xl rounded-br-2xl rounded-bl-sm bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
                  }`}>
                  {message.text}
                </div>
              )}

              <span className="text-[10px] text-gray-400 px-2">{message.time}</span>
            </div>
            {message.sender === 'me' && !message.image && (
              <img src="https://picsum.photos/seed/me/40" className="w-8 h-8 rounded-full shadow-sm" alt="Me" />
            )}
            {message.sender === 'me' && message.image && (
              <div className="w-8"></div>
            )}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/90 dark:bg-background-dark/90 backdrop-blur-md p-4 pb-8 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <button className="flex size-11 items-center justify-center rounded-full bg-gray-100 text-primary hover:bg-gray-200 transition-colors">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <div className="flex-1 relative">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full h-11 bg-gray-100 dark:bg-gray-800 border-none rounded-full px-5 text-sm focus:ring-2 focus:ring-primary/50"
              placeholder="Escreva uma mensagem..."
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={msg.trim() === ''}
            className={`flex size-11 items-center justify-center rounded-full shadow-lg transition-all ${msg.trim() === ''
                ? 'bg-gray-300 text-gray-500'
                : 'bg-primary text-white hover:bg-primary-dark active:scale-95'
              }`}
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
