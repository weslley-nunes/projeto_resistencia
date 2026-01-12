'use client';

import AvatarSelector from '@/components/gamification/AvatarSelector';
import { useGameStore } from '@/lib/store';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
    const { data: session } = useSession();
    const { level, xp, educoins } = useGameStore();

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-brand-primary p-1">
                        {session?.user?.image ? (
                            <img src={session.user.image} className="w-full h-full rounded-full object-cover border-4 border-white" />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gray-200 border-4 border-white" />
                        )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-brand-accent text-brand-secondary font-bold px-3 py-1 rounded-full border-2 border-white shadow-sm">
                        Lv. {level}
                    </div>
                </div>

                <div className="text-center md:text-left flex-1">
                    <h1 className="text-3xl font-bold text-gray-800">{session?.user?.name || "Visitante"}</h1>
                    <p className="text-gray-500">Cursista</p>

                    <div className="mt-4 w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(xp % 100)}%` }}
                            className="h-full bg-brand-primary"
                        />
                    </div>
                    <div className="flex justify-between text-xs mt-1 text-gray-400 font-medium">
                        <span>{xp} XP</span>
                        <span>Próximo Nível: {Math.ceil((xp + 1) / 100) * 100} XP</span>
                    </div>
                </div>

                <div className="bg-brand-secondary/5 p-4 rounded-2xl min-w-[150px] text-center">
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Educoins</p>
                    <p className="text-4xl font-bold text-brand-secondary">{educoins}</p>
                </div>
            </div>

            {/* Avatar Selection */}
            <section>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Escolha seu Avatar</h2>
                <AvatarSelector />
            </section>

            {/* Stats Grid (Placeholder) */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Missões Completas', 'Dias de Ofensiva', 'Conquistas'].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                        <h3 className="text-gray-400 text-sm font-medium">{stat}</h3>
                        <p className="text-2xl font-bold text-gray-800 mt-2">0</p>
                    </div>
                ))}
            </section>
        </div>
    );
}
