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
                if (msg.includes('already registered')) {
                    setError('CPF ou Email já cadastrados.');
                } else {
                    setError('Erro ao enviar inscrição. Tente novamente.');
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
            <div className="min-h-screen bg-brand-secondary flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-600 w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-brand-secondary mb-4">Inscrição Realizada!</h2>
                    <p className="text-gray-600 mb-8">
                        Seus dados foram recebidos com sucesso. A coordenação entrará em contato em breve para confirmar sua matrícula.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition"
                    >
                        Voltar ao Início
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <nav className="bg-brand-secondary p-4 text-white">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition">
                        <ArrowLeft size={20} />
                    </Link>
                    <span className="font-bold text-lg">Inscrição Projeto Resistência</span>
                </div>
            </nav>

            <main className="max-w-3xl mx-auto p-6 py-10">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="mb-8 border-b border-gray-100 pb-6">
                        <h1 className="text-2xl font-bold text-brand-secondary mb-2">Ficha de Inscrição</h1>
                        <p className="text-gray-500 text-sm">Preencha seus dados corretamente. Todos os campos são obrigatórios.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                                <input name="name" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary/50 outline-none" placeholder="Nome completo" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                                <input name="cpf" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary/50 outline-none" placeholder="000.000.000-00" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input name="email" type="email" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary/50 outline-none" placeholder="seu@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                                <input name="phone" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary/50 outline-none" placeholder="(00) 00000-0000" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade de Lotação</label>
                                <select name="city" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary/50 outline-none">
                                    <option value="">Selecione...</option>
                                    <option value="Arraias">Arraias</option>
                                    <option value="Aurora do Tocantins">Aurora do Tocantins</option>
                                    <option value="Lavandeira">Lavandeira</option>
                                    <option value="Paranã">Paranã</option>
                                    <option value="Combinado">Combinado</option>
                                    <option value="Novo Alegre">Novo Alegre</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Escola de Atuação</label>
                                <input name="school" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary/50 outline-none" placeholder="Nome da escola" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo / Função</label>
                                <input name="jobTitle" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary/50 outline-none" placeholder="Ex: Professor de História" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tempo de Docência</label>
                                <select name="teachingTime" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary/50 outline-none">
                                    <option value="">Selecione...</option>
                                    <option value="0-2">0 a 2 anos</option>
                                    <option value="3-5">3 a 5 anos</option>
                                    <option value="6-10">6 a 10 anos</option>
                                    <option value="10+">Mais de 10 anos</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nível de Escolaridade</label>
                                <select name="educationLevel" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary/50 outline-none">
                                    <option value="">Selecione...</option>
                                    <option value="Licenciatura">Licenciatura</option>
                                    <option value="Especialização">Especialização</option>
                                    <option value="Mestrado">Mestrado</option>
                                    <option value="Doutorado">Doutorado</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Área de Formação</label>
                                <input name="trainingArea" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary/50 outline-none" placeholder="Ex: História, Geografia..." />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <h3 className="font-semibold text-lg text-brand-secondary">Modalidade de Concorrência</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Selecione a modalidade:</label>
                                <div className="grid md:grid-cols-2 gap-3">
                                    <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition ${formData.quotaType === 'AMPLA' ? 'border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <input type="radio" name="quotaType" value="AMPLA" checked={formData.quotaType === 'AMPLA'} onChange={handleChange} className="mr-3" />
                                        <span>Ampla Concorrência</span>
                                    </label>
                                    <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition ${formData.quotaType === 'INDIGENA' ? 'border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <input type="radio" name="quotaType" value="INDIGENA" checked={formData.quotaType === 'INDIGENA'} onChange={handleChange} className="mr-3" />
                                        <span>Cotas: Indígenas</span>
                                    </label>
                                    <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition ${formData.quotaType === 'QUILOMBOLA' ? 'border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <input type="radio" name="quotaType" value="QUILOMBOLA" checked={formData.quotaType === 'QUILOMBOLA'} onChange={handleChange} className="mr-3" />
                                        <span>Cotas: Quilombolas</span>
                                    </label>
                                    <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition ${formData.quotaType === 'PCD' ? 'border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <input type="radio" name="quotaType" value="PCD" checked={formData.quotaType === 'PCD'} onChange={handleChange} className="mr-3" />
                                        <span>Pessoa com Deficiência (PcD)</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Anexar Documentação (PDF único)</label>
                                <p className="text-xs text-gray-500 mb-2">
                                    RG, CPF, Certidão Eleitoral, Comprovantes de Cotas/PcD (se aplicável), todos em um único PDF (máx 7MB).
                                </p>
                                <input
                                    name="file"
                                    type="file"
                                    accept=".pdf"
                                    required
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition shadow-lg shadow-brand-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Confirmar Inscrição'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
