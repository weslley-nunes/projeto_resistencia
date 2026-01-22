export type AvatarItem = {
    id: string;
    label: string;
    value: string;
    type: 'hair' | 'eyes' | 'mouth' | 'glasses' | 'skinColor' | 'hairColor' | 'eyebrows';
    requiredLevel: number;
    gender?: 'male' | 'female' | 'unisex';
    price?: number;
    color?: string; // For rendering color preview
};

export const AVATAR_CATALOG: AvatarItem[] = [
    // --- SKIN COLOR ---
    { id: 'skin1', label: 'Pálida', value: 'f2d3b1', type: 'skinColor', requiredLevel: 1, gender: 'unisex', color: '#f2d3b1' },
    { id: 'skin2', label: 'Clara', value: 'ecad80', type: 'skinColor', requiredLevel: 1, gender: 'unisex', color: '#ecad80' },
    { id: 'skin3', label: 'Bronzeada', value: 'f2a991', type: 'skinColor', requiredLevel: 1, gender: 'unisex', color: '#f2a991' },
    { id: 'skin4', label: 'Morena', value: 'd08b5b', type: 'skinColor', requiredLevel: 1, gender: 'unisex', color: '#d08b5b' },
    { id: 'skin5', label: 'Negra', value: 'ae5d29', type: 'skinColor', requiredLevel: 1, gender: 'unisex', color: '#ae5d29' },
    { id: 'skin6', label: 'Negra Escura', value: '614335', type: 'skinColor', requiredLevel: 1, gender: 'unisex', color: '#614335' },

    // --- HAIR COLOR ---
    { id: 'hcolor1', label: 'Preto', value: '0e0e0e', type: 'hairColor', requiredLevel: 1, gender: 'unisex', color: '#0e0e0e' },
    { id: 'hcolor2', label: 'Castanho Escuro', value: '4a312c', type: 'hairColor', requiredLevel: 1, gender: 'unisex', color: '#4a312c' },
    { id: 'hcolor3', label: 'Castanho', value: '855a40', type: 'hairColor', requiredLevel: 1, gender: 'unisex', color: '#855a40' },
    { id: 'hcolor4', label: 'Loiro', value: 'eebb77', type: 'hairColor', requiredLevel: 1, gender: 'unisex', color: '#eebb77' },
    { id: 'hcolor5', label: 'Ruivo', value: 'b55a35', type: 'hairColor', requiredLevel: 1, gender: 'unisex', color: '#b55a35' },
    { id: 'hcolor6', label: 'Platinado', value: 'e8e8e8', type: 'hairColor', requiredLevel: 2, gender: 'unisex', color: '#e8e8e8' },
    { id: 'hcolor7', label: 'Rosa Chá', value: 'd6b3b8', type: 'hairColor', requiredLevel: 3, gender: 'unisex', color: '#d6b3b8' },
    { id: 'hcolor8', label: 'Azul Real', value: '3e4f6b', type: 'hairColor', requiredLevel: 5, gender: 'unisex', color: '#3e4f6b' },

    // --- HAIR (Updated with more Afro options) ---
    { id: 'hair1', label: 'Curto Simples', value: 'short01', type: 'hair', requiredLevel: 1, gender: 'male' },
    { id: 'hair2', label: 'Curto Formal', value: 'short02', type: 'hair', requiredLevel: 1, gender: 'male' },
    { id: 'hair3', label: 'Raspado', value: 'short03', type: 'hair', requiredLevel: 1, gender: 'male' },
    { id: 'hair4', label: 'Longo Liso', value: 'long01', type: 'hair', requiredLevel: 1, gender: 'female' },
    { id: 'hair5', label: 'Longo Ondulado', value: 'long02', type: 'hair', requiredLevel: 2, gender: 'female' },
    { id: 'hair6', label: 'Chanel', value: 'bobCut', type: 'hair', requiredLevel: 2, gender: 'female' },

    // Afro / Curly Styles
    { id: 'hair_afro1', label: 'Black Power', value: 'curly01', type: 'hair', requiredLevel: 2, gender: 'unisex' },
    { id: 'hair_afro2', label: 'Cachos Curtos', value: 'curly02', type: 'hair', requiredLevel: 2, gender: 'unisex' },
    { id: 'hair_afro3', label: 'Tranças Longas', value: 'curly03', type: 'hair', requiredLevel: 3, gender: 'female' },
    { id: 'hair_afro4', label: 'Dreads Curtos', value: 'curly04', type: 'hair', requiredLevel: 3, gender: 'unisex' },
    { id: 'hair_afro5', label: 'Afro Puff', value: 'curly05', type: 'hair', requiredLevel: 4, gender: 'female' },

    { id: 'hair_bun', label: 'Coque', value: 'bun', type: 'hair', requiredLevel: 4, gender: 'female' },
    { id: 'hair_top', label: 'Topete', value: 'short05', type: 'hair', requiredLevel: 5, gender: 'male' },

    // --- EYES ---
    { id: 'eyes1', label: 'Normal', value: 'variant02', type: 'eyes', requiredLevel: 1, gender: 'unisex' },
    { id: 'eyes2', label: 'Confiante', value: 'variant07', type: 'eyes', requiredLevel: 2, gender: 'unisex' },
    { id: 'eyes3', label: 'Piscadinha', value: 'variant12', type: 'eyes', requiredLevel: 3, gender: 'unisex', price: 50 },
    { id: 'eyes4', label: 'Óculos Escuros', value: 'variant15', type: 'eyes', requiredLevel: 10, gender: 'unisex', price: 200 },

    // --- EYEBROWS (New) ---
    { id: 'brow1', label: 'Naturais', value: 'variant02', type: 'eyebrows', requiredLevel: 1, gender: 'unisex' },
    { id: 'brow2', label: 'Grossas', value: 'variant09', type: 'eyebrows', requiredLevel: 1, gender: 'unisex' },
    { id: 'brow3', label: 'Arqueadas', value: 'variant05', type: 'eyebrows', requiredLevel: 2, gender: 'unisex' },
    { id: 'brow4', label: 'Expressivas', value: 'variant12', type: 'eyebrows', requiredLevel: 3, gender: 'unisex' },

    // --- GLASSES ---
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
    { key: 'hairColor', label: 'Cor Cabelo' },
    { key: 'eyes', label: 'Olhos' },
    { key: 'eyebrows', label: 'Sobranc.' },
    { key: 'glasses', label: 'Óculos' },
    { key: 'mouth', label: 'Boca' },
];
