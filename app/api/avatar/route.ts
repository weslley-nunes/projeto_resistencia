import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/adventurer';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const seed = searchParams.get('seed') || 'felix';

    // Extract other styles from params
    const options: any = {
        seed,
        // Map other known keys
        hair: searchParams.getAll('hair'),
        eyes: searchParams.getAll('eyes'),
        mouth: searchParams.getAll('mouth'),
        skinColor: searchParams.getAll('skinColor'),
        glasses: searchParams.getAll('glasses'),
    };

    // Clean up empty arrays or keys (options need to be specific types usually, but core handles lenient input often)
    // However, @dicebear/adventurer expects specific types. Let's pass what we have.
    // We might need to handle single values vs arrays. DiceBear options usually take arrays for "probability" or specific strings.
    // If we passed specific value in AvatarDisplay, it's a string.

    // Convert URLSearchParams (which can be array) to simple strings if single
    // Actually, createAvatar keys usually expect array of strings for random choice, or single string.

    Object.keys(options).forEach(key => {
        if (Array.isArray(options[key]) && options[key].length === 0) {
            delete options[key];
        } else if (Array.isArray(options[key]) && options[key].length === 1) {
            options[key] = [options[key][0]]; // keep as array for style options usually
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
}
