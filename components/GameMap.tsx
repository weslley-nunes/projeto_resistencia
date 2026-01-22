'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapNode } from '@/app/modulo1/data';
import { Check, Lock, Star, MapPin, BookOpen, Crown } from 'lucide-react';

interface GameMapProps {
    nodes: MapNode[];
    onNodeClick: (node: MapNode) => void;
    completedNodes: string[];
}

export default function GameMap({ nodes, onNodeClick, completedNodes }: GameMapProps) {
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

            {/* 1. Base Soil Texture (Cerrado Earth) */}
            <div className="absolute inset-0 bg-[#5D4037] opacity-100">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.3" mix-blend-mode="multiply" />
                </svg>
            </div>

            {/* 2. Rivers (Tocantins / Araguaia) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Main River Flowing Top-Right to Bottom-Leftish */}
                <path
                    d="M 80 -10 Q 60 30 40 50 T 10 110"
                    fill="none"
                    stroke="#4FC3F7"
                    strokeWidth="12"
                    strokeLinecap="round"
                    className="blur-sm"
                />
                <path
                    d="M 85 -10 Q 65 30 45 50 T 15 110"
                    fill="none"
                    stroke="#0288D1"
                    strokeWidth="5"
                    strokeDasharray="10 5"
                />
            </svg>

            {/* 3. Regions (Indigenous & Quilombola Areas) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Indigenous Territory (Forest Green Area) */}
                <path
                    d="M -10 60 Q 30 60 40 110 L -10 110 Z"
                    fill="#33691E"
                    opacity="0.6"
                />
                <circle cx="15" cy="85" r="2" fill="#8BC34A" opacity="0.5" />
                <circle cx="25" cy="95" r="1.5" fill="#8BC34A" opacity="0.5" />

                {/* Quilombola Territory (Deep Earth / Clay Area) */}
                <path
                    d="M 110 20 Q 70 30 60 -10 L 110 -10 Z"
                    fill="#3E2723"
                    opacity="0.7"
                />

                {/* Forest Patches (Matas) */}
                <circle cx="85" cy="80" r="15" fill="#1B5E20" opacity="0.4" className="blur-xl" />
                <circle cx="20" cy="20" r="12" fill="#1B5E20" opacity="0.4" className="blur-xl" />
            </svg>

            {/* 4. Cultural Patterns Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, #FFD54F 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            {/* --- GAME ELEMENTS --- */}

            {/* SVG Path Layer (The Trail) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Shadow/Dirt Path */}
                <path
                    d={generatePath()}
                    fill="none"
                    stroke="rgba(0,0,0,0.4)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="drop-shadow-md"
                />
                {/* Main Path (Golden Trail) */}
                <path
                    d={generatePath()}
                    fill="none"
                    stroke="#FFB300"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="6 3"
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
                                ? 'bg-[#2E7D32] border-[#A5D6A7] ring-2 ring-[#2E7D32]/30' // Forest Green
                                : isCurrent
                                    ? 'bg-gradient-to-br from-[#FFB300] to-[#FF6F00] border-[#FFE082] ring-4 ring-[#FFB300]/30' // Golden/Amber
                                    : 'bg-[#4E342E] border-[#3E2723] grayscale brightness-75' // Dark Earth
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
                            bg-[#3E2723] text-[#FFE082] text-xs font-bold py-1.5 px-3 rounded-lg border border-[#5D4037]
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
