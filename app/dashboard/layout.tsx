import Sidebar from "@/components/gamification/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Clock } from "lucide-react";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/');
    }

    // @ts-ignore
    const status = session.user?.status;

    // BLOCKING PENDING USERS
    if (status === 'PENDING' || status === 'PENDING_APPROVAL') {
        return (
            <div className="min-h-screen bg-brand-secondary text-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mb-8 animate-pulse text-brand-primary">
                    <Clock size={48} />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Inscrição em Análise</h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
                    Olá, <strong>{session.user?.name}</strong>! 🎉<br /><br />
                    Sua inscrição foi recebida com sucesso. Como este é um processo seletivo para as vagas de <strong>Arraias e região</strong>, precisamos validar seus dados antes de liberar o acesso à plataforma.
                    <br /><br />
                    <span className="text-brand-accent font-bold">Boa sorte! Estamos torcendo por você.</span>
                </p>

                <div className="flex gap-4">
                    <SignOutButton />
                </div>
                <p className="mt-12 text-sm text-gray-500">Dúvidas? Entre em contato com a coordenação.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
