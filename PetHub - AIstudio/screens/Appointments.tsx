
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Appointments: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col pb-24 bg-background-light dark:bg-background-dark min-h-screen">
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="text-[#1c140d] dark:text-[#fcfaf8] flex size-12 items-center">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">Minhas Consultas</h2>
        <button className="flex w-12 items-center justify-end text-primary">
          <span className="material-symbols-outlined">calendar_add_on</span>
        </button>
      </div>

      <div className="flex px-4 py-3">
        <div className="flex h-12 flex-1 items-center justify-center rounded-xl bg-[#f4ede7] dark:bg-[#2d241c] p-1">
          <button className="h-full grow rounded-lg bg-white dark:bg-[#3e342a] shadow-sm font-semibold text-sm">Próximas</button>
          <button className="h-full grow rounded-lg text-[#9c7349] font-semibold text-sm">Histórico</button>
        </div>
      </div>

      <h3 className="text-lg font-bold px-4 pt-4 pb-2">Próximo Compromisso</h3>
      <div className="p-4">
        <div className="flex flex-col rounded-xl shadow-md bg-accent-yellow/10 dark:bg-[#4a3a1a] border border-primary/20 overflow-hidden">
          <div 
            className="w-full aspect-[16/9] bg-center bg-cover"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAi-2QKE1SNN73rQxu9O6_QohpltT7kQjiiMtpP_-GCwROxS0Az5zzngMYLMeKvIDczT1HuYvDKvC2RNkYG4DiwcZ5lGkyGBOaRwwU6go_2p_IaEoo3p1cH8FV5SmalFUM4EODqMr6dPiByt0bCcbBlvXRqi7UWNKnhmiOi5CriwrCq17HpmgItXobBWIq-G7KLVpxIel11UYLm9nSYhZ-WyHmPMmluRQ5r4pN3Wx82Rrp5b57WVwkFL7Herq0chXaBhXKD_-AP_BhH")' }}
          ></div>
          <div className="flex flex-col p-5 gap-3">
            <div className="flex items-center gap-2">
              <img src="https://picsum.photos/seed/doc/40" className="w-10 h-10 rounded-full border-2 border-white" alt="Doctor" />
              <div>
                <p className="text-lg font-bold leading-tight">Dr. Ricardo Silva</p>
                <p className="text-primary text-sm font-medium">Consulta de Check-up • Max</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined scale-90">schedule</span>
              <p className="text-base font-semibold">15 Out, 14:30</p>
            </div>
            <div className="flex items-start gap-2 text-[#9c7349]">
              <span className="material-symbols-outlined scale-90">location_on</span>
              <p className="text-sm font-medium leading-tight">Clínica VetCare Amigo<br/>R. das Flores, 123</p>
            </div>
            <button className="w-full flex items-center justify-center rounded-xl h-11 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 gap-2">
              <span className="material-symbols-outlined">directions</span>
              <span>Como Chegar</span>
            </button>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold px-4 pt-6 pb-2">Consultas Passadas</h3>
      <div className="flex flex-col gap-4 px-4 pb-8">
        <div className="flex flex-col rounded-xl bg-white dark:bg-[#2d241c] shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs font-bold text-primary uppercase mb-1">12 AGO 2023</p>
              <h4 className="font-bold">Dra. Marina Costa</h4>
            </div>
            <span className="bg-gray-100 text-[#9c7349] text-[10px] font-bold px-2 py-1 rounded-full">CONCLUÍDA</span>
          </div>
          <div className="bg-background-light dark:bg-[#1c140d] rounded-lg p-3 flex gap-3 items-center">
            <span className="material-symbols-outlined text-primary">prescriptions</span>
            <div className="flex-1">
              <p className="text-xs text-[#9c7349]">Resumo da Prescrição</p>
              <p className="text-sm italic">"Antibiótico 2x ao dia por 7 dias."</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-24 right-6 z-50">
        <button className="flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-xl">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </div>
  );
};

export default Appointments;
