import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const registrations = await prisma.registration.findMany({
            orderBy: { createdAt: 'desc' }
        });

        // Generate CSV
        const header = ['ID', 'Nome', 'Email', 'CPF', 'Telefone', 'Cidade', 'Escola', 'Cargo', 'Tempo Docencia', 'Escolaridade', 'Area', 'Data Inscrição'];
        const rows = registrations.map(r => [
            r.id,
            `"${r.name}"`, // Quote strings to handle commas
            r.email,
            r.cpf,
            r.phone,
            r.city,
            `"${r.school}"`,
            `"${r.jobTitle}"`,
            r.teachingTime,
            r.educationLevel,
            `"${r.trainingArea}"`,
            r.createdAt.toISOString()
        ]);

        const csvContent = [
            header.join(','),
            ...rows.map(r => r.join(','))
        ].join('\n');

        return new NextResponse(csvContent, {
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename="inscricoes_resistencia.csv"'
            }
        });

    } catch (error) {
        console.error('Export Error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
