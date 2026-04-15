'use client';

import { PlayCircle, Calendar, Users, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const MODULO1 = [
    { date: "26/03", theme: "Aula Inaugural: Apresentação do curso e do AVA", qa: "---", host: "WESLEY MUNIZ", practice: "Familiarização com a plataforma", videoUrl: "https://youtu.be/YsXhn3DVBP8" },
    { date: "09/04", theme: "Direito à memória", qa: "Quinta-feira, 19h", host: "Cristiane Loriza Dantas PUC-Goiás", practice: "Levantamento de memórias locais", videoUrl: "https://youtu.be/RxLDTQeF5Rg" },
    { date: "23/04", theme: "Memória e Paisagem", qa: "Quinta-feira, 19h", host: "Marianne Salun UNIFESP", practice: "Registro fotográfico de paisagens culturais" },
    { date: "07/05", theme: "Educação patrimonial no contexto regional", qa: "Quinta-feira, 19h", host: "Bianka Cristina Dias Alves UEG/PARFOR", practice: "Pesquisa sobre patrimônio local" },
    { date: "21/05", theme: "Participação da comunidade na gestão do patrimônio", qa: "Quinta-feira, 19h", host: "Paulo Campos UFMG", practice: "Entrevista com liderança local" },
    { date: "03/06", theme: "Diversidade e Patrimônio: saberes e fazeres tradicionais", qa: "Quinta-feira, 19h", host: "Luana Rodrigues UFMG", practice: "Planejamento de oficina com mestre" },
    { date: "18/06", theme: "Diversidade e Patrimônio: lugares e objetos", qa: "Quinta-feira, 19h", host: "Luana Campos UFMT", practice: "Mapeamento de locais de memória" },
    { date: "18/06 a 30/06", theme: "Oficinas práticas (20h)", qa: "Acompanhamento tutor/articulador", host: "---", practice: "Oficinas de artes e ofícios" },
    { date: "18/06 a 30/06", theme: "Contação de histórias (15h)", qa: "Acompanhamento tutor/articulador", host: "---", practice: "Produção de podcast/vídeo" },
    { date: "18/06 a 30/06", theme: "Roteiros culturais (20h)", qa: "Acompanhamento tutor/articulador", host: "---", practice: "Desenvolvimento de roteiro educativo" },
];

const MODULO2 = [
    { date: "06/08", theme: "Arte-educação e patrimônio", qa: "Quinta-feira, 19h", host: "Emicleia Alves Pinheiro IFG", practice: "Projeto de intervenção artística" },
    { date: "20/08", theme: "Educação Museal e Curadoria", qa: "Quinta-feira, 19h", host: "Henrique de Freitas - idealizador Museu Zoroastra Goiânia", practice: "Planejamento de exposição virtual" },
    { date: "03/09", theme: "Inventários participativos", qa: "Quinta-feira, 19h", host: "Aline UNICAMP", practice: "Elaboração de inventário local" },
    { date: "17/09", theme: "Educação patrimonial e tecnologias", qa: "Quinta-feira, 19h", host: "Daniel Corrêa UEG", practice: "Criação de conteúdo digital" },
    { date: "01/10", theme: "Educação patrimonial e turística", qa: "Quinta-feira, 19h", host: "Beatriz Couto / Gestora Pública em arquitetura e patrimônio", practice: "Roteiro turístico-cultural" },
    { date: "02/10 a 30/11", theme: "Curadoria de Exposição (20h)", qa: "Acompanhamento tutor articulador", host: "---", practice: "Montagem de exposição na escola" },
    { date: "02/10 a 30/11", theme: "Festival Cultural Temático (20h)", qa: "Acompanhamento tutor articulador", host: "---", practice: "Organização do evento" },
    { date: "02/10 a 30/11", theme: "Elaboração de material didático (20h)", qa: "Acompanhamento tutor articulador", host: "---", practice: "Produção de livro, podcast ou jogo educativo" },
];

export default function AulasPage() {
    const [activeTab, setActiveTab] = useState<'mod1' | 'mod2'>('mod1');

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
            
            <div className="flex gap-2 p-1 bg-gray-100/50 rounded-2xl w-full max-w-md mx-auto relative z-10 p-1">
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
                            {(activeTab === 'mod1' ? MODULO1 : MODULO2).map((item, index) => (
                                <tr key={index} className="hover:bg-brand-secondary/5 transition-colors group">
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
                                        <div className="flex items-start gap-2 bg-yellow-50 text-yellow-800 p-3 rounded-xl border border-yellow-100">
                                            <BookOpen size={16} className="shrink-0 mt-0.5 text-yellow-600" />
                                            <span className="font-medium">{item.practice}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-sm">
                <AlertCircle size={20} className="shrink-0 text-blue-600" />
                <p>Os links das aulas ao vivo serão enviados por Google Meet. As aulas gravadas ficarão disponíveis nesta página alguns dias após a transmissão original.</p>
            </div>
        </div>
    );
}
