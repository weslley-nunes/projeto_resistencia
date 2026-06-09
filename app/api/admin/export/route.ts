import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

function escapeCSVValue(val: any): string {
    if (val === null || val === undefined) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const format = searchParams.get('format') || 'csv';

        // 1. Fetch all users from User table
        const users = await prisma.user.findMany({
            orderBy: { name: 'asc' }
        });

        // 2. Fetch all registrations from Registration table
        const registrations = await prisma.registration.findMany({
            orderBy: { createdAt: 'desc' }
        });

        // 3. Map registrations by email for easy lookup
        const registrationMap = new Map();
        for (const reg of registrations) {
            if (reg.email) {
                registrationMap.set(reg.email.toLowerCase().trim(), reg);
            }
        }

        const processedEmails = new Set<string>();
        const exportData: any[] = [];

        // 4. Process users
        for (const u of users) {
            if (!u.email) continue;
            const emailKey = u.email.toLowerCase().trim();
            processedEmails.add(emailKey);

            const reg = registrationMap.get(emailKey);

            // Determine PcD status
            let isPcdStr = 'Não';
            if (u.isPcd) {
                isPcdStr = 'Sim';
            } else if (reg && reg.quotaType === 'PCD') {
                isPcdStr = 'Sim';
            }

            // Determine Quota type
            let quota = 'AMPLA';
            if (u.quotaType) {
                quota = u.quotaType === 'INDIGENOUS' ? 'INDÍGENA' : (u.quotaType === 'QUILOMBOLA' ? 'QUILOMBOLA' : u.quotaType);
            } else if (reg) {
                quota = reg.quotaType === 'PCD' ? 'AMPLA' : (reg.quotaType || 'AMPLA');
            }

            const regDate = reg ? reg.createdAt.toISOString() : '';

            exportData.push({
                id: u.id,
                name: u.name || reg?.name || '',
                email: u.email,
                cpf: u.cpf || reg?.cpf || '',
                phone: u.phone || reg?.phone || '',
                city: u.city || reg?.city || '',
                school: u.school || reg?.school || '',
                jobTitle: u.jobTitle || reg?.jobTitle || '',
                teachingTime: u.teachingTime || reg?.teachingTime || '',
                educationLevel: u.educationLevel || reg?.educationLevel || '',
                trainingArea: u.trainingArea || reg?.trainingArea || '',
                quotaType: quota,
                isPcd: isPcdStr,
                status: u.status,
                role: u.role,
                createdAt: regDate,
            });
        }

        // 5. Process pending registrations (not yet users)
        for (const reg of registrations) {
            if (!reg.email) continue;
            const emailKey = reg.email.toLowerCase().trim();
            if (processedEmails.has(emailKey)) continue;
            processedEmails.add(emailKey);

            const isPcdStr = reg.quotaType === 'PCD' ? 'Sim' : 'Não';
            const quota = reg.quotaType === 'PCD' ? 'AMPLA' : (reg.quotaType || 'AMPLA');

            exportData.push({
                id: reg.id,
                name: reg.name,
                email: reg.email,
                cpf: reg.cpf,
                phone: reg.phone,
                city: reg.city,
                school: reg.school,
                jobTitle: reg.jobTitle,
                teachingTime: reg.teachingTime,
                educationLevel: reg.educationLevel,
                trainingArea: reg.trainingArea,
                quotaType: quota,
                isPcd: isPcdStr,
                status: 'PENDING',
                role: 'STUDENT',
                createdAt: reg.createdAt.toISOString(),
            });
        }

        // Sort by name alphabetically (case-insensitive, accommodating Portuguese accents)
        exportData.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

        if (format === 'xlsx') {
            // Generate Excel sheet
            const excelData = exportData.map(item => ({
                'ID': item.id,
                'Nome': item.name,
                'Email': item.email,
                'CPF': item.cpf,
                'Telefone': item.phone,
                'Cidade': item.city,
                'Escola': item.school,
                'Cargo': item.jobTitle,
                'Tempo Docencia': item.teachingTime,
                'Escolaridade': item.educationLevel,
                'Area': item.trainingArea,
                'Cota': item.quotaType,
                'PcD': item.isPcd,
                'Status': item.status,
                'Funcao': item.role,
                'Data Inscrição': item.createdAt ? new Date(item.createdAt).toLocaleString('pt-BR') : ''
            }));

            const worksheet = XLSX.utils.json_to_sheet(excelData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Inscrições');

            const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

            return new NextResponse(buf, {
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="inscricoes_resistencia.xlsx"'
                }
            });
        }

        // Default to CSV
        const header = [
            'ID', 'Nome', 'Email', 'CPF', 'Telefone', 'Cidade', 'Escola', 
            'Cargo', 'Tempo Docencia', 'Escolaridade', 'Area', 'Cota', 
            'PcD', 'Status', 'Funcao', 'Data Inscrição'
        ];

        const rows = exportData.map(item => [
            escapeCSVValue(item.id),
            escapeCSVValue(item.name),
            escapeCSVValue(item.email),
            escapeCSVValue(item.cpf),
            escapeCSVValue(item.phone),
            escapeCSVValue(item.city),
            escapeCSVValue(item.school),
            escapeCSVValue(item.jobTitle),
            escapeCSVValue(item.teachingTime),
            escapeCSVValue(item.educationLevel),
            escapeCSVValue(item.trainingArea),
            escapeCSVValue(item.quotaType),
            escapeCSVValue(item.isPcd),
            escapeCSVValue(item.status),
            escapeCSVValue(item.role),
            escapeCSVValue(item.createdAt)
        ]);

        const csvContent = '\uFEFF' + [
            header.join(','),
            ...rows.map(r => r.join(','))
        ].join('\n');

        return new NextResponse(csvContent, {
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': 'attachment; filename="inscricoes_resistencia.csv"'
            }
        });

    } catch (error) {
        console.error('Export Error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
