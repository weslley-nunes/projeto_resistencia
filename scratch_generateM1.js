const fs = require('fs');

const dataTS = `export type Slide = {
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

export type TopicMap = {
    id: string;
    title: string;
    backgroundImage: string;
    stations: MapNode[];
};

export type QuizQuestion = {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
};

export const topicMaps: TopicMap[] = [
    {
        id: 'm1-t1',
        title: 'Aula Inaugural',
        backgroundImage: '/assets/map_background_tocantins.png',
        stations: [
            {
                id: 'm1-t1-s1',
                title: 'Apresentação do AVA',
                description: 'Introdução ao ambiente e agenda.',
                x: 20, y: 80, type: 'start', educoinsReward: 10,
                slides: [
                    {
                        type: 'agenda',
                        title: 'Cronograma da Etapa',
                        content: 'Encontros de live e plantão de dúvidas conforme nosso cronograma oficial.',
                        agenda: {
                            dates: [
                                { date: '26/03/2026', type: 'live', link: 'https://meet.google.com/hps-okye-rvx' }
                            ]
                        }
                    },
                    {
                        type: 'text',
                        title: 'O que é o Patrimônio?',
                        content: 'O maior patrimônio é nossa própria existência.'
                    }
                ]
            },
            {
                id: 'm1-t1-s2',
                title: 'Atividade Prática',
                description: 'Familiarização com a Plataforma.',
                x: 50, y: 50, type: 'final', educoinsReward: 50,
                slides: [
                    {
                        type: 'activity',
                        title: 'Familiarização',
                        content: '',
                        activity: {
                            type: 'open-text',
                            question: 'Deixe aqui sua primeira impressão sobre o ambiente virtual e suas expectativas.'
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'm1-t2',
        title: 'Direito à memória',
        backgroundImage: '/assets/map_background_tocantins.png',
        stations: [
            {
                id: 'm1-t2-s1',
                title: 'Direito Seculares',
                description: 'Quem é capaz de roubar memórias?',
                x: 30, y: 70, type: 'start', educoinsReward: 30,
                slides: [
                    {
                        type: 'cover',
                        title: 'Quem é capaz?',
                        content: 'Refletir sobre quem sou é o ponto de partida desta atividade.\\n\\nMemória, identidade e pertencimento.',
                        image: '/assets/quilombola_heritage_1776281094378.png'
                    }
                ]
            },
            {
                id: 'm1-t2-s2',
                title: 'Saberes Africanos e Indígenas',
                description: 'Silenciamento vs Resistência',
                x: 60, y: 50, type: 'lesson', educoinsReward: 30,
                slides: [
                    {
                        type: 'text',
                        title: 'O Etnocentrismo',
                        content: 'O etnocentrismo cultural é quando um grupo julga os demais a partir de seus valores.'
                    }
                ]
            },
            {
                id: 'm1-t2-s3',
                title: 'Atividade Prática',
                description: 'Levantamento de memórias locais',
                x: 80, y: 30, type: 'final', educoinsReward: 100,
                slides: [
                    {
                        type: 'activity',
                        title: 'Levantamento de Memórias',
                        content: 'Prática de Levantamento de memórias locais.',
                        activity: {
                            type: 'open-text',
                            question: 'Levante 3 memórias orais passadas pelos seus avós que compõem seu patrimônio familiar.'
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'm1-t3',
        title: 'Memória e Paisagem',
        backgroundImage: '/assets/map_background_tocantins.png',
        stations: [
            {
                id: 'm1-t3-s1',
                title: 'As paisagens que formam memórias',
                description: 'Percepção visual vs Afeto',
                x: 10, y: 60, type: 'start', educoinsReward: 30,
                slides: [
                    {
                        type: 'cover',
                        title: 'A Paisagem Cultural',
                        content: 'Muitas vezes, a nossa percepção não se aterá ao simples fato visual. Mas estará fundamentada no afeto e na memória.',
                        image: '/assets/jalapao_landscape_1776281072150.png'
                    }
                ]
            },
            {
                id: 'm1-t3-s2',
                title: 'O que compõe seu Horizonte',
                description: 'Um novo olhar para a sua quadra/rua',
                x: 40, y: 40, type: 'lesson', educoinsReward: 30,
                slides: [
                    {
                        type: 'text',
                        title: 'O seu Entorno',
                        content: 'Perceba a materialidade do seu entorno. A arquitetura, as árvores, as pedras.'
                    }
                ]
            },
            {
                id: 'm1-t3-s3',
                title: 'Atividade Prática',
                description: 'Registro fotográfico de paisagens culturais',
                x: 70, y: 20, type: 'final', educoinsReward: 100,
                slides: [
                    {
                        type: 'activity',
                        title: 'Registro Fotográfico',
                        content: '',
                        activity: {
                            type: 'file-upload',
                            question: 'Anexe o seu Registro fotográfico (1 a 3 fotos coladas num único documento/PDF) da paisagem cultural que lhe cerca.'
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'm1-t4',
        title: 'Educação patrimonial no contexto regional',
        backgroundImage: '/assets/map_background_tocantins.png',
        stations: [
            {
                id: 'm1-t4-s1',
                title: 'O contexto regional',
                description: 'Reconhecendo as riquezas tocantinenses',
                x: 20, y: 70, type: 'start', educoinsReward: 30,
                slides: [
                    {
                        type: 'cover',
                        title: 'Regiões e Festejos',
                        content: 'Mapear o patrimônio regional é essencial para o sentimento coletivo de preservação.',
                        image: '/assets/festa_divino_1776281053453.png'
                    }
                ]
            },
            {
                id: 'm1-t4-s2',
                title: 'A escola e o Entorno',
                description: 'Tornando a escola viva',
                x: 55, y: 50, type: 'lesson', educoinsReward: 30,
                slides: [
                    {
                        type: 'text',
                        title: 'Patrimônio à vista',
                        content: 'A educação patrimonial nas escolas exige investigar a cultura popular que atravessa o portão escolar.'
                    }
                ]
            },
            {
                id: 'm1-t4-s3',
                title: 'Atividade Prática',
                description: 'Pesquisa sobre patrimônio local',
                x: 80, y: 25, type: 'final', educoinsReward: 100,
                slides: [
                    {
                        type: 'activity',
                        title: 'Pesquisa Patrimonial',
                        content: '',
                        activity: {
                            type: 'file-upload',
                            question: 'Formule um documento relatando a Pesquisa sobre os principais e escondidos elementos do Patrimônio Local da sua cidade.'
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'm1-t5',
        title: 'Gestão do patrimônio e Lideranças',
        backgroundImage: '/assets/map_background_tocantins.png',
        stations: [
            {
                id: 'm1-t5-s1',
                title: 'Comunidade na Gestão',
                description: 'Preservar é coletivo.',
                x: 30, y: 60, type: 'start', educoinsReward: 40,
                slides: [
                    {
                        type: 'text',
                        title: 'Gestão Horizontal',
                        content: 'Não há preservação de cima para baixo. A comunidade deve gerenciar o seu patrimônio.'
                    }
                ]
            },
            {
                id: 'm1-t5-s2',
                title: 'Atividade Prática',
                description: 'Entrevista com liderança local',
                x: 60, y: 30, type: 'final', educoinsReward: 100,
                slides: [
                    {
                        type: 'activity',
                        title: 'Entrevista de Liderança',
                        content: 'Entrevistando as vozes silenciadas.',
                        activity: {
                            type: 'file-upload',
                            question: 'Faça o PDF com o roteiro ou link/gravação de Entrevisa com liderança local (uma mãe de santo, um mestre da cultura popular, líder comunitário...).'
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'm1-t6',
        title: 'Diversidade: Saberes e Fazeres',
        backgroundImage: '/assets/map_background_tocantins.png',
        stations: [
            {
                id: 'm1-t6-s1',
                title: 'Heranças Intangíveis',
                description: 'Os saberes tradicionais imateriais.',
                x: 25, y: 75, type: 'start', educoinsReward: 40,
                slides: [
                    {
                        type: 'cover',
                        title: 'Saberes e Fazeres',
                        content: 'Mapear os saberes que não estão escritos em livros, mas passados de geração em geração.',
                        image: '/assets/capim_dourado_1776281024209.png'
                    }
                ]
            },
            {
                id: 'm1-t6-s2',
                title: 'Atividade Prática',
                description: 'Planejamento de oficina com mestre',
                x: 60, y: 40, type: 'final', educoinsReward: 100,
                slides: [
                    {
                        type: 'activity',
                        title: 'Planejamento com o Mestre',
                        content: '',
                        activity: {
                            type: 'file-upload',
                            question: 'Submeta aqui o Plano Escolar (PDF) para montar uma oficina na escola na qual um Mestre de Cultura Popular será o condutor.'
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'm1-t7',
        title: 'Diversidade: Lugares e Objetos',
        backgroundImage: '/assets/map_background_tocantins.png',
        stations: [
            {
                id: 'm1-t7-s1',
                title: 'As Histórias Físicas',
                description: 'A materialidade',
                x: 20, y: 60, type: 'start', educoinsReward: 40,
                slides: [
                    {
                        type: 'text',
                        title: 'A materialidade',
                        content: 'Nossa cultura nos permite dar novos significados a coisas simples que passam a ser nossos lugares e objetos afetivos.'
                    }
                ]
            },
            {
                id: 'm1-t7-s2',
                title: 'Atividade Prática',
                description: 'Mapeamento de locais de memória',
                x: 60, y: 30, type: 'final', educoinsReward: 100,
                slides: [
                    {
                        type: 'activity',
                        title: 'Mapeamento Prático',
                        content: '',
                        activity: {
                            type: 'file-upload',
                            question: 'Forneça o link doc ou PDF com o mapa e descritivos do Mapeamento dos locais de memória sensíveis na regial.'
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'm1-t8',
        title: 'Oficinas práticas',
        backgroundImage: '/assets/map_background_tocantins.png',
        stations: [
            {
                id: 'm1-t8-s1',
                title: 'As Mãos na Massa',
                description: 'Oficinas e Ofícios',
                x: 30, y: 60, type: 'start', educoinsReward: 40,
                slides: [
                    {
                        type: 'text',
                        title: 'Consolidação',
                        content: 'Este é o momento de materializarmos as ideias e levá-las para os ofícios de aula.'
                    }
                ]
            },
            {
                id: 'm1-t8-s2',
                title: 'Atividade Prática Final',
                description: 'Oficinas de artes e ofícios',
                x: 70, y: 30, type: 'final', educoinsReward: 300,
                slides: [
                    {
                        type: 'activity',
                        title: 'Coroamento Módulo 1',
                        content: '',
                        activity: {
                            type: 'file-upload',
                            question: 'Relatório Final: Detalhamento da execução prática da Oficina de Artes e Ofícios na comunidade (20h).'
                        }
                    }
                ]
            }
        ]
    }
];

export const quizQuestions: QuizQuestion[] = [];
`;

fs.writeFileSync('app/modulo1/data.ts', dataTS, 'utf-8');
console.log('M1 generated.');
