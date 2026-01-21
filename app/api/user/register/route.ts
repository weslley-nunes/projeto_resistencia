import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();

        // Extract text fields
        const cpf = formData.get('cpf') as string;
        const phone = formData.get('phone') as string;
        const city = formData.get('city') as string;
        const school = formData.get('school') as string;
        const jobTitle = formData.get('jobTitle') as string;
        const teachingTime = formData.get('teachingTime') as string;
        const educationLevel = formData.get('educationLevel') as string;
        const trainingArea = formData.get('trainingArea') as string;
        const quotaType = formData.get('quotaType') as string;
        const isPcd = formData.get('isPcd') === 'true';

        // Extract files
        const documentsFile = formData.get('documents') as File | null;
        const quotaFile = formData.get('quotaDocuments') as File | null;
        const pcdFile = formData.get('pcdDocuments') as File | null;

        // Prepare update data
        const updateData: any = {
            cpf,
            phone,
            city,
            school,
            jobTitle,
            teachingTime,
            educationLevel,
            trainingArea,
            quotaType,
            isPcd: Boolean(isPcd),
            status: "PENDING_APPROVAL"
        };

        // Helper to save file
        const saveFile = async (file: File, folder: string, prefix: string) => {
            if (!file) return null;

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Create directory if not exists
            const uploadDir = join(process.cwd(), 'public', 'uploads', folder);
            await mkdir(uploadDir, { recursive: true });

            const fileName = `${prefix}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
            const filePath = join(uploadDir, fileName);

            await writeFile(filePath, buffer);
            return `/uploads/${folder}/${fileName}`;
        };

        const userId = session.user.id; // Assuming ID is available in session, otherwise query user by email

        // We need user ID for folder name. If session.user.id is missing (depends on auth options), fetch user first
        let targetUserId = userId;
        if (!targetUserId) {
            const user = await prisma.user.findUnique({ where: { email: session.user.email } });
            if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
            targetUserId = user.id;
        }

        if (documentsFile) {
            updateData.documentsUrl = await saveFile(documentsFile, targetUserId, 'docs');
        }
        if (quotaFile) {
            updateData.quotaDocumentsUrl = await saveFile(quotaFile, targetUserId, 'quota');
        }
        if (pcdFile) {
            updateData.pcdDocumentsUrl = await saveFile(pcdFile, targetUserId, 'pcd');
        }

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: updateData,
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
