import { MapNode, QuizQuestion } from '@/app/modulo1/data'; // Reusing types

export const quizQuestions: QuizQuestion[] = [
    {
        id: 'q1',
        question: 'Segundo Bezerra Menezes, citado no texto, o que significa "educar"?',
        options: [
            'Transmitir conhecimentos de forma passiva.',
            'Garantir ao indivíduo condições para que ele continue a educar-se, promovendo sua autonomia.',
            'Preparar o aluno exclusivamente para o mercado de trabalho.',
            'Impor uma cultura hegemônica sobre as demais.'
        ],
        correctAnswer: 1,
        explanation: 'O texto cita Bezerra Menezes: "educar é garantir ao indivíduo condições para que ele continue a educar-se. Em outras palavras, educar é promover a autonomia dos indivíduos".'
    },
    {
        id: 'q2',
        question: 'O que a Educação Patrimonial garante ao indivíduo em relação à sua cultura?',
        options: [
            'A homogeneização de todas as culturas.',
            'O apagamento das memórias e histórias locais.',
            'O direito de manifestar e eleger aquilo que o faz único dentre iguais.',
            'Apenas o direito de visitar museus tradicionais.'
        ],
        correctAnswer: 2,
        explanation: 'A Educação Patrimonial garante ao indivíduo o direito de manifestar e eleger aquilo que o faz único dentre iguais, expressando sua cultura no jeito de ser, fazer e viver.'
    },
    {
        id: 'q3',
        question: 'Como a Educação Patrimonial deve abordar o patrimônio cultural?',
        options: [
            'De forma isolada, distante da realidade da comunidade.',
            'Apenas preservando edifícios históricos em ruínas.',
            'A partir da informação transformada em conhecimento, como base para um processo democrático de apropriação e respeito.',
            'Restringindo-o apenas às classes de elite.'
        ],
        correctAnswer: 2,
        explanation: 'A função social da Educação Patrimonial é usar a informação transformada em conhecimento como base para a construção de um processo democrático de respeito e apropriação.'
    },
    {
        id: 'q4',
        question: 'Qual é o papel da Educação Patrimonial no contexto regional, como o do Tocantins?',
        options: [
            'Criar uma única identidade cultural, eliminando a diversidade.',
            'Atuar como campo de mediação entre memória, identidade e patrimônio, valorizando memórias de grupos marginalizados.',
            'Proibir manifestações culturais de origem africana e indígena.',
            'Concentrar-se apenas nos bens materiais de valor internacional reconhecidos pela UNESCO.'
        ],
        correctAnswer: 1,
        explanation: 'A Educação Patrimonial atua como mediação, legitimando as heranças históricas e culturais de grupos marginalizados (indígenas, quilombolas, ribeirinhos) que foram silenciados pela história oficial.'
    },
    {
        id: 'q5',
        question: 'Segundo o texto, o que significa investir em Educação Patrimonial no estado do Tocantins?',
        options: [
            'Reconhecer o território como espaço de memória viva, onde passado e presente se entrelaçam na construção de futuros mais justos e inclusivos.',
            'Investir unicamente no turismo de massa.',
            'Copiar os modelos europeus de preservação histórica.',
            'Desconsiderar os saberes das comunidades tradicionais locais.'
        ],
        correctAnswer: 0,
        explanation: 'No Tocantins, investir em Educação Patrimonial significa reconhecer o território como espaço de memória viva, comprometido com a dimensão social, histórica e simbólica do patrimônio.'
    }
];

