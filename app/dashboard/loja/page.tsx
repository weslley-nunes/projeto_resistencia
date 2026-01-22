'use client';

import { useState, useEffect } from 'react';
import { AVATAR_CATALOG, CATEGORIES, AvatarItem } from '@/lib/avatarCatalog';
import { Loader2, ShoppingBag, Lock, Check } from 'lucide-react';
import { useGameStore } from '@/lib/store';

export default function StorePage() {
    const [unlockedItems, setUnlockedItems] = useState<string[]>([]);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [buyingId, setBuyingId] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[1].key); // Start with 'top'

    const { educoins, addEducoins } = useGameStore();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const res = await fetch('/api/user/avatar');
            const data = await res.json();
            setUnlockedItems(data.unlockedItems || []);
            setBalance(data.educoins);

            // Sync store just in case
            if (data.educoins !== educoins) {
                // We can't easily sync exact value to store unless we have a 'setEducoins' action, 
                // but 'addEducoins' adds. Assuming store is roughly correct or we rely on page state.
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleBuy = async (item: AvatarItem) => {
        if (!item.price) return;
        if (balance < item.price) {
            alert("Educoins insuficientes!");
            return;
        }

        setBuyingId(item.id);
        try {
            const res = await fetch('/api/store/buy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemId: item.id })
            });

            const data = await res.json();
            if (data.success) {
                setBalance(data.newBalance);
                setUnlockedItems(data.unlockedItems);
                // Simple hack to update global store display by deducting locally if possible, 
                // or just rely on re-fetch on navigation.
                alert(`Você comprou: ${item.label}!`);
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert("Erro na compra.");
        } finally {
            setBuyingId(null);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    const buyableItems = AVATAR_CATALOG.filter(item => item.price && item.price > 0 && item.type === activeCategory);

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold font-sans text-brand-secondary flex items-center gap-2">
                        <ShoppingBag className="text-brand-primary" /> Loja de Itens
                    </h1>
                    <p className="text-gray-500">Troque seus Educoins por itens exclusivos!</p>
                </div>
                <div className="bg-yellow-50 px-6 py-3 rounded-xl border border-yellow-200">
                    <span className="text-sm text-yellow-700 font-bold uppercase tracking-wider">Seu Saldo</span>
                    <div className="text-2xl font-black text-brand-accent">{balance} 🟡</div>
                </div>
            </header>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                {CATEGORIES.map(cat => (
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
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {buyableItems.length === 0 ? (
                    <div className="col-span-full py-10 text-center text-gray-400 italic">
                        Nenhum item à venda nesta categoria.
                    </div>
                ) : (
                    buyableItems.map(item => {
                        const isOwned = unlockedItems.includes(item.id);
                        const canAfford = balance >= (item.price || 0);

                        return (
                            <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center gap-3 hover:shadow-lg transition group">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-4xl m-2 group-hover:scale-110 transition">
                                    {/* Placeholder for item look - maybe use Icon or simple text */}
                                    🎁
                                </div>
                                <div className="text-center">
                                    <h3 className="font-bold text-gray-700 text-sm">{item.label}</h3>
                                    <span className="text-xs text-brand-primary font-bold">{item.price} Educoins</span>
                                </div>

                                <button
                                    onClick={() => !isOwned && handleBuy(item)}
                                    disabled={isOwned || (!canAfford && !isOwned) || buyingId === item.id}
                                    className={`w-full py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2
                                        ${isOwned
                                            ? 'bg-green-100 text-green-700 cursor-default'
                                            : canAfford
                                                ? 'bg-brand-secondary text-white hover:bg-brand-secondary/90'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                                >
                                    {buyingId === item.id && <Loader2 className="animate-spin" size={12} />}
                                    {isOwned ? <><Check size={12} /> Adquirido</> : 'Comprar'}
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
