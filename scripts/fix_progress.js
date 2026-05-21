const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

const OK_NODES = [
  // Módulo 1 (Etapa 01)
  { id: 'etapa1-1', moduleId: 'modulo1' },
  { id: 'etapa1-2', moduleId: 'modulo1' },
  { id: 'etapa1-3', moduleId: 'modulo1' },
  { id: 'etapa1-4', moduleId: 'modulo1' },
  { id: 'etapa1-5', moduleId: 'modulo1' },
  { id: 'etapa1-final', moduleId: 'modulo1' },

  // Módulo 2 (Etapa 02)
  { id: 'm2-intro', moduleId: 'modulo2' },
  { id: 'm2-identidade', moduleId: 'modulo2' },
  { id: 'm2-suportes', moduleId: 'modulo2' },
  { id: 'm2-paisagem', moduleId: 'modulo2' },
  { id: 'm2-eternidade', moduleId: 'modulo2' },
  { id: 'm2-praticas', moduleId: 'modulo2' },
  { id: 'm2-quiz-final', moduleId: 'modulo2' },

  // Módulo 3 (Etapa 03)
  { id: 'm3-intro', moduleId: 'modulo3' },
  { id: 'm3-autonomia', moduleId: 'modulo3' },
  { id: 'm3-vida', moduleId: 'modulo3' },
  { id: 'm3-transformador', moduleId: 'modulo3' },
  { id: 'm3-regional', moduleId: 'modulo3' },
  { id: 'm3-praticas', moduleId: 'modulo3' },
  { id: 'm3-quiz-final', moduleId: 'modulo3' }
];

async function main() {
  const flagPath = path.join(__dirname, '../prisma/fix_progress_v2_done.flag');
  
  if (fs.existsSync(flagPath)) {
    console.log('--- Script fix_progress_v2 já foi executado anteriormente. Pulando... ---');
    return;
  }

  console.log('--- Iniciando atualização de progresso para todos os usuários ---');
  
  // 1. Buscar todos os usuários
  const users = await prisma.user.findMany();
  
  console.log(`Encontrados ${users.length} usuários.`);
  
  let updatedCount = 0;
  let progressDeletedCount = 0;
  let progressInsertedCount = 0;

  for (const user of users) {
    // 2. Atualizar Educoins para 2780 para todos
    await prisma.user.update({
      where: { id: user.id },
      data: { educoins: 2780 }
    });
    updatedCount++;

    // 3. Deletar todos os progressos deste usuário
    const deleteResult = await prisma.userProgress.deleteMany({
      where: { userId: user.id }
    });
    progressDeletedCount += deleteResult.count;

    // 4. Inserir registros de progresso dos módulos 1, 2 e 3
    for (const node of OK_NODES) {
      await prisma.userProgress.create({
        data: {
          userId: user.id,
          moduleId: node.moduleId,
          nodeId: node.id
        }
      });
      progressInsertedCount++;
    }
  }

  console.log(`--- Atualização concluída ---`);
  console.log(`Usuários atualizados (Educoins para 2780): ${updatedCount}`);
  console.log(`Registros de progresso antigos deletados: ${progressDeletedCount}`);
  console.log(`Novos registros de progresso inseridos (etapas dos módulos 1 a 3): ${progressInsertedCount}`);

  // Criar o arquivo de flag para evitar re-execução
  fs.writeFileSync(flagPath, 'done', 'utf8');
  console.log(`Flag de execução única v2 criada em ${flagPath}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


