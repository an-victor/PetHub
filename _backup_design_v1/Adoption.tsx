
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Adoption: React.FC = () => {
  const navigate = useNavigate();

  const pets = [
    {
      id: '1',
      name: 'Bento',
      breed: 'Golden Retriever filhote',
      location: 'Curitiba, PR',
      distance: '2.5 km',
      urgent: true,
      featured: true,
      description: 'Golden Retriever filhote, muito dócil, brincalhão e já iniciou o adestramento básico.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHf8mNse6RRDiFhFi8O-r2AX0fF_Sia-vEmkDUWkOHtYTEVGjn04bOLjOk7p5ZKo7gaJwPrmgOldbFfSgMObdihrDyb0AGjMVoxc5csUEQv6LyCfi5843a3ZmtBH9M-LDKvwXghnCFJ1I2T6zGr5vGO0FluCPxaXBmnyPdlq2d6TfJEuGz1ukVcB2YVKiEC9oj8-TlcEtbt0nJWLEs71kAZMzvymv1I3ez6z0a9E8Vsn85uPJSdAfqhJA9BbSsKEaLfBWj8yAK-lZA',
      donor: { name: 'Ricardo S.', avatar: 'https://picsum.photos/seed/ric/40' }
    },
    {
      id: '2',
      name: 'Luna',
      breed: 'Gata SRD adulta',
      location: 'São José, PR',
      distance: '5.0 km',
      description: 'Gata SRD adulta, castrada, vacinada e muito carinhosa. Procura um novo lar amoroso.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYqaodse2MOVUmzTz73w6ntEu1vdleJeBbtaozJuHs_XfYh670ZmpRVWDzGQswTslxmB61vqhbjvSYkIFZD8eQ38X92pEQ_ql_xVWY2Sp0pLmLfY9fREb29_KvMNIQLL2tLnFrxdyjHdbwZCVVkaR66Erwrd_O5chI_OfX0WzVz1cYxLQVQqZQWwd-dtWTq6PjRO4vDTliX2gGijGRG9p68wHDurwlM_Ynoa3Gr45bvjEt8KwcQndpuKXluEHS0NjqlJSkshlOnKOO',
      donor: { name: 'Maria Clara', avatar: 'https://picsum.photos/seed/mar/40' }
    }
  ];

  return (
    <div className="flex flex-col pb-24 bg-background-light dark:bg-background-dark min-h-screen">
      <header className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-[#1c140d] dark:text-white flex size-10 items-center">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h1 className="text-xl font-bold flex-1 text-center pr-10">Doações e Adotantes</h1>
          <button className="flex w-10 items-center justify-end text-primary">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </header>

      <main className="p-4 flex flex-col gap-4">
        <div className="flex h-12 items-center justify-center rounded-xl bg-[#f4ede7] dark:bg-[#3d2e20] p-1.5 shadow-inner">
          <label className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-[#5a4431] has-[:checked]:shadow-sm text-sm font-bold transition-all">
            <span className="truncate">Adotar</span>
            <input defaultChecked className="hidden" name="view-type" type="radio" />
          </label>
          <label className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-[#5a4431] has-[:checked]:shadow-sm text-[#9c7349] text-sm font-bold transition-all">
            <span className="truncate">Doar</span>
            <input className="hidden" name="view-type" type="radio" />
          </label>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
          {['Cães', 'Gatos', 'Distância', 'Porte'].map((f, i) => (
            <button key={f} className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 border ${i === 0 ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-[#3d2e20] text-[#1c140d] dark:text-white border-[#e8dfd6]'}`}>
              <span className="text-sm font-semibold">{f}</span>
              <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
            </button>
          ))}
        </div>

        {pets.map(pet => (
          <div key={pet.id} className="flex flex-col rounded-2xl bg-white dark:bg-[#2e2318] shadow-md overflow-hidden border border-[#f0e8e0] dark:border-[#423425]">
            <div 
              className="relative w-full aspect-[4/3] bg-center bg-no-repeat bg-cover" 
              style={{ backgroundImage: `url("${pet.image}")` }}
            >
              <div className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full text-primary">
                <span className="material-symbols-outlined material-symbols-fill">favorite</span>
              </div>
              {pet.urgent && (
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-red-500 px-2 py-1 rounded-md">Urgente</span>
                </div>
              )}
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{pet.name}</h3>
                {pet.featured && <span className="text-[10px] font-bold uppercase text-accent-yellow bg-accent-yellow/10 px-2 py-1 rounded">Destaque</span>}
              </div>
              <div className="flex items-center gap-1 text-[#9c7349] text-sm">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span>{pet.distance} • {pet.location}</span>
              </div>
              <p className="text-[#5e4b38] dark:text-[#bda48a] text-sm line-clamp-2">{pet.description}</p>
              <div className="mt-2 flex items-center justify-between gap-4 border-t border-[#f4ede7] pt-4">
                <div className="flex items-center gap-2">
                  <img src={pet.donor.avatar} alt={pet.donor.name} className="w-8 h-8 rounded-full ring-2 ring-primary/20" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#9c7349] font-medium leading-none">Doador</span>
                    <span className="text-xs font-bold">{pet.donor.name}</span>
                  </div>
                </div>
                <button onClick={() => navigate('/chat')} className="flex grow max-w-[120px] items-center justify-center rounded-xl h-10 bg-primary text-white text-sm font-bold shadow-md">
                  <span className="material-symbols-outlined mr-2 text-base">chat</span>
                  <span>Chat</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      <div className="fixed bottom-28 right-4 z-20">
        <button onClick={() => navigate('/vets')} className="flex items-center gap-2 px-5 py-3 bg-[#1c140d] text-white rounded-full shadow-2xl">
          <span className="material-symbols-outlined">map</span>
          <span className="text-sm font-bold">Mapa</span>
        </button>
      </div>
    </div>
  );
};

export default Adoption;
