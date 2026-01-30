import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Select } from '../ui';
import { OfflineService } from '@/src/services/offlineStorage';
import { PetService } from '@/src/services/petService';
import { useGamification } from '@/src/contexts';
import { toast } from 'sonner';

interface TreatmentFormData {
    petId: string;
    type: 'flea' | 'worm' | 'medication';
    name: string;
    frequencyDays: number;
    lastDate: string;
    nextDate: string;
}

interface TreatmentFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (data: any) => void; // Optional, can handle internal submission or pass up
    preselectedPetId?: string;
}

const treatmentTypes = [
    { value: 'flea', label: 'Antipulgas' },
    { value: 'worm', label: 'Vermífugo' },
    { value: 'medication', label: 'Medicamento Contínuo' },
];

const TreatmentForm: React.FC<TreatmentFormProps> = ({ isOpen, onClose, onSubmit, preselectedPetId }) => {
    const { awardPoints } = useGamification();
    const [petOptions, setPetOptions] = useState<{ value: string; label: string }[]>([]);
    const [formData, setFormData] = useState<TreatmentFormData>({
        petId: preselectedPetId || '',
        type: 'flea',
        name: '',
        frequencyDays: 30,
        lastDate: new Date().toISOString().split('T')[0],
        nextDate: '',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof TreatmentFormData, string>>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const allPets = OfflineService.getPets();
            setPetOptions(allPets.map(p => ({ value: p.id, label: `${p.name} (${p.breed})` })));
            if (preselectedPetId) {
                setFormData(prev => ({ ...prev, petId: preselectedPetId }));
            }
        }
    }, [isOpen, preselectedPetId]);

    // Auto-calculate next date when lastDate or frequency changes
    useEffect(() => {
        if (formData.lastDate && formData.frequencyDays) {
            const last = new Date(formData.lastDate);
            const next = new Date(last);
            next.setDate(last.getDate() + Number(formData.frequencyDays));
            setFormData(prev => ({ ...prev, nextDate: next.toISOString().split('T')[0] }));
        }
    }, [formData.lastDate, formData.frequencyDays]);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof TreatmentFormData, string>> = {};
        if (!formData.petId) newErrors.petId = 'Selecione um pet';
        if (!formData.name) newErrors.name = 'Nome do tratamento é obrigatório';
        if (!formData.frequencyDays || formData.frequencyDays <= 0) newErrors.frequencyDays = 'Frequência inválida';
        if (!formData.lastDate) newErrors.lastDate = 'Data da última dose é obrigatória';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        // Simulate network delay if needed, or just proceed
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            // Call PetService to creating the treatment
            const result = await PetService.createTreatment(formData);

            // Add to Offline Service (PetService mainly handles cloud/local ID logic, 
            // but we need to ensure it's saved to our offline storage correctly if offline)
            // PetService.createTreatment returns { success: true, data: finalTreatment, mode: ... }

            if (result.success) {
                OfflineService.addTreatment(result.data); // Ensure it's in our local list for display

                // Award points
                await awardPoints('registrar_vacina', { treatmentName: formData.name }); // Reusing vaccine logic or similar

                toast.success('Tratamento registrado com sucesso!');

                if (onSubmit) onSubmit(result.data);
                onClose();
            } else {
                toast.error('Erro ao registrar tratamento');
            }
        } catch (error) {
            console.error(error);
            toast.error('Ocorreu um erro');
        } finally {
            setLoading(false);
        }
    };

    const updateField = <K extends keyof TreatmentFormData>(field: K, value: TreatmentFormData[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Novo Tratamento" size="lg">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Pet Selection */}
                <Select
                    label="Pet"
                    options={petOptions}
                    value={formData.petId}
                    onChange={(e) => updateField('petId', e.target.value)}
                    error={errors.petId}
                    placeholder="Selecione o pet..."
                    disabled={!!preselectedPetId}
                />

                {/* Treatment Type */}
                <Select
                    label="Tipo de Tratamento"
                    options={treatmentTypes}
                    value={formData.type}
                    onChange={(e) => updateField('type', e.target.value as any)}
                    error={errors.type}
                />

                {/* Name */}
                <Input
                    label="Nome do Medicamento/Produto"
                    placeholder="Ex: Simparic, Drontal..."
                    icon="medication"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    error={errors.name}
                />

                {/* Frequency & Date Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Frequência (dias)"
                        type="number"
                        placeholder="Ex: 30"
                        icon="update"
                        value={formData.frequencyDays.toString()}
                        onChange={(e) => updateField('frequencyDays', parseInt(e.target.value) || 0)}
                        error={errors.frequencyDays}
                    />

                    <Input
                        label="Última dose"
                        type="date"
                        icon="event"
                        value={formData.lastDate}
                        onChange={(e) => updateField('lastDate', e.target.value)}
                        error={errors.lastDate}
                    />
                </div>

                <Input
                    label="Próxima dose (Calculado)"
                    type="date"
                    icon="event_upcoming"
                    value={formData.nextDate}
                    disabled
                    className="opacity-70 bg-gray-50 dark:bg-gray-800"
                />

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                    <Button variant="secondary" onClick={onClose} fullWidth>
                        Cancelar
                    </Button>
                    <Button type="submit" loading={loading} fullWidth icon="add_circle">
                        Salvar Tratamento
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default TreatmentForm;
