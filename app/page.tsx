'use client';

import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { ArrowRight, Sparkles, Trophy, Users, LayoutDashboard } from 'lucide-react';
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
              onClick={() => signIn('google', { callbackUrl: '/inscricao' })}
              className="px-8 py-4 rounded-full bg-brand-primary text-white font-bold text-lg hover:bg-brand-primary/90 transition shadow-lg shadow-brand-primary/25 flex items-center justify-center gap-2 group"
            >
              Inscreva-se Agora
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

      {/* Institutional Section - Partners */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-12 opacity-80 grayscale hover:grayscale-0 transition duration-500">
          {/* Here we would put proper standard logos, using text for now */}
          <div className="text-2xl font-bold text-gray-400 flex items-center gap-2"><span className="text-brand-primary font-black">UFT</span><span className="text-xs max-w-[100px] leading-tight block">Universidade Federal do Tocantins</span></div>
          <div className="text-2xl font-bold text-gray-400 flex items-center gap-2"><span className="text-blue-600 font-black">IPHAN</span><span className="text-xs max-w-[150px] leading-tight block">Instituto do Patrimônio Histórico e Artístico Nacional</span></div>
          <div className="text-2xl font-bold text-gray-400 flex items-center gap-2"><span className="text-yellow-600 font-black">SEDUC</span><span className="text-xs max-w-[100px] leading-tight block">Secretaria da Educação</span></div>
        </div>
      </section>

      {/* Acolhida / Video Section */}
      <section id="acolhida" className="py-20 bg-brand-secondary relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Acolhida</h2>
          <div className="aspect-video w-full bg-black/40 rounded-3xl border border-white/10 shadow-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-brand-primary/10 transition"></div>
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition">
              <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2"></div>
            </div>
            <p className="absolute bottom-6 text-white/50 text-sm">Vídeo de Apresentação (Em Breve)</p>
          </div>
        </div>
      </section>

      {/* Course Overview Section */}
      <section id="sobre" className="py-20 bg-gray-50 text-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary mb-4">Visão Geral do Curso</h2>
            <div className="w-20 h-1 bg-brand-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <span className="font-bold text-xl">225h</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Objeto e Escopo</h3>
              <p className="text-gray-600 leading-relaxed">
                Curso híbrido (EAD + Práticas Presenciais) totalizando 225 horas.
                <br /><span className="font-medium text-brand-primary">• 110h</span> de Fundamentação Teórica
                <br /><span className="font-medium text-brand-primary">• 115h</span> de Atividades Práticas
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Público-Alvo e Território</h3>
              <p className="text-gray-600 mb-4">Professores da rede estadual de ensino de 6 municípios:</p>
              <div className="flex flex-wrap gap-2">
                {['Arraias', 'Aurora', 'Lavandeira', 'Combinado', 'Novo Alegre', 'Paranã'].map(city => (
                  <span key={city} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">{city}</span>
                ))}
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mb-6">
                <span className="font-bold">⚖️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Alinhamento Institucional</h3>
              <p className="text-gray-600 leading-relaxed">
                Em consonância com a <strong>Portaria IPHAN nº 137/2016</strong>. Incentiva a participação social, valorização do território educativo e intersetorialidade.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-red-100 text-brand-primary rounded-xl flex items-center justify-center mb-6">
                <span className="font-bold">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Foco Temático</h3>
              <p className="text-gray-600 leading-relaxed">
                Educação Patrimonial e <strong>culturas afro-diaspóricas</strong>. Projetos voltados para comunidades escolares da rede pública.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-gray-50 text-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary mb-4">Metodologia do Curso</h2>
            <div className="w-20 h-1 bg-brand-primary mx-auto rounded-full mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              O curso é organizado em dois itinerários didáticos, integrando teoria e prática através de oficinas temáticas,
              contação de histórias e diálogos com mestres de ofício. Uma abordagem contínua e formativa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-bl-full -mr-16 -mt-16 transition group-hover:bg-brand-primary/20"></div>
              <h3 className="text-2xl font-bold mb-4 text-brand-secondary">Itinerário 1</h3>
              <p className="text-gray-600 mb-6">
                Enfatiza a <strong>educação escolar e patrimônio</strong>, promovendo cidadania, identidade e diversidade cultural,
                conectando alunos com suas raízes.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-primary"></div>Oficinas Temáticas</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-primary"></div>Projetos em Sala de Aula</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-bl-full -mr-16 -mt-16 transition group-hover:bg-brand-accent/20"></div>
              <h3 className="text-2xl font-bold mb-4 text-brand-secondary">Itinerário 2</h3>
              <p className="text-gray-600 mb-6">
                Foca na <strong>educação patrimonial além da sala de aula</strong>, valorizando a cultura em contextos mais amplos e práticos.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-accent"></div>Saídas Experimentais</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-accent"></div>Curadoria de Exposições</li>
              </ul>
            </div>
          </div>

          {/* Evaluation Section */}
          <div className="bg-brand-secondary text-white rounded-3xl p-8 md:p-12 relative overflow-hidden mb-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-8 text-center">Sistema de Avaliação</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition">
                  <div className="text-4xl mb-4">📝</div>
                  <h4 className="font-bold text-xl mb-2">Avaliação Contínua</h4>
                  <p className="text-sm text-gray-300">Acompanhamento do progresso dos participantes com feedback regular sobre o desenvolvimento.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition">
                  <div className="text-4xl mb-4">🤝</div>
                  <h4 className="font-bold text-xl mb-2">Participação</h4>
                  <p className="text-sm text-gray-300">A colaboração ativa e a troca de experiências são fundamentais para o sucesso coletivo.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition">
                  <div className="text-4xl mb-4">🎨</div>
                  <h4 className="font-bold text-xl mb-2">Produção</h4>
                  <p className="text-sm text-gray-300">Criação de materiais e atividades práticas que apliquem o conhecimento de forma criativa.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Platform / AVA */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-brand-secondary mb-6">Plataforma AVA e Suporte</h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Utilizamos uma plataforma Moodle personalizada para oferecer uma experiência de aprendizado interativa, acessível e colaborativa.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold shrink-0">01</div>
                  <div>
                    <h5 className="font-bold text-gray-800">Ambiente Personalizado</h5>
                    <p className="text-gray-500 text-sm">Adaptado para atender às necessidades específicas do curso.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">02</div>
                  <div>
                    <h5 className="font-bold text-gray-800">Interatividade</h5>
                    <p className="text-gray-500 text-sm">Acesso a conteúdos ricos e ferramentas de colaboração online.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold shrink-0">03</div>
                  <div>
                    <h5 className="font-bold text-gray-800">Suporte Técnico</h5>
                    <p className="text-gray-500 text-sm">Equipe dedicada para garantir uma experiência sem interrupções.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-3xl p-8 flex items-center justify-center min-h-[400px]">
              {/* Placeholder for AVA screenshot or graphic */}
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-secondary to-brand-primary rounded-2xl shadow-2xl transform rotate-3"></div>
                <div className="absolute inset-0 bg-white rounded-2xl shadow-xl flex flex-col p-6 -rotate-3 transition hover:rotate-0 duration-500">
                  <div className="h-8 bg-gray-100 rounded-lg w-1/3 mb-4"></div>
                  <div className="flex-1 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 font-medium">Interface do AVA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-secondary py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2026 Projeto Resistência. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">Arraias - TO</p>
        </div>
      </footer>
    </div>
  );
}
