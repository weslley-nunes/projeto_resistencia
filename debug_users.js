const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Replace with the email that is failing
    const emailToDelete = 'weslley.uca@gmail.com';

    const user = await prisma.user.findUnique({ where: { email: emailToDelete } });

    if (user) {
        console.log(`Deleting user: ${user.email} `);
        await prisma.user.delete({ where: { email: emailToDelete } });
        console.log('User deleted.');
    } else {
        console.log('User not found.');
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
