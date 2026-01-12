'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Map, Users, LogOut, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { icon: Map, label: "Trilha", href: "/dashboard" },
    { icon: ShoppingBag, label: "Loja", href: "/dashboard/shop" },
    { icon: Users, label: "Perfil", href: "/dashboard/profile" },
];

export default function Sidebar() {
    const { data: session } = useSession();
    const pathname = usePathname();

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
                <div className="absolute top-0 right-0 p-2 opacity-50"><Settings size={14} /></div>
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden border-2 border-brand-accent">
                        {/* Avatar Image would go here */}
                        {session?.user?.image && <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />}
                    </div>
                    <div>
                        <p className="font-bold text-sm truncate max-w-[100px]">{session?.user?.name || "Visitante"}</p>
                        <p className="text-xs text-brand-accent">Nível {session?.user?.level || 1}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center bg-black/20 p-2 rounded-lg">
                    <span className="text-xs text-gray-400">Educoins</span>
                    <span className="font-bold text-brand-accent">{session?.user?.educoins || 0} 🟡</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2">
                {sidebarItems.map((item) => {
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
