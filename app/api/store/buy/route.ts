import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AVATAR_CATALOG } from '@/lib/avatarCatalog';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { itemId } = await req.json();
        const item = AVATAR_CATALOG.find(i => i.id === itemId);

        if (!item) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        if (!item.price || item.price <= 0) {
            return NextResponse.json({ error: 'Item is not for sale' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        });

        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        if (user.educoins < item.price) {
            return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 });
        }

        const unlockedItems = user.unlockedItems ? JSON.parse(user.unlockedItems) : [];
        if (unlockedItems.includes(itemId)) {
            return NextResponse.json({ error: 'Item already unlocked' }, { status: 400 });
        }

        // Deduct coins and add item
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                educoins: user.educoins - item.price,
                unlockedItems: JSON.stringify([...unlockedItems, itemId])
            }
        });

        return NextResponse.json({ success: true, newBalance: updatedUser.educoins, unlockedItems: [...unlockedItems, itemId] });
    } catch (error) {
        console.error("Purchase error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
