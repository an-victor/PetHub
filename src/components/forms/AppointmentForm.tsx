import React from 'react';

interface AppointmentFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        onSubmit(Object.fromEntries(formData));
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-md bg-surface rounded-[32px] p-6 shadow-soft-xl animate-scaleUp overflow-hidden">
                {/* Header Decoration */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary via-primary to-primary-dark"></div>
                <div className="absolute top-[-20px] left-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                                <span className="material-symbols-outlined text-white text-2xl">calendar_add_on</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white">Novo Agendamento</h2>
                            <p className="text-white/80 text-sm">Marque uma consulta para seu pet</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 pt-4 bg-background rounded-2xl p-4 shadow-sm">
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase mb-1 ml-1">Tipo de Consulta</label>
                            <select name="type" className="w-full bg-surface border-none rounded-xl p-3 text-text-primary focus:ring-2 focus:ring-primary/20 font-medium">
                                <option value="checkup">Check-up Geral</option>
                                <option value="vaccine">Vacinação</option>
                                <option value="emergency">Urgência</option>
                                <option value="specialist">Especialista</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase mb-1 ml-1">Data</label>
                                <input type="date" name="date" className="w-full bg-surface border-none rounded-xl p-3 text-text-primary focus:ring-2 focus:ring-primary/20 font-medium" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase mb-1 ml-1">Horário</label>
                                <input type="time" name="time" className="w-full bg-surface border-none rounded-xl p-3 text-text-primary focus:ring-2 focus:ring-primary/20 font-medium" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase mb-1 ml-1">Veterinário Preferido</label>
                            <select name="doctor" className="w-full bg-surface border-none rounded-xl p-3 text-text-primary focus:ring-2 focus:ring-primary/20 font-medium">
                                <option value="any">Qualquer disponível</option>
                                <option value="ricardo">Dr. Ricardo Silva</option>
                                <option value="marina">Dra. Marina Costa</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase mb-1 ml-1">Observações</label>
                            <textarea name="notes" rows={2} className="w-full bg-surface border-none rounded-xl p-3 text-text-primary focus:ring-2 focus:ring-primary/20 font-medium resize-none" placeholder="Sintomas ou dúvidas..."></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 rounded-xl shadow-glow hover:shadow-glow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
                        >
                            <span>Confirmar Agendamento</span>
                            <span className="material-symbols-outlined">check_circle</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
