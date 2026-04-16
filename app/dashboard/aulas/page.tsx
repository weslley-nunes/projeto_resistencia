import { PlayCircle, Calendar, Users, BookOpen, Clock, AlertCircle, Send, CheckCircle2, Loader2, X, Upload, Video, FileText, Globe, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

const MODULO1 = [
    { id: "m1-0", date: "26/03", theme: "Aula Inaugural: Apresentação do curso e do AVA", qa: "---", host: "WESLEY MUNIZ", practice: "Familiarização com a plataforma", videoUrl: "https://youtu.be/YsXhn3DVBP8" },
    { id: "m1-1", date: "09/04", theme: "Direito à memória", qa: "Quinta-feira, 19h", host: "Cristiane Loriza Dantas PUC-Goiás", practice: "Levantamento de memórias locais", videoUrl: "https://youtu.be/RxLDTQeF5Rg" },
    { id: "m1-2", date: "23/04", theme: "Memória e Paisagem", qa: "Quinta-feira, 19h", host: "Marianne Salun UNIFESP", practice: "Registro fotográfico de paisagens culturais" },
    { id: "m1-3", date: "07/05", theme: "Educação patrimonial no contexto regional", qa: "Quinta-feira, 19h", host: "Bianka Cristina Dias Alves UEG/PARFOR", practice: "Pesquisa sobre patrimônio local" },
    { id: "m1-4", date: "21/05", theme: "Participação da comunidade na gestão do patrimônio", qa: "Quinta-feira, 19h", host: "Paulo Campos UFMG", practice: "Entrevista com liderança local" },
    { id: "m1-5", date: "03/06", theme: "Diversidade e Patrimônio: saberes e fazeres tradicionais", qa: "Quinta-feira, 19h", host: "Luana Rodrigues UFMG", practice: "Planejamento de oficina com mestre" },
    { id: "m1-6", date: "18/06", theme: "Diversidade e Patrimônio: lugares e objetos", qa: "Quinta-feira, 19h", host: "Luana Campos UFMT", practice: "Mapeamento de locais de memória" },
    { id: "m1-7", date: "18/06 a 30/06", theme: "Oficinas práticas (20h)", qa: "Acompanhamento tutor/articulador", host: "---", practice: "Oficinas de artes e ofícios" },
    { id: "m1-8", date: "18/06 a 30/06", theme: "Contação de histórias (15h)", qa: "Acompanhamento tutor/articulador", host: "---", practice: "Produção de podcast/vídeo" },
    { id: "m1-9", date: "18/06 a 30/06", theme: "Roteiros culturais (20h)", qa: "Acompanhamento tutor/articulador", host: "---", practice: "Desenvolvimento de roteiro educativo" },
];

const MODULO2 = [
    { id: "m2-0", date: "06/08", theme: "Arte-educação e patrimônio", qa: "Quinta-feira, 19h", host: "Emicleia Alves Pinheiro IFG", practice: "Projeto de intervenção artística" },
    { id: "m2-1", date: "20/08", theme: "Educação Museal e Curadoria", qa: "Quinta-feira, 19h", host: "Henrique de Freitas - idealizador Museu Zoroastra Goiânia", practice: "Planejamento de exposição virtual" },
    { id: "m2-2", date: "03/09", theme: "Inventários participativos", qa: "Quinta-feira, 19h", host: "Aline UNICAMP", practice: "Elaboração de inventário local" },
    { id: "m2-3", date: "17/09", theme: "Educação patrimonial e tecnologias", qa: "Quinta-feira, 19h", host: "Daniel Corrêa UEG", practice: "Criação de conteúdo digital" },
    { id: "m2-4", date: "01/10", theme: "Educação patrimonial e turística", qa: "Quinta-feira, 19h", host: "Beatriz Couto / Gestora Pública em arquitetura e patrimônio", practice: "Roteiro turístico-cultural" },
    { id: "m2-5", date: "02/10 a 30/11", theme: "Curadoria de Exposição (20h)", qa: "Acompanhamento tutor articulador", host: "---", practice: "Montagem de exposição na escola" },
    { id: "m2-6", date: "02/10 a 30/11", theme: "Festival Cultural Temático (20h)", qa: "Acompanhamento tutor articulador", host: "---", practice: "Organização do evento" },
    { id: "m2-7", date: "02/10 a 30/11", theme: "Elaboração de material didático (20h)", qa: "Acompanhamento tutor articulador", host: "---", practice: "Produção de livro, podcast ou jogo educativo" },
];

export default function AulasPage() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState<'mod1' | 'mod2'>('mod1');
    const [submissions, setSubmissions] = useState<Record<string, any>>({});
    const [loadingSubmissions, setLoadingSubmissions] = useState(true);
    const [selectedActivity, setSelectedActivity] = useState<any>(null);

    useEffect(() => {
        if (session?.user) {
            fetchSubmissions();
        }
    }, [session]);

    const fetchSubmissions = async () => {
        try {
            const res = await fetch('/api/activity-submission');
            if (res.ok) {
                const data = await res.json();
                const subMap: Record<string, any> = {};
                data.forEach((sub: any) => {
                    subMap[sub.classId] = sub;
                });
                setSubmissions(subMap);
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setLoadingSubmissions(false);
        }
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-br from-brand-secondary to-brand-primary p-8 rounded-3xl shadow-lg border border-white/10 text-white gap-4">
                <div>
                    <h1 className="text-3xl font-black font-sans flex items-center gap-3">
                        <PlayCircle className="text-brand-accent" size={36} /> Aulas e Cronograma
                    </h1>
                    <p className="text-white/80 mt-2 max-w-xl text-lg">
                        Acompanhe sua jornada: acesse as aulas gravadas, saiba os temas dos encontros ao vivo, plantões de dúvidas e organize suas atividades práticas.
                    </p>
                </div>
            </header>
            
            <div className="flex gap-2 p-1 bg-gray-100/50 rounded-2xl w-full max-w-md mx-auto relative z-10">
                <button 
                    onClick={() => setActiveTab('mod1')}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-sm ${activeTab === 'mod1' ? 'bg-white text-brand-secondary shadow-md' : 'text-gray-500 hover:text-brand-secondary hover:bg-gray-200/50'}`}
                >
                    Módulo 1
                </button>
                <button 
                    onClick={() => setActiveTab('mod2')}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-sm ${activeTab === 'mod2' ? 'bg-white text-brand-secondary shadow-md' : 'text-gray-500 hover:text-brand-secondary hover:bg-gray-200/50'}`}
                >
                    Módulo 2
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-brand-secondary/5 border border-gray-100 overflow-hidden">
                <div className="bg-brand-secondary/5 px-8 py-6 border-b border-brand-secondary/10">
                    <h2 className="text-2xl font-black text-brand-secondary">
                        {activeTab === 'mod1' ? 'Educação escolar e o patrimônio: cidadania, identidade e diversidade cultural' : 'Educação patrimonial para além da sala de aula'}
                    </h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="p-4 pl-8 font-semibold w-1/12 min-w-[100px]">Data</th>
                                <th className="p-4 font-semibold w-3/12 min-w-[250px]">Tema da Live (1h)</th>
                                <th className="p-4 font-semibold w-2/12 min-w-[150px]">Plantão de Dúvidas</th>
                                <th className="p-4 font-semibold w-3/12 min-w-[200px]">Responsável/Convidado</th>
                                <th className="p-4 pr-8 font-semibold w-3/12 min-w-[200px]">Atividade Prática</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {(activeTab === 'mod1' ? MODULO1 : MODULO2).map((item, index) => {
                                const submission = submissions[item.id];
                                return (
                                    <tr key={item.id} className="hover:bg-brand-secondary/5 transition-colors group">
                                        <td className="p-4 pl-8 align-top">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-primary/10 text-brand-primary font-bold text-sm whitespace-nowrap">
                                                <Calendar size={14} /> {item.date}
                                            </div>
                                        </td>
                                        <td className="p-4 align-top">
                                            <div className="font-bold text-gray-800 text-base leading-tight mb-3 group-hover:text-brand-primary transition-colors">{item.theme}</div>
                                            {(item as any).videoUrl ? (
                                                <a href={(item as any).videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-full bg-brand-primary text-white hover:bg-brand-primary/90 transition shadow-sm hover:shadow">
                                                    <PlayCircle size={14} /> Assistir Gravação
                                                </a>
                                            ) : (
                                                <button className="flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition disabled:opacity-50" disabled>
                                                    <PlayCircle size={14} /> Gravação em breve
                                                </button>
                                            )}
                                        </td>
                                        <td className="p-4 align-top text-sm">
                                            {item.qa !== "---" ? (
                                                <div className="flex items-start gap-1.5 text-gray-600">
                                                    <Clock size={16} className="text-gray-400 shrink-0 mt-0.5" />
                                                    <span>{item.qa}</span>
                                                </div>
                                            ) : <span className="text-gray-300">-</span>}
                                        </td>
                                        <td className="p-4 align-top text-sm">
                                             {item.host !== "---" ? (
                                                <div className="flex items-start gap-1.5 text-gray-600">
                                                    <Users size={16} className="text-gray-400 shrink-0 mt-0.5" />
                                                    <span className="font-medium">{item.host}</span>
                                                </div>
                                             ) : <span className="text-gray-300">-</span>}
                                        </td>
                                        <td className="p-4 pr-8 align-top text-sm">
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-2 bg-yellow-50 text-yellow-800 p-3 rounded-xl border border-yellow-100">
                                                    <BookOpen size={16} className="shrink-0 mt-0.5 text-yellow-600" />
                                                    <span className="font-medium">{item.practice}</span>
                                                </div>
                                                
                                                {submission ? (
                                                    <button 
                                                        onClick={() => setSelectedActivity({ ...item, submission })}
                                                        className="w-full flex items-center justify-center gap-2 bg-green-100 text-green-700 py-2.5 rounded-xl font-bold text-xs hover:bg-green-200 transition border border-green-200 shadow-sm"
                                                    >
                                                        <CheckCircle2 size={16} /> Enviado • Ver/Editar
                                                    </button>
                                                ) : (
                                                    <button 
                                                        onClick={() => setSelectedActivity(item)}
                                                        className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white py-2.5 rounded-xl font-bold text-xs hover:bg-brand-primary/90 transition shadow-md shadow-brand-primary/20"
                                                    >
                                                        <Send size={16} /> Enviar Atividade
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-sm">
                <AlertCircle size={20} className="shrink-0 text-blue-600" />
                <p>Os links das aulas ao vivo serão enviados por Google Meet. As aulas gravadas ficarão disponíveis nesta página alguns dias após a transmissão original.</p>
            </div>

            {/* Submission Modal */}
            <AnimatePresence>
                {selectedActivity && (
                    <ActivitySubmissionModal 
                        activity={selectedActivity} 
                        onClose={() => setSelectedActivity(null)} 
                        onSuccess={() => {
                            fetchSubmissions();
                            setSelectedActivity(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

function ActivitySubmissionModal({ activity, onClose, onSuccess }: { activity: any, onClose: () => void, onSuccess: () => void }) {
    const [content, setContent] = useState(activity.submission?.content || '');
    const [files, setFiles] = useState<File[]>([]);
    const [existingFiles, setExistingFiles] = useState<any[]>(activity.submission?.files ? JSON.parse(activity.submission.files) : []);
    const [isPublic, setIsPublic] = useState(activity.submission?.isPublic || false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles([...files, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const removeExistingFile = (index: number) => {
        setExistingFiles(existingFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('classId', activity.id);
            formData.append('content', content);
            formData.append('isPublic', String(isPublic));
            formData.append('existingFiles', JSON.stringify(existingFiles));
            
            files.forEach(file => {
                formData.append('files', file);
            });

            const res = await fetch('/api/activity-submission', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                onSuccess();
            } else {
                const msg = await res.text();
                setError(msg || 'Erro ao enviar atividade.');
            }
        } catch (err) {
            setError('Erro de conexão.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-secondary/40 backdrop-blur-sm"
        >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="bg-gradient-to-r from-brand-secondary to-brand-primary p-6 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-tight">Prática: {activity.practice}</h3>
                            <p className="text-white/70 text-sm">{activity.theme}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <FileText size={18} className="text-brand-primary" /> Minha Resposta (Texto)
                        </label>
                        <textarea 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Escreva aqui sua reflexão, descrição da atividade ou texto solicitado..."
                            className="w-full h-40 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition resize-none bg-gray-50/50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                            <Upload size={18} className="text-brand-primary" /> Anexar Arquivos (Vídeos, Imagens, Documentos)
                        </label>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                            {existingFiles.map((file, i) => (
                                <div key={i} className="relative group bg-green-50 border border-green-100 p-3 rounded-xl flex flex-col items-center justify-center text-center">
                                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-1">
                                        {file.type.startsWith('video') ? <Video size={20} /> : <FileText size={20} />}
                                    </div>
                                    <span className="text-[10px] font-bold text-green-800 truncate w-full">{file.name}</span>
                                    <button 
                                        type="button"
                                        onClick={() => removeExistingFile(i)}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow-sm"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}

                            {files.map((file, i) => (
                                <div key={i} className="relative group bg-brand-primary/5 border border-brand-primary/10 p-3 rounded-xl flex flex-col items-center justify-center text-center">
                                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-1">
                                        {file.type.startsWith('video') ? <Video size={20} /> : <FileText size={20} />}
                                    </div>
                                    <span className="text-[10px] font-bold text-brand-secondary truncate w-full">{file.name}</span>
                                    <button 
                                        type="button"
                                        onClick={() => removeFile(i)}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow-sm"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}

                            <label className="border-2 border-dashed border-gray-200 hover:border-brand-primary hover:bg-brand-primary/5 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition text-gray-400 hover:text-brand-primary">
                                <Upload size={24} />
                                <span className="text-[10px] font-bold mt-1">Adicionar</span>
                                <input type="file" multiple onChange={handleFileChange} className="hidden" />
                            </label>
                        </div>
                        <p className="text-[10px] text-gray-400">Suporta vídeos, fotos e PDF. Limite de 50MB por arquivo.</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg transition-colors ${isPublic ? 'bg-brand-primary/10 text-brand-primary' : 'bg-gray-200 text-gray-400'}`}>
                                {isPublic ? <Globe size={20} /> : <Lock size={20} />}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-brand-secondary">{isPublic ? 'Modo Público' : 'Modo Privado'}</p>
                                <p className="text-[10px] text-gray-500">{isPublic ? 'Outros alunos poderão ver sua atividade' : 'Apenas os professores poderão ver'}</p>
                            </div>
                        </div>
                        <button 
                            type="button"
                            onClick={() => setIsPublic(!isPublic)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${isPublic ? 'bg-brand-primary' : 'bg-gray-300'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isPublic ? 'right-1' : 'left-1'}`} />
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-sm font-bold text-center bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}

                    <button 
                        disabled={isSubmitting}
                        className="w-full py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary/90 transition shadow-lg shadow-brand-primary/25 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={20} /> {activity.submission ? 'Atualizar Atividade' : 'Confirmar Envio'}</>}
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
}

