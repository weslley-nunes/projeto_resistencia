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

    // SVG Path generation (simple linear interpolation for now, can be improved with curves)
    // We need to convert percentages to viewbox coordinates. Let's assume 100x100 viewbox for simplicity in calculations
    const generatePath = () => {
        if (nodes.length === 0) return '';

        let path = `M ${nodes[0].x} ${nodes[0].y}`;
        for (let i = 1; i < nodes.length; i++) {
            // Simple curve logic: control point is halfway in X, but varies in Y to creat a wave
            const startX = nodes[i - 1].x;
            const startY = nodes[i - 1].y;
            const endX = nodes[i].x;
            const endY = nodes[i].y;

            // Bezier curve
            const cpX = (startX + endX) / 2;
            const cpY = (startY + endY) / 2 + (i % 2 === 0 ? 10 : -10); // Alternating wave

            path += ` Q ${cpX} ${cpY}, ${endX} ${endY}`;
        }
        return path;
    };

    return (
        <div className="relative w-full aspect-video bg-emerald-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-700/50">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-80 hover:opacity-100 transition-opacity duration-700">
                <Image
                    src="/assets/map_background.png"
                    alt="Mapa do Tocantins"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Fog / Texture overlays could go here */}

            {/* SVG Path Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Shadow Path */}
                <path
                    d={generatePath()}
                    fill="none"
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                />
                {/* Dashed Path Connector */}
                <motion.path
                    d={generatePath()}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
            </svg>

            {/* Nodes Layer */}
            {nodes.map((node, index) => {
                const status = getNodeStatus(node.id, index);
                const isLocked = status === 'locked';
                const isCompleted = status === 'completed';

                return (
                    <motion.div
                        key={node.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer
                ${isLocked ? 'cursor-not-allowed grayscale' : 'cursor-pointer hover:scale-110'}
            `}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2, type: "spring" }}
                        onClick={() => !isLocked && onNodeClick(node)}
                        whileHover={!isLocked ? { scale: 1.2, rotate: 5 } : {}}
                    >
                        {/* Node Icon Circle */}
                        <div className={`
                relative flex items-center justify-center w-12 h-12 rounded-full border-4 shadow-lg transition-colors duration-300
                ${isCompleted ? 'bg-green-500 border-white' : isLocked ? 'bg-gray-700 border-gray-500' : 'bg-amber-500 border-amber-200 animate-pulse'}
            `}>
                            {isCompleted ? <Check className="text-white w-6 h-6" /> :
                                isLocked ? <Lock className="text-gray-400 w-5 h-5" /> :
                                    node.type === 'start' ? <MapPin className="text-white w-6 h-6" /> :
                                        node.type === 'final' ? <Crown className="text-white w-6 h-6" /> :
                                            <Star className="text-white w-6 h-6" />
                            }

                            {/* Node Label Tooltip (visible on hover) */}
                            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 hover:opacity-100 transition-opacity w-32 text-center pointer-events-none z-10">
                                {node.title}
                            </div>
                        </div>

                        {/* Ripple effect for current active node */}
                        {status === 'unlocked' && !isCompleted && (
                            <div className="absolute inset-0 rounded-full animate-ping bg-amber-400 opacity-75 -z-10"></div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
