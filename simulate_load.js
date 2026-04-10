const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function simulateLoad() {
    const iterations = 50;
    const promises = [];

    console.log(`Starting ${iterations} concurrent DB operations (Direct DB Stress Test)...`);

    for (let i = 0; i < iterations; i++) {
        promises.push((async () => {
            const email = `direct_stress_${Date.now()}_${i}@test.com`;
            const cpf = `111222333${i.toString().padStart(3, '0')}`;

            try {
                // Simulate checking for duplicates (read)
                const existing = await prisma.registration.findFirst({
                    where: { OR: [{ email }, { cpf }] }
                });

                if (existing) return { status: 'duplicate', i };

                // Simulate write
                await prisma.registration.create({
                    data: {
                        name: `Stress Test ${i}`,
                        email,
                        cpf,
                        phone: '123456789',
                        city: 'Test City',
                        school: 'Test School',
                        jobTitle: 'Teacher',
                        teachingTime: 'Full-time',
                        educationLevel: 'Degree',
                        trainingArea: 'Math',
                        quotaType: 'None',
                        status: 'PENDING'
                    }
                });
                return { status: 'success', i };
            } catch (error) {
                return { status: 'error', i, error: error.message };
            }
        })());
    }

    const results = await Promise.all(promises);

    const success = results.filter(r => r.status === 'success').length;
    const errors = results.filter(r => r.status === 'error');

    console.log(`Completed. Success: ${success}/${iterations}`);
    if (errors.length > 0) {
        console.log('Errors encountered (Expected if hitting DB directly without retry):');
        const errorCounts = {};
        errors.forEach(e => {
            const msg = e.error;
            const key = msg.includes('locked') ? 'Database Locked' : msg;
            errorCounts[key] = (errorCounts[key] || 0) + 1;
        });
        console.log(errorCounts);
    }
}

simulateLoad()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
