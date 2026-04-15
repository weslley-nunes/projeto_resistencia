'use client';

import React, { useState } from 'react';
import GameMap from '@/components/GameMap';
import { mapNodes, MapNode } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, User, Coins } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Assuming we might want to use this or simple dangerouslySetInnerHTML

export default function Modulo1Page() {
    const [activeNode, setActiveNode] = useState<MapNode | null>(null);
    const [completedNodes, setCompletedNodes] = useState<string[]>([]);
    const [educoins, setEducoins] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch initial progress
    React.useEffect(() => {
        async function fetchProgress() {
            try {
                const res = await fetch('/api/progress?moduleId=modulo-1');
                if (res.ok) {
                    const data = await res.json();
                    setCompletedNodes(data.completedNodes || []);
                    setEducoins(data.educoins || 0);
                }
            } catch (error) {
                console.error('Failed to load progress', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProgress();
    }, []);

    const handleNodeClick = (node: MapNode) => {
        setActiveNode(node);
    };

    const handleCloseModal = () => {
        setActiveNode(null);
    };

    const handleCompleteNode = async () => {
        if (activeNode && !completedNodes.includes(activeNode.id)) {
            // Optimistic update
            setCompletedNodes(prev => [...prev, activeNode.id]);
            setEducoins(prev => prev + activeNode.educoinsReward);

            handleCloseModal();

            // Persist to DB
            try {
                await fetch('/api/progress', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        moduleId: 'modulo-1',
                        nodeId: activeNode.id,
                        reward: activeNode.educoinsReward
                    })
                });
            } catch (error) {
                console.error('Failed to save progress', error);
                // Rollback on error could be implemented here
            }
        } else {
            handleCloseModal();
        }
    };

    return (
        <div className="min-h-screen bg-stone-900 text-stone-100 font-sans selection:bg-amber-500 selection:text-white">
            {/* Header / HUD */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 h-16 flex items-center justify-between px-6 shadow-lg">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                        Módulo I: Trilha da Memória
                    </h1>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 bg-stone-800 px-3 py-1.5 rounded-full border border-stone-700">
                        <Coins className="w-4 h-4 text-amber-400" />
                        <span className="font-mono font-bold text-amber-400">{educoins}</span>
                    </div>

                    <div className="w-32 h-2.5 bg-stone-800 rounded-full overflow-hidden border border-stone-700">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-500"
                            style={{ width: `${(completedNodes.length / mapNodes.length) * 100}%` }}
                        />
                    </div>
                </div>
            </header>

            {/* Main Map Area */}
            <main className="pt-24 pb-10 px-4 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
                <div className="w-full max-w-5xl">
                    <GameMap
                        nodes={mapNodes}
                        onNodeClick={handleNodeClick}
                        completedNodes={completedNodes}
                    />
                </div>
            </main>

            {/* Lesson Modal */}
            <AnimatePresence>
                {activeNode && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            layoutId={`node-${activeNode.id}`}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-stone-100 text-stone-900 rounded-2xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="bg-amber-500 text-white p-6 flex justify-between items-start">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider bg-black/20 px-2 py-1 rounded mb-2 inline-block">
                                        {activeNode.type === 'start' ? 'Início' : activeNode.type === 'final' ? 'Desafio Final' : 'Lição'}
                                    </span>
                                    <h2 className="text-3xl font-bold leading-tight">{activeNode.title}</h2>
                                    <p className="opacity-90 mt-1">{activeNode.description}</p>
                                </div>
                                <button
                                    onClick={handleCloseModal}
                                    className="p-2 hover:bg-white/20 rounded-full transition"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Body (Scrollable) */}
                            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                                <div className="prose prose-stone max-w-none prose-headings:text-amber-700 prose-a:text-amber-600 prose-blockquote:border-l-amber-500">
                                    {/* Simple rendering for now - ideally use ReactMarkdown */}
                                    <div dangerouslySetInnerHTML={{ __html: activeNode.description.replace(/\n/g, '<br/>').replace(/# (.*)/g, '<h1 class="text-2xl font-bold mb-4">$1</h1>').replace(/## (.*)/g, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>').replace(/> "(.*)"/g, '<blockquote class="border-l-4 border-amber-500 pl-4 italic text-gray-600 my-4">$1</blockquote>') }} />
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 bg-stone-200 border-t border-stone-300 flex justify-between items-center">
                                <div className="flex items-center gap-2 text-stone-600">
                                    <Coins size={18} className="text-amber-600" />
                                    <span className="font-semibold">+ {activeNode.educoinsReward} Educoins</span>
                                </div>

                                <button
                                    onClick={handleCompleteNode}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transform active:scale-95 transition-all flex items-center gap-2"
                                >
                                    {completedNodes.includes(activeNode.id) ? 'Revisado' : 'Concluir & Resgatar'}
                                    <Check size={20} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Importing Check icon separately since it was used in button above
import { Check } from 'lucide-react';
