import React, { useState, useRef } from 'react';
import { Modal, Button, Input, Select, Toggle } from '../ui';
import { useGamification } from '@/src/contexts';
import { compressImage } from '@/src/utils/imageCompression';

interface PetFormData {
    name: string;
    type: 'dog' | 'cat';
    breed: string;
    birthDate: string;
    gender: 'male' | 'female';
    weight: string;
    color: string;
    neutered: boolean;
    microchip: string;
    avatar: string;
}

interface PetFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: PetFormData) => void;
    initialData?: Partial<PetFormData>;
}

const dogBreeds = [
    { value: 'golden-retriever', label: 'Golden Retriever' },
    { value: 'labrador', label: 'Labrador' },
    { value: 'bulldog', label: 'Bulldog' },
    { value: 'poodle', label: 'Poodle' },
    { value: 'beagle', label: 'Beagle' },
    { value: 'german-shepherd', label: 'Pastor Alemão' },
    { value: 'rottweiler', label: 'Rottweiler' },
    { value: 'shih-tzu', label: 'Shih Tzu' },
    { value: 'pinscher', label: 'Pinscher' },
    { value: 'srd', label: 'SRD (Sem Raça Definida)' },
    { value: 'other', label: 'Outra' },
];

const catBreeds = [
    { value: 'siamese', label: 'Siamês' },
    { value: 'persian', label: 'Persa' },
    { value: 'maine-coon', label: 'Maine Coon' },
    { value: 'british-shorthair', label: 'British Shorthair' },
    { value: 'ragdoll', label: 'Ragdoll' },
    { value: 'bengal', label: 'Bengal' },
    { value: 'srd', label: 'SRD (Sem Raça Definida)' },
    { value: 'other', label: 'Outra' },
];

const PetForm: React.FC<PetFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const { awardPoints } = useGamification();
    const [formData, setFormData] = useState<PetFormData>({
        name: initialData?.name || '',
        type: initialData?.type || 'dog',
        breed: initialData?.breed || '',
        birthDate: initialData?.birthDate || '',
        gender: initialData?.gender || 'male',
        weight: initialData?.weight || '',
        color: initialData?.color || '',
        neutered: initialData?.neutered || false,
        microchip: initialData?.microchip || '',
        avatar: initialData?.avatar || '',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof PetFormData, string>>>({});
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const breeds = formData.type === 'dog' ? dogBreeds : catBreeds;

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof PetFormData, string>> = {};
        if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
        if (!formData.breed) newErrors.breed = 'Raça é obrigatória';
        if (!formData.birthDate) newErrors.birthDate = 'Data de nascimento é obrigatória';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

        // Award gamification points for adding pet
        await awardPoints('adicionar_pet', { petName: formData.name });

        onSubmit(formData);
        setLoading(false);
        onClose();
    };

    const updateField = <K extends keyof PetFormData>(field: K, value: PetFormData[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                // Compress image before setting state
                const compressed = await compressImage(file, 800, 0.7);
                updateField('avatar', compressed);
            } catch (err) {
                console.error("Error compressing image:", err);
                // Fallback to normal reading if compression fails
                const reader = new FileReader();
                reader.onloadend = () => {
                    updateField('avatar', reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Editar Pet' : 'Cadastrar Novo Pet'} size="lg">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Avatar Upload */}
                <div className="flex justify-center mb-2">
                    <div
                        className="relative group cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div
                            className={`w-32 h-32 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-surface overflow-hidden transition-all group-hover:brightness-90 ${!formData.avatar ? 'bg-primary/10' : ''}`}
                        >
                            {formData.avatar ? (
                                <img src={formData.avatar} alt="Pet Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center text-primary/50">
                                    <span className="material-symbols-outlined text-4xl">add_a_photo</span>
                                    <span className="text-xs font-semibold mt-1">Adicionar Foto</span>
                                </div>
                            )}
                        </div>
                        <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md border-2 border-white transform translate-x-1 translate-y-1">
                            <span className="material-symbols-outlined text-sm">edit</span>
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

                {/* Pet Type Toggle */}
                <div className="flex bg-background rounded-2xl p-1.5">
                    <button
                        type="button"
                        onClick={() => updateField('type', 'dog')}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${formData.type === 'dog'
                            ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm'
                            : 'text-text-muted hover:text-text-secondary'
                            }`}
                    >
                        <span className="text-lg">🐕</span> Cachorro
                    </button>
                    <button
                        type="button"
                        onClick={() => updateField('type', 'cat')}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${formData.type === 'cat'
                            ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm'
                            : 'text-text-muted hover:text-text-secondary'
                            }`}
                    >
                        <span className="text-lg">🐈</span> Gato
                    </button>
                </div>

                {/* Name */}
                <Input
                    label="Nome do Pet"
                    placeholder="Ex: Max"
                    icon="pets"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    error={errors.name}
                />

                {/* Breed */}
                <Select
                    label="Raça"
                    options={breeds}
                    value={formData.breed}
                    onChange={(e) => updateField('breed', e.target.value)}
                    error={errors.breed}
                />

                {/* Gender */}
                <div>
                    <label className="block text-text-primary text-sm font-semibold mb-2">Sexo</label>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => updateField('gender', 'male')}
                            className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all ${formData.gender === 'male'
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border text-text-secondary hover:border-primary/50'
                                }`}
                        >
                            ♂️ Macho
                        </button>
                        <button
                            type="button"
                            onClick={() => updateField('gender', 'female')}
                            className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all ${formData.gender === 'female'
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border text-text-secondary hover:border-primary/50'
                                }`}
                        >
                            ♀️ Fêmea
                        </button>
                    </div>
                </div>

                {/* Birth Date */}
                <Input
                    label="Data de Nascimento"
                    type="date"
                    icon="cake"
                    value={formData.birthDate}
                    onChange={(e) => updateField('birthDate', e.target.value)}
                    error={errors.birthDate}
                />

                {/* Weight and Color */}
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Peso (kg)"
                        placeholder="Ex: 15"
                        icon="scale"
                        value={formData.weight}
                        onChange={(e) => updateField('weight', e.target.value)}
                    />
                    <Input
                        label="Cor"
                        placeholder="Ex: Dourado"
                        icon="palette"
                        value={formData.color}
                        onChange={(e) => updateField('color', e.target.value)}
                    />
                </div>

                {/* Microchip */}
                <Input
                    label="Microchip (opcional)"
                    placeholder="Número do microchip"
                    icon="memory"
                    value={formData.microchip}
                    onChange={(e) => updateField('microchip', e.target.value)}
                />

                {/* Neutered */}
                <div className="flex items-center justify-between p-4 bg-background rounded-2xl">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">medical_services</span>
                        <span className="text-text-primary font-medium">Castrado(a)</span>
                    </div>
                    <Toggle checked={formData.neutered} onChange={(v) => updateField('neutered', v)} />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                    <Button variant="secondary" onClick={onClose} fullWidth>
                        Cancelar
                    </Button>
                    <Button type="submit" loading={loading} fullWidth icon="check">
                        Salvar Pet
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default PetForm;
