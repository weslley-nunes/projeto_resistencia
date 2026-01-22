import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { moduleId, score, passed } = await request.json();

        // Get user ID from email
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Save Quiz Result
        const result = await prisma.quizResult.create({
            data: {
                userId: user.id,
                moduleId,
                score,
                passed,
            },
        });

        // Update User XP/Educoins if passed
        if (passed) {
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    xp: { increment: 200 },
                    educoins: { increment: 100 }
                }
            });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Failed to submit quiz', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
