
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Encyclopedia: React.FC = () => {
  const navigate = useNavigate();

  const breeds = [
    {
      id: 'golden-retriever',
      name: 'Golden Retriever',
      energy: 4,
      size: 'G',
      friendly: 5,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB1tie9Tsp0z-0NfffPfw7lyP7hZ7fL_G89ZVnsIsdzYwWUb85Jh5ZV0A1jIl1Cj5xFYniyV4c1Zl1Um-YpAPZJmTWvlkZsfnV3_QOcTi3L6-8RkI0IkMiOuVxjnF8cQpwuXUSpg8-_kAUaGNmgN1d2QKz11LsaAz2s-EehguG0jLs7WKQafa2EoMgLrk3gpqBoe-wQAxmQwbinUzCSPMNWsihpT9AVfn0c9Eo8OZajGMMc5M8-rjyBKoYt4A8NjiZo68T1IV1o8fr'
    },
    {
      id: 'beagle',
      name: 'Beagle',
      energy: 5,
      size: 'M',
      friendly: 4,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyeDMZIL4P19X-EGMyIs_z1Mz2NA4HePqu6kLAJJqaoUWJUMT0v6Zn95b8-Nt0vGvAvnCG2RkXyUc8Q1rLsmW9FfP2G2PdgUat9puI1SPrzkPBuasDiYcfk0XeguiU1ErqAQLbeabYlxECB5TcASJzKt0dpylHOjGITvKIARO0pm8epda30zgIU4K6fe5aiuaBJiwcu-p53-yNincY3miN7YS58kkOC98e1lklPjKS5dvM6ZrVmjFjxoWTx0HUurYRXshdo6YtZyUk'
    }
  ];

  return (
    <div className="flex flex-col pb-24 bg-background-light dark:bg-background-dark min-h-screen">
      <header className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center p-4 pb-2 justify-between">
          <button onClick={() => navigate(-1)} className="text-[#2d2111] dark:text-[#fcfaf8] flex size-12 items-center">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="text-xl font-extrabold flex-1 text-center">Enciclopédia de Cães</h2>
          <button className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
        <div className="px-4 py-3">
          <div className="flex w-full items-stretch rounded-xl h-14 shadow-sm bg-white dark:bg-[#32261a]">
            <div className="text-primary flex items-center justify-center pl-4">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input className="flex-1 bg-transparent border-none focus:ring-0 px-4 placeholder:text-gray-400 font-medium" placeholder="Buscar raça ou característica..." />
          </div>
        </div>
      </header>

      <div className="p-4">
        <div className="bg-primary/10 rounded-xl p-4 mb-6 border border-primary/20 flex items-center gap-4">
          <div className="bg-primary p-2 rounded-lg text-white">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <div>
            <h4 className="font-bold">Descubra seu parceiro</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Encontre a raça ideal para seu estilo de vida.</p>
          </div>
        </div>
        <h3 className="text-lg font-extrabold pb-2">Raças Populares</h3>
        <div className="grid grid-cols-2 gap-4">
          {breeds.map(breed => (
            <div key={breed.id} onClick={() => navigate(`/breed/${breed.id}`)} className="cursor-pointer bg-white dark:bg-[#32261a] rounded-xl overflow-hidden shadow-md group">
              <div 
                className="bg-cover bg-center aspect-[4/5] relative" 
                style={{ backgroundImage: `url("${breed.image}")` }}
              >
                <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-primary">
                  <span className="material-symbols-outlined text-[20px] material-symbols-fill">favorite</span>
                </div>
              </div>
              <div className="px-3 pb-3 pt-2">
                <p className="font-bold text-sm mb-2">{breed.name}</p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 bg-background-light dark:bg-background-dark px-1.5 py-0.5 rounded-md border border-primary/10">
                    <span className="material-symbols-outlined text-[14px] text-primary">bolt</span>
                    <span className="text-[10px] font-bold">{breed.energy}/5</span>
                  </div>
                  <div className="flex items-center gap-1 bg-background-light dark:bg-background-dark px-1.5 py-0.5 rounded-md border border-primary/10">
                    <span className="material-symbols-outlined text-[14px] text-primary">straighten</span>
                    <span className="text-[10px] font-bold">{breed.size}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Encyclopedia;
