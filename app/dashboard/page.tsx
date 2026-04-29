'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import GameMap from '@/components/GameMap';
import { mapNodes as nodesM1, quizQuestions as quizM1 } from '@/app/modulo1/data';
import { mapNodes as nodesM2, quizQuestions as quizM2 } from '@/app/modulo2/data';
import { mapNodes as nodesM3, quizQuestions as quizM3 } from '@/app/modulo3/data';
import { useGameStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, X, Lock, MapPin } from 'lucide-react';
import QuizModal from '@/components/QuizModal';
import ActivitySubmissionForm from '@/components/ActivitySubmissionForm';
import { MapNode } from '@/app/modulo1/data'; // Importing type

export default function DashboardPage() {
    const { data: session } = useSession();
    const router = useRouter();

    // Redirect Admin
    useEffect(() => {
        // @ts-ignore
        if (session?.user?.role === 'ADMIN') {
            router.push('/admin');
        }
    }, [session, router]);

    // Game Store State
    const completedNodes = useGameStore(state => state.completedNodes);
    const completeNode = useGameStore(state => state.completeNode);
    const addEducoins = useGameStore(state => state.addEducoins);
    const addXp = useGameStore(state => state.addXp);

    // Module State
    const [currentModule, setCurrentModule] = useState<'modulo1' | 'modulo2' | 'modulo3'>('modulo1');

    // Derived Data based on current module
    const currentNodes = currentModule === 'modulo1' ? nodesM1 : currentModule === 'modulo2' ? nodesM2 : nodesM3;
    const currentQuiz = currentModule === 'modulo1' ? quizM1 : currentModule === 'modulo2' ? quizM2 : quizM3;

    // Check if Module 1 is complete to unlock Module 2
    // Assuming 'node-final' is the id of the final node in Module 1
    const isModule1Complete = completedNodes.includes('etapa1-final'); // Final node of Etapa 01
    // Assuming 'm2-quiz-final' is the final node of Module 2
    const isModule2Complete = completedNodes.includes('m2-quiz-final');

    const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);

    const handleNodeClick = (node: MapNode) => {
        if (node.type === 'final') {
            setShowQuiz(true);
            setSelectedNode(node);
        } else {
            setSelectedNode(node);
            setCurrentSlideIndex(0);
        }
    };

    const handleNextSlide = () => {
        if (selectedNode && currentSlideIndex < selectedNode.slides.length - 1) {
            setCurrentSlideIndex(prev => prev + 1);
        } else {
            handleCompleteLesson();
        }
    };

    const handlePrevSlide = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(prev => prev - 1);
        }
    };

    const handleCompleteLesson = () => {
        if (selectedNode) {
            if (!completedNodes.includes(selectedNode.id)) {
                completeNode(selectedNode.id);
                addEducoins(selectedNode.educoinsReward);
                addXp(50);
            }
            setSelectedNode(null);
            setCurrentSlideIndex(0);
        }
    };

    const handleQuizComplete = async (percentage: number, passed: boolean) => {
        setShowQuiz(false);

        try {
            await fetch('/api/quiz/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    moduleId: currentModule,
                    score: Math.round(percentage),
                    passed
                })
            });
        } catch (error) {
            console.error('Failed to save quiz result', error);
        }

        if (passed && selectedNode) {
            if (!completedNodes.includes(selectedNode.id)) {
                completeNode(selectedNode.id);
                addEducoins(selectedNode.educoinsReward);
                addXp(200);
                alert(`Parabéns! Você passou com ${percentage.toFixed(0)}%.`);
            }
            setSelectedNode(null);

            // If finishing Module 1, user might want to go to Module 2 immediately, 
            // but we let them navigate via the timeline.
        } else if (!passed) {
            alert(`Você atingiu ${percentage.toFixed(0)}%. Precisa de 50% para passar.`);
            setSelectedNode(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold font-sans text-brand-secondary">Minha Jornada</h1>
                    <div className="flex gap-2">
                        {/* @ts-ignore */}
                        {session?.user?.role === 'ADMIN' && (
                            <Link href="/admin" className="px-4 py-2 bg-brand-secondary text-white font-bold rounded-lg border border-white/20 hover:bg-brand-secondary/80 transition">
                                Painel Admin
                            </Link>
                        )}
                        <div className="px-4 py-2 bg-brand-accent/20 text-brand-secondary font-bold rounded-lg border border-brand-accent/50">
                            {currentModule === 'modulo1' ? 'Etapa 01: Direito à Memória' : currentModule === 'modulo2' ? 'Etapa 02: Memória e Paisagem' : 'Etapa 03: Educação Patrimonial'}
                        </div>
                    </div>
                </div>

                {/* TIMELINE NAVIGATION */}
                <div className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 overflow-x-auto">
                    {/* Module 1 Step */}
                    <button
                        onClick={() => setCurrentModule('modulo1')}
                        className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all whitespace-nowrap
                            ${currentModule === 'modulo1'
                                ? 'bg-brand-primary text-white shadow-md scale-105'
                                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                            ${currentModule === 'modulo1' ? 'bg-white text-brand-primary' : 'bg-gray-200 text-gray-400'}`}>
                            1
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="font-bold text-sm">Etapa 01</span>
                            <span className="text-[10px] opacity-80">Direito à Memória</span>
                        </div>
                    </button>

                    <div className="h-0.5 w-8 bg-gray-200"></div>

                    {/* Module 2 Step */}
                    <button
                        onClick={() => isModule1Complete && setCurrentModule('modulo2')}
                        disabled={!isModule1Complete}
                        className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all whitespace-nowrap
                            ${currentModule === 'modulo2'
                                ? 'bg-brand-primary text-white shadow-md scale-105'
                                : isModule1Complete
                                    ? 'bg-gray-50 text-gray-600 hover:bg-gray-100 cursor-pointer'
                                    : 'bg-gray-50 text-gray-300 cursor-not-allowed opacity-60'}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                            ${currentModule === 'modulo2' ? 'bg-white text-brand-primary' : 'bg-gray-200 text-gray-400'}`}>
                            {isModule1Complete ? '2' : <Lock size={14} />}
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="font-bold text-sm">Etapa 02</span>
                            <span className="text-[10px] opacity-80">{isModule1Complete ? 'Memória e Paisagem' : 'Bloqueado'}</span>
                        </div>
                    </button>

                    <div className="h-0.5 w-8 bg-gray-200"></div>

                    {/* Module 3 Step */}
                    <button
                        onClick={() => isModule2Complete && setCurrentModule('modulo3')}
                        disabled={!isModule2Complete}
                        className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all whitespace-nowrap
                            ${currentModule === 'modulo3'
                                ? 'bg-brand-primary text-white shadow-md scale-105'
                                : isModule2Complete
                                    ? 'bg-gray-50 text-gray-600 hover:bg-gray-100 cursor-pointer'
                                    : 'bg-gray-50 text-gray-300 cursor-not-allowed opacity-60'}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                            ${currentModule === 'modulo3' ? 'bg-white text-brand-primary' : 'bg-gray-200 text-gray-400'}`}>
                            {isModule2Complete ? '3' : <Lock size={14} />}
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="font-bold text-sm">Etapa 03</span>
                            <span className="text-[10px] opacity-80">{isModule2Complete ? 'Educação Patrimonial' : 'Bloqueado'}</span>
                        </div>
                    </button>

                    <div className="h-0.5 w-8 bg-gray-200"></div>

                    {/* Future Modules... */}
                    <div className="flex items-center gap-2 opacity-40">
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                            <Lock size={14} className="text-gray-300" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Map */}
            <div className="w-full">
                <GameMap
                    nodes={currentNodes}
                    onNodeClick={handleNodeClick}
                    completedNodes={completedNodes}
                    backgroundImage={currentModule === 'modulo1' ? '/assets/map_background_culture_education.png' : currentModule === 'modulo2' ? '/assets/map_background_tocantins_historical.png' : '/assets/map_background_tocantins_module3.png'}
                />
            </div>

            {/* SLIDE VIEWER MODAL */}
            <AnimatePresence>
                {selectedNode && !showQuiz && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-3xl w-full max-w-4xl h-[80vh] overflow-hidden shadow-2xl flex flex-col relative"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedNode(null)}
                                className="absolute top-4 right-4 z-20 p-2 bg-black/10 hover:bg-black/20 rounded-full transition"
                            >
                                <X size={24} />
                            </button>

                            {/* Slide Content */}
                            <div className="relative w-full h-full flex flex-col md:flex-row">
                                {selectedNode.slides[currentSlideIndex].image && (
                                    <div className="w-full md:w-1/2 h-48 md:h-full bg-gray-100 relative shrink-0">
                                        <img
                                            src={selectedNode.slides[currentSlideIndex].image}
                                            alt="Slide visual"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-white/10"></div>
                                    </div>
                                )}

                                <div className={`flex-1 flex flex-col p-6 md:p-12 pb-24 md:pb-28 overflow-hidden
                                    ${selectedNode.slides[currentSlideIndex].type === 'raw-text' || selectedNode.slides[currentSlideIndex].type === 'agenda' ? 'justify-start' : 'justify-center'}
                                    ${!selectedNode.slides[currentSlideIndex].image ? 'max-w-3xl mx-auto w-full' : ''}`}
                                >
                                    {selectedNode.slides[currentSlideIndex].type !== 'raw-text' && (
                                        <>
                                            <span className="text-brand-accent font-bold tracking-widest text-xs md:text-sm mb-2 uppercase">
                                                {selectedNode.slides[currentSlideIndex].type}
                                            </span>
                                            <h2 className="text-2xl md:text-4xl font-bold text-brand-secondary mb-4 md:mb-6 leading-tight">
                                                {selectedNode.slides[currentSlideIndex].title}
                                            </h2>
                                        </>
                                    )}

                                    {/* Standard Text Content */}
                                    {(selectedNode.slides[currentSlideIndex].type === 'text' ||
                                        selectedNode.slides[currentSlideIndex].type === 'cover' ||
                                        selectedNode.slides[currentSlideIndex].type === 'quote' ||
                                        selectedNode.slides[currentSlideIndex].type === 'image-text') && (
                                            <div className="prose prose-sm md:prose-lg text-gray-600 mb-8 leading-relaxed overflow-y-auto max-h-full pr-2">
                                                {selectedNode.slides[currentSlideIndex].content.split('\n').map((line, i) => (
                                                    <p key={i} className="mb-2">{line}</p>
                                                ))}
                                            </div>
                                        )}

                                    {/* Agenda Display */}
                                    {selectedNode.slides[currentSlideIndex].type === 'agenda' && selectedNode.slides[currentSlideIndex].agenda && (
                                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                            <div className="grid gap-3">
                                                {selectedNode.slides[currentSlideIndex].agenda?.dates.map((item, idx) => (
                                                    <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between transition-all hover:shadow-md
                                                        ${item.type === 'live'
                                                            ? 'bg-blue-50 border-blue-100'
                                                            : 'bg-green-50 border-green-100'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-base md:text-lg
                                                                ${item.type === 'live' ? 'bg-blue-200 text-blue-700' : 'bg-green-200 text-green-700'}`}>
                                                                {item.date.split('/')[0]}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-800 text-sm md:text-base">{item.type === 'live' ? 'Aula Ao Vivo' : 'Plantão de Dúvidas'}</p>
                                                                <p className="text-xs md:text-sm text-gray-500">{item.date} • 19:30h</p>
                                                            </div>
                                                        </div>

                                                        {item.type === 'live' ? (
                                                            item.link ? (
                                                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full shadow hover:scale-110 transition" title="Entrar no Meet">
                                                                    <img src="https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-96dp/logo_meet_2020q4_color_2x_web_96dp.png" alt="Google Meet" className="w-6 h-6 md:w-8 md:h-8" />
                                                                </a>
                                                            ) : (
                                                                <span className="text-[10px] md:text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">Em breve</span>
                                                            )
                                                        ) : (
                                                            <div className="p-2 bg-white rounded-full shadow text-green-600">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2-2z"></path></svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Raw Text / Reference Material Display */}
                                    {selectedNode.slides[currentSlideIndex].type === 'raw-text' && (
                                        <div className="flex-1 overflow-y-auto pr-2 shadow-inner bg-gray-50/50 rounded-xl border border-gray-100 p-4">
                                            <article className="prose prose-stone max-w-none text-sm md:text-base leading-relaxed">
                                                <h3 className="flex items-center gap-2 text-brand-secondary border-b pb-4 mb-4 font-bold text-lg sticky top-0 bg-gray-50/95 backdrop-blur-sm z-10 pt-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                    Material de Leitura Fundamental
                                                </h3>
                                                {selectedNode.slides[currentSlideIndex].content.split('\n').map((line, i) => (
                                                    <p key={i} className="mb-3 text-justify">{line}</p>
                                                ))}
                                            </article>
                                        </div>
                                    )}

                                    {/* Interactive Activity Display */}
                                    {selectedNode.slides[currentSlideIndex].activity && (
                                        <div className="bg-brand-secondary/5 p-6 rounded-2xl border border-brand-secondary/10 flex flex-col gap-4">
                                            <p className="font-bold text-lg text-brand-secondary">{selectedNode.slides[currentSlideIndex].activity?.question}</p>
                                            
                                            {(!selectedNode.slides[currentSlideIndex].activity?.type || selectedNode.slides[currentSlideIndex].activity?.type === 'quiz') && (
                                                <>
                                                    <div className="space-y-2">
                                                        {selectedNode.slides[currentSlideIndex].activity?.options?.map((opt, idx) => (
                                                            <div key={idx} className="p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-600">
                                                                {opt}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <p className="mt-4 text-xs text-brand-primary italic">Interaja mentalmente ou discuta com colegas!</p>
                                                </>
                                            )}

                                            {(selectedNode.slides[currentSlideIndex].activity?.type === 'open-text' || selectedNode.slides[currentSlideIndex].activity?.type === 'file-upload') && (
                                                <ActivitySubmissionForm
                                                    type={selectedNode.slides[currentSlideIndex].activity?.type as 'open-text' | 'file-upload'}
                                                    nodeId={selectedNode.id}
                                                    moduleId={currentModule}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Navigation Footer */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md border-t border-gray-100 flex justify-between items-center z-20">
                                <button
                                    onClick={handlePrevSlide}
                                    disabled={currentSlideIndex === 0}
                                    className="px-6 py-3 rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-gray-500 flex items-center gap-2 transition"
                                >
                                    <ChevronLeft size={20} /> Anterior
                                </button>

                                <div className="flex gap-2">
                                    {selectedNode.slides.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlideIndex ? 'w-8 bg-brand-primary' : 'w-2 bg-gray-300'}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={handleNextSlide}
                                    className="px-8 py-3 bg-brand-primary text-white rounded-xl shadow-lg hover:bg-brand-primary/90 font-bold flex items-center gap-2 transition transform active:scale-95"
                                >
                                    {currentSlideIndex === selectedNode.slides.length - 1 ? 'Concluir' : 'Próximo'}
                                    {currentSlideIndex === selectedNode.slides.length - 1 ? <CheckCircle size={20} /> : <ChevronRight size={20} />}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* QUIZ MODAL */}
            {showQuiz && (
                <QuizModal
                    questions={currentQuiz}
                    onClose={() => setShowQuiz(false)}
                    onComplete={handleQuizComplete}
                />
            )}
        </div>
    );
}
