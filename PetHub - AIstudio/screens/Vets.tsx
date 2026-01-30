
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Vets: React.FC = () => {
  const navigate = useNavigate();

  const clinics = [
    {
      id: '1',
      name: 'Happy Paws Clinic',
      dist: '1.2 km',
      status: 'Aberto',
      rating: 4.9,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOzrGy5Zppn_YfG041LNE4pj84u22O_NOB7iA6-WEYUnoHA52macnwq0e-xkh5Mo5ovZApMMyj1WGKYcwoaFPx-cCiGbl-G1Q_kIE_PcWnCR6x7Zs3Z7CIEJNpsX5CgL-HQUmtKb82A1oaGbM98qPpycihurzpqde3Piuc2erCme0ln1AzS7EOCjepRCYcTd5Reqorkan19WfO_pAGTk3sqUwAc3ULyvGJOk-3TuD1UtnunQiB60JZuhO8xY2_zYLDwBLb-rsGxTpc'
    },
    {
      id: '2',
      name: 'Central Vet Care',
      dist: '2.5 km',
      status: 'Fecha às 18h',
      rating: 4.7,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjLDfNTsSaZi4xja4Q4lT5xtkqSK9TG1JBpk0-Q2QVIEzVxhM8MoCR8m57HB92eiuscsRysgq9-uLvTiGGv1lORgVtdM7hi8qtxpOC12thsZ9ckMofWWX6zP4iHYADrjSS6hBgofYARHPlbZmAK7auao6EFUttn5oh_5EfJ6HF60khxOk3G2A2oWebproJabYijuJDUFae6hxay2M9qifmdJzGWL0lSSpExKXhrdZpZhfD_8voqn_mMAj4wJJ3wBAAFYU9BgBkXSZQ'
    }
  ];

  return (
    <div className="flex flex-col pb-24 bg-background-light dark:bg-background-dark min-h-screen">
      <div className="sticky top-0 z-50 flex items-center bg-background-light/80 backdrop-blur-md p-4 pb-2 justify-between">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">Veterinários Próximos</h2>
        <button className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm text-[#1c140d]">
          <span className="material-symbols-outlined">tune</span>
        </button>
      </div>

      <div className="px-4 py-2">
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-3 text-zinc-400">search</span>
          <input className="w-full pl-10 pr-4 py-3 bg-white border-none rounded-xl shadow-sm focus:ring-2 focus:ring-primary/50 text-sm" placeholder="Buscar clínica..." />
        </div>
      </div>

      <div className="px-4 py-3">
        <div 
          className="relative w-full h-[280px] rounded-3xl overflow-hidden shadow-inner border-4 border-white bg-cover bg-center"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCZe6lnmhsjk-TlXimxZ9Nc-Xo-O2hgt0jUNP5PXQrtV8iJctoW5YnEZ1WmRYb1VB2Bkl5NHENNjx2FNvAussWo8YDJyVSYS4BmA0mwJKxVODjjWcLgevJoG6irjqaEpIK_IGxCWE-AtjE_Lt2JMy_bJ0Dlzo-FZd3GHZjgJlVstSv9nUumbLun88AnClnPfwZXk-M0M--6K4ZfCMUW3iAE8JlliU4xFa0KzsZbEOuU7D32EGKNGn_T9bvGuED8hxcz_Mwtwg8EprhW")' }}
        >
          {/* Paw Pins (Mock) */}
          <div className="absolute top-1/4 left-1/3 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white">
            <span className="material-symbols-outlined scale-75 block material-symbols-fill">pets</span>
          </div>
          <div className="absolute top-1/2 right-1/4 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white">
            <span className="material-symbols-outlined scale-75 block material-symbols-fill">pets</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <h3 className="text-xl font-extrabold tracking-tight">Clínicas Disponíveis</h3>
        <span className="text-primary text-sm font-bold">Ver todas</span>
      </div>

      <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 py-2 gap-4 pb-10">
        {clinics.map(clinic => (
          <div key={clinic.id} className="flex flex-col shrink-0 w-[280px] snap-center rounded-2xl bg-white dark:bg-zinc-900 shadow-xl overflow-hidden border border-zinc-100">
            <div 
              className="w-full h-32 bg-center bg-no-repeat bg-cover"
              style={{ backgroundImage: `url("${clinic.image}")` }}
            >
              <div className="bg-white/90 backdrop-blur m-2 px-2 py-1 rounded-lg inline-flex items-center gap-1 text-xs font-bold text-zinc-800">
                <span className="material-symbols-outlined text-yellow-500 text-sm material-symbols-fill">star</span>
                {clinic.rating}
              </div>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <div>
                <p className="font-bold leading-tight">{clinic.name}</p>
                <p className="text-zinc-500 text-xs font-medium flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-xs">location_on</span>
                  {clinic.dist} • {clinic.status}
                </p>
              </div>
              <button onClick={() => navigate('/agenda')} className="w-full py-3 rounded-xl bg-primary text-white text-sm font-extrabold shadow-lg shadow-primary/20">
                Agendar Agora
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vets;
