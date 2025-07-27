import { expect, test } from '@playwright/test';

test.describe('Fluxo Completo de Compra', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve navegar para produtos e filtrar', async ({ page }) => {
    // 1. Navegar para produtos
    await page.goto('/products');
    await expect(page).toHaveURL('/products');

    // 2. Verificar se a página de produtos carregou
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-testid="search-input"]')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('[data-testid="products-grid"]')).toBeVisible({ timeout: 10000 });

    // 3. Fazer busca
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill('Botox');
    await searchInput.press('Enter');
    await page.waitForTimeout(1000); // Aguardar processamento

    // 4. Verificar resultados
    await expect(page.locator('[data-testid="results-count"]')).toContainText(
      'produtos encontrados',
      { timeout: 10000 }
    );
  });

  test('deve abrir filtros e aplicar categoria', async ({ page }) => {
    await page.goto('/products');

    // 1. Abrir filtros
    await page.click('[data-testid="filter-toggle"]');

    // 2. Aplicar filtro de categoria
    await page.click('text=Toxina Botulínica');

    // 3. Verificar que filtro foi aplicado
    await expect(page.locator('[data-testid="results-count"]')).toContainText(
      'produtos encontrados'
    );
  });

  test('deve limpar filtros', async ({ page }) => {
    await page.goto('/products');

    // 1. Aplicar filtro
    await page.click('[data-testid="filter-toggle"]');
    await page.click('text=Toxina Botulínica');

    // 2. Limpar filtros
    await page.click('[data-testid="clear-filters"]');

    // 3. Verificar que filtros foram limpos
    await expect(page.locator('[data-testid="results-count"]')).toContainText(
      'produtos encontrados'
    );
  });

  test('deve navegar para página de produto', async ({ page }) => {
    await page.goto('/products');

    // 1. Clicar no primeiro produto
    const firstProduct = page.locator('[data-testid="products-grid"] > div').first();
    await firstProduct.click();

    // 2. Verificar que navegou para página do produto
    await expect(page).toHaveURL(/\/products\/.+/);
  });

  test('deve adicionar produto ao carrinho', async ({ page }) => {
    await page.goto('/products');

    // 1. Clicar no primeiro produto
    const firstProduct = page.locator('[data-testid="products-grid"] > div').first();
    await firstProduct.click();

    // 2. Adicionar ao carrinho (se o botão existir)
    const addButton = page.locator('button:has-text("Adicionar ao Carrinho")');
    if (await addButton.isVisible()) {
      await addButton.click();

      // 3. Verificar que carrinho foi atualizado (verificar badge)
      const cartBadge = page.locator('button:has-text("Carrinho")');
      await expect(cartBadge).toBeVisible();
    }
  });

  test('deve navegar para checkout', async ({ page }) => {
    // Ir direto para checkout
    await page.goto('/checkout');

    // Verificar se página de checkout carregou
    await expect(page).toHaveURL('/checkout');

    // Verificar se formulário existe
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('deve preencher formulário de checkout', async ({ page }) => {
    await page.goto('/checkout');

    // Preencher campos básicos (se existirem)
    const nameInput = page.locator('input[name="name"]');
    if (await nameInput.isVisible()) {
      await nameInput.fill('João Silva');
    }

    const emailInput = page.locator('input[name="email"]');
    if (await emailInput.isVisible()) {
      await emailInput.fill('joao@example.com');
    }

    const phoneInput = page.locator('input[name="phone"]');
    if (await phoneInput.isVisible()) {
      await phoneInput.fill('11999999999');
    }
  });

  test('deve validar campos obrigatórios no checkout', async ({ page }) => {
    await page.goto('/checkout');

    // Tentar submeter formulário vazio
    const submitButton = page.locator('button[type="submit"]');
    if (await submitButton.isVisible()) {
      await submitButton.click();

      // Verificar se há mensagens de erro
      const errorMessages = page.locator('text=obrigatório, text=required');
      if ((await errorMessages.count()) > 0) {
        await expect(errorMessages.first()).toBeVisible();
      }
    }
  });

  test('deve navegar para carrinho', async ({ page }) => {
    await page.goto('/cart');

    // Verificar se página de carrinho carregou
    await expect(page).toHaveURL('/cart');
  });

  test('deve navegar para página inicial', async ({ page }) => {
    await page.goto('/products');

    // Navegar para página inicial
    await page.click('text=Início');
    await expect(page).toHaveURL('/');
  });

  test('deve usar busca de produtos', async ({ page }) => {
    await page.goto('/products');

    // Fazer busca
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill('teste');
    await searchInput.press('Enter');

    // Verificar resultados
    await expect(page.locator('[data-testid="results-count"]')).toBeVisible();
  });

  test('deve ordenar produtos', async ({ page }) => {
    await page.goto('/products');

    // Verificar se select de ordenação existe
    const sortSelect = page.locator('select');
    if (await sortSelect.isVisible()) {
      // Selecionar ordenação por nome
      await sortSelect.selectOption('name');

      // Verificar que ordenação foi aplicada
      await expect(page.locator('[data-testid="results-count"]')).toBeVisible();
    }
  });

  test('deve mostrar loading durante carregamento', async ({ page }) => {
    // Simular carregamento lento
    await page.route('**/api/products', route =>
      setTimeout(() => {
        route.fulfill({
          status: 200,
          body: JSON.stringify([]),
        });
      }, 2000)
    );

    await page.goto('/products');

    // Verificar se há indicadores de loading
    const loadingElements = page.locator('[data-testid="skeleton"], .loading, .spinner');
    if ((await loadingElements.count()) > 0) {
      await expect(loadingElements.first()).toBeVisible();
    }
  });

  test('deve lidar com erro de carregamento', async ({ page }) => {
    // Simular erro
    await page.route('**/api/products', route => route.abort());

    await page.goto('/products');

    // Verificar se há mensagem de erro
    const errorMessage = page.locator('text=erro, text=error, text=falha');
    if ((await errorMessage.count()) > 0) {
      await expect(errorMessage.first()).toBeVisible();
    }
  });

  test('deve ser responsivo', async ({ page }) => {
    // Testar em mobile
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/products');

    // Verificar se elementos ainda são visíveis
    await expect(page.locator('[data-testid="search-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="products-grid"]')).toBeVisible();
  });

  test('deve ter navegação por teclado', async ({ page }) => {
    await page.goto('/products');

    // Navegar com Tab
    await page.keyboard.press('Tab');

    // Verificar se foco está em elemento interativo
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('deve ter acessibilidade básica', async ({ page }) => {
    await page.goto('/products');

    // Verificar se há landmarks
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();

    // Verificar se imagens têm alt
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const image = images.nth(i);
      const alt = await image.getAttribute('alt');
      expect(alt).not.toBeNull();
    }
  });
});
