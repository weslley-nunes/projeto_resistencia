'use client';

import React, { useState, useEffect } from 'react';
import { AVATAR_CATALOG, CATEGORIES, AvatarItem } from '@/lib/avatarCatalog';
import AvatarDisplay from './AvatarDisplay';
import { Lock, Loader2, Save } from 'lucide-react';

export default function AvatarEditor() {
    const [config, setConfig] = useState<any>({
        hair: 'short01',
        eyes: 'variant02',
        mouth: 'variant01',
        skinColor: 'ecad80',
        glasses: 'none'
    });
    const [level, setLevel] = useState(1);
    const [activeCategory, setActiveCategory] = useState('skinColor');
    const [styleFilter, setStyleFilter] = useState<'male' | 'female'>('male'); // Default to male
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchAvatarData();
    }, []);

    const fetchAvatarData = async () => {
        try {
            const res = await fetch('/api/user/avatar');
            const data = await res.json();
            if (data.config && Object.keys(data.config).length > 0) {
                // Migrate old keys if necessary or just replace
                setConfig(data.config);
                setLevel(data.level);
            }
        } catch (error) {
            console.error("Failed to load avatar", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (item: AvatarItem) => {
        if (level < item.requiredLevel) return; // Locked

        setConfig((prev: any) => ({
            ...prev,
            [item.type]: item.value
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch('/api/user/avatar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ config })
            });
            alert('Avatar salvo com sucesso!');
        } catch (error) {
            alert('Erro ao salvar.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    // Filter items based on Category AND Gender (if applicable)
    const currentItems = AVATAR_CATALOG.filter(item => {
        if (item.type !== activeCategory) return false;

        // If searching for Tops or Facial Hair, apply gender filter
        // If unisex item, always show.
        // If gender matches filter, show.
        if (activeCategory === 'top' || activeCategory === 'facialHair') {
            if (item.gender === 'unisex') return true;
            return item.gender === styleFilter;
        }

        return true;
    });

    return (
        <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            {/* Preview Section */}
            <div className="flex flex-col items-center justify-center p-6 bg-blue-50/50 rounded-xl border border-blue-100 min-w-[250px]">
                <h2 className="text-xl font-bold text-brand-secondary mb-4">Seu Visual</h2>
                <div className="w-48 h-48 mb-6 relative bg-white rounded-full p-2 shadow-inner">
                    <AvatarDisplay config={config} seed="user-avatar" className="w-full h-full" />
                </div>

                <div className="flex gap-2 w-full mb-4">
                    <button
                        onClick={() => setStyleFilter('male')}
                        className={`flex-1 py-1 text-xs font-bold rounded-lg border ${styleFilter === 'male' ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-white text-gray-400'}`}
                    >
                        Estilo Masc.
                    </button>
                    <button
                        onClick={() => setStyleFilter('female')}
                        className={`flex-1 py-1 text-xs font-bold rounded-lg border ${styleFilter === 'female' ? 'bg-pink-100 border-pink-300 text-pink-700' : 'bg-white text-gray-400'}`}
                    >
                        Estilo Fem.
                    </button>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-brand-primary/90 transition disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Salvar Avatar
                </button>
                <p className="mt-2 text-xs text-gray-500 text-center">Desbloqueie itens subindo de nível! Nível Atual: {level}</p>
            </div>

            {/* Editor Section */}
            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-gray-700">Customização</h3>
                </div>

                {/* Categories Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-4 custom-scrollbar">
                    {CATEGORIES.map(cat => {
                        // Hide Beard tab if Female style selected
                        if (styleFilter === 'female' && cat.key === 'facialHair') return null;

                        return (
                            <button
                                key={cat.key}
                                onClick={() => setActiveCategory(cat.key)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all
                                    ${activeCategory === cat.key
                                        ? 'bg-brand-secondary text-white shadow-md'
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                    {currentItems.map(item => {
                        const isLocked = level < item.requiredLevel;
                        const isSelected = config[item.type] === item.value;

                        return (
                            <div
                                key={item.id}
                                onClick={() => handleSelect(item)}
                                className={`
                                    relative p-3 rounded-xl border-2 cursor-pointer transition-all h-24 flex flex-col items-center justify-center text-center group
                                    ${isLocked
                                        ? 'bg-gray-50 border-gray-200 opacity-60 grayscale cursor-not-allowed'
                                        : isSelected
                                            ? 'bg-blue-50 border-brand-primary shadow-sm'
                                            : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-sm'
                                    }
                                `}
                            >
                                {isLocked ? (
                                    <>
                                        <Lock size={24} className="text-gray-400 mb-1" />
                                        <span className="text-xs font-bold text-gray-400">Nível {item.requiredLevel}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                                        {/* Optional: Add rough detail text like "Azul" or "Longo" if label isn't enough */}
                                        {isSelected && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-primary shadow"></div>}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
