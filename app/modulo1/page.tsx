'use client';

import React, { useState, useEffect } from 'react';
import GameMap from '@/components/GameMap';
import { mapNodes, MapNode, Slide, quizQuestions } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, User, Coins, ChevronLeft, ChevronRight, Check, Play, FileText, HelpCircle } from 'lucide-react';
import ActivitySubmissionForm from '@/components/ActivitySubmissionForm';
import QuizModal from '@/components/QuizModal';
import { useGameStore } from '@/lib/store';

export default function Modulo1Page() {
    const [activeNode, setActiveNode] = useState<MapNode | null>(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    
    const { educoins, completedNodes, syncProgress, completeNode, addEducoins } = useGameStore();

    // Fetch initial progress
    useEffect(() => {
        async function fetchProgress() {
            try {
                const res = await fetch('/api/progress');
                if (res.ok) {
                    const data = await res.json();
                    syncProgress(data.educoins || 0, data.xp || 0, data.level || 1, data.completedNodes || []);
                }
            } catch (error) {
                console.error('Failed to load progress', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProgress();
    }, [syncProgress]);

    const handleNodeClick = (node: MapNode) => {
        setActiveNode(node);
        setCurrentSlideIndex(0);
    };

    const handleCloseModal = () => {
        setActiveNode(null);
        setCurrentSlideIndex(0);
    };

    const nextSlide = () => {
        if (activeNode && currentSlideIndex < activeNode.slides.length - 1) {
            setCurrentSlideIndex(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(prev => prev - 1);
        }
    };

    const handleCompleteNode = async () => {
        if (activeNode && !completedNodes.includes(activeNode.id)) {
            // Optimistic update
            completeNode(activeNode.id);
            addEducoins(activeNode.educoinsReward);

            // Persist to DB
            try {
                await fetch('/api/progress', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        moduleId: 'modulo1',
                        nodeId: activeNode.id,
                        reward: activeNode.educoinsReward
                    })
                });
            } catch (error) {
                console.error('Failed to save progress', error);
                // Rollback on error could be implemented here
            }
        }
        handleCloseModal();
    };

    const renderSlide = (slide: Slide) => {
        switch (slide.type) {
            case 'cover':
                return (
                    <div className="flex flex-col items-center text-center">
                        {slide.image && (
                            <img src={slide.image} alt={slide.title} className="w-full h-48 object-cover rounded-xl mb-6 shadow-md" />
                        )}
                        <h2 className="text-3xl font-bold text-amber-800 mb-4">{slide.title}</h2>
                        <p className="text-lg text-stone-600 leading-relaxed whitespace-pre-line">{slide.content}</p>
                    </div>
                );
            case 'text':
                return (
                    <div className="prose prose-stone max-w-none">
                        <h2 className="text-2xl font-bold text-amber-700 mb-4">{slide.title}</h2>
                        <div className="text-stone-700 text-lg leading-relaxed whitespace-pre-line">
                            {slide.content}
                        </div>
                    </div>
                );
            case 'quote':
                return (
                    <div className="flex flex-col items-center justify-center h-full py-10">
                        <blockquote className="border-l-4 border-amber-500 pl-6 italic text-2xl text-stone-700 bg-amber-50 p-8 rounded-r-xl shadow-sm">
                            "{slide.content}"
                        </blockquote>
                        <h3 className="mt-4 text-amber-800 font-bold">— {slide.title}</h3>
                    </div>
                );
            case 'video':
                const getYoutubeId = (url: string) => {
                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                    const match = url.match(regExp);
                    return (match && match[2].length === 11) ? match[2] : null;
                };
                const videoId = slide.videoUrl ? getYoutubeId(slide.videoUrl) : null;
                
                return (
                    <div className="flex flex-col h-full uppercase">
                         <h2 className="text-2xl font-bold text-amber-700 mb-4 flex items-center gap-2">
                            <Play size={24} className="fill-amber-700" /> {slide.title}
                        </h2>
                        {videoId ? (
                            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border-4 border-stone-200">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div className="bg-stone-200 aspect-video rounded-xl flex items-center justify-center text-stone-500">
                                Vídeo não disponível
                            </div>
                        )}
                        <p className="mt-4 text-stone-600">{slide.content}</p>
                    </div>
                );
            case 'activity':
                if (slide.activity?.type === 'quiz') {
                    return (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <HelpCircle size={64} className="text-amber-500 mb-4" />
                            <h2 className="text-3xl font-bold text-stone-800 mb-4">{slide.title}</h2>
                            <p className="text-stone-600 mb-8 max-w-md">{slide.content}</p>
                            <button 
                                onClick={() => setShowQuiz(true)}
                                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl transform active:scale-95 transition-all text-xl"
                            >
                                Iniciar Quiz
                            </button>
                        </div>
                    );
                }
                return (
                    <div className="flex flex-col h-full">
                        <h2 className="text-2xl font-bold text-amber-700 mb-2 flex items-center gap-2">
                             <FileText size={24} /> {slide.title}
                        </h2>
                        <p className="text-stone-600 mb-6">{slide.content}</p>
                        
                        <div className="bg-stone-50 p-6 rounded-2xl border-2 border-dashed border-stone-200">
                            <h3 className="text-lg font-bold text-stone-800 mb-4">{slide.activity?.question}</h3>
                            <ActivitySubmissionForm 
                                type={slide.activity?.type as 'open-text' | 'file-upload'} 
                                nodeId={activeNode?.id || ''} 
                                moduleId="modulo-1" 
                            />
                        </div>
                    </div>
                );
            default:
                return <div>Slide em construção</div>;
        }
    };

    if (isLoading) return <div className="min-h-screen bg-stone-900 flex items-center justify-center text-white">Carregando mapa...</div>;

    return (
        <div className="min-h-screen bg-stone-900 text-stone-100 font-sans selection:bg-amber-500 selection:text-white overflow-hidden">
            {/* Header / HUD */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 h-16 flex items-center justify-between px-6 shadow-lg">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                        Etapa 01: Direito à Memória
                    </h1>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 bg-stone-800 px-3 py-1.5 rounded-full border border-stone-700">
                        <Coins className="w-4 h-4 text-amber-400" />
                        <span className="font-mono font-bold text-amber-400">{educoins}</span>
                    </div>

                    <div className="w-40 h-3 bg-stone-800 rounded-full overflow-hidden border border-stone-700 hidden md:block">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-500"
                            style={{ width: `${(completedNodes.length / (mapNodes.length - 1)) * 100}%` }}
                        />
                    </div>
                </div>
            </header>

            {/* Main Map Area */}
            <main className="pt-24 pb-10 px-4 h-screen flex flex-col items-center justify-center">
                <div className="w-full max-w-5xl h-full flex items-center justify-center">
                    <GameMap
                        nodes={mapNodes}
                        onNodeClick={handleNodeClick}
                        completedNodes={completedNodes}
                    />
                </div>
            </main>

            {/* Lesson Modal (Slide-based) */}
            <AnimatePresence>
                {activeNode && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
                        />

                        <motion.div
                            layoutId={`node-${activeNode.id}`}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="relative w-full max-w-3xl bg-white text-stone-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[85vh] max-h-[800px]"
                        >
                            {/* Modal Header */}
                            <div className="bg-stone-50 border-b border-stone-100 p-6 flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold text-stone-800">{activeNode.title}</h2>
                                    <p className="text-stone-500 text-sm">{activeNode.description}</p>
                                </div>
                                <button
                                    onClick={handleCloseModal}
                                    className="p-2 hover:bg-stone-200 rounded-full transition text-stone-400"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Slide Progress */}
                            <div className="w-full bg-stone-100 h-1.5 flex gap-1 px-1">
                                {activeNode.slides.map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`h-full flex-1 rounded-full transition-all duration-500 ${i <= currentSlideIndex ? 'bg-amber-500' : 'bg-stone-200'}`} 
                                    />
                                ))}
                            </div>

                            {/* Modal Body - Slide Renderer */}
                            <div className="p-8 overflow-y-auto custom-scrollbar flex-1 flex flex-col">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentSlideIndex}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-1"
                                    >
                                        {renderSlide(activeNode.slides[currentSlideIndex])}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Modal Footer (Navigation) */}
                            <div className="p-6 bg-stone-50 border-t border-stone-100 flex justify-between items-center">
                                <button
                                    onClick={prevSlide}
                                    disabled={currentSlideIndex === 0}
                                    className="flex items-center gap-2 font-bold text-stone-400 hover:text-stone-600 disabled:opacity-0 transition-all"
                                >
                                    <ChevronLeft size={24} /> Anterior
                                </button>

                                {currentSlideIndex === activeNode.slides.length - 1 ? (
                                    <button
                                        onClick={handleCompleteNode}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transform active:scale-95 transition-all flex items-center gap-2"
                                    >
                                        {completedNodes.includes(activeNode.id) ? 'Lição Concluída' : 'Concluir & Continuar'}
                                        <Check size={20} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={nextSlide}
                                        className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg transform active:scale-95 transition-all flex items-center gap-2"
                                    >
                                        Próximo <ChevronRight size={20} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Quiz Modal Overlay */}
            {showQuiz && (
                <QuizModal 
                    questions={quizQuestions} 
                    onClose={() => setShowQuiz(false)} 
                    onComplete={(score, passed) => {
                        setShowQuiz(false);
                        if (passed) {
                            handleCompleteNode();
                        }
                    }}
                />
            )}
        </div>
    );
}
