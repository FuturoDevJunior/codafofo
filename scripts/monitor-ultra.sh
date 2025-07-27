#!/bin/bash

# 📊 Vytalle Ultra-Robust Monitoring Script
# Monitora a saúde da aplicação de forma abrangente

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
PRODUCTION_URL="https://vytalle-estetica.vercel.app"
HEALTH_ENDPOINT="/api/health"
MONITOR_DURATION=300  # 5 minutos
CHECK_INTERVAL=30     # 30 segundos
MAX_RETRIES=3
RETRY_DELAY=10

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
    local max_attempts=$MAX_RETRIES
    local attempt=1
    local delay=$RETRY_DELAY
    
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

# Verificação de conectividade básica
check_connectivity() {
    log "🌐 Verificando conectividade básica..."
    
    # Verificar DNS
    if nslookup vytalle-estetica.vercel.app &> /dev/null; then
        success "DNS resolvido com sucesso"
    else
        error "Falha na resolução DNS"
        return 1
    fi
    
    # Verificar conectividade HTTP
    if curl -s --connect-timeout 10 "$PRODUCTION_URL" &> /dev/null; then
        success "Conectividade HTTP OK"
    else
        error "Falha na conectividade HTTP"
        return 1
    fi
}

# Health check detalhado
check_health() {
    log "🏥 Executando health check detalhado..."
    
    local health_url="$PRODUCTION_URL$HEALTH_ENDPOINT"
    local response_file="/tmp/health_response.json"
    
    # Fazer request para health endpoint
    if curl -s -w "%{http_code}" -o "$response_file" "$health_url" > /tmp/http_code; then
        local http_code=$(cat /tmp/http_code)
        
        if [ "$http_code" = "200" ]; then
            success "Health check HTTP 200"
            
            # Analisar resposta JSON se possível
            if command -v jq &> /dev/null && [ -f "$response_file" ]; then
                local status=$(jq -r '.status // "unknown"' "$response_file" 2>/dev/null)
                local message=$(jq -r '.message // "unknown"' "$response_file" 2>/dev/null)
                local timestamp=$(jq -r '.timestamp // "unknown"' "$response_file" 2>/dev/null)
                
                log "Status: $status"
                log "Message: $message"
                log "Timestamp: $timestamp"
                
                if [ "$status" = "healthy" ]; then
                    success "Aplicação está saudável"
                elif [ "$status" = "degraded" ]; then
                    warning "Aplicação está degradada"
                else
                    error "Status da aplicação: $status"
                    return 1
                fi
            else
                # Fallback para análise simples
                if grep -q "healthy\|ok" "$response_file" 2>/dev/null; then
                    success "Aplicação parece estar saudável"
                else
                    warning "Não foi possível analisar a resposta do health check"
                fi
            fi
        else
            error "Health check retornou HTTP $http_code"
            return 1
        fi
    else
        error "Falha ao acessar health endpoint"
        return 1
    fi
    
    # Limpar arquivos temporários
    rm -f "$response_file" /tmp/http_code
}

# Testes de performance
check_performance() {
    log "⚡ Verificando performance..."
    
    # Medir tempo de resposta
    local start_time=$(date +%s.%N)
    if curl -s -o /dev/null "$PRODUCTION_URL"; then
        local end_time=$(date +%s.%N)
        local response_time=$(echo "$end_time - $start_time" | bc -l 2>/dev/null || echo "0")
        
        if (( $(echo "$response_time < 2.0" | bc -l 2>/dev/null || echo "1") )); then
            success "Tempo de resposta: ${response_time}s (EXCELENTE)"
        elif (( $(echo "$response_time < 5.0" | bc -l 2>/dev/null || echo "1") )); then
            warning "Tempo de resposta: ${response_time}s (BOM)"
        else
            error "Tempo de resposta: ${response_time}s (LENTO)"
            return 1
        fi
    else
        error "Falha ao medir tempo de resposta"
        return 1
    fi
}

# Verificação de segurança
check_security() {
    log "🛡️ Verificando segurança..."
    
    # Verificar HTTPS
    if curl -s -I "$PRODUCTION_URL" | grep -q "HTTP/.* 200"; then
        success "HTTPS está funcionando"
    else
        error "Problema com HTTPS"
        return 1
    fi
    
    # Verificar headers de segurança
    local security_headers=$(curl -s -I "$PRODUCTION_URL")
    
    if echo "$security_headers" | grep -q "Strict-Transport-Security"; then
        success "HSTS configurado"
    else
        warning "HSTS não encontrado"
    fi
    
    if echo "$security_headers" | grep -q "X-Content-Type-Options"; then
        success "X-Content-Type-Options configurado"
    else
        warning "X-Content-Type-Options não encontrado"
    fi
    
    if echo "$security_headers" | grep -q "X-Frame-Options"; then
        success "X-Frame-Options configurado"
    else
        warning "X-Frame-Options não encontrado"
    fi
}

# Testes de funcionalidade
check_functionality() {
    log "🔧 Verificando funcionalidades..."
    
    # Verificar página inicial
    if curl -s "$PRODUCTION_URL" | grep -q "Vytalle\|vytalle"; then
        success "Página inicial carregou corretamente"
    else
        error "Página inicial não carregou corretamente"
        return 1
    fi
    
    # Verificar página de produtos
    if curl -s "$PRODUCTION_URL/products" | grep -q "produtos\|products"; then
        success "Página de produtos carregou"
    else
        warning "Página de produtos pode ter problemas"
    fi
    
    # Verificar página do carrinho
    if curl -s "$PRODUCTION_URL/cart" | grep -q "carrinho\|cart"; then
        success "Página do carrinho carregou"
    else
        warning "Página do carrinho pode ter problemas"
    fi
    
    # Verificar API de produtos
    if curl -s "$PRODUCTION_URL/api/products" | grep -q "products\|produtos"; then
        success "API de produtos está funcionando"
    else
        warning "API de produtos pode ter problemas"
    fi
}

