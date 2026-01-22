interface AvatarDisplayProps {
    config: any;
    className?: string;
    style?: React.CSSProperties;
    seed?: string; // Add seed prop for consistency if needed, though config usually handles it
}

export default function AvatarDisplay({ config, className, style, seed }: AvatarDisplayProps) {
    if (!config) return <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse" />;

    // Construct Local API URL
    // Use our internal API that generates SVG server-side using @dicebear/core
    const baseUrl = '/api/avatar';
    const params = new URLSearchParams();

    // Use user ID or random string as seed to keep base features consistent
    const cleanSeed = (seed || 'felix').trim();
    params.append('seed', cleanSeed);

    // Add keys
    Object.keys(config).forEach(key => {
        if (config[key] && config[key] !== 'none' && config[key] !== 'default') {
            params.append(key, config[key]);
        }
    });

    const avatarUrl = `${baseUrl}?${params.toString()}`;

    return (
        <div className={className} style={style}>
            <img
                src={avatarUrl}
                alt="Avatar"
                className="w-full h-full object-contain rounded-full bg-white"
                onError={(e) => {
                    // console.error("Avatar load error", e);
                    // e.currentTarget.style.opacity = '0.5'; 
                }}
            />
        </div>
    );
}
