#!/bin/bash

# ========================================================================
# 🚀 VYTALLE DEVELOPMENT WORKFLOW ULTRA-ROBUSTO
# ========================================================================
# Script completo para desenvolvimento com verificações automáticas
# Autor: RET Consultoria - Desenvolvimento Profissional
# ========================================================================

set -euo pipefail

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configurações
PROJECT_NAME="Vytalle Estética"
LOG_DIR="logs"
LOG_FILE="$LOG_DIR/dev-workflow-$(date +%Y%m%d-%H%M%S).log"

# Função para logging
log() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    # Criar diretório de logs se não existir
    mkdir -p "$LOG_DIR"
    
    # Log para arquivo
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"
    
    # Output colorido para terminal
    case $level in
        "INFO")  echo -e "${BLUE}ℹ️  $message${NC}" ;;
        "SUCCESS") echo -e "${GREEN}✅ $message${NC}" ;;
        "WARNING") echo -e "${YELLOW}⚠️  $message${NC}" ;;
        "ERROR") echo -e "${RED}❌ $message${NC}" ;;
        "STEP") echo -e "${PURPLE}🔧 $message${NC}" ;;
        "RESULT") echo -e "${CYAN}📊 $message${NC}" ;;
    esac
}

# Função para verificar dependências
check_dependencies() {
    log "STEP" "Verificando dependências do sistema..."
    
    local missing_deps=()
    
    # Verificar Node.js
    if ! command -v node &> /dev/null; then
        missing_deps+=("Node.js")
    else
        local node_version=$(node --version | sed 's/v//')
        if [[ $(echo "$node_version 18.0.0" | tr " " "\n" | sort -V | head -n1) != "18.0.0" ]]; then
            missing_deps+=("Node.js >= 18.0.0 (atual: $node_version)")
        fi
    fi
    
    # Verificar npm
    if ! command -v npm &> /dev/null; then
        missing_deps+=("npm")
    else
        local npm_version=$(npm --version)
        if [[ $(echo "$npm_version 9.0.0" | tr " " "\n" | sort -V | head -n1) != "9.0.0" ]]; then
            missing_deps+=("npm >= 9.0.0 (atual: $npm_version)")
        fi
    fi
    
    # Verificar Git
    if ! command -v git &> /dev/null; then
        missing_deps+=("git")
    fi
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        log "ERROR" "Dependências faltando: ${missing_deps[*]}"
        log "INFO" "Instale as dependências antes de continuar"
        exit 1
    fi
    
    log "SUCCESS" "Todas as dependências estão disponíveis"
    log "INFO" "Node.js: $(node --version)"
    log "INFO" "npm: v$(npm --version)"
    log "INFO" "Git: $(git --version | cut -d' ' -f3)"
}

