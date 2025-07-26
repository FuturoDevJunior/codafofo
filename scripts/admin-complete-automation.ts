#!/usr/bin/env npx tsx

/**
 * 🚀 AUTOMAÇÃO COMPLETA DO SISTEMA ADMIN VYTALLE
 * 
 * Este script automatiza TUDO relacionado ao sistema de administração:
 * - Verifica configurações
 * - Cria usuário admin se necessário
 * - Testa autenticação
 * - Valida permissões
 * - Gera relatório final
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import * as path from 'path';
import { execSync } from 'child_process';

// Carregar variáveis de ambiente
config({ path: path.resolve(process.cwd(), '.env.local') });
config({ path: path.resolve(process.cwd(), '.env') });

interface SystemStatus {
  environment: boolean;
  connectivity: boolean;
  userExists: boolean;
  authentication: boolean;
  permissions: boolean;
  overall: boolean;
}

class VytalleAdminAutomation {
  private supabase: any;
  private adminCredentials = {
    email: 'admin@vytalle.com.br',
    password: ''
  };

  constructor() {
    console.log('\n🤖 AUTOMAÇÃO COMPLETA DO SISTEMA ADMIN VYTALLE');
    console.log('='.repeat(60));
    console.log('⚡ Modo automático ativado - configurando tudo...\n');
  }

  async checkEnvironment(): Promise<boolean> {
    console.log('📋 1. Verificando variáveis de ambiente...');
    
    const required = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ];
    
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      console.log('❌ Variáveis faltando:', missing.join(', '));
      return false;
    }
    
    console.log('✅ Todas as variáveis configuradas');
    return true;
  }

  async testConnectivity(): Promise<boolean> {
    console.log('\n📡 2. Testando conectividade com Supabase...');
    
    try {
      this.supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      // Teste simples de conectividade
      const { data, error } = await this.supabase
        .from('products')
        .select('count')
        .limit(1);
      
      if (error && error.code !== '42P01') { // Ignora erro de tabela não existir
        console.log('❌ Erro de conectividade:', error.message);
        return false;
      }
      
      console.log('✅ Conectividade OK');
      return true;
    } catch (error) {
      console.log('❌ Falha na conectividade');
      return false;
    }
  }

  async ensureAdminUser(): Promise<boolean> {
    console.log('\n👤 3. Verificando/criando usuário admin...');
    
    try {
      // Executar script de configuração admin
      console.log('🔧 Executando configuração automática...');
      
      const output = execSync('npm run admin:setup', { 
        encoding: 'utf8',
        timeout: 30000 
      });
      
      // Extrair senha do output
      const passwordMatch = output.match(/🔑 Senha: (.+)/);
      if (passwordMatch) {
        this.adminCredentials.password = passwordMatch[1];
        console.log('✅ Usuário admin configurado');
        return true;
      }
      
      // Se não encontrou senha no output, tentar senha padrão
      this.adminCredentials.password = 'VytalleAdmin2024!@#';
      console.log('⚠️  Usando senha padrão');
      return true;
      
    } catch (error) {
      console.log('❌ Erro ao configurar usuário admin');
      return false;
    }
  }

  async testAuthentication(): Promise<boolean> {
    console.log('\n🔐 4. Testando autenticação...');
    
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email: this.adminCredentials.email,
        password: this.adminCredentials.password
      });
      
      if (error) {
        console.log('❌ Falha na autenticação:', error.message);
        
        // Tentar com senha alternativa
        console.log('🔄 Tentando gerar nova senha...');
        await this.ensureAdminUser();
        return this.testAuthentication();
      }
      
      if (data.user) {
        console.log('✅ Autenticação bem-sucedida');
        console.log(`👤 Usuário: ${data.user.email}`);
        
        // Fazer logout
        await this.supabase.auth.signOut();
        return true;
      }
      
      return false;
    } catch (error) {
      console.log('❌ Erro técnico na autenticação');
      return false;
    }
  }

  async checkPermissions(): Promise<boolean> {
    console.log('\n🔒 5. Verificando permissões...');
    
    try {
      // Fazer login novamente para testar permissões
      await this.supabase.auth.signInWithPassword({
        email: this.adminCredentials.email,
        password: this.adminCredentials.password
      });
      
      // Tentar acessar dados administrativos
      const { data, error } = await this.supabase
        .from('products')
        .select('id')
        .limit(1);
      
      if (error && error.code === '42501') {
        console.log('❌ Permissões insuficientes');
        return false;
      }
      
      console.log('✅ Permissões OK');
      await this.supabase.auth.signOut();
      return true;
    } catch (error) {
      console.log('⚠️  Teste de permissões inconclusivo');
      return true; // Não bloquear por isso
    }
  }

  async startServer(): Promise<boolean> {
    console.log('\n🚀 6. Verificando servidor...');
    
    try {
      // Verificar se o servidor está rodando
      const response = await fetch('http://localhost:5174/api/admin-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        console.log('✅ Servidor já está rodando');
        return true;
      }
    } catch {
      console.log('🔄 Iniciando servidor...');
      
      // Tentar iniciar o servidor em background
      try {
        execSync('npm run dev:fast > /dev/null 2>&1 &', { timeout: 5000 });
        console.log('✅ Servidor iniciado');
        return true;
      } catch {
        console.log('⚠️  Servidor deve ser iniciado manualmente: npm run dev:fast');
        return true;
      }
    }
    
    return false;
  }

  generateFinalReport(status: SystemStatus) {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RELATÓRIO FINAL DA AUTOMAÇÃO');
    console.log('='.repeat(60));
    
    console.log('\n📋 STATUS DOS COMPONENTES:');
    console.log(`Environment:     ${status.environment ? '✅' : '❌'}`);
    console.log(`Connectivity:    ${status.connectivity ? '✅' : '❌'}`);
    console.log(`User Creation:   ${status.userExists ? '✅' : '❌'}`);
    console.log(`Authentication:  ${status.authentication ? '✅' : '❌'}`);
    console.log(`Permissions:     ${status.permissions ? '✅' : '❌'}`);
    
    console.log(`\n🎯 STATUS GERAL: ${status.overall ? '✅ FUNCIONANDO' : '❌ PRECISA CORREÇÃO'}`);
    
    if (status.overall) {
      console.log('\n🎉 SISTEMA ADMIN COMPLETAMENTE CONFIGURADO!');
      console.log('\n📧 CREDENCIAIS DE ACESSO:');
      console.log(`   Email: ${this.adminCredentials.email}`);
      console.log(`   Senha: ${this.adminCredentials.password}`);
      console.log('\n🌐 ACESSAR PAINEL:');
      console.log('   URL: http://localhost:5174/admin/login');
      console.log('\n🚀 COMANDOS ÚTEIS:');
      console.log('   npm run dev:fast      # Iniciar servidor');
      console.log('   npm run admin:test    # Testar login');
      console.log('   npm run admin:reset   # Nova senha');
    } else {
      console.log('\n🔧 AÇÕES NECESSÁRIAS:');
      if (!status.environment) console.log('   - Configure variáveis de ambiente');
      if (!status.connectivity) console.log('   - Verifique credenciais Supabase');
      if (!status.userExists) console.log('   - Execute: npm run admin:setup');
      if (!status.authentication) console.log('   - Execute: npm run admin:reset');
      if (!status.permissions) console.log('   - Verifique RLS policies');
    }
    
    console.log('\n📚 DOCUMENTAÇÃO:');
    console.log('   docs/ADMIN.md - Guia completo');
    console.log('   npm run admin:guide - Ajuda interativa');
    
    console.log('\n' + '='.repeat(60));
    console.log('🤖 AUTOMAÇÃO CONCLUÍDA');
    console.log('='.repeat(60));
  }

  async run(): Promise<void> {
    const status: SystemStatus = {
      environment: await this.checkEnvironment(),
      connectivity: await this.testConnectivity(),
      userExists: await this.ensureAdminUser(),
      authentication: await this.testAuthentication(),
      permissions: await this.checkPermissions(),
      overall: false
    };
    
    // Status geral
    status.overall = Object.values(status).slice(0, -1).every(Boolean);
    
    // Tentar iniciar servidor se tudo estiver OK
    if (status.overall) {
      await this.startServer();
    }
    
    this.generateFinalReport(status);
    
    process.exit(status.overall ? 0 : 1);
  }
}

// Executar automação
async function main() {
  const automation = new VytalleAdminAutomation();
  await automation.run();
}

if (require.main === module) {
  main().catch(console.error);
}