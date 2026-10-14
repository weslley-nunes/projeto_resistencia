'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { 
    ArrowLeft, LogOut, Shield, Search, FileText, CheckCircle2, 
    XCircle, Download, ExternalLink, Video, Clock, Filter, 
    FileSpreadsheet, Users, BookOpen, Map as MapIcon, Check, Eye, X, 
    ChevronRight, Sparkles, Layers, Award
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AULAS_CRONOGRAMA, TRILHAS_MODULOS, AulaPratica, TrilhaModulo } from '@/lib/activitiesData';

interface Student {
    id: string;
    name: string | null;
    email: string | null;
    city: string | null;
    school: string | null;
    status: string;
    role: string;
    image: string | null;
}

interface Submission {
    id: string;
    userId: string;
    classId: string | null;
    nodeId: string | null;
    moduleId: string | null;
    content: string | null;
    files: string;
    isPublic: boolean;
    createdAt: string;
}

interface ProgressRecord {
    userId: string;
    moduleId: string;
    nodeId: string;
    completedAt: string;
}

interface QuizRecord {
    id: string;
    userId: string;
    moduleId: string;
    score: number;
    passed: boolean;
    completedAt: string;
}

export default function AdminActivitiesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState<Student[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [userProgress, setUserProgress] = useState<ProgressRecord[]>([]);
    const [quizResults, setQuizResults] = useState<QuizRecord[]>([]);

    // Navigation and tab states
    const [mainTab, setMainTab] = useState<'aulas' | 'trilhas' | 'matriz'>('aulas');
    const [aulasModuleTab, setAulasModuleTab] = useState<'mod1' | 'mod2'>('mod1');
    const [selectedClassId, setSelectedClassId] = useState<string>('m1-1');
    const [selectedTrilhaId, setSelectedTrilhaId] = useState<'modulo1' | 'modulo2' | 'modulo3' | 'modulo4'>('modulo1');

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'ALL' | 'SUBMITTED' | 'PENDING'>('ALL');
    const [cityFilter, setCityFilter] = useState('');

    // Detail modal
    const [inspectedSubmission, setInspectedSubmission] = useState<{
        student: Student;
        submission?: Submission;
        activityTitle?: string;
    } | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        } else if (status === 'authenticated') {
            // @ts-ignore
            if (session.user?.role !== 'ADMIN') {
                router.push('/dashboard');
            } else {
                fetchOverviewData();
            }
        }
    }, [status, session]);

    const fetchOverviewData = async () => {
        try {
            const res = await fetch('/api/admin/activities/overview');
            if (res.ok) {
                const data = await res.json();
                setStudents(data.students || []);
                setSubmissions(data.submissions || []);
                setUserProgress(data.userProgress || []);
                setQuizResults(data.quizResults || []);
            }
        } catch (error) {
            console.error('Failed to fetch activities overview:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fast lookup maps
    const submissionsByClassAndUser = useMemo(() => {
        const map = new Map<string, Submission>();
        submissions.forEach(s => {
            if (s.classId) {
                map.set(`${s.classId}_${s.userId}`, s);
            }
        });
        return map;
    }, [submissions]);

    const progressByUserAndModule = useMemo(() => {
        const map = new Map<string, Set<string>>();
        userProgress.forEach(p => {
            const key = `${p.userId}_${p.moduleId}`;
            if (!map.has(key)) map.set(key, new Set());
            map.get(key)!.add(p.nodeId);
        });
        return map;
    }, [userProgress]);

    const quizByUserAndModule = useMemo(() => {
        const map = new Map<string, QuizRecord>();
        quizResults.forEach(q => {
            const key = `${q.userId}_${q.moduleId}`;
            if (!map.has(key)) map.set(key, q);
        });
        return map;
    }, [quizResults]);

    // Unique cities for filter
    const cities = useMemo(() => {
        const set = new Set<string>();
        students.forEach(s => {
            if (s.city) set.add(s.city);
        });
        return Array.from(set).sort();
    }, [students]);

    // Current selected aula info
    const currentAula = useMemo(() => {
        return AULAS_CRONOGRAMA.find(a => a.id === selectedClassId) || AULAS_CRONOGRAMA[0];
    }, [selectedClassId]);

    // Current selected trilha info
    const currentTrilha = useMemo(() => {
        return TRILHAS_MODULOS.find(t => t.id === selectedTrilhaId) || TRILHAS_MODULOS[0];
    }, [selectedTrilhaId]);

    // Stats for current aula
    const aulaStats = useMemo(() => {
        let submittedCount = 0;
        students.forEach(s => {
            if (submissionsByClassAndUser.has(`${selectedClassId}_${s.id}`)) {
                submittedCount++;
            }
        });
        const total = students.length;
        const pending = Math.max(0, total - submittedCount);
        const rate = total > 0 ? Math.round((submittedCount / total) * 100) : 0;
        return { total, submittedCount, pending, rate };
    }, [students, selectedClassId, submissionsByClassAndUser]);

    // Stats for current trilha
    const trilhaStats = useMemo(() => {
        const total = students.length;
        const totalNodes = currentTrilha.nodes.length;
        let completedTrailCount = 0;
        let inProgressCount = 0;
        let quizPassedCount = 0;
        let quizFailedCount = 0;

        students.forEach(s => {
            const nodesSet = progressByUserAndModule.get(`${s.id}_${currentTrilha.id}`);
            const count = nodesSet?.size || 0;
            if (count >= totalNodes) {
                completedTrailCount++;
            } else if (count > 0) {
                inProgressCount++;
            }

            const quiz = quizByUserAndModule.get(`${s.id}_${currentTrilha.id}`);
            if (quiz) {
                if (quiz.passed) quizPassedCount++;
                else quizFailedCount++;
            }
        });

        const trailRate = total > 0 ? Math.round((completedTrailCount / total) * 100) : 0;
        return { total, totalNodes, completedTrailCount, inProgressCount, quizPassedCount, quizFailedCount, trailRate };
    }, [students, currentTrilha, progressByUserAndModule, quizByUserAndModule]);

    // Filtered students for selected aula
    const filteredStudentsForAula = useMemo(() => {
        return students.filter(student => {
            const sub = submissionsByClassAndUser.get(`${selectedClassId}_${student.id}`);
            const isSubmitted = !!sub;

            if (statusFilter === 'SUBMITTED' && !isSubmitted) return false;
            if (statusFilter === 'PENDING' && isSubmitted) return false;

            if (cityFilter && student.city !== cityFilter) return false;

            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                const matchName = student.name?.toLowerCase().includes(term);
                const matchEmail = student.email?.toLowerCase().includes(term);
                const matchSchool = student.school?.toLowerCase().includes(term);
                if (!matchName && !matchEmail && !matchSchool) return false;
            }

            return true;
        });
    }, [students, selectedClassId, submissionsByClassAndUser, statusFilter, cityFilter, searchTerm]);

    // Filtered students for selected trilha
    const filteredStudentsForTrilha = useMemo(() => {
        return students.filter(student => {
            const nodesSet = progressByUserAndModule.get(`${student.id}_${currentTrilha.id}`);
            const count = nodesSet?.size || 0;
            const isComplete = count >= currentTrilha.nodes.length;
            const quiz = quizByUserAndModule.get(`${student.id}_${currentTrilha.id}`);

            if (statusFilter === 'SUBMITTED' && !isComplete) return false;
            if (statusFilter === 'PENDING' && isComplete) return false;

            if (cityFilter && student.city !== cityFilter) return false;

            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                const matchName = student.name?.toLowerCase().includes(term);
                const matchEmail = student.email?.toLowerCase().includes(term);
                const matchSchool = student.school?.toLowerCase().includes(term);
                if (!matchName && !matchEmail && !matchSchool) return false;
            }

            return true;
        });
    }, [students, currentTrilha, progressByUserAndModule, quizByUserAndModule, statusFilter, cityFilter, searchTerm]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-brand-secondary">
                <div className="w-12 h-12 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin mb-4" />
                <p className="font-bold text-lg">Carregando painel de controle pedagógico...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-16">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-xs">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin" 
                            className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-500 hover:text-brand-secondary"
                            title="Voltar ao Painel Geral"
                        >
                            <ArrowLeft size={22} />
                        </Link>
                        <div>
                            <h1 className="text-xl font-black text-brand-secondary flex items-center gap-2">
                                <Shield className="text-brand-primary" size={22} />
                                Controle de Atividades e Trilhas
                            </h1>
                            <p className="text-xs text-gray-500">Monitoramento pedagógico, envios e emissão de relatórios Excel</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="/api/admin/activities/export?type=matrix"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition hover:scale-102"
                            title="Baixar planilha com todas as atividades e trilhas cruzadas"
                        >
                            <FileSpreadsheet size={16} />
                            Baixar Matriz Completa (.xlsx)
                        </a>

                        <button 
                            onClick={() => signOut({ callbackUrl: '/' })} 
                            className="text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition"
                            title="Encerrar Sessão"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
                
                {/* Main Tabs Navigation */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-2.5 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => { setMainTab('aulas'); setStatusFilter('ALL'); }}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                                mainTab === 'aulas'
                                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <BookOpen size={18} />
                            Aulas Práticas ({AULAS_CRONOGRAMA.length})
                        </button>

                        <button
                            onClick={() => { setMainTab('trilhas'); setStatusFilter('ALL'); }}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                                mainTab === 'trilhas'
                                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <MapIcon size={18} />
                            Trilhas de Aprendizagem ({TRILHAS_MODULOS.length})
                        </button>

                        <button
                            onClick={() => setMainTab('matriz')}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                                mainTab === 'matriz'
                                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <Layers size={18} />
                            Matriz Consolidada
                        </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-xl">
                        <Users size={16} className="text-brand-primary" />
                        <span>Total de Cursistas Ativos: <strong className="text-gray-800">{students.length}</strong></span>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* TAB 1: AULAS PRÁTICAS DO CRONOGRAMA                            */}
                {/* ============================================================== */}
                {mainTab === 'aulas' && (
                    <div className="space-y-6">
                        {/* Module Subtabs */}
                        <div className="flex gap-2 border-b border-gray-200 pb-2">
                            <button
                                onClick={() => {
                                    setAulasModuleTab('mod1');
                                    setSelectedClassId('m1-1');
                                }}
                                className={`px-5 py-2 font-bold text-sm rounded-xl transition ${
                                    aulasModuleTab === 'mod1'
                                        ? 'bg-brand-secondary text-white shadow-sm'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Módulo 1 (10 Aulas)
                            </button>
                            <button
                                onClick={() => {
                                    setAulasModuleTab('mod2');
                                    setSelectedClassId('m2-0');
                                }}
                                className={`px-5 py-2 font-bold text-sm rounded-xl transition ${
                                    aulasModuleTab === 'mod2'
                                        ? 'bg-brand-secondary text-white shadow-sm'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Módulo 2 (8 Aulas)
                            </button>
                        </div>

                        {/* Activities Cards Carousel / Selector */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {AULAS_CRONOGRAMA.filter(a => a.moduloId === aulasModuleTab).map(aula => {
                                const isSelected = selectedClassId === aula.id;
                                let count = 0;
                                students.forEach(s => {
                                    if (submissionsByClassAndUser.has(`${aula.id}_${s.id}`)) count++;
                                });
                                const rate = students.length > 0 ? Math.round((count / students.length) * 100) : 0;

                                return (
                                    <button
                                        key={aula.id}
                                        onClick={() => setSelectedClassId(aula.id)}
                                        className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                                            isSelected
                                                ? 'bg-brand-primary text-white border-brand-primary shadow-lg scale-102 ring-2 ring-brand-primary/20'
                                                : 'bg-white text-gray-700 border-gray-100 hover:border-brand-primary/40 hover:bg-gray-50/80 shadow-xs'
                                        }`}
                                    >
                                        <div>
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                    {aula.date}
                                                </span>
                                                <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-brand-primary'}`}>
                                                    {count}/{students.length}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-xs leading-snug line-clamp-2 mb-1">
                                                {aula.practice}
                                            </h4>
                                            <p className={`text-[10px] line-clamp-1 ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                                                {aula.theme}
                                            </p>
                                        </div>

                                        <div className="w-full bg-black/10 rounded-full h-1.5 mt-3 overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full transition-all duration-500 ${isSelected ? 'bg-white' : 'bg-green-500'}`}
                                                style={{ width: `${rate}%` }}
                                            />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Selected Activity Detail & Actions Header */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-gray-100">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2.5 py-1 bg-brand-primary/10 text-brand-primary font-bold text-xs rounded-lg uppercase">
                                            {currentAula.id.toUpperCase()} • {currentAula.date}
                                        </span>
                                        {currentAula.videoUrl && (
                                            <a 
                                                href={currentAula.videoUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded-lg transition"
                                            >
                                                <Video size={12} /> Ver Gravação da Live
                                            </a>
                                        )}
                                    </div>
                                    <h2 className="text-2xl font-black text-brand-secondary">
                                        {currentAula.practice}
                                    </h2>
                                    <p className="text-gray-500 text-sm mt-1">
                                        <strong>Tema da Aula:</strong> {currentAula.theme} {currentAula.host !== '---' && `• Convidado: ${currentAula.host}`}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                                    <a
                                        href={`/api/admin/activities/export?type=activity&id=${currentAula.id}`}
                                        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-green-600/20 transition hover:scale-102"
                                        title="Baixar lista de alunos e envios desta atividade em Excel"
                                    >
                                        <Download size={16} />
                                        Baixar Esta Atividade (.xlsx)
                                    </a>
                                </div>
                            </div>

                            {/* KPI Metrics Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                    <p className="text-xs text-gray-500 font-medium">Cursistas Habilitados</p>
                                    <p className="text-2xl font-black text-gray-800 mt-1">{aulaStats.total}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                                    <p className="text-xs text-green-700 font-medium flex items-center gap-1">
                                        <CheckCircle2 size={14} /> Atividades Entregues
                                    </p>
                                    <p className="text-2xl font-black text-green-700 mt-1">{aulaStats.submittedCount}</p>
                                </div>
                                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                                    <p className="text-xs text-amber-700 font-medium flex items-center gap-1">
                                        <Clock size={14} /> Entregas Pendentes
                                    </p>
                                    <p className="text-2xl font-black text-amber-700 mt-1">{aulaStats.pending}</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                                    <p className="text-xs text-blue-700 font-medium">Taxa de Conclusão</p>
                                    <p className="text-2xl font-black text-blue-700 mt-1">{aulaStats.rate}%</p>
                                </div>
                            </div>

                            {/* Filter Bar */}
                            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pt-2">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setStatusFilter('ALL')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                            statusFilter === 'ALL'
                                                ? 'bg-brand-secondary text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        Todos ({aulaStats.total})
                                    </button>
                                    <button
                                        onClick={() => setStatusFilter('SUBMITTED')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                            statusFilter === 'SUBMITTED'
                                                ? 'bg-green-600 text-white'
                                                : 'bg-green-50 text-green-700 hover:bg-green-100'
                                        }`}
                                    >
                                        ✅ Entregues ({aulaStats.submittedCount})
                                    </button>
                                    <button
                                        onClick={() => setStatusFilter('PENDING')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                            statusFilter === 'PENDING'
                                                ? 'bg-amber-600 text-white'
                                                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                                        }`}
                                    >
                                        ⏳ Pendentes ({aulaStats.pending})
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Buscar cursista..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-9 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-primary/50 outline-none w-full sm:w-56"
                                        />
                                    </div>

                                    <select
                                        value={cityFilter}
                                        onChange={(e) => setCityFilter(e.target.value)}
                                        className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-primary/50 outline-none bg-white font-medium"
                                    >
                                        <option value="">Todas as Cidades</option>
                                        {cities.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Students Table for the Activity */}
                            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50/80 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Cursista</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Data do Envio</th>
                                            <th className="px-6 py-4">Resposta / Arquivos</th>
                                            <th className="px-6 py-4 text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredStudentsForAula.map(student => {
                                            const sub = submissionsByClassAndUser.get(`${currentAula.id}_${student.id}`);
                                            const isSubmitted = !!sub;
                                            const files = sub?.files ? JSON.parse(sub.files) : [];

                                            return (
                                                <tr key={student.id} className="hover:bg-gray-50/80 transition">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-full bg-brand-primary/10 text-brand-primary font-bold flex items-center justify-center text-xs overflow-hidden">
                                                                {student.image ? (
                                                                    <img src={student.image} alt="" className="w-full h-full object-cover" />
                                                                ) : (
                                                                    (student.name?.[0] || 'U').toUpperCase()
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-800 leading-tight">{student.name || 'Sem Nome'}</p>
                                                                <p className="text-xs text-gray-400">{student.email}</p>
                                                                <p className="text-[11px] text-brand-secondary/80 font-medium mt-0.5">
                                                                    {student.city || 'Sem cidade'} {student.school && `• ${student.school}`}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        {isSubmitted ? (
                                                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full">
                                                                <CheckCircle2 size={13} /> ENTREGUE
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-2.5 py-1 rounded-full">
                                                                <Clock size={13} /> PENDENTE
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4 text-xs text-gray-500">
                                                        {sub?.createdAt ? new Date(sub.createdAt).toLocaleString('pt-BR') : '-'}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        {isSubmitted ? (
                                                            <div className="max-w-xs space-y-1.5">
                                                                {sub.content && (
                                                                    <p className="text-xs text-gray-600 line-clamp-1 italic">
                                                                        "{sub.content}"
                                                                    </p>
                                                                )}
                                                                <div className="flex flex-wrap gap-1">
                                                                    {files.map((file: any, i: number) => (
                                                                        <a
                                                                            key={i}
                                                                            href={file.url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="inline-flex items-center gap-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold px-2 py-0.5 rounded-md hover:bg-brand-primary/20 transition"
                                                                        >
                                                                            {file.type?.startsWith('video') ? <Video size={10} /> : <FileText size={10} />}
                                                                            {file.name || 'Anexo'}
                                                                        </a>
                                                                    ))}
                                                                    {files.length === 0 && !sub.content && (
                                                                        <span className="text-xs text-gray-400">Entrega sem arquivos</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-gray-400 italic">Ainda não enviou</span>
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4 text-right">
                                                        {isSubmitted ? (
                                                            <button
                                                                onClick={() => setInspectedSubmission({
                                                                    student,
                                                                    submission: sub,
                                                                    activityTitle: currentAula.practice
                                                                })}
                                                                className="inline-flex items-center gap-1 bg-brand-secondary text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-brand-secondary/90 transition shadow-xs"
                                                            >
                                                                <Eye size={13} /> Ver Entrega
                                                            </button>
                                                        ) : (
                                                            <span className="text-xs text-gray-300">-</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                        {filteredStudentsForAula.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="py-12 text-center text-gray-400">
                                                    Nenhum cursista encontrado para os filtros selecionados.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* TAB 2: TRILHAS DE APRENDIZAGEM (GAME MAP & QUIZZES)            */}
                {/* ============================================================== */}
                {mainTab === 'trilhas' && (
                    <div className="space-y-6">
                        {/* Trails Selector Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {TRILHAS_MODULOS.map(trilha => {
                                const isSelected = selectedTrilhaId === trilha.id;
                                let completedCount = 0;
                                students.forEach(s => {
                                    const nodesSet = progressByUserAndModule.get(`${s.id}_${trilha.id}`);
                                    if ((nodesSet?.size || 0) >= trilha.nodes.length) completedCount++;
                                });
                                const rate = students.length > 0 ? Math.round((completedCount / students.length) * 100) : 0;

                                return (
                                    <button
                                        key={trilha.id}
                                        onClick={() => setSelectedTrilhaId(trilha.id)}
                                        className={`p-5 rounded-3xl text-left border transition-all flex flex-col justify-between ${
                                            isSelected
                                                ? 'bg-brand-secondary text-white border-brand-secondary shadow-lg scale-102 ring-2 ring-brand-secondary/20'
                                                : 'bg-white text-gray-700 border-gray-100 hover:border-brand-primary/40 hover:bg-gray-50/80 shadow-xs'
                                        }`}
                                    >
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                    Etapa 0{trilha.numero}
                                                </span>
                                                <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-brand-primary'}`}>
                                                    {completedCount}/{students.length} concluintes
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-base leading-tight mb-1">{trilha.title}</h3>
                                            <p className={`text-xs line-clamp-2 ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                                                {trilha.subtitle}
                                            </p>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-white/10 w-full">
                                            <div className="flex justify-between text-[11px] font-semibold mb-1">
                                                <span>Conclusão geral</span>
                                                <span>{rate}%</span>
                                            </div>
                                            <div className="w-full bg-black/10 rounded-full h-1.5 overflow-hidden">
                                                <div 
                                                    className="h-full bg-green-400 rounded-full transition-all duration-500"
                                                    style={{ width: `${rate}%` }}
                                                />
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Selected Trail Details & Actions */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-gray-100">
                                <div>
                                    <span className="px-2.5 py-1 bg-brand-primary/10 text-brand-primary font-bold text-xs rounded-lg uppercase">
                                        Trilha Educacional • Etapa 0{currentTrilha.numero}
                                    </span>
                                    <h2 className="text-2xl font-black text-brand-secondary mt-1">
                                        {currentTrilha.title}
                                    </h2>
                                    <p className="text-gray-500 text-sm mt-0.5">
                                        {currentTrilha.subtitle} • Total de Nós: <strong>{currentTrilha.nodes.length}</strong>
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                                    <a
                                        href={`/api/admin/activities/export?type=trail&id=${currentTrilha.id}`}
                                        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-green-600/20 transition hover:scale-102"
                                        title="Baixar lista completa desta trilha em Excel"
                                    >
                                        <Download size={16} />
                                        Baixar Esta Trilha (.xlsx)
                                    </a>
                                </div>
                            </div>

                            {/* Trail KPI Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                                    <p className="text-xs text-green-700 font-medium flex items-center gap-1">
                                        <CheckCircle2 size={14} /> Trilha 100% Concluída
                                    </p>
                                    <p className="text-2xl font-black text-green-700 mt-1">{trilhaStats.completedTrailCount}</p>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                                    <p className="text-xs text-blue-700 font-medium">Em Andamento</p>
                                    <p className="text-2xl font-black text-blue-700 mt-1">{trilhaStats.inProgressCount}</p>
                                </div>

                                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                                    <p className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                                        <Award size={14} /> Aprovados na Prova Final
                                    </p>
                                    <p className="text-2xl font-black text-emerald-700 mt-1">{trilhaStats.quizPassedCount}</p>
                                </div>

                                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                                    <p className="text-xs text-amber-700 font-medium">Prova Pendente / Reprovada</p>
                                    <p className="text-2xl font-black text-amber-700 mt-1">
                                        {students.length - trilhaStats.quizPassedCount}
                                    </p>
                                </div>
                            </div>

                            {/* Nodes Preview Badges */}
                            <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-100">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nós desta Trilha:</p>
                                <div className="flex flex-wrap gap-2">
                                    {currentTrilha.nodes.map((node, i) => (
                                        <span key={node.id} className="inline-flex items-center gap-1 bg-white border border-gray-200 px-3 py-1 rounded-lg text-xs font-semibold text-gray-700 shadow-2xs">
                                            <span className="w-4 h-4 rounded-full bg-brand-primary text-white text-[10px] flex items-center justify-center font-bold">
                                                {i + 1}
                                            </span>
                                            {node.title}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Filter Bar */}
                            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pt-2">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setStatusFilter('ALL')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                            statusFilter === 'ALL'
                                                ? 'bg-brand-secondary text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        Todos ({students.length})
                                    </button>
                                    <button
                                        onClick={() => setStatusFilter('SUBMITTED')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                            statusFilter === 'SUBMITTED'
                                                ? 'bg-green-600 text-white'
                                                : 'bg-green-50 text-green-700 hover:bg-green-100'
                                        }`}
                                    >
                                        ✅ Concluídos ({trilhaStats.completedTrailCount})
                                    </button>
                                    <button
                                        onClick={() => setStatusFilter('PENDING')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                            statusFilter === 'PENDING'
                                                ? 'bg-amber-600 text-white'
                                                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                                        }`}
                                    >
                                        ⏳ Em Andamento / Pendentes ({students.length - trilhaStats.completedTrailCount})
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Buscar cursista..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-9 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-primary/50 outline-none w-full sm:w-56"
                                        />
                                    </div>

                                    <select
                                        value={cityFilter}
                                        onChange={(e) => setCityFilter(e.target.value)}
                                        className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-primary/50 outline-none bg-white font-medium"
                                    >
                                        <option value="">Todas as Cidades</option>
                                        {cities.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Students Table for the Trail */}
                            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50/80 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Cursista</th>
                                            <th className="px-6 py-4">Progresso na Trilha</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Prova Final</th>
                                            <th className="px-6 py-4 text-right">Data Prova</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredStudentsForTrilha.map(student => {
                                            const nodesSet = progressByUserAndModule.get(`${student.id}_${currentTrilha.id}`);
                                            const count = nodesSet?.size || 0;
                                            const total = currentTrilha.nodes.length;
                                            const isComplete = count >= total;
                                            const percent = Math.round((count / total) * 100);
                                            const quiz = quizByUserAndModule.get(`${student.id}_${currentTrilha.id}`);

                                            return (
                                                <tr key={student.id} className="hover:bg-gray-50/80 transition">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-full bg-brand-secondary/10 text-brand-secondary font-bold flex items-center justify-center text-xs overflow-hidden">
                                                                {student.image ? (
                                                                    <img src={student.image} alt="" className="w-full h-full object-cover" />
                                                                ) : (
                                                                    (student.name?.[0] || 'U').toUpperCase()
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-800 leading-tight">{student.name || 'Sem Nome'}</p>
                                                                <p className="text-xs text-gray-400">{student.email}</p>
                                                                <p className="text-[11px] text-brand-secondary/80 font-medium mt-0.5">
                                                                    {student.city || 'Sem cidade'} {student.school && `• ${student.school}`}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <div className="w-48 space-y-1">
                                                            <div className="flex justify-between text-xs font-semibold text-gray-700">
                                                                <span>{count} de {total} nós</span>
                                                                <span>{percent}%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                                                <div 
                                                                    className={`h-full rounded-full transition-all duration-300 ${
                                                                        isComplete ? 'bg-green-500' : 'bg-brand-primary'
                                                                    }`}
                                                                    style={{ width: `${percent}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        {isComplete ? (
                                                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full">
                                                                <CheckCircle2 size={13} /> CONCLUÍDO
                                                            </span>
                                                        ) : count > 0 ? (
                                                            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-2.5 py-1 rounded-full">
                                                                EM ANDAMENTO
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 text-xs font-bold px-2.5 py-1 rounded-full">
                                                                NÃO INICIADO
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        {quiz ? (
                                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                                                quiz.passed 
                                                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                                                    : 'bg-red-100 text-red-800 border border-red-200'
                                                            }`}>
                                                                <Award size={13} /> {quiz.score}% ({quiz.passed ? 'APROVADO' : 'REPROVADO'})
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs text-gray-400 italic">Não realizada</span>
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4 text-right text-xs text-gray-500">
                                                        {quiz?.completedAt ? new Date(quiz.completedAt).toLocaleDateString('pt-BR') : '-'}
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                        {filteredStudentsForTrilha.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="py-12 text-center text-gray-400">
                                                    Nenhum cursista encontrado para os filtros selecionados.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* TAB 3: MATRIZ GERAL CONSOLIDADA (PLANILHA COMPLETA)           */}
                {/* ============================================================== */}
                {mainTab === 'matriz' && (
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-100">
                            <div>
                                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-lg uppercase">
                                    Visão Global • Matriz Geral
                                </span>
                                <h2 className="text-2xl font-black text-brand-secondary mt-1">
                                    Matriz de Acompanhamento Consolidada
                                </h2>
                                <p className="text-gray-500 text-sm mt-0.5">
                                    Acompanhe o status de todas as 18 aulas práticas e das 4 trilhas para cada um dos cursistas matriculados.
                                </p>
                            </div>

                            <a
                                href="/api/admin/activities/export?type=matrix"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/25 transition hover:scale-102"
                            >
                                <FileSpreadsheet size={18} />
                                Baixar Matriz Completa (.xlsx)
                            </a>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                            <div className="relative w-full sm:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Buscar por nome ou e-mail..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-primary/50 outline-none w-full"
                                />
                            </div>

                            <select
                                value={cityFilter}
                                onChange={(e) => setCityFilter(e.target.value)}
                                className="px-4 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-primary/50 outline-none bg-white font-medium"
                            >
                                <option value="">Todas as Cidades</option>
                                {cities.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        {/* Matrix Table */}
                        <div className="border border-gray-100 rounded-2xl overflow-x-auto shadow-xs">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider">
                                    <tr>
                                        <th className="px-4 py-3 sticky left-0 bg-gray-50 z-10 min-w-[200px]">Cursista</th>
                                        <th className="px-4 py-3 min-w-[120px]">Cidade</th>
                                        <th className="px-4 py-3 text-center min-w-[90px]">Total Aulas</th>
                                        {AULAS_CRONOGRAMA.map(a => (
                                            <th key={a.id} className="px-2 py-3 text-center min-w-[55px]" title={`${a.id}: ${a.practice}`}>
                                                {a.id}
                                            </th>
                                        ))}
                                        {TRILHAS_MODULOS.map(t => (
                                            <th key={t.id} className="px-3 py-3 text-center min-w-[90px] bg-brand-secondary/5 text-brand-secondary" title={t.title}>
                                                Trilha {t.numero}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {students
                                        .filter(s => {
                                            if (cityFilter && s.city !== cityFilter) return false;
                                            if (searchTerm) {
                                                const term = searchTerm.toLowerCase();
                                                return s.name?.toLowerCase().includes(term) || s.email?.toLowerCase().includes(term);
                                            }
                                            return true;
                                        })
                                        .map(student => {
                                            let totalEntregas = 0;
                                            AULAS_CRONOGRAMA.forEach(a => {
                                                if (submissionsByClassAndUser.has(`${a.id}_${student.id}`)) totalEntregas++;
                                            });

                                            return (
                                                <tr key={student.id} className="hover:bg-gray-50 transition">
                                                    <td className="px-4 py-3 font-bold text-gray-800 sticky left-0 bg-white shadow-xs">
                                                        <p className="truncate max-w-[180px]">{student.name || 'Sem Nome'}</p>
                                                        <p className="text-[10px] text-gray-400 font-normal truncate max-w-[180px]">{student.email}</p>
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-500">{student.city || '-'}</td>
                                                    <td className="px-4 py-3 text-center font-bold text-brand-primary">
                                                        {totalEntregas}/{AULAS_CRONOGRAMA.length}
                                                    </td>

                                                    {/* Columns for each class */}
                                                    {AULAS_CRONOGRAMA.map(a => {
                                                        const isDone = submissionsByClassAndUser.has(`${a.id}_${student.id}`);
                                                        return (
                                                            <td key={a.id} className="px-2 py-3 text-center">
                                                                {isDone ? (
                                                                    <span className="inline-flex w-5 h-5 rounded-full bg-green-100 text-green-700 items-center justify-center font-bold text-[10px]" title={`Entregue em ${a.id}`}>
                                                                        ✓
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-block w-2 h-2 rounded-full bg-gray-200" title={`Pendente ${a.id}`} />
                                                                )}
                                                            </td>
                                                        );
                                                    })}

                                                    {/* Columns for trails */}
                                                    {TRILHAS_MODULOS.map(t => {
                                                        const nodesSet = progressByUserAndModule.get(`${student.id}_${t.id}`);
                                                        const count = nodesSet?.size || 0;
                                                        const isComplete = count >= t.nodes.length;
                                                        const quiz = quizByUserAndModule.get(`${student.id}_${t.id}`);

                                                        return (
                                                            <td key={t.id} className="px-3 py-3 text-center bg-brand-secondary/[0.02]">
                                                                <div className="flex flex-col items-center gap-0.5">
                                                                    <span className={`text-[10px] font-bold ${isComplete ? 'text-green-600' : 'text-gray-400'}`}>
                                                                        {count}/{t.nodes.length}
                                                                    </span>
                                                                    {quiz && (
                                                                        <span className={`text-[9px] font-bold px-1 rounded ${quiz.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                                            {quiz.score}%
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* INSPECTION MODAL */}
            <AnimatePresence>
                {inspectedSubmission && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                        >
                            <div className="bg-brand-secondary p-6 text-white flex justify-between items-center">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent">Detalhes da Entrega</span>
                                    <h3 className="text-xl font-bold">{inspectedSubmission.activityTitle || 'Atividade Prática'}</h3>
                                    <p className="text-xs text-white/70 mt-0.5">
                                        Cursista: <strong>{inspectedSubmission.student.name}</strong> ({inspectedSubmission.student.email})
                                    </p>
                                </div>
                                <button
                                    onClick={() => setInspectedSubmission(null)}
                                    className="p-2 hover:bg-white/10 rounded-full transition text-white/80 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1">
                                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
                                    <div>
                                        <p className="text-gray-400 font-medium">Cidade / Escola:</p>
                                        <p className="font-bold text-gray-800">
                                            {inspectedSubmission.student.city || '-'} {inspectedSubmission.student.school && `• ${inspectedSubmission.student.school}`}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 font-medium">Data do Envio:</p>
                                        <p className="font-bold text-gray-800">
                                            {inspectedSubmission.submission?.createdAt 
                                                ? new Date(inspectedSubmission.submission.createdAt).toLocaleString('pt-BR') 
                                                : '-'}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                                        <FileText size={16} className="text-brand-primary" /> Resposta em Texto:
                                    </h4>
                                    {inspectedSubmission.submission?.content ? (
                                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                            {inspectedSubmission.submission.content}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-400 italic">Nenhum texto redigido.</p>
                                    )}
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                                        <Download size={16} className="text-brand-primary" /> Arquivos Anexados:
                                    </h4>
                                    {(() => {
                                        const files = inspectedSubmission.submission?.files 
                                            ? JSON.parse(inspectedSubmission.submission.files) 
                                            : [];
                                        
                                        if (files.length === 0) {
                                            return <p className="text-xs text-gray-400 italic">Nenhum arquivo anexado.</p>;
                                        }

                                        return (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {files.map((file: any, idx: number) => (
                                                    <a
                                                        key={idx}
                                                        href={file.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-3 p-3.5 bg-brand-primary/5 border border-brand-primary/20 rounded-2xl hover:bg-brand-primary/10 transition group"
                                                    >
                                                        <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center shrink-0">
                                                            {file.type?.startsWith('video') ? <Video size={18} /> : <FileText size={18} />}
                                                        </div>
                                                        <div className="overflow-hidden flex-1">
                                                            <p className="font-bold text-xs text-brand-secondary truncate group-hover:text-brand-primary transition">
                                                                {file.name || `Arquivo ${idx + 1}`}
                                                            </p>
                                                            <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                                                                Clique para abrir <ExternalLink size={10} />
                                                            </span>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={() => setInspectedSubmission(null)}
                                    className="px-6 py-2.5 bg-gray-200 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-300 transition"
                                >
                                    Fechar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
