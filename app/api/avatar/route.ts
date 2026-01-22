import { createAvatar } from '@dicebear/core';
import * as avataaars from '@dicebear/avataaars';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const seed = searchParams.get('seed') || 'felix';

        // Extract styles from params (Avataaars specific)
        const options: any = {
            seed,
            top: searchParams.getAll('top'),
            accessories: searchParams.getAll('accessories'),
            hairColor: searchParams.getAll('hairColor'),
            facialHair: searchParams.getAll('facialHair'),
            clothing: searchParams.getAll('clothing'),
            eyes: searchParams.getAll('eyes'),
            eyebrows: searchParams.getAll('eyebrows'),
            mouth: searchParams.getAll('mouth'),
            skinColor: searchParams.getAll('skinColor'),
        };

        // Clean up empty arrays
        Object.keys(options).forEach(key => {
            if (Array.isArray(options[key])) {
                if (options[key].length === 0) {
                    delete options[key];
                } else if (options[key].length === 1) {
                    options[key] = [options[key][0]];
                }
            }
        });

        const avatar = createAvatar(avataaars, {
            ...options,
            size: 128,
        });

        const svg = await avatar.toString();

        return new NextResponse(svg, {
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error("Avatar Generation Error:", error);
        // Return a fallback SVG on error
        const errorSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="#eee"><rect width="128" height="128"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999" font-family="sans-serif" font-size="10">Avatar Error</text></svg>`;
        return new NextResponse(errorSvg, {
            status: 500,
            headers: { 'Content-Type': 'image/svg+xml' }
        });
    }
}
