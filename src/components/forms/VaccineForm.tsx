import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Select } from '../ui';
import { OfflineService } from '@/src/services/offlineStorage';
import { useGamification } from '@/src/contexts';
import { BarcodeScanner } from '../ui/BarcodeScanner';

interface VaccineFormData {
    petId: string;
    name: string;
    date: string;
    vet: string;
    clinic: string;
    batch: string;
    notes: string;
}

interface VaccineFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: VaccineFormData) => void;
    preselectedPetId?: string;
}

const vaccineTypes = [
    { value: 'antirrabica', label: 'Antirrábica' },
    { value: 'v10', label: 'V10 (Polivalente Cães)' },
    { value: 'v8', label: 'V8 (Polivalente Cães)' },
    { value: 'v4-felina', label: 'V4 (Quádrupla Felina)' },
    { value: 'v5-felina', label: 'V5 (Quíntupla Felina)' },
    { value: 'gripe-canina', label: 'Gripe Canina' },
    { value: 'giardia', label: 'Giárdia' },
    { value: 'leishmaniose', label: 'Leishmaniose' },
    { value: 'felv', label: 'FeLV (Leucemia Felina)' },
    { value: 'fiv', label: 'FIV (Imunodeficiência Felina)' },
    { value: 'other', label: 'Outra' },
];

const VaccineForm: React.FC<VaccineFormProps> = ({ isOpen, onClose, onSubmit, preselectedPetId }) => {
    const { awardPoints } = useGamification();
    const [petOptions, setPetOptions] = useState<{ value: string; label: string }[]>([]);
    const [formData, setFormData] = useState<VaccineFormData>({
        petId: preselectedPetId || '',
        name: '',
        date: new Date().toISOString().split('T')[0],
        vet: '',
        clinic: '',
        batch: '',
        notes: '',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof VaccineFormData, string>>>({});
    const [loading, setLoading] = useState(false);
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const allPets = OfflineService.getPets();
            setPetOptions(allPets.map(p => ({ value: p.id, label: `${p.name} (${p.breed})` })));
            if (preselectedPetId) {
                setFormData(prev => ({ ...prev, petId: preselectedPetId }));
            }
        }
    }, [isOpen, preselectedPetId]);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof VaccineFormData, string>> = {};
        if (!formData.petId) newErrors.petId = 'Selecione um pet';
        if (!formData.name) newErrors.name = 'Selecione a vacina';
        if (!formData.date) newErrors.date = 'Data é obrigatória';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Award gamification points for registering vaccine
        await awardPoints('registrar_vacina', { vaccineName: formData.name });

        onSubmit(formData);
        setLoading(false);
        onClose();
    };

    const updateField = <K extends keyof VaccineFormData>(field: K, value: VaccineFormData[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Registrar Vacina" size="lg">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Pet Selection */}
                <Select
                    label="Pet"
                    options={petOptions}
                    value={formData.petId}
                    onChange={(e) => updateField('petId', e.target.value)}
                    error={errors.petId}
                    placeholder="Selecione o pet..."
                />

                {/* Vaccine Type */}
                <Select
                    label="Vacina"
                    options={vaccineTypes}
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    error={errors.name}
                    placeholder="Selecione a vacina..."
                />

                {/* Date */}
                <Input
                    label="Data de Aplicação"
                    type="date"
                    icon="event"
                    value={formData.date}
                    onChange={(e) => updateField('date', e.target.value)}
                    error={errors.date}
                />

                {/* Vet and Clinic */}
                <div className="grid grid-cols-1 gap-4">
                    <Input
                        label="Veterinário (opcional)"
                        placeholder="Nome do veterinário"
                        icon="person"
                        value={formData.vet}
                        onChange={(e) => updateField('vet', e.target.value)}
                    />
                    <Input
                        label="Clínica (opcional)"
                        placeholder="Nome da clínica"
                        icon="local_hospital"
                        value={formData.clinic}
                        onChange={(e) => updateField('clinic', e.target.value)}
                    />
                </div>

                {/* Batch with Scanner */}
                <div className="relative">
                    <Input
                        label="Lote da Vacina (opcional)"
                        placeholder="Ex: VAC2026-1234"
                        icon="qr_code"
                        value={formData.batch}
                        onChange={(e) => updateField('batch', e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setIsScannerOpen(true)}
                        className="absolute right-3 top-[34px] w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-all active:scale-95"
                        title="Escanear código de barras"
                    >
                        <span className="material-symbols-outlined text-xl">center_focus_weak</span>
                    </button>
                </div>

                {isScannerOpen && (
                    <BarcodeScanner
                        onResult={(result) => {
                            updateField('batch', result);
                            setIsScannerOpen(false);
                            if (navigator.vibrate) navigator.vibrate(200);
                        }}
                        onClose={() => setIsScannerOpen(false)}
                    />
                )}

                {/* Notes */}
                <div>
                    <label className="block text-text-primary text-sm font-semibold mb-2">
                        Observações (opcional)
                    </label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => updateField('notes', e.target.value)}
                        placeholder="Observações sobre a vacinação..."
                        className="w-full bg-surface rounded-2xl py-3.5 px-4 text-sm border-2 border-transparent focus:border-primary focus:outline-none focus:shadow-glow-sm transition-all duration-300 text-text-primary placeholder:text-text-muted resize-none h-24"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                    <Button variant="secondary" onClick={onClose} fullWidth>
                        Cancelar
                    </Button>
                    <Button type="submit" loading={loading} fullWidth icon="vaccines">
                        Registrar Vacina
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default VaccineForm;
