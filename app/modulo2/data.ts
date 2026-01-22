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

// --- QUIZ BANK MÓDULO 2 ---
export const quizQuestions: QuizQuestion[] = [
    {
        id: 'q1',
        question: 'Segundo o texto, o que são "paisagens culturais"?',
        options: [
            'Apenas parques naturais preservados pelo governo.',
            'Lugares de memória onde interagem elementos materiais, simbólicos e funcionais.',
            'Fotos antigas de paisagens naturais.',
            'Locais sem intervenção humana.'
        ],
        correctAnswer: 1,
        explanation: 'Paisagens culturais são lugares de memória constituídos pela interação entre nossas identidades, história e o espaço.'
    },
    {
        id: 'q2',
        question: 'Qual a relação entre objetos e memória descrita no texto?',
        options: [
            'Objetos são apenas coisas materiais sem valor sentimental.',
            'Objetos servem apenas para decoração.',
            'Objetos agem como suportes da memória, gatilhos para lembranças e identidades.',
            'Devemos descartar objetos antigos para não viver no passado.'
        ],
        correctAnswer: 2,
        explanation: 'O texto descreve objetos como "suportes da memória" que formam relicários de nossas lembranças.'
    },
    {
        id: 'q3',
        question: 'Segundo Adélia Prado (citada no texto), "O que a memória ama..."',
        options: [
            '...se perde no tempo.',
            '...fica eterno.',
            '...vira história oficial.',
            '...é esquecido.'
        ],
        correctAnswer: 1,
        explanation: 'A frase completa é: "O que a memória ama fica eterno". A memória eterniza momentos contra a passagem do tempo.'
    },
    {
        id: 'q4',
        question: 'Para o IPHAN, a paisagem cultural:',
        options: [
            'Não é considerada patrimônio.',
            'É equiparada ao patrimônio histórico e artístico nacional desde 1937.',
            'Só é válida se for urbana.',
            'Deve ser modificada para o progresso.'
        ],
        correctAnswer: 1,
        explanation: 'O decreto nº 25 de 1937 equipara a paisagem ao patrimônio histórico e artístico nacional.'
    },
    {
        id: 'q5',
        question: 'Onde se localizam os "paraísos secretos" citados por Saint-Exupéry?',
        options: [
            'Em ilhas desertas.',
            'Nas paisagens interiores de cada um de nós.',
            'Nos mapas oficiais.',
            'Nos museus.'
        ],
        correctAnswer: 1,
        explanation: 'Saint-Exupéry fala de uma "paisagem interior com planícies invioláveis e paraísos secretos".'
    }
];

