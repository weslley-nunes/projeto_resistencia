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

// --- RAW ACADEMIC TEXT ---
const fullAcademicText = `
Curso de Formação de Professores em Educação Patrimonial UFT/IPHAN
Narrativas Iniciais
Meu maior Patrimônio é a minha Existência

Há muito tempo nós nos ocupamos e preocupamos em entender e explicar a nossa existência, nossa origem, seja enquanto indivíduo ou enquanto grupo, nos seus mais variados aspectos social, econômico, político, religioso, cultural e outros. Nessa curiosa busca para entender descobrimo-nos como seres humanos com uma das mais belas capacidades e faculdades: a capacidade de criar e recriar nossos hábitos, costumes, posturas, crenças, valores, espaços, lugares e territórios por meio de processos constantes e diários ao longo de nossa existência no tempo e no espaço. A estas criações vividas, ritualizadas e significadas dias após dia, de forma individual e coletiva, nós denominamos de cultura. A cultura é o que nos guia nessa construção de ideias a respeito do mundo e de coisas, pois o nosso grupo é formado pela nossa cultura e a nossa cultura forma nosso grupo ou melhor faz de nós um grupo. Cada grupo humano desenvolve seus próprios conceitos e valores. Cada grupo, então, constitui o seu patrimônio cultural: o conjunto de bens materiais e imateriais, os modos de saber e fazer, suas memorias e histórias, que são considerados valiosos para a sobrevivência e a manutenção das características e tradições deste grupo. Assim se faz necessário compreender o que são esses grupos e quais culturas os permeiam, e é isso que esse curso de Formação de Professores em Educação Patrimonial se propõe: refletir junto aos professores sobre os diversos mundos que habitam nossos alunos e, por meio dessa reflexão/compreensão, exercer de forma mais tranquila e consciente o nosso papel de professor mediador de “mundos” e saberes, porque segundo a pedagogia freiriana:

Não há docência sem discência, as duas se explicam e seus sujeitos, apesar das diferenças que os conotam, não se reduzem à condição de objeto, um do outro. Quem ensina aprende ao ensinar e quem aprende ensina ao aprender. Quem ensina ensina alguma coisa a alguém (FREIRE, 2012).

“Quem ensina, ensina alguma coisa a alguém”. No contexto desse curso de formação, tendo como base o patrimônio cultural, navegaremos sobre as diversas possibilidades que esse tema nos traz enquanto ferramenta educacional seja nos anos iniciais (possibilitando os diálogos sobre identidades, saberes, fazeres que possibilitam que a criança se reconheça em suas particularidades e de seu grupo familiar e em consequência extensivo) quantos nos anos seguintes, auxiliando nas possíveis mediações de conflitos gerados pelos desrespeitos ao diferente, a culturas diferentes. Porque devemos considerar que, na perspectiva que desejamos abordar nesse curso, a Educação Patrimonial  pode ser compreendida como educar para um patrimônio e esse patrimônio é a nossa existência com toda complexidade Cultural que isso aborda. Esse patrimônio cultural  perpassa pela nossa identidade, pois esse patrimônio e as memórias que ele carrega nos ajudam a construir nossa identidade desde o início, e ao longo de nossas vidas. Assim vamos tecer esses fios e buscando entrelaçar nossas existências aos conceitos e atividades que serão abordados e, em consequência, ao nosso fazer enquanto educadores.

Profa. Dra. PhD Rosinalda Corrêa da Silva Simoni

Direto à Memória
Ao iniciarmos um tópico sob o título Direito a memória devemos nos perguntar: Mas quem é capaz de roubar memórias? A quem foi dado esse direito? Para respondermos essa questão precisamos ter em mente três conceitos que se complementam: o conceito de cultura, nesse curso optamos pelo conceito desenvolvido por Laraia (2009), e os conceitos de memória individual e memória coletiva desenvolvidos por Halbwachs (2006). Não se pode falar de cultura sem falar de memórias e não se pode falar de memórias sem falar de culturas. Nesse sentido vocês podem se perguntar: mas, e o direito onde entra? Bom lhes afirmo que, diante das construções filosóficas e historiográficas, nem todos os povos têm o direito de “existir”, no sentido que sua memória e cultura foram e ainda são apagadas diariamente. Devemos partir da premissa que a humanidade é pluriétnica e multicultural. Esta característica a torna mais rica e bela. No entanto, entender-nos enquanto sujeitos sociais constituídos e formados a partir dessa diversidade cultural, seja no senso comum, ou mesmo nas pesquisas acadêmicas, não é uma tarefa simples, pois “escolher um arcabouço teórico e uma metodologia capaz de responder a uma demanda de conhecimentos produzidos no tempo e no espaço [...] não é uma tarefa fácil” (FELÍCIO, 2006, p. 25). Concordando com Felício, não é fácil no mundo e num contexto globalizado no qual vivemos, o entendimento de que somos sujeitos sociais dentro de uma diversidade cultural. Compreender isso é uma necessidade ética e humanitária para a construção e promoção do respeito ao outro, ao diferente. Essa atitude nós podemos conseguir conforme nos mostra Brandão (1989) por meio de uma “vocação holística”, pela qual a antropologia procurou ampliar suas visões de mundo na tentativa de compreensão e respeito à alteridade (o outro) e o diálogo entre o universal e o local. 
Para falar de multiculturalismo primeiro devemos entender que a cultura é o que nos caracteriza e qualifica como seres humanos, e, por meio dela, realizamos a transformação da natureza “dada”, atribuindo-lhe significados. Esta ação é fruto de um processo social de criação que oferece ao ser humano a consciência, o saber que sabe. Por meio de sua relação com o mundo e com a natureza, ele cria então o mundo da cultura. Com esse processo ele tem a consciência necessária para criar, ou transformar o mundo, deslocando-o do reino da natureza para o da cultura, passando então a ser sujeito, pelo mundo da cultura. O multiculturalismo por sua vez é a capacidade de compreender que somos diversos, feitos, compostos por muitas culturas; partindo desse nós o outro então pode se apresentar como nosso avesso, e ainda assim é um ser cultural que merece respeito nas suas diferenças. Assim chegamos ao etnocentrismo cultural (SOUZA e SILVA, 2017).
O etnocentrismo cultural é uma prática que historicamente ocorre desde os primórdios da humanidade. Ele pode ser entendido como sendo uma visão de mundo na qual os grupos humanos tendem a colocar a sua cultura como sendo superiores às demais, ou seja, um determinado grupo humano julga os demais grupos humanos a partir de seus valores, suas crenças, seus costumes, sua cultura (ROCHA, 1984). No século XV ele foi propagado e difundido por meio do pensamento, das ideias e das práticas de colonização das sociedades europeias. Até hoje, ocorrem fatos e situações em que o etnocentrismo é colocado em prática. Isso pode ser visto, por exemplo, em piadas e brincadeiras jocosas referindo-se às questões regionais, étnicas ou religiosas do tipo: “nordestinos são preguiçosos, negros tem juízo até meio-dia, índio não gosta de trabalhar”, entre outras expressões. 
A prática do etnocentrismo cultural e todo contexto das colonialidades vividas e que tornam necessárias a discussão sobre direito à memória: a quem foi dado esse direito? E por quem? Considerando o contexto histórico sobre o qual as Américas foram “construídas” sob o julgo do domínio europeu, tudo que não se encaixasse na sua crença cultural não era reconhecido como cultura. Assim, a história foi escrita pelas mãos dos colonizadores e a todos os “outros” ameríndios (indígenas de diversos grupos) e africanos (de diversas etnias) restou o silenciamento, a negação de suas culturas e existência. A discussão em torno do conceito de etnocentrismo nos traz a discussão sobre outro conceito: o relativismo cultural. Este conceito surge a partir das discussões históricas e antropológicas e veio como contraposição ao primeiro. Ele surge em meados do século XX, é atribuído ao antropólogo cultural Franz Boas, e tem como ponto central a ideia e a convicção de que todos os grupos humanos produzem cultura e que elas devem ser estudadas, e entendidas dentro de seu próprio contexto cultural (DA MATTA, 2000). Essa discussão veio ajudar a antropologia a pensar na promoção e construção de reflexões criticas a respeito da valorização e do respeito às diferenças. E como podemos perceber isso na prática? Quando achamos que nossa cultura é “a” cultura, desenvolvemos um sentimento de etnocentrismo, e daí os seus produtos: racismo, xenofobia e outras discriminações. Ao exercitamos no nosso dia a dia o princípio relativizador admitimos a existência de outras formas de organização, padrões culturais e sociais, ou seja, professamos a diversidade cultural. Com isso nos deparamos ao mesmo tempo com o reconhecimento da alteridade e da diferença que tem como eixo norteador o pressuposto de que todo ser humano é um indivíduo único e diverso. Porém, o mesmo só́ se reconhece enquanto ser mediante a sua relação com o outro e com o coletivo, com a comunidade. Pensando assim, nós podemos afirmar que só́ existimos nessa relação de uns para com os outros. Se fizermos esse movimento saudável de procurar entender o outro em sua diversidade e respeitá-lo, ganhamos o mundo, reconhecendo o direito de todos serem como são. Com esse pensamento e prática, temas/discussões como a proposta nesse tópico o direito a memória deixarão de existir porque compreenderemos que nossa existência, assim como a dos outros, são nosso maior patrimônio cultural, pois são compostas por nossas memórias individuais e coletivas e fazem parte de nossas identidades. E por fim chegamos aos conceitos de identidade e memorias.
A construção das identidades passa por aí, pelo mundo das formas e das subjetividades. Só́ contando com as formas que a nossa subjetividade pode obter repouso e conforto. Por elas podemos vivenciar o que pensamos, sonhamos e tecemos nas redes do imaginário. As materialidades dão suporte ao nosso devaneio existencial e espanto filosófico diante do universo e do mundo. Por ela suportamos o absoluto das possibilidades do universo. Todos os grupos humanos fazem esse caminho descrito acima. Cada sociedade, solitariamente e coletivamente, selecionou, nominou, pensou, significou e instituiu seu próprio universo. Mediante as relações e a educação, as sociedades ensinam e aprendem aquilo que pensam ser elas mesmas, e o que pensam não serem elas, o que acham certo e o que acham errado. Suas formas de agir, operar, conduzir, saber e ensinar o que seria a sua identidade, o seu ethos. O ethos pode ser entendido como o conjunto de maneiras de ser, que a torna única, singular e ao mesmo tempo semelhante, unindo os integrantes de um grupo ou sociedade (GUEERTZ, 2005 apud SOUZA e SILVA e SIMONI, 2017). Essa união ocorre também através das memórias compartilhadas. É importante pensarmos que a memória não é só um ato de lembrar, de relembrar ou de “guardar” algo que vimos ou aprendemos. A memória é mais que isso: ela é influenciada pela nossa história, nossa cultura, nossa identidade, pelas percepções do grupo o qual pertencemos e pelas pessoas com as quais convivemos. Temos a memória individual, que são as nossas lembranças pessoais, percepções e interpretações sobre determinado fato, lugar ou pessoa. Temos também a memória coletiva, que é a memória do grupo, a memória de um povo sobre seu espaço, sobre sua história e suas manifestações. São essas memórias que ajudam a formar o Patrimônio, e que permitem que a história seja escrita a partir de outros pontos de vista, além da chamada “história oficial”. São os suportes da memória que fazem com que a existência tenha sentido, ou seja, se transforme em uma “expressão objetivada da lembrança coletiva” (CHAUI, 2006, p. 114). A memória é formada a partir de narrativas, de objetos (que guardamos, que produzimos, que nos fazem lembrar de algo), de paisagens e de impressões alheias às nossas. Uma multiplicidade de influências constitui não só a memória, mas também o nosso Patrimônio: “atrás de cada artefato (mental ou material) há uma pessoa, ou muitas pessoas. Descobrir quem eram e como viviam é um fator fundamental para a experiência humanizante que nos é proporcionada pelos objetos do patrimônio cultural” (HORTA, 1991, p. 70). E possibilita o despertar do sentimento de pertença, pertencer a um grupo em um dado momento nos fortalece enquanto seres humanizados capazes de conviver com toda multiplicidade que nos cerca, e é um direito de todos esse direito à memória, direito que vem sendo conquistado diariamente mediante lutas sociais encampadas pelos grupos marginalizados historicamente, mas também por movimentos intelectuais, a exemplo do relativismo cultural proposto por antropólogos, ou reformulação da história com a história cultural, os pensadores contra coloniais e decoloniais na educação, os pensamentos freirianos e muitos outros que abriram caminhos para diálogos sobre a importância dos diversos mundos culturais e o reconhecimento deles como agentes transformadores da historiografia humana. Mesmo não sendo registradas, as memórias dos povos marginalizados foram sendo repassadas oralmente e praticadas demonstrando que podem apagar a escrita ou se negar a escrever sobre determinadas culturas como ocorreu com alguns grupos, mas não podem silenciar a fala, a escuta e a existência de suas práticas culturais. Essas memórias são repletas por lembranças, que se ressignificam cada vez que são lembradas e contadas, e comprovam que o maior patrimônio de um grupo é sua existência, assim o direito à memória, assim como o direito à existência, não pode ser negado. O direito à memória pode ser compreendido como o direito de um povo ou indivíduo de lembrar e/ou obter conhecimento de fatos, sejam conhecidos ou não, relativos à sua história, que pode ser local ou universal. Quando falamos de direito à memoria no contexto do patrimônio cultural estamos fazendo alusão às diversas culturas dos povos originários e afrodescendentes que ainda vivem sob o julgo das colonialidades , perceptíveis nas tentativas de epistemicídios que eles ainda vivem, nas poucas possibilidades de ascensão que os mesmos acessam, mesmo sendo elas garantidas por ações afirmativas e leis conquistadas. Assim, falar de direito à memória no âmbito do patrimônio cultural é relativizar as culturas dominantes e compreender porque elas ainda são reproduzidas no nosso cotidiano como únicas. Se nosso maior patrimônio é nossa existência, nossas memórias são o que nos mantêm pulsante, e auxiliar nossos alunos a acessar suas memórias e histórias nesse contexto é garantir e possibilitar que elas se reconheçam nos processos que lhes foram negados e rejeitem a teoria da cultura única que nos foi imposta.
`;

