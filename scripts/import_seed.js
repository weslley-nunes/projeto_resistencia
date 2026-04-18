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
            // Cast SQLite booleans back to booleans
            if (typeof user.isPcd === 'number') {
                user.isPcd = user.isPcd === 1;
            }
            if (user.emailVerified) {
                user.emailVerified = new Date(user.emailVerified);
            }
            const existsById = await prisma.user.findUnique({ where: { id: user.id } });
            const existsByEmail = user.email ? await prisma.user.findUnique({ where: { email: user.email } }) : null;
            const existsByUsername = user.username ? await prisma.user.findUnique({ where: { username: user.username } }) : null;
            
            if (!existsById && !existsByEmail && !existsByUsername) {
                try {
                    await prisma.user.create({ data: user });
                    count++;
                } catch(e) {
                    console.log(`[Import] Skipping user ${user.id} due to error: ${e.message}`);
                }
            }
        }
        console.log(`[Import] ${count} usuários migrados com sucesso.`);
    }

    if (data.registrations && data.registrations.length > 0) {
        let count = 0;
        for (const reg of data.registrations) {
            if (reg.createdAt) {
                reg.createdAt = new Date(reg.createdAt);
            }
            const exists = await prisma.registration.findUnique({ where: { id: reg.id } });
            const existsEmail = reg.email ? await prisma.registration.findUnique({ where: { email: reg.email } }) : null;
            if (!exists && !existsEmail) {
                try {
                    await prisma.registration.create({ data: reg });
                    count++;
                } catch(e) {
                    console.log(`[Import] Skipping reg ${reg.id}`);
                }
            }
        }
        console.log(`[Import] ${count} inscrições migradas com sucesso.`);
    }

    if (data.quizresults && data.quizresults.length > 0) {
        let count = 0;
        for (const qr of data.quizresults) {
            if (typeof qr.passed === 'number') {
                qr.passed = qr.passed === 1;
            }
            if (qr.completedAt) {
                qr.completedAt = new Date(qr.completedAt);
            }
            const exists = await prisma.quizResult.findUnique({ where: { id: qr.id } });
            if (!exists) {
                try {
                    await prisma.quizResult.create({ data: qr });
                    count++;
                } catch(e) {}
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
