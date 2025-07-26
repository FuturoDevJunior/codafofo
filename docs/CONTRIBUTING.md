# 🤝 Guia de Contribuição - Vytalle Estética

> **Como contribuir de forma eficiente, segura e padronizada**

## 📋 Índice

- [Fluxo de Contribuição](#fluxo-de-contribuição)
- [Checklist de Pull Request](#checklist-de-pull-request)
- [Padrão de Branches](#padrão-de-branches)
- [Padrão de Commits](#padrão-de-commits)
- [Como Rodar Testes](#como-rodar-testes)
- [Como Rodar Lint e Type-Check](#como-rodar-lint-e-type-check)
- [Como Sugerir Features](#como-sugerir-features)
- [Como Reportar Bugs](#como-reportar-bugs)
- [Código de Conduta](#código-de-conduta)

---

## 🚀 Fluxo de Contribuição

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie** uma branch descritiva
   - Exemplo: `feat/admin-dashboard`, `fix/product-image-upload`
4. **Desenvolva** seguindo os padrões do projeto
5. **Rode todos os testes** localmente
6. **Rode lint e type-check**
7. **Commit** seguindo Conventional Commits
8. **Push** para seu fork
9. **Abra um Pull Request** para `main` com descrição clara
10. **Aguarde revisão** e faça ajustes se necessário

---

## ✅ Checklist de Pull Request

- [ ] Código segue padrões do projeto
- [ ] Documentação atualizada
- [ ] Testes adicionados/atualizados
- [ ] Build de produção sem warnings
- [ ] Variáveis de ambiente documentadas
- [ ] Cobertura de testes mantida >95%
- [ ] PR com descrição clara do que foi feito
- [ ] Não há arquivos desnecessários (ex: .env, node_modules)

---

## 🌱 Padrão de Branches

- `main`: Produção
- `dev`: Desenvolvimento (opcional)
- `feat/<feature>`: Novas features
- `fix/<bug>`: Correções
- `docs/<doc>`: Documentação
- `test/<test>`: Testes
- `refactor/<refatoração>`: Refatoração

---

## 📝 Padrão de Commits

```bash
# Estrutura: <tipo>(<escopo>): <descrição>

# Funcionalidades
feat: adiciona sistema de carrinho
feat(admin): implementa painel de relatórios

# Correções
fix: corrige validação de formulário
fix(auth): resolve problema de login

# Refatoração
refactor: melhora performance do carrinho
refactor(api): simplifica endpoints

# Documentação
docs: atualiza README
docs(api): adiciona exemplos de uso

# Testes
test: adiciona testes para checkout
test(unit): cobre cenários de erro
```

- Use sempre o português nos commits.
- Commits pequenos e atômicos.
- Referencie issues quando aplicável: `fix: corrige bug no checkout (closes #12)`

---

## 🧪 Como Rodar Testes

```bash
# Todos os testes
npm run test

# Testes em modo watch
npm run test:watch

# Testes com cobertura
npm run test:coverage

# Testes E2E
npm run test:e2e

# Testes específicos
npm run test ProductCard
```

---

## 🧹 Como Rodar Lint e Type-Check

```bash
# Lint
npm run lint

# Corrigir automaticamente
npm run lint:fix

# Type-check
npm run type-check
```

---

## 💡 Como Sugerir Features

- Abra uma issue com o título `[Feature] <descrição>`
- Descreva o problema, a motivação e a solução proposta
- Se possível, adicione exemplos de uso

---

## 🐞 Como Reportar Bugs

- Abra uma issue com o título `[Bug] <descrição>`
- Descreva o erro, passos para reproduzir, comportamento esperado e prints/logs
- Informe ambiente (SO, navegador, versão do Node)

---

## 🤝 Código de Conduta

- Seja respeitoso e colaborativo
- Não serão tolerados comportamentos abusivos
- Siga o [Código de Conduta do projeto](./CODE_OF_CONDUCT.md) (se existir)

---

**Contribua para a excelência!** 