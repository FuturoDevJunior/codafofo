#!/bin/bash

# Script de Backup Automático do Supabase
# 
# Funcionalidades:
# - Backup automático do Supabase (diário)
# - Backup de imagens (semanal)
# - Rotação de logs (automático)
# - Verificação de vulnerabilidades (semanal)
# - Backup de configurações

set -e

# Configurações
BACKUP_DIR="./backups"
IMAGES_DIR="./public/images"
LOGS_DIR="./logs"
CONFIG_DIR="./config"
RETENTION_DAYS=30
RETENTION_WEEKS=12

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função de logging
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

# Verificar se as variáveis de ambiente estão configuradas
check_env() {
    if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
        error "Variáveis de ambiente do Supabase não configuradas"
        exit 1
    fi
}

# Criar diretórios se não existirem
create_directories() {
    mkdir -p "$BACKUP_DIR"
    mkdir -p "$LOGS_DIR"
    mkdir -p "$CONFIG_DIR"
    log "Diretórios criados/verificados"
}

# Backup do Supabase
backup_supabase() {
    local timestamp=$(date +'%Y%m%d_%H%M%S')
    local backup_file="$BACKUP_DIR/supabase_backup_$timestamp.json"
    
    log "Iniciando backup do Supabase..."
    
    # Usar o script Node.js para backup
    if node scripts/sync-products.js; then
        log "Backup do Supabase concluído com sucesso"
    else
        error "Falha no backup do Supabase"
        return 1
    fi
}

# Backup de imagens
backup_images() {
    local timestamp=$(date +'%Y%m%d_%H%M%S')
    local images_backup="$BACKUP_DIR/images_backup_$timestamp.tar.gz"
    
    if [ -d "$IMAGES_DIR" ]; then
        log "Iniciando backup de imagens..."
        tar -czf "$images_backup" -C "$IMAGES_DIR" .
        log "Backup de imagens concluído: $images_backup"
    else
        warn "Diretório de imagens não encontrado: $IMAGES_DIR"
    fi
}

# Backup de configurações
backup_config() {
    local timestamp=$(date +'%Y%m%d_%H%M%S')
    local config_backup="$BACKUP_DIR/config_backup_$timestamp.tar.gz"
    
    log "Iniciando backup de configurações..."
    
    # Lista de arquivos de configuração importantes
    local config_files=(
        "package.json"
        "next.config.js"
        "tailwind.config.js"
        "vitest.config.mts"
        "vercel.json"
        ".env.local"
        ".env.example"
    )
    
    local files_to_backup=()
    for file in "${config_files[@]}"; do
        if [ -f "$file" ]; then
            files_to_backup+=("$file")
        fi
    done
    
    if [ ${#files_to_backup[@]} -gt 0 ]; then
        tar -czf "$config_backup" "${files_to_backup[@]}"
        log "Backup de configurações concluído: $config_backup"
    else
        warn "Nenhum arquivo de configuração encontrado"
    fi
}

# Rotação de logs
rotate_logs() {
    log "Iniciando rotação de logs..."
    
    # Rotacionar logs antigos
    find "$LOGS_DIR" -name "*.log" -mtime +7 -exec gzip {} \;
    find "$LOGS_DIR" -name "*.log.gz" -mtime +30 -delete
    
    log "Rotação de logs concluída"
}

# Limpeza de backups antigos
cleanup_old_backups() {
    log "Iniciando limpeza de backups antigos..."
    
    # Remover backups diários com mais de 30 dias
    find "$BACKUP_DIR" -name "supabase_backup_*.json" -mtime +$RETENTION_DAYS -delete
    
    # Remover backups de imagens com mais de 12 semanas
    find "$BACKUP_DIR" -name "images_backup_*.tar.gz" -mtime +$((RETENTION_WEEKS * 7)) -delete
    
    # Remover backups de configuração com mais de 30 dias
    find "$BACKUP_DIR" -name "config_backup_*.tar.gz" -mtime +$RETENTION_DAYS -delete
    
    log "Limpeza de backups antigos concluída"
}

# Verificação de vulnerabilidades
check_vulnerabilities() {
    log "Iniciando verificação de vulnerabilidades..."
    
    # Verificar dependências com vulnerabilidades conhecidas
    if command -v npm &> /dev/null; then
        if npm audit --audit-level=moderate; then
            log "Verificação de vulnerabilidades concluída"
        else
            warn "Vulnerabilidades encontradas nas dependências"
        fi
    else
        warn "npm não encontrado, pulando verificação de vulnerabilidades"
    fi
    
    # Verificar permissões de arquivos sensíveis
    if [ -f ".env.local" ]; then
        if [ "$(stat -c %a .env.local)" != "600" ]; then
            warn "Arquivo .env.local com permissões incorretas"
            chmod 600 .env.local
        fi
    fi
}

# Verificação de espaço em disco
check_disk_space() {
    local backup_size=$(du -sh "$BACKUP_DIR" 2>/dev/null | cut -f1)
    local available_space=$(df -h . | awk 'NR==2 {print $4}')
    
    info "Tamanho do diretório de backup: $backup_size"
    info "Espaço disponível: $available_space"
    
    # Verificar se há pelo menos 1GB disponível
    local available_kb=$(df . | awk 'NR==2 {print $4}')
    if [ "$available_kb" -lt 1048576 ]; then
        error "Espaço em disco insuficiente (menos de 1GB)"
        return 1
    fi
}

# Função principal
main() {
    local start_time=$(date +%s)
    
    log "🚀 Iniciando processo de backup automático..."
    
    # Verificações iniciais
    check_env
    create_directories
    check_disk_space
    
    # Executar backups
    backup_supabase
    backup_config
    
    # Backup de imagens apenas uma vez por semana (domingo)
    if [ "$(date +%u)" = "7" ]; then
        backup_images
    fi
    
    # Manutenção
    rotate_logs
    cleanup_old_backups
    
    # Verificação de vulnerabilidades apenas uma vez por semana (sábado)
    if [ "$(date +%u)" = "6" ]; then
        check_vulnerabilities
    fi
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    log "✅ Processo de backup concluído em ${duration}s"
    
    # Relatório final
    local total_backups=$(find "$BACKUP_DIR" -name "*.json" -o -name "*.tar.gz" | wc -l)
    info "Total de backups: $total_backups"
}

# Executar função principal
main "$@" 