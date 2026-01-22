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

// --- QUIZ BANK ---
export const quizQuestions: QuizQuestion[] = [
    {
        id: 'q1',
        question: 'O que define nossa identidade cultural?',
        options: ['Apenas nossa genética', 'As histórias, crenças e costumes que compartilhamos', 'O lugar onde nascemos apenas', 'Nossa classe econômica'],
        correctAnswer: 1,
        explanation: 'A identidade é construída socialmente através de memória, cultura e convivência.'
    },
    {
        id: 'q2',
        question: 'O que é Etnocentrismo?',
        options: ['A valorização de todas as culturas', 'Julgar outras culturas pela régua da sua própria', 'Estudar etnias diferentes', 'O centro geográfico de um povo'],
        correctAnswer: 1,
        explanation: 'Etnocentrismo é a visão preconceituosa de considerar sua própria cultura como superior ou "normal".'
    },
    {
        id: 'q3',
        question: 'Qual a importância do "Direito à Memória"?',
        options: ['Lembrar senhas antigas', 'Evitar que erros históricos se repitam e valorizar identidades apagadas', 'Decorar livros de história', 'Nenhuma das anteriores'],
        correctAnswer: 1,
        explanation: 'A memória preserva a identidade e serve de alerta para não repetirmos injustiças.'
    },
    {
        id: 'q4',
        question: 'Sobre o Relativismo Cultural, é correto afirmar:',
        options: ['Tudo é permitido', 'Nenhuma cultura é superior a outra, cada uma tem sua lógica', 'Devemos julgar costumes estranhos', 'Só existe uma cultura correta'],
        correctAnswer: 1,
        explanation: 'O relativismo cultural busca entender cada cultura a partir de seus próprios valores, sem hierarquia.'
    },
    {
        id: 'q5',
        question: 'A filosofia Ubuntu significa:',
        options: ['Eu sou porque nós somos', 'Cada um por si', 'A natureza é sagrada', 'O futuro é tecnológico'],
        correctAnswer: 0,
        explanation: 'Ubuntu é uma filosofia africana que prega a interdependência humana: existimos através dos outros.'
    },
    {
        id: 'q6',
        question: 'Qual elemento NÃO é considerado parte da cultura?',
        options: ['Culinária', 'Língua', 'Vestimenta', 'Instinto biológico de respirar'],
        correctAnswer: 3,
        explanation: 'Funções biológicas universais não são culturais. Cultura é tudo o que é aprendido e partilhado.'
    },
    {
        id: 'q7',
        question: 'O que são narrativas mitológicas?',
        options: ['Mentiras antigas', 'Histórias sagradas que explicam a origem do mundo e das coisas', 'Livros de ficção científica', 'Notícias de jornal'],
        correctAnswer: 1,
        explanation: 'Mitos são narrativas simbólicas fundamentais para dar sentido à existência humana.'
    },
    {
        id: 'q8',
        question: 'A cultura do Tocantins é influenciada por:',
        options: ['Apenas imigrantes europeus', 'Indígenas, Quilombolas e migrantes de diversas regiões', 'Apenas pela cultura goiana', 'Não tem influência externa'],
        correctAnswer: 1,
        explanation: 'O Tocantins é um encontro de águas e culturas: indígena, negra, nortista, nordestina e sulista.'
    }
];

