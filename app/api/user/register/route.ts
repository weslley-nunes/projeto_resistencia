import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import nodemailer from 'nodemailer';

// Helper to send email
async function sendConfirmationEmail(userEmail: string, userName: string, protocol: string) {
    if (!process.env.EMAIL_SERVER_HOST) {
        console.warn("⚠️ EMAIL_SERVER_HOST not configured. Skipping confirmation email.");
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT) || 587,
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"Projeto Resistência" <noreply@projetoresistencia.com.br>',
            to: userEmail,
            subject: 'Inscrição Recebida - Projeto Resistência',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                    <h2 style="color: #d97706;">Sua inscrição foi recebida! 🎉</h2>
                    <p>Olá <strong>${userName}</strong>,</p>
                    <p>Confirmamos o recebimento dos seus dados e documentos para o <strong>Projeto Resistência</strong>.</p>
                    <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0; font-weight: bold;">Status Atual:</p>
                        <p style="margin: 5px 0 0 0;">Aguardando Análise da Coordenação</p>
                    </div>
                    <p>Nossa equipe irá verificar seus documentos e em breve você receberá um retorno sobre a aprovação da sua matrícula.</p>
                    <p>Você pode acompanhar o status da sua inscrição acessando o <a href="https://projetoresistencia.com.br/dashboard" style="color: #d97706; font-weight: bold;">seu painel</a>.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="font-size: 12px; color: #888;">Este é um e-mail automático. Por favor, não responda.</p>
                </div>
            `,
        });
        console.log(`📧 Confirmation email sent to ${userEmail}`);
    } catch (error) {
        console.error("❌ Failed to send confirmation email:", error);
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();

        // ... (Extraction of fields same as before)
        const cpf = formData.get('cpf') as string;
        const phone = formData.get('phone') as string;
        const city = formData.get('city') as string;
        const school = formData.get('school') as string;
        const jobTitle = formData.get('jobTitle') as string;
        const teachingTime = formData.get('teachingTime') as string;
        const educationLevel = formData.get('educationLevel') as string;
        const trainingArea = formData.get('trainingArea') as string;
        const quotaType = formData.get('quotaType') as string;
        const isPcd = formData.get('isPcd') === 'true';

        // Extract files
        const documentsFile = formData.get('documents') as File | null;
        const quotaFile = formData.get('quotaDocuments') as File | null;
        const pcdFile = formData.get('pcdDocuments') as File | null;

        // Prepare update data
        const updateData: any = {
            cpf,
            phone,
            city,
            school,
            jobTitle,
            teachingTime,
            educationLevel,
            trainingArea,
            quotaType,
            isPcd: Boolean(isPcd),
            status: "PENDING_APPROVAL"
        };

        // Helper to save file
        const saveFile = async (file: File, folder: string, prefix: string) => {
            if (!file) return null;

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Create directory if not exists
            const uploadDir = join(process.cwd(), 'public', 'uploads', folder);
            await mkdir(uploadDir, { recursive: true });

            const fileName = `${prefix}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
            const filePath = join(uploadDir, fileName);

            await writeFile(filePath, buffer);
            return `/uploads/${folder}/${fileName}`;
        };

        const userId = session.user.id;
        let targetUserId = userId;
        if (!targetUserId) {
            const user = await prisma.user.findUnique({ where: { email: session.user.email } });
            if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
            targetUserId = user.id;
        }

        if (documentsFile) {
            updateData.documentsUrl = await saveFile(documentsFile, targetUserId, 'docs');
        }
        if (quotaFile) {
            updateData.quotaDocumentsUrl = await saveFile(quotaFile, targetUserId, 'quota');
        }
        if (pcdFile) {
            updateData.pcdDocumentsUrl = await saveFile(pcdFile, targetUserId, 'pcd');
        }

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: updateData,
        });

        // Fire and forget email (don't block response)
        sendConfirmationEmail(session.user.email, updatedUser.name || 'Cursista', 'INSCRICAO');

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
