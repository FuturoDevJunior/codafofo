#!/bin/bash

# Script Ultra-Robusto para instalar todas as dependências do Vytalle
set -e

# Configurações
MAX_RETRIES=5
RETRY_DELAY=30
LOG_FILE="install-deps.log"

# Função de logging
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Função de retry
retry() {
    local max_attempts=$1
    local delay=$2
    local command="$3"
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        log "🔧 Tentativa $attempt de $max_attempts: $command"
        
        if eval "$command"; then
            log "✅ Comando executado com sucesso na tentativa $attempt"
            return 0
        else
            log "❌ Falha na tentativa $attempt"
            if [ $attempt -lt $max_attempts ]; then
                log "⏳ Aguardando ${delay}s antes da próxima tentativa..."
                sleep "$delay"
            fi
            attempt=$((attempt + 1))
        fi
    done
    
    log "❌ Todas as $max_attempts tentativas falharam"
    return 1
}

# Função de verificação de dependência
check_dependency() {
    local dep_name="$1"
    local check_command="$2"
    
    log "🔍 Verificando $dep_name..."
    if eval "$check_command" >/dev/null 2>&1; then
        log "✅ $dep_name encontrado"
        return 0
    else
        log "❌ $dep_name não encontrado"
        return 1
    fi
}

# Função de instalação de dependência
install_dependency() {
    local dep_name="$1"
    local install_command="$2"
    
    log "📦 Instalando $dep_name..."
    if retry "$MAX_RETRIES" "$RETRY_DELAY" "$install_command"; then
        log "✅ $dep_name instalado com sucesso"
        return 0
    else
        log "❌ Falha na instalação de $dep_name"
        return 1
    fi
}

# Início da instalação
log "🚀 Iniciando instalação ultra-robusta do Vytalle..."

# Verificar sistema
log "🔍 Verificando sistema..."
log "OS: $(uname -s)"
log "Architecture: $(uname -m)"
log "Node version: $(node --version 2>/dev/null || echo 'Node não encontrado')"
log "npm version: $(npm --version 2>/dev/null || echo 'npm não encontrado')"

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    log "❌ package.json não encontrado. Certifique-se de estar no diretório raiz do projeto."
    exit 1
fi

# Limpar cache do npm
log "🧹 Limpando cache do npm..."
retry "$MAX_RETRIES" "$RETRY_DELAY" "npm cache clean --force"

# Remover node_modules se existir
if [ -d "node_modules" ]; then
    log "🗑️ Removendo node_modules existente..."
    rm -rf node_modules
fi

# Remover package-lock.json se existir
if [ -f "package-lock.json" ]; then
    log "🗑️ Removendo package-lock.json existente..."
    rm package-lock.json
fi

# Instalar dependências principais
log "📦 Instalando dependências principais..."
if ! retry "$MAX_RETRIES" "$RETRY_DELAY" "npm install --prefer-offline --no-audit --no-fund"; then
    log "❌ Falha na instalação de dependências principais"
    exit 1
fi

# Verificar dependências críticas
log "🔍 Verificando dependências críticas..."

# Node.js
check_dependency "Node.js" "node --version" || {
    log "❌ Node.js não encontrado"
    exit 1
}

# npm
check_dependency "npm" "npm --version" || {
    log "❌ npm não encontrado"
    exit 1
}

# Next.js
check_dependency "Next.js" "npx next --version" || {
    log "⚠️ Next.js não encontrado, instalando..."
    install_dependency "Next.js" "npm install next@latest"
}

# TypeScript
check_dependency "TypeScript" "npx tsc --version" || {
    log "⚠️ TypeScript não encontrado, instalando..."
    install_dependency "TypeScript" "npm install typescript@latest --save-dev"
}

# Vitest
check_dependency "Vitest" "npx vitest --version" || {
    log "⚠️ Vitest não encontrado, instalando..."
    install_dependency "Vitest" "npm install vitest@latest @vitest/coverage-v8 --save-dev"
}

