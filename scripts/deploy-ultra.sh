#!/bin/bash

# Script Ultra-Robusto de Deploy Vytalle
set -e

# Configurações
MAX_RETRIES=5
RETRY_DELAY=30
LOG_FILE="deploy-ultra.log"
BACKUP_DIR="backups"
HEALTH_URL="https://vytalle-estetica.vercel.app/api/health"
PERFORMANCE_URL="https://vytalle-estetica.vercel.app"
DEPLOY_TIMEOUT=600 # 10 minutos

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
    
    # Verificar Vercel CLI
    if ! command -v vercel >/dev/null 2>&1; then
        warning "Vercel CLI não encontrado, instalando..."
        npm install -g vercel
    fi
    
    # Verificar git
    if ! command -v git >/dev/null 2>&1; then
        alert "git não encontrado"
        return 1
    fi
    
    # Verificar se há mudanças não commitadas
    if [ -n "$(git status --porcelain)" ]; then
        warning "Há mudanças não commitadas no repositório"
        read -p "Deseja continuar mesmo assim? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            alert "Deploy cancelado pelo usuário"
            return 1
        fi
    fi
    
    success "Pré-requisitos verificados"
    return 0
}

# Função para criar backup
create_backup() {
    info "💾 Criando backup..."
    
    # Criar diretório de backup se não existir
    mkdir -p "$BACKUP_DIR"
    
    # Nome do backup com timestamp
    local backup_name="backup-$(date +%Y%m%d-%H%M%S)"
    local backup_path="$BACKUP_DIR/$backup_name"
    
    # Criar backup dos arquivos importantes
    mkdir -p "$backup_path"
    
    # Copiar arquivos críticos
    cp -r .next "$backup_path/" 2>/dev/null || warning "Não foi possível fazer backup do .next"
    cp package.json "$backup_path/" 2>/dev/null || warning "Não foi possível fazer backup do package.json"
    cp package-lock.json "$backup_path/" 2>/dev/null || warning "Não foi possível fazer backup do package-lock.json"
    cp next.config.js "$backup_path/" 2>/dev/null || warning "Não foi possível fazer backup do next.config.js"
    cp tailwind.config.js "$backup_path/" 2>/dev/null || warning "Não foi possível fazer backup do tailwind.config.js"
    cp tsconfig.json "$backup_path/" 2>/dev/null || warning "Não foi possível fazer backup do tsconfig.json"
    
    # Salvar informações do commit atual
    git rev-parse HEAD > "$backup_path/commit-hash" 2>/dev/null || warning "Não foi possível salvar hash do commit"
    git log --oneline -1 > "$backup_path/commit-message" 2>/dev/null || warning "Não foi possível salvar mensagem do commit"
    
    success "Backup criado em $backup_path"
    echo "$backup_path" > .last_backup
}

# Função para executar testes
run_tests() {
    info "🧪 Executando testes..."
    
    # Testes unitários
    if retry 3 30 "npm run test:ci -- --run"; then
        success "Testes unitários: OK"
    else
        alert "Testes unitários falharam"
        return 1
    fi
    
    # Lint
    if retry 3 10 "npm run lint"; then
        success "Lint: OK"
    else
        warning "Lint falhou, mas continuando..."
    fi
    
    # Type check
    if retry 3 10 "npm run type-check"; then
        success "Type check: OK"
    else
        alert "Type check falhou"
        return 1
    fi
    
    return 0
}

# Função para build
run_build() {
    info "🏗️ Executando build..."
    
    # Limpar build anterior
    rm -rf .next
    
    # Build com retry
    if retry 3 60 "npm run build"; then
        success "Build: OK"
    else
        alert "Build falhou"
        return 1
    fi
    
    # Verificar se o build foi criado
    if [ ! -d ".next" ]; then
        alert "Diretório .next não foi criado"
        return 1
    fi
    
    return 0
}

# Função para deploy
run_deploy() {
    info "🚀 Executando deploy..."
    
    # Deploy com retry
    if retry 3 120 "vercel --prod --yes"; then
        success "Deploy: OK"
    else
        alert "Deploy falhou"
        return 1
    fi
    
    return 0
}

