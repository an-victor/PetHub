import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPetById, currentUser } from '@/src/data';

const DigitalID: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const pet = useMemo(() => getPetById(id || ''), [id]);

    if (!pet) return null;

    // QR Code URL Generator (using API for lightweight implementation)
    // Data encoded: PetHub URL + Pet ID (simulated)
    const qrData = `https://pethub.app/lost-pet/${pet.id}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}&color=2D2D2D`;

    return (
        <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-11 items-center justify-center rounded-2xl bg-surface shadow-soft text-text-primary hover:scale-105 active:scale-95 transition-all"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
                <h1 className="text-text-primary text-lg font-bold">Carteirinha Digital</h1>
                <button
                    onClick={() => alert('Compartilhamento será nativo no mobile!')}
                    className="flex size-11 items-center justify-center rounded-2xl bg-surface shadow-soft text-primary hover:scale-105 active:scale-95 transition-all"
                >
                    <span className="material-symbols-outlined">share</span>
                </button>
            </div>

            <div className="flex-1 px-6 flex flex-col items-center justify-center -mt-10">
                {/* ID CARD */}
                <div className="w-full max-w-[340px] aspect-[3/5] relative rounded-[32px] overflow-hidden shadow-soft-xl animate-scaleIn preserve-3d">
                    {/* Card Background Layer */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-black p-1">
                        <div className="h-full w-full bg-surface/10 backdrop-blur-3xl rounded-[28px] border border-white/20"></div>
                    </div>

                    {/* Content Layer */}
                    <div className="absolute inset-0 flex flex-col p-6 text-white">
                        {/* Top: Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-3xl">pets</span>
                                <span className="font-bold tracking-widest text-sm opacity-80">PETHUB ID</span>
                            </div>
                            <div className="w-12 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                                <div className="w-6 h-4 border-2 border-white/60 rounded-sm"></div>
                            </div>
                        </div>

                        {/* Mid: Photo & Name */}
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-white to-transparent mb-3 shadow-lg">
                                <img
                                    src={pet.avatar}
                                    alt={pet.name}
                                    className="w-full h-full rounded-full object-cover border-4 border-white/10 bg-black/20"
                                />
                            </div>
                            <h2 className="text-3xl font-extrabold tracking-tight mb-1">{pet.name}</h2>
                            <p className="text-white/70 text-sm font-medium uppercase tracking-widest">{pet.breed}</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-2 mb-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center border border-white/5">
                                <p className="text-[10px] text-white/60 uppercase">Sexo</p>
                                <p className="font-bold text-sm">{pet.gender === 'male' ? 'Macho' : 'Fêmea'}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center border border-white/5">
                                <p className="text-[10px] text-white/60 uppercase">Idade</p>
                                <p className="font-bold text-sm">{pet.age}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center border border-white/5">
                                <p className="text-[10px] text-white/60 uppercase">Peso</p>
                                <p className="font-bold text-sm">{pet.weight || '-'}</p>
                            </div>
                        </div>

                        {/* Bottom: QR & Warnings */}
                        <div className="mt-auto bg-white rounded-2xl p-4 text-text-primary flex items-center gap-4 shadow-lg">
                            <div className="w-20 h-20 shrink-0">
                                <img src={qrCodeUrl} alt="QR Code" className="w-full h-full mix-blend-multiply opacity-90" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Proprietário</p>
                                <p className="font-bold text-sm truncate">{currentUser.name}</p>
                                <p className="text-xs text-text-secondary truncate mb-2">{currentUser.phone}</p>

                                {pet.vaccinesUpToDate && (
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full w-fit">
                                        <span className="material-symbols-outlined text-xs">verified</span>
                                        Vacinado
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Holographic Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-12 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                </div>

                <p className="mt-6 text-text-muted text-xs text-center max-w-[250px]">
                    Mostre este QR Code em caso de emergência ou para identificar seu pet.
                </p>
            </div>
        </div>
    );
};

export default DigitalID;