# Playwright
check_dependency "Playwright" "npx playwright --version" || {
    log "⚠️ Playwright não encontrado, instalando..."
    install_dependency "Playwright" "npm install @playwright/test@latest --save-dev"
    log "🎭 Instalando browsers do Playwright..."
    retry "$MAX_RETRIES" "$RETRY_DELAY" "npx playwright install --with-deps"
}

# Lighthouse
check_dependency "Lighthouse" "npx lighthouse --version" || {
    log "⚠️ Lighthouse não encontrado, instalando..."
    install_dependency "Lighthouse" "npm install lighthouse@latest --save-dev"
}

# @next/bundle-analyzer
check_dependency "@next/bundle-analyzer" "npm list @next/bundle-analyzer" || {
    log "⚠️ @next/bundle-analyzer não encontrado, instalando..."
    install_dependency "@next/bundle-analyzer" "npm install @next/bundle-analyzer@latest --save-dev"
}

# @types/react
check_dependency "@types/react" "npm list @types/react" || {
    log "⚠️ @types/react não encontrado, instalando..."
    install_dependency "@types/react" "npm install @types/react@latest @types/react-dom@latest --save-dev"
}

# ESLint
check_dependency "ESLint" "npx eslint --version" || {
    log "⚠️ ESLint não encontrado, instalando..."
    install_dependency "ESLint" "npm install eslint@latest eslint-config-next@latest --save-dev"
}

# Prettier
check_dependency "Prettier" "npx prettier --version" || {
    log "⚠️ Prettier não encontrado, instalando..."
    install_dependency "Prettier" "npm install prettier@latest --save-dev"
}

# Husky
check_dependency "Husky" "npx husky --version" || {
    log "⚠️ Husky não encontrado, instalando..."
    install_dependency "Husky" "npm install husky@latest --save-dev"
}

# Verificações adicionais
log "🔍 Verificações adicionais..."

# Verificar se o build funciona
log "🏗️ Testando build..."
if retry 3 30 "npm run build"; then
    log "✅ Build testado com sucesso"
else
    log "⚠️ Build falhou, mas continuando..."
fi

# Verificar se os testes funcionam
log "🧪 Testando testes unitários..."
if retry 3 30 "npm run test:ci -- --run"; then
    log "✅ Testes unitários funcionando"
else
    log "⚠️ Testes unitários falharam, mas continuando..."
fi

# Verificar se o lint funciona
log "🧹 Testando lint..."
if retry 3 10 "npm run lint"; then
    log "✅ Lint funcionando"
else
    log "⚠️ Lint falhou, mas continuando..."
fi

# Verificar se o type-check funciona
log "🔍 Testando type-check..."
if retry 3 10 "npm run type-check"; then
    log "✅ Type-check funcionando"
else
    log "⚠️ Type-check falhou, mas continuando..."
fi

# Limpeza final
log "🧹 Limpeza final..."
npm cache clean --force

# Relatório final
log "📊 Relatório final de instalação:"
log "✅ Node.js: $(node --version)"
log "✅ npm: $(npm --version)"
log "✅ Next.js: $(npx next --version 2>/dev/null || echo 'N/A')"
log "✅ TypeScript: $(npx tsc --version 2>/dev/null || echo 'N/A')"
log "✅ Vitest: $(npx vitest --version 2>/dev/null || echo 'N/A')"
log "✅ Playwright: $(npx playwright --version 2>/dev/null || echo 'N/A')"
log "✅ Lighthouse: $(npx lighthouse --version 2>/dev/null || echo 'N/A')"

log "🎉 Instalação ultra-robusta concluída com sucesso!"
log "🧪 Para executar testes: npm run test"
log "🎭 Para executar E2E: npm run test:e2e"
log "🔍 Para type-check: npm run type-check"
log "🏗️ Para build: npm run build"
log "🚀 Para desenvolvimento: npm run dev"

# Verificar se há warnings ou problemas
log "🔍 Verificando problemas potenciais..."
npm audit --audit-level=moderate || log "⚠️ Algumas vulnerabilidades encontradas"
npm outdated || log "ℹ️ Algumas dependências podem estar desatualizadas"

log "✅ Instalação concluída! Verifique o log em $LOG_FILE para detalhes." 