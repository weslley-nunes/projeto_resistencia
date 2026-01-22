import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Avatar = {
    id: string;
    name: string;
    color: string;
    unlocked: boolean;
};

type GameState = {
    educoins: number;
    xp: number;
    level: number;
    currentPhase: number;
    selectedAvatarId: string;
    avatars: Avatar[];
    completedNodes: string[];

    // Actions
    addEducoins: (amount: number) => void;
    addXp: (amount: number) => void;
    unlockAvatar: (avatarId: string) => void;
    selectAvatar: (avatarId: string) => void;
    advancePhase: () => void;
    completeNode: (nodeId: string) => void;
};

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            educoins: 0,
            xp: 0,
            level: 1,
            currentPhase: 1,
            selectedAvatarId: 'hero-1',
            avatars: [
                { id: 'hero-1', name: 'Guerreiro', color: 'bg-red-500', unlocked: true },
                { id: 'hero-2', name: 'Sábio', color: 'bg-blue-500', unlocked: true },
                { id: 'hero-3', name: 'Guardião', color: 'bg-green-500', unlocked: false },
                { id: 'hero-4', name: 'Explorador', color: 'bg-yellow-500', unlocked: false },
            ],
            completedNodes: [],

            addEducoins: (amount) => set((state) => ({ educoins: state.educoins + amount })),

            addXp: (amount) => set((state) => {
                const newXp = state.xp + amount;
                // Simple level up logic: Level up every 100 XP
                const newLevel = Math.floor(newXp / 100) + 1;
                return { xp: newXp, level: newLevel };
            }),

            unlockAvatar: (avatarId) => set((state) => ({
                avatars: state.avatars.map(avatar =>
                    avatar.id === avatarId ? { ...avatar, unlocked: true } : avatar
                )
            })),

            selectAvatar: (avatarId) => set(() => ({ selectedAvatarId: avatarId })),

            advancePhase: () => set((state) => ({ currentPhase: state.currentPhase + 1 })),

            completeNode: (nodeId) => set((state) => {
                if (state.completedNodes.includes(nodeId)) return state;
                return { completedNodes: [...state.completedNodes, nodeId] };
            }),
        }),
        {
            name: 'projeto-resistencia-storage',
        }
    )
);
