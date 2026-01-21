import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name, email, cpf, phone, city,
            school, jobTitle, teachingTime,
            educationLevel, trainingArea
        } = body;

        // Basic validation
        if (!name || !email || !cpf || !phone) {
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

        const registration = await prisma.registration.create({
            data: {
                name, email, cpf, phone, city,
                school, jobTitle, teachingTime,
                educationLevel, trainingArea
            }
        });

        return NextResponse.json(registration);

    } catch (error) {
        console.error('Registration Error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
