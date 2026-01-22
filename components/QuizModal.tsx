'use client';
import { useState, useEffect } from 'react';
import { QuizQuestion } from '@/app/modulo1/data';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, Trophy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizModalProps {
    questions: QuizQuestion[];
    onClose: () => void;
    onComplete: (score: number, passed: boolean) => void;
}

export default function QuizModal({ questions, onClose, onComplete }: QuizModalProps) {
    const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    // Initialize Quiz: Shuffle questions and options
    useEffect(() => {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        // Limit to 8 questions or length
        const selected = shuffled.slice(0, 8);
        setActiveQuestions(selected);
    }, [questions]);

    const handleAnswer = (optionIndex: number) => {
        if (isAnswered) return;
        setSelectedOption(optionIndex);
        setIsAnswered(true);

        if (optionIndex === activeQuestions[currentQuestionIndex].correctAnswer) {
            setScore(s => s + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < activeQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = () => {
        setShowResults(true);
        const finalScore = score;
        const total = activeQuestions.length;
        const percentage = (finalScore / total) * 100;
        const passed = percentage >= 50;

        if (passed) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        // Wait a bit for user to see result screen, or trigger callback immediately if preferred
        // We'll let the user click "Finish" on the result screen
    };

    const handleCloseResults = () => {
        const total = activeQuestions.length;
        const percentage = (score / total) * 100;
        const passed = percentage >= 50;
        onComplete(percentage, passed);
    };

    if (activeQuestions.length === 0) return <div>Carregando prova...</div>;

    const currentQ = activeQuestions[currentQuestionIndex];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
                {!showResults ? (
                    <>
                        {/* Header */}
                        <div className="bg-brand-secondary p-6 text-white flex justify-between items-center">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Trophy className="text-brand-accent" />
                                Prova Final: Questão {currentQuestionIndex + 1}/{activeQuestions.length}
                            </h2>
                            <button onClick={onClose} className="text-white/60 hover:text-white">Cancelar</button>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 h-2">
                            <div
                                className="bg-brand-accent h-2 transition-all duration-300"
                                style={{ width: `${((currentQuestionIndex) / activeQuestions.length) * 100}%` }}
                            />
                        </div>

                        {/* Question Content */}
                        <div className="p-8 overflow-y-auto grow">
                            <h3 className="text-2xl font-bold text-gray-800 mb-8">{currentQ.question}</h3>

                            <div className="space-y-3">
                                {currentQ.options.map((option, idx) => {
                                    let btnClass = "w-full p-4 rounded-xl border-2 text-left transition-all font-medium text-lg ";

                                    if (isAnswered) {
                                        if (idx === currentQ.correctAnswer) {
                                            btnClass += "bg-green-100 border-green-500 text-green-800";
                                        } else if (idx === selectedOption) {
                                            btnClass += "bg-red-100 border-red-500 text-red-800";
                                        } else {
                                            btnClass += "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
                                        }
                                    } else {
                                        btnClass += selectedOption === idx
                                            ? "bg-brand-secondary text-white border-brand-secondary"
                                            : "bg-white border-gray-200 hover:border-brand-primary hover:bg-brand-primary/5 text-gray-700";
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            disabled={isAnswered}
                                            className={btnClass}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span>{option}</span>
                                                {isAnswered && idx === currentQ.correctAnswer && <CheckCircle size={20} className="text-green-600" />}
                                                {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswer && <XCircle size={20} className="text-red-600" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Explanation / Feedback */}
                            {isAnswered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-4 bg-brand-secondary/5 rounded-xl border border-brand-secondary/10"
                                >
                                    <p className="font-bold text-brand-secondary mb-1">Explicação:</p>
                                    <p className="text-gray-600">{currentQ.explanation}</p>
                                </motion.div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
                            <button
                                onClick={handleNext}
                                disabled={!isAnswered}
                                className="px-8 py-3 bg-brand-primary text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-primary/90 transition flex items-center gap-2"
                            >
                                {currentQuestionIndex === activeQuestions.length - 1 ? 'Finalizar Prova' : 'Próxima Questão'}
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </>
                ) : (
                    /* Results Screen */
                    <div className="p-12 text-center flex flex-col items-center justify-center h-full">
                        <div className="mb-6 relative">
                            <Trophy size={80} className={score / activeQuestions.length >= 0.5 ? "text-yellow-500" : "text-gray-300"} />
                            {score / activeQuestions.length >= 0.5 && (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-yellow-400 opacity-20 blur-xl rounded-full"
                                />
                            )}
                        </div>

                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            {score / activeQuestions.length >= 0.5 ? "Parabéns!" : "Tente Novamente"}
                        </h2>

                        <p className="text-gray-500 text-lg mb-8">
                            Você acertou <strong className="text-brand-secondary">{score}</strong> de <strong className="text-brand-secondary">{activeQuestions.length}</strong> questões.
                        </p>

                        <div className="flex gap-4">
                            {score / activeQuestions.length < 0.5 && (
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition"
                                >
                                    Estudar Mais
                                </button>
                            )}
                            <button
                                onClick={handleCloseResults}
                                className="px-8 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition shadow-xl"
                            >
                                {score / activeQuestions.length >= 0.5 ? "Resgatar Recompensas" : "Sair"}
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
