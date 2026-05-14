const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MODULO1_NODES = [
  'etapa1-1',
  'etapa1-2',
  'etapa1-3',
  'etapa1-4',
  'etapa1-5',
  'etapa1-final'
];

const MODULO2_NODES = [
  'm2-intro',
  'm2-identidade',
  'm2-suportes',
  'm2-paisagem',
  'm2-eternidade',
  'm2-praticas',
  'm2-quiz-final'
];

const ALL_REQUIRED_NODES = [...MODULO1_NODES, ...MODULO2_NODES];

async function main() {
  console.log('--- Iniciando atualização de progresso ---');
  
  // 1. Buscar todos os estudantes
  const students = await prisma.user.findMany({
    where: { role: 'STUDENT' }
  });
  
  console.log(`Encontrados ${students.length} estudantes.`);
  
  let updatedCount = 0;
  let progressInsertedCount = 0;

  for (const student of students) {
    // 2. Atualizar Educoins para 2547
    await prisma.user.update({
      where: { id: student.id },
      data: { educoins: 2547 }
    });
    updatedCount++;

    // 3. Inserir registros de progresso para Módulo 1 e Módulo 2
    for (const nodeId of ALL_REQUIRED_NODES) {
      const moduleId = nodeId.startsWith('etapa1') ? 'modulo1' : 'modulo2';
      
      // Upsert para evitar duplicatas se o usuário já tiver algum progresso
      await prisma.userProgress.upsert({
        where: {
          userId_moduleId_nodeId: {
            userId: student.id,
            moduleId: moduleId,
            nodeId: nodeId
          }
        },
        update: {}, // Não faz nada se já existir
        create: {
          userId: student.id,
          moduleId: moduleId,
          nodeId: nodeId
        }
      });
      progressInsertedCount++;
    }
  }

  console.log(`--- Atualização concluída ---`);
  console.log(`Estudantes atualizados (Educoins): ${updatedCount}`);
  console.log(`Registros de progresso processados: ${progressInsertedCount}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
