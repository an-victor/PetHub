import React, { useState, useRef } from 'react';
import { Modal, Button, Input, Select, Toggle } from '../ui';
import { brazilianStates, getCitiesByStateCode, getSavedLocation } from '../../services/location';

interface DonationFormData {
    petName: string;
    type: 'dog' | 'cat';
    breed: string;
    age: string;
    gender: 'male' | 'female';
    size: 'small' | 'medium' | 'large';
    description: string;
    vaccinated: boolean;
    neutered: boolean;
    stateCode: string;
    city: string;
    phone: string;
    urgent: boolean;
    image: string;
}

interface DonationFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: DonationFormData) => void;
}

const dogBreeds = [
    { value: 'srd', label: 'SRD (Vira-lata)' },
    { value: 'golden-retriever', label: 'Golden Retriever' },
    { value: 'labrador', label: 'Labrador' },
    { value: 'bulldog', label: 'Bulldog' },
    { value: 'poodle', label: 'Poodle' },
    { value: 'pit-bull', label: 'Pit Bull' },
    { value: 'rottweiler', label: 'Rottweiler' },
    { value: 'pastor-alemao', label: 'Pastor Alemão' },
    { value: 'other', label: 'Outra raça' },
];

const catBreeds = [
    { value: 'srd', label: 'SRD (Sem Raça Definida)' },
    { value: 'siames', label: 'Siamês' },
    { value: 'persa', label: 'Persa' },
    { value: 'maine-coon', label: 'Maine Coon' },
    { value: 'other', label: 'Outra raça' },
];

const ageOptions = [
    { value: 'filhote', label: 'Filhote (até 1 ano)' },
    { value: 'jovem', label: 'Jovem (1-3 anos)' },
    { value: 'adulto', label: 'Adulto (3-7 anos)' },
    { value: 'senior', label: 'Sênior (7+ anos)' },
];

