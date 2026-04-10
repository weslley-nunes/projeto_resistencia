import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

// Helper to execute Prisma operations with retry logic
async function executeWithRetry<T>(operation: () => Promise<T>, retries = 3, delay = 500): Promise<T> {
    for (let i = 0; i < retries; i++) {
        try {
            return await operation();
        } catch (error: any) {
            // Check for SQLite busy/locked errors or generic Prisma errors that might be transient
            if (
                error?.code === 'P2028' || // Transaction API error
                error?.message?.includes('database is locked') ||
                error?.message?.includes('SQLITE_BUSY')
            ) {
                if (i === retries - 1) throw error; // Rethrow if last attempt
                console.warn(`[Registration] Database locked, retrying (${i + 1}/${retries})...`);
                await new Promise(resolve => setTimeout(resolve, delay * (i + 1))); // Exponential backoff-ash
            } else {
                throw error; // Rethrow other errors immediately
            }
        }
    }
    throw new Error('Unreachable');
}

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

        console.log(`[Registration] Attempting to register ${email} (${cpf})`);

        // Check duplicates with retry
        const existing = await executeWithRetry(async () => {
            return prisma.registration.findFirst({
                where: {
                    OR: [
                        { email },
                        { cpf }
                    ]
                }
            });
        });

        if (existing) {
            console.log(`[Registration] Duplicate found for ${email} or ${cpf}`);
            return new NextResponse('Email or CPF already registered', { status: 409 });
        }

        let fileUrl = '';
        if (file) {
            try {
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
                console.log(`[Registration] File saved at ${filepath}`);
            } catch (fileError) {
                console.error('[Registration] File upload error:', fileError);
                return new NextResponse('Error saving file', { status: 500 });
            }
        }

        // Create registration with retry
        const registration = await executeWithRetry(async () => {
            return prisma.registration.create({
                data: {
                    name, email, cpf, phone, city,
                    school, jobTitle, teachingTime,
                    educationLevel, trainingArea,
                    quotaType,
                    fileUrl
                }
            });
        });

        console.log(`[Registration] Success for ${email}`);
        return NextResponse.json(registration);

    } catch (error: any) {
        console.error('[Registration] Critical Error:', error);

        // If it's still a locking error after retries, return 503
        if (error?.message?.includes('database is locked') || error?.message?.includes('SQLITE_BUSY')) {
            return new NextResponse('Service busy, please try again in a few moments.', { status: 503 });
        }

        return new NextResponse(JSON.stringify({ error: 'Internal Server Error', details: String(error) }), { status: 500 });
    }
}
