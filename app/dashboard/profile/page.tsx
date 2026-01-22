'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AvatarEditor from '@/components/AvatarEditor';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function ProfilePage() {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition">
                    <ChevronLeft size={24} className="text-gray-600" />
                </Link>
                <h1 className="text-3xl font-bold font-sans text-brand-secondary">Meu Perfil & Avatar</h1>
            </div>

            <div className="bg-gradient-to-r from-brand-secondary to-brand-primary p-8 rounded-3xl text-white shadow-xl mb-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Olá, {session?.user?.name || 'Viajante'}!</h2>
                        <p className="opacity-90 max-w-xl">Customize seu avatar para representar sua jornada pelo cerrado e pelos saberes tradicionais. Desbloqueie novos itens completando as trilhas de aprendizagem!</p>
                    </div>
                </div>
            </div>

            {/* Avatar Editor Component */}
            <AvatarEditor />
        </div>
    );
}
