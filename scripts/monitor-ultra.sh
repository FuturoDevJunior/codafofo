#!/bin/bash

# Script Ultra-Robusto de Monitoramento Vytalle
set -e

# Configurações
MAX_RETRIES=5
RETRY_DELAY=30
LOG_FILE="monitor-ultra.log"
ALERT_FILE="alerts.log"
METRICS_FILE="metrics.json"
HEALTH_URL="https://vytalle-estetica.vercel.app/api/health"
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
    echo -e "${RED}[ALERTA]${NC} $1" | tee -a "$ALERT_FILE"
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

# Função para verificar conectividade
check_connectivity() {
    info "🔍 Verificando conectividade..."
    
    # Verificar conectividade básica
    if ping -c 3 8.8.8.8 >/dev/null 2>&1; then
        success "Conectividade básica: OK"
    else
        alert "Conectividade básica: FALHA"
        return 1
    fi
    
    # Verificar DNS
    if nslookup vytalle-estetica.vercel.app >/dev/null 2>&1; then
        success "DNS: OK"
    else
        alert "DNS: FALHA"
        return 1
    fi
    
    return 0
}

# Função para verificar health check
check_health() {
    info "🏥 Verificando health check..."
    
    local response
    local status_code
    
    if response=$(curl -s -w "%{http_code}" -o /tmp/health_response.json "$HEALTH_URL" 2>/dev/null); then
        status_code="${response: -3}"
        response_body="${response%???}"
        
        if [ "$status_code" = "200" ]; then
            success "Health check: OK (HTTP $status_code)"
            
            # Analisar resposta JSON
            if command -v jq >/dev/null 2>&1; then
                local status=$(jq -r '.status' /tmp/health_response.json 2>/dev/null)
                local message=$(jq -r '.message' /tmp/health_response.json 2>/dev/null)
                local uptime=$(jq -r '.uptime' /tmp/health_response.json 2>/dev/null)
                
                info "Status: $status"
                info "Message: $message"
                info "Uptime: $uptime"
                
                # Verificar checks individuais
                local checks=$(jq -r '.checks[] | "\(.name):\(.status)"' /tmp/health_response.json 2>/dev/null)
                while IFS=: read -r check_name check_status; do
                    if [ "$check_status" = "healthy" ]; then
                        success "  ✓ $check_name: $check_status"
                    elif [ "$check_status" = "degraded" ]; then
                        warning "  ⚠ $check_name: $check_status"
                    else
                        alert "  ✗ $check_name: $check_status"
                    fi
                done <<< "$checks"
            fi
            
            return 0
        else
            alert "Health check: FALHA (HTTP $status_code)"
            return 1
        fi
    else
        alert "Health check: FALHA (conexão)"
        return 1
    fi
}

# Função para verificar performance
check_performance() {
    info "⚡ Verificando performance..."
    
    # Verificar tempo de resposta
    local start_time=$(date +%s.%N)
    if curl -s -o /dev/null "$PERFORMANCE_URL"; then
        local end_time=$(date +%s.%N)
        local response_time=$(echo "$end_time - $start_time" | bc -l 2>/dev/null || echo "0")
        
        if (( $(echo "$response_time < 2.0" | bc -l) )); then
            success "Tempo de resposta: ${response_time}s (EXCELENTE)"
        elif (( $(echo "$response_time < 5.0" | bc -l) )); then
            warning "Tempo de resposta: ${response_time}s (BOM)"
        else
            alert "Tempo de resposta: ${response_time}s (LENTO)"
        fi
    else
        alert "Falha ao medir tempo de resposta"
        return 1
    fi
    
    # Verificar se lighthouse está disponível
    if command -v lighthouse >/dev/null 2>&1; then
        info "🔍 Executando análise Lighthouse..."
        if lighthouse "$PERFORMANCE_URL" --output=json --output-path=/tmp/lighthouse-report.json --chrome-flags="--headless --no-sandbox --disable-gpu" --only-categories=performance >/dev/null 2>&1; then
            if command -v jq >/dev/null 2>&1; then
                local performance_score=$(jq -r '.categories.performance.score' /tmp/lighthouse-report.json 2>/dev/null)
                if [ "$performance_score" != "null" ]; then
                    local score_percent=$(echo "$performance_score * 100" | bc -l | cut -d. -f1)
                    if [ "$score_percent" -ge 90 ]; then
                        success "Lighthouse Performance Score: ${score_percent}% (EXCELENTE)"
                    elif [ "$score_percent" -ge 70 ]; then
                        warning "Lighthouse Performance Score: ${score_percent}% (BOM)"
                    else
                        alert "Lighthouse Performance Score: ${score_percent}% (PRECISA MELHORAR)"
                    fi
                fi
            fi
        else
            warning "Lighthouse não conseguiu executar"
        fi
    else
        info "Lighthouse não disponível, pulando análise de performance"
    fi
    
    return 0
}

