'use client';

import { useGameStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AvatarSelector() {
    const { avatars, selectedAvatarId, selectAvatar } = useGameStore();

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {avatars.map((avatar) => {
                const isSelected = selectedAvatarId === avatar.id;

                return (
                    <motion.button
                        key={avatar.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => avatar.unlocked && selectAvatar(avatar.id)}
                        disabled={!avatar.unlocked}
                        className={cn(
                            "relative aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 p-4 border-2 transition-all",
                            isSelected ? "border-brand-primary bg-brand-primary/10" : "border-gray-200 bg-white hover:border-brand-primary/50",
                            !avatar.unlocked && "opacity-50 grayscale cursor-not-allowed"
                        )}
                    >
                        <div className={cn("w-16 h-16 rounded-full shadow-lg", avatar.color)} />

                        <span className="font-bold text-gray-700">{avatar.name}</span>

                        {isSelected && (
                            <div className="absolute top-2 right-2 bg-brand-primary text-white p-1 rounded-full">
                                <Check size={14} />
                            </div>
                        )}

                        {!avatar.unlocked && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-2xl backdrop-blur-[1px]">
                                <Lock className="text-gray-500" />
                            </div>
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
