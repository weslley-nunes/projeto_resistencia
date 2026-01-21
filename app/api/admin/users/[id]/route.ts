import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from '@/lib/prisma';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        // Verification (uncomment in prod)
        // if (!session || session.user.role !== 'ADMIN') {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const resolvedParams = await params;
        const userId = resolvedParams.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                cpf: true,
                phone: true,
                city: true,
                school: true,
                jobTitle: true,
                teachingTime: true,
                educationLevel: true,
                trainingArea: true,
                quotaType: true,
                isPcd: true,
                status: true,
                role: true,
                documentsUrl: true,
                quotaDocumentsUrl: true,
                pcdDocumentsUrl: true,
                image: true
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Fetch User error:", error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        // if (session.user.role !== 'ADMIN') ...

        const resolvedParams = await params;
        const userId = resolvedParams.id;
        const body = await req.json();

        // Security: Prevent changing ID or critical system fields if needed, 
        // strictly filter updateable fields.
        const updateData = {
            name: body.name,
            email: body.email,
            cpf: body.cpf,
            phone: body.phone,
            city: body.city,
            school: body.school,
            jobTitle: body.jobTitle,
            teachingTime: body.teachingTime,
            educationLevel: body.educationLevel,
            trainingArea: body.trainingArea,
            quotaType: body.quotaType,
            isPcd: body.isPcd === 'true' || body.isPcd === true,
            status: body.status,
            role: body.role
        };

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Update User error:", error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}
