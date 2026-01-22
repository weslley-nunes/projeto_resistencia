interface AvatarDisplayProps {
    config: any;
    className?: string;
    style?: React.CSSProperties;
    seed?: string; // Add seed prop for consistency if needed, though config usually handles it
}

export default function AvatarDisplay({ config, className, style, seed }: AvatarDisplayProps) {
    if (!config) return <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse" />;

    // Construct DiceBear URL
    // e.g. https://api.dicebear.com/9.x/avataaars/svg?seed=Harper&top=longHair&accessories=glasses
    const baseUrl = 'https://api.dicebear.com/9.x/avataaars/svg';
    const params = new URLSearchParams();

    // Use user ID or random string as seed to keep base features consistent if not specified
    params.append('seed', seed || 'felix');

    // Map our config keys to DiceBear params
    // Our catalog uses keys like 'topType', 'accessoriesType'. DiceBear often uses 'top', 'accessories'.
    // We need to map them carefully or ensure our catalog matches DiceBear.

    // DiceBear Avataaars Collection Params Mapping:
    // https://www.dicebear.com/styles/avataaars/

    if (config.topType) params.append('top', config.topType.toLowerCase()); // DiceBear expects lowercase logic often, but let's check values.
    // Actually DiceBear Avataaars values are usually camelCase. Our catalog has values like 'ShortHairShortFlat'. 
    // DiceBear documentation says values can be specific. Let's pass them as is first.

    // Mapping keys from our internal catalog to DiceBear params
    const keyMapping: Record<string, string> = {
        topType: 'top',
        accessoriesType: 'accessories',
        hairColor: 'hairColor',
        facialHairType: 'facialHair',
        clotheType: 'clothing',
        eyeType: 'eyes',
        eyebrowType: 'eyebrows',
        mouthType: 'mouth',
        skinColor: 'skinColor'
    };

    Object.keys(config).forEach(key => {
        const diceBearKey = keyMapping[key];
        if (diceBearKey && config[key] && config[key] !== 'Default' && config[key] !== 'Blank') {
            // DiceBear API expects comma separated values if multiple, but we select one.
            // Also, values like 'ShortHairShortFlat' need to be checked.
            // In DiceBear v9, values are often specific. 
            // For 'avataaars' style, it tries to match the original library.
            // Let's pass the value directly.
            params.append(diceBearKey, config[key]);
        }
    });

    const avatarUrl = `${baseUrl}?${params.toString()}`;

    return (
        <div className={className} style={style}>
            <img
                src={avatarUrl}
                alt="Avatar"
                className="w-full h-full object-contain rounded-full"
            />
        </div>
    );
}
