export type Slide = {
    type: 'cover' | 'text' | 'image-text' | 'quote' | 'activity' | 'video' | 'agenda' | 'raw-text';
    title: string;
    content: string; // Markdown supported
    image?: string;
    activity?: {
        type?: 'quiz' | 'open-text' | 'file-upload' | 'forum';
        question: string;
        options?: string[];
        correctAnswer?: number;
        feedback?: string;
    };
    agenda?: {
        dates: { date: string; type: 'live' | 'qa'; link?: string }[];
    }
};

export type MapNode = {
    id: string;
    title: string;
    description: string;
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
    type: 'start' | 'lesson' | 'challenge' | 'final' | 'info';
    slides: Slide[];
    educoinsReward: number;
};

export type QuizQuestion = {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // Index
    explanation: string;
};

// --- QUIZ BANK ---
export const quizQuestions: QuizQuestion[] = [
    {
        id: 'q1',
        question: 'O que defende a educação patrimonial contemporânea?',
        options: [
            'O foco deve ser exclusivo em monumentos históricos e obras de arte europeias.',
            'As memórias e identidades de todos os grupos sociais importam, sendo essenciais para a cidadania.',
            'O patrimônio deve ser mantido distante da comunidade para preservação física.'
        ],
        correctAnswer: 1,
        explanation: 'A educação patrimonial contemporânea valoriza a diversidade e atua na formação cidadã.'
    }
];

