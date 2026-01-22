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

    // Directly append keys from config since we synchronized catalog keys with DiceBear params
    Object.keys(config).forEach(key => {
        if (config[key] && config[key] !== 'default' && config[key] !== 'blank') {
            params.append(key, config[key]);
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