# Função para verificar segurança
check_security() {
    info "🛡️ Verificando segurança..."
    
    # Verificar HTTPS
    if curl -s -I "$PERFORMANCE_URL" | grep -q "https"; then
        success "HTTPS: OK"
    else
        alert "HTTPS: FALHA"
        return 1
    fi
    
    # Verificar headers de segurança
    local security_headers=$(curl -s -I "$PERFORMANCE_URL" 2>/dev/null)
    
    if echo "$security_headers" | grep -q "X-Frame-Options"; then
        success "X-Frame-Options: OK"
    else
        warning "X-Frame-Options: AUSENTE"
    fi
    
    if echo "$security_headers" | grep -q "X-Content-Type-Options"; then
        success "X-Content-Type-Options: OK"
    else
        warning "X-Content-Type-Options: AUSENTE"
    fi
    
    if echo "$security_headers" | grep -q "X-XSS-Protection"; then
        success "X-XSS-Protection: OK"
    else
        warning "X-XSS-Protection: AUSENTE"
    fi
    
    if echo "$security_headers" | grep -q "Strict-Transport-Security"; then
        success "HSTS: OK"
    else
        warning "HSTS: AUSENTE"
    fi
    
    return 0
}

# Função para verificar funcionalidades
check_functionality() {
    info "🔧 Verificando funcionalidades..."
    
    # Verificar página inicial
    if curl -s "$PERFORMANCE_URL" | grep -q "Vytalle"; then
        success "Página inicial: OK"
    else
        alert "Página inicial: FALHA"
        return 1
    fi
    
    # Verificar produtos
    if curl -s "$PERFORMANCE_URL/products" | grep -q "produtos"; then
        success "Página de produtos: OK"
    else
        warning "Página de produtos: POSSÍVEL PROBLEMA"
    fi
    
    # Verificar carrinho
    if curl -s "$PERFORMANCE_URL/cart" | grep -q "carrinho"; then
        success "Página do carrinho: OK"
    else
        warning "Página do carrinho: POSSÍVEL PROBLEMA"
    fi
    
    return 0
}

# Função para coletar métricas do sistema
collect_system_metrics() {
    info "📊 Coletando métricas do sistema..."
    
    local metrics="{}"
    
    # CPU
    if command -v top >/dev/null 2>&1; then
        local cpu_usage=$(top -l 1 | grep "CPU usage" | awk '{print $3}' | sed 's/%//')
        metrics=$(echo "$metrics" | jq --arg cpu "$cpu_usage" '.cpu_usage = $cpu' 2>/dev/null || echo "$metrics")
    fi
    
    # Memória
    if command -v vm_stat >/dev/null 2>&1; then
        local mem_info=$(vm_stat | grep "Pages free" | awk '{print $3}' | sed 's/\.//')
        local mem_total=$(sysctl hw.memsize | awk '{print $2}')
        local mem_free=$((mem_info * 4096))
        local mem_used=$((mem_total - mem_free))
        local mem_percent=$((mem_used * 100 / mem_total))
        
        metrics=$(echo "$metrics" | jq --arg mem "$mem_percent" '.memory_usage = $mem' 2>/dev/null || echo "$metrics")
    fi
    
    # Disco
    if command -v df >/dev/null 2>&1; then
        local disk_usage=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
        metrics=$(echo "$metrics" | jq --arg disk "$disk_usage" '.disk_usage = $disk' 2>/dev/null || echo "$metrics")
    fi
    
    # Rede
    if command -v netstat >/dev/null 2>&1; then
        local connections=$(netstat -an | grep ESTABLISHED | wc -l)
        metrics=$(echo "$metrics" | jq --arg conn "$connections" '.active_connections = $conn' 2>/dev/null || echo "$metrics")
    fi
    
    # Salvar métricas
    echo "$metrics" > "$METRICS_FILE"
    success "Métricas salvas em $METRICS_FILE"
}

