
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
  image?: string;
  status?: 'sending' | 'sent' | 'read';
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
      time: '10:30',
      status: 'read'
    },
    {
      id: '2',
      text: 'Oi, Ana! Sim, temos um quintal bem grande e totalmente seguro. Vou te mandar uma foto!',
      sender: 'me',
      time: '10:32',
      status: 'read'
    },
    {
      id: '3',
      text: '',
      sender: 'me',
      time: '10:33',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEEOvITv42RIYUgtJ1ooXkakDYJoxdVldoL0PA4r2ICZpzCuNnjtMn4SIp5h8QXhk7JJw3pWrm3xQDXs2dTP11-QUMvj9aTXOOUI2sScKIuaYbGMpvTVVlhNTWeOIbOvCfMikahqEJm0sCQISCZcTABWe_eFlaCUughtZSVomNN4MoLkpZDuTtxn_D1Z4oIn2c2FtkHIImiPVzfoUvOl7N672zscor2GkScmSCw8jLCnWNxsOuDy-oMwfbFUTzhPt3jUEUfHTOQS8l',
      status: 'read'
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
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sending'
    };

    setMessages([...messages, newMessage]);
    setMsg('');

    // Simulate message sent
    setTimeout(() => {
      setMessages(prev => prev.map(m =>
        m.id === newMessage.id ? { ...m, status: 'sent' } : m
      ));
    }, 500);

    // Auto reply
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Que ótimo! Fico feliz em saber que você tem um bom espaço para ele! 🐕',
        sender: 'other',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
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
    <div className="flex flex-col h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="bg-surface shadow-soft sticky top-0 z-20 transition-colors duration-300 animate-slideDown">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="flex size-11 items-center justify-center rounded-xl hover:bg-background active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined text-primary">arrow_back_ios</span>
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-text-primary font-semibold transition-colors duration-300">Conversa sobre: Max</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              <span className="text-success text-[10px] font-semibold uppercase tracking-wider">Online agora</span>
            </div>
          </div>
          <button className="flex size-11 items-center justify-center rounded-xl hover:bg-background transition-colors">
            <span className="material-symbols-outlined text-text-secondary">more_vert</span>
          </button>
        </div>
      </header>

      {/* Pet Info Card */}
      <div className="mx-5 my-3 animate-slideUp">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-3 flex items-center gap-3 border border-primary/20">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEeoOk8BagLEIQs2tKJLqNvJq0C7XGTAierUzlOFVqDA-EQiJopJV--dSKvQAZaZe4KyviTaiGlOsg9AM05IlOxCas2acnWg6r1L4RbLvZfqo-ulqN68CZKvZeBMmIvW9dOr2vb_eia9oiglovbccm8O9tA-_u7Y2TfIWnOvGskycWsIWxIumM2S1abXChEaIVIp2jdiIXajUPfnw40l3VkOtO0iLd6JNN4XuD4O-bePi27VKY_0YbgCbVjPP0ypEItq83hbOcTVGJ"
            alt="Max"
            className="w-12 h-12 rounded-xl border-2 border-white dark:border-surface-elevated shadow-soft object-cover"
          />
          <div className="flex-1">
            <p className="text-text-primary font-semibold text-sm transition-colors duration-300">Max</p>
            <p className="text-primary text-xs font-medium">Golden Retriever • 2 anos</p>
          </div>
          <button className="px-4 py-2 bg-surface dark:bg-surface-elevated rounded-xl text-primary text-xs font-bold shadow-soft hover:shadow-soft-md active:scale-95 transition-all duration-200">
            Ver Perfil
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 pb-28">
        <div className="flex justify-center my-4">
          <span className="bg-surface shadow-soft px-4 py-2 rounded-full text-text-muted text-[10px] font-bold uppercase tracking-wider transition-colors duration-300">
            Hoje
          </span>
        </div>

        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 animate-slideUp ${message.sender === 'me' ? 'justify-end' : ''}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {message.sender === 'other' && (
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHf8mNse6RRDiFhFi8O-r2AX0fF_Sia-vEmkDUWkOHtYTEVGjn04bOLjOk7p5ZKo7gaJwPrmgOldbFfSgMObdihrDyb0AGjMVoxc5csUEQv6LyCfi5843a3ZmtBH9M-LDKvwXghnCFJ1I2T6zGr5vGO0FluCPxaXBmnyPdlq2d6TfJEuGz1ukVcB2YVKiEC9oj8-TlcEtbt0nJWLEs71kAZMzvymv1I3ez6z0a9E8Vsn85uPJSdAfqhJA9BbSsKEaLfBWj8yAK-lZA"
                  className="w-8 h-8 rounded-full shadow-soft object-cover"
                  alt="Ana"
                />
              )}
              <div className={`flex flex-col gap-1 ${message.sender === 'me' ? 'items-end' : 'items-start'}`}>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${message.sender === 'me' ? 'text-primary mr-2' : 'text-text-muted ml-2'}`}>
                  {message.sender === 'me' ? 'Eu' : 'Ana (Doadora)'}
                </p>

                {message.image ? (
                  <div className="relative">
                    <img
                      src={message.image}
                      alt="Shared"
                      className="w-52 h-36 object-cover rounded-2xl border-4 border-accent dark:border-surface-elevated shadow-soft"
                    />
                  </div>
                ) : (
                  <div className={`max-w-[280px] px-4 py-3 shadow-soft transition-colors duration-300 ${message.sender === 'me'
                    ? 'bg-gradient-to-br from-primary to-primary-dark text-white rounded-t-2xl rounded-bl-2xl rounded-br-sm'
                    : 'bg-surface dark:bg-surface-elevated rounded-t-2xl rounded-br-2xl rounded-bl-sm'
                    }`}>
                    <p className={`text-sm ${message.sender === 'me' ? 'text-white' : 'text-text-primary'}`}>{message.text}</p>
                  </div>
                )}

                <div className="flex items-center gap-1 px-2">
                  <span className="text-text-muted text-[10px]">{message.time}</span>
                  {message.sender === 'me' && message.status && (
                    <span className="material-symbols-outlined text-xs text-primary">
                      {message.status === 'sending' ? 'schedule' : message.status === 'sent' ? 'done' : 'done_all'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-surface shadow-soft-lg p-4 pb-8 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <button className="flex size-12 items-center justify-center rounded-2xl bg-background text-primary hover:bg-primary/10 active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <div className="flex-1 relative">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-background rounded-2xl py-3.5 px-5 text-sm border-2 border-transparent focus:border-primary focus:shadow-glow-sm transition-all duration-200 text-text-primary placeholder:text-text-muted"
              placeholder="Escreva uma mensagem..."
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors">
              <span className="material-symbols-outlined">sentiment_satisfied</span>
            </button>
          </div>
          <button
            onClick={sendMessage}
            disabled={msg.trim() === ''}
            className={`flex size-12 items-center justify-center rounded-2xl transition-all duration-300 ${msg.trim() === ''
              ? 'bg-border text-text-muted'
              : 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-glow-sm hover:shadow-glow active:scale-95'
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
