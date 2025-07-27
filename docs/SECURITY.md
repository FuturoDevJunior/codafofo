# 🛡️ Guia de Segurança - Vytalle Estética

> **Políticas, práticas e proteções de segurança para a plataforma**

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Autenticação](#autenticação)
- [Autorização](#autorização)
- [Proteção de Dados](#proteção-de-dados)
- [Validação de Inputs](#validação-de-inputs)
- [Headers de Segurança](#headers-de-segurança)
- [Auditoria](#auditoria)
- [Monitoramento](#monitoramento)
- [Incidentes](#incidentes)
- [Checklist](#checklist)

---

## 🎯 Visão Geral

A segurança é fundamental para uma plataforma médica. Implementamos múltiplas
camadas de proteção:

### Princípios de Segurança

- **Defesa em Profundidade**: Múltiplas camadas de proteção
- **Princípio do Menor Privilégio**: Acesso mínimo necessário
- **Zero Trust**: Nunca confiar, sempre verificar
- **Segurança por Design**: Segurança desde o início
- **Transparência**: Logs e auditoria completos

---

## 🔐 Autenticação

### Supabase Auth

```typescript
// ✅ Cliente autenticado
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

// Login seguro
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@vytalle.com',
  password: 'senha-segura-123',
});

// Verificar sessão
const {
  data: { session },
} = await supabase.auth.getSession();

// Logout
await supabase.auth.signOut();
```

### Middleware de Autenticação

```typescript
// ✅ Proteção de rotas
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Proteger rotas admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return res;
}
```

---

## 🔒 Autorização

### Row Level Security (RLS)

```sql
-- ✅ Políticas de acesso
CREATE POLICY "Produtos públicos" ON products
  FOR SELECT USING (active = true);

CREATE POLICY "Produtos admin" ON products
  FOR ALL USING (
    auth.role() = 'authenticated' AND
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Pedidos admin" ON orders
  FOR ALL USING (
    auth.role() = 'authenticated' AND
    auth.jwt() ->> 'role' = 'admin'
  );
```

### Controle de Acesso por Role

```typescript
// ✅ Verificação de permissões
export function usePermissions() {
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';
  const canEditProducts = isAdmin;
  const canViewOrders = isAdmin;
  const canManageUsers = isAdmin;

  return {
    isAdmin,
    canEditProducts,
    canViewOrders,
    canManageUsers,
  };
}
```

---

## 🛡️ Proteção de Dados

### Criptografia

```typescript
// ✅ Criptografia de dados sensíveis
import crypto from 'crypto';

export function encryptData(data: string, key: string): string {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decryptData(encryptedData: string, key: string): string {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
```

### Sanitização

```typescript
// ✅ Sanitização de HTML
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target'],
  });
}

// ✅ Escape de dados
export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```

---

## ✅ Validação de Inputs

### Schemas de Validação

```typescript
import { z } from 'zod';

// ✅ Schema rigoroso
const ProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome muito longo')
    .regex(/^[a-zA-Z0-9\s\-]+$/, 'Caracteres inválidos'),

  price_pix: z
    .number()
    .positive('Preço deve ser positivo')
    .max(100000, 'Preço muito alto'),

  category: z.enum(['toxina', 'preenchedor', 'bioestimulador']),

  images: z
    .array(z.string().url())
    .min(1, 'Pelo menos uma imagem')
    .max(10, 'Máximo 10 imagens'),
});

// ✅ Validação de API
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = ProductSchema.parse(body);

    // Processar dados validados
    const result = await createProduct(validatedData);

    return Response.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }
    throw error;
  }
}
```

---

## 🛡️ Headers de Segurança

### Next.js Config

```javascript
// ✅ next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self';
      connect-src 'self' https://*.supabase.co;
      frame-ancestors 'none';
    `
      .replace(/\s+/g, ' ')
      .trim(),
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

## 📝 Auditoria

### Logs de Auditoria

```typescript
// ✅ Sistema de logs
import { logger } from '@/lib/logger';

export function auditLog(action: string, userId: string, details: any) {
  logger.info('Audit Log', {
    action,
    userId,
    details,
    timestamp: new Date().toISOString(),
    ip: getClientIP(),
    userAgent: getUserAgent(),
  });
}

// ✅ Log de ações críticas
export function logCriticalAction(action: string, data: any) {
  logger.warn('Critical Action', {
    action,
    data,
    timestamp: new Date().toISOString(),
    severity: 'HIGH',
  });
}
```

### Tabela de Auditoria

```sql
-- ✅ Tabela de auditoria
CREATE TABLE audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(50),
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ✅ Trigger para auditoria automática
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values
  ) VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 📊 Monitoramento

### Health Checks

```typescript
// ✅ Health check completo
export async function GET() {
  const checks = {
    database: false,
    auth: false,
    storage: false,
    external: false,
  };

  try {
    // Verificar banco
    const supabase = createClient();
    await supabase.from('products').select('count').limit(1);
    checks.database = true;

    // Verificar auth
    const {
      data: { session },
    } = await supabase.auth.getSession();
    checks.auth = true;

    // Verificar storage
    await supabase.storage.listBuckets();
    checks.storage = true;

    // Verificar serviços externos
    const response = await fetch('https://api.external.com/health');
    checks.external = response.ok;

    const isHealthy = Object.values(checks).every(Boolean);

    return Response.json(
      {
        status: isHealthy ? 'healthy' : 'unhealthy',
        checks,
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version,
      },
      {
        status: isHealthy ? 200 : 503,
      }
    );
  } catch (error) {
    return Response.json(
      {
        status: 'unhealthy',
        error: error.message,
        checks,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
```

### Alertas de Segurança

```typescript
// ✅ Sistema de alertas
export function securityAlert(type: string, details: any) {
  const alert = {
    type,
    details,
    timestamp: new Date().toISOString(),
    severity: getSeverity(type),
  };

  // Log crítico
  logger.error('Security Alert', alert);

  // Notificar admin (em produção)
  if (process.env.NODE_ENV === 'production') {
    notifyAdmin(alert);
  }
}

function getSeverity(type: string): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
  const severityMap = {
    failed_login: 'MEDIUM',
    suspicious_activity: 'HIGH',
    data_breach: 'CRITICAL',
    unauthorized_access: 'HIGH',
  };
  return severityMap[type] || 'LOW';
}
```

---

## 🚨 Incidentes

### Plano de Resposta

```typescript
// ✅ Procedimento de emergência
export async function handleSecurityIncident(incident: SecurityIncident) {
  // 1. Isolar o problema
  await isolateThreat(incident);

  // 2. Notificar equipe
  await notifyTeam(incident);

  // 3. Coletar evidências
  const evidence = await collectEvidence(incident);

  // 4. Implementar correção
  await implementFix(incident);

  // 5. Documentar incidente
  await documentIncident(incident, evidence);

  // 6. Monitorar recuperação
  await monitorRecovery(incident);
}

// ✅ Tipos de incidentes
interface SecurityIncident {
  id: string;
  type: 'data_breach' | 'unauthorized_access' | 'malware' | 'ddos';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  timestamp: Date;
  affectedSystems: string[];
}
```

### Comandos de Emergência

```bash
# ✅ Isolar sistema
npm run security:isolate

# ✅ Backup de emergência
npm run backup:emergency

# ✅ Rollback de segurança
npm run security:rollback

# ✅ Notificar equipe
npm run security:notify
```

---

## ✅ Checklist de Segurança

### Desenvolvimento

- [ ] Validação rigorosa de inputs
- [ ] Sanitização de dados
- [ ] Criptografia de dados sensíveis
- [ ] Controle de acesso por role
- [ ] Logs de auditoria
- [ ] Headers de segurança
- [ ] HTTPS obrigatório
- [ ] Rate limiting
- [ ] Proteção contra CSRF
- [ ] Proteção contra XSS

### Deploy

- [ ] Variáveis de ambiente seguras
- [ ] Secrets management
- [ ] Backup automático
- [ ] Monitoramento ativo
- [ ] Alertas configurados
- [ ] Health checks
- [ ] Rollback preparado
- [ ] Documentação atualizada

### Manutenção

- [ ] Atualizações de segurança
- [ ] Auditoria regular
- [ ] Testes de penetração
- [ ] Análise de vulnerabilidades
- [ ] Treinamento da equipe
- [ ] Políticas atualizadas
- [ ] Incidentes documentados
- [ ] Melhorias contínuas

---

## 📚 Recursos

### Ferramentas de Segurança

- **[OWASP ZAP](https://owasp.org/www-project-zap/)** - Teste de segurança
- **[Snyk](https://snyk.io)** - Análise de vulnerabilidades
- **[SonarQube](https://www.sonarqube.org)** - Qualidade de código
- **[Burp Suite](https://portswigger.net/burp)** - Teste de aplicações

### Documentação

- **[OWASP Top 10](https://owasp.org/www-project-top-ten/)** - Vulnerabilidades
  críticas
- **[NIST Cybersecurity](https://www.nist.gov/cyberframework)** - Framework de
  segurança
- **[ISO 27001](https://www.iso.org/isoiec-27001-information-security.html)** -
  Gestão de segurança

---

**Segurança é prioridade, não opção! 🛡️**
