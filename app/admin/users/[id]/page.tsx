'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { ArrowLeft, Save, Mail, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function UserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const resolvedParams = use(params);
    const userId = resolvedParams.id;

    // Use a record or specific type for user data
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        } else if (status === 'authenticated') {
            fetchUser();
        }
    }, [status, userId]);

    const fetchUser = async () => {
        try {
            const res = await fetch(`/api/admin/users/${userId}`);
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setMessage({ type: 'error', text: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.error('Failed to users', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Dados atualizados com sucesso!' });
                window.scrollTo(0, 0);
            } else {
                setMessage({ type: 'error', text: 'Erro ao salvar dados.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Erro de conexão.' });
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (field: string, value: any) => {
        setUser({ ...user, [field]: value });
    };

    if (loading) return <div className="p-12 text-center text-gray-500">Carregando dados...</div>;
    if (!user) return <div className="p-12 text-center text-red-500">Usuário não encontrado.</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header & Nav */}
                <div className="flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-2 text-gray-500 hover:text-brand-primary transition">
                        <ArrowLeft size={20} />
                        Voltar para o Painel
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Detalhes da Inscrição</h1>
                </div>

                {message && (
                    <div className={`p-4 rounded-xl flex items-center gap-2 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        {message.text}
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary text-xl font-bold overflow-hidden">
                                {user.image ? <img src={user.image} alt="" className="w-full h-full object-cover" /> : user.name?.[0]}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                                <p className="text-gray-500 text-sm">ID: {user.id}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <a
                                href={`mailto:${user.email}?subject=Contato - Projeto Resistência`}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium"
                            >
                                <Mail size={18} />
                                Enviar E-mail
                            </a>
                        </div>
                    </div>

                    <form onSubmit={handleSave} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Personal Info */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider">Dados Pessoais</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                                    <input
                                        type="text"
                                        value={user.name || ''}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                                    <input
                                        type="email"
                                        value={user.email || ''}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                                    <input
                                        type="text"
                                        value={user.cpf || ''}
                                        onChange={(e) => handleChange('cpf', e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                                    <input
                                        type="text"
                                        value={user.phone || ''}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                                    <input
                                        type="text"
                                        value={user.city || ''}
                                        onChange={(e) => handleChange('city', e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Professional Info */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider">Dados Profissionais</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Escola / Instituição</label>
                                    <input
                                        type="text"
                                        value={user.school || ''}
                                        onChange={(e) => handleChange('school', e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cargo / Função</label>
                                    <input
                                        type="text"
                                        value={user.jobTitle || ''}
                                        onChange={(e) => handleChange('jobTitle', e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tempo de Docência</label>
                                    <select
                                        value={user.teachingTime || ''}
                                        onChange={(e) => handleChange('teachingTime', e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 outline-none"
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="0-5">0 a 5 anos</option>
                                        <option value="6-10">6 a 10 anos</option>
                                        <option value="11-15">11 a 15 anos</option>
                                        <option value="16-20">16 a 20 anos</option>
                                        <option value="20+">Mais de 20 anos</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nível de Escolaridade</label>
                                    <select
                                        value={user.educationLevel || ''}
                                        onChange={(e) => handleChange('educationLevel', e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 outline-none"
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="superior_incompleto">Ensino Superior Incompleto</option>
                                        <option value="superior_completo">Ensino Superior Completo</option>
                                        <option value="pos_graduacao">Pós-Graduação</option>
                                        <option value="mestrado">Mestrado</option>
                                        <option value="doutorado">Doutorado</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100 my-6"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* System Status */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider">Status e Permissões</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status da Inscrição</label>
                                    <select
                                        value={user.status || ''}
                                        onChange={(e) => handleChange('status', e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 outline-none font-bold text-gray-700"
                                    >
                                        <option value="PENDING">Pendente (Cadastro Simples)</option>
                                        <option value="PENDING_APPROVAL">Aguardando Aprovação (Inscrito)</option>
                                        <option value="APPROVED">Aprovado (Aluno Ativo)</option>
                                        <option value="REJECTED">Rejeitado</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nível de Acesso (Role)</label>
                                    <select
                                        value={user.role || ''}
                                        onChange={(e) => handleChange('role', e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 outline-none"
                                    >
                                        <option value="USER">Usuário Comum</option>
                                        <option value="STUDENT">Estudante</option>
                                        <option value="ADMIN">Administrador</option>
                                    </select>
                                </div>
                            </div>

                            {/* Documents */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider">Documentos Enviados</h3>
                                <div className="space-y-2">
                                    {user.documentsUrl ? (
                                        <a href={user.documentsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-gray-700">
                                            <FileText className="text-brand-primary" size={20} />
                                            <span className="text-sm">Documentos Pessoais</span>
                                        </a>
                                    ) : (
                                        <p className="text-sm text-gray-400 italic">Nenhum documento pessoal enviado.</p>
                                    )}

                                    {user.quotaDocumentsUrl && (
                                        <a href={user.quotaDocumentsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-blue-700">
                                            <FileText size={20} />
                                            <span className="text-sm">Declaração de Cotas ({user.quotaType})</span>
                                        </a>
                                    )}

                                    {user.pcdDocumentsUrl && (
                                        <a href={user.pcdDocumentsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition text-purple-700">
                                            <FileText size={20} />
                                            <span className="text-sm">Laudo PcD</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-8 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary/90 transition shadow-lg shadow-brand-primary/20 disabled:opacity-50"
                            >
                                {saving ? 'Salvando...' : (
                                    <>
                                        <Save size={20} />
                                        Salvar Alterações
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
