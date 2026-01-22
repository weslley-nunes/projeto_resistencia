export type AvatarItem = {
    id: string;
    label: string;
    value: string;
    type: 'top' | 'accessories' | 'hairColor' | 'facialHair' | 'clothing' | 'eyes' | 'eyebrows' | 'mouth' | 'skinColor';
    requiredLevel: number;
    gender?: 'male' | 'female' | 'unisex';
    price?: number;
    color?: string;
};

export const AVATAR_CATALOG: AvatarItem[] = [
    // --- SKIN COLOR ---
    { id: 'skin1', label: 'Pálida', value: 'ffdbb4', type: 'skinColor', requiredLevel: 1, gender: 'unisex', color: '#ffdbb4' },
    { id: 'skin2', label: 'Clara', value: 'edb98a', type: 'skinColor', requiredLevel: 1, gender: 'unisex', color: '#edb98a' },
    { id: 'skin3', label: 'Bronzeada', value: 'fd9841', type: 'skinColor', requiredLevel: 1, gender: 'unisex', color: '#fd9841' },
    { id: 'skin4', label: 'Morena', value: 'd08b5b', type: 'skinColor', requiredLevel: 1, gender: 'unisex', color: '#d08b5b' },
    { id: 'skin5', label: 'Negra', value: 'ae5d29', type: 'skinColor', requiredLevel: 1, gender: 'unisex', color: '#ae5d29' },
    { id: 'skin6', label: 'Negra Escura', value: '614335', type: 'skinColor', requiredLevel: 1, gender: 'unisex', color: '#614335' },

    // --- HAIR COLOR ---
    { id: 'hcolor1', label: 'Preto', value: '2c1b18', type: 'hairColor', requiredLevel: 1, gender: 'unisex', color: '#2c1b18' },
    { id: 'hcolor2', label: 'Castanho Escuro', value: '4a312c', type: 'hairColor', requiredLevel: 1, gender: 'unisex', color: '#4a312c' },
    { id: 'hcolor3', label: 'Castanho', value: '724133', type: 'hairColor', requiredLevel: 1, gender: 'unisex', color: '#724133' },
    { id: 'hcolor4', label: 'Loiro', value: 'f59797', type: 'hairColor', requiredLevel: 1, gender: 'unisex', color: '#f59797' }, // Actually strawberry blonde-ish in avataaars default palette
    { id: 'hcolor5', label: 'Loiro Dourado', value: 'e6a84c', type: 'hairColor', requiredLevel: 1, gender: 'unisex', color: '#e6a84c' }, // Yellow
    { id: 'hcolor6', label: 'Platinado', value: 'ecdcbf', type: 'hairColor', requiredLevel: 2, gender: 'unisex', color: '#ecdcbf' },
    { id: 'hcolor7', label: 'Ruivo', value: 'b55a35', type: 'hairColor', requiredLevel: 1, gender: 'unisex', color: '#b55a35' },
    { id: 'hcolor8', label: 'Rosa', value: 'f59797', type: 'hairColor', requiredLevel: 3, gender: 'unisex', color: '#ffc0cb' },

    // --- TOP (Hair & Hats) ---
    { id: 'top1', label: 'Careca / Nenhum', value: 'noHair', type: 'top', requiredLevel: 1, gender: 'male' },
    { id: 'top2', label: 'Curto Simples', value: 'shortHairShortFlat', type: 'top', requiredLevel: 1, gender: 'male' },
    { id: 'top3', label: 'Curto Arredondado', value: 'shortHairShortRound', type: 'top', requiredLevel: 1, gender: 'male' },
    { id: 'top4', label: 'Curto Bagunçado', value: 'shortHairShaggyMullet', type: 'top', requiredLevel: 2, gender: 'male' },
    { id: 'top5', label: 'Longo Liso', value: 'longHairStraight', type: 'top', requiredLevel: 1, gender: 'female' },
    { id: 'top6', label: 'Longo Ondulado', value: 'longHairCurvy', type: 'top', requiredLevel: 2, gender: 'female' },
    { id: 'top7', label: 'Chanel', value: 'longHairBob', type: 'top', requiredLevel: 2, gender: 'female' },
    { id: 'top8', label: 'Black Power', value: 'longHairAfro', type: 'top', requiredLevel: 2, gender: 'unisex' }, // Crucial
    { id: 'top9', label: 'Dreads', value: 'longHairDreads', type: 'top', requiredLevel: 3, gender: 'unisex' }, // Crucial
    { id: 'top10', label: 'Coque', value: 'longHairBun', type: 'top', requiredLevel: 3, gender: 'female' },
    { id: 'top11', label: 'Turbante', value: 'turban', type: 'top', requiredLevel: 4, gender: 'unisex' },
    { id: 'top12', label: 'Hijab', value: 'hijab', type: 'top', requiredLevel: 4, gender: 'female' },
    { id: 'top13', label: 'Chapéu de Inverno', value: 'winterHat1', type: 'top', requiredLevel: 5, gender: 'unisex' },

    // --- FACIAL HAIR ---
    { id: 'beard1', label: 'Sem Barba', value: 'blank', type: 'facialHair', requiredLevel: 1, gender: 'unisex' },
    { id: 'beard2', label: 'Barba Leve', value: 'beardLight', type: 'facialHair', requiredLevel: 2, gender: 'male' },
    { id: 'beard3', label: 'Barba Média', value: 'beardMedium', type: 'facialHair', requiredLevel: 3, gender: 'male' },
    { id: 'beard4', label: 'Majestosa', value: 'beardMajestic', type: 'facialHair', requiredLevel: 5, gender: 'male' },
    { id: 'beard5', label: 'Bigode', value: 'moustacheFancy', type: 'facialHair', requiredLevel: 3, gender: 'male' },

    // --- CLOTHING ---
    { id: 'clothe1', label: 'Camiseta Gola V', value: 'shirtVNeck', type: 'clothing', requiredLevel: 1, gender: 'unisex' },
    { id: 'clothe2', label: 'Camiseta Gola Redonda', value: 'shirtCrewNeck', type: 'clothing', requiredLevel: 1, gender: 'unisex' },
    { id: 'clothe3', label: 'Blazer e Camisa', value: 'blazerShirt', type: 'clothing', requiredLevel: 2, gender: 'unisex' },
    { id: 'clothe4', label: 'Suéter e Gola', value: 'collarSweater', type: 'clothing', requiredLevel: 2, gender: 'unisex' },
    { id: 'clothe5', label: 'Moletom', value: 'hoodie', type: 'clothing', requiredLevel: 3, gender: 'unisex' },
    { id: 'clothe6', label: 'Macacão', value: 'overall', type: 'clothing', requiredLevel: 4, gender: 'unisex' },
    { id: 'clothe7', label: 'Camisa Gráfica', value: 'graphicShirt', type: 'clothing', requiredLevel: 5, gender: 'unisex' },

    // --- EYES ---
    { id: 'eyes1', label: 'Normal', value: 'default', type: 'eyes', requiredLevel: 1, gender: 'unisex' },
    { id: 'eyes2', label: 'Feliz', value: 'happy', type: 'eyes', requiredLevel: 1, gender: 'unisex' },
    { id: 'eyes3', label: 'Piscadinha', value: 'wink', type: 'eyes', requiredLevel: 2, gender: 'unisex', price: 50 },
    { id: 'eyes4', label: 'Surpreso', value: 'surprised', type: 'eyes', requiredLevel: 3, gender: 'unisex' },
    { id: 'eyes5', label: 'Corações', value: 'hearts', type: 'eyes', requiredLevel: 10, gender: 'unisex', price: 200 },

    // --- EYEBROWS ---
    { id: 'brow1', label: 'Normal', value: 'default', type: 'eyebrows', requiredLevel: 1, gender: 'unisex' },
    { id: 'brow2', label: 'Natural', value: 'defaultNatural', type: 'eyebrows', requiredLevel: 1, gender: 'unisex' }, // Assuming defaultNatural, or just use default
    { id: 'brow3', label: 'Cima/Baixo', value: 'upDown', type: 'eyebrows', requiredLevel: 2, gender: 'unisex' },
    { id: 'brow4', label: 'Animado', value: 'raisedExcited', type: 'eyebrows', requiredLevel: 2, gender: 'unisex' },
    { id: 'brow5', label: 'Triste', value: 'sadConcerned', type: 'eyebrows', requiredLevel: 3, gender: 'unisex' },
    { id: 'brow6', label: 'Unicelha', value: 'unibrowNatural', type: 'eyebrows', requiredLevel: 5, gender: 'unisex' },

    // --- ACCESSORIES (Glasses) ---
    { id: 'acc1', label: 'Sem Acessório', value: 'blank', type: 'accessories', requiredLevel: 1, gender: 'unisex' },
    { id: 'acc2', label: 'Óculos Redondos', value: 'round', type: 'accessories', requiredLevel: 2, gender: 'unisex', price: 50 },
    { id: 'acc3', label: 'Óculos de Grau', value: 'prescription02', type: 'accessories', requiredLevel: 3, gender: 'unisex', price: 75 },
    { id: 'acc4', label: 'Óculos Escuros', value: 'sunglasses', type: 'accessories', requiredLevel: 5, gender: 'unisex', price: 150 },
    { id: 'acc5', label: 'Wayfarers', value: 'wayfarers', type: 'accessories', requiredLevel: 6, gender: 'unisex', price: 180 },

    // --- MOUTH ---
    { id: 'mouth1', label: 'Normal', value: 'default', type: 'mouth', requiredLevel: 1, gender: 'unisex' },
    { id: 'mouth2', label: 'Sorriso', value: 'smile', type: 'mouth', requiredLevel: 1, gender: 'unisex' },
    { id: 'mouth3', label: 'Sério', value: 'serious', type: 'mouth', requiredLevel: 2, gender: 'unisex' },
    { id: 'mouth4', label: 'Língua', value: 'tongue', type: 'mouth', requiredLevel: 3, gender: 'unisex' },
    { id: 'mouth5', label: 'Comendo', value: 'eating', type: 'mouth', requiredLevel: 4, gender: 'unisex' },
];

export const CATEGORIES = [
    { key: 'skinColor', label: 'Pele' },
    { key: 'top', label: 'Cabelo/Chapéu' },
    { key: 'hairColor', label: 'Cor Cabelo' },
    { key: 'facialHair', label: 'Barba' },
    { key: 'clothing', label: 'Roupa' },
    { key: 'eyes', label: 'Olhos' },
    { key: 'eyebrows', label: 'Sobranc.' },
    { key: 'accessories', label: 'Acessórios' },
    { key: 'mouth', label: 'Boca' },
];
