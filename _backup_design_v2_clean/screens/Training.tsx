import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { trainingCourses, getCoursesByLevel, getCoursesByCategory, getFreeCourses } from '@/src/data';

const Training: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced' | 'free'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', label: 'Todos', icon: 'apps' },
    { id: 'beginner', label: 'Iniciante', icon: 'child_care' },
    { id: 'intermediate', label: 'Intermediário', icon: 'trending_up' },
    { id: 'advanced', label: 'Avançado', icon: 'military_tech' },
    { id: 'free', label: 'Gratuitos', icon: 'sell' },
  ];

  const levelColors = {
    beginner: 'from-emerald-400 to-teal-500',
    intermediate: 'from-amber-400 to-orange-500',
    advanced: 'from-pink-500 to-rose-600',
  };

  const filteredCourses = useMemo(() => {
    let result = trainingCourses;

    // Search
    if (searchQuery) {
      result = result.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter
    if (activeFilter === 'free') {
      result = getFreeCourses().filter(c =>
        !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (activeFilter !== 'all') {
      result = getCoursesByLevel(activeFilter as 'beginner' | 'intermediate' | 'advanced').filter(c =>
        !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [searchQuery, activeFilter]);

  const featuredCourse = filteredCourses[0];
  const otherCourses = filteredCourses.slice(1);

  const formatPrice = (price?: number) => {
    if (!price) return 'Grátis';
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getLevelLabel = (level: string) => {
    const labels = { beginner: 'Iniciante', intermediate: 'Intermediário', advanced: 'Avançado' };
    return labels[level as keyof typeof labels] || level;
  };

  return (
    <div className="flex flex-col pb-28 min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="bg-surface shadow-soft sticky top-0 z-20 transition-colors duration-300 animate-slideDown">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="flex size-11 items-center justify-center rounded-xl hover:bg-background active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined text-text-primary transition-colors duration-300">arrow_back_ios</span>
          </button>
          <h1 className="text-text-primary text-lg font-bold transition-colors duration-300">Treinamento</h1>
          <button className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined">bookmark</span>
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
            placeholder="Pesquisar cursos..."
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

      <div className="px-5">
        {filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fadeIn">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-5xl text-primary">school</span>
            </div>
            <p className="text-text-primary font-semibold text-lg mb-1">Nenhum curso encontrado</p>
            <p className="text-text-muted text-sm">Tente outro termo ou filtro</p>
          </div>
        ) : (
          <>
            {/* Featured Course */}
            {featuredCourse && (
              <div className="mb-6 animate-slideUp stagger-3">
                <h2 className="text-text-primary font-bold text-lg mb-4 flex items-center gap-2 transition-colors duration-300">
                  <span className="material-symbols-outlined text-primary">star</span>
                  Destaque
                </h2>
                <div className="bg-surface rounded-3xl shadow-soft-lg overflow-hidden cursor-pointer hover:shadow-soft-xl active:scale-[0.99] transition-all duration-300 group">
                  <div
                    className="relative h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url("${featuredCourse.image}")` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <button className="absolute top-4 right-4 w-14 h-14 bg-white/95 rounded-2xl flex items-center justify-center shadow-soft-lg group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <span className="material-symbols-outlined text-primary group-hover:text-white text-2xl material-symbols-fill">play_arrow</span>
                    </button>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-block bg-gradient-to-r ${levelColors[featuredCourse.level]} text-white text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider`}>
                          {getLevelLabel(featuredCourse.level)}
                        </span>
                        {featuredCourse.free && (
                          <span className="bg-success text-white text-xs font-bold px-3 py-1 rounded-lg">
                            GRÁTIS
                          </span>
                        )}
                      </div>
                      <h3 className="text-white font-bold text-xl drop-shadow-lg">{featuredCourse.title}</h3>
                      <div className="flex items-center gap-3 mt-2 text-white/80 text-sm">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          {featuredCourse.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">video_library</span>
                          {featuredCourse.lessons} aulas
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm material-symbols-fill">star</span>
                          {featuredCourse.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Grid */}
            {otherCourses.length > 0 && (
              <div className="animate-slideUp stagger-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-text-primary font-bold text-lg transition-colors duration-300">Mais Cursos</h2>
                  <span className="text-primary text-sm font-semibold">{filteredCourses.length} cursos</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {otherCourses.map((course, index) => (
                    <div
                      key={course.id}
                      className="bg-surface rounded-2xl shadow-soft overflow-hidden cursor-pointer hover:shadow-soft-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 group"
                      style={{ animationDelay: `${(index + 4) * 100}ms` }}
                    >
                      <div
                        className="relative h-28 bg-cover bg-center"
                        style={{ backgroundImage: `url("${course.image}")` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        <button className="absolute top-2 right-2 w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center shadow-soft group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                          <span className="material-symbols-outlined text-primary group-hover:text-white material-symbols-fill">play_arrow</span>
                        </button>
                        <div className="absolute bottom-2 left-2 flex gap-1">
                          <span className={`inline-block bg-gradient-to-r ${levelColors[course.level]} text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider`}>
                            {getLevelLabel(course.level)}
                          </span>
                          {course.free && (
                            <span className="bg-success text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                              GRÁTIS
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="text-text-primary text-sm font-semibold line-clamp-2 leading-tight transition-colors duration-300">{course.title}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 text-text-muted text-xs">
                            <span className="flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-xs">video_library</span>
                              {course.lessons}
                            </span>
                            <span className="flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-xs material-symbols-fill">star</span>
                              {course.rating}
                            </span>
                          </div>
                          <span className={`text-xs font-bold ${course.free ? 'text-success' : 'text-primary'}`}>
                            {formatPrice(course.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Training;
