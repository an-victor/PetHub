import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { pets } from '@/src/data';

interface NutritionResult {
    rer: number;
    mer: number;
    dailyGrams: number;
}

const NutritionCalculator: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    // State
    const [weight, setWeight] = useState(10);
    const [age, setAge] = useState(3);
    const [activityLevel, setActivityLevel] = useState<'low' | 'normal' | 'high' | 'working'>('normal');
    const [isNeutered, setIsNeutered] = useState(true);
    const [foodCalories, setFoodCalories] = useState(3800); // Kcal/kg (Standard premium food)
    const [selectedPetId, setSelectedPetId] = useState<string>('');
    const [result, setResult] = useState<NutritionResult | null>(null);

    // Auto-fill from user pets
    const userPets = pets.filter(p => p.ownerId === user?.id);

    useEffect(() => {
        if (selectedPetId) {
            const pet = userPets.find(p => p.id === selectedPetId);
            if (pet) {
                const weightNum = parseFloat(pet.weight.replace(/[^0-9.]/g, '')) || 10;
                setWeight(weightNum);
                setIsNeutered(pet.neutered);
                // Simple age parsing (very basic)
                const ageNum = parseInt(pet.age) || 3;
                setAge(ageNum);
            }
        }
    }, [selectedPetId]);

    // Calculate on change
    useEffect(() => {
        calculateNutrition();
    }, [weight, age, activityLevel, isNeutered, foodCalories]);

    const calculateNutrition = () => {
        // RER (Resting Energy Requirement) = 70 * (weight ^ 0.75)
        const rer = 70 * Math.pow(weight, 0.75);

        // MER (Maintenance Energy Requirement) Multiplier
        let multiplier = 1.6; // Default adult unneutered

        if (isNeutered) multiplier = 1.4; // Adult neutered
        if (age < 1) multiplier = 3.0; // Puppy
        else if (age >= 1 && age < 2) multiplier = 2.0; // Junior
        else if (age > 7) multiplier = 1.2; // Senior

        // Activity adjustments
        if (activityLevel === 'low') multiplier *= 0.9;
        if (activityLevel === 'high') multiplier *= 1.2;
        if (activityLevel === 'working') multiplier *= 2.0;

        const mer = rer * multiplier;

        // Grams per day = (MER / Food Kcal per kg) * 1000
        const dailyGrams = (mer / foodCalories) * 1000;

        setResult({
            rer: Math.round(rer),
            mer: Math.round(mer),
            dailyGrams: Math.round(dailyGrams)
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-background pb-20 transition-colors duration-300">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 pt-12 pb-10 px-5 rounded-b-[40px] shadow-soft-xl z-10">
                <div className="flex items-center justify-between text-white mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-bold">Calculadora Nutricional</h1>
                    <div className="w-10"></div>
                </div>

                {/* Main Result Display */}
                <div className="flex justify-center mb-4">
                    <div className="relative group">
                        {/* Animated Bowl Fill */}
                        <div className="w-48 h-48 rounded-full border-8 border-white/20 flex items-center justify-center relative overflow-hidden bg-white/10 backdrop-blur-md shadow-inner">
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-white transition-all duration-700 ease-out opacity-20 group-hover:opacity-30"
                                style={{ height: `${Math.min((result?.dailyGrams || 0) / 500 * 100, 100)}%` }}
                            ></div>
                            <div className="text-center relative z-10">
                                <span className="text-white/80 text-sm font-medium uppercase tracking-wider block mb-1">Diário</span>
                                <span className="text-5xl font-black text-white drop-shadow-sm leading-none">
                                    {result?.dailyGrams}
                                </span>
                                <span className="text-white/90 text-lg font-bold">g</span>
                            </div>
                        </div>

                        {/* Calories Badge */}
                        <div className="absolute -bottom-2 right-0 bg-white text-orange-600 px-3 py-1.5 rounded-full shadow-lg font-bold text-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">local_fire_department</span>
                            {result?.mer} kcal
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex-1 px-5 pt-8 -mt-6 animate-slideUp">
                {/* Pet Selector */}
                {userPets.length > 0 && (
                    <div className="mb-8 overflow-x-auto">
                        <div className="flex gap-3 pb-2">
                            <button
                                onClick={() => setSelectedPetId('')}
                                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border-2 ${!selectedPetId
                                        ? 'bg-amber-100 border-amber-500 text-amber-700'
                                        : 'bg-surface border-transparent text-text-secondary hover:bg-surface-elevated'
                                    }`}
                            >
                                Manual
                            </button>
                            {userPets.map(pet => (
                                <button
                                    key={pet.id}
                                    onClick={() => setSelectedPetId(pet.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border-2 ${selectedPetId === pet.id
                                            ? 'bg-amber-100 border-amber-500 text-amber-700'
                                            : 'bg-surface border-transparent text-text-secondary hover:bg-surface-elevated'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-base">pets</span>
                                    {pet.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-6">
                    {/* Weight Slider */}
                    <div className="bg-surface p-5 rounded-3xl shadow-soft">
                        <div className="flex justify-between items-end mb-4">
                            <label className="text-text-secondary font-bold text-sm uppercase tracking-wider">Peso do Pet</label>
                            <span className="text-2xl font-black text-text-primary">{weight} <span className="text-sm text-text-muted">kg</span></span>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="60"
                            step="0.1"
                            value={weight}
                            onChange={(e) => setWeight(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gradient-to-r from-amber-200 to-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                        />
                        <div className="flex justify-between text-xs text-text-muted mt-2 font-medium">
                            <span>0.5kg</span>
                            <span>60kg</span>
                        </div>
                    </div>

                    {/* Age & Neutered Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-surface p-5 rounded-3xl shadow-soft">
                            <label className="text-text-secondary font-bold text-xs uppercase tracking-wider mb-2 block">Idade</label>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setAge(Math.max(0, age - 1))}
                                    className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold hover:bg-orange-200"
                                >-</button>
                                <span className="flex-1 text-center font-black text-xl text-text-primary">{age}</span>
                                <button
                                    onClick={() => setAge(age + 1)}
                                    className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold hover:bg-orange-200"
                                >+</button>
                            </div>
                            <span className="text-center block text-xs text-text-muted mt-1 font-medium">anos</span>
                        </div>

                        <div
                            onClick={() => setIsNeutered(!isNeutered)}
                            className={`p-5 rounded-3xl shadow-soft cursor-pointer transition-all border-2 ${isNeutered ? 'bg-orange-50 border-orange-200' : 'bg-surface border-transparent'}`}
                        >
                            <label className="text-bg-secondary font-bold text-xs uppercase tracking-wider mb-2 block pointer-events-none text-text-secondary">Castrado?</label>
                            <div className="flex items-center gap-3 mt-1">
                                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${isNeutered ? 'bg-green-500' : 'bg-gray-300'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isNeutered ? 'translate-x-4' : ''}`}></div>
                                </div>
                                <span className={`font-bold ${isNeutered ? 'text-green-600' : 'text-text-muted'}`}>{isNeutered ? 'Sim' : 'Não'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Activity Level */}
                    <div className="bg-surface p-5 rounded-3xl shadow-soft">
                        <label className="text-text-secondary font-bold text-sm uppercase tracking-wider mb-4 block">Nível de Atividade</label>
                        <div className="grid grid-cols-4 gap-2">
                            {[
                                { id: 'low', icon: 'bed', label: 'Baixa' },
                                { id: 'normal', icon: 'directions_walk', label: 'Normal' },
                                { id: 'high', icon: 'sprint', label: 'Alta' },
                                { id: 'working', icon: 'fitness_center', label: 'Intensa' },
                            ].map((level) => (
                                <button
                                    key={level.id}
                                    onClick={() => setActivityLevel(level.id as any)}
                                    className={`flex flex-col items-center justify-center py-3 rounded-2xl transition-all border-2 ${activityLevel === level.id
                                            ? 'bg-orange-50 border-orange-500 text-orange-700 shadow-sm'
                                            : 'bg-background border-transparent text-text-muted hover:bg-background/80'
                                        }`}
                                >
                                    <span className="material-symbols-outlined mb-1">{level.icon}</span>
                                    <span className="text-[10px] font-bold uppercase">{level.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Food Calories */}
                    <div className="bg-surface p-5 rounded-3xl shadow-soft">
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-text-secondary font-bold text-sm uppercase tracking-wider">Calorias da Ração</label>
                            <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-lg">
                                <span className="text-orange-700 font-bold">{foodCalories}</span>
                                <span className="text-[10px] text-orange-600 font-bold uppercase">kcal/kg</span>
                            </div>
                        </div>
                        <input
                            type="range"
                            min="2800"
                            max="4500"
                            step="50"
                            value={foodCalories}
                            onChange={(e) => setFoodCalories(parseInt(e.target.value))}
                            className="w-full h-2 bg-gradient-to-r from-gray-200 to-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                        />
                        <p className="text-xs text-text-muted mt-3 leading-relaxed">
                            Verifique o valor de "Energia Metabolizável" no verso da embalagem da ração. A média é 3800 kcal/kg.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NutritionCalculator;
