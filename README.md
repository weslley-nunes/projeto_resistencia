# Projeto Resistência - Documentação Oficial Mestre

## Arquitetura do Sistema
Este é um sistema E-learning educacional desenvolvido com:
- **Frontend**: Next.js 14+ (App Router), React, TailwindCSS, Lucide-React.
- **Backend**: Next.js API Routes.
- **Banco de Dados**: SQLite (persistente) controlado via **Prisma ORM**.
- **Autenticação**: NextAuth.js (Provider Google OAuth + Credenciais Locais).

## Configurações do Servidor de Produção (Coolify)
A aplicação está atualmente hospedada no **Coolify**.

### Variáveis de Ambiente Necessárias (Coolify)
Para o sistema funcionar perfeitamente em produção, a aba *Environment Variables* no servidor Coolify **deve** conter exatamente as chaves abaixo:
1. `NEXTAUTH_URL` -> Seu domínio oficial em https (ex: `https://projetoresistencia.com.br`)
2. `NEXTAUTH_SECRET` -> Uma string secreta e segura para encriptar os JWT cookies. Sem ela, o login do Google é abortado (*OAuthCallbackError*).
3. `GOOGLE_CLIENT_ID` -> Começa com números e termina em `apps.googleusercontent.com`.
4. `GOOGLE_CLIENT_SECRET` -> A senha associada ao Client ID. **Lembre-se:** o Google esconde essa chave após criada; caso perca, basta clicar em "+ Add Secret" no Google Cloud Console e copiar a nova.

### Banco de Dados (SQLite)
O banco de dados do sistema reside dentro do *container* Docker do Coolify, persistido por um volume em `/app/prisma/`.
Para preservar os alunos:
- O arquivo que armazena a vida do projeto se chama `dev.db`.
- **Nunca** use o comando `npx prisma db push --accept-data-loss` sem um backup. O script `npm start` padrão já cuida do `db push` de forma segura.
- A importação da carga massiva é gerenciada via arquivos `scripts/import_seed.js`, usando um arquivo de base `public/seed.json`.

## Rotinas de Backup Implementadas 🛡️

### 1. Rolling Backup Auxiliar Oculto (Automático)
- Existe um script rodando em segundo plano (`scripts/daily_backup.js`).
- Ele copia automaticamente o `dev.db` oficial de hora em hora caso o último backup tenha passado de 24h.
- Ele guarda essas cópias na pasta `prisma/backups/`.
- Ele limita os backups aos últimos 7 dias. Se houverem 8 cópias, ele exclui a mais antiga. Isso gasta quase zero armazenamento local.

### 2. Backup sob Demanda (Manual via Interface)
- Qualquer usuário logado que possua o cargo `ADMIN` (exemplo: `admin@sistema.local`) pode baixar instantaneamente uma cópia atualizada do `dev.db` usando o botão roxo **"Backup (.db)"** no painel Gestão.
- A rota associada a este download é o `GET /api/admin/backup`.

## Como Modificar o Sistema no Futuro (Para outra IA)
1. **Migrations / Banco de Dados**: A aplicação não está usando Prisma Migrate no modo rígido (`prisma migrate dev`). As mudanças estruturais estão sendo empurradas diretamente (`prisma db push`), por isso, trate o banco SQLite com cuidado. Sempre baixe uma cópia do arquivo `dev.db` antes de rodar `db push` caso mude colunas sensíveis da tabela de Usuários.
2. **Atualização**: Como a rotina de deploy roda NPM i / Webpack, eventuais dependências de upload (uploads de PDFs via `multer` ou Node fs) salvarão os arquivos no volume persistente (uma vez configurado). O Next.js roda no Host: `0.0.0.0` com base nos secrets.
3. Se algo em auth quebrar (Logins falharem num fluxo estranho), cheque IMEDIATAMENTE a ausência do `NEXTAUTH_SECRET` nas variáveis de ambiente.

**Fim.** Todas as missões de migração concluídas e lacradas.
