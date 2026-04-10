'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, User as UserIcon } from 'lucide-react';

export default function ProfilePage() {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition">
                    <ChevronLeft size={24} className="text-gray-600" />
                </Link>
                <h1 className="text-3xl font-bold font-sans text-brand-secondary">Meu Perfil</h1>
            </div>

            <div className="bg-gradient-to-r from-brand-secondary to-brand-primary p-8 rounded-3xl text-white shadow-xl mb-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-white overflow-hidden border-4 border-brand-accent flex items-center justify-center flex-shrink-0 text-brand-primary">
                        {session?.user?.image ? (
                            <img src={session.user.image} alt="Avatar do usuário" className="w-full h-full object-cover" />
                        ) : (
                            <UserIcon size={40} />
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Olá, {session?.user?.name || 'Viajante'}!</h2>
                        <p className="opacity-90 max-w-xl">Bem-vindo ao seu perfil. Aqui você pode acompanhar sua jornada pelo cerrado e pelos saberes tradicionais.</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Informações da Conta</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Nome</label>
                        <p className="font-semibold text-gray-800">{session?.user?.name || 'Não informado'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500">E-mail</label>
                        <p className="font-semibold text-gray-800">{session?.user?.email || 'Não informado'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
