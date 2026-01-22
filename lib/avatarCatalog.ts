export type AvatarItem = {
    id: string;
    label: string;
    value: string;
    type: 'hair' | 'eyes' | 'mouth' | 'glasses' | 'skinColor' | 'clothingColor' | 'accessories';
    requiredLevel: number;
    gender?: 'male' | 'female' | 'unisex';
    price?: number;
};

export const AVATAR_CATALOG: AvatarItem[] = [
    // --- SKIN COLOR ---
    { id: 'skin1', label: 'Pálida', value: 'f2d3b1', type: 'skinColor', requiredLevel: 1, gender: 'unisex' },
    { id: 'skin2', label: 'Clara', value: 'ecad80', type: 'skinColor', requiredLevel: 1, gender: 'unisex' },
    { id: 'skin3', label: 'Bronzeada', value: 'f2a991', type: 'skinColor', requiredLevel: 1, gender: 'unisex' },
    { id: 'skin4', label: 'Morena', value: 'd08b5b', type: 'skinColor', requiredLevel: 1, gender: 'unisex' },
    { id: 'skin5', label: 'Negra', value: 'ae5d29', type: 'skinColor', requiredLevel: 1, gender: 'unisex' },
    { id: 'skin6', label: 'Negra Escura', value: '614335', type: 'skinColor', requiredLevel: 1, gender: 'unisex' },

    // --- HAIR ---
    { id: 'hair1', label: 'Curto Simples', value: 'short01', type: 'hair', requiredLevel: 1, gender: 'male' },
    { id: 'hair2', label: 'Curto Formal', value: 'short02', type: 'hair', requiredLevel: 1, gender: 'male' },
    { id: 'hair3', label: 'Longo Liso', value: 'long01', type: 'hair', requiredLevel: 1, gender: 'female' },
    { id: 'hair4', label: 'Longo Ondulado', value: 'long02', type: 'hair', requiredLevel: 2, gender: 'female' },
    { id: 'hair5', label: 'Black Power', value: 'curly01', type: 'hair', requiredLevel: 3, gender: 'unisex', price: 100 },
    { id: 'hair6', label: 'Coque', value: 'bun', type: 'hair', requiredLevel: 4, gender: 'female' },
    { id: 'hair7', label: 'Topete', value: 'short05', type: 'hair', requiredLevel: 5, gender: 'male' },

    // --- EYES ---
    { id: 'eyes1', label: 'Normal', value: 'variant02', type: 'eyes', requiredLevel: 1, gender: 'unisex' },
    { id: 'eyes2', label: 'Confiante', value: 'variant07', type: 'eyes', requiredLevel: 2, gender: 'unisex' },
    { id: 'eyes3', label: 'Piscadinha', value: 'variant12', type: 'eyes', requiredLevel: 3, gender: 'unisex', price: 50 },
    { id: 'eyes4', label: 'Óculos Escuros', value: 'variant15', type: 'eyes', requiredLevel: 10, gender: 'unisex', price: 200 }, // Adventurer doesn't have 'glasses' param separated in API v7 sometimes, but lets check config. Actually v9 has 'glasses'. We will map 'eyes' to eyes and maybe strict glasses. Let's stick to simple eyes variants for now.

    // --- GLASSES (Actually separate param in adventurer) ---
    { id: 'glass1', label: 'Sem Óculos', value: 'none', type: 'glasses', requiredLevel: 1, gender: 'unisex' },
    { id: 'glass2', label: 'Redondos', value: 'variant02', type: 'glasses', requiredLevel: 2, gender: 'unisex', price: 50 },
    { id: 'glass3', label: 'Escuros', value: 'sunglasses', type: 'glasses', requiredLevel: 5, gender: 'unisex', price: 150 },

    // --- MOUTH ---
    { id: 'mouth1', label: 'Neutro', value: 'variant01', type: 'mouth', requiredLevel: 1, gender: 'unisex' },
    { id: 'mouth2', label: 'Sorriso', value: 'variant02', type: 'mouth', requiredLevel: 1, gender: 'unisex' },
    { id: 'mouth3', label: 'Contente', value: 'variant03', type: 'mouth', requiredLevel: 2, gender: 'unisex' },
    { id: 'mouth4', label: 'Sério', value: 'variant05', type: 'mouth', requiredLevel: 3, gender: 'unisex' },
];

export const CATEGORIES = [
    { key: 'skinColor', label: 'Pele' },
    { key: 'hair', label: 'Cabelo' },
    { key: 'eyes', label: 'Olhos' },
    { key: 'glasses', label: 'Óculos' },
    { key: 'mouth', label: 'Boca' },
];
