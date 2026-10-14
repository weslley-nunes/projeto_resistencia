export interface AulaPratica {
    id: string;
    moduloId: 'mod1' | 'mod2';
    moduloLabel: string;
    theme: string;
    practice: string;
    host: string;
    qa: string;
    date: string;
    videoUrl?: string;
}

export interface TrilhaModulo {
    id: 'modulo1' | 'modulo2' | 'modulo3' | 'modulo4';
    numero: number;
    title: string;
    subtitle: string;
    nodes: { id: string; title: string; type: string }[];
    quizTitle: string;
    finalActivityNodeId?: string;
}

export const AULAS_CRONOGRAMA: AulaPratica[] = [
    // Módulo 1
    { 
        id: "m1-0", 
        moduloId: "mod1", 
        moduloLabel: "Módulo 1", 
        date: "26/03", 
        theme: "Aula Inaugural: Apresentação do curso e do AVA", 
        qa: "---", 
        host: "WESLEY MUNIZ", 
        practice: "Familiarização com a plataforma", 
        videoUrl: "https://youtu.be/YsXhn3DVBP8" 
    },
    { 
        id: "m1-1", 
        moduloId: "mod1", 
        moduloLabel: "Módulo 1", 
        date: "09/04", 
        theme: "Direito à memória", 
        qa: "Quinta-feira, 19h", 
        host: "Cristiane Loriza Dantas PUC-Goiás", 
        practice: "Levantamento de memórias locais", 
        videoUrl: "https://youtu.be/RxLDTQeF5Rg" 
    },
    { 
        id: "m1-2", 
        moduloId: "mod1", 
        moduloLabel: "Módulo 1", 
        date: "23/04", 
        theme: "Memória e Paisagem", 
        qa: "Quinta-feira, 19h", 
        host: "Marianne Salun UNIFESP", 
        practice: "Registro fotográfico de paisagens culturais", 
        videoUrl: "https://youtu.be/CbJkXkIDhP8" 
    },
    { 
        id: "m1-3", 
        moduloId: "mod1", 
        moduloLabel: "Módulo 1", 
        date: "07/05", 
        theme: "Educação patrimonial no contexto regional", 
        qa: "Quinta-feira, 19h", 
        host: "Bianka Cristina Dias Alves UEG/PARFOR", 
        practice: "Pesquisa sobre patrimônio local", 
        videoUrl: "https://youtu.be/32bbrPlo0xQ" 
    },
    { 
        id: "m1-4", 
        moduloId: "mod1", 
        moduloLabel: "Módulo 1", 
        date: "21/05", 
        theme: "Participação da comunidade na gestão do patrimônio", 
        qa: "Quinta-feira, 19h", 
        host: "Paulo Campos UFMG", 
        practice: "Entrevista com liderança local", 
        videoUrl: "https://youtu.be/QQ6bwmikPjk" 
    },
    { 
        id: "m1-5", 
        moduloId: "mod1", 
        moduloLabel: "Módulo 1", 
        date: "03/06", 
        theme: "Diversidade e Patrimônio: saberes e fazeres tradicionais", 
        qa: "Quinta-feira, 19h", 
        host: "Luana Rodrigues UFMG", 
        practice: "Planejamento de oficina com mestre", 
        videoUrl: "https://youtu.be/eK9p7OCdBNM" 
    },
    { 
        id: "m1-6", 
        moduloId: "mod1", 
        moduloLabel: "Módulo 1", 
        date: "18/06", 
        theme: "Diversidade e Patrimônio: lugares e objetos", 
        qa: "Quinta-feira, 19h", 
        host: "Luana Campos UFMT", 
        practice: "Mapeamento de locais de memória", 
        videoUrl: "https://youtu.be/wMSyQfgbaVk" 
    },
    { 
        id: "m1-7", 
        moduloId: "mod1", 
        moduloLabel: "Módulo 1", 
        date: "18/06 a 30/06", 
        theme: "Oficinas práticas (20h)", 
        qa: "Acompanhamento tutor/articulador", 
        host: "---", 
        practice: "Oficinas de artes e ofícios" 
    },
    { 
        id: "m1-8", 
        moduloId: "mod1", 
        moduloLabel: "Módulo 1", 
        date: "18/06 a 30/06", 
        theme: "Contação de histórias (15h)", 
        qa: "Acompanhamento tutor/articulador", 
        host: "---", 
        practice: "Produção de podcast/vídeo" 
    },
    { 
        id: "m1-9", 
        moduloId: "mod1", 
        moduloLabel: "Módulo 1", 
        date: "18/06 a 30/06", 
        theme: "Roteiros culturais (20h)", 
        qa: "Acompanhamento tutor/articulador", 
        host: "---", 
        practice: "Desenvolvimento de roteiro educativo" 
    },

    // Módulo 2
    { 
        id: "m2-0", 
        moduloId: "mod2", 
        moduloLabel: "Módulo 2", 
        date: "06/08", 
        theme: "Arte-educação e patrimônio", 
        qa: "Quinta-feira, 19h", 
        host: "Emicleia Alves Pinheiro IFG", 
        practice: "Projeto de intervenção artística",
        videoUrl: "https://youtu.be/xRULXQp2i6s"
    },
    { 
        id: "m2-1", 
        moduloId: "mod2", 
        moduloLabel: "Módulo 2", 
        date: "20/08", 
        theme: "Educação Museal e Curadoria", 
        qa: "Quinta-feira, 19h", 
        host: "Henrique de Freitas - idealizador Museu Zoroastra Goiânia", 
        practice: "Planejamento de exposição virtual",
        videoUrl: "https://youtu.be/8I1U9n99xUA"
    },
    { 
        id: "m2-2", 
        moduloId: "mod2", 
        moduloLabel: "Módulo 2", 
        date: "03/09", 
        theme: "Inventários participativos", 
        qa: "Quinta-feira, 19h", 
        host: "Aline UNICAMP", 
        practice: "Elaboração de inventário local",
        videoUrl: "https://youtu.be/z_eRgo9dJ7o"
    },
    { 
        id: "m2-3", 
        moduloId: "mod2", 
        moduloLabel: "Módulo 2", 
        date: "17/09", 
        theme: "Educação patrimonial e tecnologias", 
        qa: "Quinta-feira, 19h", 
        host: "Daniel Corrêa UEG", 
        practice: "Criação de conteúdo digital",
        videoUrl: "https://youtu.be/0oLb_us2K6Y"
    },
    { 
        id: "m2-4", 
        moduloId: "mod2", 
        moduloLabel: "Módulo 2", 
        date: "01/10", 
        theme: "Educação patrimonial e turística", 
        qa: "Quinta-feira, 19h", 
        host: "Beatriz Couto / Gestora Pública", 
        practice: "Roteiro turístico-cultural",
        videoUrl: "https://youtu.be/T_2zgBLtkoM"
    },
    { 
        id: "m2-5", 
        moduloId: "mod2", 
        moduloLabel: "Módulo 2", 
        date: "02/10 a 30/11", 
        theme: "Curadoria de Exposição (20h)", 
        qa: "Acompanhamento tutor articulador", 
        host: "---", 
        practice: "Montagem de exposição na escola" 
    },
    { 
        id: "m2-6", 
        moduloId: "mod2", 
        moduloLabel: "Módulo 2", 
        date: "02/10 a 30/11", 
        theme: "Festival Cultural Temático (20h)", 
        qa: "Acompanhamento tutor articulador", 
        host: "---", 
        practice: "Organização do evento" 
    },
    { 
        id: "m2-7", 
        moduloId: "mod2", 
        moduloLabel: "Módulo 2", 
        date: "02/10 a 30/11", 
        theme: "Elaboração de material didático (20h)", 
        qa: "Acompanhamento tutor articulador", 
        host: "---", 
        practice: "Produção de livro, podcast ou jogo educativo" 
    }
];

