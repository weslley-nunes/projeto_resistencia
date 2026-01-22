interface AvatarDisplayProps {
    config: any;
    className?: string;
    style?: React.CSSProperties;
    seed?: string; // Add seed prop for consistency if needed, though config usually handles it
}

export default function AvatarDisplay({ config, className, style, seed }: AvatarDisplayProps) {
    if (!config) return <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse" />;

    // Construct DiceBear URL
    // Style: Adventurer (more reliable, simple params)
    const baseUrl = 'https://api.dicebear.com/9.x/adventurer/svg';
    const params = new URLSearchParams();

    // Use user ID or random string as seed
    params.append('seed', seed || 'felix');

    // Add keys
    Object.keys(config).forEach(key => {
        if (config[key] && config[key] !== 'none' && config[key] !== 'default') {
            // Handle arrays handling if complex, but simple strings work for adventurer
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
