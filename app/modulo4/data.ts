import { MapNode, QuizQuestion } from '@/app/modulo1/data';

export const quizQuestions: QuizQuestion[] = [
    {
        id: 'q1',
        question: 'Segundo a citação de Nego Bispo (2023), por que não existe um fim quando se fala de indivíduos no âmbito de suas culturas?',
        options: [
            'Porque as culturas são finitas e imutáveis.',
            'Porque somos a continuidade dos que vieram antes de nós e o meio de quem veio depois e ainda virão.',
            'Porque as culturas antigas não importam para o futuro.',
            'Porque o passado sempre é apagado pelas novas gerações.'
        ],
        correctAnswer: 1,
        explanation: 'O texto aponta a circularidade da nossa existência: "Nós somos o começo, o meio e o começo", representando a continuidade das gerações.'
    },
    {
        id: 'q2',
        question: 'Como a noção de patrimônio se desenvolveu nas últimas décadas, segundo o texto?',
        options: [
            'Passou a focar exclusivamente em igrejas e monumentos históricos.',
            'Foi restringida a bens materiais tangíveis.',
            'Passou de uma ideia monumental dedicada apenas ao material até chegar à associação do imaterial, natural e do território como um todo.',
            'Foi totalmente descartada pelas leis contemporâneas.'
        ],
        correctAnswer: 2,
        explanation: 'O conceito se ampliou para além dos edifícios, envolvendo o território, o imaterial e as expressões que constroem a identidade.'
    },
    {
        id: 'q3',
        question: 'Qual é o principal instrumento para o planejamento urbano garantido após a Constituição de 1988 para cidades com mais de 20 mil habitantes?',
        options: [
            'Plano Nacional de Segurança.',
            'Plano de Conservação Florestal.',
            'Plano Diretor.',
            'Estatuto do Patrimônio Histórico Exclusivo.'
        ],
        correctAnswer: 2,
        explanation: 'A Constituição e o Estatuto da Cidade tornaram obrigatório o Plano Diretor para pensar o planejamento urbano e a preservação.'
    },
    {
        id: 'q4',
        question: 'Sobre as correntes teóricas da preservação, como Viollet Le Duc e John Ruskin divergiam?',
        options: [
            'Ambos concordavam que todo edifício deveria ser demolido.',
            'Le Duc defendia a restauração para devolver o monumento a um estilo ideal original, enquanto Ruskin era contra a restauração, defendendo apenas a conservação.',
            'Ruskin queria reconstruir os prédios e Le Duc queria abandoná-los.',
            'Não havia divergência, ambos criaram a UNESCO juntos.'
        ],
        correctAnswer: 1,
        explanation: 'Viollet Le Duc era intervencionista (restauração a um "modelo ideal"), e Ruskin era anti-intervencionista (apenas conservação contra o "vandalismo ideológico").'
    },
    {
        id: 'q5',
        question: 'Segundo o texto, de quem é a tarefa de preservar e gerir o patrimônio cultural?',
        options: [
            'É tarefa exclusiva de arquitetos e historiadores do IPHAN.',
            'É um processo que requer a participação de diversos atores: setor público, privado e, sobretudo, a população local (a comunidade).',
            'É responsabilidade unicamente do mercado de turismo.',
            'O patrimônio não precisa de preservação ativa, pois a natureza cuida disso.'
        ],
        correctAnswer: 1,
        explanation: 'A gestão do patrimônio depende da comunidade envolvida, que se torna a principal guardiã do seu legado cultural e atua através da gestão participativa.'
    }
];

