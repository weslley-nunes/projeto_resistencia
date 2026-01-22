export type Slide = {
    type: 'cover' | 'text' | 'image-text' | 'quote' | 'activity' | 'video';
    title: string;
    content: string; // Markdown supported
    image?: string;
    activity?: {
        question: string;
        options: string[];
        correctAnswer: number;
        feedback: string;
    }
};

export type MapNode = {
    id: string;
    title: string;
    description: string;
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
    type: 'start' | 'lesson' | 'challenge' | 'final';
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

// --- QUIZ BANK (Aligned with the new content) ---
export const quizQuestions: QuizQuestion[] = [
    {
        id: 'q1',
        question: 'Segundo Paulo Freire, como se define a relação docência-discência?',
        options: [
            'O professor detém todo o saber e o aluno é um recipiente vazio.',
            'Quem ensina aprende ao ensinar e quem aprende ensina ao aprender.',
            'Não há troca entre quem ensina e quem aprende.',
            'A docência é superior à discência.'
        ],
        correctAnswer: 1,
        explanation: 'Freire defende que não há docência sem discência; ambos se educam, apesar das diferenças.'
    },
    {
        id: 'q2',
        question: 'De acordo com Laraia (2009), qual a relação entre cultura e humanidade?',
        options: [
            'A cultura é o que nos guia na construção das ideias sobre o mundo.',
            'A cultura é apenas para quem estuda artes.',
            'Somos humanos apenas biologicamente, cultura é opcional.',
            'Cada pessoa vive isolada em sua própria cultura individual.'
        ],
        correctAnswer: 0,
        explanation: 'A cultura nos guia na construção de mundo; nosso grupo é formado pela nossa cultura.'
    },
    {
        id: 'q3',
        question: 'Sobre a Memória Coletiva (Halbwachs), é correto afirmar:',
        options: [
            'É apenas a soma das memórias individuais de cada pessoa.',
            'É a memória de um povo sobre seu espaço, história e manifestações.',
            'É uma memória que não influencia a identidade do grupo.',
            'Só existe se estiver escrita em livros oficiais.'
        ],
        correctAnswer: 1,
        explanation: 'A memória coletiva é a memória do grupo que ajuda a formar o Patrimônio e a identidade.'
    },
    {
        id: 'q4',
        question: 'O que caracteriza o Etnocentrismo Cultural?',
        options: [
            'Julgar outros grupos a partir dos valores da sua própria cultura como superiores.',
            'Aceitar todas as diferenças culturais como válidas.',
            'Estudar etnias sem fazer julgamentos de valor.',
            'Acreditar que a sua cultura é inferior às outras.'
        ],
        correctAnswer: 0,
        explanation: 'Etnocentrismo é a visão de mundo onde o nosso grupo é tomado como centro e "superior".'
    },
    {
        id: 'q5',
        question: 'Qual o antídoto proposto pela antropologia (Franz Boas) contra o etnocentrismo?',
        options: [
            'Darwinismo Social',
            'Colonialismo',
            'Relativismo Cultural',
            'Globalização'
        ],
        correctAnswer: 2,
        explanation: 'O Relativismo Cultural propõe que cada cultura deve ser entendida dentro de seu próprio contexto.'
    },
    {
        id: 'q6',
        question: 'A filosofia Ubuntu, "Eu sou porque nós somos", nos ensina que:',
        options: [
            'Devemos focar apenas no nosso sucesso individual.',
            'Nossa existência está entrelaçada e dependemos da comunidade.',
            'A identidade é formada isoladamente.',
            'O passado não importa para quem somos.'
        ],
        correctAnswer: 1,
        explanation: 'Ubuntu reconhece a interdependência humana e a construção coletiva do ser.'
    },
    {
        id: 'q7',
        question: '"Um povo sem memória é um povo sem história". O que acontece com esse povo?',
        options: [
            'Vive mais feliz sem lembrar do passado.',
            'Está fadado a cometer os mesmos erros do passado.',
            'Cria uma nova história do zero.',
            'Esquece apenas as partes ruins.'
        ],
        correctAnswer: 1,
        explanation: 'A frase de Emília Viotti da Costa alerta para a repetição de erros históricos quando se perde a memória.'
    },
    {
        id: 'q8',
        question: 'No contexto do curso, o que a Educação Patrimonial propõe?',
        options: [
            'Ensinar apenas sobre prédios antigos.',
            'Refletir sobre os diversos "mundos" dos alunos e sua complexidade cultural.',
            'Decorar datas históricas.',
            'Impor uma cultura única nas escolas.'
        ],
        correctAnswer: 1,
        explanation: 'A Educação Patrimonial visa compreender nossa existência com toda a complexidade cultural envolvida.'
    }
];

// --- LEARNING TRAIL NODES (Updated Content) ---
export const mapNodes: MapNode[] = [
    {
        id: 'node-1',
        title: 'Narrativas Iniciais',
        description: 'Meu maior Patrimônio é a minha Existência.',
        x: 10, y: 80, type: 'start', educoinsReward: 50,
        slides: [
            {
                type: 'cover',
                title: 'Narrativas Iniciais',
                content: '"Meu maior Patrimônio é a minha Existência"',
                image: '/assets/illustration_culture.png'
            },
            {
                type: 'text',
                title: 'A Busca pela Origem',
                content: `Há muito tempo nós nos ocupamos em entender e explicar nossa existência.
                
Nessa curiosa busca, descobrimo-nos como seres capazes de **criar e recriar** nossos hábitos, crenças e territórios.

A essas criações vividas e significadas dia após dia, damos o nome de **CULTURA**.`
            },
            {
                type: 'quote',
                title: 'Somos um Grupo',
                content: `A cultura forma nosso grupo, ou melhor, faz de nós um grupo.
                
Cada grupo possui seu **Patrimônio Cultural**: o conjunto de saberes, fazeres, memórias e histórias valiosas para sua sobrevivência.`
            },
            {
                type: 'image-text',
                title: 'A Pedagogia de Freire',
                content: `A Educação Patrimonial nos convida a ser mediadores desses "mundos". Lembre-se de Paulo Freire:
                
"Não há docência sem discência... Quem ensina aprende ao ensinar e quem aprende ensina ao aprender."`,
                image: 'https://images.unsplash.com/photo-1544928147-79a774ccad2d?q=80&w=2000&auto=format&fit=crop'
            },
            {
                type: 'activity',
                title: 'Reflexão',
                content: 'Sobre a frase de Freire "Quem ensina ensina alguma coisa a alguém":',
                activity: {
                    question: 'Como você enxerga o patrimônio cultural que seu aluno traz para a sala de aula?',
                    options: [
                        'Como algo menor que precisa ser corrigido.',
                        'Como uma bagagem valiosa que deve dialogar com o ensino.',
                        'Como algo irrelevante para o conteúdo.'
                    ],
                    correctAnswer: 1,
                    feedback: 'Exato! O patrimônio e as memórias do aluno ajudam a construir sua identidade.'
                }
            }
        ]
    },
    {
        id: 'node-2',
        title: 'Direito à Memória',
        description: 'Quem é capaz de roubar memórias?',
        x: 25, y: 65, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'cover',
                title: 'Direito à Memória',
                content: 'Mas quem é capaz de roubar memórias? A quem foi dado esse direito?',
                image: '/assets/illustration_memory.png'
            },
            {
                type: 'text',
                title: 'Memória e Cultura',
                content: `Não se pode falar de cultura sem falar de memória.
                
Segundo **Halbwachs (2006)**:
- **Memória Individual**: Lembranças pessoais.
- **Memória Coletiva**: Memória do grupo, de um povo sobre sua história e manifestações.`
            },
            {
                type: 'text',
                title: 'Silenciamento',
                content: `Nem todos os povos tiveram o "direito de existir" preservado.
                
Muitas memórias indígenas e africanas foram apagadas diariamente. Entender essa diversidade é uma **necessidade ética** para construirmos o respeito ao outro.`
            },
            {
                type: 'activity',
                title: 'Multiculturalismo',
                content: 'Refletindo sobre a diversidade:',
                activity: {
                    question: 'O multiculturalismo nos ensina que:',
                    options: [
                        'Devemos nos misturar até sermos todos iguais.',
                        'Somos diversos, compostos por muitas culturas que merecem respeito.',
                        'Apenas a cultura dominante importa.'
                    ],
                    correctAnswer: 1,
                    feedback: 'Isso! O multiculturalismo valoriza que somos feitos de muitas culturas.'
                }
            }
        ]
    },
    {
        id: 'node-3',
        title: 'Desafio do Etnocentrismo',
        description: 'A lente com que vemos o mundo.',
        x: 40, y: 50, type: 'challenge', educoinsReward: 75,
        slides: [
            {
                type: 'cover',
                title: 'O Etnocentrismo Cultural',
                content: 'Uma prática que ocorre desde os primórdios da humanidade.',
                image: '/assets/illustration_relativism.png'
            },
            {
                type: 'text',
                title: 'O que é?',
                content: `É a visão onde um grupo julga os demais a partir de seus próprios valores, considerando sua cultura superior.
                
Exemplo: "Nordestino é preguiçoso", "Índio não gosta de trabalhar".`
            },
            {
                type: 'quote',
                title: 'O Antídoto: Relativismo',
                content: `Contrapondo o etnocentrismo, Franz Boas propõe o **Relativismo Cultural**.
                
Todas as culturas devem ser entendidas dentro de seu próprio contexto. Nenhuma é superior a outra.`
            },
            {
                type: 'activity',
                title: 'Identificando na Prática',
                content: 'Qual atitude representa o Relativismo Cultural?',
                activity: {
                    question: 'Ao encontrar um hábito diferente do seu:',
                    options: [
                        'Rir e dizer que é estranho.',
                        'Tentar entender o significado daquilo para aquele povo.',
                        'Tentar ensinar o jeito "certo" de fazer.'
                    ],
                    correctAnswer: 1,
                    feedback: 'Perfeito. Relativizar é olhar de dentro, com respeito.'
                }
            }
        ]
    },
    {
        id: 'node-4',
        title: 'Identidade e Memória',
        description: 'Tecer as redes do imaginário.',
        x: 60, y: 40, type: 'lesson', educoinsReward: 60,
        slides: [
            {
                type: 'image-text',
                title: 'A Construção do Eu',
                content: `A identidade passa pelo mundo das formas e subjetividades.
                
As sociedades ensinam o que pensam ser elas mesmas (seu **ethos**).`,
                image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2000&auto=format&fit=crop'
            },
            {
                type: 'text',
                title: 'Memória como Resistência',
                content: `"Atrás de cada artefato há uma pessoa... Descobrir quem eram é uma experiência humanizante." (Horta, 1991).
                
O direito à memória é o direito de existir. Povos marginalizados mantiveram suas memórias vivas na oralidade e na prática cultural.`
            },
            {
                type: 'quote',
                title: 'Emília Viotti da Costa',
                content: `"Um povo sem memória é um povo sem história. E um povo sem história está fadado a cometer, no presente e no futuro, os mesmos erros do passado."`
            }
        ]
    },
    {
        id: 'node-5',
        title: 'Atividade: Eu sou porque somos',
        description: 'Dinâmica de encerramento do módulo.',
        x: 80, y: 40, type: 'lesson', educoinsReward: 100,
        slides: [
            {
                type: 'cover',
                title: 'Dinâmica: Eu sou porque somos',
                content: 'Reflexão final sobre nossa interdependência.',
                image: '/assets/illustration_ubuntu.png'
            },
            {
                type: 'activity',
                title: 'O que trago? O que levo?',
                content: 'Participe desta reflexão mentalmente ou anote em seu diário:',
                activity: {
                    question: 'Se você tivesse que se apresentar agora para a roda, o que você diria?',
                    options: [
                        'Eu sou [Nome] e trago meu desejo de ensinar e aprender.',
                        'Eu não trago nada.',
                        'Eu só vim ouvir.'
                    ],
                    correctAnswer: 0,
                    feedback: 'Ótimo! Reconhecer o que trazemos e o que esperamos levar é o primeiro passo da troca.'
                }
            },
            {
                type: 'text',
                title: 'Atividade Reflexiva',
                content: `Escreva (para si mesmo ou compartilhe depois) um texto narrativo a partir da frase:
                
"Um povo sem memória é um povo sem história..."
                
Como isso se aplica à realidade dos seus alunos no Tocantins?`
            }
        ]
    },
    {
        id: 'node-6',
        title: 'Prova Final do Módulo',
        description: 'Teste seus conhecimentos para avançar.',
        x: 90, y: 20, type: 'final', educoinsReward: 200,
        slides: [
            {
                type: 'cover',
                title: 'Avaliação Final',
                content: 'Você chegou ao fim desta etapa.\n\nResponda ao questionário para validar seus conhecimentos e prosseguir.'
            }
        ]
    }
];
