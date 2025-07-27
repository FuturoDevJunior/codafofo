#!/bin/bash

# Script para instalar todas as dependências corretamente
set -e

echo "🔧 Instalando dependências do Vytalle..."

# Limpar cache do npm
echo "🧹 Limpando cache do npm..."
npm cache clean --force

# Remover node_modules se existir
if [ -d "node_modules" ]; then
    echo "🗑️ Removendo node_modules existente..."
    rm -rf node_modules
fi

# Remover package-lock.json se existir
if [ -f "package-lock.json" ]; then
    echo "🗑️ Removendo package-lock.json existente..."
    rm package-lock.json
fi

# Instalar dependências com todas as flags necessárias
echo "📦 Instalando dependências..."
npm install --prefer-offline --no-audit --no-fund

# Verificar se vitest está instalado
echo "🧪 Verificando instalação do Vitest..."
if ! command -v npx vitest &> /dev/null; then
    echo "❌ Vitest não encontrado, reinstalando..."
    npm install vitest @vitest/coverage-v8 --save-dev
fi

# Verificar se playwright está instalado
echo "🎭 Verificando instalação do Playwright..."
if ! command -v npx playwright &> /dev/null; then
    echo "❌ Playwright não encontrado, reinstalando..."
    npm install @playwright/test --save-dev
    npx playwright install
fi

# Verificar se @next/bundle-analyzer está instalado
echo "📊 Verificando instalação do @next/bundle-analyzer..."
if ! npm list @next/bundle-analyzer &> /dev/null; then
    echo "❌ @next/bundle-analyzer não encontrado, reinstalando..."
    npm install @next/bundle-analyzer --save-dev
fi

# Verificar se @types/react está instalado
echo "⚛️ Verificando instalação do @types/react..."
if ! npm list @types/react &> /dev/null; then
    echo "❌ @types/react não encontrado, reinstalando..."
    npm install @types/react @types/react-dom --save-dev
fi

echo "✅ Instalação concluída com sucesso!"
echo "🧪 Para executar testes: npm run test"
echo "🎭 Para executar E2E: npm run test:e2e"
echo "🔍 Para type-check: npm run type-check" 