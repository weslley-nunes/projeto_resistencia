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
            Bem-vindo ao Ambiente Virtual de Aprendizagem mais inovador do Tocantins.
            Escolha seu avatar, complete missões, ganhe Educoins e troque por recompensas reais.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="px-8 py-4 rounded-full bg-brand-primary text-white font-bold text-lg hover:bg-brand-primary/90 transition shadow-lg shadow-brand-primary/25 flex items-center justify-center gap-2 group"
            >
              Começar Aventura
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition backdrop-blur-sm">
              Saiba Mais
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative"
        >
          {/* Abstract graphic representation since we don't have hero image yet */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary to-brand-accent rounded-full blur-[100px] opacity-20 animate-pulse"></div>
            <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500">
              <div className="h-full flex flex-col justify-between gap-4">
                <div className="flex justify-between items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-700/50"></div>
                  <div className="px-3 py-1 rounded-full bg-brand-accent text-black font-bold text-xs flex items-center gap-1">
                    <Trophy size={12} /> LEVEL 5
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-3/4 rounded bg-gray-700/50"></div>
                  <div className="h-4 w-1/2 rounded bg-gray-700/50"></div>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-brand-primary/20 border border-brand-primary/30">
                  <p className="text-sm font-semibold text-brand-accent">Nova Missão Desbloqueada!</p>
                </div>
              </div>
            </div>
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-brand-secondary border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="bg-brand-accent p-2 rounded-lg text-black"><Trophy size={20} /></div>
              <div>
                <p className="text-xs text-gray-400">Educoins</p>
                <p className="font-bold text-brand-accent text-xl">1.250</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Features Preview */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Users className="text-brand-accent" />, title: "Avatares Personalizáveis", desc: "Crie sua identidade única e evolua seu personagem." },
            { icon: <Trophy className="text-brand-accent" />, title: "Recompensas Reais", desc: "Troque seus Educoins por itens na loja virtual." },
            { icon: <Sparkles className="text-brand-accent" />, title: "Trilhas de Aprendizagem", desc: "Navegue por fases e módulos de forma interativa." }
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
      </section>
    </div>
  );
}