// --- LEARNING TRAIL NODES ---
export const mapNodes: MapNode[] = [
    {
        id: 'node-1',
        title: 'Início: Narrativas Iniciais',
        description: 'Comece sua jornada entendendo as narrativas que formam nossa história.',
        x: 10, y: 80, type: 'start', educoinsReward: 10,
        slides: [
            {
                type: 'cover',
                title: 'Narrativas Iniciais',
                content: 'Bem-vindo à jornada. Vamos descobrir como as histórias moldam quem somos.',
                image: '/assets/cover_narratives.jpg' // Placeholder or generated asset
            },
            {
                type: 'text',
                title: 'O Poder das Histórias',
                content: `Historicamente, a humanidade construiu **narrativas** para dar sentido à existência.\n\nDesde tempos imemoriais, olhamos para as estrelas e criamos mitos.`
            },
            {
                type: 'image-text',
                title: 'Tipos de Narrativa',
                content: `- **Mitologias**: Deuses e heróis.\n- **Religiões**: Fé e crença.\n- **Ciência**: Método e prova.`,
                image: 'https://images.unsplash.com/photo-1478726880482-9653a06fae63?q=80&w=2000&auto=format&fit=crop'
            },
            {
                type: 'activity',
                title: 'Quiz Rápido',
                content: 'Vamos ver se você pegou a ideia.',
                activity: {
                    question: 'Qual dessas NÃO é uma forma de narrativa cultural?',
                    options: ['Mito da Criação', 'Teoria do Big Bang', 'Um espirro', 'A Bíblia'],
                    correctAnswer: 2,
                    feedback: 'Exato! Um espirro é uma reação biológica, não uma construção cultural.'
                }
            }
        ]
    },
    {
        id: 'node-2',
        title: 'O Mundo da Cultura',
        description: 'A cultura como lente para ver o mundo.',
        x: 25, y: 65, type: 'lesson', educoinsReward: 15,
        slides: [
            {
                type: 'cover',
                title: 'O Mundo da Cultura',
                content: 'Tudo o que fazemos é mediado pela cultura. Você está pronto para trocar de óculos?',
            },
            {
                type: 'quote',
                title: 'Reflexão',
                content: 'A cultura funciona como uma lente. Se usarmos óculos azuis, o mundo será azul.'
            },
            {
                type: 'text',
                title: 'Você é um ser cultural',
                content: `Não existe ser humano sem cultura.\n\n1. A língua que falamos\n2. A comida que amamos\n3. O jeito que vestimos\n\nTudo isso aprendemos socialmente.`
            }
        ]
    },
    {
        id: 'node-3',
        title: 'Direito à Memória',
        description: 'Por que lembrar é resistir?',
        x: 40, y: 50, type: 'lesson', educoinsReward: 20,
        slides: [
            {
                type: 'cover',
                title: 'Direito à Memória',
                content: 'O esquecimento é uma ferramenta de poder. Lembrar é um ato político.'
            },
            {
                type: 'image-text',
                title: 'O Apagamento',
                content: 'Muitas vezes, a história oficial "esquece" propositalmente grupos marginalizados.\n\nOnde estão os heróis negros e indígenas nos nossos monumentos?',
                image: 'https://images.unsplash.com/photo-1596707328607-4f6c5be5f704?q=80&w=2000&auto=format&fit=crop'
            }
        ]
    },
    {
        id: 'node-4',
        title: 'Desafio: Etnocentrismo',
        description: 'O perigo de se achar o centro do mundo.',
        x: 50, y: 30, type: 'challenge', educoinsReward: 25,
        slides: [
            {
                type: 'text',
                title: 'O que é Etnocentrismo?',
                content: '**Etno** (povo) + **Centrismo** (centro).\n\nÉ achar que a sua cultura é a "normal" e a dos outros é "errada" ou "atrasada".'
            },
            {
                type: 'activity',
                title: 'Prática',
                content: 'Identifique o comportamento etnocêntrico:',
                activity: {
                    question: 'Um turista diz: "Que comida nojenta, como eles conseguem comer isso?"',
                    options: ['Isso é Etnocentrismo', 'Isso é Crítica Gastronômica', 'Isso é Relativismo'],
                    correctAnswer: 0,
                    feedback: 'Correto. Julgar a cultura do outro com base no seu gosto pessoal é etnocentrismo.'
                }
            }
        ]
    },
    {
        id: 'node-5',
        title: 'Relativismo Cultural',
        description: 'O antídoto para o preconceito.',
        x: 65, y: 45, type: 'lesson', educoinsReward: 20,
        slides: [
            {
                type: 'cover',
                title: 'O Olhar Relativista',
                content: 'Nenhuma cultura é superior a outra. Apenas diferente.'
            },
            {
                type: 'text',
                title: 'Como praticar?',
                content: 'Para entender o outro, você precisa tentar ver o mundo **como ele vê**.\n\nPergunte: "Qual o sentido disso para eles?" ao invés de "Isso é certo ou errado?".'
            }
        ]
    },
    {
        id: 'node-6',
        title: 'Identidade e Memória',
        description: 'Quem somos nós sem nossas lembranças?',
        x: 80, y: 60, type: 'lesson', educoinsReward: 20,
        slides: [
            {
                type: 'text',
                title: 'Identidade Coletiva',
                content: 'Ser brasileiro, ser tocantinense, ser quilombola.\n\nEssas identidades dependem de uma **memória compartilhada**.'
            },
            {
                type: 'image-text',
                title: 'Nossa História',
                content: 'Preservar nossas festas, nossas lendas e nossos lugares sagrados é preservar quem somos.',
                image: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?q=80&w=2000&auto=format&fit=crop'
            }
        ]
    },
    {
        id: 'node-7',
        title: 'Desafio Final: Prova do Módulo',
        description: 'Teste seus conhecimentos e avance para a próxima fase.',
        x: 90, y: 20, type: 'final', educoinsReward: 100,
        slides: [
            {
                type: 'cover',
                title: 'Prova Final',
                content: 'Você completou a trilha de aprendizado.\n\nAgora, vamos testar seus conhecimentos. Você precisa acertar pelo menos **50%** para passar.'
            }
            // The actual quiz interaction is handled by the specialized component, not slide content
        ]
    }
];
