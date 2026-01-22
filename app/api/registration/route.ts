import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const cpf = formData.get('cpf') as string;
        const phone = formData.get('phone') as string;
        const city = formData.get('city') as string;
        const school = formData.get('school') as string;
        const jobTitle = formData.get('jobTitle') as string;
        const teachingTime = formData.get('teachingTime') as string;
        const educationLevel = formData.get('educationLevel') as string;
        const trainingArea = formData.get('trainingArea') as string;
        const quotaType = formData.get('quotaType') as string;
        const file = formData.get('file') as File;

        // Basic validation
        if (!name || !email || !cpf || !phone || !quotaType) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        // Check duplicates
        const existing = await prisma.registration.findFirst({
            where: {
                OR: [
                    { email },
                    { cpf }
                ]
            }
        });

        if (existing) {
            return new NextResponse('Email or CPF already registered', { status: 409 });
        }

        let fileUrl = '';
        if (file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Create uploads directory if it doesn't exist
            const uploadDir = join(process.cwd(), 'public', 'uploads');
            try {
                await mkdir(uploadDir, { recursive: true });
            } catch (e) {
                // Ignore if already exists
            }

            // Create a unique filename
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
            const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
            const filename = `${uniqueSuffix}-${originalName}`;
            const filepath = join(uploadDir, filename);

            await writeFile(filepath, buffer);
            fileUrl = `/uploads/${filename}`;
        }

        const registration = await prisma.registration.create({
            data: {
                name, email, cpf, phone, city,
                school, jobTitle, teachingTime,
                educationLevel, trainingArea,
                quotaType,
                fileUrl
            }
        });

        return NextResponse.json(registration);

    } catch (error) {
        console.error('Registration Error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
