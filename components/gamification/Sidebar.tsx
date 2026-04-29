'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LayoutDashboard, Map, Users, LogOut, Settings, Video, MessageSquare } from "lucide-react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/lib/store";

const sidebarItems = [
    { icon: Map, label: "Trilha", href: "/dashboard" },
    { icon: Video, label: "Aulas", href: "/dashboard/aulas" },
    { icon: MessageSquare, label: "Galeria", href: "/dashboard/atividades-publicas" },
    { icon: Users, label: "Perfil", href: "/dashboard/profile" },
    // Admin Link (Checks role in component, but adding here for structure)
    { icon: LayoutDashboard, label: "Gestão", href: "/admin", adminOnly: true },
];

export default function Sidebar() {
    const { data: session } = useSession();
    const { level, educoins, syncProgress } = useGameStore();
    const pathname = usePathname();

    useEffect(() => {
        if (session?.user?.email) {
            fetch('/api/progress')
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data) {
                        syncProgress(data.educoins, data.xp, data.level, data.completedNodes);
                    }
                })
                .catch(err => console.error("Error syncing progress", err));
        }
    }, [session, syncProgress]);

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-brand-secondary text-white border-r border-white/10 flex flex-col z-50">
            <div className="p-6 border-b border-white/10">
                <h1 className="font-bold text-xl tracking-tighter flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-brand-accent text-sm">PR</span>
                    Resistência
                </h1>
            </div>

            {/* User Stats Summary */}
            <div className="p-6 bg-white/5 mx-4 mt-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-brand-primary/30 transition">
                <Link href="/dashboard/profile" className="absolute top-0 right-0 p-2 opacity-50 hover:opacity-100 hover:text-brand-accent transition">
                    <Settings size={14} />
                </Link>
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-white overflow-hidden border-2 border-brand-accent flex items-center justify-center">
                        {session?.user?.image ? (
                            <img src={session.user.image} alt="Avatar do usuário" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold">
                                {(session?.user?.name || "U")[0].toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="font-bold text-sm truncate max-w-[100px]">{session?.user?.name || "Visitante"}</p>
                        <p className="text-xs text-brand-accent">Nível {level}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center bg-black/20 p-2 rounded-lg">
                    <span className="text-xs text-gray-400">Educoins</span>
                    <span className="font-bold text-brand-accent">{educoins} 🟡</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2">
                {sidebarItems.filter(item => !item.adminOnly || (session?.user as any)?.role === 'ADMIN').map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                isActive
                                    ? "bg-brand-primary text-white font-medium shadow-lg shadow-brand-primary/20"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
                >
                    <LogOut size={20} />
                    Sair
                </button>
            </div>
        </aside>
    );
}
