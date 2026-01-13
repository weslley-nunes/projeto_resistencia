#!/bin/bash

# Parar o script se der erro
set -e

echo "🚀 Iniciando Deploy Automático..."

echo "📥 Baixando atualizações..."
git pull

echo "📦 Instalando dependências..."
npm install

echo "🗄️ Atualizando Banco de Dados..."
npx prisma migrate deploy

echo "🔄 Gerando Cliente do Banco..."
npx prisma generate

echo "🏗️ Construindo Aplicação..."
# Aumentar memória para o build se necessário
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

echo "🔄 Reiniciando Servidor..."
pm2 restart resistencia

echo "✅ SUCESSO! O site foi atualizado."
