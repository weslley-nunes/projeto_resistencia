export type AvatarItem = {
    id: string;
    label: string;
    value: string;
    type: 'top' | 'accessories' | 'hairColor' | 'facialHair' | 'clothing' | 'eyes' | 'eyebrows' | 'mouth' | 'skinColor';
    requiredLevel: number;
    gender?: 'male' | 'female' | 'unisex';
    price?: number; // Educoins price. If defined and > 0, it's a store item.
};

export const AVATAR_CATALOG: AvatarItem[] = [
    // --- SKINS (Unisex) ---
    { id: 'skin1', label: 'Pálida', value: 'f8d25c', type: 'skinColor', requiredLevel: 1, gender: 'unisex' },
    { id: 'skin2', label: 'Clara', value: 'ffdbb4', type: 'skinColor', requiredLevel: 1, gender: 'unisex' },
    { id: 'skin3', label: 'Bronzeada', value: 'edb98a', type: 'skinColor', requiredLevel: 1, gender: 'unisex' },
    { id: 'skin4', label: 'Morena', value: 'd08b5b', type: 'skinColor', requiredLevel: 1, gender: 'unisex' },
    { id: 'skin5', label: 'Negra', value: 'ae5d29', type: 'skinColor', requiredLevel: 1, gender: 'unisex' },
    { id: 'skin6', label: 'Negra Escura', value: '614335', type: 'skinColor', requiredLevel: 1, gender: 'unisex' },

    // --- TOP (Hair/Hats) - MALE ---
    { id: 'topM1', label: 'Careca', value: 'noHair', type: 'top', requiredLevel: 1, gender: 'male' },
    { id: 'topM2', label: 'Curto Padrão', value: 'shortHairShortFlat', type: 'top', requiredLevel: 1, gender: 'male' },
    { id: 'topM3', label: 'Curto Arrepiado', value: 'shortHairShortWaved', type: 'top', requiredLevel: 2, gender: 'male' },
    { id: 'topM4', label: 'Topete', value: 'shortHairFrizzle', type: 'top', requiredLevel: 3, gender: 'male' },
    { id: 'topM5', label: 'Afro Curto', value: 'shortHairDreads01', type: 'top', requiredLevel: 5, gender: 'male', price: 100 },

    // --- TOP (Hair/Hats) - FEMALE ---
    { id: 'topF1', label: 'Longo Liso', value: 'longHairStraight', type: 'top', requiredLevel: 1, gender: 'female' },
    { id: 'topF2', label: 'Longo Ondulado', value: 'longHairBigHair', type: 'top', requiredLevel: 2, gender: 'female' },
    { id: 'topF3', label: 'Bob Curto', value: 'longHairBob', type: 'top', requiredLevel: 1, gender: 'female' },
    { id: 'topF4', label: 'Coque', value: 'longHairBun', type: 'top', requiredLevel: 4, gender: 'female', price: 50 },
    { id: 'topF5', label: 'Afro Longo', value: 'longHairCurly', type: 'top', requiredLevel: 5, gender: 'female', price: 100 },
    { id: 'topF6', label: 'Mio', value: 'longHairMiaWallace', type: 'top', requiredLevel: 8, gender: 'female', price: 150 },

    // --- TOP (Hats/Special) - UNISEX ---
    { id: 'topU1', label: 'Touca de Inverno', value: 'winterHat1', type: 'top', requiredLevel: 5, gender: 'unisex', price: 200 },
    { id: 'topU2', label: 'Turbante', value: 'turban', type: 'top', requiredLevel: 8, gender: 'unisex', price: 300 },
    { id: 'topU3', label: 'Chapéu com Orelhas', value: 'winterHat04', type: 'top', requiredLevel: 15, gender: 'unisex', price: 500 },

    // --- FACIAL HAIR (Male) ---
    { id: 'beard1', label: 'Sem Barba', value: 'blank', type: 'facialHair', requiredLevel: 1, gender: 'male' },
    { id: 'beard2', label: 'Barba Por Fazer', value: 'beardLight', type: 'facialHair', requiredLevel: 2, gender: 'male' },
    { id: 'beard3', label: 'Barba Média', value: 'beardMedium', type: 'facialHair', requiredLevel: 5, gender: 'male', price: 50 },
    { id: 'beard4', label: 'Bigode', value: 'moustacheFancy', type: 'facialHair', requiredLevel: 8, gender: 'male', price: 100 },

    // --- ACCESSORIES (Unisex) ---
    { id: 'acc1', label: 'Nenhum', value: 'blank', type: 'accessories', requiredLevel: 1, gender: 'unisex' },
    { id: 'acc2', label: 'Óculos Redondos', value: 'round', type: 'accessories', requiredLevel: 2, gender: 'unisex', price: 50 },
    { id: 'acc3', label: 'Óculos de Grau', value: 'prescription02', type: 'accessories', requiredLevel: 3, gender: 'unisex', price: 80 },
    { id: 'acc4', label: 'Óculos Escuros', value: 'sunglasses', type: 'accessories', requiredLevel: 10, gender: 'unisex', price: 200 },
    { id: 'acc5', label: 'Wayfarers', value: 'wayfarers', type: 'accessories', requiredLevel: 12, gender: 'unisex', price: 250 },

    // --- CLOTHES (Unisex) ---
    { id: 'cloth1', label: 'Blazer e Camisa', value: 'blazerAndShirt', type: 'clothing', requiredLevel: 1, gender: 'unisex' },
    { id: 'cloth2', label: 'Suéter', value: 'blazerAndSweater', type: 'clothing', requiredLevel: 1, gender: 'unisex' },
    { id: 'cloth3', label: 'Camiseta Gola V', value: 'shirtVNeck', type: 'clothing', requiredLevel: 2, gender: 'unisex' },
    { id: 'cloth4', label: 'Camiseta', value: 'shirtScoopNeck', type: 'clothing', requiredLevel: 3, gender: 'unisex' },
    { id: 'cloth5', label: 'Moletom', value: 'hoodie', type: 'clothing', requiredLevel: 5, gender: 'unisex', price: 150 },
    { id: 'cloth6', label: 'Macacão', value: 'overall', type: 'clothing', requiredLevel: 8, gender: 'unisex', price: 200 },

    // --- EYES (Unisex) ---
    { id: 'eye1', label: 'Padrão', value: 'default', type: 'eyes', requiredLevel: 1, gender: 'unisex' },
    { id: 'eye2', label: 'Feliz', value: 'happy', type: 'eyes', requiredLevel: 1, gender: 'unisex' },
    { id: 'eye3', label: 'Piscadinha', value: 'wink', type: 'eyes', requiredLevel: 3, gender: 'unisex' },
    { id: 'eye4', label: 'Corações', value: 'hearts', type: 'eyes', requiredLevel: 20, gender: 'unisex', price: 1000 },

    // --- MOUTH (Unisex) ---
    { id: 'mouth1', label: 'Padrão', value: 'default', type: 'mouth', requiredLevel: 1, gender: 'unisex' },
    { id: 'mouth2', label: 'Sorriso', value: 'smile', type: 'mouth', requiredLevel: 1, gender: 'unisex' },
    { id: 'mouth3', label: 'Sério', value: 'serious', type: 'mouth', requiredLevel: 2, gender: 'unisex' },
    { id: 'mouth4', label: 'Língua', value: 'tongue', type: 'mouth', requiredLevel: 5, gender: 'unisex' },
];

export const CATEGORIES = [
    { key: 'skinColor', label: 'Pele' },
    { key: 'top', label: 'Cabelo/Chapéu' },
    { key: 'facialHair', label: 'Barba' },
    { key: 'clothing', label: 'Roupa' },
    { key: 'eyes', label: 'Olhos' },
    { key: 'mouth', label: 'Boca' },
    { key: 'accessories', label: 'Acessórios' },
];
