const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        console.log('Fetching registrations...');
        const registrations = await prisma.registration.findMany({
            orderBy: { createdAt: 'desc' }
        });

        console.log(`Found ${registrations.length} registrations.`);

        if (registrations.length === 0) {
            console.log('No registrations found.');
            return;
        }

        // CSV Header (UTF-8 with BOM for Excel compatibility)
        const header = ['ID', 'Nome', 'Email', 'CPF', 'Telefone', 'Cidade', 'Escola', 'Cargo', 'Tempo Docencia', 'Escolaridade', 'Area', 'Cota', 'Status', 'Data Inscricao'];
        
        // CSV Rows
        const rows = registrations.map(r => [
            r.id,
            `"${(r.name || '').replace(/"/g, '""')}"`,
            r.email,
            r.cpf,
            r.phone,
            `"${(r.city || '').replace(/"/g, '""')}"`,
            `"${(r.school || '').replace(/"/g, '""')}"`,
            `"${(r.jobTitle || '').replace(/"/g, '""')}"`,
            `"${(r.teachingTime || '').replace(/"/g, '""')}"`,
            `"${(r.educationLevel || '').replace(/"/g, '""')}"`,
            `"${(r.trainingArea || '').replace(/"/g, '""')}"`,
            `"${(r.quotaType || 'AMPLA').replace(/"/g, '""')}"`,
            r.status,
            r.createdAt.toISOString()
        ]);

        const csvContent = [
            header.join(','),
            ...rows.map(r => r.join(','))
        ].join('\n');

        const outputPath = path.join(process.cwd(), 'inscritos.csv');
        // Add UTF-8 BOM
        fs.writeFileSync(outputPath, '\ufeff' + csvContent, 'utf8');

        console.log(`CSV Export successful! File saved to: ${outputPath}`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
