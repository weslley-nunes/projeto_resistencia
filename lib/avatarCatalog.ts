export type AvatarItem = {
    id: string;
    label: string;
    value: string;
    type: 'topType' | 'accessoriesType' | 'hairColor' | 'facialHairType' | 'clotheType' | 'eyeType' | 'eyebrowType' | 'mouthType' | 'skinColor';
    requiredLevel: number;
};

export const AVATAR_CATALOG: AvatarItem[] = [
    // --- TOP (Hair/Hats) ---
    { id: 'top1', label: 'Careca', value: 'NoHair', type: 'topType', requiredLevel: 1 },
    { id: 'top2', label: 'Curto Padrão', value: 'ShortHairShortFlat', type: 'topType', requiredLevel: 1 },
    { id: 'top3', label: 'Ondulado', value: 'ShortHairWave', type: 'topType', requiredLevel: 2 },
    { id: 'top4', label: 'Comprido Liso', value: 'LongHairStraight', type: 'topType', requiredLevel: 3 },
    { id: 'top5', label: 'Afro', value: 'LongHairCurly', type: 'topType', requiredLevel: 3 },
    { id: 'top6', label: 'Coque', value: 'LongHairBun', type: 'topType', requiredLevel: 4 },
    { id: 'top7', label: 'Chapéu de Inverno', value: 'WinterHat1', type: 'topType', requiredLevel: 5 },
    { id: 'top8', label: 'Turbante', value: 'Turban', type: 'topType', requiredLevel: 8 },
    { id: 'top9', label: 'Chapéu com Orelhas', value: 'WinterHat4', type: 'topType', requiredLevel: 15 },

    // --- ACCESSORIES ---
    { id: 'acc1', label: 'Nenhum', value: 'Blank', type: 'accessoriesType', requiredLevel: 1 },
    { id: 'acc2', label: 'Óculos Redondos', value: 'Round', type: 'accessoriesType', requiredLevel: 2 },
    { id: 'acc3', label: 'Óculos de Grau', value: 'Prescription02', type: 'accessoriesType', requiredLevel: 3 },
    { id: 'acc4', label: 'Óculos Escuros', value: 'Sunglasses', type: 'accessoriesType', requiredLevel: 10 },
    { id: 'acc5', label: 'Wayfarers', value: 'Wayfarers', type: 'accessoriesType', requiredLevel: 12 },

    // --- CLOTHES ---
    { id: 'cloth1', label: 'Blazer e Camisa', value: 'BlazerShirt', type: 'clotheType', requiredLevel: 1 },
    { id: 'cloth2', label: 'Suéter', value: 'BlazerSweater', type: 'clotheType', requiredLevel: 1 },
    { id: 'cloth3', label: 'Camiseta Gola V', value: 'ShirtVNeck', type: 'clotheType', requiredLevel: 2 },
    { id: 'cloth4', label: 'Camiseta', value: 'ShirtScoopNeck', type: 'clotheType', requiredLevel: 3 },
    { id: 'cloth5', label: 'Moletom', value: 'Hoodie', type: 'clotheType', requiredLevel: 5 },
    { id: 'cloth6', label: 'Macacão', value: 'Overall', type: 'clotheType', requiredLevel: 8 },

    // --- EYES ---
    { id: 'eye1', label: 'Padrão', value: 'Default', type: 'eyeType', requiredLevel: 1 },
    { id: 'eye2', label: 'Feliz', value: 'Happy', type: 'eyeType', requiredLevel: 1 },
    { id: 'eye3', label: 'Piscadinha', value: 'Wink', type: 'eyeType', requiredLevel: 3 },
    { id: 'eye4', label: 'Corações', value: 'Hearts', type: 'eyeType', requiredLevel: 20 },

    // --- MOUTH ---
    { id: 'mouth1', label: 'Padrão', value: 'Default', type: 'mouthType', requiredLevel: 1 },
    { id: 'mouth2', label: 'Sorriso', value: 'Smile', type: 'mouthType', requiredLevel: 1 },
    { id: 'mouth3', label: 'Sério', value: 'Serious', type: 'mouthType', requiredLevel: 2 },
    { id: 'mouth4', label: 'Língua pra Fora', value: 'Tongue', type: 'mouthType', requiredLevel: 5 },

    // --- SKIN COLOR ---
    { id: 'skin1', label: 'Clara', value: 'Light', type: 'skinColor', requiredLevel: 1 },
    { id: 'skin2', label: 'Parda', value: 'Brown', type: 'skinColor', requiredLevel: 1 },
    { id: 'skin3', label: 'Negra', value: 'DarkBrown', type: 'skinColor', requiredLevel: 1 },
    { id: 'skin4', label: 'Negra Escura', value: 'Black', type: 'skinColor', requiredLevel: 1 },
    { id: 'skin5', label: 'Pálida', value: 'Pale', type: 'skinColor', requiredLevel: 1 },
];

export const CATEGORIES = [
    { key: 'topType', label: 'Cabeça' },
    { key: 'accessoriesType', label: 'Acessórios' },
    { key: 'clotheType', label: 'Roupas' },
    { key: 'eyeType', label: 'Olhos' },
    { key: 'mouthType', label: 'Boca' },
    { key: 'skinColor', label: 'Pele' },
];
