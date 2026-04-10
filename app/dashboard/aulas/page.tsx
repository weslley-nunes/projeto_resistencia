'use client';

import { PlayCircle } from 'lucide-react';

export default function AulasPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-sans text-brand-secondary flex items-center gap-2">
                        <PlayCircle className="text-brand-primary" size={32} /> Aulas Gravadas
                    </h1>
                    <p className="text-gray-500 mt-2">Acesse aqui o conteúdo em vídeo da sua jornada de aprendizagem.</p>
                </div>
            </header>
            
            <div className="bg-white p-16 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-primary/10 text-brand-primary mb-6">
                    <PlayCircle size={48} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Em breve!</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                    Estamos preparando um acervo especial de aulas gravadas para complementar seus estudos. Volte novamente mais tarde!
                </p>
            </div>
        </div>
    );
}
