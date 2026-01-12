export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-sans text-brand-secondary">Minha Jornada</h1>
                <div className="px-4 py-2 bg-brand-accent/20 text-brand-secondary font-bold rounded-lg border border-brand-accent/50">
                    Módulo 1: Introdução
                </div>
            </div>

            {/* Placeholder for Learning Trail */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[500px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#6a3c31_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <p className="text-gray-400 font-medium">Mapa da Trilha em Desenvolvimento...</p>
            </div>
        </div>
    );
}