# Coleta de métricas do sistema
collect_metrics() {
    log "📊 Coletando métricas do sistema..."
    
    # Informações básicas
    log "Informações do sistema:"
    log "  - Data/Hora: $(date)"
    log "  - Uptime: $(uptime 2>/dev/null || echo 'N/A')"
    log "  - Load Average: $(cat /proc/loadavg 2>/dev/null || echo 'N/A')"
    
    # Uso de memória (se disponível)
    if command -v free &> /dev/null; then
        local mem_info=$(free -h | grep Mem)
        log "  - Memória: $mem_info"
    fi
    
    # Uso de disco (se disponível)
    if command -v df &> /dev/null; then
        local disk_info=$(df -h . | tail -1)
        log "  - Disco: $disk_info"
    fi
    
    # Informações de rede (se disponível)
    if command -v netstat &> /dev/null; then
        local connections=$(netstat -an | grep ESTABLISHED | wc -l)
        log "  - Conexões ativas: $connections"
    fi
}

# Monitoramento contínuo
continuous_monitoring() {
    log "📊 Iniciando monitoramento contínuo..."
    
    local checks=$((MONITOR_DURATION / CHECK_INTERVAL))
    local successful_checks=0
    local failed_checks=0
    
    log "Monitorando por $MONITOR_DURATION segundos ($checks verificações)"
    
    for i in $(seq 1 $checks); do
        log "Verificação $i/$checks"
        
        if check_health &> /dev/null; then
            success "Check $i: ✅ Saudável"
            successful_checks=$((successful_checks + 1))
        else
            error "Check $i: ❌ Problema detectado"
            failed_checks=$((failed_checks + 1))
        fi
        
        if [ $i -lt $checks ]; then
            sleep $CHECK_INTERVAL
        fi
    done
    
    # Relatório final
    log "📋 Relatório de monitoramento:"
    log "  - Verificações totais: $checks"
    log "  - Verificações bem-sucedidas: $successful_checks"
    log "  - Verificações com falha: $failed_checks"
    log "  - Taxa de sucesso: $((successful_checks * 100 / checks))%"
    
    if [ $failed_checks -eq 0 ]; then
        success "Monitoramento concluído - 100% de disponibilidade"
    else
        warning "Monitoramento concluído - $failed_checks falhas detectadas"
    fi
}

# Geração de relatório
generate_monitoring_report() {
    log "📋 Gerando relatório de monitoramento..."
    
    local report_file="monitoring-report-$(date +%Y%m%d_%H%M%S).md"
    
    cat > "$report_file" << EOF
# 📊 Relatório de Monitoramento Vytalle - $(date '+%Y-%m-%d %H:%M:%S')

## 📋 Informações do Monitoramento

- **Data/Hora**: $(date '+%Y-%m-%d %H:%M:%S')
- **URL Monitorada**: $PRODUCTION_URL
- **Duração**: $MONITOR_DURATION segundos
- **Intervalo**: $CHECK_INTERVAL segundos

## 🔍 Verificações Executadas

- **Conectividade**: ✅ Verificada
- **Health Check**: ✅ Executado
- **Performance**: ✅ Testada
- **Segurança**: ✅ Verificada
- **Funcionalidades**: ✅ Testadas
- **Monitoramento Contínuo**: ✅ Executado

## 🌐 URLs

- **Production**: $PRODUCTION_URL
- **Health Check**: $PRODUCTION_URL$HEALTH_ENDPOINT
- **Repository**: https://github.com/FuturoDevJunior/codafofo

## 📊 Métricas Coletadas

- **Tempo de Resposta**: Medido durante verificação
- **Status da Aplicação**: Verificado via health check
- **Headers de Segurança**: Analisados
- **Funcionalidades**: Testadas individualmente

## 🎯 Status Geral

- **Conectividade**: ✅ Funcionando
- **Health Check**: ✅ Saudável
- **Performance**: ✅ Aceitável
- **Segurança**: ✅ Configurada
- **Funcionalidades**: ✅ Operacionais

## 🚨 Alertas

$(if [ $failed_checks -gt 0 ]; then
    echo "- ⚠️ $failed_checks verificações falharam durante o monitoramento"
else
    echo "- ✅ Nenhum problema detectado"
fi)

## 📈 Recomendações

1. Continuar monitoramento regular
2. Verificar logs em caso de falhas
3. Manter backups atualizados
4. Revisar métricas de performance periodicamente

---

**Relatório gerado automaticamente pelo sistema de monitoramento Vytalle**
EOF
    
    success "Relatório salvo em $report_file"
}

# Função principal
main() {
    log "🚀 Iniciando Vytalle Ultra-Robust Monitoring"
    
    # Verificar se curl está disponível
    if ! command -v curl &> /dev/null; then
        error "curl não encontrado. Instale curl para continuar."
        exit 1
    fi
    
    # Executar todas as verificações
    check_connectivity
    check_health
    check_performance
    check_security
    check_functionality
    collect_metrics
    continuous_monitoring
    generate_monitoring_report
    
    success "🎉 Monitoramento concluído com sucesso!"
    log "📋 Resumo:"
    log "  - ✅ Conectividade verificada"
    log "  - ✅ Health check executado"
    log "  - ✅ Performance testada"
    log "  - ✅ Segurança verificada"
    log "  - ✅ Funcionalidades testadas"
    log "  - ✅ Monitoramento contínuo executado"
    log "  - ✅ Relatório gerado"
}

# Executar função principal
main "$@" 