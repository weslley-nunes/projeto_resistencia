'use client';

import React from 'react';
import Avatar from 'avataaars'; // Requires 'avataaars' package

interface AvatarDisplayProps {
    config: any;
    className?: string;
    style?: React.CSSProperties;
}

export default function AvatarDisplay({ config, className, style }: AvatarDisplayProps) {
    if (!config) return <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse" />;

    return (
        <div className={className} style={style}>
            <Avatar
                avatarStyle='Circle' // or Transparent
                {...config}
            />
        </div>
    );
}
