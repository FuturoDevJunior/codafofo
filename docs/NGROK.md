# 🌐 Configuração do ngrok para Vytalle Estética

## 📋 Sobre

O ngrok está configurado para expor o desenvolvimento local do Vytalle Estética de forma segura, permitindo:
- Testes em dispositivos móveis reais
- Compartilhamento de versões de desenvolvimento
- Testes de webhook e APIs externas
- Demonstrações para clientes

## 🚀 Comandos Principais

### Desenvolvimento Rápido
```bash
# Exposição simples do desenvolvimento local
npm run dev:tunnel

# Iniciará o servidor dev na porta 5174 e criará túnel ngrok
# Acessível via URL gerada pelo ngrok (ex: https://abc123.ngrok.io)
```

### Exposição Customizada
```bash
# Túnel básico na porta 5174
npm run tunnel

# Com subdomínio personalizado (requer conta paga ngrok)
npm run expose

# HTTPS seguro para testes móveis
npm run tunnel:https
```

### Múltiplos Ambientes
```bash
# Desenvolvimento
npm run tunnel:dev

# Produção local (porta 3001)
npm run tunnel:prod
```

## ⚙️ Configuração

### 1. Configuração Básica
O arquivo `ngrok.yml` já está configurado com:
- Porta padrão 5174 (desenvolvimento Next.js)
- Headers corretos para localhost
- Interface web em localhost:4040
- Logs detalhados

### 2. Configuração Avançada (Opcional)
Para recursos premium, adicione seu token:

```bash
# Obtenha seu token em: https://dashboard.ngrok.com/get-started/your-authtoken
ngrok authtoken SEU_TOKEN_AQUI
```

Ou edite o `ngrok.yml`:
```yaml
authtoken: SEU_TOKEN_AQUI
```

### 3. Subdомains Personalizados
```bash
# Requer conta paga do ngrok
npm run expose
# Criará: https://vytalle.ngrok.io
```

## 📱 Testando em Dispositivos Móveis

### 1. Inicie o túnel
```bash
npm run dev:tunnel
```

### 2. Copie a URL gerada
```
Forwarding: https://abc123.ngrok.io -> http://localhost:5174
```

### 3. Acesse no seu celular
- Abra o navegador móvel
- Digite a URL: `https://abc123.ngrok.io`
- Teste todas as funcionalidades

### 4. Interface de Monitoramento
- Acesse: `http://localhost:4040`
- Monitore requests em tempo real
- Debug problemas de conectividade

## 🔧 Scripts Disponíveis

| Script | Descrição | Uso |
|--------|-----------|-----|
| `npm run tunnel` | Túnel básico com configuração personalizada | Desenvolvimento |
| `npm run dev:tunnel` | Dev server + túnel automático | Teste rápido |
| `npm run tunnel:dev` | Túnel nomeado para desenvolvimento | Desenvolvimento |
| `npm run tunnel:prod` | Túnel para produção local | Testes de produção |
| `npm run tunnel:https` | Forçar HTTPS | Testes seguros |
| `npm run expose` | Subdomínio personalizado | Demonstrações |

## 🛡️ Segurança

### Boas Práticas
- ✅ Use apenas em ambiente de desenvolvimento
- ✅ Não exponha dados sensíveis
- ✅ Monitore acessos na interface web (localhost:4040)
- ✅ Feche túneis quando não estiver usando

### Dados Protegidos
- ❌ Variáveis de ambiente não são expostas
- ❌ Arquivos .env permanecem locais
- ❌ Banco Supabase mantém suas próprias regras de acesso

## 🌍 URLs de Produção vs Desenvolvimento

### Produção
- **Vercel**: https://vytalle-estetica.vercel.app
- **Estável**: URL fixa e pública

### Desenvolvimento (ngrok)
- **Local + ngrok**: https://abc123.ngrok.io (muda a cada restart)
- **Para testes**: URL temporária para desenvolvimento

## 🔍 Troubleshooting

### Erro: "tunnel session failed"
```bash
# Pare todos os processos ngrok
pkill ngrok

# Reinicie o túnel
npm run dev:tunnel
```

### Erro: "port already in use"
```bash
# Verifique se o Next.js está rodando
lsof -i :5174

# Mate o processo se necessário
kill -9 PID_DO_PROCESSO

# Reinicie
npm run dev:tunnel
```

### Interface web não carrega
```bash
# Verifique se o ngrok está rodando
curl http://localhost:4040

# Se não estiver, reinicie o túnel
npm run tunnel
```

## 📊 Monitoramento

### Interface Web do ngrok
- **URL**: http://localhost:4040
- **Features**:
  - Requests em tempo real
  - Response times
  - Headers HTTP
  - Body das requisições
  - Replay de requests

### Logs
```bash
# Ver logs detalhados
ngrok http 5174 --log stdout

# Logs em arquivo
ngrok http 5174 --log-level debug --log-format json
```

## 💡 Casos de Uso

### 1. Teste em Dispositivos Móveis
```bash
npm run dev:tunnel
# Teste carrinho, checkout, WhatsApp em smartphones
```

### 2. Demonstração para Cliente
```bash
npm run expose
# Compartilhe URL fixa: https://vytalle.ngrok.io
```

### 3. Webhook Testing
```bash
npm run tunnel:https
# Teste integrações com APIs externas que exigem HTTPS
```

### 4. Performance Testing
```bash
npm run tunnel:dev
# Use ferramentas como GTMetrix, PageSpeed com a URL ngrok
```

## 🎯 Próximos Passos

1. **Configure seu token ngrok** para recursos premium
2. **Teste em múltiplos dispositivos** usando os túneis
3. **Monitore performance** via interface web
4. **Documente problemas** encontrados durante testes

---

*Documentação atualizada em Janeiro 2025 - Projeto Vytalle Estética*