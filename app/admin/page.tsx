'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Download, CheckCircle, XCircle, Search, Shield, LogOut, ArrowLeft, FileText, Trash2, Filter, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface User {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
    status: string;
    school: string | null;
    city: string | null;
    image: string | null;
    documentsUrl: string | null;
    quotaDocumentsUrl: string | null;
    pcdDocumentsUrl: string | null;
    quotaType: string | null;
    isPcd: boolean;
    quizResults?: {
        moduleId: string;
        score: number;
        passed: boolean;
    }[];
}

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Filters
    const [cityFilter, setCityFilter] = useState('');
    const [schoolFilter, setSchoolFilter] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        } else if (status === 'authenticated') {
            // @ts-ignore
            if (session.user?.role !== 'ADMIN') {
                router.push('/dashboard');
            } else {
                fetchUsers();
            }
        }
    }, [status, session, router]);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (userId: string) => {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, status: 'APPROVED', role: 'STUDENT' }),
            });

            if (res.ok) {
                // Optimistic update
                setUsers(users.map(u => u.id === userId ? { ...u, status: 'APPROVED', role: 'STUDENT' } : u));
            }
        } catch (error) {
            console.error('Failed to approve user', error);
        }
    };

    const handlePromote = async (userId: string) => {
        if (!confirm('Tem certeza que deseja promover este usuário a ADMINISTRADOR?')) return;

        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, role: 'ADMIN' }),
            });

            if (res.ok) {
                setUsers(users.map(u => u.id === userId ? { ...u, role: 'ADMIN' } : u));
            }
        } catch (error) {
            console.error('Failed to promote user', error);
        }
    };

    const handleDelete = async (userId: string) => {
        if (!confirm('ATENÇÃO: Deseja realmente excluir este usuário? Esta ação não pode ser desfeita.')) return;

        try {
            const res = await fetch('/api/admin/users', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });

            if (res.ok) {
                setUsers(users.filter(u => u.id !== userId));
            } else {
                alert('Erro ao excluir usuário');
            }
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    };

    const handleExport = () => {
        window.location.href = '/api/admin/export';
    };

    // Filter Logic
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCity = cityFilter ? user.city === cityFilter : true;

        const matchesSchool = schoolFilter ? user.school?.toLowerCase().includes(schoolFilter.toLowerCase()) : true;

        return matchesSearch && matchesCity && matchesSchool;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, cityFilter, schoolFilter, itemsPerPage]);

    // Unique Cities for Dropdown
    const cities = Array.from(new Set(users.map(u => u.city).filter(Boolean)));

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-brand-secondary">Carregando painel...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Navigation Bar */}
                <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-gray-500 hover:text-brand-primary transition font-medium"
                    >
                        <ArrowLeft size={20} />
                        Voltar ao Dashboard
                    </Link>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition"
                    >
                        <LogOut size={20} />
                        Sair
                    </button>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-secondary flex items-center gap-3">
                            <Shield className="text-brand-primary" size={32} />
                            Painel de Gestão
                        </h1>
                        <p className="text-gray-500">Gerencie inscrições e acompanhe o progresso dos cursistas.</p>
                    </div>
                    <div className="flex gap-4">
                        <a
                            href="/api/admin/backup"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-purple-600/20 transition"
                        >
                            <Download size={20} />
                            Backup (.db)
                        </a>
                        <button
                            onClick={handleExport}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-green-600/20 transition"
                        >
                            <Download size={20} />
                            Inscrições (CSV)
                        </button>
                        <Link
                            href="/admin/activities"
                            className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-brand-primary/20 transition"
                        >
                            <FileText size={20} />
                            Ver Atividades
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Inscritos</p>
                        <p className="text-3xl font-bold text-brand-secondary">{users.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Pendentes</p>
                        <p className="text-3xl font-bold text-yellow-500">{users.filter(u => u.status === 'PENDING' || u.status === 'PENDING_APPROVAL').length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Alunos Ativos</p>
                        <p className="text-3xl font-bold text-green-500">{users.filter(u => u.status === 'APPROVED').length}</p>
                    </div>
                    <Link href="/admin/activities" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-brand-primary/50 transition block">
                        <p className="text-sm text-gray-500 mb-1">Ver Atividades</p>
                        <p className="text-3xl font-bold text-blue-500 flex items-center gap-1">
                            Acessar <ExternalLink size={20} />
                        </p>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 md:space-y-0 md:flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Nome ou Email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-64">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Cidade</label>
                        <select
                            value={cityFilter}
                            onChange={(e) => setCityFilter(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 appearance-none bg-white"
                        >
                            <option value="">Todas as Cidades</option>
                            {cities.map(city => (
                                <option key={city as string} value={city as string}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full md:w-64">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Escola</label>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Nome da Escola..."
                                value={schoolFilter}
                                onChange={(e) => setSchoolFilter(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                            />
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-sm font-medium">
                                <tr>
                                    <th className="px-6 py-4">Nome / Email</th>
                                    <th className="px-6 py-4">Cidade / Escola</th>
                                    <th className="px-6 py-4">Progresso / Provas</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary font-bold overflow-hidden">
                                                    {user.image ? <img src={user.image} alt={user.name || ''} className="w-full h-full" /> : (user.name?.[0] || 'U')}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                    {user.isPcd && <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-full mt-1">PcD</span>}
                                                    {user.quotaType && <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full mt-1 ml-1">{user.quotaType}</span>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-800">{user.city || '-'}</p>
                                            <p className="text-xs text-gray-500">{user.school || '-'}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs text-gray-500">Módulo 1:</span>
                                                {/* @ts-ignore */}
                                                {user.quizResults?.find(q => q.moduleId === 'modulo1') ? (
                                                    // @ts-ignore
                                                    <span className={`text-xs font-bold ${user.quizResults.find(q => q.moduleId === 'modulo1').passed ? 'text-green-600' : 'text-red-500'}`}>
                                                        {/* @ts-ignore */}
                                                        {user.quizResults.find(q => q.moduleId === 'modulo1').score}% (Prova)
                                                    </span>
                                                ) : <span className="text-xs text-gray-400">Não realizado</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                                user.status === 'PENDING_APPROVAL' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                {user.status === 'PENDING_APPROVAL' ? 'PENDENTE' : user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {user.role}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {(user.status === 'PENDING' || user.status === 'PENDING_APPROVAL') && (
                                                    <button
                                                        onClick={() => handleApprove(user.id)}
                                                        className="inline-flex items-center gap-1 bg-brand-primary text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-brand-primary/90 transition shadow-sm"
                                                        title="Aprovar Aluno"
                                                    >
                                                        <CheckCircle size={14} />
                                                        Aprovar
                                                    </button>
                                                )}

                                                <Link
                                                    href={`/admin/users/${user.id}`}
                                                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-200 transition shadow-sm"
                                                    title="Editar/Ver Detalhes"
                                                >
                                                    <FileText size={14} />
                                                </Link>

                                                {/* Delete Button */}
                                                {user.role !== 'ADMIN' && (
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-red-200 transition shadow-sm"
                                                        title="Excluir Usuário"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}

                                                {/* Promote to Admin Button */}
                                                {user.role !== 'ADMIN' && (
                                                    <button
                                                        onClick={() => handlePromote(user.id)}
                                                        className="inline-flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-gray-300 transition shadow-sm"
                                                        title="Tornar Admin"
                                                    >
                                                        <Shield size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                            Nenhum usuário encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 gap-4">
                    <div className="text-sm text-gray-500">
                        Mostrando <span className="font-bold text-gray-800">{Math.min(startIndex + 1, filteredUsers.length)}</span> até <span className="font-bold text-gray-800">{Math.min(endIndex, filteredUsers.length)}</span> de <span className="font-bold text-gray-800">{filteredUsers.length}</span> resultados
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Itens por página:</span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-brand-primary focus:border-brand-primary block p-2"
                            >
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
                            >
                                <ChevronLeft size={16} />
                                Anterior
                            </button>
                            <span className="text-sm font-medium text-gray-700 px-2">
                                Página {currentPage} de {totalPages || 1}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
                            >
                                Próxima
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
