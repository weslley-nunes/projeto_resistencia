export type Slide = {
    type: 'cover' | 'text' | 'image-text' | 'quote' | 'activity' | 'video' | 'agenda' | 'raw-text';
    title: string;
    content: string; // Markdown supported
    image?: string;
    activity?: {
        question: string;
        options: string[];
        correctAnswer: number;
        feedback: string;
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

// --- QUIZ BANK MÓDULO 3 ---
export const quizQuestions: QuizQuestion[] = [
    {
        id: 'q1-m3',
        question: 'Segundo Rodrigo Melo Franco de Andrade, qual é o único meio eficaz de defesa do patrimônio?',
        options: [
            'A criação de leis severas.',
            'O tombamento compulsório.',
            'A educação popular.',
            'O isolamento dos bens culturais.'
        ],
        correctAnswer: 2,
        explanation: '"Só há um meio eficaz de assegurar a defesa permanente do patrimônio de arte e de história do país: é o da educação popular."'
    },
    {
        id: 'q2-m3',
        question: 'O que caracteriza a "Educação Patrimonial" segundo o texto?',
        options: [
            'Uma disciplina escolar obrigatória em todo o mundo.',
            'Um processo permanente centrado no Patrimônio Cultural como fonte primária de conhecimento.',
            'A visitação passiva a museus.',
            'Decorar datas históricas.'
        ],
        correctAnswer: 1,
        explanation: 'Educação Patrimonial é um processo educativo centrado no Patrimônio como fonte de conhecimento.'
    },
    {
        id: 'q3-m3',
        question: 'Como a cultura é definida no texto?',
        options: [
            'Apenas as artes eruditas como ópera e ballet.',
            'O conhecimento adquirido na universidade.',
            'Tudo o que fazemos no dia a dia, impregnado de visões de mundo (comer, rezar, brincar).',
            'Algo que apenas povos antigos possuíam.'
        ],
        correctAnswer: 2,
        explanation: 'O texto define cultura como todas as ações do cotidiano: lavar roupa, brincar, comer, rezar, impregnadas de tradição.'
    },
    {
        id: 'q4-m3',
        question: 'Qual a metodologia sugerida por Horta (1999) para a Educação Patrimonial?',
        options: [
            'Leitura e prova escrita.',
            'Observação, Registro, Exploração e Apropriação.',
            'Apenas observação visual.',
            'Cópia de textos antigos.'
        ],
        correctAnswer: 1,
        explanation: 'A metodologia envolve quatro etapas: Observação (percepção), Registro (fixação), Exploração (análise) e Apropriação (recriação).'
    },
    {
        id: 'q5-m3',
        question: 'Por que é importante começar a Educação Patrimonial pela "cultura regional" com crianças?',
        options: [
            'Porque é mais barato.',
            'Porque parte de algo já conhecido e eleito no subconsciente da comunidade, gerando identificação.',
            'Porque a cultura regional é superior à nacional.',
            'Não é importante, deve-se começar pela história mundial.'
        ],
        correctAnswer: 1,
        explanation: 'Deve-se partir do patrimônio local (um festejo, um lugar, uma comida) para gerar conexão e desenhar a importância histórica.'
    }
];

// --- RAW ACADEMIC TEXT ---
const fullAcademicText = `
Módulo 3: Educação patrimonial no contexto regional

A cultura de um povo, deve perpetuar para que não se esqueçam de sua própria história e importância. Inclui-la na educação de suas crianças, garante que essa história não se perca em meio ao "novo", que muitas vezes, sufoca e extermina a identidade cultural dessas pessoas (DUARTE, 2005).

Iniciamos esse módulo com essa citação porque nela contém os elementos basilares não apenas desse módulo como do curso como um todo. Cultura, Educação e Identidade.
Em linhas gerais iniciaremos nossa reflexão nos perguntando: O que é Educação Patrimonial? Trata-se de um processo permanente e sistemático de trabalho educacional centrado no Patrimônio Cultural como fonte primária de conhecimento e enriquecimento individual e coletivo.

A cultura é tudo que nós seres humanos fazemos no nosso dia a dia. Desde o momento em que levantamos, e que alguém se “benze com o sinal da cruz”, tomamos nosso café com cuscuz ou com mandioca, damos bom dia para o vendedor do mercadinho da esquina, jogamos bolinha de gude na rua, uma “pelada” de “golzinho” na rua de baixo, vamos à igreja rezar, tomamos banho de rio ou riacho, pescamos, lavamos louças e roupas nos rios, e tantas outras coisas; todas essas ações que realizamos estão impregnadas de nossas visões de mundo, da nossa tradição, dos hábitos e costumes, da nossa cultura.

Em síntese podemos afirmar que todas as ações por meio das quais os povos expressam suas formas específicas de ser e existir no mundo constituem a sua CULTURA. A cultura é um processo eminentemente dinâmico, transmitido de geração em geração, que se aprende com os ancestrais e se cria e recria no cotidiano do presente.
Reconhecer que todos os povos produzem cultura e que cada um tem uma forma diferente de se expressar é aceitar a diversidade cultural.

O Brasil é um país pluricultural. Estas diversidades culturais regionais contribuem para a formação da identidade do cidadão brasileiro. O não pensar na perspetiva da pluralidade cultural fez que que alguns culturas fossem “apagadas” negando assim o direito de ser de muitos grupos, dentres eles os afro-descendentes e indígenas.

Patrimônio + Cultura = Patrimônio Cultural.
Educação + Cultura = Educação Patrimonial.
“Só há um meio eficaz de assegurar a defesa permanente do patrimônio de arte e de história do país: é o da educação popular” (Rodrigo Melo Franco de Andrade).

A atuação da Educação Patrimonial não pode ser estática. O lugar da Educação é a vida. A Educação Patrimonial acontece mediante ações educativas que buscam envolver e sensibilizar seus participantes para a preservação do patrimônio cultural.
As atividades devem buscar capacitar os participantes para que eles se reconheçam nesse processo de eleição e apropriação do patrimônio cultural, como sujeitos e agentes. O papel da Educação Patrimonial consiste em dialogar a partir do patrimônio, valorizando a memória daqueles que o elegeram como patrimônio; legitimar a herança das minorias; reafirmar identidades e fortalecer a autoestima.

Como fazer isso com crianças e adolescentes? O melhor caminho é partir da cultura regional; um festejo, um lugar que resguarda a história local, um objeto utilizado na região, uma comida típica.

Aplicando a Metodologia da Educação Patrimonial (Horta 1999):
1) Observação: exercícios de percepção visual/sensorial. Identificação do objeto/função.
2) Registro: desenhos, descrição, fotografia. Fixação do conhecimento.
3) Exploração: Análise, levantamento de hipóteses, pesquisa em fontes. Julgamento crítico.
4) Apropriação: Recriação, releitura, dramatização. Envolvimento afetivo e valorização.
`;

// --- LEARNING TRAIL NODES MÓDULO 3 ---
export const mapNodes: MapNode[] = [
    {
        id: 'node-info-m3',
        title: 'Texto Completo M3',
        description: 'Todo o conteúdo do Módulo 3 para leitura.',
        x: 10, y: 85, type: 'info', educoinsReward: 0,
        slides: [
            {
                type: 'cover',
                title: 'Módulo 3: Contexto Regional',
                content: 'Educação Patrimonial, Cultura e Identidade no cotidiano.',
                image: '/assets/map_background_culture_education.png'
            },
            {
                type: 'raw-text',
                title: 'Material Completo',
                content: fullAcademicText
            }
        ]
    },
    {
        id: 'node-1-m3',
        title: 'Cultura no Cotidiano',
        description: 'A cultura é tudo o que fazemos no dia a dia.',
        x: 25, y: 75, type: 'start', educoinsReward: 50,
        slides: [
            {
                type: 'cover',
                title: 'O que é Cultura?',
                content: 'Do café com cuscuz à "pelada" na rua.',
                image: '/assets/culture_daily_life.png'
            },
            {
                type: 'image-text',
                title: 'Ações Impregnadas',
                content: `Tomar banho de rio, pescar, jogar bolinha de gude... todas essas ações estão impregnadas de nossas visões de mundo e tradição.
                
A cultura se cria e recria no cotidiano, na solução dos problemas que cada sociedade enfrenta.`,
                image: '/assets/culture_daily_life.png'
            },
            {
                type: 'activity',
                title: 'Reflexão',
                content: 'Sobre suas tradições diárias:',
                activity: {
                    question: 'Qual destas atividades cotidianas pode ser considerada expressão cultural?',
                    options: [
                        'Apenas ir a museus.',
                        'Tomar café com cuscuz, jogar futebol na rua e rezar.',
                        'Assistir a um filme estrangeiro.'
                    ],
                    correctAnswer: 1,
                    feedback: 'Isso! Cultura é tudo que fazemos no dia a dia, carregado de significado.'
                }
            }
        ]
    },
    {
        id: 'node-2-m3',
        title: 'Identidade e Pluralidade',
        description: 'Brasil pluricultural e o direito à memória.',
        x: 45, y: 60, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'cover',
                title: 'Brasil Plural',
                content: 'Não existem culturas mais importantes que outras, apenas diversas.',
                image: '/assets/cultural_diversity_mosaic.png'
            },
            {
                type: 'text',
                title: 'Inclusão e Respeito',
                content: `O não pensar na perspectiva da pluralidade causou o "apagamento" de culturas afro-descendentes e indígenas.
                
A Educação Patrimonial visa legitimar a herança das minorias e fortalecer a autoestima desses grupos.`
            }
        ]
    },
    {
        id: 'node-3-m3',
        title: 'Metodologia da EP',
        description: 'Observar, Registrar, Explorar e Apropriar.',
        x: 65, y: 45, type: 'challenge', educoinsReward: 75,
        slides: [
            {
                type: 'cover',
                title: 'Os 4 Passos',
                content: 'Como investigar um patrimônio com seus alunos?',
                image: '/assets/patrimonial_education_methodology.png'
            },
            {
                type: 'text',
                title: '1. Observação',
                content: 'Exercícios de percepção sensorial. O que é? Para que serve? Qual a forma?'
            },
            {
                type: 'text',
                title: '2. Registro',
                content: 'Desenhar, fotografar, descrever. Fixar o conhecimento percebido.'
            },
            {
                type: 'text',
                title: '3. Exploração',
                content: 'Pesquisar em bibliotecas, entrevistar moradores, levantar hipóteses.'
            },
            {
                type: 'text',
                title: '4. Apropriação',
                content: 'Recriar! Dramatizar, pintar, fazer arte sobre o patrimônio. Envolvimento afetivo.'
            },
            {
                type: 'activity',
                title: 'Prática',
                content: 'Você leva seus alunos a uma ruína antiga. Qual o primeiro passo?',
                activity: {
                    question: 'O que fazer primeiro segundo a metodologia de Horta (1999)?',
                    options: [
                        'Pedir para decorarem a data de construção.',
                        'Observação: exercícios de percepção visual e sensorial do local.',
                        'Ir embora rápido.'
                    ],
                    correctAnswer: 1,
                    feedback: 'Correto! A observação desperta a curiosidade e o contato inicial.'
                }
            }
        ]
    },
    {
        id: 'node-4-m3',
        title: 'Educação Popular',
        description: 'O meio eficaz de defesa do patrimônio.',
        x: 80, y: 30, type: 'lesson', educoinsReward: 60,
        slides: [
            {
                type: 'quote',
                title: 'Rodrigo Melo Franco',
                content: '"Só há um meio eficaz de assegurar a defesa permanente do patrimônio... é o da educação popular."'
            },
            {
                type: 'text',
                title: 'A Escola e a Vida',
                content: `O lugar da Educação é a vida. 
                
Comece pela cultura regional: um festejo, uma comida, algo que já vive no subconsciente da comunidade.`
            }
        ]
    },
    {
        id: 'node-final-m3',
        title: 'Avaliação Módulo 3',
        description: 'Teste seus conhecimentos sobre Educação Patrimonial Regional.',
        x: 90, y: 15, type: 'final', educoinsReward: 200,
        slides: [
            {
                type: 'cover',
                title: 'Avaliação Final',
                content: 'Conclua este módulo respondendo ao questionário.'
            }
        ]
    }
];
