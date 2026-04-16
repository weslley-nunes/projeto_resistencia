import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const publicSubmissions = await prisma.activitySubmission.findMany({
            where: {
                isPublic: true
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                        city: true,
                        school: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(publicSubmissions);
    } catch (error) {
        console.error('Fetch public submissions error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
