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
        // 1. Fetch all eligible students/users (exclude purely system technical admin if desired, but keep enrolled users)
        const students = await prisma.user.findMany({
            where: {
                email: { not: 'admin@sistema.local' }
            },
            select: {
                id: true,
                name: true,
                email: true,
                city: true,
                school: true,
                status: true,
                role: true,
                image: true
            },
            orderBy: { name: 'asc' }
        });

        // 2. Fetch all activity submissions (classes and trail nodes)
        const submissions = await prisma.activitySubmission.findMany({
            select: {
                id: true,
                userId: true,
                classId: true,
                nodeId: true,
                moduleId: true,
                content: true,
                files: true,
                isPublic: true,
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        });

        // 3. Fetch all trail progress
        const userProgress = await prisma.userProgress.findMany({
            select: {
                userId: true,
                moduleId: true,
                nodeId: true,
                completedAt: true
            }
        });

        // 4. Fetch all quiz results
        const quizResults = await prisma.quizResult.findMany({
            select: {
                id: true,
                userId: true,
                moduleId: true,
                score: true,
                passed: true,
                completedAt: true
            },
            orderBy: { completedAt: 'desc' }
        });

        return NextResponse.json({
            students,
            submissions,
            userProgress,
            quizResults
        });

    } catch (error) {
        console.error('Error fetching admin activities overview:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