// --- LEARNING TRAIL NODES (Updated Content) ---
export const mapNodes: MapNode[] = [
    {
        id: 'node-info',
        title: 'Agenda & Materiais (Etapa 1)',
        description: 'Datas das aulas ao vivo, plantões de dúvidas e material completo.',
        x: 5, y: 90, type: 'info', educoinsReward: 0,
        slides: [
            {
                type: 'cover',
                title: 'Agenda do Curso',
                content: 'Confira as datas das aulas síncronas e plantões de dúvidas.',
                image: '/assets/illustration_culture.png'
            },
            {
                type: 'agenda',
                title: 'Cronograma Etapa 1',
                content: 'Encontros de live e plantão de dúvidas conforme nosso cronograma oficial.',
                agenda: {
                    dates: [
                        { date: '26/03/2026', type: 'live', link: 'https://meet.google.com/hps-okye-rvx' },
                        { date: '09/04/2026', type: 'live', link: 'https://meet.google.com/hps-okye-rvx' },
                        { date: '23/04/2026', type: 'live', link: 'https://meet.google.com/hps-okye-rvx' },
                        { date: '07/05/2026', type: 'live', link: 'https://meet.google.com/hps-okye-rvx' },
                        { date: '21/05/2026', type: 'live', link: 'https://meet.google.com/hps-okye-rvx' },
                        { date: '03/06/2026', type: 'live', link: 'https://meet.google.com/hps-okye-rvx' },
                        { date: '18/06/2026', type: 'live', link: 'https://meet.google.com/hps-okye-rvx' }
                    ]
                }
            },
            {
                type: 'raw-text',
                title: 'Material Completo',
                content: fullAcademicText
            }
        ]
    },
    {
        id: 'node-1',
        title: 'Tópico 1 - Direito à Memória',
        description: 'Construindo o repertório e identidade',
        x: 20, y: 80, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'cover',
                title: 'Quem sou eu?',
                content: 'Refletir sobre quem sou é o ponto de partida desta atividade.\n\nMemória, identidade e pertencimento.',
                image: '/assets/quilombola_heritage_1776281094378.png'
            },
            {
                type: 'activity',
                title: 'Atividade Reflexiva',
                content: 'Responda abaixo:',
                activity: {
                    type: 'open-text',
                    question: 'Quem sou eu? Qual sua origem familiar, o que gosta de fazer, que valores guiam a sua vida?'
                }
            },
            {
                type: 'activity',
                title: 'Cartografia da Memória',
                content: 'Produto prático:',
                activity: {
                    type: 'file-upload',
                    question: 'Anexe a foto ou documento da sua Cartografia da Memória.'
                }
            }
        ]
    },
    {
        id: 'node-2',
        title: 'Tópico 2 - Memória e Paisagem',
        description: 'Toda paisagem conta uma história',
        x: 35, y: 70, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'cover',
                title: 'Paisagem como Memória',
                content: 'Muitas vezes, a nossa percepção não se aterá ao simples fato visual. Mas estará fundamentada no afeto e na memória.',
                image: '/assets/jalapao_landscape_1776281072150.png'
            },
            {
                type: 'activity',
                title: 'Oficina de memória',
                content: '',
                activity: {
                    type: 'open-text',
                    question: 'Descreva a rua que você mora? Como é a vizinhança? Quais saberes há nela?'
                }
            }
        ]
    },
    {
        id: 'node-3',
        title: 'Tópico 3 - Contexto Regional',
        description: 'Educação patrimonial no contexto regional',
        x: 50, y: 65, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'cover',
                title: 'Contexto Regional',
                content: 'Mapear o patrimônio regional é essencial para o sentimento coletivo de preservação.',
                image: '/assets/festa_divino_1776281053453.png'
            },
            {
                type: 'activity',
                title: 'Mapeamento do Patrimônio',
                content: '',
                activity: {
                    type: 'file-upload',
                    question: 'Anexe o Mapeamento do Patrimônio Regional da sua comunidade.'
                }
            }
        ]
    },
    {
        id: 'node-4',
        title: 'Tópico 4 - Gestão do Patrimônio',
        description: 'Participação da comunidade',
        x: 65, y: 55, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Comunidade na Gestão',
                content: 'Não há preservação de cima para baixo. A comunidade deve gerenciar o seu patrimônio.'
            },
            {
                type: 'activity',
                title: 'Atividade Reflexiva',
                content: '',
                activity: {
                    type: 'open-text',
                    question: 'Como a sua comunidade tem participado ativamente da preservação dos bens e costumes?'
                }
            }
        ]
    },
    {
        id: 'node-5',
        title: 'Tópico 5 - Saberes Tradicionais',
        description: 'Diversidade e Patrimônio',
        x: 80, y: 45, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'cover',
                title: 'Saberes e Fazeres',
                content: 'Mapear os saberes que não estão escritos em livros, mas passados de geração em geração.',
                image: '/assets/capim_dourado_1776281024209.png'
            },
            {
                type: 'activity',
                title: 'Mapeamento de Saberes',
                content: '',
                activity: {
                    type: 'file-upload',
                    question: 'Anexe o seu Mapeamento dos Saberes e Fazeres tradicionais.'
                }
            }
        ]
    },
    {
        id: 'node-6',
        title: 'Tópico 6 - Lugares e Objetos',
        description: 'A materialidade que te compõe',
        x: 75, y: 30, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'A materialidade',
                content: 'Nossa cultura nos permite dar novos significados a coisas simples que passam a ser nossos lugares e objetos afetivos.'
            },
            {
                type: 'activity',
                title: 'Qual a materialidade que te compõe?',
                content: '',
                activity: {
                    type: 'open-text',
                    question: 'Descreva os objetos e lugares mais marcantes para sua essência ao longo da sua vida.'
                }
            }
        ]
    },
    {
        id: 'node-7',
        title: 'Tópico 7 e 8 - Oficinas Práticas',
        description: 'Consolidação e encerramento prático',
        x: 55, y: 20, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'text',
                title: 'Oficinas e Conclusões',
                content: 'Chegamos às oficinas práticas da Etapa 1. É hora de compilar nossas memórias em algo concreto para nossa escola.'
            },
            {
                type: 'activity',
                title: 'Entrega Final das Oficinas',
                content: '',
                activity: {
                    type: 'file-upload',
                    question: 'Anexe aqui qualquer material, roteiro de plano de aula ou documento gerado nas oficinas práticas da Etapa 1.'
                }
            }
        ]
    },
    {
        id: 'node-final',
        title: 'Prova Final da Etapa 1',
        description: 'Teste seus conhecimentos para avançar.',
        x: 40, y: 15, type: 'final', educoinsReward: 200,
        slides: [
            {
                type: 'cover',
                title: 'Avaliação Final',
                content: 'Você chegou ao fim desta etapa.\n\nResponda ao questionário para validar seus conhecimentos e prosseguir.'
            }
        ]
    }
];
