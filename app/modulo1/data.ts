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

// --- LEARNING TRAIL NODES (Full Granular Etapa 01 Path) ---
export const mapNodes: MapNode[] = [
    {
        id: 'etapa1-1',
        title: 'Eu sou porque somos',
        description: 'Dinâmica inicial de apresentação.',
        x: 42, y: 85, type: 'start', educoinsReward: 30,
        slides: [
            {
                type: 'cover',
                title: 'Quem sou eu?',
                content: 'Inicie um diálogo a partir de sua apresentação. O que trago? O que espero levar?\n\nExemplo: "Eu sou Rosi e trago para essa roda o desejo de aprender e partilhar."',
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
        title: 'Direito à Memória',
        description: 'Fundamentos: Laraia e Halbwachs',
        x: 32, y: 78, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Roubando Memórias',
                content: 'Mas quem é capaz de roubar memórias? A quem foi dado esse direito? \n\nPara responder, usamos o conceito de cultura (Laraia, 2009) e memória individual/coletiva (Halbwachs, 2006).'
            }
        ]
    },
    {
        id: 'etapa1-3',
        title: 'Vocação Holística',
        description: 'Compreendendo o Sujeito Social',
        x: 45, y: 72, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Alteridade e Diálogo',
                content: 'Brandão (1989) propõe a “vocação holística” para ampliar visões de mundo na tentativa de compreensão e respeito à alteridade.'
            }
        ]
    },
    {
        id: 'etapa1-4',
        title: 'Multiculturalismo',
        description: 'O Mundo da Cultura',
        x: 58, y: 68, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Significado e Criação',
                content: 'A cultura é o que nos caracteriza e qualifica. O multiculturalismo é a capacidade de compreender que somos diversos, compostos por muitas culturas.'
            }
        ]
    },
    {
        id: 'etapa1-5',
        title: 'Etnocentrismo Cultural',
        description: 'A Visão de Superioridade',
        x: 72, y: 75, type: 'challenge', educoinsReward: 100,
        slides: [
            {
                type: 'text',
                title: 'Etnocentrismo',
                content: 'Prática histórica onde grupos colocam sua cultura como superior. Propagada no século XV pela colonização europeia.'
            },
            {
                type: 'activity',
                title: 'Verificando Conhecimento',
                content: 'Responda as questões sobre o tópico.',
                activity: {
                    type: 'quiz',
                    question: 'Pronto?'
                }
            }
        ]
    },
    {
        id: 'etapa1-6',
        title: 'O Silenciamento',
        description: 'História e Colonialidade',
        x: 85, y: 65, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Amérindia e África',
                content: 'Aos ameríndios e africanos restou o silenciamento e a negação de suas existências pelas mãos dos colonizadores.'
            }
        ]
    },
    {
        id: 'etapa1-7',
        title: 'Relativismo Cultural',
        description: 'A Contraposição ao Etnocentrismo',
        x: 75, y: 55, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Franz Boas',
                content: 'Convicção de que todos os grupos humanos produzem cultura e devem ser entendidas dentro de seu próprio contexto.'
            }
        ]
    },
    {
        id: 'etapa1-8',
        title: 'Alteridade e Diferença',
        description: 'O Eu através do Outro',
        x: 62, y: 48, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Reconhecimento',
                content: 'O ser humano só se reconhece enquanto ser mediante a sua relação com o outro e com o coletivo.'
            }
        ]
    },
    {
        id: 'etapa1-9',
        title: 'Identidade e Ethos',
        description: 'Maneiras de Ser Singular',
        x: 48, y: 42, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Maneiras de Ser',
                content: 'O ethos (Geertz) é o conjunto de maneiras de ser que torna um grupo exclusivo. Unindo integrantes através de memórias.'
            }
        ]
    },
    {
        id: 'etapa1-10',
        title: 'Patrimônio Imaterial',
        description: 'Lembrança Coletiva',
        x: 35, y: 50, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Suportes da Memória',
                content: 'A memória não é só lembrar; é influenciada pela história. Suportes como objetos e paisagens dão sentido à existência.'
            }
        ]
    },
    {
        id: 'etapa1-11',
        title: 'Vídeo: Filhos da Terra',
        description: 'Material Complementar',
        x: 25, y: 38, type: 'info', educoinsReward: 40,
        slides: [
            {
                type: 'video',
                title: 'Filhos da Terra',
                content: 'Um olhar sobre a resistência e o patrimônio vivo.',
                videoUrl: 'https://www.youtube.com/watch?v=xKrIZUVTdvc'
            }
        ]
    },
    {
        id: 'etapa1-12',
        title: 'Atividade Reflexiva',
        description: 'Diálogo com Emília Viotti',
        x: 18, y: 28, type: 'lesson', educoinsReward: 60,
        slides: [
            {
                type: 'quote',
                title: 'Dialética Invertida',
                content: '“Um povo sem memória é um povo sem história. E um povo sem história está fadado a cometer, no presente e no futuro, os mesmos erros do passado.”'
            },
            {
                type: 'activity',
                title: 'Texto Narrativo',
                content: 'Escreva um texto narrativo a partir da afirmação de Emília Viotti da Costa.',
                activity: {
                    type: 'open-text',
                    question: 'Sua reflexão:'
                }
            }
        ]
    },
    {
        id: 'etapa1-final',
        title: 'Cartografia da Memória',
        description: 'Projeto Prático de Conclusão',
        x: 10, y: 15, type: 'final', educoinsReward: 200,
        slides: [
            {
                type: 'cover',
                title: 'Prática de Campo',
                content: 'Elabore sua Cartografia da Memória. Identifique marcos em seu território ou família.',
                image: '/assets/festa_divino_1776281053453.png'
            },
            {
                type: 'activity',
                title: 'Entrega do Projeto',
                content: 'Registro e articulção com os conceitos de cultura.',
                activity: {
                    type: 'file-upload',
                    question: 'Anexe aqui a sua Cartografia da Memória.'
                }
            }
        ]
    }
];

export const fullAcademicText = `
### Etapa 01 - Educação escolar e o patrimônio: cidadania, identidade e diversidade cultural

**Tópico 1 - Direito à Memória**
Ao iniciarmos um tópico sob o título Direito a memória devemos nos perguntar: Mas quem é capaz de roubar memórias? A quem foi dado esse direito? Para respondermos essa questão precisamos ter em mente três conceitos que se complementam: o conceito de cultura (Laraia, 2009) e os conceitos de memória individual e memória coletiva (Halbwachs, 2006). Não se pode falar de cultura sem falar de memórias e não se pode falar de memórias sem falar de culturas.

Diante das construções filosóficas e historiográficas, nem todos os povos têm o direito de “existir”, no sentido que sua memória e cultura foram e ainda são apagadas diariamente. Devemos partir da premissa que a humanidade é pluriétnica e multicultural. Esta característica a torna mais rica e bela.

... (Texto Completo Integrado nos Slides) ...
`;