export const mapNodes: MapNode[] = [
    {
        id: 'm4-intro',
        title: 'Nós somos o começo, o meio e o começo',
        description: 'A circularidade da nossa cultura.',
        x: 10, y: 80, type: 'start', educoinsReward: 30,
        slides: [
            {
                type: 'quote',
                title: 'Nego Bispo (2023)',
                content: 'Nós somos o começo o meio e o começo.'
            },
            {
                type: 'text',
                title: 'A Continuidade',
                content: 'Iniciaremos esse módulo buscando refletir sobre o papel das comunidades na preservação do patrimônio cultural. A referida citação de Nego Bispo demonstra a circularidade e a complexidade de nossa existência: não existe um fim quando se fala de indivíduos no âmbito de suas culturas, isso porque somos a continuidade dos que vieram antes de nós e o meio de quem veio depois e ainda virão.'
            },
            {
                type: 'text',
                title: 'O Conceito de Cultura',
                content: 'A cultura é um conceito-chave definido como comportamentos, instituições, ideologias e mitos que formam os quadros de referências de uma sociedade (Tylor, 1878). Ela perpassa por comportamentos, dizeres e fazeres, que compõem nosso patrimônio cultural histórico e pré-histórico, auxiliando-nos a pensar nosso papel enquanto guardiões de nosso patrimônio.'
            }
        ]
    },
    {
        id: 'm4-desenvolvimento',
        title: 'A Evolução do Patrimônio',
        description: 'Do monumental ao imaterial e territorial.',
        x: 30, y: 65, type: 'lesson', educoinsReward: 40,
        slides: [
            {
                type: 'text',
                title: 'A Ampliação do Conceito',
                content: 'Nas últimas décadas, o conceito de patrimônio se desenvolveu, passando de uma ideia monumental dedicada ao patrimônio material até chegar à associação e valorização do patrimônio imaterial, natural e do território como um todo.\n\nIsso envolve as expressões culturais na medida em que proporciona processos de construção de identidades coletivas gerando o sentimento de pertença.'
            },
            {
                type: 'text',
                title: 'Participação Cidadã',
                content: 'Sabemos que o patrimônio cultural é um legado à memória coletiva. Para legitimar tal legado, se faz necessária a participação cidadã nas ações de proteção do patrimônio cultural, considerando que é esse cidadão que vai eleger o patrimônio que será resguardado.'
            }
        ]
    },
    {
        id: 'm4-gestao',
        title: 'Legislação e Prevenção',
        description: 'A constituição e o papel da sociedade.',
        x: 45, y: 75, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'A Constituição de 1988',
                content: 'A presença dos atores públicos e sociedade civil neste processo é uma exigência da Lei prevista na Constituição Federal de 1988 e se intensificou em 2001 com o Estatuto da Cidade. \n\nO Artigo 215 estabelece: "O Estatuto garantirá a todos o pleno exercício dos direitos culturais e acesso às fontes da cultura nacional..."'
            },
            {
                type: 'text',
                title: 'Prevenção e Respeito',
                content: 'Não é possível tratar as ações de valorização e preservação sem a efetiva participação cidadã. O processo de preservação e gestão do patrimônio visa prevenir e diminuir o risco de degradação que os bens enfrentam, através de medidas que respeitem a dinâmica cultural que o sustenta, evitando ações fora do contexto.'
            }
        ]
    },
    {
        id: 'm4-teoricos',
        title: 'As Correntes Históricas',
        description: 'Choay, Le Duc e Ruskin: as visões de preservação.',
        x: 65, y: 60, type: 'lesson', educoinsReward: 60,
        slides: [
            {
                type: 'text',
                title: 'As Raízes da Conservação',
                content: 'A conservação iniciou-se na França, entre o final do século XVIII e início do XIX. Foi somente a partir da Revolução Industrial que o conceito de patrimônio se consagrou e teve uma conotação universal, influenciada pela destruição de monumentos nas cidades.'
            },
            {
                type: 'text',
                title: 'Intervencionismo x Conservação',
                content: 'Surgiram dois modelos teóricos:\n\n1) O Intervencionismo de Viollet Le Duc: Defendia a "restauração", devolvendo o monumento ao seu esplendor ou a um modelo ideal (reconstruindo-o e melhorando-o).\n\n2) O Anti-intervencionismo de John Ruskin: Defendia apenas a conservação, contra o "vandalismo ideológico", argumentando que a restauração apagava a autenticidade documental da história.'
            },
            {
                type: 'text',
                title: 'A Gestão Internacional',
                content: 'Após a Segunda Guerra Mundial, foram criadas a ONU e a UNESCO. A UNESCO ampliou o domínio patrimonial: "não se limita mais aos edifícios individuais; ele agora compreende aglomerados de casas, bairros, aldeias, cidades inteiras" (Choay, 2001).'
            }
        ]
    },
    {
        id: 'm4-participativa',
        title: 'Gestão Participativa',
        description: 'Como a comunidade atua.',
        x: 80, y: 40, type: 'lesson', educoinsReward: 60,
        slides: [
            {
                type: 'text',
                title: 'O Plano Diretor',
                content: 'Com a Constituição de 88, o Plano Diretor tornou-se obrigatório para cidades com mais de 20 mil habitantes, devendo pautar o planejamento na preservação da memória local. Porém, a sua elaboração e aplicação não são garantias de um resultado positivo sem fiscalização efetiva.'
            },
            {
                type: 'text',
                title: 'A Tarefa da Comunidade',
                content: 'A eficácia da gestão patrimonial depende dos atores envolvidos. A preservação não é tarefa exclusiva de especialistas. Trata-se de um processo que requer a população local.\n\nAs comunidades se tornam as principais guardiãs de seu legado. É papel da comunidade criar e executar ações preventivas, registros de bens, oficinas e cobrança frente às secretarias municipais.'
            }
        ]
    },
    {
        id: 'm4-praticas',
        title: 'A Carta Patrimonial',
        description: 'Qual é o contexto da sua cidade?',
        x: 55, y: 25, type: 'challenge', educoinsReward: 80,
        slides: [
            {
                type: 'text',
                title: 'A Gestão na sua Realidade',
                content: 'Como funciona a gestão do patrimônio no seu município? Ela existe? Há Secretarias, conselhos, associações? Como atuam?\n\nA proposta deste curso é que possamos escrever coletivamente uma carta patrimonial composta por sugestões de gestão dos patrimônios culturais eleitos por nós.'
            },
            {
                type: 'activity',
                title: 'Reflexão e Carta',
                content: 'Para iniciar a sua contribuição com a nossa Carta Patrimonial Coletiva, responda:',
                activity: {
                    type: 'open-text',
                    question: 'Qual a noção de Patrimônio Cultural e a Participação do Cidadão em Defesa dos Bens Patrimoniais no seu município? Discorra sobre.'
                }
            }
        ]
    },
    {
        id: 'm4-quiz-final',
        title: 'Quiz Final da Trilha',
        description: 'Teste seus conhecimentos sobre a Gestão do Patrimônio.',
        x: 25, y: 15, type: 'final', educoinsReward: 150,
        slides: [
            {
                type: 'cover',
                title: 'Desafio Final',
                content: 'Você chegou ao final da Etapa 4! Responda ao questionário final para consolidar a importância da gestão comunitária.',
                image: '/assets/illustration_badge.png'
            },
            {
                type: 'activity',
                title: 'Questionário de Conclusão',
                content: 'Teste o que você absorveu do texto.',
                activity: {
                    type: 'quiz',
                    question: 'Clique em "Iniciar Quiz" para começar.'
                }
            }
        ]
    }
];
