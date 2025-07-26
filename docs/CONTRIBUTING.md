# 🤝 Guia de Contribuição - Vytalle Estética

> **Para desenvolvedores que buscam excelência e qualidade profissional**

## 📋 Índice

- [Antes de Começar](#antes-de-começar)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Padrões de Código](#padrões-de-código)
- [Fluxo de Desenvolvimento](#fluxo-de-desenvolvimento)
- [Testes](#testes)
- [Commits e Versionamento](#commits-e-versionamento)
- [Pull Requests](#pull-requests)
- [Code Review](#code-review)
- [Deploy e Release](#deploy-e-release)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Antes de Começar

### Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git** >= 2.30.0
- **Supabase CLI** >= 1.0.0
- **Conhecimento em:**
  - React 18 + TypeScript
  - Next.js 15 (App Router)
  - Tailwind CSS
  - Supabase/PostgreSQL
  - Testes (Vitest, RTL, Playwright)

### Configuração Inicial

```bash
# Clone o repositório
git clone https://github.com/FuturoDevJunior/codafofo.git
cd codafofo

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# Inicialize o banco de dados
npm run db:init

# Inicie o servidor de desenvolvimento
npm run dev
```

---

## ⚙️ Configuração do Ambiente

### 1. Editor e Extensões Recomendadas

**VS Code Extensions:**
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "ms-vscode.vscode-eslint"
  ]
}
```

### 2. Configurações do VS Code

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

### 3. Git Hooks

O projeto usa Husky para hooks automáticos:

```bash
# Pre-commit: roda lint, type-check e testes
git commit -m "feat: nova funcionalidade"

# Pre-push: valida build de produção
git push origin main
```

---

## 📝 Padrões de Código

### 1. TypeScript

```typescript
// ✅ Bom
interface Product {
  id: string;
  name: string;
  price_pix: number;
  price_card: number;
  images: string[];
  category: ProductCategory;
  active: boolean;
}

// ❌ Evite
interface Product {
  id: any;
  name: string;
  price: number; // vago
  images: any[];
}
```

### 2. React Components

```typescript
// ✅ Componente funcional com TypeScript
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  className?: string;
}

export function ProductCard({ 
  product, 
  onAddToCart, 
  className 
}: ProductCardProps) {
  const handleAddToCart = useCallback(() => {
    onAddToCart(product);
  }, [product, onAddToCart]);

  return (
    <div className={cn("product-card", className)}>
      {/* JSX */}
    </div>
  );
}
```

### 3. Hooks Customizados

```typescript
// ✅ Hook customizado
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
```

### 4. Styling (Tailwind CSS)

```typescript
// ✅ Classes organizadas
const buttonClasses = cn(
  "inline-flex items-center justify-center",
  "px-4 py-2 text-sm font-medium",
  "rounded-md shadow-sm",
  "focus:outline-none focus:ring-2 focus:ring-offset-2",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  {
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500": variant === "primary",
    "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500": variant === "secondary",
  }
);
```

---

## 🔄 Fluxo de Desenvolvimento

### 1. Criação de Branch

```bash
# Sempre crie branch a partir da main
git checkout main
git pull origin main

# Crie branch com nome descritivo
git checkout -b feat/nova-funcionalidade
git checkout -b fix/correcao-bug
git checkout -b refactor/melhoria-codigo
```

### 2. Desenvolvimento

```bash
# Desenvolva sua funcionalidade
npm run dev

# Rode testes durante desenvolvimento
npm run test:watch

# Verifique qualidade do código
npm run lint
npm run type-check
```

### 3. Commit Frequente

```bash
# Commits pequenos e frequentes
git add .
git commit -m "feat: adiciona validação de formulário"

git add .
git commit -m "test: adiciona testes para validação"

git add .
git commit -m "refactor: melhora performance do componente"
```

---

## 🧪 Testes

### 1. Estrutura de Testes

```
tests/
├── unit/           # Testes unitários
├── integration/    # Testes de integração
├── e2e/           # Testes end-to-end
└── fixtures/      # Dados de teste
```

### 2. Padrões de Teste

```typescript
// ✅ Teste bem estruturado
describe('ProductCard', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Botox 50U',
    price_pix: 530,
    price_card: 580,
    images: ['/images/botox.jpg'],
    category: 'Toxina Botulínica',
    active: true
  };

  it('deve renderizar produto corretamente', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Botox 50U')).toBeInTheDocument();
    expect(screen.getByText('R$ 530,00')).toBeInTheDocument();
  });

  it('deve chamar onAddToCart ao clicar no botão', async () => {
    const onAddToCart = vi.fn();
    const user = userEvent.setup();
    
    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />);
    
    await user.click(screen.getByRole('button', { name: /adicionar/i }));
    
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
```

### 3. Comandos de Teste

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

## 📝 Commits e Versionamento

### 1. Conventional Commits

```bash
# Estrutura: <tipo>(<escopo>): <descrição>

# Funcionalidades
git commit -m "feat: adiciona sistema de carrinho"
git commit -m "feat(admin): implementa painel de relatórios"

# Correções
git commit -m "fix: corrige validação de formulário"
git commit -m "fix(auth): resolve problema de login"

# Refatoração
git commit -m "refactor: melhora performance do carrinho"
git commit -m "refactor(api): simplifica endpoints"

# Documentação
git commit -m "docs: atualiza README"
git commit -m "docs(api): adiciona exemplos de uso"

# Testes
git commit -m "test: adiciona testes para checkout"
git commit -m "test(unit): cobre cenários de erro"

# Build/Deploy
git commit -m "build: atualiza dependências"
git commit -m "ci: adiciona teste de segurança"
```

### 2. Tipos de Commit

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat: adiciona checkout WhatsApp` |
| `fix` | Correção de bug | `fix: corrige cálculo de desconto` |
| `refactor` | Refatoração | `refactor: otimiza queries do banco` |
| `docs` | Documentação | `docs: atualiza guia de deploy` |
| `test` | Testes | `test: adiciona testes E2E` |
| `build` | Build/Deploy | `build: atualiza Next.js` |
| `ci` | CI/CD | `ci: adiciona teste de segurança` |
| `perf` | Performance | `perf: otimiza carregamento de imagens` |
| `style` | Formatação | `style: aplica Prettier` |
| `chore` | Manutenção | `chore: atualiza dependências` |

---

## 🔄 Pull Requests

### 1. Template de PR

```markdown
## 📋 Descrição
Breve descrição das mudanças implementadas.

## 🎯 Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Refatoração
- [ ] Documentação
- [ ] Testes

## 🧪 Testes
- [ ] Testes unitários passando
- [ ] Testes de integração passando
- [ ] Testes E2E passando
- [ ] Cobertura mantida >95%

## 📸 Screenshots (se aplicável)
Adicione screenshots das mudanças visuais.

## ✅ Checklist
- [ ] Código segue padrões do projeto
- [ ] Documentação atualizada
- [ ] Testes adicionados/atualizados
- [ ] Build de produção sem warnings
- [ ] Variáveis de ambiente documentadas

## 🔗 Issues Relacionadas
Closes #123
```

### 2. Processo de Review

1. **Auto-review**: Revise seu próprio código antes de submeter
2. **Testes**: Certifique-se que todos os testes passam
3. **Documentação**: Atualize documentação se necessário
4. **Submissão**: Crie PR com descrição clara
5. **Review**: Aguarde feedback e responda comentários
6. **Merge**: Após aprovação, merge na main

---

## 👀 Code Review

### 1. Checklist de Review

- [ ] **Funcionalidade**: O código faz o que deveria?
- [ ] **Performance**: Há impactos de performance?
- [ ] **Segurança**: Há vulnerabilidades?
- [ ] **Testes**: Cobertura adequada?
- [ ] **Documentação**: Comentários claros?
- [ ] **Padrões**: Segue convenções do projeto?
- [ ] **Acessibilidade**: WCAG 2.1 AA?
- [ ] **Mobile**: Responsivo?

### 2. Comentários Construtivos

```markdown
✅ Bom comentário:
"Consider using useCallback here to prevent unnecessary re-renders of child components."

❌ Comentário ruim:
"This is wrong."
```

---

## 🚀 Deploy e Release

### 1. Deploy Automático

```bash
# Push na main dispara deploy automático
git push origin main

# Verifique status no Vercel
# https://vercel.com/dashboard
```

### 2. Release Manual

```bash
# Crie tag de release
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0

# Ou use GitHub Releases
# https://github.com/FuturoDevJunior/codafofo/releases
```

### 3. Rollback

```bash
# Rollback para versão anterior
git revert HEAD
git push origin main

# Ou via Vercel Dashboard
# https://vercel.com/dashboard
```

---

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Build Falha

```bash
# Limpe cache
rm -rf .next
rm -rf node_modules/.cache
npm install

# Verifique TypeScript
npm run type-check

# Verifique lint
npm run lint
```

#### 2. Testes Falham

```bash
# Limpe cache dos testes
npm run test -- --clearCache

# Rode testes específicos
npm run test ProductCard

# Verifique cobertura
npm run test:coverage
```

#### 3. Banco de Dados

```bash
# Reset completo
npx supabase db reset --linked --yes

# Aplique migrations
npx supabase db push

# Verifique status
npx supabase status
```

#### 4. Variáveis de Ambiente

```bash
# Verifique arquivo .env.local
cat .env.local

# Teste conexão Supabase
npx supabase status
```

---

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/FuturoDevJunior/codafofo/issues)
- **E-mail**: contato.ferreirag@outlook.com


---

## 🏆 Boas Práticas

### 1. Código Limpo

- Funções pequenas e focadas
- Nomes descritivos
- Comentários quando necessário
- DRY (Don't Repeat Yourself)

### 2. Performance

- Lazy loading de componentes
- Otimização de imagens
- Bundle size < 350kB
- Core Web Vitals

### 3. Segurança

- Validação de inputs
- Sanitização de dados
- HTTPS sempre
- Headers de segurança

### 4. Acessibilidade

- WCAG 2.1 AA
- Navegação por teclado
- Screen readers
- Contraste adequado

---

## 📚 Recursos Adicionais

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vitest Docs](https://vitest.dev)
- [Testing Library](https://testing-library.com/docs)

---

**Obrigado por contribuir para o Vytalle Estética! 🚀** 