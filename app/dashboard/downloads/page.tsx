'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Download, FileText, FolderArchive, ArrowRight, CheckCircle2 } from 'lucide-react';

// Lista de materiais fornecida pelo usuário
const downloadMaterials = [
    {
        id: "guia-inicial",
        title: "Guia de Estudos - Material Inicial",
        description: "Manual de introdução e orientação para os cursistas. Contém informações fundamentais sobre a dinâmica de aprendizado, cronograma geral e primeiras etapas do Projeto Resistência.",
        fileType: "PDF / Documento",
        fileSize: "Link do Google Drive",
        url: "https://drive.google.com/file/d/18I482NMGUGl7kf11TrCSEWxF5iO9HPCd/view?usp=sharing",
        icon: FileText,
        isFeatured: false,
        badge: "Introdução"
    },
    {
        id: "conteudo-completo",
        title: "Conteúdo Completo do Curso",
        description: "Apostila integrada e material didático completo com todas as leituras, conceitos teóricos, atividades práticas e referências bibliográficas utilizadas ao longo de todo o curso.",
        fileType: "Arquivo Compactado / PDF",
        fileSize: "Material Integrado",
        url: "https://drive.google.com/file/d/1mWXCSBcSD2u3igDt5IMwSEwfSyw1Tq5N/view?usp=sharing",
        icon: FolderArchive,
        isFeatured: true,
        badge: "Curso Completo"
    }
];

export default function DownloadsPage() {
    const { data: session } = useSession();

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Cabeçalho */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="p-2 hover:bg-gray-150 rounded-full transition bg-white shadow-sm border border-gray-200/50">
                    <ChevronLeft size={24} className="text-brand-secondary" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold font-sans text-brand-secondary">Baixar Conteúdo</h1>
                    <p className="text-sm text-gray-500">Acesse aqui todos os materiais e apostilas de apoio para a sua jornada.</p>
                </div>
            </div>

            {/* Banner Informativo */}
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-brand-secondary to-brand-primary p-8 rounded-3xl text-white shadow-lg relative overflow-hidden"
            >
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2 max-w-2xl">
                        <span className="bg-brand-accent/20 text-brand-accent px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                            Estude no seu ritmo
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold">Olá, {session?.user?.name?.split(' ')[0] || 'Cursista'}!</h2>
                        <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                            Baixe os arquivos e leve o conhecimento do cerrado para onde quiser, mesmo sem conexão com a internet. Clique nos botões abaixo para abrir e salvar cada material.
                        </p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-xs space-y-2 w-full md:w-auto md:min-w-64">
                        <h4 className="font-bold flex items-center gap-2 text-brand-accent">
                            <CheckCircle2 size={14} /> Dicas para Download:
                        </h4>
                        <ul className="space-y-1 text-gray-200 pl-1 list-disc list-inside">
                            <li>Abra o link do Google Drive</li>
                            <li>Clique no ícone de download no topo</li>
                            <li>Salve no seu celular ou computador</li>
                        </ul>
                    </div>
                </div>
            </motion.div>

            {/* Grid de Materiais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {downloadMaterials.map((material, idx) => {
                    const IconComponent = material.icon;
                    return (
                        <motion.div
                            key={material.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.15 }}
                            whileHover={{ y: -6, scale: 1.01 }}
                            className={`flex flex-col bg-white rounded-3xl p-6 border shadow-sm transition-all duration-300 relative overflow-hidden ${
                                material.isFeatured 
                                    ? "border-brand-primary/40 shadow-md ring-2 ring-brand-primary/5" 
                                    : "border-gray-200/60 hover:border-brand-secondary/30"
                            }`}
                        >
                            {/* Destaque visual para o conteúdo principal */}
                            {material.isFeatured && (
                                <div className="absolute top-0 right-0">
                                    <div className="bg-brand-primary text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider shadow-sm">
                                        Recomendado
                                    </div>
                                </div>
                            )}

                            {/* Conteúdo do Cartão */}
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-2xl ${
                                        material.isFeatured 
                                            ? "bg-brand-primary/10 text-brand-primary" 
                                            : "bg-brand-secondary/5 text-brand-secondary"
                                    }`}>
                                        <IconComponent size={26} />
                                    </div>
                                    <div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                            material.isFeatured 
                                                ? "bg-brand-primary/10 text-brand-primary" 
                                                : "bg-brand-secondary/10 text-brand-secondary"
                                        }`}>
                                            {material.badge}
                                        </span>
                                        <h3 className="font-bold text-lg text-gray-800 mt-1 line-clamp-1">
                                            {material.title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed min-h-[72px]">
                                    {material.description}
                                </p>

                                <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-4 mt-2">
                                    <span>Formato: <strong>{material.fileType}</strong></span>
                                    <span>Tamanho: <strong>{material.fileSize}</strong></span>
                                </div>
                            </div>

                            {/* Botão de Ação */}
                            <div className="mt-6">
                                <a
                                    href={material.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <motion.div
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md ${
                                            material.isFeatured
                                                ? "bg-brand-primary hover:bg-brand-primary/95 text-white shadow-brand-primary/20 hover:shadow-brand-primary/30"
                                                : "bg-brand-secondary hover:bg-brand-secondary/95 text-white shadow-brand-secondary/20 hover:shadow-brand-secondary/30"
                                        }`}
                                    >
                                        <Download size={18} className="animate-bounce" />
                                        <span>Baixar Material</span>
                                        <ArrowRight size={16} className="opacity-60 group-hover:translate-x-1 transition-transform ml-1" />
                                    </motion.div>
                                </a>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Rodapé e Suporte */}
            <div className="bg-gray-100/60 p-6 rounded-2xl border border-gray-200/30 text-center space-y-2 max-w-xl mx-auto mt-4">
                <p className="text-sm text-gray-600 font-medium">
                    ⚠️ Problemas com o download?
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                    Certifique-se de estar conectado à sua conta do Google para visualizar os arquivos. Caso continue com dificuldades, entre em contato com a equipe de tutoria do Projeto Resistência.
                </p>
            </div>
        </div>
    );
}
