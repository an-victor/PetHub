
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface BreedInfo {
  name: string;
  image: string;
  energy: number;
  size: string;
  weight: string;
  life: string;
  height: string;
  traits: string[];
  history: string;
  temperament: string;
  needs: string;
  compatibility: {
    children: number;
    dogs: number;
    cats: number;
    apartment: number;
  };
}

const BreedDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const breedData: Record<string, BreedInfo> = {
    'golden-retriever': {
      name: 'Golden Retriever',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB1tie9Tsp0z-0NfffPfw7lyP7hZ7fL_G89ZVnsIsdzYwWUb85Jh5ZV0A1jIl1Cj5xFYniyV4c1Zl1Um-YpAPZJmTWvlkZsfnV3_QOcTi3L6-8RkI0IkMiOuVxjnF8cQpwuXUSpg8-_kAUaGNmgN1d2QKz11LsaAz2s-EehguG0jLs7WKQafa2EoMgLrk3gpqBoe-wQAxmQwbinUzCSPMNWsihpT9AVfn0c9Eo8OZajGMMc5M8-rjyBKoYt4A8NjiZo68T1IV1o8fr',
      energy: 4,
      size: 'Grande',
      weight: '25-34 kg',
      life: '10-12 anos',
      height: '51-61 cm',
      traits: ['Amigável', 'Inteligente', 'Leal', 'Brincalhão'],
      history: 'O Golden Retriever foi desenvolvido na Escócia no século XIX para recuperar aves aquáticas. É uma das raças mais populares do mundo.',
      temperament: 'Carinhoso, confiável e dócil. Excelente com crianças e outros animais. Adora água e é um nadador nato.',
      needs: 'Precisa de exercício diário (1-2h) e estimulação mental. Escovação regular é essencial para manter a pelagem saudável.',
      compatibility: { children: 5, dogs: 5, cats: 4, apartment: 2 }
    },
    'beagle': {
      name: 'Beagle',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyeDMZIL4P19X-EGMyIs_z1Mz2NA4HePqu6kLAJJqaoUWJUMT0v6Zn95b8-Nt0vGvAvnCG2RkXyUc8Q1rLsmW9FfP2G2PdgUat9puI1SPrzkPBuasDiYcfk0XeguiU1ErqAQLbeabYlxECB5TcASJzKt0dpylHOjGITvKIARO0pm8epda30zgIU4K6fe5aiuaBJiwcu-p53-yNincY3miN7YS58kkOC98e1lklPjKS5dvM6ZrVmjFjxoWTx0HUurYRXshdo6YtZyUk',
      energy: 5,
      size: 'Médio',
      weight: '9-11 kg',
      life: '12-15 anos',
      height: '33-41 cm',
      traits: ['Curioso', 'Amigável', 'Determinado', 'Alegre'],
      history: 'Beagles são uma raça antiga, desenvolvida na Inglaterra para caça de lebres. São conhecidos pelo olfato excepcional.',
      temperament: 'Extremamente curioso e sociável. Pode ser teimoso, mas é muito afetuoso. Adora seguir cheiros.',
      needs: 'Exercício regular e supervisão em áreas abertas (tendência a seguir cheiros). Treinamento consistente é importante.',
      compatibility: { children: 5, dogs: 5, cats: 3, apartment: 3 }
    }
  };

  const breed = breedData[id || 'golden-retriever'] || breedData['golden-retriever'];

  const CompatibilityBar = ({ value, label }: { value: number; label: string }) => (
    <div className="flex items-center gap-3">
      <span className="text-text-secondary text-sm w-20">{label}</span>
      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
          style={{ width: `${value * 20}%` }}
        />
      </div>
      <span className="text-text-primary text-sm font-bold w-8">{value}/5</span>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
      {/* Hero Image */}
      <div
        className="relative h-80 bg-cover bg-center"
        style={{ backgroundImage: `url("${breed.image}")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        <header className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="flex size-11 items-center justify-center rounded-xl bg-surface/90 dark:bg-surface-elevated/90 backdrop-blur-sm shadow-soft hover:bg-surface active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined text-text-primary">arrow_back_ios</span>
          </button>
          <button className="flex size-11 items-center justify-center rounded-xl bg-surface/90 dark:bg-surface-elevated/90 backdrop-blur-sm shadow-soft hover:bg-surface active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined text-primary material-symbols-fill">favorite</span>
          </button>
        </header>

        <div className="absolute bottom-4 left-5 right-5 animate-slideUp">
          <h1 className="text-white text-3xl font-bold drop-shadow-lg">{breed.name}</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            {breed.traits.map((trait: string) => (
              <span key={trait} className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/30">
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-5 py-6 -mt-6 bg-background rounded-t-3xl relative z-10 transition-colors duration-300">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6 animate-slideUp stagger-1">
          {[
            { value: `${breed.energy}/5`, label: 'Energia', icon: 'bolt' },
            { value: breed.size, label: 'Porte', icon: 'straighten' },
            { value: breed.weight.split('-')[0], label: 'Peso', icon: 'scale' },
            { value: breed.life.split('-')[0], label: 'Anos', icon: 'favorite' }
          ].map((stat, index) => (
            <div key={stat.label} className="bg-surface rounded-2xl p-3 shadow-soft text-center transition-colors duration-300 hover:shadow-soft-md" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="w-8 h-8 mx-auto mb-1 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-sm">{stat.icon}</span>
              </div>
              <span className="text-primary text-sm font-bold block">{stat.value}</span>
              <p className="text-text-muted text-[9px] uppercase tracking-wider mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-4">
          <div className="bg-surface rounded-2xl p-5 shadow-soft transition-colors duration-300 animate-slideUp stagger-2">
            <h3 className="text-text-primary font-bold mb-3 flex items-center gap-2 transition-colors duration-300">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-sm">history_edu</span>
              </span>
              História
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed transition-colors duration-300">{breed.history}</p>
          </div>

          <div className="bg-surface rounded-2xl p-5 shadow-soft transition-colors duration-300 animate-slideUp stagger-3">
            <h3 className="text-text-primary font-bold mb-3 flex items-center gap-2 transition-colors duration-300">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-sm">psychology</span>
              </span>
              Temperamento
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed transition-colors duration-300">{breed.temperament}</p>
          </div>

          <div className="bg-surface rounded-2xl p-5 shadow-soft transition-colors duration-300 animate-slideUp stagger-4">
            <h3 className="text-text-primary font-bold mb-3 flex items-center gap-2 transition-colors duration-300">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-sm">checklist</span>
              </span>
              Necessidades
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed transition-colors duration-300">{breed.needs}</p>
          </div>

          {/* Compatibility */}
          <div className="bg-surface rounded-2xl p-5 shadow-soft transition-colors duration-300 animate-slideUp stagger-5">
            <h3 className="text-text-primary font-bold mb-4 flex items-center gap-2 transition-colors duration-300">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-sm">groups</span>
              </span>
              Compatibilidade
            </h3>
            <div className="space-y-3">
              <CompatibilityBar value={breed.compatibility.children} label="Crianças" />
              <CompatibilityBar value={breed.compatibility.dogs} label="Cães" />
              <CompatibilityBar value={breed.compatibility.cats} label="Gatos" />
              <CompatibilityBar value={breed.compatibility.apartment} label="Apê" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 pb-8 animate-slideUp stagger-6">
          <button className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-4 rounded-2xl font-bold shadow-glow hover:shadow-glow active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">search</span>
            Encontrar Criadores
          </button>
        </div>
      </main>
    </div>
  );
};

export default BreedDetails;
