
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Nutrition: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: '1',
      brand: 'SUPER PREMIUM',
      name: 'Royal Canin Medium Adult',
      price: 'R$ 289,90',
      rating: '4.9',
      reviews: '1.2k',
      tags: ['Saúde Digestiva', 'Pelagem'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjwWz2MxWemT6RJm-1tmEau0dhdP3iSx2wBQuApJKDGtNH2hkeVlxCmiEEexhhn0Fdf2MeSc6cNExrb2AqK148pQCMEKGY4G9m6UqAQGssVV41LIJ0_ijUcLqD0lDL4wILPGlc3RftxdDL50es9n55DMUF6S9Jotck657JMKmxSz5f73zDTam3aVKL7ffQQLJ0BQWP2ys0v2k0PzdrJrIMGksO4lARwpanD2yVZSWY6TIu2Sa-qcNbe8-abX9cosFUbXPqOBL0VVZ1'
    },
    {
      id: '2',
      brand: 'NATURAL',
      name: 'Guabi Natural Cães Adultos',
      price: 'R$ 315,00',
      rating: '4.8',
      reviews: '850',
      tags: ['Grain Free', 'Sem Corantes'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5tzT9T0LVwiyOK4VeK-7CVOFxvY8wK91IUG535DRxZwmt0kecPYBptCpIIx1hQyqqpwrwwsCtEk52Mfzm6HI_vf6seQTeVeZNKDq0YPhR8jcVnI0j729ZjRS2e564wxOev8vkh4dZftlTbvpEdIST1rxWaiFmLbYkyhnNpA0IOJJvFt5lSufQGNvFFmcbCQIpEjtDld6icJ4xJf795sU_M6GmLujOR35-4etM6zNjhF719t0LY8Ql4X-uhGZdt91jdJJjc6qjVpXk'
    }
  ];

  return (
    <div className="flex flex-col pb-24 bg-background-light dark:bg-background-dark min-h-screen">
      <div className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-primary flex size-12 items-center">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
        </button>
        <h2 className="text-[#1c140d] dark:text-white text-lg font-bold flex-1 text-center">Melhores Rações</h2>
        <button className="flex w-12 items-center justify-end text-primary">
          <span className="material-symbols-outlined">shopping_basket</span>
        </button>
      </div>

      <div className="px-4 py-3">
        <div className="flex w-full items-stretch rounded-xl h-14 shadow-sm bg-primary/10">
          <div className="text-primary flex items-center justify-center pl-4">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input 
            className="flex-1 border-none bg-transparent focus:ring-0 placeholder:text-primary/60 px-4 text-base font-medium" 
            placeholder="Buscar marcas premium..." 
          />
        </div>
      </div>

      <div className="flex gap-3 p-4 overflow-x-auto no-scrollbar">
        <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-primary text-white px-5 shadow-md">
          <span className="text-sm font-bold">Todos</span>
        </button>
        {['Cães', 'Gatos', 'Grain Free'].map(filter => (
          <button key={filter} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#32251a] border border-primary/20 px-5">
            <span className="text-sm font-semibold">{filter}</span>
            {filter !== 'Grain Free' && <span className="material-symbols-outlined text-lg">expand_more</span>}
          </button>
        ))}
      </div>

      <div className="px-4 pt-2">
        <h3 className="text-lg font-extrabold">Recomendados para você</h3>
      </div>

      <div className="flex flex-col gap-4 p-4">
        {products.map(product => (
          <div key={product.id} className="flex flex-col gap-3 rounded-xl bg-white dark:bg-[#2d2218] p-4 shadow-sm border border-orange-100 dark:border-white/5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-1 flex-col gap-1">
                <p className="text-primary text-[10px] font-extrabold tracking-widest uppercase">{product.brand}</p>
                <p className="text-base font-bold leading-tight">{product.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-yellow-400 text-sm material-symbols-fill">star</span>
                  <p className="text-[#9c7349] dark:text-orange-200/60 text-xs font-semibold">{product.rating} ({product.reviews} avaliações)</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-orange-50 text-primary text-[10px] font-bold uppercase">{tag}</span>
                  ))}
                </div>
              </div>
              <div 
                className="w-24 h-24 bg-center bg-no-repeat bg-contain rounded-lg shrink-0" 
                style={{ backgroundImage: `url("${product.image}")` }}
              ></div>
            </div>
            <div className="flex items-center justify-between mt-2 pt-3 border-t border-orange-50 dark:border-white/5">
              <span className="text-primary font-extrabold text-lg">{product.price}</span>
              <button className="flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-white font-bold text-sm gap-2">
                <span>Ver detalhes</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nutrition;
