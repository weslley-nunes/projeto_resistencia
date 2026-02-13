import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    const session = await getServerSession(authOptions);

    // @ts-ignore
    if (!session || session.user?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // 1. Fetch existing users
        const users = await prisma.user.findMany({
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                school: true,
                city: true,
                jobTitle: true,
                image: true,
                quotaType: true,
                isPcd: true,
                documentsUrl: true
            }
        });

        // 2. Fetch registrations
        const registrations = await prisma.registration.findMany({
            orderBy: { createdAt: 'desc' }
        });

        // 3. Filter out registrations that are already users (by email)
        const userEmails = new Set(users.map(u => u.email));
        const pendingRegistrations = registrations.filter(r => !userEmails.has(r.email));

        // 4. Map registrations to User interface shape
        const mappedRegistrations = pendingRegistrations.map(reg => ({
            id: reg.id, // Keep original ID to identify later
            name: reg.name,
            email: reg.email,
            role: 'STUDENT', // Default role
            status: 'PENDING', // Default status for display
            school: reg.school,
            city: reg.city,
            jobTitle: reg.jobTitle,
            image: null,
            quotaType: reg.quotaType,
            isPcd: false, // Default
            documentsUrl: reg.fileUrl,
            _isRegistration: true // Internal flag if needed
        }));

        // 5. Merge and return
        return NextResponse.json([...users, ...mappedRegistrations]);

    } catch (error) {
        console.error('Failed to fetch users/registrations:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);

    // @ts-ignore
    if (!session || session.user?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { userId, status, role } = await request.json();

        // 1. Try to update existing User
        // We use updateMany keys to check existence efficiently, or just try update and catch
        // But since we need to maybe CREATE, let's check if it's a User first.
        const existingUser = await prisma.user.findUnique({ where: { id: userId } });

        if (existingUser) {
            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: {
                    ...(status && { status }),
                    ...(role && { role }),
                },
            });
            return NextResponse.json(updatedUser);
        }

        // 2. If not a User, checks if it is a Registration
        const registration = await prisma.registration.findUnique({ where: { id: userId } });

        if (registration) {
            // It's a registration being approved! Create the User.
            // Generate a default password ? or leave it null (they might need to reset or use magic link)
            // For now, we create them without password or a default one if required. 
            // Model says password String?, so null is fine. User can Request Reset.

            // Note: We're taking the ID from Registration... usually better to generate new CUID for User 
            // to avoid collisions if tables merge, but Prisma handles CUIDs well. 
            // Let's generate a NEW ID for the user to be clean.

            const newUser = await prisma.user.create({
                data: {
                    name: registration.name,
                    email: registration.email,
                    // cpf: registration.cpf, // Add to schema if needed, strictly
                    role: role || 'STUDENT',
                    status: status || 'APPROVED',
                    school: registration.school,
                    city: registration.city,
                    jobTitle: registration.jobTitle,
                    teachingTime: registration.teachingTime,
                    educationLevel: registration.educationLevel,
                    trainingArea: registration.trainingArea,
                    quotaType: registration.quotaType,
                    phone: registration.phone,
                    documentsUrl: registration.fileUrl
                }
            });

            // Update registration status to mark it processed (optional but good)
            await prisma.registration.update({
                where: { id: userId },
                data: { status: 'PROCESSED' }
            });

            return NextResponse.json(newUser);
        }

        return NextResponse.json({ error: 'User or Registration not found' }, { status: 404 });

    } catch (error) {
        console.error('Failed to update/create user:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);

    // @ts-ignore
    if (!session || session.user?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { userId } = await request.json();

        await prisma.user.delete({
            where: { id: userId },
        });

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}
