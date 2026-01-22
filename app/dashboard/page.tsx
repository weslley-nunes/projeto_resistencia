'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import GameMap from '@/components/GameMap';
import { mapNodes, MapNode, Slide, quizQuestions } from '@/app/modulo1/data';
import { useGameStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, X } from 'lucide-react';
import QuizModal from '@/components/QuizModal';

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

    const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);

    const handleNodeClick = (node: MapNode) => {
        if (node.type === 'final') {
            setShowQuiz(true);
            setSelectedNode(node); // Keep track of node for completion
        } else {
            setSelectedNode(node);
            setCurrentSlideIndex(0);
        }
    };

    const handleNextSlide = () => {
        if (selectedNode && currentSlideIndex < selectedNode.slides.length - 1) {
            setCurrentSlideIndex(prev => prev + 1);
        } else {
            // End of lesson
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
                    moduleId: 'modulo1',
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
                addXp(200); // Higher XP for quiz exam
                alert(`Parabéns! Você passou com ${percentage.toFixed(0)}%.`);
            }
            setSelectedNode(null);
        } else if (!passed) {
            alert(`Você atingiu ${percentage.toFixed(0)}%. Precisa de 50% para passar.`);
            setSelectedNode(null);
        }
    };

    return (
        <div className="space-y-6">
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
                        Módulo 1: Introdução
                    </div>
                </div>
            </div>

            {/* Interactive Map */}
            <div className="w-full">
                <GameMap
                    nodes={mapNodes}
                    onNodeClick={handleNodeClick}
                    completedNodes={completedNodes}
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
                            <div className="relative w-full h-full flex">
                                {selectedNode.slides[currentSlideIndex].image && (
                                    <div className="w-1/2 h-full bg-gray-100 hidden md:block relative">
                                        <img
                                            src={selectedNode.slides[currentSlideIndex].image}
                                            alt="Slide visual"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"></div>
                                    </div>
                                )}

                                <div className={`${selectedNode.slides[currentSlideIndex].image ? 'w-full md:w-1/2' : 'w-full max-w-2xl mx-auto'} p-8 md:p-12 flex flex-col justify-center`}>
                                    <span className="text-brand-accent font-bold tracking-widest text-sm mb-2 uppercase">
                                        {selectedNode.slides[currentSlideIndex].type}
                                    </span>
                                    <h2 className="text-4xl font-bold text-brand-secondary mb-6 leading-tight">
                                        {selectedNode.slides[currentSlideIndex].title}
                                    </h2>

                                    <div className="prose prose-lg text-gray-600 mb-8 leading-relaxed">
                                        {selectedNode.slides[currentSlideIndex].content.split('\n').map((line, i) => (
                                            <p key={i} className="mb-2">{line}</p>
                                        ))}
                                    </div>

                                    {/* Agenda Display */}
                                    {selectedNode.slides[currentSlideIndex].type === 'agenda' && selectedNode.slides[currentSlideIndex].agenda && (
                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 max-h-[400px] overflow-y-auto custom-scrollbar">
                                            <div className="grid gap-3">
                                                {selectedNode.slides[currentSlideIndex].agenda?.dates.map((item, idx) => (
                                                    <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between transition-all hover:shadow-md
                                                        ${item.type === 'live'
                                                            ? 'bg-blue-50 border-blue-100'
                                                            : 'bg-green-50 border-green-100'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                                                                ${item.type === 'live' ? 'bg-blue-200 text-blue-700' : 'bg-green-200 text-green-700'}`}>
                                                                {item.date.split('/')[0]}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-800">{item.type === 'live' ? 'Aula Ao Vivo' : 'Plantão de Dúvidas'}</p>
                                                                <p className="text-sm text-gray-500">{item.date} • 19:30h</p>
                                                            </div>
                                                        </div>

                                                        {item.type === 'live' ? (
                                                            item.link ? (
                                                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full shadow hover:scale-110 transition" title="Entrar no Meet">
                                                                    <img src="https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-96dp/logo_meet_2020q4_color_2x_web_96dp.png" alt="Google Meet" className="w-8 h-8" />
                                                                </a>
                                                            ) : (
                                                                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">Em breve</span>
                                                            )
                                                        ) : (
                                                            <div className="p-2 bg-white rounded-full shadow text-green-600">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Raw Text / Reference Material Display */}
                                    {selectedNode.slides[currentSlideIndex].type === 'raw-text' && (
                                        <div className="bg-white p-6 rounded-2xl border border-gray-200 max-h-[400px] overflow-y-auto custom-scrollbar shadow-inner">
                                            <article className="prose prose-stone max-w-none text-sm md:text-base leading-relaxed">
                                                <h3 className="flex items-center gap-2 text-brand-secondary border-b pb-2 mb-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                    Material de Leitura Fundamental
                                                </h3>
                                                {selectedNode.slides[currentSlideIndex].content.split('\n').map((line, i) => (
                                                    <p key={i} className="mb-2 text-justify">{line}</p>
                                                ))}
                                            </article>
                                        </div>
                                    )}

                                    {/* Interactive Activity Display */}
                                    {selectedNode.slides[currentSlideIndex].activity && (
                                        <div className="bg-brand-secondary/5 p-6 rounded-2xl border border-brand-secondary/10">
                                            <p className="font-bold text-lg mb-4 text-brand-secondary">{selectedNode.slides[currentSlideIndex].activity?.question}</p>
                                            <div className="space-y-2">
                                                {selectedNode.slides[currentSlideIndex].activity?.options.map((opt, idx) => (
                                                    <div key={idx} className="p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-600">
                                                        {opt}
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="mt-4 text-xs text-brand-primary italic">Interaja mentalmente ou discuta com colegas!</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Navigation Footer */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md border-t border-gray-100 flex justify-between items-center">
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
                    questions={quizQuestions}
                    onClose={() => setShowQuiz(false)}
                    onComplete={handleQuizComplete}
                />
            )}
        </div>
    );
}
