'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function CadastroPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.ok) {
                // Auto sign in after registration
                const login = await signIn('credentials', {
                    username: email,
                    password,
                    redirect: false,
                });

                if (login?.ok) {
                    router.push('/dashboard');
                } else {
                    router.push('/login?success=true');
                }

            } else {
                const msg = await res.text();
                setError(msg || 'Erro ao criar conta.');
            }
        } catch (err) {
            setError('Ocorreu um erro inesperado.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-secondary flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-brand-secondary mb-2">Criar Conta</h1>
                    <p className="text-gray-500">Junte-se ao Projeto Resistência</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                        <input
                            type="text"
                            placeholder="Seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Crie uma senha forte"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition"
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition shadow-lg shadow-brand-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Criar Conta'}
                    </button>

                    {error && (
                        <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">{error}</p>
                    )}
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Já tem uma conta?{' '}
                    <Link href="/login" className="text-brand-primary font-bold hover:underline">
                        Entrar
                    </Link>
                </div>
            </div>
        </div>
    );
}
