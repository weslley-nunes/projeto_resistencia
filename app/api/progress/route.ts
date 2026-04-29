import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma'; // Assuming you have a shared prisma client instance

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get('moduleId');

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
                progress: moduleId ? {
                    where: { moduleId }
                } : true
            }
        });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        const completedNodes = user.progress.map((p: any) => p.nodeId);

        return NextResponse.json({
            educoins: user.educoins,
            xp: user.xp,
            level: user.level,
            completedNodes
        });

    } catch (error) {
        console.error('Error fetching progress:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const body = await request.json();
        const { moduleId, nodeId, reward } = body;

        if (!moduleId || !nodeId) {
            return new NextResponse('Missing fields', { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) return new NextResponse('User not found', { status: 404 });

        // Check if already completed to avoid duplicate rewards
        const existingProgress = await prisma.userProgress.findUnique({
            where: {
                userId_moduleId_nodeId: {
                    userId: user.id,
                    moduleId,
                    nodeId
                }
            }
        });

        if (existingProgress) {
            return NextResponse.json({
                educoins: user.educoins,
                completedNodes: [] // Client usually appends, but we can return nothing or handle gracefully
            });
        }

        // Transaction to ensure atomicity
        const [progress, updatedUser] = await prisma.$transaction([
            prisma.userProgress.create({
                data: {
                    userId: user.id,
                    moduleId,
                    nodeId
                }
            }),
            prisma.user.update({
                where: { id: user.id },
                data: {
                    educoins: { increment: reward || 0 }
                }
            })
        ]);

        return NextResponse.json({
            success: true,
            newEducoins: updatedUser.educoins
        });

    } catch (error) {
        console.error('Error saving progress:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
