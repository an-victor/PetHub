import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../App';
import { OfflineService } from '@/src/services/offlineStorage';
import { getTreatmentsByPet } from '@/src/data'; // Keeping this static for now or moving to OfflineService later

const PetDetails: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { setIsVaccineFormOpen, isVaccineFormOpen, setIsPetFormOpen, isTreatmentFormOpen, setIsTreatmentFormOpen } = useAppContext();
    const [showVaccines, setShowVaccines] = useState(false);
    const [showTreatments, setShowTreatments] = useState(true); // Default open for visibility
    const [vaccineTab, setVaccineTab] = useState<'upcoming' | 'history'>('upcoming');

    // Dynamic Data Fetching
    const pet = useMemo(() => {
        const p = OfflineService.getPets().find(pet => pet.id === id);
        return p;
    }, [id]);

    const vaccines = useMemo(() => {
        const all = OfflineService.getVaccinesByPet(id || '');
        return all;
    }, [id, isVaccineFormOpen]);

    const upcomingVaccines = useMemo(() => {
        return vaccines.filter(v => v.status === 'upcoming' || v.status === 'overdue');
    }, [vaccines]);

    const appliedVaccines = useMemo(() => {
        return vaccines.filter(v => v.status === 'applied');
    }, [vaccines]);

    // Update treatments when form closes (implying potential new data)
    const treatments = useMemo(() => OfflineService.getTreatmentsByPet(id || ''), [id, isTreatmentFormOpen]);

    // Local state for avatar to allow immediate preview update
    const [avatar, setAvatar] = useState(pet?.avatar || '');
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!pet) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background p-5">
                <div className="w-24 h-24 rounded-3xl bg-danger/10 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-5xl text-danger">error</span>
                </div>
                <p className="text-text-primary font-bold text-xl mb-2">Pet não encontrado</p>
                <button
                    onClick={() => navigate(-1)}
                    className="text-primary font-semibold"
                >
                    Voltar
                </button>
            </div>
        );
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
                // Here you would typically upload to backend
            };
            reader.readAsDataURL(file);
        }
    };

    const emoji = pet.type === 'dog' ? '🐕' : '🐈';

    const infoItems = [
        { icon: 'cake', label: 'Idade', value: pet.age },
        { icon: 'palette', label: 'Cor', value: pet.color || 'Não informado' },
        { icon: 'monitor_weight', label: 'Peso', value: pet.weight || 'Não informado' },
        { icon: 'pets', label: 'Raça', value: pet.breed },
        { icon: pet.gender === 'male' ? 'male' : 'female', label: 'Sexo', value: pet.gender === 'male' ? 'Macho' : 'Fêmea' },
        { icon: 'medical_services', label: 'Castrado', value: pet.neutered ? 'Sim' : 'Não' },
    ];

    return (
        <div className="flex flex-col pb-28 min-h-screen bg-background transition-colors duration-300">
            {/* Header with Pet Photo */}
            <div className="relative">
                <div
                    className="h-72 bg-cover bg-center transition-all duration-500"
                    style={{ backgroundImage: `url("${avatar}")` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30"></div>

                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-4 left-4 flex size-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 active:scale-95 transition-all duration-200"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>

                    {/* Edit Button */}
                    <button
                        onClick={() => setIsPetFormOpen(true)}
                        className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 active:scale-95 transition-all duration-200"
                    >
                        <span className="material-symbols-outlined">edit</span>
                    </button>

                    {/* ID Card Button */}
                    <button
                        onClick={() => navigate(`/pet/${pet.id}/id-card`)}
                        className="absolute top-4 right-16 flex size-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 active:scale-95 transition-all duration-200"
                    >
                        <span className="material-symbols-outlined">badge</span>
                    </button>
                </div>

                {/* Pet Avatar Overlay */}
                <div className="absolute -bottom-16 left-5">
                    <div
                        className="relative group cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <img
                            src={avatar}
                            alt={pet.name}
                            className="w-32 h-32 rounded-3xl object-cover border-4 border-surface shadow-soft-xl transition-all duration-300 group-hover:brightness-90"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <span className="material-symbols-outlined text-white text-3xl drop-shadow-md">edit</span>
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-surface rounded-2xl flex items-center justify-center shadow-soft text-2xl">
                            {emoji}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
            </div>

            {/* Pet Name and Status */}
            <div className="px-5 pt-20 pb-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-text-primary text-2xl font-bold">{pet.name}</h1>
                        <p className="text-text-secondary">{pet.breed}</p>
                    </div>
                    <div className="flex gap-2">
                        {pet.vaccinesUpToDate && (
                            <span className="bg-success/10 text-success text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">verified</span>
                                Vacinado
                            </span>
                        )}
                        {pet.neutered && (
                            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                Castrado
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Info Cards */}
            <div className="px-5 pb-5">
                <div className="bg-surface rounded-3xl p-5 shadow-soft animate-slideUp">
                    <h3 className="text-text-primary font-bold mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">info</span>
                        Informações
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {infoItems.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 bg-background rounded-2xl"
                            >
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span>
                                </div>
                                <div>
                                    <p className="text-text-muted text-[10px] uppercase tracking-wider">{item.label}</p>
                                    <p className="text-text-primary font-semibold text-sm">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Microchip */}
                    {pet.microchip && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">memory</span>
                                <div>
                                    <p className="text-text-muted text-xs">Microchip</p>
                                    <p className="text-text-primary font-mono font-semibold">{pet.microchip}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Vaccine Card */}
            <div className="px-5 pb-5">
                <div
                    className="bg-surface rounded-3xl shadow-soft overflow-hidden animate-slideUp cursor-pointer"
                    onClick={() => setShowVaccines(!showVaccines)}
                >
                    <div className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-glow-sm">
                                <span className="material-symbols-outlined text-white text-2xl">vaccines</span>
                            </div>
                            <div>
                                <h3 className="text-text-primary font-bold text-lg">Caderneta de Vacinas</h3>
                                <p className="text-text-muted text-sm">
                                    {vaccines.length > 0
                                        ? `${vaccines.length} vacina${vaccines.length > 1 ? 's' : ''} registrada${vaccines.length > 1 ? 's' : ''}`
                                        : 'Nenhuma vacina registrada'
                                    }
                                </p>
                            </div>
                        </div>
                        <div className={`w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center transition-transform duration-300 ${showVaccines ? 'rotate-180' : ''}`}>
                            <span className="material-symbols-outlined text-primary">expand_more</span>
                        </div>
                    </div>

                    {/* Expanded Vaccine Section */}
                    {showVaccines && (
                        <div className="border-t border-border">
                            {vaccines.length === 0 ? (
                                /* Empty State */
                                <div className="p-6 text-center">
                                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                        <span className="material-symbols-outlined text-4xl text-primary">syringe</span>
                                    </div>
                                    <p className="text-text-primary font-semibold mb-1">Nenhuma vacina cadastrada</p>
                                    <p className="text-text-muted text-sm mb-4">Registre as vacinas de {pet.name}</p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsVaccineFormOpen(true);
                                        }}
                                        className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-2xl font-bold shadow-glow-sm hover:shadow-glow active:scale-95 transition-all duration-300 flex items-center gap-2 mx-auto"
                                    >
                                        <span className="material-symbols-outlined">add</span>
                                        Cadastrar Vacina
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Vaccine Tabs */}
                                    <div className="flex bg-background m-4 rounded-xl p-1">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setVaccineTab('upcoming'); }}
                                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${vaccineTab === 'upcoming' ? 'bg-surface shadow-soft text-primary' : 'text-text-muted'}`}
                                        >
                                            Próximas ({upcomingVaccines.length})
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setVaccineTab('history'); }}
                                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${vaccineTab === 'history' ? 'bg-surface shadow-soft text-primary' : 'text-text-muted'}`}
                                        >
                                            Histórico ({appliedVaccines.length})
                                        </button>
                                    </div>

                                    {/* Vaccine List */}
                                    <div className="px-4 pb-4 space-y-3">
                                        {(vaccineTab === 'upcoming' ? upcomingVaccines : appliedVaccines).map((vaccine) => (
                                            <div
                                                key={vaccine.id}
                                                className={`p-4 rounded-2xl flex items-center gap-4 ${vaccine.status === 'overdue'
                                                    ? 'bg-danger/10 border border-danger/30'
                                                    : vaccine.status === 'upcoming'
                                                        ? 'bg-warning/10 border border-warning/30'
                                                        : 'bg-success/10 border border-success/30'
                                                    }`}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${vaccine.status === 'overdue' ? 'bg-danger/20' :
                                                    vaccine.status === 'upcoming' ? 'bg-warning/20' : 'bg-success/20'
                                                    }`}>
                                                    <span className={`material-symbols-outlined ${vaccine.status === 'overdue' ? 'text-danger' :
                                                        vaccine.status === 'upcoming' ? 'text-warning' : 'text-success'
                                                        }`}>
                                                        {vaccine.status === 'applied' ? 'check_circle' : 'schedule'}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-text-primary font-semibold">{vaccine.name}</p>
                                                    <p className="text-text-muted text-xs">
                                                        {vaccine.status === 'applied' ? 'Aplicada em' : 'Próxima dose'}: {vaccine.date}
                                                    </p>
                                                    {vaccine.clinic && (
                                                        <p className="text-text-muted text-xs mt-0.5">{vaccine.clinic}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add More Button */}
                                    <div className="px-4 pb-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsVaccineFormOpen(true);
                                            }}
                                            className="w-full py-3 rounded-2xl border-2 border-dashed border-primary/30 text-primary font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-lg">add</span>
                                            Adicionar Vacina
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Treatments Card */}
            <div className="px-5 pb-5">
                <div
                    className="bg-surface rounded-3xl shadow-soft overflow-hidden animate-slideUp cursor-pointer"
                    style={{ animationDelay: '100ms' }}
                    onClick={() => setShowTreatments(!showTreatments)}
                >
                    <div className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow-sm">
                                <span className="material-symbols-outlined text-white text-2xl">medication</span>
                            </div>
                            <div>
                                <h3 className="text-text-primary font-bold text-lg">Tratamentos</h3>
                                <p className="text-text-muted text-sm">
                                    Antipulgas, vermífugos e meds
                                </p>
                            </div>
                        </div>
                        <div className={`w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center transition-transform duration-300 ${showTreatments ? 'rotate-180' : ''}`}>
                            <span className="material-symbols-outlined text-indigo-500">expand_more</span>
                        </div>
                    </div>

                    {showTreatments && (
                        <div className="border-t border-border p-4 space-y-3">
                            {treatments.length === 0 ? (
                                <div className="text-center py-4">
                                    <p className="text-text-muted text-sm">Nenhum tratamento recorrente.</p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsTreatmentFormOpen(true);
                                        }}
                                        className="text-indigo-500 font-bold text-sm mt-2"
                                    >
                                        Adicionar Tratamento
                                    </button>
                                </div>
                            ) : (
                                treatments.map((t) => {
                                    const isDue = t.status === 'due';
                                    const isOverdue = t.status === 'overdue';

                                    return (
                                        <div key={t.id} className={`p-4 rounded-2xl border flex gap-4 items-center relative overflow-hidden ${isOverdue ? 'bg-danger/5 border-danger/30' :
                                            isDue ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-500/30' :
                                                'bg-background border-border'
                                            }`}>
                                            {/* Status Stripe */}
                                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${isOverdue ? 'bg-danger' : isDue ? 'bg-amber-500' : 'bg-success'
                                                }`}></div>

                                            <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center shadow-sm shrink-0">
                                                <span className={`material-symbols-outlined ${t.type === 'flea' ? 'text-orange-500' :
                                                    t.type === 'worm' ? 'text-pink-500' : 'text-indigo-500'
                                                    }`}>
                                                    {t.type === 'flea' ? 'bug_report' : t.type === 'worm' ? 'pest_control' : 'pill'}
                                                </span>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-text-primary truncate">{t.name}</h4>
                                                    {isDue && (
                                                        <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">HOJE</span>
                                                    )}
                                                    {isOverdue && (
                                                        <span className="bg-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-full">ATRASADO</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs text-text-muted flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[14px]">event</span>
                                                        Próximo: {new Date(t.nextDate).toLocaleDateString('pt-BR')}
                                                    </span>
                                                </div>
                                            </div>

                                            <button className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${isDue || isOverdue ? 'bg-primary text-white hover:scale-110' : 'bg-surface border border-border text-text-muted'
                                                }`}>
                                                <span className="material-symbols-outlined text-lg">check</span>
                                            </button>
                                        </div>
                                    );
                                })
                            )}

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsTreatmentFormOpen(true);
                                }}
                                className="w-full py-3 mt-2 rounded-xl border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">add_circle</span>
                                Novo Tratamento
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="px-5 pb-5">
                <div className="bg-surface rounded-3xl p-5 shadow-soft animate-slideUp">
                    <h3 className="text-text-primary font-bold mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">bolt</span>
                        Ações Rápidas
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { icon: 'calendar_add_on', label: 'Agendar', path: '/agenda' },
                            { icon: 'medical_services', label: 'Veterinário', path: '/vets' },
                            { icon: 'content_cut', label: 'Banho', path: '/bath' },
                        ].map((action) => (
                            <button
                                key={action.label}
                                onClick={() => navigate(action.path)}
                                className="flex flex-col items-center gap-2 p-4 bg-background rounded-2xl hover:bg-primary/10 active:scale-95 transition-all"
                            >
                                <span className="material-symbols-outlined text-primary text-2xl">{action.icon}</span>
                                <span className="text-text-secondary text-xs font-medium">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetDetails;
