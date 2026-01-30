
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Training: React.FC = () => {
  const navigate = useNavigate();

  const lessons = [
    { title: 'Senta e Fica: Domine o básico', level: 'Iniciante', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7sH_gLEEVww2gQv26oHF11MZWG_mSCknfkjqr-hZUqGb5tMEgth25aWGHA_YMbOw-ypzbHOwYs94FXAad0ndFwMxRS3AedA-QvFIJcVDMToQTUzNi1R9Zh6JNi1E_cdg9tdGos3xE7ZuvScB7gl_sBQcNNDNk05fVicq_zh19MEsNdxOEtKxUD_pfae1rlhCmKO0yjjXNRHjPHLFlh0jzljTJ7o6pxcV786jtvh6ZaFcnMZ19wTIXpNCBrB20kcQEi1OPbbsPUDXz' },
    { title: 'Xixi no lugar certo: Guia', level: 'Higiene', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYWKeRjfPtV1nc3OkDxcBpf1UZ5sALfyRF8PRNBgVMIrsKmhMEYo_ZO4qet-dWCWpyw_L9pr1jjloUphHE7LGfYGtL0Be1obILIK-K9Wj0ifue2hn0JfZwMdn-D_pKMNhuWO0s4NKtdv-3upm6_ek92roGX45S5XKnhgGz7yM4jnTsvgdGEwaa1a1FTvSLgkZnYeMoZ2LJCf_WyQChHetd4HJPsv_H2xe1_i0sjJ8KWqnT-YcTTjwOEmYqTQlq_hNFSfPs8so_zU94' }
  ];

  return (
    <div className="flex flex-col pb-24 bg-background-light dark:bg-background-dark min-h-screen">
      <div className="sticky top-0 z-50 flex items-center bg-background-light/90 backdrop-blur-md px-4 py-3 justify-between border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="text-primary flex size-10 items-center">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-extrabold flex-1 text-center">Dicas de Adestramento</h2>
        <button className="flex size-10 items-center justify-end">
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>

      <div className="px-4 pt-4">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#2d2116] border-none rounded-xl text-sm shadow-sm" placeholder="Pesquisar lições..." />
        </div>
      </div>

      <div className="flex gap-3 px-4 py-5 overflow-x-auto no-scrollbar">
        <div className="flex h-10 shrink-0 items-center justify-center rounded-full bg-primary px-5 text-white font-bold text-sm">Todos</div>
        {['Básico', 'Truques', 'Higiene'].map(c => (
          <div key={c} className="flex h-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-[#2d2116] px-5 border border-gray-100 font-semibold text-sm">{c}</div>
        ))}
      </div>

      <div className="flex items-center justify-between px-4 pb-2">
        <h3 className="text-xl font-extrabold tracking-tight">Aulas em Vídeo</h3>
        <span className="text-primary text-sm font-bold">Ver tudo</span>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
        {lessons.map(lesson => (
          <div key={lesson.title} className="relative flex flex-col gap-2 rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url("${lesson.image}")` }}
            ></div>
            <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-1.5 shadow-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] material-symbols-fill">play_arrow</span>
            </div>
            <div className="absolute bottom-3 left-3 flex flex-col gap-2">
              <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-white text-[10px] font-bold uppercase self-start">{lesson.level}</span>
              <p className="text-white text-sm font-bold leading-tight">{lesson.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Training;
