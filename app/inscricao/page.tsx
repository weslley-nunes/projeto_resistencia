'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        city: '',
        school: '',
        jobTitle: '',
        teachingTime: '',
        educationLevel: '',
        trainingArea: '',
        quotaType: 'AMPLA',
        file: null as File | null
    });

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, file: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!formData.file) {
            setError('Por favor, anexe o arquivo PDF com a documentação.');
            setIsLoading(false);
            return;
        }

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value) data.append(key, value);
            });

            const res = await fetch('/api/registration', {
                method: 'POST',
                // Content-Type is set automatically with FormData
                body: data
            });

            if (res.ok) {
                setSuccess(true);
            } else {
                const msg = await res.text();
                // Try to parse JSON error
                try {
                    const jsonError = JSON.parse(msg);
                    if (jsonError.error) {
                        setError(`Erro: ${jsonError.error} - ${jsonError.details || ''}`);
                    } else {
                        setError(msg);
                    }
                } catch (e) {
                    // Start of fallback text error handling
                    if (msg.includes('already registered')) {
                        setError('CPF ou Email já cadastrados.');
                    } else if (msg.includes('Missing required fields')) {
                        setError('Preencha todos os campos obrigatórios.');
                    } else {
                        setError(`Erro ao enviar inscrição: ${msg}`);
                    }
                }
            }
        } catch (err) {
            setError('Erro de conexão.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-stone-100"
                >
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-600 w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-bold text-brand-secondary mb-4 font-sans">Inscrição Confirmada!</h2>
                    <p className="text-stone-600 mb-8 leading-relaxed">
                        Recebemos seus dados com sucesso. A coordenação do projeto entrará em contato em breve para os próximos passos.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary/90 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-brand-primary/20"
                    >
                        Voltar ao Início
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-brand-primary/20">
            {/* Header */}
            <nav className="bg-brand-secondary text-white sticky top-0 z-50 backdrop-blur-md bg-opacity-95 shadow-md">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="font-bold text-xl tracking-tight">Projeto Resistência</h1>
                        <p className="text-xs text-brand-accent/80 font-medium tracking-wide layer-blur">EDITAL 001/2026</p>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto p-6 py-10 my-4">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-stone-100 overflow-hidden"
                >
                    {/* Form Header */}
                    <div className="bg-gradient-to-br from-stone-50 to-white p-10 border-b border-stone-100">
                        <h1 className="text-3xl font-extrabold text-brand-secondary mb-3 tracking-tight">Ficha de Inscrição</h1>
                        <p className="text-stone-600 max-w-2xl text-lg leading-relaxed">
                            Preencha o formulário para participar da seleção. Certifique-se de ter seus documentos digitalizados.
                        </p>
                    </div>

                    <div className="p-10">
                        <form onSubmit={handleSubmit} className="space-y-10">

                            {/* Dados Pessoais */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold">01</span>
                                    <h3 className="text-xl font-bold text-brand-secondary">Dados Pessoais</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-stone-600 mb-2 group-focus-within:text-brand-primary transition-colors">Nome Completo</label>
                                        <input
                                            name="name"
                                            required
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-[3px] focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all placeholder:text-stone-400 font-medium text-black"
                                            placeholder="Digite seu nome completo"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-stone-600 mb-2 group-focus-within:text-brand-primary transition-colors">CPF</label>
                                        <input
                                            name="cpf"
                                            required
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-[3px] focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all placeholder:text-stone-400 font-medium text-black"
                                            placeholder="000.000.000-00"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-stone-600 mb-2 group-focus-within:text-brand-primary transition-colors">Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-[3px] focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all placeholder:text-stone-400 font-medium text-black"
                                            placeholder="seu@email.com"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-stone-600 mb-2 group-focus-within:text-brand-primary transition-colors">Telefone / WhatsApp</label>
                                        <input
                                            name="phone"
                                            required
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-[3px] focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all placeholder:text-stone-400 font-medium text-black"
                                            placeholder="(00) 00000-0000"
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="h-px bg-stone-100" />

                            {/* Dados Profissionais */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold">02</span>
                                    <h3 className="text-xl font-bold text-brand-secondary">Dados Profissionais</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-stone-600 mb-2 group-focus-within:text-brand-primary transition-colors">Cidade de Lotação</label>
                                        <div className="relative">
                                            <select name="city" required onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-[3px] focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all appearance-none cursor-pointer font-medium text-black">
                                                <option value="">Selecione sua cidade...</option>
                                                <option value="Arraias">Arraias</option>
                                                <option value="Aurora do Tocantins">Aurora do Tocantins</option>
                                                <option value="Lavandeira">Lavandeira</option>
                                                <option value="Paranã">Paranã</option>
                                                <option value="Combinado">Combinado</option>
                                                <option value="Novo Alegre">Novo Alegre</option>
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-stone-600 mb-2 group-focus-within:text-brand-primary transition-colors">Escola de Atuação</label>
                                        <input
                                            name="school"
                                            required
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-[3px] focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all placeholder:text-stone-400 font-medium text-black"
                                            placeholder="Nome da escola"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-stone-600 mb-2 group-focus-within:text-brand-primary transition-colors">Cargo / Função</label>
                                        <input
                                            name="jobTitle"
                                            required
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-[3px] focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all placeholder:text-stone-400 font-medium text-black"
                                            placeholder="Ex: Professor de História"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-stone-600 mb-2 group-focus-within:text-brand-primary transition-colors">Tempo de Docência</label>
                                        <div className="relative">
                                            <select name="teachingTime" required onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-[3px] focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all appearance-none cursor-pointer font-medium text-black">
                                                <option value="">Selecione...</option>
                                                <option value="0-2">0 a 2 anos</option>
                                                <option value="3-5">3 a 5 anos</option>
                                                <option value="6-10">6 a 10 anos</option>
                                                <option value="10+">Mais de 10 anos</option>
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-stone-600 mb-2 group-focus-within:text-brand-primary transition-colors">Nível de Escolaridade</label>
                                        <div className="relative">
                                            <select name="educationLevel" required onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-[3px] focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all appearance-none cursor-pointer font-medium text-black">
                                                <option value="">Selecione...</option>
                                                <option value="Licenciatura">Licenciatura</option>
                                                <option value="Especialização">Especialização</option>
                                                <option value="Mestrado">Mestrado</option>
                                                <option value="Doutorado">Doutorado</option>
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-stone-600 mb-2 group-focus-within:text-brand-primary transition-colors">Área de Formação</label>
                                        <input
                                            name="trainingArea"
                                            required
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-[3px] focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all placeholder:text-stone-400 font-medium text-black"
                                            placeholder="Ex: História, Geografia..."
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="h-px bg-stone-100" />

                            {/* Modalidade e Documentos */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold">03</span>
                                    <h3 className="text-xl font-bold text-brand-secondary">Modalidade e Documentação</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
                                        <label className="block text-sm font-semibold text-stone-600 mb-4 ml-1">Selecione a modalidade de concorrência:</label>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {[
                                                { id: 'AMPLA', label: 'Ampla Concorrência', desc: 'Para todos os candidatos' },
                                                { id: 'INDIGENA', label: 'Cotas: Indígenas', desc: 'Reserva para candidatos indígenas' },
                                                { id: 'QUILOMBOLA', label: 'Cotas: Quilombolas', desc: 'Reserva para quilombolas' },
                                                { id: 'PCD', label: 'Pessoa com Deficiência', desc: 'Reserva de vagas para PcD' }
                                            ].map((option) => (
                                                <label
                                                    key={option.id}
                                                    className={`relative flex items-start p-4 border rounded-2xl cursor-pointer transition-all duration-200 ${formData.quotaType === option.id
                                                        ? 'border-brand-primary bg-white ring-2 ring-brand-primary shadow-lg shadow-brand-primary/10 z-10'
                                                        : 'border-stone-200 hover:border-brand-primary/30 hover:bg-white'
                                                        }`}
                                                >
                                                    <div className="flex items-center h-5 mt-1">
                                                        <input
                                                            type="radio"
                                                            name="quotaType"
                                                            value={option.id}
                                                            checked={formData.quotaType === option.id}
                                                            onChange={handleChange}
                                                            className="w-5 h-5 text-brand-primary border-gray-300 focus:ring-brand-primary"
                                                        />
                                                    </div>
                                                    <div className="ml-3">
                                                        <span className={`block font-bold text-base ${formData.quotaType === option.id ? 'text-brand-primary' : 'text-brand-secondary'}`}>{option.label}</span>
                                                        <span className="text-xs text-stone-500 font-medium">{option.desc}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all duration-300 group cursor-pointer ${formData.file
                                        ? 'border-green-500 bg-green-50/50'
                                        : 'border-stone-300 hover:border-brand-primary/50 hover:bg-stone-50'
                                        }`}>
                                        <input
                                            name="file"
                                            type="file"
                                            accept=".pdf"
                                            required
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="flex flex-col items-center gap-4 pointer-events-none">
                                            <div className={`w-16 h-16 rounded-full shadow-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${formData.file ? 'bg-green-100 text-green-600' : 'bg-white text-brand-primary'
                                                }`}>
                                                {formData.file ? (
                                                    <CheckCircle size={32} />
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className={`font-bold text-lg mb-1 ${formData.file ? 'text-green-800' : 'text-brand-secondary'}`}>
                                                    {formData.file ? formData.file.name : "Clique para anexar a documentação (PDF)"}
                                                </h4>
                                                <p className="text-sm text-stone-500 max-w-sm mx-auto">
                                                    {formData.file
                                                        ? "Arquivo selecionado. Clique novamente para alterar."
                                                        : "Reúna RG, CPF, Certidão Eleitoral e Comprovantes em um único arquivo PDF (máx 7MB)."
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-center text-sm font-bold border border-red-100 flex items-center justify-center gap-2 animate-pulse">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                                    {error}
                                </div>
                            )}

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-5 bg-brand-primary text-white font-bold rounded-2xl text-lg hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                    <span className="relative flex items-center gap-2">
                                        {isLoading ? <Loader2 className="animate-spin w-6 h-6" /> : (
                                            <>
                                                Confirmar Inscrição
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                            </>
                                        )}
                                    </span>
                                </button>
                                <p className="text-center text-xs text-stone-400 mt-6 font-medium">
                                    Ao clicar em confirmar, você declara que as informações acima são verdadeiras sob as penas da lei.
                                </p>
                            </div>
                        </form>
                    </div>
                </motion.div>

                <footer className="text-center mt-16 text-brand-secondary/40 text-sm font-medium">
                    &copy; 2026 Projeto Resistência. Todos os direitos reservados. Universidade Federal do Tocantins.
                </footer>
            </main>
        </div>
    );
}