# Função para verificar ambiente
check_environment() {
    log "STEP" "Verificando configuração do ambiente..."
    
    # Verificar .env.local
    if [[ ! -f ".env.local" ]]; then
        log "WARNING" ".env.local não encontrado"
        if [[ -f ".env.example" ]]; then
            cp .env.example .env.local
            log "INFO" "Criado .env.local a partir do .env.example"
            log "WARNING" "Configure as variáveis de ambiente em .env.local"
        else
            log "ERROR" "Nenhum arquivo de exemplo encontrado"
            return 1
        fi
    else
        log "SUCCESS" "Arquivo .env.local encontrado"
    fi
    
    # Verificar variáveis essenciais
    if [[ -f ".env.local" ]]; then
        source .env.local
        local missing_vars=()
        
        [[ -z "${NEXT_PUBLIC_SUPABASE_URL:-}" ]] && missing_vars+=("NEXT_PUBLIC_SUPABASE_URL")
        [[ -z "${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}" ]] && missing_vars+=("NEXT_PUBLIC_SUPABASE_ANON_KEY")
        [[ -z "${SUPABASE_SERVICE_ROLE_KEY:-}" ]] && missing_vars+=("SUPABASE_SERVICE_ROLE_KEY")
        
        if [ ${#missing_vars[@]} -ne 0 ]; then
            log "WARNING" "Variáveis faltando: ${missing_vars[*]}"
            log "INFO" "Configure essas variáveis em .env.local"
        else
            log "SUCCESS" "Variáveis de ambiente principais configuradas"
        fi
    fi
}

# Função para verificar Git
check_git_status() {
    log "STEP" "Verificando status do Git..."
    
    if [[ ! -d ".git" ]]; then
        log "ERROR" "Não é um repositório Git"
        return 1
    fi
    
    # Verificar branch atual
    local current_branch=$(git branch --show-current)
    log "INFO" "Branch atual: $current_branch"
    
    # Verificar arquivos modificados
    local modified_files=$(git status --porcelain | wc -l | tr -d ' ')
    if [[ $modified_files -gt 0 ]]; then
        log "WARNING" "$modified_files arquivo(s) modificado(s) não commitado(s)"
        git status --short
    else
        log "SUCCESS" "Working directory limpo"
    fi
    
    # Verificar se está sincronizado com remote
    if git remote -v | grep -q origin; then
        local behind=$(git rev-list --count HEAD..origin/$current_branch 2>/dev/null || echo "0")
        local ahead=$(git rev-list --count origin/$current_branch..HEAD 2>/dev/null || echo "0")
        
        if [[ $behind -gt 0 ]]; then
            log "WARNING" "$behind commit(s) atrás do remote"
        fi
        if [[ $ahead -gt 0 ]]; then
            log "INFO" "$ahead commit(s) à frente do remote"
        fi
        if [[ $behind -eq 0 && $ahead -eq 0 ]]; then
            log "SUCCESS" "Sincronizado com remote"
        fi
    fi
}

# Função para instalar dependências
install_dependencies() {
    log "STEP" "Instalando dependências do projeto..."
    
    # Verificar se node_modules existe e é recente
    if [[ -d "node_modules" && "package-lock.json" -ot "node_modules" ]]; then
        log "INFO" "node_modules está atualizado"
    else
        log "INFO" "Executando npm ci..."
        if npm ci --prefer-offline --no-audit --no-fund --silent; then
            log "SUCCESS" "Dependências instaladas com sucesso"
        else
            log "ERROR" "Falha na instalação das dependências"
            return 1
        fi
    fi
    
    # Verificar se Playwright está instalado
    if [[ ! -d "node_modules/@playwright" ]] || ! npx playwright --version &>/dev/null; then
        log "INFO" "Instalando Playwright browsers..."
        if npx playwright install --with-deps &>/dev/null; then
            log "SUCCESS" "Playwright instalado com sucesso"
        else
            log "WARNING" "Falha na instalação do Playwright (opcional)"
        fi
    fi
}

# Função para executar verificações de qualidade
run_quality_checks() {
    log "STEP" "Executando verificações de qualidade..."
    
    # TypeScript check
    log "INFO" "Verificando tipos TypeScript..."
    if npm run type-check &>/dev/null; then
        log "SUCCESS" "Verificação de tipos passou"
    else
        log "ERROR" "Erro na verificação de tipos"
        npm run type-check
        return 1
    fi
    
    # ESLint
    log "INFO" "Executando ESLint..."
    if npm run lint &>/dev/null; then
        log "SUCCESS" "Lint passou sem erros"
    else
        log "WARNING" "Avisos de lint encontrados"
        npm run lint
    fi
    
    # Testes rápidos (apenas essenciais)
    log "INFO" "Executando testes essenciais..."
    if timeout 30s npm run test:ci -- --reporter=basic --run &>/dev/null; then
        log "SUCCESS" "Testes essenciais passaram"
    else
        log "WARNING" "Alguns testes falharam ou timeout"
    fi
}

# Função para inicializar banco de dados
init_database() {
    log "STEP" "Inicializando banco de dados..."
    
    if npm run db:init &>/dev/null; then
        log "SUCCESS" "Banco de dados inicializado"
    else
        log "WARNING" "Falha na inicialização do banco (pode ser normal se já estiver configurado)"
    fi
}

# Função para verificar saúde da aplicação
health_check() {
    log "STEP" "Verificando saúde da aplicação..."
    
    local max_attempts=10
    local attempt=0
    
    while [[ $attempt -lt $max_attempts ]]; do
        if curl -f http://localhost:5174/api/health &>/dev/null; then
            log "SUCCESS" "Aplicação está saudável"
            return 0
        fi
        
        attempt=$((attempt + 1))
        log "INFO" "Tentativa $attempt/$max_attempts..."
        sleep 2
    done
    
    log "WARNING" "Health check falhou - aplicação pode não estar completamente inicializada"
    return 1
}

# Função para monitoramento em tempo real
start_monitoring() {
    log "STEP" "Iniciando monitoramento em tempo real..."
    
    # Script de monitoramento em background
    cat > "$LOG_DIR/monitor.sh" << 'EOF'
#!/bin/bash
while true; do
    timestamp=$(date '+%H:%M:%S')
    
    # Verificar uso de CPU e memória
    cpu_usage=$(top -l 1 -n 0 | grep "CPU usage" | awk '{print $3}' | sed 's/%//' || echo "0")
    memory_pressure=$(top -l 1 -n 0 | grep "PhysMem" | awk '{print $2}' || echo "unknown")
    
    # Verificar se a aplicação está rodando
    if curl -f http://localhost:5174/api/health &>/dev/null; then
        status="✅ UP"
    else
        status="❌ DOWN"
    fi
    
    # Log de monitoramento
    echo "[$timestamp] Status: $status | CPU: ${cpu_usage}% | Memory: $memory_pressure" >> logs/monitor.log
    
    sleep 30
done
EOF
    
    chmod +x "$LOG_DIR/monitor.sh"
    nohup bash "$LOG_DIR/monitor.sh" &>/dev/null &
    echo $! > "$LOG_DIR/monitor.pid"
    
    log "SUCCESS" "Monitoramento iniciado (PID: $(cat $LOG_DIR/monitor.pid))"
}

# Função para limpeza em caso de erro
cleanup() {
    log "INFO" "Executando limpeza..."
    
    # Parar monitoramento se estiver rodando
    if [[ -f "$LOG_DIR/monitor.pid" ]]; then
        local monitor_pid=$(cat "$LOG_DIR/monitor.pid")
        if kill -0 "$monitor_pid" &>/dev/null; then
            kill "$monitor_pid" &>/dev/null
            log "INFO" "Monitoramento parado"
        fi
        rm -f "$LOG_DIR/monitor.pid"
    fi
}

# Função principal
main() {
    # Banner
    echo -e "${PURPLE}"
    cat << 'EOF'
╔══════════════════════════════════════════════════════════════╗
║                    🚀 VYTALLE DEV WORKFLOW                   ║
║                   Ultra-Robusto v2.0                        ║
║              RET Consultoria - Desenvolvimento               ║
╚══════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
    
    log "INFO" "Iniciando workflow de desenvolvimento ultra-robusto para $PROJECT_NAME"
    log "INFO" "Log sendo salvo em: $LOG_FILE"
    
    # Configurar trap para limpeza
    trap cleanup EXIT ERR
    
    # Executar verificações
    check_dependencies
    check_environment
    check_git_status
    install_dependencies
    run_quality_checks
    init_database
    
    # Iniciar aplicação
    log "STEP" "Iniciando aplicação em modo desenvolvimento..."
    log "INFO" "Acesse: http://localhost:5174"
    log "INFO" "Para parar: Ctrl+C"
    
    # Iniciar monitoramento
    start_monitoring
    
    # Verificar saúde após alguns segundos
    (sleep 10 && health_check) &
    
    # Iniciar aplicação
    npm run dev
}

# Execução com tratamento de erros
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi