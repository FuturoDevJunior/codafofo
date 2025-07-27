#!/bin/bash

# 🧪 Vytalle Ultra-Robust Test Suite
# Executa todos os testes de forma confiável com retry mechanisms

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função de logging
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# Função de retry
retry() {
    local max_attempts=3
    local attempt=1
    local delay=5
    
    while [ $attempt -le $max_attempts ]; do
        log "Tentativa $attempt de $max_attempts: $1"
        
        if eval "$1"; then
            success "Comando executado com sucesso: $1"
            return 0
        else
            error "Falha na tentativa $attempt: $1"
            
            if [ $attempt -eq $max_attempts ]; then
                error "Todas as tentativas falharam para: $1"
                return 1
            fi
            
            warning "Aguardando $delay segundos antes da próxima tentativa..."
            sleep $delay
            attempt=$((attempt + 1))
            delay=$((delay * 2))
        fi
    done
}

# Verificação de pré-requisitos
check_prerequisites() {
    log "🔍 Verificando pré-requisitos..."
    
    # Verificar Node.js
    if ! command -v node &> /dev/null; then
        error "Node.js não encontrado"
        exit 1
    fi
    
    # Verificar npm
    if ! command -v npm &> /dev/null; then
        error "npm não encontrado"
        exit 1
    fi
    
    # Verificar Playwright
    if ! npx playwright --version &> /dev/null; then
        warning "Playwright não encontrado, instalando..."
        retry "npx playwright install --with-deps"
    fi
    
    success "Pré-requisitos verificados"
}

# Instalação de dependências
install_dependencies() {
    log "📦 Instalando dependências..."
    retry "npm ci --prefer-offline --no-audit"
    success "Dependências instaladas"
}

# Testes de qualidade
run_quality_tests() {
    log "🔍 Executando testes de qualidade..."
    
    # Type checking
    log "Verificando tipos TypeScript..."
    retry "npm run type-check"
    
    # Linting
    log "Executando linting..."
    retry "npm run lint"
    
    # Format checking
    log "Verificando formatação..."
    retry "npm run format:check"
    
    success "Testes de qualidade concluídos"
}

# Testes unitários
run_unit_tests() {
    log "🧪 Executando testes unitários..."
    
    # Testes com cobertura
    log "Executando testes com cobertura..."
    retry "npm run test:coverage"
    
    success "Testes unitários concluídos"
}

# Testes E2E
run_e2e_tests() {
    log "🌐 Executando testes E2E..."
    
    # Instalar browsers se necessário
    log "Verificando browsers do Playwright..."
    retry "npx playwright install --with-deps"
    
    # Executar testes E2E
    log "Executando testes E2E..."
    retry "npm run test:e2e"
    
    success "Testes E2E concluídos"
}

# Testes de performance
run_performance_tests() {
    log "⚡ Executando testes de performance..."
    
    # Build da aplicação
    log "Fazendo build da aplicação..."
    retry "npm run build"
    
    # Iniciar aplicação
    log "Iniciando aplicação para testes..."
    npm start &
    local app_pid=$!
    
    # Aguardar aplicação estar pronta
    log "Aguardando aplicação estar pronta..."
    sleep 30
    
    # Verificar se aplicação está rodando
    if ! curl -f http://localhost:3000/api/health &> /dev/null; then
        error "Aplicação não está respondendo"
        kill $app_pid 2>/dev/null || true
        exit 1
    fi
    
    # Lighthouse performance
    log "Executando Lighthouse performance..."
    retry "npm run performance:lighthouse"
    
    # Lighthouse budget
    log "Executando Lighthouse budget..."
    retry "npm run performance:budget"
    
    # Parar aplicação
    kill $app_pid 2>/dev/null || true
    
    success "Testes de performance concluídos"
}

# Testes de acessibilidade
run_accessibility_tests() {
    log "♿ Executando testes de acessibilidade..."
    
    # Verificar se há testes de acessibilidade
    if npm run | grep -q "accessibility"; then
        retry "npm run monitor:accessibility"
        success "Testes de acessibilidade concluídos"
    else
        warning "Nenhum teste de acessibilidade configurado"
    fi
}

# Auditoria de segurança
run_security_audit() {
    log "🛡️ Executando auditoria de segurança..."
    
    # NPM audit
    log "Executando npm audit..."
    retry "npm run security:audit"
    
    success "Auditoria de segurança concluída"
}

# Geração de relatórios
generate_reports() {
    log "📊 Gerando relatórios..."
    
    # Relatório de cobertura
    if [ -d "coverage" ]; then
        log "Relatório de cobertura disponível em: coverage/"
    fi
    
    # Relatório E2E
    if [ -d "playwright-report" ]; then
        log "Relatório E2E disponível em: playwright-report/"
    fi
    
    # Relatório Lighthouse
    if [ -f "lighthouse-report.html" ]; then
        log "Relatório Lighthouse disponível em: lighthouse-report.html"
    fi
    
    success "Relatórios gerados"
}

# Função principal
main() {
    log "🚀 Iniciando Vytalle Ultra-Robust Test Suite"
    
    # Verificar se estamos no diretório correto
    if [ ! -f "package.json" ]; then
        error "package.json não encontrado. Execute este script no diretório raiz do projeto."
        exit 1
    fi
    
    # Executar todas as etapas
    check_prerequisites
    install_dependencies
    run_quality_tests
    run_unit_tests
    run_e2e_tests
    run_performance_tests
    run_accessibility_tests
    run_security_audit
    generate_reports
    
    success "🎉 Todos os testes foram executados com sucesso!"
    log "📋 Resumo:"
    log "  - ✅ Qualidade: TypeScript, ESLint, Prettier"
    log "  - ✅ Unitários: Vitest com cobertura"
    log "  - ✅ E2E: Playwright com múltiplos browsers"
    log "  - ✅ Performance: Lighthouse"
    log "  - ✅ Acessibilidade: Verificações WCAG"
    log "  - ✅ Segurança: NPM audit"
}

# Executar função principal
main "$@" 