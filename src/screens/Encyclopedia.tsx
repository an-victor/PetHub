
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Encyclopedia: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const breeds = [
    {
      id: 'golden-retriever',
      name: 'Golden Retriever',
      energy: 4,
      size: 'G',
      temperament: 'Amigável',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB1tie9Tsp0z-0NfffPfw7lyP7hZ7fL_G89ZVnsIsdzYwWUb85Jh5ZV0A1jIl1Cj5xFYniyV4c1Zl1Um-YpAPZJmTWvlkZsfnV3_QOcTi3L6-8RkI0IkMiOuVxjnF8cQpwuXUSpg8-_kAUaGNmgN1d2QKz11LsaAz2s-EehguG0jLs7WKQafa2EoMgLrk3gpqBoe-wQAxmQwbinUzCSPMNWsihpT9AVfn0c9Eo8OZajGMMc5M8-rjyBKoYt4A8NjiZo68T1IV1o8fr',
      featured: true
    },
    {
      id: 'beagle',
      name: 'Beagle',
      energy: 5,
      size: 'M',
      temperament: 'Curioso',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyeDMZIL4P19X-EGMyIs_z1Mz2NA4HePqu6kLAJJqaoUWJUMT0v6Zn95b8-Nt0vGvAvnCG2RkXyUc8Q1rLsmW9FfP2G2PdgUat9puI1SPrzkPBuasDiYcfk0XeguiU1ErqAQLbeabYlxECB5TcASJzKt0dpylHOjGITvKIARO0pm8epda30zgIU4K6fe5aiuaBJiwcu-p53-yNincY3miN7YS58kkOC98e1lklPjKS5dvM6ZrVmjFjxoWTx0HUurYRXshdo6YtZyUk'
    },
    {
      id: 'labrador',
      name: 'Labrador',
      energy: 5,
      size: 'G',
      temperament: 'Leal',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5n3qQRfTBx2PvsUgS4ObKBJnt_Ny7cTDsNzJDTpDEVp_pnYj2dySpOPcLoS34HrGAgGm2DhevJjFbo3Qr7CPvCG3ugGXn55-WqPFX7eF6_Li_Bll4zT0GmlxWslWIB28oXOtmvw2EI8pRvFN6bTbCrzHOoWZZZ6rCWdq6d6X-RLgwUBebaJa7qtmu03VJ4nFoRSYTOrVAqqPQdYT6yNoycG2wybMu0hPV_0FMB9g7EE2Ft4rJrW-5wSqfEVzg05NBCVnkZDtBAmsd'
    },
    {
      id: 'poodle',
      name: 'Poodle',
      energy: 3,
      size: 'M',
      temperament: 'Inteligente',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYqaodse2MOVUmzTz73w6ntEu1vdleJeBbtaozJuHs_XfYh670ZmpRVWDzGQswTslxmB61vqhbjvSYkIFZD8eQ38X92pEQ_ql_xVWY2Sp0pLmLfY9fREb29_KvMNIQLL2tLnFrxdyjHdbwZCVVkaR66Erwrd_O5chI_OfX0WzVz1cYxLQVQqZQWwd-dtWTq6PjRO4vDTliX2gGijGRG9p68wHDurwlM_Ynoa3Gr45bvjEt8KwcQndpuKXluEHS0NjqlJSkshlOnKOO'
    },
    {
      id: 'bulldog',
      name: 'Bulldog',
      energy: 2,
      size: 'M',
      temperament: 'Calmo',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEeoOk8BagLEIQs2tKJLqNvJq0C7XGTAierUzlOFVqDA-EQiJopJV--dSKvQAZaZe4KyviTaiGlOsg9AM05IlOxCas2acnWg6r1L4RbLvZfqo-ulqN68CZKvZeBMmIvW9dOr2vb_eia9oiglovbccm8O9tA-_u7Y2TfIWnOvGskycWsIWxIumM2S1abXChEaIVIp2jdiIXajUPfnw40l3VkOtO0iLd6JNN4XuD4O-bePi27VKY_0YbgCbVjPP0ypEItq83hbOcTVGJ'
    }
  ];

  const featuredBreed = breeds.find(b => b.featured);
  const otherBreeds = breeds.filter(b => !b.featured);

  const filteredBreeds = searchQuery
    ? breeds.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  const EnergyBars = ({ level }: { level: number }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          className={`w-2 h-4 rounded-sm ${i <= level ? 'bg-primary' : 'bg-border'}`}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col pb-28 min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="bg-surface shadow-soft sticky top-0 z-20 transition-colors duration-300 animate-slideDown">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="flex size-11 items-center justify-center rounded-xl hover:bg-background active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined text-text-primary transition-colors duration-300">arrow_back_ios</span>
          </button>
          <h1 className="text-text-primary text-lg font-bold transition-colors duration-300">Enciclopédia de Cães</h1>
          <button className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
      </header>

      {/* Search */}
      <div className="px-5 py-4 animate-slideUp stagger-1">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface rounded-2xl py-4 pl-12 pr-4 text-sm shadow-soft border-2 border-transparent placeholder:text-text-muted focus:border-primary focus:shadow-glow-sm transition-all duration-300 text-text-primary"
            placeholder="Buscar raça ou característica..."
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>
      </div>

      <main className="px-5">
        {/* Search Results */}
        {filteredBreeds ? (
          <div className="animate-fadeIn">
            <h2 className="text-text-primary font-bold mb-4 transition-colors duration-300">
              {filteredBreeds.length} resultado{filteredBreeds.length !== 1 ? 's' : ''} para "{searchQuery}"
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {filteredBreeds.map((breed, index) => (
                <BreedCard key={breed.id} breed={breed} index={index} navigate={navigate} EnergyBars={EnergyBars} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Info Card */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-3xl p-5 mb-6 flex items-center gap-4 border border-primary/20 animate-slideUp stagger-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-glow-sm">
                <span className="material-symbols-outlined text-2xl">menu_book</span>
              </div>
              <div className="flex-1">
                <h3 className="text-text-primary font-bold transition-colors duration-300">Descubra seu parceiro</h3>
                <p className="text-text-secondary text-sm transition-colors duration-300">Encontre a raça ideal para seu estilo de vida.</p>
              </div>
            </div>

            {/* Featured Breed - Larger Card */}
            {featuredBreed && (
              <div className="mb-6 animate-slideUp stagger-3">
                <h2 className="text-text-primary font-bold mb-4 flex items-center gap-2 transition-colors duration-300">
                  <span className="material-symbols-outlined text-primary">star</span>
                  Destaque
                </h2>
                <div
                  onClick={() => navigate(`/breed/${featuredBreed.id}`)}
                  className="bg-surface rounded-3xl shadow-soft overflow-hidden cursor-pointer hover:shadow-soft-lg active:scale-[0.99] transition-all duration-300 group"
                >
                  <div
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url("${featuredBreed.image}")` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-bold drop-shadow-lg">{featuredBreed.name}</h3>
                      <p className="text-white/80 text-sm">{featuredBreed.temperament}</p>
                    </div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-3 right-3 bg-white/90 p-2 rounded-xl text-primary shadow-soft hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
                    >
                      <span className="material-symbols-outlined text-xl material-symbols-fill">favorite</span>
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex gap-3">
                      <div className="flex items-center gap-2 bg-background px-3 py-2 rounded-xl">
                        <span className="material-symbols-outlined text-primary text-sm">bolt</span>
                        <EnergyBars level={featuredBreed.energy} />
                      </div>
                      <div className="flex items-center gap-1.5 bg-background px-3 py-2 rounded-xl">
                        <span className="material-symbols-outlined text-primary text-sm">straighten</span>
                        <span className="text-text-primary text-sm font-bold">{featuredBreed.size}</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors duration-300">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Breeds Grid */}
            <div className="animate-slideUp stagger-4">
              <h2 className="text-text-primary font-bold mb-4 transition-colors duration-300">Raças Populares</h2>
              <div className="grid grid-cols-2 gap-4">
                {otherBreeds.map((breed, index) => (
                  <BreedCard key={breed.id} breed={breed} index={index} navigate={navigate} EnergyBars={EnergyBars} />
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

interface BreedCardProps {
  breed: {
    id: string;
    name: string;
    energy: number;
    size: string;
    image: string;
  };
  index: number;
  navigate: (path: string) => void;
  EnergyBars: React.FC<{ level: number }>;
}

const BreedCard: React.FC<BreedCardProps> = ({ breed, index, navigate, EnergyBars }) => (
  <div
    onClick={() => navigate(`/breed/${breed.id}`)}
    className="bg-surface rounded-2xl shadow-soft overflow-hidden cursor-pointer hover:shadow-soft-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 group"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <div
      className="h-32 bg-cover bg-center relative"
      style={{ backgroundImage: `url("${breed.image}")` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <button
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-lg text-primary shadow-sm hover:bg-white hover:scale-110 active:scale-90 transition-all duration-200"
      >
        <span className="material-symbols-outlined text-lg">favorite_border</span>
      </button>
    </div>
    <div className="p-3">
      <h3 className="text-text-primary font-semibold text-sm mb-2 transition-colors duration-300">{breed.name}</h3>
      <div className="flex flex-wrap gap-1.5">
        <div className="flex items-center gap-1 bg-background px-2 py-1 rounded-lg">
          <span className="material-symbols-outlined text-primary text-xs">bolt</span>
          <span className="text-text-primary text-[10px] font-bold">{breed.energy}/5</span>
        </div>
        <div className="flex items-center gap-1 bg-background px-2 py-1 rounded-lg">
          <span className="material-symbols-outlined text-primary text-xs">straighten</span>
          <span className="text-text-primary text-[10px] font-bold">{breed.size}</span>
        </div>
      </div>
    </div>
  </div>
);

export default Encyclopedia;
