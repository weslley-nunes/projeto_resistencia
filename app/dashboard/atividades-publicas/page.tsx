'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Image, Video, FileText, Search, Filter, MessageSquare, User, MapPin, Globe } from 'lucide-react';

const ALL_CLASSES = [
    { id: "m1-0", theme: "Aula Inaugural" },
    { id: "m1-1", theme: "Direito à memória" },
    { id: "m1-2", theme: "Memória e Paisagem" },
    { id: "m1-3", theme: "Educação patrimonial..." },
    { id: "m1-4", theme: "Participação da comunidade..." },
    { id: "m1-5", theme: "Diversidade e Patrimônio (Saberes)" },
    { id: "m1-6", theme: "Diversidade e Patrimônio (Lugares)" },
    { id: "m1-7", theme: "Oficinas práticas" },
    { id: "m1-8", theme: "Contação de histórias" },
    { id: "m1-9", theme: "Roteiros culturais" },
    { id: "m2-0", theme: "Arte-educação" },
    { id: "m2-1", theme: "Educação Museal" },
    { id: "m2-2", theme: "Inventários participativos" },
    { id: "m2-3", theme: "Tecnologias" },
    { id: "m2-4", theme: "Turismo" },
    { id: "m2-5", theme: "Curadoria" },
    { id: "m2-6", theme: "Festival" },
    { id: "m2-7", theme: "Material didático" },
];

export default function PublicGalleryPage() {
    const searchParams = useSearchParams();
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClassId, setSelectedClassId] = useState(searchParams.get('classId') || '');

    useEffect(() => {
        fetchPublicSubmissions();
    }, []);

    const fetchPublicSubmissions = async () => {
        try {
            const res = await fetch('/api/activities/public');
            if (res.ok) {
                const data = await res.json();
                setSubmissions(data);
            }
        } catch (error) {
            console.error('Error fetching public submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredSubmissions = submissions.filter(sub => {
        const matchesSearch = 
            sub.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            sub.content?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesClass = selectedClassId ? sub.classId === selectedClassId : true;

        return matchesSearch && matchesClass;
    });

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-12">
            <header className="bg-gradient-to-br from-brand-secondary to-brand-primary p-10 rounded-[2.5rem] shadow-xl border border-white/10 text-white">
                <h1 className="text-4xl font-black font-sans flex items-center gap-3">
                    <MessageSquare className="text-brand-accent" size={40} /> Galeria de Inspiração
                </h1>
                <p className="text-white/80 mt-4 max-w-2xl text-lg leading-relaxed">
                    Explore as atividades práticas compartilhadas por outros cursistas. Uma rede de saberes e fazeres sobre o patrimônio e resistência.
                </p>
            </header>

            <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Buscar por nome ou conteúdo..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-brand-primary/50 outline-none transition bg-gray-50/50"
                    />
                </div>
                <div className="relative w-full md:w-72">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <select 
                        value={selectedClassId}
                        onChange={(e) => setSelectedClassId(e.target.value)}
                        className="w-full pl-12 pr-10 py-3 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-brand-primary/50 outline-none transition appearance-none bg-gray-50/50 cursor-pointer font-medium text-gray-700"
                    >
                        <option value="">Todas as Aulas</option>
                        {ALL_CLASSES.map(cls => (
                            <option key={cls.id} value={cls.id}>{cls.theme}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
                    <p className="font-bold text-gray-400">Carregando inspirações...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredSubmissions.map((sub, index) => (
                        <SubmissionCard key={sub.id} submission={sub} index={index} />
                    ))}
                    {filteredSubmissions.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                            <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-xl font-bold text-gray-400">Nenhuma atividade pública encontrada.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function SubmissionCard({ submission, index }: { submission: any, index: number }) {
    const files = JSON.parse(submission.files || '[]');
    const classInfo = ALL_CLASSES.find(c => c.id === submission.classId);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
            <div className="p-6 border-b border-gray-50 bg-brand-secondary/[0.02]">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/10 overflow-hidden shadow-inner">
                        {submission.user.image ? (
                            <img src={submission.user.image} alt={submission.user.name} className="w-full h-full object-cover" />
                        ) : (
                            <User size={24} />
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 leading-tight">{submission.user.name}</h3>
                        <p className="text-[10px] text-brand-accent font-bold flex items-center gap-1 mt-0.5">
                            <MapPin size={10} /> {submission.user.city} {submission.user.school ? ` • ${submission.user.school}` : ''}
                        </p>
                    </div>
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-brand-primary/5 text-brand-primary text-[10px] font-black tracking-wider uppercase">
                    {classInfo?.theme || 'Aula'}
                </div>
            </div>

            <div className="p-6 flex-1 space-y-4">
                {submission.content && (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 italic">
                        "{submission.content}"
                    </p>
                )}

                {files.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Anexos Disponíveis</p>
                        <div className="flex flex-wrap gap-2">
                            {files.map((file: any, i: number) => (
                                <a 
                                    key={i} 
                                    href={file.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-brand-primary/5 hover:border-brand-primary/20 hover:text-brand-primary transition shadow-sm"
                                >
                                    {file.type.startsWith('video') ? <Video size={14} className="text-brand-primary" /> : <FileText size={14} className="text-brand-primary" />}
                                    <span className="truncate max-w-[100px]">{file.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex justify-between items-center">
                <span className="text-[10px] text-gray-400 font-medium">
                    Enviado em {new Date(submission.createdAt).toLocaleDateString('pt-BR')}
                </span>
            </div>
        </motion.div>
    );
}
