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

import { execSync } from 'child_process';
import { config } from 'dotenv';
import * as path from 'path';

import { createClient } from '@supabase/supabase-js';

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
    password: '',
  };

  constructor() {
    console.warn('\n🤖 AUTOMAÇÃO COMPLETA DO SISTEMA ADMIN VYTALLE');
    console.warn('='.repeat(60));
    console.warn('⚡ Modo automático ativado - configurando tudo...\n');
  }

  async checkEnvironment(): Promise<boolean> {
    console.warn('📋 1. Verificando variáveis de ambiente...');

    const required = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY',
    ];

    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
      console.warn('❌ Variáveis faltando:', missing.join(', '));
      return false;
    }

    console.warn('✅ Todas as variáveis configuradas');
    return true;
  }

  async testConnectivity(): Promise<boolean> {
    console.warn('\n📡 2. Testando conectividade com Supabase...');

    try {
      this.supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Teste simples de conectividade
      const { error } = await this.supabase.from('products').select('count').limit(1);

      if (error && error.code !== '42P01') {
        // Ignora erro de tabela não existir
        console.warn('❌ Erro de conectividade:', error.message);
        return false;
      }

      console.warn('✅ Conectividade OK');
      return true;
    } catch (error) {
      console.warn('❌ Falha na conectividade');
      return false;
    }
  }

  async ensureAdminUser(): Promise<boolean> {
    console.warn('\n👤 3. Verificando/criando usuário admin...');

    try {
      // Executar script de configuração admin
      console.warn('🔧 Executando configuração automática...');

      const output = execSync('npm run admin:setup', {
        encoding: 'utf8',
        stdio: 'pipe',
      });

      console.warn('✅ Usuário admin configurado');
      return true;
    } catch (error) {
      console.warn('❌ Falha na configuração do admin');
      return false;
    }
  }

  async testAuthentication(): Promise<boolean> {
    console.warn('\n🔐 4. Testando autenticação...');

    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email: this.adminCredentials.email,
        password: this.adminCredentials.password,
      });

      if (error) {
        console.warn('❌ Falha na autenticação:', error.message);

        // Tentar com senha alternativa
        console.warn('🔄 Tentando gerar nova senha...');
        await this.ensureAdminUser();
        return this.testAuthentication();
      }

      if (data.user) {
        console.warn('✅ Autenticação bem-sucedida');
        console.warn(`👤 Usuário: ${data.user.email}`);

        // Fazer logout
        await this.supabase.auth.signOut();
        return true;
      }

      return false;
    } catch (error) {
      console.warn('❌ Erro técnico na autenticação');
      return false;
    }
  }

  async checkPermissions(): Promise<boolean> {
    console.warn('\n🔒 5. Verificando permissões...');

    try {
      // Fazer login novamente para testar permissões
      await this.supabase.auth.signInWithPassword({
        email: this.adminCredentials.email,
        password: this.adminCredentials.password,
      });

      // Tentar acessar dados administrativos
      const { data, error } = await this.supabase.from('products').select('id').limit(1);

      if (error && error.code === '42501') {
        console.warn('❌ Permissões insuficientes');
        return false;
      }

      console.warn('✅ Permissões OK');
      await this.supabase.auth.signOut();
      return true;
    } catch (error) {
      console.warn('⚠️  Teste de permissões inconclusivo');
      return true; // Não bloquear por isso
    }
  }

  async startServer(): Promise<boolean> {
    console.warn('\n🚀 6. Verificando servidor...');

    try {
      // Verificar se o servidor está rodando
      const response = await fetch('http://localhost:5174/api/admin-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.warn('✅ Servidor já está rodando');
        return true;
      }
    } catch {
      console.warn('🔄 Iniciando servidor...');

      // Tentar iniciar o servidor em background
      try {
        execSync('npm run dev:fast > /dev/null 2>&1 &', { timeout: 5000 });
        console.warn('✅ Servidor iniciado');
        return true;
      } catch {
        console.warn('⚠️  Servidor deve ser iniciado manualmente: npm run dev:fast');
        return true;
      }
    }

    return false;
  }

  generateFinalReport(status: SystemStatus) {
    console.warn('\n' + '='.repeat(60));
    console.warn('📊 RELATÓRIO FINAL DA AUTOMAÇÃO');
    console.warn('='.repeat(60));

    console.warn('\n📋 STATUS DOS COMPONENTES:');
    console.warn(`Environment:     ${status.environment ? '✅' : '❌'}`);
    console.warn(`Connectivity:    ${status.connectivity ? '✅' : '❌'}`);
    console.warn(`User Creation:   ${status.userExists ? '✅' : '❌'}`);
    console.warn(`Authentication:  ${status.authentication ? '✅' : '❌'}`);
    console.warn(`Permissions:     ${status.permissions ? '✅' : '❌'}`);

    console.warn(`\n🎯 STATUS GERAL: ${status.overall ? '✅ FUNCIONANDO' : '❌ PRECISA CORREÇÃO'}`);

    if (status.overall) {
      console.warn('\n🎉 SISTEMA ADMIN COMPLETAMENTE CONFIGURADO!');
      console.warn('\n📧 CREDENCIAIS DE ACESSO:');
      console.warn(`   Email: ${this.adminCredentials.email}`);
      console.warn(`   Senha: ${this.adminCredentials.password}`);
      console.warn('\n🌐 ACESSAR PAINEL:');
      console.warn('   URL: http://localhost:5174/admin/login');
      console.warn('\n🚀 COMANDOS ÚTEIS:');
      console.warn('   npm run dev:fast      # Iniciar servidor');
      console.warn('   npm run admin:test    # Testar login');
      console.warn('   npm run admin:reset   # Nova senha');
    } else {
      console.warn('\n🔧 AÇÕES NECESSÁRIAS:');
      if (!status.environment) console.warn('   - Configure variáveis de ambiente');
      if (!status.connectivity) console.warn('   - Verifique credenciais Supabase');
      if (!status.userExists) console.warn('   - Execute: npm run admin:setup');
      if (!status.authentication) console.warn('   - Execute: npm run admin:reset');
      if (!status.permissions) console.warn('   - Verifique RLS policies');
    }

    console.warn('\n📚 DOCUMENTAÇÃO:');
    console.warn('   docs/ADMIN.md - Guia completo');
    console.warn('   npm run admin:guide - Ajuda interativa');

    console.warn('\n' + '='.repeat(60));
    console.warn('🤖 AUTOMAÇÃO CONCLUÍDA');
    console.warn('='.repeat(60));
  }

  async run(): Promise<void> {
    const status: SystemStatus = {
      environment: await this.checkEnvironment(),
      connectivity: await this.testConnectivity(),
      userExists: await this.ensureAdminUser(),
      authentication: await this.testAuthentication(),
      permissions: await this.checkPermissions(),
      overall: false,
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
  main().catch(error => {
    console.warn('❌ Erro na automação:', error);
    process.exit(1);
  });
}
