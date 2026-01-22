'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapNode } from '@/app/modulo1/data';
import { Check, Lock, Star, MapPin, BookOpen, Crown } from 'lucide-react';
import Image from 'next/image';

interface GameMapProps {
    nodes: MapNode[];
    onNodeClick: (node: MapNode) => void;
    completedNodes: string[];
}

export default function GameMap({ nodes, onNodeClick, completedNodes }: GameMapProps) {
    // Function to determine node status
    const getNodeStatus = (nodeId: string, index: number) => {
        if (completedNodes.includes(nodeId)) return 'completed';
        // If it's the first node or the previous node is completed, it's unlocked
        const previousNodeId = index > 0 ? nodes[index - 1].id : null;
        if (index === 0 || (previousNodeId && completedNodes.includes(previousNodeId))) return 'unlocked';
        return 'locked';
    };

    // Advanced SVG Path generation with smooth curves
    const generatePath = () => {
        if (nodes.length === 0) return '';

        let path = `M ${nodes[0].x} ${nodes[0].y}`;
        for (let i = 1; i < nodes.length; i++) {
            const startX = nodes[i - 1].x;
            const startY = nodes[i - 1].y;
            const endX = nodes[i].x;
            const endY = nodes[i].y;

            const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            const curvature = 0.5 * distance; // Adjust curvature based on distance

            // Control points for smooth Bezier curve
            // We alternate the curve direction for a winding path feel
            const cp1X = startX + (endX - startX) / 2;
            const cp1Y = startY + (i % 2 === 0 ? curvature : -curvature);

            // Using Quadratic Bezier for simpler "one control point" curve, or Cubic for "S" shape.
            // Let's use Cubic Bezier for smoother "S" curves if needed, but Quadratic is often enough for game maps.
            // Let's try a Quadratic with a dynamic control point.

            path += ` Q ${cp1X} ${cp1Y}, ${endX} ${endY}`;
        }
        return path;
    };

    return (
        <div className="relative w-full aspect-video bg-[#3d2b25] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#5d4037]/50 select-none">
            {/* Background Texture/Image */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.4" />
                </svg>
            </div>

            {/* Decorative Map Elements (optional: rivers, mountains icons in background) */}
            <div className="absolute top-10 left-10 opacity-10"><MapPin size={100} /></div>
            <div className="absolute bottom-10 right-10 opacity-10"><Crown size={120} /></div>

            {/* SVG Path Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Shadow Path */}
                <path
                    d={generatePath()}
                    fill="none"
                    stroke="rgba(0,0,0,0.3)"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                {/* Main Path */}
                <path
                    d={generatePath()}
                    fill="none"
                    stroke="#8B4513" // SaddleBrown
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="4 2"
                />

                {/* Progress Path Animation - Visual trick: render path up to last unlocked node */}
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
                        {/* Status Indicator/Ring */}
                        {isCurrent && (
                            <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-30 animate-ping scale-150 pointer-events-none" />
                        )}

                        {/* Node Icon Circle */}
                        <div className={`
                            relative flex items-center justify-center w-14 h-14 rounded-full border-[3px] shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-all duration-300
                            ${isCompleted
                                ? 'bg-green-500 border-white ring-4 ring-green-500/20'
                                : isCurrent
                                    ? 'bg-gradient-to-br from-yellow-300 to-amber-500 border-white ring-4 ring-yellow-400/30'
                                    : 'bg-stone-700 border-stone-600 grayscale brightness-75'
                            }
                        `}
                            title={node.title}
                        >
                            {isCompleted ? <Check className="text-white w-7 h-7 stroke-[3]" /> :
                                isLocked ? <Lock className="text-stone-400 w-5 h-5" /> :
                                    node.type === 'start' ? <MapPin className="text-white w-7 h-7 drop-shadow-md" /> :
                                        node.type === 'final' ? <Crown className="text-white w-7 h-7 drop-shadow-md" /> :
                                            node.type === 'challenge' ? <Star className="text-white w-6 h-6 drop-shadow-md fill-white/20" /> :
                                                <BookOpen className="text-white w-6 h-6 drop-shadow-md" />
                            }
                        </div>

                        {/* Node Title Badge (visible on hover or if current) */}
                        <div className={`
                            absolute top-full mt-3 left-1/2 transform -translate-x-1/2 
                            bg-white text-brand-secondary text-xs font-bold py-1.5 px-3 rounded-xl 
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