export const TRILHAS_MODULOS: TrilhaModulo[] = [
    {
        id: 'modulo1',
        numero: 1,
        title: 'Etapa 01: Direito à Memória',
        subtitle: 'Fundamentos de Cultura, Memória, Alteridade e Resistência',
        quizTitle: 'Prova Final da Etapa 01',
        finalActivityNodeId: 'etapa1-final',
        nodes: [
            { id: 'etapa1-1', title: 'Eu sou porque somos', type: 'start' },
            { id: 'etapa1-2', title: 'Cultura e Memória', type: 'lesson' },
            { id: 'etapa1-3', title: 'Etnocentrismo e Negação', type: 'challenge' },
            { id: 'etapa1-4', title: 'Relativismo e Identidade', type: 'lesson' },
            { id: 'etapa1-5', title: 'Vozes do Patrimônio', type: 'lesson' },
            { id: 'etapa1-final', title: 'Cartografia da Memória (Conclusão)', type: 'final' }
        ]
    },
    {
        id: 'modulo2',
        numero: 2,
        title: 'Etapa 02: Memória e Paisagem',
        subtitle: 'Paisagens Culturais, Suportes da Memória e Práticas',
        quizTitle: 'Prova Final da Etapa 02',
        nodes: [
            { id: 'm2-intro', title: 'Paisagens Interiores', type: 'start' },
            { id: 'm2-identidade', title: 'Memória e Identidade', type: 'lesson' },
            { id: 'm2-suportes', title: 'Os Suportes da Memória', type: 'lesson' },
            { id: 'm2-paisagem', title: 'Paisagem e Patrimônio', type: 'lesson' },
            { id: 'm2-eternidade', title: 'Eternidade e Efêmero', type: 'lesson' },
            { id: 'm2-praticas', title: 'Práticas e Saberes', type: 'lesson' },
            { id: 'm2-quiz-final', title: 'Desafio Final (Quiz)', type: 'final' }
        ]
    },
    {
        id: 'modulo3',
        numero: 3,
        title: 'Etapa 03: Educação Patrimonial',
        subtitle: 'Autonomia, Papel Transformador e Contexto Regional',
        quizTitle: 'Prova Final da Etapa 03',
        nodes: [
            { id: 'm3-intro', title: 'Introdução à Educação Patrimonial', type: 'start' },
            { id: 'm3-autonomia', title: 'Educação e Autonomia', type: 'lesson' },
            { id: 'm3-vida', title: 'Patrimônio e Vida', type: 'lesson' },
            { id: 'm3-transformador', title: 'O Papel Transformador', type: 'lesson' },
            { id: 'm3-regional', title: 'Contexto Regional Tocantins', type: 'lesson' },
            { id: 'm3-praticas', title: 'Oficinas e Práticas', type: 'lesson' },
            { id: 'm3-quiz-final', title: 'Desafio Final (Quiz)', type: 'final' }
        ]
    },
    {
        id: 'modulo4',
        numero: 4,
        title: 'Etapa 04: Gestão do Patrimônio',
        subtitle: 'Legislação, Plano Diretor, Teorias e Participação Comunitária',
        quizTitle: 'Prova Final da Etapa 04',
        nodes: [
            { id: 'm4-intro', title: 'Introdução à Gestão do Patrimônio', type: 'start' },
            { id: 'm4-legislacao', title: 'Legislação e Preservação', type: 'lesson' },
            { id: 'm4-plano-diretor', title: 'Plano Diretor e Cidade', type: 'lesson' },
            { id: 'm4-teorias', title: 'Teorias da Preservação', type: 'lesson' },
            { id: 'm4-comunidade', title: 'Gestão Participativa', type: 'lesson' },
            { id: 'm4-quiz-final', title: 'Desafio Final (Quiz)', type: 'final' }
        ]
    }
];
