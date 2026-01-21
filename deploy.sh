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
ls -la .env
if [ -f .env ]; then
    echo "✅ .env encontrado."
    grep "GOOGLE_CLIENT_ID" .env && echo "✅ GOOGLE_CLIENT_ID presente no .env" || echo "❌ GOOGLE_CLIENT_ID AUSENTE no .env"
    grep "DATABASE_URL" .env && echo "✅ DATABASE_URL presente no .env" || echo "❌ DATABASE_URL AUSENTE no .env"
else
    echo "❌ ARQUIVO .ENV NÃO ENCONTRADO!"
fi
grep -C 2 "Editais" app/page.tsx || echo "❌ ALERTA: Texto 'Editais' NÃO ENCONTRADO no arquivo!"

# Gerar arquivo de versão para debug
echo "Build Timestamp: $(date)" > public/version.txt
git rev-parse HEAD >> public/version.txt
echo "📄 Arquivo de versão gerado em public/version.txt"

echo "🏗️ Construindo Aplicação..."
# Limpar build anterior para evitar cache
rm -rf .next

# Aumentar memória para o build se necessário
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

echo "🔄 Reiniciando Servidor (Hard Reset)..."
pm2 delete resistencia || true
pm2 start npm --name "resistencia" -- start

echo "✅ SUCESSO! O site foi atualizado."