// --- RAW ACADEMIC TEXT ---
const fullAcademicText = `
2. Memória e Paisagem

“Em cada um de nós há um segredo, uma paisagem interior com planícies invioláveis, vales de silêncio e paraísos secretos” (Antoine de Saint Exupéry).

Iniciamos esse tópico com essa citação poética sobre nossas paisagens interiores, para assim nos aprofundarmos um pouco mais no conceito de memória e na sua importância para formações como a proposta neste curso. O patrimônio que habita nossas memórias ganha vida no nosso cotidiano por meio de nossos saberes, dizeres viveres, e nos lugares que elegemos como espaço de memória. Chamamos isso de paisagens culturais, lugares de memórias e é sobre esses aspectos que nos debruçaremos nas próximas páginas.

Atividade/dinâmica: Oficina de memória; objetos que falam. Convide a turma a levar para sala de aula um objeto que remeta a uma lembrança. Depois em roda cada uma apresentará seu objeto e partilhará a lembrança que ele remete. Ao final ele escolherá uma frase que sintetize sua memória que deve ser registrada em um pedaço de papel cortado em círculo. Todos os círculos são colados em um mural, e eles devem ser interligados com fios de barbante como uma grande teia.

Sugerimos que, no decorrer da leitura das próximas páginas, você retome alguns pontos das narrativas anteriores, fazendo uma costura de ideias entre memória e identidade. Costura essa que irá nos ajudar a compreender melhor o que são Patrimônio Cultural e Educação Patrimonial. Sugerimos também que, durante a leitura, você faça um exercício de invocar da sua memória, imagens e vivências, lembranças individuais e dos grupos ao quais você pertence, sempre no intuito de compreender que nós somos nosso maior patrimônio. Sabemos que as nossas memórias são permeadas de nossas histórias e sedimentam nosso patrimônio cultual, sabemos que são feitas de lembranças que podem ser individuais ou coletivas. Que elas podem ficar por vezes adormecidas e se despertarem mediante um cheiro, um objeto, uma voz, uma lembrança, mas também um lugar, uma paisagem. A memória, como tudo o que está relacionado à cultura, não é estanque, é relacional e está sujeita a ser ressignificada. Mas, ressignificada ou não, ela é responsável pela eleição e manutenção do patrimônio cultural dos grupos, e a forma como esses grupos se relacionam com seu patrimônio cultural diz muito sobre sua identidade. Assim, há sempre um despertar nostálgico quando entramos em contato com alguns objetos e lugares.
Os objetos são por vezes suportes de nossa memória, uma flor guardada dentro de um livro, uma boneca de infância, uma miniatura de um lugar que visitamos, o cheiro de café passado cedinho, um lago, uma praça que frequentávamos durante a mocidade, um casarão que gostávamos de ficar em frente a ele, olhando detalhe por detalhe, aquela praça onde ocorreu uma manifestação que marcou a história (e a memória) da nossa cidade, a maneira como o avô falava, as histórias dele, o álbum de fotografias que guardam nossas lembranças, uma velha caixa de lata que guarda nossos tesouros como um relicário de nossas memórias. São esses objetos, esses espaços, e essas narrativas que formam os suportes da memória (SIMONI e SOUZA, 2017).
Vivemos em coletividade, nos relacionamos uns com os outros, participamos de festas, temos espaços físicos e paisagens que são considerados símbolos da nossa cidade, nosso país ou nossa sociedade. Independente da nossa crença participamos de alguns ritos que fazem parte da nossa identidade e da identidade de nossa comunidade, conhecemos objetos que são característicos de uma região, ou de um povo, que são carregados de significados. Esses objetos também compõem nossas memórias e dão sentido à nossa existência, compondo nosso patrimônio cultural. 
Os lugares de memória não são formados apenas por um espaço geográfico, mas por toda a subjetividade que os compõem, como as manifestações culturais, as edificações ali construídas e a história de quem as construiu. Eles se constituem a partir da interação desses elementos, e neles, a memória e a história interagem com as nossas identidades.
Os lugares de memória são lugares nos três sentidos da palavra: material, simbólico e funcional, precisam ser dotados, pelo grupo, de algum significado, serem objeto de um ritual ou terem uma significação simbólica para que sejam considerados lugar de memória. Esses três aspectos (material, funcional e simbólico), sempre estão presentes nos lugares de memória. Os lugares de memória são, então, lugares mistos, constituídos pela nossa memória e pela memória coletiva do nosso grupo, lugares que fazem parte da nossa identidade, lugares com os quais nos identificamos, que fazem parte da nossa história e da história do nosso povo. Continuando no raciocínio de que a memória é constituída por múltiplos elementos, e que esses elementos se relacionam, oferecendo informações para as nossas memórias e constituindo nossas identidades, vamos conversar um pouco sobre as relações entre a memória e as paisagens e o patrimônio cultural. 
Sabemos que a melhor maneira de se preservar o patrimônio cultural é conhecendo-o, tomando consciência do seu valor simbólico, afetivo e de pertencimento. Este é o primeiro passo a ser dado para a proteção efetiva de um patrimônio. Um segundo seria a sensibilização por meio de medidas educativas que reconheçam seu valor histórico e cultural, e que, por tudo isso, deve ser preservado como herança cultural para as gerações futuras por entender que o mesmo é um testemunho do passado da humanidade para nós. Partindo dessa premissa, onde entram as paisagens? Bem, os territórios e paisagens, por constituírem-se como “lugares” simbólicos, devem ser preservados não somente no que se refere à questão relacionada à preservação física, mas também devem ser preservadas as lembranças dos acontecimentos, eventos, histórias individuais e coletivas, as memórias, as várias formas de sociabilidade construídas, pensadas a partir do território e da paisagem. 
A relação entre a paisagem e o Patrimônio Cultural constitui um caso especial no contexto das paisagens culturais, onde o IPHAN - Instituto do Patrimônio Histórico e Artístico Nacional, com base em legislação específica, assegura a proteção e preservação desse patrimônio, reconhecendo o seu valor histórico e cultural para a localidade, até para a humanidade. A paisagem é considerada como patrimônio cultural desde o decreto n° 25, de 30 de novembro de 1937, que a equipara ao patrimônio histórico e artístico nacional, tornando os monumentos naturais como jardins, parques naturais bem como as paisagens ocupadas pelos grupos sociais, paisagem urbana, passíveis de tombamento, a fim de conservar e proteger. Já no entendimento da UNESCO (Organização das Nações Unidas para a Educação, a Ciência e a Cultura), a paisagem cultural tem sido considerada como um bem patrimonial desde 1972 (FIGUEIREDO, 2008). 
Porém, em uma leitura a partir da antropologia cultural, da arqueologia e da história por meio do viés da memória, a paisagem cultural é entendida como sendo parte do Patrimônio Cultural. Patrimônio Cultural é o conjunto de bens materiais móveis e imóveis, manifestações e expressões culturais investidas de valores simbólicos revelados como relíquias e riquezas de um grupo social (TAMAZO, 2007). 
Nessa variada gama de bens culturais e patrimoniais de natureza material, a paisagem é um deles por trazer inscrita sobre si, numa espécie de fotografia, as crenças, os valores, os saberes e fazeres de um grupo que a transforma de simples paisagem natural em paisagem cultural com valor inestimável, por estarem na base de suas vidas e habitarem suas memórias.

Vamos refletir juntos.
“O que a memória ama fica eterno” (Adélia Prado)

 
Ela chorava pela eternidade que vivia dentro dela e que eu, na minha meninice, era incapaz de compreender. O tempo passou e hoje me emociono diante das mesmas coisas, tocada por pequenos milagres do cotidiano.
É que a memória é contrária ao tempo. Enquanto o tempo leva a vida embora como vento, a memória traz de volta o que realmente importa, eternizando momentos. Crianças têm o tempo a seu favor e a memória ainda é muito recente. Para elas, um filme é só um filme; uma melodia, só uma melodia. Ignoram o quanto a infância é impregnada de eternidade.
Diante do tempo envelhecemos, nossos filhos crescem, muita gente parte. Porém, para a memória ainda somos jovens, atletas, amantes insaciáveis. Nossos filhos são crianças, nossos amigos estão perto, nossos pais ainda vivem.
Quanto mais vivemos, mais eternidades criamos dentro da gente. Quando nos damos conta, nossos baús secretos – porque a memória é dada a segredos estão recheados daquilo que amamos, do que deixou saudade, do que doeu além da conta, do que permaneceu além do tempo.
A capacidade de se emocionar vem daí: quando nossos compartimentos são escancarados de alguma maneira. Um dia você liga o rádio do carro e toca uma música qualquer, ninguém nota, mas aquela música já fez parte de você – foi o fundo musical de um amor, ou a trilha sonora de uma fossa – e mesmo que tenham se passado anos, sua memória afetiva não obedece a calendários, não caminha com as estações; alguma parte de você volta no tempo e lembra aquela pessoa, aquele momento, àquela época...
Amigos verdadeiros têm a capacidade de se eternizar dentro da gente. É comum ver amigos da juventude se reencontrando depois de anos – já adultos ou até idosos – e voltando a se comportar como adolescentes bobos e imaturos. Encontros de turma são especiais por isso, resgatam as pessoas que fomos, garotos cheios de alegria, engraçadinhos, capazes de atitudes infantis e debilóides, como éramos há 20 ou 30 anos. Descobrimos que o tempo não passa para a memória. Ela eterniza amigos, brincadeiras, apelidos... mesmo que por fora restem cabelos brancos, artroses e rugas.
A memória não permite que sejamos adultos perto de nossos pais. Nem eles percebem que crescemos. Seremos sempre "as crianças", não importa se já temos 30, 40 ou 50 anos. Prá eles a lembrança da casa cheia, das brigas entre irmãos, das estórias contadas ao cair da noite... ainda são muito recentes, pois a memória amou, e aquilo se eternizou.
Por isso é tão difícil despedir-se de um amor ou alguém especial que por algum motivo deixou de fazer parte de nossas vidas. Dizem que o tempo cura tudo, mas não é simples assim. Ele acalma os sentidos, apara as arestas, coloca um band-aid na dor. Mas aquilo que amamos tem vocação para emergir das profundezas, romper os cadeados e assombrar de vez em quando. Somos a soma de nossos afetos, e aquilo que amamos pode ser facilmente reativado por novos gatilhos: somos traídos pelo enredo de um filme, uma música antiga, um lugar especial.
Do mesmo modo, somos memórias vivas na vida de nossos filhos, cônjuges, ex-amores, amigos, irmãos. E mesmo que o tempo nos leve daqui, seremos eternamente lembrados por aqueles que um dia nos amaram.”
`;

