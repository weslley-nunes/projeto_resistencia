import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();

        // Server-side validation could go here, but relying on client-side Zod for speed now

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                cpf: data.cpf,
                phone: data.phone,
                city: data.city,
                school: data.school,
                jobTitle: data.jobTitle,
                teachingTime: data.teachingTime,
                educationLevel: data.educationLevel,
                trainingArea: data.trainingArea,
                status: "PENDING_APPROVAL" // Mark as pending admin approval
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
