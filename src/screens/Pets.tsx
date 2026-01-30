import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { OfflineService } from '@/src/services/offlineStorage';

const Pets: React.FC = () => {
    const navigate = useNavigate();
    const { setIsPetFormOpen, isPetFormOpen } = useAppContext();

    const { dogs, cats } = useMemo(() => {
        const all = OfflineService.getPets();
        return {
            dogs: all.filter(p => p.type === 'dog'),
            cats: all.filter(p => p.type === 'cat')
        };
    }, [isPetFormOpen]);

    const handleSelect = (type: 'dogs' | 'cats') => {
        navigate(`/my-pets/${type}`);
    };

    return (
        <div className="flex flex-col pb-28 min-h-screen bg-background transition-colors duration-300">
            {/* Header */}
            <header className="bg-surface shadow-soft sticky top-0 z-20 transition-colors duration-300 animate-slideDown">
                <div className="flex items-center justify-between p-4">
                    <button onClick={() => navigate(-1)} className="flex size-11 items-center justify-center rounded-xl hover:bg-background active:scale-95 transition-all duration-200">
                        <span className="material-symbols-outlined text-text-primary transition-colors duration-300">arrow_back</span>
                    </button>
                    <h1 className="text-text-primary text-lg font-bold transition-colors duration-300">Meus Pets</h1>
                    <button
                        onClick={() => setIsPetFormOpen(true)}
                        className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all duration-200"
                    >
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </div>
            </header>

            <main className="p-5 flex flex-col gap-6 items-center justify-center flex-1 min-h-[60vh]">
                <h2 className="text-text-primary text-xl font-bold text-center mb-4">Qual turminha você quer ver?</h2>

                <div className="w-full grid gap-6">
                    {/* Dogs Card */}
                    <div
                        onClick={() => handleSelect('dogs')}
                        className="bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/40 dark:to-orange-900/40 rounded-3xl p-6 flex items-center justify-between cursor-pointer shadow-soft hover:shadow-soft-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-white/50 dark:bg-black/20 rounded-2xl flex items-center justify-center text-5xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                                🐕
                            </div>
                            <div>
                                <h3 className="text-text-primary text-2xl font-bold">Cães</h3>
                                <p className="text-text-secondary font-medium">{dogs.length} cadastrado{dogs.length !== 1 ? 's' : ''}</p>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/50 dark:bg-black/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </div>
                    </div>

                    {/* Cats Card */}
                    <div
                        onClick={() => handleSelect('cats')}
                        className="bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-800/60 dark:to-gray-800/60 rounded-3xl p-6 flex items-center justify-between cursor-pointer shadow-soft hover:shadow-soft-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-white/50 dark:bg-black/20 rounded-2xl flex items-center justify-center text-5xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                                🐈
                            </div>
                            <div>
                                <h3 className="text-text-primary text-2xl font-bold">Gatos</h3>
                                <p className="text-text-secondary font-medium">{cats.length} cadastrado{cats.length !== 1 ? 's' : ''}</p>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/50 dark:bg-black/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Pets;
