#!/bin/bash

# Parar o script se der erro
set -e

echo "🚀 Iniciando Deploy Automático..."

# Carregar variáveis de ambiente (NVM/Node)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

echo "📥 Baixando atualizações..."
echo "📥 Baixando atualizações..."
git pull

echo "👀 Verificando conteúdo do arquivo (Debug)..."
pwd
grep -C 2 "Editais" app/page.tsx || echo "❌ ALERTA: Texto 'Editais' NÃO ENCONTRADO no arquivo!"

echo "📦 Instalando dependências..."
npm install

echo "🗄️ Atualizando Banco de Dados..."
npx prisma db push --accept-data-loss

echo "🔄 Gerando Cliente do Banco..."
npx prisma generate

echo "🏗️ Construindo Aplicação..."
# Aumentar memória para o build se necessário
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

echo "🔄 Reiniciando Servidor..."
pm2 describe resistencia
pm2 restart resistencia

echo "✅ SUCESSO! O site foi atualizado."
