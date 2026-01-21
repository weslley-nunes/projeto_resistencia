'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { Loader2, Save, CheckCircle, LogOut, Upload, AlertCircle } from 'lucide-react';
import { signOut } from 'next-auth/react';

const MAX_FILE_SIZE = 7 * 1024 * 1024; // 7MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

// Validation Schema
const schema = z.object({
    cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
    phone: z.string().min(10, "Telefone inválido"),
    city: z.string().min(1, "Selecione uma cidade"),
    school: z.string().min(3, "Nome da escola muito curto"),
    jobTitle: z.string().min(3, "Cargo/Função obrigatória"),
    teachingTime: z.string().min(1, "Tempo de docência obrigatório"),
    educationLevel: z.string().min(1, "Nível de escolaridade obrigatório"),
    trainingArea: z.string().min(3, "Área de formação obrigatória"),
    quotaType: z.string().optional(),
    isPcd: z.boolean().optional(),
    // File validation handled separately or via refining
});

type FormData = z.infer<typeof schema>;

export default function RegistrationPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // File States
    const [documentsFile, setDocumentsFile] = useState<File | null>(null);
    const [quotaFile, setQuotaFile] = useState<File | null>(null);
    const [pcdFile, setPcdFile] = useState<File | null>(null);
    const [isQuota, setIsQuota] = useState(false);
    const [isPcd, setIsPcd] = useState(false);
    const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (f: File | null) => void, fieldName: string) => {
        const file = e.target.files?.[0];
        setFileErrors(prev => ({ ...prev, [fieldName]: "" }));

        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setFileErrors(prev => ({ ...prev, [fieldName]: "O arquivo deve ter no máximo 7MB." }));
                setter(null);
                return;
            }
            if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
                setFileErrors(prev => ({ ...prev, [fieldName]: "Apenas arquivos PDF são aceitos." }));
                setter(null);
                return;
            }
            setter(file);
        } else {
            setter(null);
        }
    };

    const onSubmit = async (data: FormData) => {
        // Validate required files
        const errors: Record<string, string> = {};
        if (!documentsFile) errors.documents = "Documentos obrigatórios.";
        if (isQuota && !quotaFile) errors.quota = "Declaração de cota obrigatória.";
        if (isPcd && !pcdFile) errors.pcd = "Laudo médico obrigatório.";

        if (Object.keys(errors).length > 0) {
            setFileErrors(errors);
            alert("Por favor, anexe todos os documentos obrigatórios.");
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();

            // Append text fields
            Object.keys(data).forEach(key => {
                const value = data[key as keyof FormData];
                if (value !== undefined && value !== null) {
                    formData.append(key, value.toString());
                }
            });

            // Append extra booleans/fields logic
            if (isPcd) formData.append('isPcd', 'true');
            if (isQuota) {
                const qType = watch('quotaType');
                if (qType) formData.append('quotaType', qType);
            }

            // Append files
            if (documentsFile) formData.append('documents', documentsFile);
            if (isQuota && quotaFile) formData.append('quotaDocuments', quotaFile);
            if (isPcd && pcdFile) formData.append('pcdDocuments', pcdFile);

            const res = await fetch('/api/user/register', {
                method: 'PUT',
                body: formData, // No Content-Type header needed, browser sets it
            });

            if (!res.ok) throw new Error('Falha ao salvar');

            // Success
            router.push('/dashboard?registered=true');
        } catch (error) {
            console.error(error);
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
            <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="absolute top-6 right-6 p-2 text-white/30 hover:text-red-400 transition"
                    title="Sair / Trocar Conta"
                >
                    <LogOut size={20} />
                </button>
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2">Finalize sua Inscrição</h1>
                    <p className="text-gray-400">Preencha seus dados e anexe os documentos solicitados.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Read-only Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/20 p-4 rounded-xl border border-white/5">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Nome (Google)</label>
                            <div className="text-gray-300 font-medium">
                                {session?.user?.name}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Email (Google)</label>
                            <div className="text-gray-300 font-medium truncate">
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

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-brand-primary border-b border-white/10 pb-2">Dados Profissionais</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                            {/* Teaching Time */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Tempo de Docência <span className="text-red-400">*</span></label>
                                <select
                                    {...register("teachingTime")}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 focus:outline-none focus:border-brand-primary text-gray-300 [&>option]:text-black"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="menos_2_anos">Menos de 2 anos</option>
                                    <option value="2_a_5_anos">2 a 5 anos</option>
                                    <option value="5_a_10_anos">5 a 10 anos</option>
                                    <option value="mais_10_anos">Mais de 10 anos</option>
                                </select>
                                {errors.teachingTime && <p className="text-red-400 text-xs mt-1">{errors.teachingTime.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Education Level */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Nível de Escolaridade <span className="text-red-400">*</span></label>
                                <select
                                    {...register("educationLevel")}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 focus:outline-none focus:border-brand-primary text-gray-300 [&>option]:text-black"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="medio_magisterio">Ensino Médio (Magistério)</option>
                                    <option value="graduacao">Graduação (Licenciatura)</option>
                                    <option value="graduacao_bacharel">Graduação (Bacharelado)</option>
                                    <option value="pos_graduacao">Pós-Graduação (Especialização)</option>
                                    <option value="mestrado">Mestrado</option>
                                    <option value="doutorado">Doutorado</option>
                                </select>
                                {errors.educationLevel && <p className="text-red-400 text-xs mt-1">{errors.educationLevel.message}</p>}
                            </div>

                            {/* Training Area */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Área de Formação <span className="text-red-400">*</span></label>
                                <input
                                    {...register("trainingArea")}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 focus:outline-none focus:border-brand-primary"
                                    placeholder="Ex: Matemática, Pedagogia..."
                                />
                                {errors.trainingArea && <p className="text-red-400 text-xs mt-1">{errors.trainingArea.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-brand-primary border-b border-white/10 pb-2">Documentação e Anexos</h3>

                        {/* Main Documents */}
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                            <label className="block text-sm font-medium mb-2">
                                Documentos Pessoais (RG, CPF, Cert. Quitação Eleitoral) <span className="text-red-400">*</span>
                            </label>
                            <p className="text-xs text-gray-400 mb-3">
                                Envie um <strong>único arquivo PDF</strong> com todos os documentos exigidos. Máx: 7MB.
                            </p>
                            <div className="flex items-center gap-3">
                                <label className="cursor-pointer bg-brand-primary/20 hover:bg-brand-primary/30 text-brand-primary px-4 py-2 rounded-lg border border-brand-primary/30 transition flex items-center gap-2 text-sm font-bold">
                                    <Upload size={18} />
                                    Selecionar PDF
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, setDocumentsFile, 'documents')}
                                    />
                                </label>
                                <span className="text-sm text-gray-300 truncate max-w-[200px]">
                                    {documentsFile ? documentsFile.name : "Nenhum arquivo selecionado"}
                                </span>
                            </div>
                            {fileErrors.documents && <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><AlertCircle size={12} /> {fileErrors.documents}</p>}
                        </div>

                        {/* Quotas */}
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-4">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="quotaCheck"
                                    checked={isQuota}
                                    onChange={(e) => setIsQuota(e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-500 text-brand-primary focus:ring-brand-primary"
                                />
                                <label htmlFor="quotaCheck" className="text-sm font-medium cursor-pointer">
                                    Sou candidato Cotista (Indígena ou Quilombola)
                                </label>
                            </div>

                            {isQuota && (
                                <div className="pl-8 space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Tipo de Cota <span className="text-red-400">*</span></label>
                                        <select
                                            {...register("quotaType")}
                                            className="w-full bg-black/40 border border-white/20 rounded-xl p-3 focus:outline-none focus:border-brand-primary text-gray-300 [&>option]:text-black"
                                        >
                                            <option value="">Selecione...</option>
                                            <option value="INDIGENOUS">Indígena</option>
                                            <option value="QUILOMBOLA">Quilombola</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Declaração da Comunidade <span className="text-red-400">*</span></label>
                                        <div className="flex items-center gap-3">
                                            <label className="cursor-pointer bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg border border-white/20 transition flex items-center gap-2 text-sm font-bold">
                                                <Upload size={18} />
                                                Anexar Declaração (PDF)
                                                <input
                                                    type="file"
                                                    accept="application/pdf"
                                                    className="hidden"
                                                    onChange={(e) => handleFileChange(e, setQuotaFile, 'quota')}
                                                />
                                            </label>
                                            <span className="text-sm text-gray-300 truncate max-w-[200px]">
                                                {quotaFile ? quotaFile.name : "Nenhum arquivo"}
                                            </span>
                                        </div>
                                        {fileErrors.quota && <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><AlertCircle size={12} /> {fileErrors.quota}</p>}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* PcD */}
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-4">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="pcdCheck"
                                    checked={isPcd}
                                    onChange={(e) => setIsPcd(e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-500 text-brand-primary focus:ring-brand-primary"
                                />
                                <label htmlFor="pcdCheck" className="text-sm font-medium cursor-pointer">
                                    Sou Pessoa com Deficiência (PcD)
                                </label>
                            </div>

                            {isPcd && (
                                <div className="pl-8 space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-200 text-xs mb-2">
                                        Anexe a Autodeclaração e o Laudo Médico com CID.
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Laudo Médico e Autodeclaração <span className="text-red-400">*</span></label>
                                        <div className="flex items-center gap-3">
                                            <label className="cursor-pointer bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg border border-white/20 transition flex items-center gap-2 text-sm font-bold">
                                                <Upload size={18} />
                                                Anexar Documentos (PDF)
                                                <input
                                                    type="file"
                                                    accept="application/pdf"
                                                    className="hidden"
                                                    onChange={(e) => handleFileChange(e, setPcdFile, 'pcd')}
                                                />
                                            </label>
                                            <span className="text-sm text-gray-300 truncate max-w-[200px]">
                                                {pcdFile ? pcdFile.name : "Nenhum arquivo"}
                                            </span>
                                        </div>
                                        {fileErrors.pcd && <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><AlertCircle size={12} /> {fileErrors.pcd}</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-primary/20 transition flex items-center justify-center gap-2 mt-8"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <><CheckCircle size={20} /> Confirmar Inscrição</>}
                    </button>

                    <p className="text-center text-xs text-gray-500 mt-4">
                        Ao confirmar, você declara que as informações prestadas são verdadeiras.
                    </p>
                </form>
            </div>
        </div>
    );
}
