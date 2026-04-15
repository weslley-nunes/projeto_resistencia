'use client';
import { useState } from 'react';

interface Props {
    type: 'open-text' | 'file-upload';
    nodeId: string;
    moduleId: string;
}

export default function ActivitySubmissionForm({ type, nodeId, moduleId }: Props) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [textValue, setTextValue] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('type', type);
            formData.append('nodeId', nodeId);
            formData.append('moduleId', moduleId);

            if (type === 'open-text' && textValue) {
                formData.append('content', textValue);
            } else if (type === 'file-upload' && file) {
                formData.append('file', file);
            } else {
                throw new Error('Preencha os campos obrigatórios.');
            }

            const response = await fetch('/api/activity/submit', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar atividade.');
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Erro inesperado.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
                Sua resposta foi enviada com sucesso!
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {type === 'open-text' && (
                <textarea
                    required
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    placeholder="Escreva sua reflexão aqui..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none resize-y"
                />
            )}

            {type === 'file-upload' && (
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600">Selecione um arquivo (PDF, Imagem, etc.) max 5MB.</label>
                    <input
                        required
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-brand-primary text-white font-bold rounded-lg self-start hover:bg-brand-primary/90 transition disabled:opacity-50"
            >
                {loading ? 'Enviando...' : 'Enviar Atividade'}
            </button>
        </form>
    );
}
