'use client';

import { useSession } from 'next-auth/react';
import { Download, ShieldAlert } from 'lucide-react';

export default function AdminPage() {
    const { data: session } = useSession();

    // In a real app, you would redirect if not admin
    // if (session?.user?.role !== 'ADMIN') return <AccessDenied />

    const handleDownload = () => {
        window.location.href = '/api/admin/export';
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
                        <p className="text-gray-500">Gestão de Inscrições do Projeto Resistência</p>
                    </div>
                    <div className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-bold flex items-center gap-2">
                        <ShieldAlert size={16} />
                        Área Restrita
                    </div>
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <h2 className="text-xl font-bold mb-6">Relatórios</h2>

                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-100">
                        <div>
                            <h3 className="font-bold text-gray-800">Lista Geral de Inscritos</h3>
                            <p className="text-sm text-gray-500">Baixar planilha completa com todos os dados (.xlsx)</p>
                        </div>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
                        >
                            <Download size={18} />
                            Baixar Excel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
