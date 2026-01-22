'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import GameMap from '@/components/GameMap';
import { mapNodes, MapNode } from '@/app/modulo1/data';
import { useGameStore } from '@/lib/store';
import { motion } from 'framer-motion';

export default function DashboardPage() {
    const { data: session, status } = useSession();
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

    const handleNodeClick = (node: MapNode) => {
        setSelectedNode(node);
    };

    const handleCompleteNode = () => {
        if (selectedNode) {
            if (!completedNodes.includes(selectedNode.id)) {
                completeNode(selectedNode.id);
                addEducoins(selectedNode.educoinsReward);
                addXp(100);
            }
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

            {/* Lesson Modal */}
            {selectedNode && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col"
                    >
                        {/* Modal Header */}
                        <div className="bg-brand-secondary p-6 text-white flex justify-between items-start shrink-0">
                            <div>
                                <h2 className="text-2xl font-bold">{selectedNode.title}</h2>
                                <p className="text-white/70 text-sm mt-1">{selectedNode.description}</p>
                            </div>
                            <button
                                onClick={() => setSelectedNode(null)}
                                className="p-2 hover:bg-white/10 rounded-full transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 overflow-y-auto grow custom-scrollbar">
                            <article className="prose prose-stone lg:prose-lg max-w-none">
                                {/* Simple Markdown Rendering */}
                                {selectedNode.content.split('\n').map((line, i) => {
                                    if (line.trim().startsWith('# ')) return <h1 key={i} className="text-3xl font-bold text-brand-secondary mb-4">{line.replace('# ', '')}</h1>;
                                    if (line.trim().startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-gray-800 mt-6 mb-3">{line.replace('## ', '')}</h2>;
                                    if (line.trim().startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-gray-800 mt-4 mb-2">{line.replace('### ', '')}</h3>;
                                    if (line.trim().startsWith('- ')) return <li key={i} className="ml-4 list-disc text-gray-600 mb-1">{line.replace('- ', '')}</li>;
                                    if (line.trim().startsWith('> ')) return <blockquote key={i} className="border-l-4 border-brand-primary pl-4 italic text-gray-600 my-4 bg-gray-50 p-4 rounded-r">{line.replace('> ', '')}</blockquote>;
                                    if (line.trim() === '') return <div key={i} className="h-4"></div>;
                                    return <p key={i} className="mb-2 text-gray-600 leading-relaxed text-lg">{line}</p>;
                                })}
                            </article>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
                            <button
                                onClick={() => setSelectedNode(null)}
                                className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-200 rounded-xl transition"
                            >
                                Fechar
                            </button>
                            <button
                                onClick={handleCompleteNode}
                                className={`px-8 py-3 font-bold rounded-xl shadow-lg transition flex items-center gap-2 transform active:scale-95
                                    ${completedNodes.includes(selectedNode.id)
                                        ? 'bg-green-100 text-green-700 cursor-default'
                                        : 'bg-brand-primary text-white hover:bg-brand-primary/90 hover:-translate-y-1'
                                    }`}
                            >
                                {completedNodes.includes(selectedNode.id) ? (
                                    <>Concluído <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></>
                                ) : (
                                    'Concluir Lição'
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