# Função para gerar relatório
generate_report() {
    info "📋 Gerando relatório..."
    
    local report_file="monitor-report-$(date +%Y%m%d-%H%M%S).md"
    
    cat > "$report_file" << EOF
# 📊 Relatório de Monitoramento Vytalle - $(date '+%Y-%m-%d %H:%M:%S')

## 🔍 Resumo Executivo

### Status Geral
- **Data/Hora**: $(date '+%Y-%m-%d %H:%M:%S')
- **URL**: $PERFORMANCE_URL
- **Health Check**: $HEALTH_URL

### Métricas Principais
$(if [ -f "$METRICS_FILE" ]; then
    echo "- **CPU**: $(jq -r '.cpu_usage // "N/A"' "$METRICS_FILE")%"
    echo "- **Memória**: $(jq -r '.memory_usage // "N/A"' "$METRICS_FILE")%"
    echo "- **Disco**: $(jq -r '.disk_usage // "N/A"' "$METRICS_FILE")%"
    echo "- **Conexões**: $(jq -r '.active_connections // "N/A"' "$METRICS_FILE")"
fi)

## 🏥 Health Check

$(if [ -f /tmp/health_response.json ]; then
    echo "- **Status**: $(jq -r '.status // "N/A"' /tmp/health_response.json)"
    echo "- **Message**: $(jq -r '.message // "N/A"' /tmp/health_response.json)"
    echo "- **Uptime**: $(jq -r '.uptime // "N/A"' /tmp/health_response.json)"
    echo ""
    echo "### Checks Individuais"
    jq -r '.checks[] | "- **\(.name)**: \(.status) - \(.message)"' /tmp/health_response.json 2>/dev/null || echo "- Nenhum check disponível"
fi)

## ⚡ Performance

$(if [ -f /tmp/lighthouse-report.json ]; then
    echo "- **Performance Score**: $(jq -r '.categories.performance.score // "N/A"' /tmp/lighthouse-report.json | awk '{print $1 * 100 "%"}')"
    echo "- **First Contentful Paint**: $(jq -r '.audits["first-contentful-paint"].displayValue // "N/A"' /tmp/lighthouse-report.json)"
    echo "- **Largest Contentful Paint**: $(jq -r '.audits["largest-contentful-paint"].displayValue // "N/A"' /tmp/lighthouse-report.json)"
    echo "- **Cumulative Layout Shift**: $(jq -r '.audits["cumulative-layout-shift"].displayValue // "N/A"' /tmp/lighthouse-report.json)"
fi)

## 🛡️ Segurança

- **HTTPS**: $(if curl -s -I "$PERFORMANCE_URL" | grep -q "https"; then echo "✅ OK"; else echo "❌ FALHA"; fi)
- **X-Frame-Options**: $(if curl -s -I "$PERFORMANCE_URL" | grep -q "X-Frame-Options"; then echo "✅ OK"; else echo "⚠️ AUSENTE"; fi)
- **X-Content-Type-Options**: $(if curl -s -I "$PERFORMANCE_URL" | grep -q "X-Content-Type-Options"; then echo "✅ OK"; else echo "⚠️ AUSENTE"; fi)
- **X-XSS-Protection**: $(if curl -s -I "$PERFORMANCE_URL" | grep -q "X-XSS-Protection"; then echo "✅ OK"; else echo "⚠️ AUSENTE"; fi)
- **HSTS**: $(if curl -s -I "$PERFORMANCE_URL" | grep -q "Strict-Transport-Security"; then echo "✅ OK"; else echo "⚠️ AUSENTE"; fi)

## 🔧 Funcionalidades

- **Página Inicial**: $(if curl -s "$PERFORMANCE_URL" | grep -q "Vytalle"; then echo "✅ OK"; else echo "❌ FALHA"; fi)
- **Página de Produtos**: $(if curl -s "$PERFORMANCE_URL/products" | grep -q "produtos"; then echo "✅ OK"; else echo "⚠️ PROBLEMA"; fi)
- **Página do Carrinho**: $(if curl -s "$PERFORMANCE_URL/cart" | grep -q "carrinho"; then echo "✅ OK"; else echo "⚠️ PROBLEMA"; fi)

## 📈 Logs

\`\`\`
$(tail -20 "$LOG_FILE" 2>/dev/null || echo "Log não disponível")
\`\`\`

## 🚨 Alertas

\`\`\`
$(tail -10 "$ALERT_FILE" 2>/dev/null || echo "Nenhum alerta")
\`\`\`

---

**Relatório gerado automaticamente pelo sistema de monitoramento Vytalle**
EOF

    success "Relatório salvo em $report_file"
}

# Função principal
main() {
    log "🚀 Iniciando monitoramento ultra-robusto do Vytalle..."
    
    # Verificar dependências
    info "🔍 Verificando dependências..."
    local missing_deps=()
    
    for dep in curl jq bc; do
        if ! command -v "$dep" >/dev/null 2>&1; then
            missing_deps+=("$dep")
        fi
    done
    
    if [ ${#missing_deps[@]} -gt 0 ]; then
        warning "Dependências ausentes: ${missing_deps[*]}"
        warning "Algumas funcionalidades podem não estar disponíveis"
    else
        success "Todas as dependências encontradas"
    fi
    
    # Executar verificações
    local all_passed=true
    
    check_connectivity || all_passed=false
    check_health || all_passed=false
    check_performance || all_passed=false
    check_security || all_passed=false
    check_functionality || all_passed=false
    
    # Coletar métricas
    collect_system_metrics
    
    # Gerar relatório
    generate_report
    
    # Resultado final
    if [ "$all_passed" = true ]; then
        success "🎉 Monitoramento concluído com SUCESSO!"
        log "✅ Todas as verificações passaram"
        exit 0
    else
        alert "❌ Monitoramento concluído com PROBLEMAS!"
        log "⚠️ Algumas verificações falharam"
        exit 1
    fi
}

# Executar função principal
main "$@" 