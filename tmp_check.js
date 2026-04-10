const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const regCount = await prisma.registration.count();
    const userWithData = await prisma.user.count({
        where: {
            OR: [
                { cpf: { not: null } },
                { school: { not: null } }
            ]
        }
    });
    console.log(`Registrations: ${regCount}`);
    console.log(`Users with registration data: ${userWithData}`);
    process.exit(0);
}
main();
