'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { Loader2, Save, CheckCircle } from 'lucide-react';

// Validation Schema
const schema = z.object({
    cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
    phone: z.string().min(10, "Telefone inválido"),
    city: z.string().min(1, "Selecione uma cidade"),
    school: z.string().min(3, "Nome da escola muito curto"),
    jobTitle: z.string().min(3, "Cargo/Função obrigatória"),
});

type FormData = z.infer<typeof schema>;

export default function RegistrationPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    // CPF Mask
    const handleCPF = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        setValue("cpf", value);
    };

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/user/register', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Falha ao salvar');

            // Success
            router.push('/dashboard?registered=true');
        } catch (error) {
            alert("Erro ao salvar inscrição. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === 'loading') return <div className="min-h-screen flex items-center justify-center text-white">Carregando...</div>;

    if (status === 'unauthenticated') {
        router.push('/');
        return null;
    }

    return (
        <div className="min-h-screen bg-brand-secondary text-white font-sans py-12 px-6">
            <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2">Finalize sua Inscrição</h1>
                    <p className="text-gray-400">Complete seus dados para acessar o ambiente.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Read-only Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Nome (Google)</label>
                            <div className="p-3 bg-black/20 rounded-xl border border-white/5 text-gray-300">
                                {session?.user?.name}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Email (Google)</label>
                            <div className="p-3 bg-black/20 rounded-xl border border-white/5 text-gray-300 truncate">
                                {session?.user?.email}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* CPF */}
                        <div>
                            <label className="block text-sm font-medium mb-2">CPF <span className="text-red-400">*</span></label>
                            <input
                                {...register("cpf")}
                                onChange={handleCPF}
                                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                                placeholder="000.000.000-00"
                            />
                            {errors.cpf && <p className="text-red-400 text-xs mt-1">{errors.cpf.message}</p>}
                        </div>

                        {/* WhatsApp */}
                        <div>
                            <label className="block text-sm font-medium mb-2">WhatsApp <span className="text-red-400">*</span></label>
                            <input
                                {...register("phone")}
                                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                                placeholder="(63) 99999-9999"
                            />
                            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Cidade de Atuação <span className="text-red-400">*</span></label>
                        <select
                            {...register("city")}
                            className="w-full bg-white/10 border border-white/20 rounded-xl p-3 focus:outline-none focus:border-brand-primary text-gray-300 [&>option]:text-black"
                        >
                            <option value="">Selecione...</option>
                            {['Arraias', 'Aurora', 'Lavandeira', 'Combinado', 'Novo Alegre', 'Paranã'].map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                        {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                    </div>

                    {/* School */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Unidade Escolar <span className="text-red-400">*</span></label>
                        <input
                            {...register("school")}
                            className="w-full bg-white/10 border border-white/20 rounded-xl p-3 focus:outline-none focus:border-brand-primary"
                            placeholder="Nome da Escola Estadual"
                        />
                        {errors.school && <p className="text-red-400 text-xs mt-1">{errors.school.message}</p>}
                    </div>

                    {/* Job Title */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Função / Cargo <span className="text-red-400">*</span></label>
                        <input
                            {...register("jobTitle")}
                            className="w-full bg-white/10 border border-white/20 rounded-xl p-3 focus:outline-none focus:border-brand-primary"
                            placeholder="Ex: Professor de História"
                        />
                        {errors.jobTitle && <p className="text-red-400 text-xs mt-1">{errors.jobTitle.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-primary/20 transition flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <><CheckCircle size={20} /> Confirmar Inscrição</>}
                    </button>
                </form>
            </div>
        </div>
    );
}
