import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Você precisa estar logado para enviar a atividade.' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 });
        }

        const formData = await request.formData();
        const type = formData.get('type') as string;
        const nodeId = formData.get('nodeId') as string;
        const moduleId = formData.get('moduleId') as string;
        
        if (!type || !nodeId || !moduleId) {
            return NextResponse.json({ error: 'Parâmetros obrigatórios ausentes.' }, { status: 400 });
        }

        let content = formData.get('content') as string | null;
        let fileUrl = null;

        if (type === 'file-upload') {
            const file = formData.get('file') as File | null;
            if (file && file.size > 0) {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
                
                // create uniquely named file
                const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
                
                const uploadDir = path.join(process.cwd(), 'public', 'uploads');
                const filePath = path.join(uploadDir, filename);
                
                await writeFile(filePath, buffer);
                fileUrl = `/uploads/${filename}`;
            } else {
                 return NextResponse.json({ error: 'Nenhum arquivo válido foi enviado.' }, { status: 400 });
            }
        }

        // Find existing submission
        const existing = await prisma.activitySubmission.findFirst({
            where: {
                userId: user.id,
                moduleId,
                nodeId
            }
        });

        const uploadedFiles = [];
        if (fileUrl) {
            const file = formData.get('file') as File | null;
            uploadedFiles.push({
                name: file ? file.name : 'arquivo',
                url: fileUrl,
                type: file ? file.type : 'application/octet-stream'
            });
        }

        let submission;
        if (existing) {
            submission = await prisma.activitySubmission.update({
                where: { id: existing.id },
                data: {
                    content,
                    files: fileUrl ? JSON.stringify(uploadedFiles) : existing.files,
                    createdAt: new Date(),
                }
            });
        } else {
            submission = await prisma.activitySubmission.create({
                data: {
                    userId: user.id,
                    moduleId,
                    nodeId,
                    content,
                    files: fileUrl ? JSON.stringify(uploadedFiles) : '[]',
                }
            });
        }

        return NextResponse.json({ success: true, submission });

    } catch (error: any) {
        console.error('Error submitting activity:', error);
        return NextResponse.json({ error: error.message || 'Erro interno no servidor.' }, { status: 500 });
    }
}
