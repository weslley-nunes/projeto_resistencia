import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // Ensure this path is correct
import { prisma } from '@/lib/prisma'; // Ensure this path is correct

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { avatarConfig: true, level: true, unlockedItems: true, educoins: true }
        });

        // Default config if none exists
        const DEFAULT_CONFIG = {
            topType: 'shortHairShortFlat',
            accessoriesType: 'blank',
            hairColor: 'brown',
            facialHairType: 'blank',
            clotheType: 'blazerAndShirt',
            eyeType: 'default',
            eyebrowType: 'default',
            mouthType: 'default',
            skinColor: 'light'
        };

        const config = user?.avatarConfig ? JSON.parse(user.avatarConfig) : DEFAULT_CONFIG;
        const unlockedItems = user?.unlockedItems ? JSON.parse(user.unlockedItems) : [];

        return NextResponse.json({ config, level: user?.level || 1, unlockedItems, educoins: user?.educoins || 0 });
    } catch (error) {
        console.error("Error fetching avatar:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { config } = await req.json();

        // Optional: Add backend validation here to ensure user level >= required level for each item.
        // For now, we rely on the frontend lock, but for a real secure game, we should validade here.

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: { avatarConfig: JSON.stringify(config) }
        });

        return NextResponse.json({ success: true, config });
    } catch (error) {
        console.error("Error updating avatar:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
