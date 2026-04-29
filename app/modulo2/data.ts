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
        question: 'Segundo o texto, como os objetos atuam em relação à memória?',
        options: [
            'Eles são irrelevantes para a construção da memória.',
            'Eles atuam como suportes da nossa memória.',
            'Eles servem apenas como decoração sem significado.',
            'Eles apagam as memórias passadas.'
        ],
        correctAnswer: 1,
        explanation: 'O texto cita que "Os objetos são por vezes suportes de nossa memória", como uma flor, um álbum de fotografias ou uma boneca de infância.'
    },
    {
        id: 'q2',
        question: 'O que são lugares de memória, conforme o texto?',
        options: [
            'Apenas os espaços geográficos físicos demarcados pelo estado.',
            'Locais desprovidos de qualquer significado afetivo.',
            'Lugares nos três sentidos da palavra: material, simbólico e funcional.',
            'Apenas monumentos construídos com pedra e cimento.'
        ],
        correctAnswer: 2,
        explanation: 'Os lugares de memória são constituídos de materialidade, simbolismo e funcionalidade, e formados por toda a subjetividade de um povo.'
    },
    {
        id: 'q3',
        question: 'Como a paisagem cultural é entendida a partir da antropologia cultural e da memória?',
        options: [
            'Como um ambiente natural intacto, sem presença humana.',
            'Como parte do Patrimônio Cultural, trazendo inscritas as crenças e saberes de um grupo.',
            'Apenas como recurso econômico para exploração turística.',
            'Como um cenário que não guarda relação com a identidade local.'
        ],
        correctAnswer: 1,
        explanation: 'A paisagem cultural é transformada de simples paisagem natural em cultural pelas crenças, saberes e fazeres de um grupo.'
    },
    {
        id: 'q4',
        question: 'Qual é a relação entre memória e tempo, segundo as reflexões baseadas em Adélia Prado?',
        options: [
            'O tempo destrói todas as memórias.',
            'A memória acelera a passagem do tempo.',
            'A memória é contrária ao tempo, eternizando o que realmente importa.',
            'O tempo e a memória são a mesma coisa.'
        ],
        correctAnswer: 2,
        explanation: 'Enquanto o tempo passa, a memória eterniza momentos, amigos e amores, sendo contrária à passagem do tempo.'
    },
    {
        id: 'q5',
        question: 'Qual é o primeiro passo efetivo sugerido para a proteção e preservação de um patrimônio cultural?',
        options: [
            'Escondê-lo do público.',
            'Conhecê-lo e tomar consciência do seu valor simbólico, afetivo e de pertencimento.',
            'Construir muros ao redor da paisagem.',
            'Apagar as histórias individuais ligadas ao território.'
        ],
        correctAnswer: 1,
        explanation: 'A melhor maneira de preservar o patrimônio cultural é conhecendo-o e compreendendo seu valor de pertencimento para a comunidade.'
    }
];

