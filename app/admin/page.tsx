'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Download, CheckCircle, XCircle, Search, Shield } from 'lucide-react';

interface User {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
    status: string;
    school: string | null;
    city: string | null;
    image: string | null;
}

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleExport = () => {
        window.location.href = '/api/admin/export';
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-brand-secondary">Carregando painel...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

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
                        <button
                            onClick={handleExport}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-green-600/20 transition"
                        >
                            <Download size={20} />
                            Baixar Excel
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Total de Inscritos</p>
                        <p className="text-4xl font-bold text-brand-secondary">{users.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Aguardando Aprovação</p>
                        <p className="text-4xl font-bold text-yellow-500">{users.filter(u => u.status === 'PENDING' || u.status === 'PENDING_APPROVAL').length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Ativos (Alunos)</p>
                        <p className="text-4xl font-bold text-green-500">{users.filter(u => u.status === 'APPROVED').length}</p>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-800">Cursistas Cadastrados</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar por nome, email ou cidade..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 w-full md:w-80"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-sm font-medium">
                                <tr>
                                    <th className="px-6 py-4">Nome / Email</th>
                                    <th className="px-6 py-4">Cidade / Escola</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary font-bold overflow-hidden">
                                                    {user.image ? <img src={user.image} alt={user.name || ''} className="w-full h-full" /> : (user.name?.[0] || 'U')}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-800">{user.city || '-'}</p>
                                            <p className="text-xs text-gray-500">{user.school || '-'}</p>
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
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                            Nenhum usuário encontrado.
                                        </td>
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
