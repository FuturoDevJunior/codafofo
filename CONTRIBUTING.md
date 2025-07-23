# Diretrizes de Contribuição Interna - Vytalle Estética

Este documento fornece diretrizes para a equipe de desenvolvimento que trabalha no projeto Vytalle Estética. O objetivo é manter a consistência, a qualidade do código e a eficiência do fluxo de trabalho.

## 🚀 Fluxo de Desenvolvimento

1.  **Crie uma Branch:** Sempre crie uma nova branch a partir da `main` para cada nova funcionalidade, correção ou tarefa.
    ```bash
    git checkout -b <tipo>/<nome-da-tarefa>
    ```
    -   **Exemplos:**
        -   `feat/checkout-pix`
        -   `fix/bug-login-form`
        -   `docs/atualizar-readme`

2.  **Desenvolva:** Implemente sua funcionalidade ou correção.
    -   Instale as dependências: `npm install`
    -   Inicie o servidor de desenvolvimento: `npm run dev`

3.  **Teste:** Antes de commitar, certifique-se de que todos os testes estão passando.
    ```bash
    npm test
    npm run lint
    npm run type-check
    ```

4.  **Commite:** Utilize o padrão de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
    -   **Formato:** `<tipo>(<escopo>): <descrição>`
    -   **Tipos comuns:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
    -   **Exemplo:** `feat(checkout): adiciona opção de pagamento com PIX`

5.  **Abra um Pull Request (PR):** Envie sua branch para o repositório e abra um PR direcionado à `main`. Descreva claramente as alterações e, se aplicável, vincule a uma tarefa ou issue.

## 📦 Supabase Local

Para desenvolver e testar com uma instância local da Supabase, siga estes passos:

1.  **Inicie a Supabase:**
    ```bash
    npx supabase start
    ```
    Este comando irá iniciar os containers Docker da Supabase e fornecer as credenciais locais (URL e chaves `anon` e `service_role`).

2.  **Use as credenciais locais:** Copie a URL e as chaves fornecidas no terminal e cole-as no seu arquivo `.env.local`.

3.  **Aplicar Migrations:** Para garantir que seu banco de dados local esteja atualizado com a estrutura mais recente:
    ```bash
    npx supabase db reset
    ```

4.  **Parar a Supabase:**
    ```bash
    npx supabase stop
    ```

## 🎨 Estilo de Código

-   Siga as regras definidas no `.eslintrc.json`.
-   Utilize as classes e o sistema de design definidos no `tailwind.config.js`.
-   Mantenha os componentes o mais reutilizáveis e desacoplados possível.

Obrigado por manter nosso código limpo e organizado! 

## ✅ Checklist de Revisão de PR
- [ ] Todos os testes passam (`npm test`)
- [ ] Lint e type-check sem erros (`npm run lint`, `npm run type-check`)
- [ ] Cobertura de testes >95%
- [ ] Documentação atualizada
- [ ] Commits no padrão Conventional Commits

## 🌱 Exemplos de Branch
- feat/checkout-pix
- fix/bug-login-form
- docs/atualizar-readme

## 🧹 Antes de abrir PR
```bash
npm run lint
npm run type-check
``` 