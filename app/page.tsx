'use client';

import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { ArrowRight, Sparkles, Trophy, Users } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-secondary text-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {/* Placeholder for Logo */}
          <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center font-bold text-brand-accent">PR</div>
          <span className="text-xl font-bold tracking-tighter">Projeto Resistência</span>
        </div>
        <div>
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition backdrop-blur-sm"
          >
            Entrar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/30 text-brand-accent text-sm font-medium">
            <Sparkles size={16} />
            <span>Educação Patrimonial Gamificada</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Descubra a História <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
              Jogando
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
            Bem-vindo ao Ambiente Virtual de Aprendizagem do <strong>Projeto Resistência</strong>.
            Uma formação híbrida de <strong>225h</strong> para transformar a educação patrimonial nas escolas do Tocantins.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="px-8 py-4 rounded-full bg-brand-primary text-white font-bold text-lg hover:bg-brand-primary/90 transition shadow-lg shadow-brand-primary/25 flex items-center justify-center gap-2 group"
            >
              Começar Aventura
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#sobre" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition backdrop-blur-sm flex items-center justify-center w-full sm:w-auto">
              Conhecer o Curso
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative"
        >
          {/* Abstract graphic representation */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary to-brand-accent rounded-full blur-[100px] opacity-20 animate-pulse"></div>
            <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500">
              <div className="h-full flex flex-col justify-between gap-4">
                <div className="flex justify-between items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-700/50"></div>
                  <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">Nível 5</div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-gray-700/50 rounded animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-gray-700/50 rounded animate-pulse"></div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-brand-primary/20 to-transparent border border-brand-primary/30">
                  <p className="text-sm text-brand-accent font-bold">Nova Missão Desbloqueada!</p>
                </div>
              </div>
            </div>

            {/* Gamification Badge Float */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-6 -right-6 bg-brand-secondary p-4 rounded-2xl border border-white/10 shadow-xl flex items-center gap-3"
            >
              <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-500">
                <LayoutDashboard size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Educoins</p>
                <p className="text-xl font-bold text-white">1.250</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {icon: <Sparkles className="text-brand-accent" />, title: "Trilhas de Aprendizagem", desc: "Navegue por fases e módulos de forma interativa." }
          ].map((f, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.2 }}
        className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-brand-primary/50 transition duration-300 group"
      >
        <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 flex items-center justify-center mb-6 group-hover:bg-brand-primary transition">
          {f.icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{f.title}</h3>
        <p className="text-gray-400">{f.desc}</p>
      </motion.div>
          ))}
    </div>
      </section >
    </div >
  );
}
