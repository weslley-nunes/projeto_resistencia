const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

const OK_NODES = [
  'etapa1-1',
  'etapa1-2',
  'etapa1-3'
];

async function main() {
  const flagPath = path.join(__dirname, '../prisma/fix_progress_done.flag');
  
  if (fs.existsSync(flagPath)) {
    console.log('--- Script fix_progress já foi executado anteriormente. Pulando... ---');
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

    // 4. Inserir registros de progresso apenas até a etapa 3
    for (const nodeId of OK_NODES) {
      await prisma.userProgress.create({
        data: {
          userId: user.id,
          moduleId: 'modulo1',
          nodeId: nodeId
        }
      });
      progressInsertedCount++;
    }
  }

  console.log(`--- Atualização concluída ---`);
  console.log(`Usuários atualizados (Educoins para 2780): ${updatedCount}`);
  console.log(`Registros de progresso antigos deletados: ${progressDeletedCount}`);
  console.log(`Novos registros de progresso inseridos (etapas 1 a 3): ${progressInsertedCount}`);

  // Criar o arquivo de flag para evitar re-execução
  fs.writeFileSync(flagPath, 'done', 'utf8');
  console.log(`Flag de execução única criada em ${flagPath}`);
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

