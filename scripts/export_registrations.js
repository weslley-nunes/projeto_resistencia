const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

async function main() {
    try {
        console.log('Fetching registrations...');
        const registrations = await prisma.registration.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        console.log(`Found ${registrations.length} registrations.`);

        if (registrations.length === 0) {
            console.log('No registrations found to export.');
            return;
        }

        // Map data to a format suitable for Excel (and translate headers)
        const data = registrations.map(reg => ({
            'ID': reg.id,
            'Nome': reg.name,
            'E-mail': reg.email,
            'CPF': reg.cpf,
            'Telefone': reg.phone,
            'Cidade': reg.city,
            'Escola': reg.school,
            'Cargo': reg.jobTitle,
            'Tempo de Docência': reg.teachingTime,
            'Nível de Formação': reg.educationLevel,
            'Área de Formação': reg.trainingArea,
            'Tipo de Cota': reg.quotaType || 'Ampla Concorrência',
            'Arquivo URL': reg.fileUrl ? `https://projetoresistencia.com.br${reg.fileUrl}` : 'N/A', // Assuming domain, adapt if needed or keep relative
            'Status': reg.status,
            'Data de Inscrição': reg.createdAt ? new Date(reg.createdAt).toLocaleString('pt-BR') : ''
        }));

        // Create a worksheet
        const ws = XLSX.utils.json_to_sheet(data);

        // Create a workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Inscrições');

        // Define output path
        const outputDir = path.join(process.cwd(), 'public');
        const outputPath = path.join(outputDir, 'inscricoes.xlsx');

        // Write to file
        XLSX.writeFile(wb, outputPath);

        console.log(`Export successful! File saved to: ${outputPath}`);
        console.log('You can download it at: /inscricoes.xlsx');

    } catch (error) {
        console.error('Error exporting registrations:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