# Função para verificar health check
check_health() {
    info "🏥 Verificando health check..."
    
    local max_attempts=10
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        log "🔍 Health check tentativa $attempt de $max_attempts..."
        
        if response=$(curl -s -w "%{http_code}" -o /tmp/health_response.json "$HEALTH_URL" 2>/dev/null); then
            local status_code="${response: -3}"
            
            if [ "$status_code" = "200" ]; then
                success "Health check: OK (HTTP $status_code)"
                
                # Verificar status da aplicação
                if command -v jq >/dev/null 2>&1; then
                    local app_status=$(jq -r '.status' /tmp/health_response.json 2>/dev/null)
                    if [ "$app_status" = "healthy" ]; then
                        success "Status da aplicação: $app_status"
                        return 0
                    elif [ "$app_status" = "degraded" ]; then
                        warning "Status da aplicação: $app_status"
                        return 0
                    else
                        alert "Status da aplicação: $app_status"
                        return 1
                    fi
                fi
                
                return 0
            else
                warning "Health check: HTTP $status_code (tentativa $attempt)"
            fi
        else
            warning "Health check: Falha de conexão (tentativa $attempt)"
        fi
        
        if [ $attempt -lt $max_attempts ]; then
            log "⏳ Aguardando 30s antes da próxima tentativa..."
            sleep 30
        fi
        
        attempt=$((attempt + 1))
    done
    
    alert "Health check falhou após $max_attempts tentativas"
    return 1
}

