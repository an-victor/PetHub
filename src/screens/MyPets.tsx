import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../App';
import { OfflineService } from '@/src/services/offlineStorage';

const MyPets: React.FC = () => {
    const navigate = useNavigate();
    const { type } = useParams<{ type: 'dogs' | 'cats' }>();
    const { setIsPetFormOpen, isPetFormOpen } = useAppContext();

    const isDogs = type === 'dogs';
    const pageTitle = isDogs ? 'Meus Cães' : 'Meus Gatos';
    const emoji = isDogs ? '🐕' : '🐈';
    const emptyMessage = isDogs ? 'Você ainda não cadastrou nenhum cão' : 'Você ainda não cadastrou nenhum gato';

    const myPets = useMemo(() => {
        const allPets = OfflineService.getPets();
        return allPets.filter(p => isDogs ? p.type === 'dog' : p.type === 'cat');
    }, [isDogs, isPetFormOpen]);

    return (
        <div className="flex flex-col pb-28 min-h-screen bg-background transition-colors duration-300">
            {/* Header */}
            <header className="bg-surface shadow-soft sticky top-0 z-20 transition-colors duration-300 animate-slideDown">
                <div className="flex items-center justify-between p-4">
                    <button onClick={() => navigate(-1)} className="flex size-11 items-center justify-center rounded-xl hover:bg-background active:scale-95 transition-all duration-200">
                        <span className="material-symbols-outlined text-text-primary transition-colors duration-300">arrow_back</span>
                    </button>
                    <h1 className="text-text-primary text-lg font-bold transition-colors duration-300">{pageTitle}</h1>
                    <button
                        onClick={() => setIsPetFormOpen(true)}
                        className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all duration-200"
                    >
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </div>
            </header>

            <main className="p-5">
                {/* Stats */}
                <div className="bg-surface rounded-2xl p-4 shadow-soft mb-5 animate-slideUp stagger-1">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <span className="text-3xl">{emoji}</span>
                        </div>
                        <div>
                            <p className="text-text-muted text-xs uppercase tracking-wider">Total de {isDogs ? 'cães' : 'gatos'}</p>
                            <p className="text-primary text-3xl font-bold">{myPets.length}</p>
                        </div>
                    </div>
                </div>

                {myPets.length === 0 ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-16 text-center animate-fadeIn">
                        <div className="w-28 h-28 rounded-3xl bg-primary/10 flex items-center justify-center mb-5 animate-float">
                            <span className="text-6xl">{emoji}</span>
                        </div>
                        <p className="text-text-primary font-bold text-xl mb-2">Nenhum pet cadastrado</p>
                        <p className="text-text-muted text-sm mb-6 max-w-[250px]">{emptyMessage}</p>
                        <button
                            onClick={() => setIsPetFormOpen(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-4 rounded-2xl font-bold shadow-glow-sm hover:shadow-glow active:scale-95 transition-all duration-300"
                        >
                            <span className="material-symbols-outlined">add_circle</span>
                            Cadastrar {isDogs ? 'Cão' : 'Gato'}
                        </button>
                    </div>
                ) : (
                    /* Pet List */
                    <div className="space-y-4 animate-slideUp stagger-2">
                        {myPets.map((pet, index) => (
                            <div
                                key={pet.id}
                                onClick={() => navigate(`/pet/${pet.id}`)}
                                className="bg-surface rounded-3xl p-5 shadow-soft flex items-center gap-4 cursor-pointer hover:shadow-soft-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Pet Avatar */}
                                <div className="relative">
                                    <img
                                        src={pet.avatar}
                                        alt={pet.name}
                                        className="w-20 h-20 rounded-2xl object-cover border-3 border-primary/20 shadow-soft"
                                    />
                                    {pet.vaccinesUpToDate && (
                                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-success rounded-xl flex items-center justify-center border-2 border-surface">
                                            <span className="material-symbols-outlined text-white text-sm">verified</span>
                                        </div>
                                    )}
                                </div>

                                {/* Pet Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-text-primary font-bold text-lg truncate">{pet.name}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-md ${pet.gender === 'male' ? 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400' : 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400'}`}>
                                            {pet.gender === 'male' ? '♂ Macho' : '♀ Fêmea'}
                                        </span>
                                    </div>
                                    <p className="text-text-secondary text-sm">{pet.breed}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="text-text-muted text-xs flex items-center gap-1">
                                            <span className="material-symbols-outlined text-xs">cake</span>
                                            {pet.age}
                                        </span>
                                        {pet.weight && (
                                            <span className="text-text-muted text-xs flex items-center gap-1">
                                                <span className="material-symbols-outlined text-xs">monitor_weight</span>
                                                {pet.weight}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">chevron_right</span>
                                </div>
                            </div>
                        ))}

                        {/* Add More Button */}
                        <button
                            onClick={() => setIsPetFormOpen(true)}
                            className="w-full bg-primary/10 dark:bg-primary/20 rounded-3xl p-5 border-2 border-dashed border-primary/30 flex items-center justify-center gap-3 cursor-pointer hover:bg-primary/20 hover:border-primary/50 active:scale-[0.98] transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-2xl">add</span>
                            </div>
                            <span className="text-primary font-bold">Adicionar {isDogs ? 'outro cão' : 'outro gato'}</span>
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyPets;
