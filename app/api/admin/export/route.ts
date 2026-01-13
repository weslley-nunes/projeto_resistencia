import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        // Simple authorization check - in real app check for session.user.role === 'ADMIN'
        // For now allowing any logged in user to test, or you can uncomment below:
        /*
        if (!session || session.user.role !== 'ADMIN') {
           return NextResponse.json({ error: 'Unauthorized: Admin only' }, { status: 403 });
        }
        */

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const users = await prisma.user.findMany({
            orderBy: { name: 'asc' },
            select: {
                name: true,
                email: true,
                cpf: true,
                phone: true,
                city: true,
                school: true,
                jobTitle: true,
                role: true,
                status: true,
                level: true,
                educoins: true,
            }
        });

        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Inscritos");

        const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        return new Response(buf, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="inscritos_resistencia.xlsx"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });

    } catch (error) {
        console.error("Export error:", error);
        return NextResponse.json({ error: 'Failed to export data' }, { status: 500 });
    }
}