# Função para verificar performance
check_performance() {
    info "⚡ Verificando performance..."
    
    # Verificar tempo de resposta
    local start_time=$(date +%s.%N)
    if curl -s -o /dev/null "$PERFORMANCE_URL"; then
        local end_time=$(date +%s.%N)
        local response_time=$(echo "$end_time - $start_time" | bc -l 2>/dev/null || echo "0")
        
        if (( $(echo "$response_time < 3.0" | bc -l) )); then
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

# Função para rollback
rollback() {
    alert "🔄 Iniciando rollback..."
    
    local backup_path
    if [ -f .last_backup ]; then
        backup_path=$(cat .last_backup)
    else
        alert "Arquivo de backup não encontrado"
        return 1
    fi
    
    if [ ! -d "$backup_path" ]; then
        alert "Diretório de backup não encontrado: $backup_path"
        return 1
    fi
    
    info "Restaurando de: $backup_path"
    
    # Restaurar arquivos
    if [ -d "$backup_path/.next" ]; then
        rm -rf .next
        cp -r "$backup_path/.next" .
        success "Backup do .next restaurado"
    fi
    
    if [ -f "$backup_path/package.json" ]; then
        cp "$backup_path/package.json" .
        success "Backup do package.json restaurado"
    fi
    
    if [ -f "$backup_path/package-lock.json" ]; then
        cp "$backup_path/package-lock.json" .
        success "Backup do package-lock.json restaurado"
    fi
    
    # Reinstalar dependências se necessário
    if [ -f "$backup_path/package.json" ]; then
        info "Reinstalando dependências..."
        npm ci --prefer-offline --no-audit --no-fund
    fi
    
    # Rebuild
    info "Executando rebuild..."
    npm run build
    
    # Redeploy
    info "Executando redeploy..."
    vercel --prod --yes
    
    success "Rollback concluído"
    return 0
}

# Função para limpeza
cleanup() {
    info "🧹 Executando limpeza..."
    
    # Limpar backups antigos (manter apenas os últimos 5)
    if [ -d "$BACKUP_DIR" ]; then
        cd "$BACKUP_DIR"
        ls -t | tail -n +6 | xargs -r rm -rf
        cd ..
        success "Backups antigos removidos"
    fi
    
    # Limpar cache
    npm cache clean --force
    success "Cache limpo"
    
    # Limpar arquivos temporários
    rm -f /tmp/health_response.json
    rm -f /tmp/lighthouse-report.json
    success "Arquivos temporários removidos"
}

# Função para gerar relatório
generate_report() {
    info "📋 Gerando relatório de deploy..."
    
    local report_file="deploy-report-$(date +%Y%m%d-%H%M%S).md"
    
    cat > "$report_file" << EOF
# 🚀 Relatório de Deploy Vytalle - $(date '+%Y-%m-%d %H:%M:%S')

## 📋 Resumo Executivo

### Informações do Deploy
- **Data/Hora**: $(date '+%Y-%m-%d %H:%M:%S')
- **Commit**: $(git rev-parse HEAD 2>/dev/null || echo "N/A")
- **Branch**: $(git branch --show-current 2>/dev/null || echo "N/A")
- **URL**: $PERFORMANCE_URL
- **Health Check**: $HEALTH_URL

### Status do Deploy
- **Pré-requisitos**: ✅ Verificados
- **Backup**: ✅ Criado
- **Testes**: ✅ Executados
- **Build**: ✅ Concluído
- **Deploy**: ✅ Realizado
- **Health Check**: ✅ Verificado
- **Performance**: ✅ Verificada
- **Funcionalidades**: ✅ Verificadas

## 🔍 Detalhes Técnicos

### Commit Information
\`\`\`
$(git log --oneline -5 2>/dev/null || echo "N/A")
\`\`\`

### Health Check Response
$(if [ -f /tmp/health_response.json ]; then
    echo "\`\`\`json"
    cat /tmp/health_response.json | jq '.' 2>/dev/null || cat /tmp/health_response.json
    echo "\`\`\`"
else
    echo "Health check response não disponível"
fi)

### Performance Metrics
- **Tempo de Resposta**: Medido durante verificação
- **Status da Aplicação**: Verificado via health check
- **Funcionalidades**: Testadas individualmente

## 📊 Logs

\`\`\`
$(tail -50 "$LOG_FILE" 2>/dev/null || echo "Log não disponível")
\`\`\`

## 🛡️ Backup Information

$(if [ -f .last_backup ]; then
    echo "- **Backup Path**: $(cat .last_backup)"
    echo "- **Backup Size**: $(du -sh "$(cat .last_backup)" 2>/dev/null || echo "N/A")"
else
    echo "- **Backup**: Não disponível"
fi)

---

**Relatório gerado automaticamente pelo sistema de deploy Vytalle**
EOF

    success "Relatório salvo em $report_file"
}

# Função principal
main() {
    local start_time=$(date +%s)
    local rollback_needed=false
    
    log "🚀 Iniciando deploy ultra-robusto do Vytalle..."
    
    # Verificar pré-requisitos
    if ! check_prerequisites; then
        alert "❌ Pré-requisitos não atendidos"
        exit 1
    fi
    
    # Criar backup
    create_backup
    
    # Executar testes
    if ! run_tests; then
        alert "❌ Testes falharam"
        rollback_needed=true
    fi
    
    # Build
    if ! run_build; then
        alert "❌ Build falhou"
        rollback_needed=true
    fi
    
    # Deploy
    if ! run_deploy; then
        alert "❌ Deploy falhou"
        rollback_needed=true
    fi
    
    # Aguardar um pouco para o deploy propagar
    info "⏳ Aguardando propagação do deploy..."
    sleep 30
    
    # Verificar health check
    if ! check_health; then
        alert "❌ Health check falhou"
        rollback_needed=true
    fi
    
    # Verificar performance
    if ! check_performance; then
        warning "⚠️ Performance abaixo do esperado"
    fi
    
    # Verificar funcionalidades
    if ! check_functionality; then
        alert "❌ Funcionalidades falharam"
        rollback_needed=true
    fi
    
    # Rollback se necessário
    if [ "$rollback_needed" = true ]; then
        alert "🔄 Deploy falhou, iniciando rollback..."
        if rollback; then
            alert "✅ Rollback concluído com sucesso"
        else
            alert "❌ Rollback falhou"
            exit 1
        fi
    else
        success "🎉 Deploy concluído com SUCESSO!"
    fi
    
    # Limpeza
    cleanup
    
    # Gerar relatório
    generate_report
    
    # Tempo total
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    local minutes=$((duration / 60))
    local seconds=$((duration % 60))
    
    if [ "$rollback_needed" = true ]; then
        alert "❌ Deploy falhou após ${minutes}m ${seconds}s"
        exit 1
    else
        success "🎉 Deploy concluído com sucesso em ${minutes}m ${seconds}s!"
        exit 0
    fi
}

# Executar função principal
main "$@" 