const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    console.log("Iniciando importação do banco de dados legado...");
    
    const seedPath = path.join(process.cwd(), 'public', 'seed.json');
    if (!fs.existsSync(seedPath)) {
        console.log("seed.json não encontrado. Pulando importação.");
        return;
    }

    const rawData = fs.readFileSync(seedPath, 'utf8');
    const data = JSON.parse(rawData);

    if (data.users && data.users.length > 0) {
        let count = 0;
        for (const user of data.users) {
            const exists = await prisma.user.findUnique({ where: { id: user.id } });
            if (!exists) {
                await prisma.user.create({ data: user });
                count++;
            }
        }
        console.log(`[Import] ${count} usuários migrados com sucesso.`);
    }

    if (data.registrations && data.registrations.length > 0) {
        let count = 0;
        for (const reg of data.registrations) {
            const exists = await prisma.registration.findUnique({ where: { id: reg.id } });
            if (!exists) {
                await prisma.registration.create({ data: reg });
                count++;
            }
        }
        console.log(`[Import] ${count} inscrições migradas com sucesso.`);
    }

    if (data.quizresults && data.quizresults.length > 0) {
        let count = 0;
        for (const qr of data.quizresults) {
            const exists = await prisma.quizResult.findUnique({ where: { id: qr.id } });
            if (!exists) {
                await prisma.quizResult.create({ data: qr });
                count++;
            }
        }
        console.log(`[Import] ${count} resultados de quiz migrados com sucesso.`);
    }
    

}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