// --- LEARNING TRAIL NODES (Updated for Etapa 2) ---
export const mapNodes: MapNode[] = [
    {
        id: 'node-info',
        title: 'Agenda & Materiais (Etapa 2)',
        description: 'Datas das aulas ao vivo, plantões e arquivos pertinentes.',
        x: 10, y: 85, type: 'info', educoinsReward: 0,
        slides: [
            {
                type: 'cover',
                title: 'Agenda Etapa 2',
                content: 'Módulo 2 - Educação patrimonial para além da sala de aula',
                image: '/assets/illustration_culture.png'
            },
            {
                type: 'agenda',
                title: 'Cronograma Etapa 2',
                content: 'Encontros e lives de consolidação.',
                agenda: {
                    dates: [
                        { date: '02/07/2026', type: 'live', link: 'https://meet.google.com/hps-okye-rvx' },
                        { date: '16/07/2026', type: 'live', link: 'https://meet.google.com/hps-okye-rvx' }
                    ]
                }
            }
        ]
    },
    {
        id: 'node-1',
        title: 'Tópico 1 - Arte-educação e patrimônio',
        description: '“Só há um meio eficaz de assegurar a defesa permanente do patrimônio..."',
        x: 25, y: 85, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Arte-educação e Patrimônio',
                content: 'A educação patrimonial constitui um campo estratégico para a valorização da diversidade cultural, da memória social e dos saberes ancestrais... Patrimônio e diversidade são dimensões indissociáveis.'
            },
            {
                type: 'activity',
                title: 'Patrimônio Vivo na Prática Escolar',
                content: 'Objetivo: Articular educação patrimonial, diversidade cultural e práticas pedagógicas no cotidiano.',
                activity: {
                    type: 'file-upload',
                    question: 'Anexe o Produto Final: Seu "Projeto de Educação Patrimonial" para aplicação escolar ou comunitária (PDF ou Documento).'
                }
            }
        ]
    },
    {
        id: 'node-2',
        title: 'Tópico 2: Educação Museal e Curadoria',
        description: 'Os espaços culturais como ambientes educativos.',
        x: 40, y: 75, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Curadoria e Educação Museal',
                content: 'O conceito de museu desloca-se de uma instituição centrada no objeto para uma instituição centrada nas pessoas, memórias e territórios. O que é curar o que nos cura?'
            },
            {
                type: 'activity',
                title: 'Oficina: Curar o que nos cura',
                content: 'Propõe-se criar uma miniexposição estruturando respostas de curadoria compartilhada.',
                activity: {
                    type: 'open-text',
                    question: '1) Qual história queremos contar? 2) Que sujeitos foram silenciados? 3) Que imagens representam essa narrativa? 4) Para quem? 5) Que aprendizado provoca?'
                }
            },
            {
                type: 'activity',
                title: 'Envio da Miniexposição',
                content: '',
                activity: {
                    type: 'file-upload',
                    question: 'Faça upload do seu Cartaz Curatorial ou registro fotográfico da maquete simbólica.'
                }
            }
        ]
    },
    {
        id: 'node-3',
        title: 'Tópico 3: Inventários participativos',
        description: 'Identificação e valorização construída coletivamente.',
        x: 55, y: 60, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Afinal o que é um inventário participativo?',
                content: 'É uma metodologia de registro... com a participação ativa das comunidades detentoras dos saberes, práticas e referências culturais inventariadas.'
            },
            {
                type: 'activity',
                title: 'Inventário Participativo',
                content: 'Aplicação prática: Inventário de Saberes Quilombolas, Indígenas ou de Território.',
                activity: {
                    type: 'file-upload',
                    question: 'Envie aqui os Produtos do Inventário: Gravações, Imagens, Mapas de Território ou Cadernos de Memória.'
                }
            }
        ]
    },
    {
        id: 'node-4',
        title: 'Tópico 4: Educação patrimonial e tecnologias',
        description: 'Pluralidade cultural em mídias digitais.',
        x: 75, y: 55, type: 'lesson', educoinsReward: 60,
        slides: [
            {
                type: 'text',
                title: 'A Tecnologia como Mediação',
                content: 'Quando articulada às tecnologias, a Educação Patrimonial potencializa ainda mais sua função social e pedagógica. Deixa de ser apenas uma ferramenta instrumental.'
            },
            {
                type: 'activity',
                title: 'Vozes da Memória (Podcast)',
                content: 'Escolha um bem cultural imaterial e produza um episódio curto (áudio ou roteiro).',
                activity: {
                    type: 'open-text',
                    question: 'Se você publicou seu Podcast (ex: Spotify, Anchor), cole o link aqui. Se preferir, digite o seu roteiro base:'
                }
            }
        ]
    },
    {
        id: 'node-5',
        title: 'Tópico 5: Patrimônio e Turismo',
        description: 'Turismo, identidade e respeito mútuo.',
        x: 85, y: 35, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Educação Patrimonial e Turística',
                content: 'O turismo deve deixar de ser apenas um vetor econômico para se tornar espaço de aprendizagem mútua e intercultural, de forma crítica e ética.'
            },
            {
                type: 'activity',
                title: 'Cartografia Patrimonial',
                content: 'O que é patrimônio para você e como ele aparece nas práticas turísticas do seu território?',
                activity: {
                    type: 'file-upload',
                    question: 'Envie a foto ou documento da Cartografia Patrimonial identificando bens materiais e imateriais.'
                }
            }
        ]
    },
    {
        id: 'node-6',
        title: 'Tópico 6 e 7: Festivais e Curadoria F.',
        description: 'O festival como narrativa e curadoria do evento.',
        x: 65, y: 25, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Curadoria Plural e Eventos',
                content: 'A concepção ética de eventos culturais deve estruturar-se em eixos narrativos para evitar a dispersão. O Festival Temático aproxima a cultura da educação.'
            },
            {
                type: 'activity',
                title: 'Estruturação',
                content: 'Delineando o Festival Temático.',
                activity: {
                    type: 'open-text',
                    question: 'Defina o tema estruturante e a dimensão pedagógica do seu Festival Cultural Temático:'
                }
            }
        ]
    },
    {
        id: 'node-7',
        title: 'Tópico 8: Elaboração de Material',
        description: 'Material didático como fundamento político.',
        x: 45, y: 20, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Material e Sistematização',
                content: 'O material didático organiza a visão de mundo que está sendo compartilhada. Em um curso com quilombolas e tradicionais ele deve ser decolonial.'
            },
            {
                type: 'activity',
                title: 'Reflexão Final',
                content: 'O desafio da justiça cognitiva.',
                activity: {
                    type: 'open-text',
                    question: 'Como o seu material didático se propõe a ser instrumento de justiça cognitiva?'
                }
            }
        ]
    },
    {
        id: 'node-final',
        title: 'Quiz Final de Etapa',
        description: 'Teste seus conhecimentos sobre educação e patrimônio.',
        x: 20, y: 15, type: 'final', educoinsReward: 100,
        slides: [
            {
                type: 'cover',
                title: 'Conclusão da Etapa 2',
                content: 'Parabéns por chegar até o final. Vamos testar seus conhecimentos e liberar suas EduCoins!',
                image: '/assets/illustration_badge.png'
            }
        ]
    }
];
