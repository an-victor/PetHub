import React, { useState, useEffect } from 'react';
import { Modal, Button } from '../ui';
import {
    UserLocation,
    brazilianStates,
    getSavedLocation,
    saveLocation,
    getCitiesByStateCode,
} from '../../services/location';

interface LocationSettingsProps {
    isOpen: boolean;
    onClose: () => void;
    onLocationChange?: (location: UserLocation) => void;
}

const LocationSettings: React.FC<LocationSettingsProps> = ({ isOpen, onClose, onLocationChange }) => {
    const [location, setLocation] = useState<UserLocation>(getSavedLocation());
    const [cities, setCities] = useState<string[]>([]);

    useEffect(() => {
        if (isOpen) {
            const saved = getSavedLocation();
            setLocation(saved);
            setCities(getCitiesByStateCode(saved.stateCode));
        }
    }, [isOpen]);

    const handleStateChange = (stateCode: string) => {
        const state = brazilianStates.find(s => s.stateCode === stateCode);
        if (state) {
            const newCities = getCitiesByStateCode(stateCode);
            setCities(newCities);
            setLocation(prev => ({
                ...prev,
                state: state.state,
                stateCode: state.stateCode,
                city: newCities[0] || '',
            }));
        }
    };

    const handleCityChange = (city: string) => {
        setLocation(prev => ({ ...prev, city }));
    };

    const handleSave = () => {
        saveLocation(location);
        onLocationChange?.(location);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Minha Localização" size="md">
            <div className="space-y-5">
                {/* Info Card */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-4 flex items-start gap-3 border border-primary/20">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">info</span>
                    <div>
                        <p className="text-text-primary text-sm font-medium">Por que precisamos da sua localização?</p>
                        <p className="text-text-secondary text-xs mt-1">
                            Para mostrar clínicas veterinárias, pet shops, ONGs e pets para adoção próximos de você.
                        </p>
                    </div>
                </div>

                {/* Current Location Display */}
                <div className="bg-surface rounded-2xl p-4 shadow-soft">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                        </div>
                        <div>
                            <p className="text-text-muted text-xs uppercase tracking-wider">Localização Atual</p>
                            <p className="text-text-primary font-bold text-lg">{location.city}, {location.stateCode}</p>
                        </div>
                    </div>
                </div>

                {/* State Selection */}
                <div>
                    <label className="block text-text-primary text-sm font-semibold mb-2">
                        Estado
                    </label>
                    <select
                        value={location.stateCode}
                        onChange={(e) => handleStateChange(e.target.value)}
                        className="w-full bg-surface rounded-2xl py-4 px-4 text-sm border-2 border-transparent focus:border-primary focus:outline-none transition-all duration-300 text-text-primary appearance-none cursor-pointer shadow-soft"
                    >
                        {brazilianStates.map(state => (
                            <option key={state.stateCode} value={state.stateCode}>
                                {state.state} ({state.stateCode})
                            </option>
                        ))}
                    </select>
                </div>

                {/* City Selection */}
                <div>
                    <label className="block text-text-primary text-sm font-semibold mb-2">
                        Cidade
                    </label>
                    <select
                        value={location.city}
                        onChange={(e) => handleCityChange(e.target.value)}
                        className="w-full bg-surface rounded-2xl py-4 px-4 text-sm border-2 border-transparent focus:border-primary focus:outline-none transition-all duration-300 text-text-primary appearance-none cursor-pointer shadow-soft"
                    >
                        {cities.map(city => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                    <p className="text-text-muted text-xs mt-2">
                        Não encontrou sua cidade? Selecione a mais próxima.
                    </p>
                </div>

                {/* GPS Button (Future) */}
                <button
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-border text-text-secondary hover:border-primary hover:text-primary transition-colors duration-200"
                    onClick={() => {
                        // Future: implement GPS detection
                        alert('Em breve: detecção automática por GPS!');
                    }}
                >
                    <span className="material-symbols-outlined">my_location</span>
                    <span className="font-medium">Detectar automaticamente</span>
                    <span className="bg-warning/20 text-[#D4AC0D] text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase">Em breve</span>
                </button>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                    <Button variant="secondary" onClick={onClose} fullWidth>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} fullWidth icon="check">
                        Salvar
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default LocationSettings;
