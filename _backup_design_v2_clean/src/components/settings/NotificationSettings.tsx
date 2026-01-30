import React, { useState, useEffect } from 'react';
import { Modal, Toggle } from '../ui';
import {
    NotificationPreferences,
    notificationCategories,
    getNotificationPreferences,
    saveNotificationPreferences,
} from '../../services/notifications';

interface NotificationSettingsProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ isOpen, onClose }) => {
    const [prefs, setPrefs] = useState<NotificationPreferences>(getNotificationPreferences());

    useEffect(() => {
        if (isOpen) {
            setPrefs(getNotificationPreferences());
        }
    }, [isOpen]);

    const updatePref = <K extends keyof NotificationPreferences>(key: K, value: NotificationPreferences[K]) => {
        const updated = { ...prefs, [key]: value };
        setPrefs(updated);
        saveNotificationPreferences({ [key]: value });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Configurar Notificações" size="full">
            <div className="space-y-6">
                {/* Master Toggle */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-4 flex items-center justify-between border border-primary/20">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-2xl">notifications</span>
                        </div>
                        <div>
                            <h3 className="text-text-primary font-bold">Notificações</h3>
                            <p className="text-text-muted text-sm">Ativar/desativar todas</p>
                        </div>
                    </div>
                    <Toggle
                        checked={prefs.enabled}
                        onChange={(v) => updatePref('enabled', v)}
                        size="md"
                    />
                </div>

                {/* Quiet Hours */}
                <div className="bg-surface rounded-2xl p-4 shadow-soft">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">bedtime</span>
                            <div>
                                <h4 className="text-text-primary font-semibold">Modo Silencioso</h4>
                                <p className="text-text-muted text-xs">Pausar notificações à noite</p>
                            </div>
                        </div>
                        <Toggle
                            checked={prefs.quietHoursEnabled}
                            onChange={(v) => updatePref('quietHoursEnabled', v)}
                            size="sm"
                        />
                    </div>
                    {prefs.quietHoursEnabled && (
                        <div className="flex gap-4 mt-3 pt-3 border-t border-border animate-fadeIn">
                            <div className="flex-1">
                                <label className="text-text-muted text-xs block mb-1">Início</label>
                                <input
                                    type="time"
                                    value={prefs.quietHoursStart}
                                    onChange={(e) => updatePref('quietHoursStart', e.target.value)}
                                    className="w-full bg-background rounded-xl px-3 py-2 text-sm text-text-primary"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-text-muted text-xs block mb-1">Fim</label>
                                <input
                                    type="time"
                                    value={prefs.quietHoursEnd}
                                    onChange={(e) => updatePref('quietHoursEnd', e.target.value)}
                                    className="w-full bg-background rounded-xl px-3 py-2 text-sm text-text-primary"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Categories */}
                <div className={`space-y-4 transition-opacity duration-300 ${!prefs.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
                    {notificationCategories.map((category, catIndex) => (
                        <div
                            key={category.id}
                            className="bg-surface rounded-2xl shadow-soft overflow-hidden animate-slideUp"
                            style={{ animationDelay: `${catIndex * 50}ms` }}
                        >
                            {/* Category Header */}
                            <div className="p-4 bg-background/50 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary">{category.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-text-primary font-semibold">{category.title}</h4>
                                        <p className="text-text-muted text-xs">{category.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Category Settings */}
                            <div className="divide-y divide-border">
                                {category.settings.map((setting) => (
                                    <div key={setting.key} className="p-4 flex items-center justify-between">
                                        <div className="flex-1 pr-4">
                                            <p className="text-text-primary text-sm font-medium">{setting.label}</p>
                                            {setting.description && (
                                                <p className="text-text-muted text-xs mt-0.5">{setting.description}</p>
                                            )}
                                        </div>

                                        {setting.type === 'toggle' ? (
                                            <Toggle
                                                checked={prefs[setting.key] as boolean}
                                                onChange={(v) => updatePref(setting.key, v as any)}
                                                size="sm"
                                            />
                                        ) : setting.type === 'select' && setting.options ? (
                                            <select
                                                value={prefs[setting.key] as number | string}
                                                onChange={(e) => updatePref(setting.key, Number(e.target.value) as any)}
                                                className="bg-background rounded-xl px-3 py-2 text-sm text-text-primary border-0 focus:ring-2 focus:ring-primary"
                                            >
                                                {setting.options.map(opt => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Save Confirmation */}
                <p className="text-center text-text-muted text-xs pt-4">
                    <span className="material-symbols-outlined text-success text-sm align-middle mr-1">check_circle</span>
                    As configurações são salvas automaticamente
                </p>
            </div>
        </Modal>
    );
};

export default NotificationSettings;
