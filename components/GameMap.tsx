'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapNode } from '@/app/modulo1/data';
import { Check, Lock, Star, MapPin, BookOpen, Crown } from 'lucide-react';

interface GameMapProps {
    nodes: MapNode[];
    onNodeClick: (node: MapNode) => void;
    completedNodes: string[];
    backgroundImage?: string;
}

export default function GameMap({ nodes, onNodeClick, completedNodes, backgroundImage = "/assets/map_background_tocantins.png" }: GameMapProps) {
    const getNodeStatus = (nodeId: string, index: number) => {
        if (completedNodes.includes(nodeId)) return 'completed';
        const previousNodeId = index > 0 ? nodes[index - 1].id : null;
        if (index === 0 || (previousNodeId && completedNodes.includes(previousNodeId))) return 'unlocked';
        return 'locked';
    };

    const generatePath = () => {
        if (nodes.length === 0) return '';
        let path = `M ${nodes[0].x} ${nodes[0].y}`;
        for (let i = 1; i < nodes.length; i++) {
            const startX = nodes[i - 1].x;
            const startY = nodes[i - 1].y;
            const endX = nodes[i].x;
            const endY = nodes[i].y;
            const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            const curvature = 0.5 * distance;
            const cp1X = startX + (endX - startX) / 2;
            const cp1Y = startY + (i % 2 === 0 ? curvature : -curvature);
            path += ` Q ${cp1X} ${cp1Y}, ${endX} ${endY}`;
        }
        return path;
    };

    return (
        <div className="relative w-full aspect-video bg-[#5D4037] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#3E2723] select-none">
            {/* --- LAYOUT BACKGROUND LAYERS --- */}

            {/* 1. Generated Background Image */}
            <div className="absolute inset-0">
                <img
                    src={backgroundImage}
                    alt="Mapa do Cerrado com Elementos Culturais"
                    className="w-full h-full object-cover opacity-100"
                />
                {/* Overlay to ensure text readability if needed, or to blend with theme */}
                <div className="absolute inset-0 bg-black mix-blend-overlay opacity-10"></div>
            </div>

            {/* --- GAME ELEMENTS --- */}

            {/* SVG Path Layer (The Trail) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Shadow/Dirt Path */}
                <path
                    d={generatePath()}
                    fill="none"
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    className="blur-sm"
                />
                {/* Main Path (Golden/Dirt Trail) */}
                <path
                    d={generatePath()}
                    fill="none"
                    stroke="#E6B17E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="8 4"
                    className="drop-shadow-sm"
                />
            </svg>

            {/* Nodes Layer */}
            {nodes.map((node, index) => {
                const status = getNodeStatus(node.id, index);
                const isLocked = status === 'locked';
                const isCompleted = status === 'completed';
                const isCurrent = status === 'unlocked' && !isCompleted;

                return (
                    <motion.div
                        key={node.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10
                            ${isLocked ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}
                        `}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1, type: "spring", stiffness: 260, damping: 20 }}
                        onClick={() => !isLocked && onNodeClick(node)}
                        whileHover={!isLocked ? { scale: 1.15, y: -5 } : {}}
                        whileTap={!isLocked ? { scale: 0.95 } : {}}
                    >
                        {/* Current Node Pulse */}
                        {isCurrent && (
                            <div className="absolute inset-0 rounded-full bg-[#FFB300] opacity-40 animate-ping scale-150 pointer-events-none" />
                        )}

                        {/* Node Icon Circle */}
                        <div className={`
                            relative flex items-center justify-center w-14 h-14 rounded-full border-4 shadow-xl transition-all duration-300
                            ${isCompleted
                                ? 'bg-[#2E7D32] border-[#C8E6C9] ring-2 ring-[#2E7D32]/30' // Forest Green
                                : isCurrent
                                    ? 'bg-gradient-to-br from-[#FFB300] to-[#FB8C00] border-[#FFF8E1] ring-4 ring-[#FFB300]/30' // Golden
                                    : 'bg-[#5D4037] border-[#3E2723] grayscale brightness-75' // Earth
                            }
                        `}
                            title={node.title}
                        >
                            {isCompleted ? <Check className="text-white w-7 h-7 stroke-[3]" /> :
                                isLocked ? <Lock className="text-[#A1887F] w-5 h-5" /> :
                                    node.type === 'start' ? <MapPin className="text-white w-7 h-7 drop-shadow-md" /> :
                                        node.type === 'final' ? <Crown className="text-white w-7 h-7 drop-shadow-md" /> :
                                            node.type === 'challenge' ? <Star className="text-white w-6 h-6 drop-shadow-md fill-white/20" /> :
                                                <BookOpen className="text-white w-6 h-6 drop-shadow-md" />
                            }
                        </div>

                        {/* Node Title Badge */}
                        <div className={`
                            absolute top-full mt-3 left-1/2 transform -translate-x-1/2 
                            bg-[#4E342E] text-[#FFECB3] text-xs font-bold py-1.5 px-3 rounded-lg border border-[#795548]
                            shadow-lg w-max max-w-[150px] text-center pointer-events-none transition-all duration-300
                            ${(isCurrent) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}
                        `}>
                            {node.title}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
