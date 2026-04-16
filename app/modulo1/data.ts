export type Slide = {
    type: 'cover' | 'text' | 'image-text' | 'quote' | 'activity' | 'video' | 'agenda' | 'raw-text';
    title: string;
    content: string; // Markdown supported
    image?: string;
    videoUrl?: string;
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
        question: 'Segundo o texto, a quem é facultado o "direito de existir" em certas construções historiográficas?',
        options: [
            'A todos os povos sem exceção.',
            'Apenas aos povos europeus, enquanto a memória de outros é apagada.',
            'Somente aos povos que não possuem cultura.',
            'Aos povos que optam por não ter memória.'
        ],
        correctAnswer: 1,
        explanation: 'O texto afirma que, diante de certas construções, nem todos os povos têm o direito de existir, pois suas memórias e culturas são apagadas.'
    },
    {
        id: 'q2',
        question: 'O que Brandão (1989) define como "vocação holística" da antropologia?',
        options: [
            'A negação da cultura do outro.',
            'A tentativa de compreensão e respeito à alteridade (o outro).',
            'O isolamento de grupos culturais.',
            'O estudo exclusivo das grandes civilizações.'
        ],
        correctAnswer: 1,
        explanation: 'A vocação holística busca ampliar a visão de mundo para compreender e respeitar o diferente.'
    },
    {
        id: 'q3',
        question: 'O que caracteriza o etnocentrismo cultural?',
        options: [
            'A valorização da diversidade.',
            'A visão de mundo onde um grupo coloca sua cultura como superior às demais.',
            'O estudo imparcial de costumes estrangeiros.',
            'A mistura equilibrada de várias culturas.'
        ],
        correctAnswer: 1,
        explanation: 'Etnocentrismo é julgar os outros grupos a partir dos próprios valores, considerando-os inferiores.'
    },
    {
        id: 'q4',
        question: 'Qual a principal contribuição do Relativismo Cultural de Franz Boas?',
        options: [
            'Afirmar que existe apenas uma cultura verdadeira.',
            'A ideia de que todas as culturas devem ser entendidas em seu próprio contexto.',
            'A defesa do silenciamento de minorias.',
            'A padronização das línguas mundiais.'
        ],
        correctAnswer: 1,
        explanation: 'O relativismo cultural prega que cada grupo produz cultura e ela deve ser respeitada em sua própria lógica.'
    },
    {
        id: 'q5',
        question: 'Segundo Emília Viotti da Costa, qual o perigo de um povo sem memória?',
        options: [
            'Esquecer sua língua nativa.',
            'Ficar fadado a cometer os mesmos erros do passado no presente.',
            'Perder suas riquezas materiais.',
            'Deixar de praticar atividades físicas.'
        ],
        correctAnswer: 1,
        explanation: 'A autora afirma que sem história e memória, o povo repete os erros cometidos anteriormente.'
    }
];

