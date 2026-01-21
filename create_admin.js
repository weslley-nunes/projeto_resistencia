const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const username = 'admin';
    const passwordRaw = 'escort94';

    // Hash the password
    const hashedPassword = await bcrypt.hash(passwordRaw, 10);

    console.log(`Creating/Updating admin user: ${username}`);

    // Upsert user: create if not exists, update if exists
    const user = await prisma.user.upsert({
        where: { username: username },
        update: {
            password: hashedPassword,
            role: 'ADMIN' // Ensure they are admin
        },
        create: {
            username: username,
            password: hashedPassword,
            role: 'ADMIN',
            name: 'Administrador',
            // We will assume email is unique but optional, so let's provide a dummy one just in case unique constraint fails on nulls (some DBs do, though Prisma handles optional unique well usually)
            // Actually let's give it a dedicated email just to be safe and accessible if needed.
            email: 'admin@sistema.local'
        }
    });

    console.log('Admin user created/updated:', user);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
