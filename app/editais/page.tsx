'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function EditaisPage() {
    const notices = [
        {
            id: 1,
            title: "Edital de Abertura nº 001/2025",
            description: "Processo seletivo para ingresso no Curso de Aperfeiçoamento em Educação Patrimonial Gamificada.",
            date: "21/01/2026",
            link: "https://docs.uft.edu.br/s/MiB-rXkiQ1mBc3Z8Ra0d0g",
            isNew: true
        },
        // Future notices can be added here
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            {/* Navbar */}
            <nav className="p-6 bg-brand-secondary text-white shadow-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
                        <div className="w-10 h-10 relative">
                            <Image
                                src="/logo.png"
                                alt="Logo Projeto Resistência"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tighter">Projeto Resistência</span>
                    </Link>
                    <div>
                        <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-brand-accent transition">
                            <ArrowLeft size={16} />
                            Voltar para Início
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <header className="bg-brand-secondary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Editais e Documentos
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-300 max-w-2xl mx-auto"
                    >
                        Acesse aqui todos os editais, regulamentos e publicações oficiais do Projeto Resistência.
                    </motion.p>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="space-y-6">
                    {notices.map((notice) => (
                        <motion.div
                            key={notice.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group"
                        >
                            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-brand-primary transition">{notice.title}</h3>
                                            {notice.isNew && (
                                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">NOVO</span>
                                            )}
                                        </div>
                                        <p className="text-gray-500 text-sm mb-2">{notice.description}</p>
                                        <p className="text-xs text-gray-400">Publicado em: {notice.date}</p>
                                    </div>
                                </div>
                                <a
                                    href={notice.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto px-6 py-3 bg-brand-secondary text-white rounded-xl font-medium hover:bg-brand-primary transition flex items-center justify-center gap-2 shrink-0"
                                >
                                    <Download size={18} />
                                    Baixar Edital
                                </a>
                            </div>
                        </motion.div>
                    ))}

                    {/* Empty State / Future Section */}
                    <div className="text-center py-12 text-gray-400">
                        <p>Novos documentos serão publicados nesta página em breve.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
