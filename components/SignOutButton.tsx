'use client';

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition flex items-center gap-2 font-medium"
        >
            <LogOut size={18} />
            Sair do Sistema
        </button>
    );
}
