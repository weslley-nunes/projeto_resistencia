import { createAvatar } from '@dicebear/core';
import * as adventurer from '@dicebear/adventurer';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const seed = searchParams.get('seed') || 'felix';

        // Extract other styles from params
        const options: any = {
            seed,
            // Map other known keys
            hair: searchParams.getAll('hair'),
            hairColor: searchParams.getAll('hairColor'),
            eyes: searchParams.getAll('eyes'),
            eyebrows: searchParams.getAll('eyebrows'),
            mouth: searchParams.getAll('mouth'),
            skinColor: searchParams.getAll('skinColor'),
            glasses: searchParams.getAll('glasses'),
        };

        // Clean up empty arrays
        Object.keys(options).forEach(key => {
            if (Array.isArray(options[key])) {
                if (options[key].length === 0) {
                    delete options[key];
                } else if (options[key].length === 1) {
                    // DiceBear often works with arrays for probabilities, but let's keep it clean
                    options[key] = [options[key][0]];
                }
            }
        });

        const avatar = createAvatar(adventurer, {
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
