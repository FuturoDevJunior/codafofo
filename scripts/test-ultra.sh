#!/bin/bash

# Script Ultra-Robusto de Testes Vytalle
set -e

# Configurações
MAX_RETRIES=5
RETRY_DELAY=30
LOG_FILE="test-ultra.log"
REPORT_DIR="test-reports"
COVERAGE_DIR="coverage"
PERFORMANCE_URL="https://vytalle-estetica.vercel.app"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Função de logging
log() {
    echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Função de alerta
alert() {
    echo -e "${RED}[ALERTA]${NC} $1" | tee -a "$LOG_FILE"
}

# Função de sucesso
success() {
    echo -e "${GREEN}[SUCESSO]${NC} $1" | tee -a "$LOG_FILE"
}

# Função de warning
warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

# Função de info
info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"
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

# Função para verificar pré-requisitos
check_prerequisites() {
    info "🔍 Verificando pré-requisitos..."
    
    # Verificar se estamos no diretório correto
    if [ ! -f "package.json" ]; then
        alert "package.json não encontrado. Certifique-se de estar no diretório raiz do projeto."
        return 1
    fi
    
    # Verificar Node.js
    if ! command -v node >/dev/null 2>&1; then
        alert "Node.js não encontrado"
        return 1
    fi
    
    # Verificar npm
    if ! command -v npm >/dev/null 2>&1; then
        alert "npm não encontrado"
        return 1
    fi
    
    # Verificar dependências
    if [ ! -d "node_modules" ]; then
        warning "node_modules não encontrado, instalando dependências..."
        npm ci --prefer-offline --no-audit --no-fund
    fi
    
    # Verificar Playwright
    if ! npx playwright --version >/dev/null 2>&1; then
        warning "Playwright não encontrado, instalando..."
        npx playwright install --with-deps
    fi
    
    # Verificar Lighthouse
    if ! command -v lighthouse >/dev/null 2>&1; then
        warning "Lighthouse não encontrado, instalando..."
        npm install -g lighthouse
    fi
    
    success "Pré-requisitos verificados"
    return 0
}

# Função para criar diretórios de relatório
setup_report_directories() {
    info "📁 Criando diretórios de relatório..."
    
    mkdir -p "$REPORT_DIR"
    mkdir -p "$COVERAGE_DIR"
    mkdir -p "$REPORT_DIR/unit"
    mkdir -p "$REPORT_DIR/e2e"
    mkdir -p "$REPORT_DIR/performance"
    mkdir -p "$REPORT_DIR/accessibility"
    mkdir -p "$REPORT_DIR/security"
    
    success "Diretórios de relatório criados"
}

# Função para executar testes unitários
run_unit_tests() {
    info "🧪 Executando testes unitários..."
    
    local unit_report="$REPORT_DIR/unit/unit-test-report-$(date +%Y%m%d-%H%M%S).json"
    local coverage_report="$COVERAGE_DIR/coverage-unit-$(date +%Y%m%d-%H%M%S).json"
    
    # Executar testes unitários com cobertura
    if retry 3 60 "npm run test:ci -- --reporter=json --outputFile=$unit_report --coverage --coverageReporters=json --coverageReporters=text --coverageReporters=lcov --coverageDirectory=$COVERAGE_DIR"; then
        success "Testes unitários: OK"
        
        # Analisar relatório
        if [ -f "$unit_report" ]; then
            local total_tests=$(jq '.numTotalTests' "$unit_report" 2>/dev/null || echo "0")
            local passed_tests=$(jq '.numPassedTests' "$unit_report" 2>/dev/null || echo "0")
            local failed_tests=$(jq '.numFailedTests' "$unit_report" 2>/dev/null || echo "0")
            
            info "Total de testes: $total_tests"
            info "Testes aprovados: $passed_tests"
            info "Testes falharam: $failed_tests"
            
            if [ "$failed_tests" -gt 0 ]; then
                warning "⚠️ $failed_tests testes falharam"
                return 1
            fi
        fi
        
        return 0
    else
        alert "Testes unitários falharam"
        return 1
    fi
}

# Função para executar testes E2E
run_e2e_tests() {
    info "🧪 Executando testes E2E..."
    
    local e2e_report="$REPORT_DIR/e2e/e2e-test-report-$(date +%Y%m%d-%H%M%S).json"
    
    # Executar testes E2E
    if retry 3 120 "npx playwright test --reporter=json --output=$e2e_report"; then
        success "Testes E2E: OK"
        
        # Analisar relatório
        if [ -f "$e2e_report" ]; then
            local total_tests=$(jq '.stats.total' "$e2e_report" 2>/dev/null || echo "0")
            local passed_tests=$(jq '.stats.passed' "$e2e_report" 2>/dev/null || echo "0")
            local failed_tests=$(jq '.stats.failed' "$e2e_report" 2>/dev/null || echo "0")
            
            info "Total de testes E2E: $total_tests"
            info "Testes E2E aprovados: $passed_tests"
            info "Testes E2E falharam: $failed_tests"
            
            if [ "$failed_tests" -gt 0 ]; then
                warning "⚠️ $failed_tests testes E2E falharam"
                return 1
            fi
        fi
        
        return 0
    else
        alert "Testes E2E falharam"
        return 1
    fi
}

# Função para executar testes de performance
run_performance_tests() {
    info "⚡ Executando testes de performance..."
    
    local performance_report="$REPORT_DIR/performance/performance-report-$(date +%Y%m%d-%H%M%S).json"
    local lighthouse_html="$REPORT_DIR/performance/lighthouse-report-$(date +%Y%m%d-%H%M%S).html"
    
    # Executar Lighthouse
    if lighthouse "$PERFORMANCE_URL" --output=json --output-path="$performance_report" --output=html --output-path="$lighthouse_html" --chrome-flags="--headless --no-sandbox --disable-gpu" --only-categories=performance,accessibility,best-practices,seo; then
        success "Testes de performance: OK"
        
        # Analisar relatório
        if [ -f "$performance_report" ]; then
            if command -v jq >/dev/null 2>&1; then
                local performance_score=$(jq -r '.categories.performance.score' "$performance_report" 2>/dev/null)
                local accessibility_score=$(jq -r '.categories.accessibility.score' "$performance_report" 2>/dev/null)
                local best_practices_score=$(jq -r '.categories["best-practices"].score' "$performance_report" 2>/dev/null)
                local seo_score=$(jq -r '.categories.seo.score' "$performance_report" 2>/dev/null)
                
                info "Performance Score: ${performance_score:-N/A}"
                info "Accessibility Score: ${accessibility_score:-N/A}"
                info "Best Practices Score: ${best_practices_score:-N/A}"
                info "SEO Score: ${seo_score:-N/A}"
                
                # Verificar se os scores estão acima do mínimo
                local min_score=0.7
                if (( $(echo "${performance_score:-0} < $min_score" | bc -l) )); then
                    warning "⚠️ Performance score abaixo do mínimo ($min_score)"
                fi
                if (( $(echo "${accessibility_score:-0} < $min_score" | bc -l) )); then
                    warning "⚠️ Accessibility score abaixo do mínimo ($min_score)"
                fi
            fi
        fi
        
        return 0
    else
        alert "Testes de performance falharam"
        return 1
    fi
}

# Função para executar testes de acessibilidade
run_accessibility_tests() {
    info "♿ Executando testes de acessibilidade..."
    
    local accessibility_report="$REPORT_DIR/accessibility/accessibility-report-$(date +%Y%m%d-%H%M%S).json"
    
    # Executar testes de acessibilidade com Playwright
    if retry 3 60 "npx playwright test tests/e2e/accessibility.test.ts --reporter=json --output=$accessibility_report"; then
        success "Testes de acessibilidade: OK"
        
        # Analisar relatório
        if [ -f "$accessibility_report" ]; then
            local total_tests=$(jq '.stats.total' "$accessibility_report" 2>/dev/null || echo "0")
            local passed_tests=$(jq '.stats.passed' "$accessibility_report" 2>/dev/null || echo "0")
            local failed_tests=$(jq '.stats.failed' "$accessibility_report" 2>/dev/null || echo "0")
            
            info "Total de testes de acessibilidade: $total_tests"
            info "Testes de acessibilidade aprovados: $passed_tests"
            info "Testes de acessibilidade falharam: $failed_tests"
            
            if [ "$failed_tests" -gt 0 ]; then
                warning "⚠️ $failed_tests testes de acessibilidade falharam"
                return 1
            fi
        fi
        
        return 0
    else
        alert "Testes de acessibilidade falharam"
        return 1
    fi
}

# Função para executar testes de segurança
run_security_tests() {
    info "🛡️ Executando testes de segurança..."
    
    local security_report="$REPORT_DIR/security/security-report-$(date +%Y%m%d-%H%M%S).json"
    
    # Verificar vulnerabilidades npm
    if npm audit --audit-level=moderate --json > "$security_report" 2>/dev/null; then
        success "Auditoria de segurança: OK"
        
        # Analisar relatório
        if [ -f "$security_report" ]; then
            local vulnerabilities=$(jq '.metadata.vulnerabilities.total' "$security_report" 2>/dev/null || echo "0")
            local critical=$(jq '.metadata.vulnerabilities.critical' "$security_report" 2>/dev/null || echo "0")
            local high=$(jq '.metadata.vulnerabilities.high' "$security_report" 2>/dev/null || echo "0")
            local moderate=$(jq '.metadata.vulnerabilities.moderate' "$security_report" 2>/dev/null || echo "0")
            
            info "Total de vulnerabilidades: $vulnerabilities"
            info "Críticas: $critical"
            info "Altas: $high"
            info "Moderadas: $moderate"
            
            if [ "$critical" -gt 0 ] || [ "$high" -gt 0 ]; then
                alert "⚠️ Vulnerabilidades críticas ou altas encontradas"
                return 1
            elif [ "$moderate" -gt 0 ]; then
                warning "⚠️ Vulnerabilidades moderadas encontradas"
            fi
        fi
        
        return 0
    else
        alert "Auditoria de segurança falhou"
        return 1
    fi
}

# Função para executar lint
run_lint() {
    info "🔍 Executando lint..."
    
    local lint_report="$REPORT_DIR/lint-report-$(date +%Y%m%d-%H%M%S).json"
    
    # Executar ESLint
    if retry 3 30 "npm run lint -- --format=json --output-file=$lint_report"; then
        success "Lint: OK"
        
        # Analisar relatório
        if [ -f "$lint_report" ]; then
            local total_errors=$(jq '.[] | .errorCount' "$lint_report" 2>/dev/null | awk '{sum+=$1} END {print sum+0}')
            local total_warnings=$(jq '.[] | .warningCount' "$lint_report" 2>/dev/null | awk '{sum+=$1} END {print sum+0}')
            
            info "Total de erros: $total_errors"
            info "Total de warnings: $total_warnings"
            
            if [ "$total_errors" -gt 0 ]; then
                warning "⚠️ $total_errors erros de lint encontrados"
                return 1
            fi
        fi
        
        return 0
    else
        alert "Lint falhou"
        return 1
    fi
}

# Função para executar type check
run_type_check() {
    info "🔍 Executando type check..."
    
    local type_check_report="$REPORT_DIR/type-check-report-$(date +%Y%m%d-%H%M%S).txt"
    
    # Executar TypeScript check
    if retry 3 30 "npm run type-check > $type_check_report 2>&1"; then
        success "Type check: OK"
        return 0
    else
        alert "Type check falhou"
        
        # Mostrar erros
        if [ -f "$type_check_report" ]; then
            log "Erros de TypeScript:"
            cat "$type_check_report"
        fi
        
        return 1
    fi
}

# Função para analisar cobertura
analyze_coverage() {
    info "📊 Analisando cobertura de código..."
    
    local coverage_summary="$COVERAGE_DIR/coverage-summary-$(date +%Y%m%d-%H%M%S).json"
    
    # Gerar relatório de cobertura
    if [ -f "$COVERAGE_DIR/coverage-final.json" ]; then
        # Analisar cobertura
        local total_statements=$(jq '.total.statements.pct' "$COVERAGE_DIR/coverage-final.json" 2>/dev/null || echo "0")
        local total_branches=$(jq '.total.branches.pct' "$COVERAGE_DIR/coverage-final.json" 2>/dev/null || echo "0")
        local total_functions=$(jq '.total.functions.pct' "$COVERAGE_DIR/coverage-final.json" 2>/dev/null || echo "0")
        local total_lines=$(jq '.total.lines.pct' "$COVERAGE_DIR/coverage-final.json" 2>/dev/null || echo "0")
        
        info "Cobertura de statements: ${total_statements}%"
        info "Cobertura de branches: ${total_branches}%"
        info "Cobertura de functions: ${total_functions}%"
        info "Cobertura de lines: ${total_lines}%"
        
        # Verificar se a cobertura está acima do mínimo
        local min_coverage=70
        if (( $(echo "$total_statements < $min_coverage" | bc -l) )); then
            warning "⚠️ Cobertura de statements abaixo do mínimo ($min_coverage%)"
        fi
        if (( $(echo "$total_branches < $min_coverage" | bc -l) )); then
            warning "⚠️ Cobertura de branches abaixo do mínimo ($min_coverage%)"
        fi
        if (( $(echo "$total_functions < $min_coverage" | bc -l) )); then
            warning "⚠️ Cobertura de functions abaixo do mínimo ($min_coverage%)"
        fi
        if (( $(echo "$total_lines < $min_coverage" | bc -l) )); then
            warning "⚠️ Cobertura de lines abaixo do mínimo ($min_coverage%)"
        fi
        
        success "Análise de cobertura concluída"
        return 0
    else
        warning "Relatório de cobertura não encontrado"
        return 1
    fi
}

# Função para gerar relatório final
generate_final_report() {
    info "📋 Gerando relatório final..."
    
    local final_report="$REPORT_DIR/final-test-report-$(date +%Y%m%d-%H%M%S).md"
    
    cat > "$final_report" << EOF
# 🧪 Relatório Final de Testes Vytalle - $(date '+%Y-%m-%d %H:%M:%S')

## 📋 Resumo Executivo

### Informações dos Testes
- **Data/Hora**: $(date '+%Y-%m-%d %H:%M:%S')
- **Commit**: $(git rev-parse HEAD 2>/dev/null || echo "N/A")
- **Branch**: $(git branch --show-current 2>/dev/null || echo "N/A")
- **Node.js Version**: $(node --version)
- **npm Version**: $(npm --version)

### Status dos Testes
- **Pré-requisitos**: ✅ Verificados
- **Testes Unitários**: ✅ Executados
- **Testes E2E**: ✅ Executados
- **Testes de Performance**: ✅ Executados
- **Testes de Acessibilidade**: ✅ Executados
- **Testes de Segurança**: ✅ Executados
- **Lint**: ✅ Executado
- **Type Check**: ✅ Executado
- **Análise de Cobertura**: ✅ Executada

## 📊 Métricas Detalhadas

### Testes Unitários
$(unit_files=$(find "$REPORT_DIR/unit" -name "*.json" 2>/dev/null | head -1)
if [ -n "$unit_files" ] && [ -f "$unit_files" ]; then
    echo "- **Total de Testes**: $(jq '.numTotalTests' "$unit_files" 2>/dev/null || echo "N/A")"
    echo "- **Testes Aprovados**: $(jq '.numPassedTests' "$unit_files" 2>/dev/null || echo "N/A")"
    echo "- **Testes Falharam**: $(jq '.numFailedTests' "$unit_files" 2>/dev/null || echo "N/A")"
    echo "- **Tempo de Execução**: $(jq '.testResults[0].endTime - .testResults[0].startTime' "$unit_files" 2>/dev/null || echo "N/A")ms"
else
    echo "- **Status**: Relatório não disponível"
fi)

### Testes E2E
$(e2e_files=$(find "$REPORT_DIR/e2e" -name "*.json" 2>/dev/null | head -1)
if [ -n "$e2e_files" ] && [ -f "$e2e_files" ]; then
    echo "- **Total de Testes**: $(jq '.stats.total' "$e2e_files" 2>/dev/null || echo "N/A")"
    echo "- **Testes Aprovados**: $(jq '.stats.passed' "$e2e_files" 2>/dev/null || echo "N/A")"
    echo "- **Testes Falharam**: $(jq '.stats.failed' "$e2e_files" 2>/dev/null || echo "N/A")"
    echo "- **Tempo de Execução**: $(jq '.stats.duration' "$e2e_files" 2>/dev/null || echo "N/A")ms"
else
    echo "- **Status**: Relatório não disponível"
fi)

### Performance (Lighthouse)
$(perf_files=$(find "$REPORT_DIR/performance" -name "*.json" 2>/dev/null | head -1)
if [ -n "$perf_files" ] && [ -f "$perf_files" ]; then
    echo "- **Performance Score**: $(jq -r '.categories.performance.score // "N/A"' "$perf_files" | awk '{print $1 * 100 "%"}')"
    echo "- **Accessibility Score**: $(jq -r '.categories.accessibility.score // "N/A"' "$perf_files" | awk '{print $1 * 100 "%"}')"
    echo "- **Best Practices Score**: $(jq -r '.categories["best-practices"].score // "N/A"' "$perf_files" | awk '{print $1 * 100 "%"}')"
    echo "- **SEO Score**: $(jq -r '.categories.seo.score // "N/A"' "$perf_files" | awk '{print $1 * 100 "%"}')"
else
    echo "- **Status**: Relatório não disponível"
fi)

### Cobertura de Código
$(if [ -f "$COVERAGE_DIR/coverage-final.json" ]; then
    echo "- **Statements**: $(jq '.total.statements.pct' "$COVERAGE_DIR/coverage-final.json" 2>/dev/null || echo "N/A")%"
    echo "- **Branches**: $(jq '.total.branches.pct' "$COVERAGE_DIR/coverage-final.json" 2>/dev/null || echo "N/A")%"
    echo "- **Functions**: $(jq '.total.functions.pct' "$COVERAGE_DIR/coverage-final.json" 2>/dev/null || echo "N/A")%"
    echo "- **Lines**: $(jq '.total.lines.pct' "$COVERAGE_DIR/coverage-final.json" 2>/dev/null || echo "N/A")%"
else
    echo "- **Status**: Relatório não disponível"
fi)

### Segurança
$(sec_files=$(find "$REPORT_DIR/security" -name "*.json" 2>/dev/null | head -1)
if [ -n "$sec_files" ] && [ -f "$sec_files" ]; then
    echo "- **Total de Vulnerabilidades**: $(jq '.metadata.vulnerabilities.total' "$sec_files" 2>/dev/null || echo "N/A")"
    echo "- **Críticas**: $(jq '.metadata.vulnerabilities.critical' "$sec_files" 2>/dev/null || echo "N/A")"
    echo "- **Altas**: $(jq '.metadata.vulnerabilities.high' "$sec_files" 2>/dev/null || echo "N/A")"
    echo "- **Moderadas**: $(jq '.metadata.vulnerabilities.moderate' "$sec_files" 2>/dev/null || echo "N/A")"
else
    echo "- **Status**: Relatório não disponível"
fi)

## 📈 Logs

\`\`\`
$(tail -50 "$LOG_FILE" 2>/dev/null || echo "Log não disponível")
\`\`\`

## 📁 Arquivos de Relatório

- **Testes Unitários**: $REPORT_DIR/unit/
- **Testes E2E**: $REPORT_DIR/e2e/
- **Performance**: $REPORT_DIR/performance/
- **Acessibilidade**: $REPORT_DIR/accessibility/
- **Segurança**: $REPORT_DIR/security/
- **Cobertura**: $COVERAGE_DIR/

## 🎯 Recomendações

$(if [ -f "$COVERAGE_DIR/coverage-final.json" ]; then
    local total_lines=$(jq '.total.lines.pct' "$COVERAGE_DIR/coverage-final.json" 2>/dev/null || echo "0")
    if (( $(echo "$total_lines < 80" | bc -l) )); then
        echo "- **Cobertura**: Considere aumentar a cobertura de testes para pelo menos 80%"
    fi
fi)

$(sec_files=$(find "$REPORT_DIR/security" -name "*.json" 2>/dev/null | head -1)
if [ -n "$sec_files" ] && [ -f "$sec_files" ]; then
    local critical=$(jq '.metadata.vulnerabilities.critical' "$sec_files" 2>/dev/null || echo "0")
    local high=$(jq '.metadata.vulnerabilities.high' "$sec_files" 2>/dev/null || echo "0")
    if [ "$critical" -gt 0 ] || [ "$high" -gt 0 ]; then
        echo "- **Segurança**: Resolva vulnerabilidades críticas e altas imediatamente"
    fi
fi)

$(perf_files=$(find "$REPORT_DIR/performance" -name "*.json" 2>/dev/null | head -1)
if [ -n "$perf_files" ] && [ -f "$perf_files" ]; then
    local perf_score=$(jq -r '.categories.performance.score // "0"' "$perf_files")
    if (( $(echo "$perf_score < 0.8" | bc -l) )); then
        echo "- **Performance**: Otimize a performance da aplicação"
    fi
fi)

---

**Relatório gerado automaticamente pelo sistema de testes Vytalle**
EOF

    success "Relatório final salvo em $final_report"
}

# Função para limpeza
cleanup() {
    info "🧹 Executando limpeza..."
    
    # Limpar relatórios antigos (manter apenas os últimos 10)
    for dir in unit e2e performance accessibility security; do
        if [ -d "$REPORT_DIR/$dir" ]; then
            cd "$REPORT_DIR/$dir"
            ls -t | tail -n +11 | xargs -r rm -rf
            cd ../..
        fi
    done
    
    # Limpar cobertura antiga (manter apenas os últimos 5)
    if [ -d "$COVERAGE_DIR" ]; then
        cd "$COVERAGE_DIR"
        ls -t | tail -n +6 | xargs -r rm -rf
        cd ..
    fi
    
    success "Limpeza concluída"
}

# Função principal
main() {
    local start_time=$(date +%s)
    local all_tests_passed=true
    
    log "🧪 Iniciando testes ultra-robustos do Vytalle..."
    
    # Verificar pré-requisitos
    if ! check_prerequisites; then
        alert "❌ Pré-requisitos não atendidos"
        exit 1
    fi
    
    # Criar diretórios de relatório
    setup_report_directories
    
    # Executar testes unitários
    if ! run_unit_tests; then
        all_tests_passed=false
    fi
    
    # Executar lint
    if ! run_lint; then
        all_tests_passed=false
    fi
    
    # Executar type check
    if ! run_type_check; then
        all_tests_passed=false
    fi
    
    # Executar testes E2E
    if ! run_e2e_tests; then
        all_tests_passed=false
    fi
    
    # Executar testes de performance
    if ! run_performance_tests; then
        all_tests_passed=false
    fi
    
    # Executar testes de acessibilidade
    if ! run_accessibility_tests; then
        all_tests_passed=false
    fi
    
    # Executar testes de segurança
    if ! run_security_tests; then
        all_tests_passed=false
    fi
    
    # Analisar cobertura
    analyze_coverage
    
    # Gerar relatório final
    generate_final_report
    
    # Limpeza
    cleanup
    
    # Tempo total
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    local minutes=$((duration / 60))
    local seconds=$((duration % 60))
    
    if [ "$all_tests_passed" = true ]; then
        success "🎉 Todos os testes passaram em ${minutes}m ${seconds}s!"
        exit 0
    else
        alert "❌ Alguns testes falharam em ${minutes}m ${seconds}s"
        exit 1
    fi
}

# Executar função principal
main "$@" 