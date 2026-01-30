
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BreedDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data for Golden Retriever as example
  const breed = {
    name: 'Golden Retriever',
    weight: '25-34 kg',
    life: '10-12 anos',
    height: '51-61 cm',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMReiYRV8FpWa806xk9-n1GzXhTXWoOsS_hqcTYJITgxjyrL3MYJ0zkAIHOG_ArUn9QLcNqTBDTprzii1r_hDfS4oZi9hevJITXrk_JNDN9rRbic-6eWi3Ga7q8lzmWX_tNivZHBMpP3OGrAMRFtlgeDWHl313DaMzJBLDEN_OBQ3OAYYGLThCpUZGA_F440OS2_6gCwFtalWIYaTkrdVQT0vg6gJsHrOusiFiKQOemzKsu4oYpIGbfvWljTeGMEFHq3-ONjozlxhc',
    traits: [
      { label: 'Inteligência', value: 95 },
      { label: 'Exercício', value: 90 },
      { label: 'Pelagem', value: 70 }
    ],
    temperament: 'O Golden Retriever é conhecido por seu temperamento amigável, confiável e bondoso. São pacientes com crianças e sociáveis.',
    history: 'Originário das Terras Altas da Escócia no século XIX, foi desenvolvido pelo Lord Tweedmouth.',
    needs: 'Esta é uma raça ativa que requer pelo menos 1 hora de exercícios vigorosos diariamente. Eles amam nadar.'
  };

  return (
    <div className="flex flex-col bg-background-light dark:bg-background-dark min-h-screen">
      <div className="relative w-full h-[320px]">
        <div 
          className="w-full h-full bg-center bg-no-repeat bg-cover" 
          style={{ backgroundImage: `url("${breed.image}")` }}
        ></div>
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/40 to-transparent">
          <button onClick={() => navigate(-1)} className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm">
            <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
          </button>
          <button className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm text-primary">
            <span className="material-symbols-outlined text-2xl material-symbols-fill">favorite</span>
          </button>
        </div>
      </div>

      <div className="relative -mt-6 bg-background-light dark:bg-background-dark rounded-t-xl px-4 pt-6 pb-24">
        <h1 className="text-3xl font-bold tracking-tight">{breed.name}</h1>
        <div className="flex gap-2 py-2">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase">Esportista</span>
          <span className="px-3 py-1 bg-accent-yellow/20 text-[#8a651a] text-xs font-bold rounded-full uppercase">Popular</span>
        </div>

        <div className="flex justify-between items-center py-6 border-b border-gray-100 dark:border-gray-800">
          {[
            { label: 'Peso', val: breed.weight, icon: 'scale' },
            { label: 'Vida', val: breed.life, icon: 'hourglass_empty' },
            { label: 'Altura', val: breed.height, icon: 'straighten' }
          ].map((stat, i) => (
            <React.Fragment key={stat.label}>
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-primary">{stat.icon}</span>
                <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                <span className="text-sm font-bold">{stat.val}</span>
              </div>
              {i < 2 && <div className="h-8 w-[1px] bg-gray-200"></div>}
            </React.Fragment>
          ))}
        </div>

        <div className="py-6 flex flex-col gap-5">
          <h3 className="text-lg font-bold">Traços da Raça</h3>
          {breed.traits.map(t => (
            <div key={t.label} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{t.label}</span>
                <span className="text-xs font-bold text-primary">{t.value}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-primary/10">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${t.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary">psychology</span>
            <h3 className="text-lg font-bold">Temperamento</h3>
          </div>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{breed.temperament}</p>
        </section>

        <section className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary">fitness_center</span>
            <h3 className="text-lg font-bold text-primary">Necessidades Físicas</h3>
          </div>
          <p className="text-sm leading-relaxed">{breed.needs}</p>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-4 bg-white/80 backdrop-blur-lg border-t border-gray-100">
        <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">search</span>
          Encontrar um Criador
        </button>
      </div>
    </div>
  );
};

export default BreedDetails;