const DonationForm: React.FC<DonationFormProps> = ({ isOpen, onClose, onSubmit }) => {
    const userLocation = getSavedLocation();

    const [formData, setFormData] = useState<DonationFormData>({
        petName: '',
        type: 'dog',
        breed: '',
        age: '',
        gender: 'male',
        size: 'medium',
        description: '',
        vaccinated: false,
        neutered: false,
        stateCode: userLocation.stateCode,
        city: userLocation.city,
        phone: '',
        urgent: false,
        image: '',
    });

    const [cities, setCities] = useState<string[]>(getCitiesByStateCode(userLocation.stateCode));
    const [errors, setErrors] = useState<Partial<Record<keyof DonationFormData, string>>>({});
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const breeds = formData.type === 'dog' ? dogBreeds : catBreeds;

    const handleStateChange = (stateCode: string) => {
        const newCities = getCitiesByStateCode(stateCode);
        setCities(newCities);
        setFormData(prev => ({ ...prev, stateCode, city: newCities[0] || '' }));
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof DonationFormData, string>> = {};
        if (!formData.petName.trim()) newErrors.petName = 'Nome é obrigatório';
        if (!formData.breed) newErrors.breed = 'Raça é obrigatória';
        if (!formData.age) newErrors.age = 'Idade é obrigatória';
        if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória';
        if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
        if (!formData.image) newErrors.image = 'Foto é obrigatória para adoção';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        onSubmit(formData);
        setLoading(false);
        onClose();
    };

    const updateField = <K extends keyof DonationFormData>(field: K, value: DonationFormData[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                updateField('image', result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Cadastrar Pet para Doação" size="full">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Info Banner */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-4 flex items-start gap-3 border border-primary/20">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">volunteer_activism</span>
                    <div>
                        <p className="text-text-primary text-sm font-medium">Obrigado por ajudar! 💕</p>
                        <p className="text-text-secondary text-xs mt-1">
                            Seu pet aparecerá na lista de adoção para encontrar uma nova família.
                        </p>
                    </div>
                </div>

                {/* Image Upload */}
                <div className="flex justify-center mb-2">
                    <div
                        className={`relative group cursor-pointer w-full h-48 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all ${formData.image ? 'border-primary' : errors.image ? 'border-danger bg-danger/5' : 'border-border hover:border-primary/50'
                            }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {formData.image ? (
                            <>
                                <img src={formData.image} alt="Pet" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white font-medium flex items-center gap-2">
                                        <span className="material-symbols-outlined">edit</span>
                                        Alterar Foto
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center text-text-muted">
                                <span className={`material-symbols-outlined text-4xl mb-2 ${errors.image ? 'text-danger' : ''}`}>add_a_photo</span>
                                <span className={`text-sm font-medium ${errors.image ? 'text-danger' : ''}`}>
                                    Adicionar Foto do Pet
                                </span>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                {errors.image && <p className="text-danger text-xs text-center -mt-3">{errors.image}</p>}

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

                {/* Pet Name */}
                <Input
                    label="Nome do Pet"
                    placeholder="Ex: Rex, Luna..."
                    icon="pets"
                    value={formData.petName}
                    onChange={(e) => updateField('petName', e.target.value)}
                    error={errors.petName}
                />

                {/* Breed and Age */}
                <div className="grid grid-cols-2 gap-4">
                    <Select
                        label="Raça"
                        options={breeds}
                        value={formData.breed}
                        onChange={(e) => updateField('breed', e.target.value)}
                        error={errors.breed}
                    />
                    <Select
                        label="Idade"
                        options={ageOptions}
                        value={formData.age}
                        onChange={(e) => updateField('age', e.target.value)}
                        error={errors.age}
                    />
                </div>

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

                {/* Size */}
                <div>
                    <label className="block text-text-primary text-sm font-semibold mb-2">Porte</label>
                    <div className="flex gap-2">
                        {[
                            { value: 'small', label: 'Pequeno', icon: '🐕' },
                            { value: 'medium', label: 'Médio', icon: '🐕‍🦺' },
                            { value: 'large', label: 'Grande', icon: '🦮' },
                        ].map((size) => (
                            <button
                                key={size.value}
                                type="button"
                                onClick={() => updateField('size', size.value as DonationFormData['size'])}
                                className={`flex-1 py-3 rounded-xl border-2 font-medium text-sm transition-all flex flex-col items-center gap-1 ${formData.size === size.value
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-border text-text-secondary hover:border-primary/50'
                                    }`}
                            >
                                <span>{size.icon}</span>
                                {size.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-text-primary text-sm font-semibold mb-2">
                        Descrição do Pet *
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        placeholder="Conte um pouco sobre o pet: personalidade, cuidados especiais, por que está doando..."
                        className={`w-full bg-surface rounded-2xl py-3.5 px-4 text-sm border-2 focus:outline-none focus:shadow-glow-sm transition-all duration-300 text-text-primary placeholder:text-text-muted resize-none h-28 ${errors.description ? 'border-danger' : 'border-transparent focus:border-primary'
                            }`}
                    />
                    {errors.description && (
                        <p className="text-danger text-xs mt-1">{errors.description}</p>
                    )}
                </div>

                {/* Location */}
                <div className="grid grid-cols-2 gap-4">
                    <Select
                        label="Estado"
                        options={brazilianStates.map(s => ({ value: s.stateCode, label: s.stateCode }))}
                        value={formData.stateCode}
                        onChange={(e) => handleStateChange(e.target.value)}
                    />
                    <Select
                        label="Cidade"
                        options={cities.map(c => ({ value: c, label: c }))}
                        value={formData.city}
                        onChange={(e) => updateField('city', e.target.value)}
                    />
                </div>

                {/* Phone */}
                <Input
                    label="Telefone para Contato"
                    placeholder="(00) 00000-0000"
                    icon="phone"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    error={errors.phone}
                />

                {/* Toggles */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-background rounded-2xl">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">vaccines</span>
                            <span className="text-text-primary font-medium">Pet vacinado</span>
                        </div>
                        <Toggle checked={formData.vaccinated} onChange={(v) => updateField('vaccinated', v)} />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-background rounded-2xl">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">medical_services</span>
                            <span className="text-text-primary font-medium">Pet castrado</span>
                        </div>
                        <Toggle checked={formData.neutered} onChange={(v) => updateField('neutered', v)} />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-warning/10 rounded-2xl border border-warning/30">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-warning">priority_high</span>
                            <div>
                                <span className="text-text-primary font-medium block">Adoção Urgente</span>
                                <span className="text-text-muted text-xs">Destaque na lista</span>
                            </div>
                        </div>
                        <Toggle checked={formData.urgent} onChange={(v) => updateField('urgent', v)} />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                    <Button variant="secondary" onClick={onClose} fullWidth>
                        Cancelar
                    </Button>
                    <Button type="submit" loading={loading} fullWidth icon="favorite">
                        Cadastrar Doação
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default DonationForm;