// --- LEARNING TRAIL NODES (Módulo 2 agora é inteiramente o Tópico 2) ---
export const mapNodes: MapNode[] = [
    {
        id: 'm2-intro',
        title: 'Paisagens Interiores',
        description: 'Introdução ao conceito de memória e paisagem.',
        x: 10, y: 85, type: 'start', educoinsReward: 30,
        slides: [
            {
                type: 'quote',
                title: 'Antoine de Saint Exupéry',
                content: 'Em cada um de nós há um segredo, uma paisagem interior com planícies invioláveis, vales de silêncio e paraísos secretos'
            },
            {
                type: 'text',
                title: 'Paisagens Culturais',
                content: 'Iniciamos esse tópico com essa citação poética sobre nossas paisagens interiores, para assim nos aprofundarmos um pouco mais no conceito de memória. O patrimônio que habita nossas memórias ganha vida no nosso cotidiano por meio de nossos saberes, dizeres viveres, e nos lugares que elegemos como espaço de memória. Chamamos isso de paisagens culturais, lugares de memórias e é sobre esses aspectos que nos debruçaremos.'
            }
        ]
    },
    {
        id: 'm2-identidade',
        title: 'Memória e Identidade',
        description: 'Como nossas memórias se entrelaçam com nosso patrimônio cultural.',
        x: 30, y: 75, type: 'lesson', educoinsReward: 40,
        slides: [
            {
                type: 'text',
                title: 'Costurando Ideias',
                content: 'Sugerimos que você faça um exercício de invocar da sua memória, imagens e vivências, lembranças individuais e dos grupos ao quais você pertence, sempre no intuito de compreender que nós somos nosso maior patrimônio. Sabemos que as nossas memórias são permeadas de nossas histórias e sedimentam nosso patrimônio cultural. A memória não é estanque, é relacional e está sujeita a ser ressignificada.'
            },
            {
                type: 'activity',
                title: 'Sua Identidade',
                content: 'Pensando nas narrativas anteriores e em você mesmo:',
                activity: {
                    type: 'open-text',
                    question: 'Quais lembranças individuais ou de grupo mais fortalecem a sua identidade pessoal hoje?'
                }
            }
        ]
    },
    {
        id: 'm2-suportes',
        title: 'Os Suportes da Memória',
        description: 'Objetos e espaços que guardam nossos tesouros.',
        x: 50, y: 80, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Objetos que falam',
                content: 'Os objetos são por vezes suportes de nossa memória, uma flor guardada dentro de um livro, uma boneca de infância, uma miniatura de um lugar que visitamos, o cheiro de café passado cedinho, aquela praça onde ocorreu uma manifestação que marcou a história da nossa cidade, um velho álbum de fotografias... São esses objetos, esses espaços, e essas narrativas que formam os suportes da memória.'
            },
            {
                type: 'text',
                title: 'Lugares de Memória',
                content: 'Os lugares de memória não são formados apenas por um espaço geográfico, mas por toda a subjetividade que os compõem. Eles se constituem a partir da interação desses elementos, e neles, a memória e a história interagem com as nossas identidades. Os lugares de memória são lugares nos três sentidos da palavra: material, simbólico e funcional.'
            }
        ]
    },
    {
        id: 'm2-paisagem',
        title: 'A Paisagem como Patrimônio',
        description: 'A transformação da paisagem natural em paisagem cultural.',
        x: 70, y: 60, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Conhecer para Preservar',
                content: 'Sabemos que a melhor maneira de se preservar o patrimônio cultural é conhecendo-o, tomando consciência do seu valor simbólico, afetivo e de pertencimento. Este é o primeiro passo a ser dado para a proteção efetiva de um patrimônio. Um segundo seria a sensibilização por meio de medidas educativas que reconheçam seu valor histórico e cultural.'
            },
            {
                type: 'text',
                title: 'O Viés da Memória',
                content: 'A relação entre a paisagem e o Patrimônio Cultural constitui um caso especial. A paisagem cultural é entendida como sendo parte do Patrimônio Cultural por trazer inscrita sobre si, numa espécie de fotografia, as crenças, os valores, os saberes e fazeres de um grupo que a transforma de simples paisagem natural em paisagem cultural com valor inestimável, por estarem na base de suas vidas e habitarem suas memórias.'
            }
        ]
    },
    {
        id: 'm2-eternidade',
        title: 'A Eternidade da Memória',
        description: 'O tempo, os gatilhos e o que deixamos para trás.',
        x: 85, y: 40, type: 'challenge', educoinsReward: 60,
        slides: [
            {
                type: 'quote',
                title: 'Adélia Prado',
                content: 'O que a memória ama fica eterno... Ela chorava pela eternidade que vivia dentro dela e que eu, na minha meninice, era incapaz de compreender. O tempo passou e hoje me emociono diante das mesmas coisas, tocada por pequenos milagres do cotidiano.'
            },
            {
                type: 'text',
                title: 'O Tempo e os Gatilhos',
                content: 'A memória é contrária ao tempo. Enquanto o tempo leva a vida embora como vento, a memória traz de volta o que realmente importa, eternizando momentos. Quanto mais vivemos, mais eternidades criamos dentro da gente... Somos a soma de nossos afetos, e aquilo que amamos pode ser facilmente reativado por novos gatilhos: somos traídos pelo enredo de um filme, uma música antiga, um lugar especial.'
            },
            {
                type: 'activity',
                title: 'Gatilhos da Memória',
                content: 'A memória não obedece a calendários.',
                activity: {
                    type: 'open-text',
                    question: 'Qual foi o "gatilho" (música, cheiro, objeto) mais recente que ativou uma memória importante para você? Relate brevemente.'
                }
            }
        ]
    },
    {
        id: 'm2-praticas',
        title: 'Práticas e Reflexões',
        description: 'Aplicando os conceitos de paisagem e lugares de memória.',
        x: 60, y: 25, type: 'lesson', educoinsReward: 80,
        slides: [
            {
                type: 'activity',
                title: 'Atividade Reflexiva',
                content: 'Agora que já conhecemos os três aspectos que formam os lugares de memória e a importância dos mesmos para o Patrimônio Cultural...',
                activity: {
                    type: 'open-text',
                    question: 'Quais são os lugares de memória ou paisagens da sua cidade ou região que alimentam suas lembranças? Em que esferas eles se encaixam: material, funcional ou simbólica?'
                }
            },
            {
                type: 'activity',
                title: 'Oficina de memória: Objetos que Falam',
                content: 'Convide a turma a levar para sala de aula um objeto que remeta a uma lembrança. Depois, em roda, cada um apresentará seu objeto e partilhará a lembrança que ele remete.',
                activity: {
                    type: 'file-upload',
                    question: 'Crie uma frase que sintetize a sua memória. Faça um mural com a turma interligando as frases com barbante, e anexe a FOTO do mural ou do seu objeto aqui.'
                }
            }
        ]
    },
    {
        id: 'm2-quiz-final',
        title: 'Quiz Final da Trilha',
        description: 'Teste seus conhecimentos sobre Memória e Paisagem.',
        x: 30, y: 15, type: 'final', educoinsReward: 150,
        slides: [
            {
                type: 'cover',
                title: 'Desafio Final',
                content: 'Chegamos ao final deste tópico. Verifique seus aprendizados no quiz final para concluir a trilha e liberar suas Educoins máximas!',
                image: '/assets/illustration_badge.png'
            },
            {
                type: 'activity',
                title: 'Questionário de Conclusão',
                content: 'Responda as questões baseadas no texto "Memória e Paisagem".',
                activity: {
                    type: 'quiz',
                    question: 'Clique em "Iniciar Quiz" para começar.'
                }
            }
        ]
    }
];
