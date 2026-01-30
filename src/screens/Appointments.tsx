import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppointmentForm } from '@/src/components/forms';

const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const upcomingAppointments = [
    {
      id: '1',
      doctor: 'Dr. Ricardo Silva',
      specialty: 'Clínico Geral',
      type: 'Consulta de Check-up',
      pet: 'Max',
      date: '15 Out',
      time: '14:30',
      location: 'Clínica VetCare Amigo',
      address: 'R. das Flores, 123',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi-2QKE1SNN73rQxu9O6_QohpltT7kQjiiMtpP_-GCwROxS0Az5zzngMYLMeKvIDczT1HuYvDKvC2RNkYG4DiwcZ5lGkyGBOaRwwU6go_2p_IaEoo3p1cH8FV5SmalFUM4EODqMr6dPiByt0bCcbBlvXRqi7UWNKnhmiOi5CriwrCq17HpmgItXobBWIq-G7KLVpxIel11UYLm9nSYhZ-WyHmPMmluRQ5r4pN3Wx82Rrp5b57WVwkFL7Herq0chXaBhXKD_-AP_BhH',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD92u6__KXrIa8H6BpnLvP3Lf-pQWB8AvIYaKaQaQHsRyG8WL8E8_fBXSwX82FHy9CJkOX5SzE2wxW4302Zu2lhgABfInMDeRwK4KXnqkcCpXmeKUuef5XFIFIlaRT8K75t6658Fe6DWuliERvUTCZF0nHHRnI3bUwnbANykK_iTVFp2ih-Y1gTkOFcbHPlxxCVBweHmncfIVqn04HHByOeWh25_brWLxVCSBMH9-QBEFe64wX3263MOoJwhYxgYWLpPUuKYrnN5Atd'
    }
  ];

  const historyAppointments = [
    {
      id: '2',
      doctor: 'Dra. Marina Costa',
      specialty: 'Dermatologista',
      date: '12 Ago 2023',
      status: 'Concluída',
      prescription: 'Antibiótico 2x ao dia por 7 dias. Limpeza de ouvidos.',
      pet: 'Max'
    },
    {
      id: '3',
      doctor: 'Dr. Ricardo Silva',
      specialty: 'Clínico Geral',
      date: '05 Jul 2023',
      status: 'Concluída',
      prescription: 'V10 e Antirrábica aplicadas com sucesso.',
      type: 'Vacinação Anual',
      pet: 'Luna'
    }
  ];

  const handleCreateAppointment = (data: any) => {
    // In a real app, this would send to Backend
    console.log('Novo Agendamento:', data);
    alert('Solicitação enviada com sucesso! Aguarde a confirmação da clínica.');
  };

  return (
    <div className="flex flex-col pb-28 min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="bg-surface/80 backdrop-blur-md shadow-soft sticky top-0 z-20 transition-colors duration-300 animate-slideDown">
        <div className="flex items-center justify-between p-4 pt-6">
          <button onClick={() => navigate(-1)} className="flex size-11 items-center justify-center rounded-2xl bg-background/50 hover:bg-background active:scale-95 transition-all duration-200 border border-border/50">
            <span className="material-symbols-outlined text-text-primary transition-colors duration-300">arrow_back_ios_new</span>
          </button>
          <h1 className="text-text-primary text-xl font-bold transition-colors duration-300">Minhas Consultas</h1>
          <button className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined">calendar_month</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 pb-4">
          <div className="flex p-1 bg-background/50 rounded-2xl border border-border/50">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'upcoming'
                ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm'
                : 'text-text-muted hover:text-text-secondary'
                }`}
            >
              <span className="material-symbols-outlined text-lg">event_upcoming</span>
              Próximas
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'history'
                ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm'
                : 'text-text-muted hover:text-text-secondary'
                }`}
            >
              <span className="material-symbols-outlined text-lg">history</span>
              Histórico
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-5 py-6">
        {activeTab === 'upcoming' && (
          <>
            <div className="flex items-center justify-between mb-6 animate-slideUp">
              <h2 className="text-text-primary font-bold text-xl flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-glow-sm"></span>
                Próximo Compromisso
              </h2>
              <span className="text-text-muted text-xs font-medium uppercase tracking-wider">1 agendado</span>
            </div>

            {upcomingAppointments.map((apt, index) => (
              <div
                key={apt.id}
                className="bg-surface rounded-[32px] overflow-hidden shadow-soft-lg hover:shadow-soft-xl transition-all duration-300 animate-slideUp border border-border/50 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className="h-48 bg-cover bg-center relative transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url("${apt.image}")` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-white text-sm">pets</span>
                    <span className="text-white text-xs font-bold">{apt.pet}</span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">Localização</p>
                        <p className="text-white font-bold text-lg leading-tight">{apt.location}</p>
                        <p className="text-white/80 text-sm mt-0.5">{apt.address}</p>
                      </div>
                      <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white/30 active:scale-95 transition-all">
                        <span className="material-symbols-outlined">map</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Doctor Info */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src={apt.avatar}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-surface shadow-soft"
                        alt={apt.doctor}
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-surface flex items-center justify-center">
                        <span className="material-symbols-outlined text-[10px] text-white">check</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-text-primary font-bold text-lg leading-tight mb-1">{apt.doctor}</p>
                      <p className="text-primary text-sm font-semibold">{apt.specialty}</p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-background dark:bg-surface-elevated rounded-2xl p-4 border border-border/50">
                      <div className="flex items-center gap-2 mb-2 text-primary">
                        <span className="material-symbols-outlined text-xl">calendar_today</span>
                        <span className="text-xs font-bold uppercase tracking-wider">Data</span>
                      </div>
                      <p className="text-text-primary font-bold text-lg">{apt.date}</p>
                      <p className="text-text-muted text-sm">{apt.time}</p>
                    </div>

                    <div className="bg-background dark:bg-surface-elevated rounded-2xl p-4 border border-border/50">
                      <div className="flex items-center gap-2 mb-2 text-primary">
                        <span className="material-symbols-outlined text-xl">medical_services</span>
                        <span className="text-xs font-bold uppercase tracking-wider">Tipo</span>
                      </div>
                      <p className="text-text-primary font-bold text-sm leading-tight mt-1">{apt.type}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-surface border-2 border-border text-text-primary py-3.5 rounded-2xl font-bold hover:bg-background active:scale-[0.98] transition-all duration-300">
                      Cancelar
                    </button>
                    <button className="flex-[2] bg-gradient-to-r from-primary to-primary-dark text-white py-3.5 rounded-2xl font-bold shadow-glow-sm hover:shadow-glow active:scale-[0.98] transition-all duration-300">
                      Confirmar Presença
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'history' && (
          <>
            <div className="flex items-center justify-between mb-6 animate-slideUp">
              <h2 className="text-text-primary font-bold text-xl">Histórico</h2>
              <span className="text-text-muted text-xs font-medium uppercase tracking-wider">{historyAppointments.length} consultas</span>
            </div>

            <div className="space-y-4">
              {historyAppointments.map((apt, index) => (
                <div
                  key={apt.id}
                  className="bg-surface rounded-3xl p-5 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 animate-slideUp border border-border/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex flex-col items-center justify-center shrink-0">
                        <span className="text-primary font-bold text-lg leading-none">{apt.date.split(' ')[0]}</span>
                        <span className="text-primary/70 text-[10px] font-bold uppercase">{apt.date.split(' ')[1]}</span>
                      </div>
                      <div>
                        <h3 className="text-text-primary font-bold text-lg leading-tight mb-1">{apt.doctor}</h3>
                        <p className="text-text-secondary text-sm">{apt.specialty}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="bg-background dark:bg-surface-elevated text-text-secondary text-xs px-2 py-0.5 rounded-md border border-border">
                            {apt.pet}
                          </span>
                          <span className="text-success text-xs font-bold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background/50 dark:bg-surface-elevated/50 rounded-2xl p-4 flex gap-3 items-start border border-border/50">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-primary text-sm">prescriptions</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-text-muted text-[10px] mb-1 uppercase tracking-wider font-bold">Prescrição</p>
                      <p className="text-text-secondary text-sm leading-relaxed">{apt.prescription}</p>
                    </div>
                  </div>

                  <button className="w-full mt-4 flex items-center justify-center gap-1 text-primary text-sm font-bold py-2 hover:bg-primary/5 rounded-xl transition-colors">
                    Ver Detalhes
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-28 z-40 transition-all duration-300 pointer-events-none w-full flex justify-center">
        <button
          onClick={() => setIsFormOpen(true)}
          className="pointer-events-auto flex size-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-primary to-primary-dark text-white shadow-glow hover:shadow-glow-lg hover:scale-110 active:scale-95 transition-all duration-300 relative group"
        >
          <div className="absolute inset-0 bg-white/20 rounded-[20px] animate-ping opacity-0 group-hover:opacity-100 duration-1000"></div>
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>

      <AppointmentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateAppointment}
      />
    </div>
  );
};

export default Appointments;
