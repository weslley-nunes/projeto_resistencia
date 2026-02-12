const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const email = args[1];

    if (command === 'list') {
        const admins = await prisma.user.findMany({
            where: { role: 'ADMIN' },
            select: { email: true, name: true, role: true }
        });
        console.log('Current Admins:', admins);
    } else if (command === 'list-all') {
        const users = await prisma.user.findMany({
            take: 20,
            select: { email: true, name: true, role: true }
        });
        console.log('All Users (first 20):', users);
    } else if (command === 'promote' && email) {
        const user = await prisma.user.update({
            where: { email },
            data: { role: 'ADMIN' }
        });
        console.log(`Promoted ${email} to ADMIN`);
    } else if (command === 'chk_email' && email) {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { email: true, role: true }
        });
        console.log('User status:', user);
    } else {
        console.log('Usage: node scripts/manage_admin.js [list|promote <email>|chk_email <email>]');
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