export const mapNodes: MapNode[] = [
    {
        id: 'm3-intro',
        title: 'Educação Patrimonial',
        description: 'Alfabetização cultural e a cultura como princípio norteador.',
        x: 15, y: 85, type: 'start', educoinsReward: 30,
        slides: [
            {
                type: 'text',
                title: 'A Cultura como Princípio',
                content: 'Acreditamos que o processo ensino aprendizagem acontece de várias formas e é praticado em situações tão diferentes que por vezes parece ser invisível. Mas, para que esse processo aconteça, é preciso perceber a educação dentro de uma perspectiva que aposta na cultura como princípio norteador.'
            },
            {
                type: 'text',
                title: 'Alfabetização Cultural',
                content: 'Este tópico busca diminuir a distância entre a educação escolar e Educação Patrimonial... O argumento principal é que, ao discutir sobre o mundo da cultura e seus elementos, os indivíduos vão desnudando a sua realidade e se descobrindo nela.\n\nNesse sentido, a cultura material torna-se elemento do processo de “alfabetização cultural” empreendido por Freire, assim como uma concepção de cultura que inclui as manifestações eruditas e as populares.'
            }
        ]
    },
    {
        id: 'm3-autonomia',
        title: 'A Autonomia do Indivíduo',
        description: 'Manifestando a cultura que nos faz únicos.',
        x: 35, y: 70, type: 'lesson', educoinsReward: 40,
        slides: [
            {
                type: 'quote',
                title: 'Bezerra Menezes',
                content: 'Educar é garantir ao indivíduo condições para que ele continue a educar-se. Em outras palavras, educar é promover a autonomia dos indivíduos.'
            },
            {
                type: 'text',
                title: 'O Direito à Manifestação',
                content: 'Se a educação formal garante ao indivíduo condições para continuar aprendendo, a Educação Patrimonial garante a esse mesmo indivíduo o direito de manifestar e eleger aquilo que o faz único dentre iguais, a sua cultura.\n\nEssa cultura é expressa em suas manifestações, no seu jeito de ser, fazer e viver. O patrimônio cultural foi por muito tempo visto de forma politizada. Precisamos reler esse patrimônio e extrair dele sua essência, humanizando-o.'
            }
        ]
    },
    {
        id: 'm3-vida',
        title: 'A Educação e a Vida',
        description: 'Onde o nosso patrimônio realmente reside?',
        x: 55, y: 80, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'A Vida de Todo Dia',
                content: 'O lugar da Educação é a vida, isso não pode ser diferente para a Educação Patrimonial. A educação, como a cultura, não começa na escola. Ela começa no seio de nossas mães. Somos nutridos pelo leite, pelo jeito, pelo toque... O jeito de fazer é a cultura.\n\nA educação deve levar em conta o princípio de unidade/diversidade em todas as esferas – a individual, a social e a cultural, e o produto resultante disso é o nosso patrimônio.'
            },
            {
                type: 'text',
                title: 'Onde está o nosso Patrimônio?',
                content: 'Nos nossos saberes, fazeres, ruas, praças, igrejas, no relicário deixado pela nossa avó, na comida tradicional de todo domingo, nos festejos devocionais... \n\nO nosso patrimônio está em você, em mim, em todos nós. Tudo que expressa nossa identidade expressa nosso patrimônio cultural.'
            }
        ]
    },
    {
        id: 'm3-transformador',
        title: 'Agente Transformador Social',
        description: 'Pertencimento e respeito à diversidade.',
        x: 75, y: 65, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Herança Cultural',
                content: 'O termo patrimônio nos remete ao sentido de relação e pertencimento entre as pessoas (material ou imaterial). O sentido que nos interessa é o que está ligado à herança cultural, algo que teve ou tem um significado para alguém.\n\nConsideramos a compreensão da educação patrimonial como agente transformador social.'
            },
            {
                type: 'text',
                title: 'Trabalho Educativo',
                content: 'A Educação Patrimonial acontece por ações que buscam sensibilizar para a preservação. Através de uma abordagem interdisciplinar (cultura, memória, história, identidade e preservação), busca-se compreender a diversidade que compõe a própria existência.\n\nO papel da Educação Patrimonial consiste em dialogar, legitimar a herança das minorias, reafirmar identidades e exercitar o respeito e a tolerância.'
            }
        ]
    },
    {
        id: 'm3-regional',
        title: 'O Contexto Regional (Tocantins)',
        description: 'Tensionando a história oficial e valorizando comunidades.',
        x: 85, y: 40, type: 'lesson', educoinsReward: 60,
        slides: [
            {
                type: 'text',
                title: 'O Cenário Regional',
                content: 'No âmbito regional, a educação patrimonial desempenha um papel fundamental, especialmente em contextos marcados por diversidade étnica e territorial, como o estado do Tocantins. Constitui-se como um campo de mediação entre memória, identidade e patrimônio.\n\nTrata-se de um processo que legitima heranças de grupos socialmente marginalizados — povos indígenas, comunidades quilombolas, ribeirinhas e camponesas — cujas narrativas foram invisibilizadas pela história oficial.'
            },
            {
                type: 'text',
                title: 'Tensionando o Modelo',
                content: 'No contexto brasileiro, a noção de patrimônio cultural esteve historicamente associada à construção de uma memória nacional seletiva (Reisewitz, 2004). A Educação Patrimonial adota uma perspectiva crítica e inclusiva, tensionando esse modelo tradicional.\n\nNo Tocantins, essa abordagem é especialmente relevante pela rica diversidade de manifestações materiais e imateriais vinculadas à resistência e ancestralidade.'
            },
            {
                type: 'text',
                title: 'Formação Cidadã',
                content: 'Investir em Educação Patrimonial no Tocantins significa reconhecer o território como espaço de memória viva, onde passado e presente se entrelaçam na construção de futuros mais justos, inclusivos e comprometidos com a preservação do patrimônio cultural em sua dimensão social, histórica e simbólica.'
            }
        ]
    },
    {
        id: 'm3-praticas',
        title: 'Mapeamento do Patrimônio',
        description: 'Identificando referências no seu próprio território.',
        x: 60, y: 25, type: 'challenge', educoinsReward: 80,
        slides: [
            {
                type: 'activity',
                title: 'Prática de Mapeamento',
                content: 'O objetivo desta atividade é promover o reconhecimento do patrimônio cultural regional como elemento vivo da memória coletiva e fortalecer o compromisso com sua preservação.',
                activity: {
                    type: 'file-upload',
                    question: 'Elabore um mapeamento participativo (pode ser um texto, mapa ou tabela) de referências culturais do seu território, identificando bens materiais, imateriais, memórias e práticas. Envie o arquivo aqui.'
                }
            }
        ]
    },
    {
        id: 'm3-quiz-final',
        title: 'Quiz Final da Trilha',
        description: 'Teste seus conhecimentos sobre Patrimônio Regional.',
        x: 30, y: 15, type: 'final', educoinsReward: 150,
        slides: [
            {
                type: 'cover',
                title: 'Desafio Final',
                content: 'Chegamos ao final da Etapa 3. Verifique seus aprendizados no quiz para concluir a trilha e liberar suas Educoins!',
                image: '/assets/illustration_badge.png'
            },
            {
                type: 'activity',
                title: 'Questionário de Conclusão',
                content: 'Responda as questões com base na Educação Patrimonial no Contexto Regional.',
                activity: {
                    type: 'quiz',
                    question: 'Clique em "Iniciar Quiz" para começar.'
                }
            }
        ]
    }
];