// --- LEARNING TRAIL NODES (Consolidated into 6 nodes) ---
export const mapNodes: MapNode[] = [
    {
        id: 'etapa1-1',
        title: 'Eu sou porque somos',
        description: 'Dinâmica inicial e Boas-vindas.',
        x: 18, y: 82, type: 'start', educoinsReward: 30,
        slides: [
            {
                type: 'cover',
                title: 'Quem sou eu?',
                content: 'Inicie um diálogo a partir de sua apresentação.\n\n"Eu sou Rosi e trago para essa roda o desejo de aprender e partilhar. O que espero levar?"',
                image: '/assets/quilombola_heritage_1776281094378.png'
            },
            {
                type: 'activity',
                title: 'Mural de Expectativas',
                content: 'Responda para a turma:',
                activity: {
                    type: 'open-text',
                    question: 'O que você traz para este curso e o que espera levar dele?'
                }
            }
        ]
    },
    {
        id: 'etapa1-2',
        title: 'Cultura e Memória',
        description: 'Fundamentos e Direito à Existência',
        x: 35, y: 65, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Quem rouba as memórias?',
                content: 'Não se pode falar de cultura sem falar de memórias. Para entender isso, usamos os conceitos de Cultura (Laraia) e Memória (Halbwachs).\n\nNem todos os povos tiveram o direito de "existir" na história oficial.'
            },
            {
                type: 'text',
                title: 'O Mundo da Cultura',
                content: 'A cultura caracteriza e qualifica o ser humano. Pela cultura, transformamos a natureza em significado. Somos seres pluriétnicos e multiculturais.'
            }
        ]
    },
    {
        id: 'etapa1-3',
        title: 'Etnocentrismo e Negação',
        description: 'As Marcas da Colonização',
        x: 58, y: 72, type: 'challenge', educoinsReward: 100,
        slides: [
            {
                type: 'quote',
                title: 'O Avesso do Nós',
                content: 'O etnocentrismo é a visão onde um grupo julga o outro como inferior a partir de seus próprios valores.'
            },
            {
                type: 'text',
                title: 'Silenciamento Histórico',
                content: 'A história foi escrita pelas mãos dos colonizadores. Aos ameríndios e africanos restou o silenciamento e a negação de suas existências.'
            },
            {
                type: 'activity',
                title: 'Quiz de Conhecimento',
                content: 'Verifique o que aprendeu sobre etnocentrismo e cultura.',
                activity: {
                    type: 'quiz',
                    question: 'Pronto para o desafio?'
                }
            }
        ]
    },
    {
        id: 'etapa1-4',
        title: 'Relativismo e Identidade',
        description: 'Diálogo e Respeito à Diferença',
        x: 72, y: 52, type: 'lesson', educoinsReward: 60,
        slides: [
            {
                type: 'text',
                title: 'Franz Boas',
                content: 'O Relativismo Cultural defende que cada cultura deve ser entendida em seu próprio contexto. Isso combate o racismo e a xenofobia.'
            },
            {
                type: 'quote',
                title: 'Ethos e Pertença',
                content: 'O ethos é o conjunto de maneiras de ser que torna um grupo único e singular. Nos reconhecemos através do coletivo.'
            }
        ]
    },
    {
        id: 'etapa1-5',
        title: 'Vozes do Patrimônio',
        description: 'Memória Coletiva e Resistência',
        x: 48, y: 40, type: 'lesson', educoinsReward: 60,
        slides: [
            {
                type: 'video',
                title: 'Filhos da Terra',
                content: 'Assista a este documentário sobre resistência e memória viva.',
                videoUrl: 'https://www.youtube.com/watch?v=xKrIZUVTdvc'
            },
            {
                type: 'activity',
                title: 'Atividade Reflexiva',
                content: '"Um povo sem memória é um povo sem história. E um povo sem história está fadado a cometer os mesmos erros do passado" (Emília Viotti da Costa).',
                activity: {
                    type: 'open-text',
                    question: 'Escreva um texto narrativo a partir dessa afirmação.'
                }
            }
        ]
    },
    {
        id: 'etapa1-final',
        title: 'Cartografia da Memória',
        description: 'Trabalho de Conclusão da Etapa',
        x: 25, y: 22, type: 'final', educoinsReward: 200,
        slides: [
            {
                type: 'cover',
                title: 'Prática Final',
                content: 'Elabore sua Cartografia da Memória. Identifique marcos em seu território, família ou comunidade que representem o direito à memória.',
                image: '/assets/festa_divino_1776281053453.png'
            },
            {
                type: 'activity',
                title: 'Entrega da Atividade',
                content: 'Este envio é obrigatório para concluir a Etapa 01 e liberar a próxima fase.',
                activity: {
                    type: 'file-upload',
                    question: 'Anexe aqui sua Cartografia (PDF, Imagem ou Texto).'
                }
            }
        ]
    }
];

export const fullAcademicText = `A reestruturação consolidou o conteúdo do Tópico 1 em 6 nós principais, mantendo a profundidade acadêmica e todas as atividades sugeridas (Dinâmica inicial, Quiz, Atividade Reflexiva e Cartografia da Memória).`;
