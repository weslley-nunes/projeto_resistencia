'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, LogOut, Shield, Search, FileText, CheckCircle, XCircle, Download, ExternalLink, Video } from 'lucide-react';
import Link from 'next/link';

interface Submission {
    id: string;
    userId: string;
    classId: string;
    content: string | null;
    files: string;
    isPublic: boolean;
    createdAt: string;
    user: {
        name: string | null;
        email: string | null;
        city: string | null;
    };
}

const ALL_CLASSES = [
    { id: "m1-0", theme: "Aula Inaugural" },
    { id: "m1-1", theme: "Direito à memória" },
    { id: "m1-2", theme: "Memória e Paisagem" },
    { id: "m1-3", theme: "Educação patrimonial..." },
    { id: "m1-4", theme: "Participação da comunidade..." },
    { id: "m1-5", theme: "Diversidade e Patrimônio (Saberes)" },
    { id: "m1-6", theme: "Diversidade e Patrimônio (Lugares)" },
    { id: "m1-7", theme: "Oficinas práticas" },
    { id: "m1-8", theme: "Contação de histórias" },
    { id: "m1-9", theme: "Roteiros culturais" },
    { id: "m2-0", theme: "Arte-educação" },
    { id: "m2-1", theme: "Educação Museal" },
    { id: "m2-2", theme: "Inventários participativos" },
    { id: "m2-3", theme: "Tecnologias" },
    { id: "m2-4", theme: "Turismo" },
    { id: "m2-5", theme: "Curadoria" },
    { id: "m2-6", theme: "Festival" },
    { id: "m2-7", theme: "Material didático" },
];

export default function AdminActivitiesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClassId, setSelectedClassId] = useState<string>('');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        } else if (status === 'authenticated') {
            // @ts-ignore
            if (session.user?.role !== 'ADMIN') {
                router.push('/dashboard');
            } else {
                fetchSubmissions();
            }
        }
    }, [status, session]);

    const fetchSubmissions = async () => {
        try {
            const res = await fetch('/api/admin/activities');
            if (res.ok) {
                const data = await res.json();
                setSubmissions(data);
            }
        } catch (error) {
            console.error('Failed to fetch submissions', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredSubmissions = submissions.filter(sub => {
        const matchesSearch = 
            sub.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            sub.user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesClass = selectedClassId ? sub.classId === selectedClassId : true;

        return matchesSearch && matchesClass;
    });

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Carregando atividades...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                
                <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <Link href="/admin" className="flex items-center gap-2 text-gray-500 hover:text-brand-primary transition font-medium">
                        <ArrowLeft size={20} /> Voltar ao Painel
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-brand-secondary">ADMIN: {session?.user?.name}</span>
                        <button onClick={() => signOut({ callbackUrl: '/' })} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"><LogOut size={20} /></button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-secondary flex items-center gap-3">
                            <FileText className="text-brand-primary" size={32} />
                            Controle de Atividades Práticas
                        </h1>
                        <p className="text-gray-500">Visualize e baixe as atividades enviadas pelos cursistas.</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm grid md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Buscar por nome ou email..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary/50 outline-none"
                        />
                    </div>
                    <select 
                        value={selectedClassId}
                        onChange={(e) => setSelectedClassId(e.target.value)}
                        className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary/50 outline-none appearance-none bg-white"
                    >
                        <option value="">Todas as Aulas</option>
                        {ALL_CLASSES.map(cls => (
                            <option key={cls.id} value={cls.id}>{cls.theme}</option>
                        ))}
                    </select>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-sm font-medium">
                                <tr>
                                    <th className="px-6 py-4">Usuário</th>
                                    <th className="px-6 py-4">Aula</th>
                                    <th className="px-6 py-4">Conteúdo / Arquivos</th>
                                    <th className="px-6 py-4 text-center">Privacidade</th>
                                    <th className="px-6 py-4">Data de Envio</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredSubmissions.map((sub) => {
                                    const files = JSON.parse(sub.files || '[]');
                                    const classInfo = ALL_CLASSES.find(c => c.id === sub.classId);
                                    
                                    return (
                                        <tr key={sub.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-gray-800">{sub.user.name}</p>
                                                <p className="text-xs text-gray-500">{sub.user.email}</p>
                                                <p className="text-[10px] text-gray-400">{sub.user.city}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-brand-secondary">
                                                {classInfo?.theme || sub.classId}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="max-w-xs space-y-2">
                                                    {sub.content && (
                                                        <p className="text-xs text-gray-600 line-clamp-2 italic">"{sub.content}"</p>
                                                    )}
                                                    <div className="flex flex-wrap gap-1">
                                                        {files.map((file: any, i: number) => (
                                                            <a 
                                                                key={i} 
                                                                href={file.url} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold px-2 py-1 rounded-full hover:bg-brand-primary/20 transition"
                                                            >
                                                                {file.type.startsWith('video') ? <Video size={10} /> : <FileText size={10} />}
                                                                Ver Anexo
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {sub.isPublic ? (
                                                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-bold">PÚBLICO</span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-[10px] font-bold">PRIVADO</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(sub.createdAt).toLocaleDateString('pt-BR')}
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filteredSubmissions.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400">Nenhuma atividade encontrada.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
