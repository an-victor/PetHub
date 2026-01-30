import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { products, searchProducts } from '@/src/data';

const Nutrition: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'dog' | 'cat' | 'food' | 'toy' | 'accessory' | 'hygiene'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<string[]>([]);

  const filters = [
    { id: 'all', label: 'Todos', icon: 'apps' },
    { id: 'dog', label: 'Cães', icon: 'pets' },
    { id: 'cat', label: 'Gatos', icon: 'cruelty_free' },
    { id: 'food', label: 'Ração', icon: 'restaurant' },
    { id: 'toy', label: 'Brinquedos', icon: 'toys' },
    { id: 'accessory', label: 'Acessórios', icon: 'checkroom' },
    { id: 'hygiene', label: 'Higiene', icon: 'soap' },
  ];

  const filteredProducts = useMemo(() => {
    let result = products;

    // Text search
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }

    // Category filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'dog' || activeFilter === 'cat') {
        result = result.filter(p => p.petType === activeFilter || p.petType === 'all');
      } else {
        result = result.filter(p => p.category === activeFilter);
      }
    }

    return result;
  }, [searchQuery, activeFilter]);

  const toggleCart = (id: string) => {
    setCart(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="flex flex-col pb-28 min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="bg-surface shadow-soft sticky top-0 z-20 transition-colors duration-300 animate-slideDown">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="flex size-11 items-center justify-center rounded-xl hover:bg-background active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined text-text-primary transition-colors duration-300">arrow_back</span>
          </button>
          <h1 className="text-text-primary text-lg font-bold transition-colors duration-300">Loja Pet</h1>
          <button className="relative flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined">shopping_bag</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scaleSpring">
                {cart.length}
              </span>
            )}
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
            placeholder="Buscar produtos, marcas..."
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="px-5 pb-4 animate-slideUp stagger-2">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {filters.map((filter, index) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as typeof activeFilter)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeFilter === filter.id
                ? 'bg-primary text-white shadow-glow-sm'
                : 'bg-surface text-text-secondary shadow-soft hover:shadow-soft-md'
                }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="material-symbols-outlined text-sm">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Count */}
      <div className="px-5 pb-3">
        <p className="text-text-muted text-sm">
          {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Products */}
      <div className="px-5 animate-slideUp stagger-3">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-5xl text-primary">search_off</span>
            </div>
            <p className="text-text-primary font-semibold text-lg mb-1">Nenhum produto encontrado</p>
            <p className="text-text-muted text-sm">Tente outro termo ou filtro</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-surface rounded-3xl p-5 shadow-soft transition-all duration-300 hover:shadow-soft-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-4">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-28 h-28 object-cover rounded-2xl bg-background"
                    />
                    {product.premium && (
                      <span className="absolute -top-2 -left-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[8px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider shadow-soft">
                        Premium
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-wider">{product.brand}</span>
                    <h3 className="text-text-primary font-bold mt-1 truncate transition-colors duration-300">{product.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-warning text-sm material-symbols-fill">star</span>
                      <span className="text-text-primary text-sm font-semibold transition-colors duration-300">{product.rating}</span>
                      <span className="text-text-muted text-xs">({product.reviewCount})</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {product.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-lg">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div>
                    <span className="text-primary text-xl font-bold">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-text-muted text-sm line-through ml-2">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleCart(product.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${cart.includes(product.id)
                      ? 'bg-success text-white shadow-soft'
                      : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                      }`}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {cart.includes(product.id) ? 'check' : 'add_shopping_cart'}
                    </span>
                    <span>{cart.includes(product.id) ? 'Adicionado' : 'Adicionar'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart FAB */}
      {cart.length > 0 && (
        <div className="fixed bottom-28 left-5 right-5 max-w-[440px] mx-auto animate-slideUp">
          <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white py-4 rounded-2xl font-bold shadow-glow hover:shadow-glow active:scale-[0.98] transition-all duration-300">
            <span className="material-symbols-outlined">shopping_cart_checkout</span>
            <span>Ver Carrinho ({cart.length} itens)</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Nutrition;
