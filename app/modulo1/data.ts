export type MapNode = {
    id: string;
    title: string;
    description: string;
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
    type: 'start' | 'lesson' | 'challenge' | 'final';
    content: string; // Markdown or HTML content
    educoinsReward: number;
};

export const mapNodes: MapNode[] = [
    {
        id: 'node-1',
        title: 'Início: Narrativas Iniciais',
        description: 'Comece sua jornada entendendo as narrativas que formam nossa história.',
        x: 10,
        y: 80,
        type: 'start',
        educoinsReward: 10,
        content: `
# Narrativas Iniciais

Historicamente, a humanidade construiu **narrativas** para dar sentido à existência.
Desde tempos imemoriais, povos de todas as culturas olharam para o céu, para a terra e para dentro de si mesmos em busca de respostas.

- **Mitologias**: Histórias sobre deuses e heróis.
- **Religiões**: Sistemas de crença e fé.
- **Filosofias**: A busca racional pela verdade.
- **Ciência**: A exploração metódica do universo.

Essas narrativas não são apenas histórias antigas; elas continuam a moldar como vemos o mundo hoje. Elas definem o que consideramos "verdade", "justiça" e "sagrado".

> "Somos feitos de histórias. E as histórias que contamos definem quem somos."

Ao longo deste módulo, vamos desvendar essas narrativas e entender como elas afetam nossa visão sobre cultura e sociedade.
    `
    },
    {
        id: 'node-2',
        title: 'O Mundo da Cultura',
        description: 'Descubra como a cultura é a lente através da qual vemos o mundo.',
        x: 25,
        y: 65,
        type: 'lesson',
        educoinsReward: 15,
        content: `
# O Mundo da Cultura

A cultura não é algo que temos ou não temos. Causa estranhamento pensar assim, mas **todos nós somos seres culturais**.

Tudo o que fazemos é mediado pela cultura:
1.  **A língua** que falamos.
2.  **As roupas** que vestimos.
3.  **A comida** que gostamos.
4.  **As crenças** que carregamos.

A cultura funciona como uma **lente**. Se você usar óculos com lentes azuis, verá o mundo azul. Se a sua cultura valoriza a competição, você verá o mundo como uma disputa.

## O Homem como Ser Simbólico
Diferente dos outros animais, nós criamos **símbolos**. Uma cruz não é apenas madeira; uma bandeira não é apenas tecido. Nós damos significados profundos às coisas.

Essa capacidade de criar símbolos e transmitir conhecimento é o que nos torna humanos.
    `
    },
    {
        id: 'node-3',
        title: 'Direito à Memória',
        description: 'A memória é um direito fundamental. Entenda por quê.',
        x: 40,
        y: 50,
        type: 'lesson',
        educoinsReward: 20,
        content: `
# Direito à Memória

Você já parou para pensar no que é lembrado e no que é esquecido?

A **Memória** não é apenas sobre o passado. Ela é sobre o presente e o futuro. Quem controla a memória, controla a identidade de um povo.

### O Apagamento Histórico
Muitas vezes, a história oficial apaga as vozes dos grupos marginalizados.
- Onde estão as estátuas dos líderes indígenas?
- Onde estão os nomes das ruas homenageando heróis negros?
- Onde estão as histórias das mulheres nas ciências?

O **Direito à Memória** é o direito de lembrar. De reconhecer as violências do passado para que não se repitam. E de celebrar as resistências que muitas vezes foram silenciadas.

> "Lembrar é resistir."
    `
    },
    {
        id: 'node-4',
        title: 'O Desafio do Etnocentrismo',
        description: 'Enfrente o perigo de julgar o outro pela sua própria régua.',
        x: 50,
        y: 30,
        type: 'challenge',
        educoinsReward: 25,
        content: `
# O Desafio do Etnocentrismo

**Etnocentrismo**: *Etno* (povo) + *Centrismo* (centro). É a visão de mundo onde o nosso próprio grupo é tomado como o centro de tudo.

Quando somos etnocêntricos, julgamos os outros com base nos nossos próprios valores, considerando o nosso modo de vida como o "certo", o "normal" ou o "superior", e o do outro como "errado", "bizarro" ou "primitivo".

### Exemplos de Etnocentrismo:
- Dizer que tribos indígenas são "atrasadas" porque não têm tecnologia industrial.
- Achar que a comida de outro país é "nojenta" só porque é diferente da sua.
- Acreditar que a sua religião é a única verdadeira.

O etnocentrismo é a raiz do preconceito, da xenofobia e do racismo. Vencer esse desafio exige **empatia** e **humildade**.
    `
    },
    {
        id: 'node-5',
        title: 'Relativismo Cultural',
        description: 'Aprenda a olhar para cada cultura com respeito e compreensão.',
        x: 65,
        y: 45,
        type: 'lesson',
        educoinsReward: 20,
        content: `
# Relativismo Cultural

Como antídoto ao etnocentrismo, a antropologia propõe o **Relativismo Cultural**.

Isso não significa aceitar tudo (como violência ou injustiça) em nome da cultura. Significa entender que **nenhuma cultura é superior a outra**. Cada cultura tem sua própria lógica, suas próprias regras e seu próprio valor.

Para entender uma prática cultural, você deve olhá-la **de dentro**, a partir do ponto de vista de quem a pratica.

### Exercício de Olhar
Ao invés de julgar, pergunte:
- Por que eles fazem isso?
- Qual o significado disso para eles?
- Como isso ajuda a sociedade deles a funcionar?

O relativismo nos ensina a respeitar a diversidade humana em toda a sua riqueza.
    `
    },
    {
        id: 'node-6',
        title: 'Identidade e Memória',
        description: 'Você é aquilo que você lembra. Explore a conexão profunda entre quem somos e o que lembramos.',
        x: 80,
        y: 60,
        type: 'lesson',
        educoinsReward: 20,
        content: `
# Identidade e Memória

A pergunta "Quem sou eu?" está intimamente ligada à pergunta "De onde eu vim?".

Nossa **Identidade** é construída sobre a nossa memória. Sem memória, não saberíamos quem somos, quem são nossos pais, onde moramos, ou o que gostamos.

### Identidade Coletiva
Assim como as pessoas, os grupos também têm identidade.
- Ser brasileiro
- Ser tocantinense
- Ser estudante

Essas identidades coletivas dependem de uma **Memória Coletiva**. Feriados, monumentos, museus e livros de história ajudam a manter essa memória viva.

Quando perdemos nossa memória coletiva, perdemos nossa identidade como povo. Por isso, preservar a cultura e a história é preservar a nós mesmos.
    `
    },
    {
        id: 'node-7',
        title: 'Desafio Final: Eu sou porque somos',
        description: 'Conecte todos os pontos e compreenda a interdependência humana.',
        x: 90,
        y: 20,
        type: 'final',
        educoinsReward: 50,
        content: `
# Desafio Final: Eu sou porque somos

Você chegou ao fim desta trilha, mas é apenas o começo da jornada.

Aprendemos sobre narrativas, cultura, memória, etnocentrismo e identidade. Tudo isso nos leva a uma filosofia africana chamada **Ubuntu**:

> "Eu sou porque nós somos."

Ninguém é uma ilha. Nossa humanidade só existe em relação à humanidade dos outros.
Sua memória é parte da minha memória. Sua cultura enriquece a minha.

**Parabéns!** Você completou o Módulo I.
Leve esses conceitos com você para o Módulo II e para a vida.
    `
    }
];