// --- LEARNING TRAIL NODES MÓDULO 2 ---
export const mapNodes: MapNode[] = [
    {
        id: 'node-info-m2',
        title: 'Texto Completo M2',
        description: 'Todo o conteúdo do Módulo 2 para leitura.',
        x: 10, y: 80, type: 'info', educoinsReward: 0,
        slides: [
            {
                type: 'cover',
                title: 'Módulo 2: Memória e Paisagem',
                content: 'Explore as paisagens interiores e os lugares de memória.',
                image: '/assets/illustration_inner.png'
            },
            {
                type: 'raw-text',
                title: 'Material Completo',
                content: fullAcademicText
            }
        ]
    },
    {
        id: 'node-1-m2',
        title: 'Paisagens Interiores',
        description: 'O segredo que habita em cada um de nós.',
        x: 25, y: 70, type: 'start', educoinsReward: 50,
        slides: [
            {
                type: 'cover',
                title: 'Paisagens Interiores',
                content: '"Em cada um de nós há um segredo, uma paisagem interior..."',
                image: '/assets/illustration_inner.png'
            },
            {
                type: 'text',
                title: 'Antoine de Saint-Exupéry',
                content: `"...com planícies invioláveis, vales de silêncio e paraísos secretos."
                
Nosso cotidiano é preenchido peos saberes e fazeres que ganham vida nos lugares que elegemos como **espaço de memória**.`
            },
            {
                type: 'activity',
                title: 'Reflexão',
                content: 'Sobre sua própria paisagem interna:',
                activity: {
                    question: 'Qual lugar da sua cidade desperta em você uma memória afetiva imediata ("uma paisagem interior")?',
                    options: [
                        'Qualquer shopping center novo.',
                        'Uma praça, uma casa antiga ou um rio que frequentei na infância.',
                        'Apenas lugares que vejo na TV.'
                    ],
                    correctAnswer: 1,
                    feedback: 'Exato! Esses lugares carregados de afeto formam nossas "paisagens culturais".'
                }
            }
        ]
    },
    {
        id: 'node-2-m2',
        title: 'Objetos que Falam',
        description: 'Suportes da memória e relicários de lembranças.',
        x: 40, y: 55, type: 'lesson', educoinsReward: 50,
        slides: [
            {
                type: 'cover',
                title: 'Oficina de Memória',
                content: 'Objetos são suportes da memória, gatilhos para lembranças.',
                image: '/assets/illustration_objects.png'
            },
            {
                type: 'image-text',
                title: 'Relicários de Memórias',
                content: `Uma flor no livro, uma boneca, uma velha caixa de lata...
                
"São esses objetos, esses espaços e essas narrativas que formam os suportes da memória." (Simoni e Souza, 2017).`,
                image: '/assets/illustration_objects.png'
            },
            {
                type: 'activity',
                title: 'Dinâmica da Teia',
                content: 'Imagine uma sala de aula onde cada pessoa traz um objeto:',
                activity: {
                    question: 'Qual o objetivo de interligar as memórias com fios de barbante nesta proposta pedagógica?',
                    options: [
                        'Apenas para decorar a sala.',
                        'Para mostrar que nossas memórias individuais formam uma teia coletiva.',
                        'Para prender os alunos nas cadeiras.'
                    ],
                    correctAnswer: 1,
                    feedback: 'Isso! A teia simboliza como nossas identidades individuais constroem o grupo.'
                }
            }
        ]
    },
    {
        id: 'node-3-m2',
        title: 'O Tempo e a Eternidade',
        description: 'Aquilo que a memória ama, fica eterno.',
        x: 60, y: 45, type: 'challenge', educoinsReward: 75,
        slides: [
            {
                type: 'cover',
                title: 'Tempo vs Memória',
                content: '"Enquanto o tempo leva a vida embora como vento, a memória traz de volta o que realmente importa."',
                image: '/assets/illustration_time_memory.png'
            },
            {
                type: 'quote',
                title: 'Adélia Prado',
                content: `"O que a memória ama fica eterno."`
            },
            {
                type: 'text',
                title: 'A Memória Afetiva',
                content: `A memória não obedece a calendários.
                
Amigos da juventude se reencontram e voltam a ser adolescentes. Para a memória, nossos pais são sempre nossos pais e nós sempre "as crianças".`
            },
            {
                type: 'activity',
                title: 'Sentimento',
                content: 'Sobre a passagem do tempo:',
                activity: {
                    question: 'Por que é difícil se despedir de algo que amamos?',
                    options: [
                        'Porque somos teimosos.',
                        'Porque aquilo que amamos tem vocação para emergir das profundezas da memória e se eternizar.',
                        'Porque o tempo cura tudo instantaneamente.'
                    ],
                    correctAnswer: 1,
                    feedback: 'Perfeito. A memória eterniza o afeto.'
                }
            }
        ]
    },
    {
        id: 'node-4-m2',
        title: 'Lugares de Memória',
        description: 'Material, Simbólico e Funcional.',
        x: 80, y: 35, type: 'lesson', educoinsReward: 60,
        slides: [
            {
                type: 'text',
                title: 'Os 3 Sentidos',
                content: `Para ser um **Lugar de Memória**, um espaço precisa ser:
                
1.  **Material**: Existir fisicamente.
2.  **Simbólico**: Ter significado para o grupo.
3.  **Funcional**: Ser objeto de ritual ou uso.`
            },
            {
                type: 'text',
                title: 'Patrimônio',
                content: `Desde 1937 (Decreto nº 25), a paisagem é equiparada ao patrimônio histórico no Brasil.
                
Preservar a paisagem é preservar as memórias e formas de sociabilidade nela inscritas.`
            }
        ]
    },
    {
        id: 'node-final-m2',
        title: 'Avaliação Módulo 2',
        description: 'Teste seus conhecimentos sobre Memória e Paisagem.',
        x: 90, y: 20, type: 'final', educoinsReward: 200,
        slides: [
            {
                type: 'cover',
                title: 'Avaliação Final',
                content: 'Conclua este módulo respondendo ao questionário.'
            }
        ]
    }
];
