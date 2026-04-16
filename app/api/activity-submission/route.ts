import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) return new NextResponse('User not found', { status: 404 });

        const submissions = await prisma.activitySubmission.findMany({
            where: { userId: user.id }
        });

        return NextResponse.json(submissions);
    } catch (error) {
        console.error('Fetch submissions error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const formData = await req.formData();
        const classId = formData.get('classId') as string;
        const content = formData.get('content') as string;
        const isPublic = formData.get('isPublic') === 'true';
        const existingFilesStr = formData.get('existingFiles') as string;
        const newFiles = formData.getAll('files') as File[];

        if (!classId) return new NextResponse('Missing classId', { status: 400 });

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });
        if (!user) return new NextResponse('User not found', { status: 404 });

        let existingFiles = [];
        try {
            existingFiles = JSON.parse(existingFilesStr || '[]');
        } catch (e) {}

        const uploadedFiles = [...existingFiles];

        // Ensure directory exists
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'activities');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {}

        // Handle new files
        for (const file of newFiles) {
            if (file.size === 0) continue;
            
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
            const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
            const filename = `${uniqueSuffix}-${originalName}`;
            const filepath = join(uploadDir, filename);

            await writeFile(filepath, buffer);
            
            uploadedFiles.push({
                name: file.name,
                url: `/uploads/activities/${filename}`,
                type: file.type
            });
        }

        // Upsert submission
        const submission = await prisma.activitySubmission.upsert({
            where: {
                userId_classId: {
                    userId: user.id,
                    classId: classId
                }
            },
            update: {
                content,
                isPublic,
                files: JSON.stringify(uploadedFiles)
            },
            create: {
                userId: user.id,
                classId,
                content,
                isPublic,
                files: JSON.stringify(uploadedFiles)
            }
        });

        return NextResponse.json(submission);

    } catch (error) {
        console.error('Submission error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
