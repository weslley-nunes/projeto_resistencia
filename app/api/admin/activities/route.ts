import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const session = await getServerSession(authOptions);
    
    // @ts-ignore
    if (!session?.user?.email || session.user?.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const submissions = await prisma.activitySubmission.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        city: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(submissions);
    } catch (error) {
        console.error('Admin Fetch submissions error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
