import { expect, test } from '@playwright/test';

test.describe('Testes de Acessibilidade', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve ter navegação por teclado', async ({ page }) => {
    // Verificar navegação por Tab
    await page.keyboard.press('Tab');
    await expect(page.locator('a[href="/"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('text=Ver Produtos')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('text=Contato')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="cart-button"]')).toBeFocused();
  });

  test('deve ter navegação por teclado em produtos', async ({ page }) => {
    await page.click('text=Ver Produtos');

    // Navegar pelos produtos com Tab
    await page.keyboard.press('Tab');
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    await expect(firstProduct).toBeFocused();

    // Navegar com setas
    await page.keyboard.press('ArrowRight');
    const secondProduct = page.locator('[data-testid="product-card"]').nth(1);
    await expect(secondProduct).toBeFocused();

    // Selecionar produto com Enter
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/products\/.+/);
  });

  test('deve ter labels e descrições adequadas', async ({ page }) => {
    // Verificar labels dos formulários
    await page.goto('/checkout');

    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toHaveAttribute('aria-label', 'Nome completo');

    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toHaveAttribute('aria-label', 'Email');

    const phoneInput = page.locator('input[name="phone"]');
    await expect(phoneInput).toHaveAttribute('aria-label', 'Telefone');
  });

  test('deve ter contraste adequado', async ({ page }) => {
    // Verificar contraste do texto principal
    const mainText = page.locator('body');
    const color = await mainText.evaluate(el => window.getComputedStyle(el).color);

    // Verificar que não é cinza claro
    expect(color).not.toBe('rgb(128, 128, 128)');
  });

  test('deve ter tamanho de fonte adequado', async ({ page }) => {
    // Verificar tamanho mínimo da fonte
    const body = page.locator('body');
    const fontSize = await body.evaluate(el => window.getComputedStyle(el).fontSize);

    // Converter para pixels e verificar mínimo de 16px
    const fontSizePx = parseFloat(fontSize);
    expect(fontSizePx).toBeGreaterThanOrEqual(16);
  });

  test('deve ter foco visível', async ({ page }) => {
    // Verificar se o foco é visível
    await page.keyboard.press('Tab');

    const focusedElement = page.locator(':focus');
    const outline = await focusedElement.evaluate(el => window.getComputedStyle(el).outline);

    // Verificar que há outline ou border
    expect(outline).not.toBe('none');
  });

  test('deve ter skip links', async ({ page }) => {
    // Verificar skip link para conteúdo principal
    await page.keyboard.press('Tab');
    await expect(page.locator('a[href="#main-content"]')).toBeVisible();

    // Ativar skip link
    await page.keyboard.press('Enter');

    // Verificar que foco foi para conteúdo principal
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('deve ter landmarks semânticos', async ({ page }) => {
    // Verificar landmarks principais
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Verificar navegação
    await expect(page.locator('nav')).toBeVisible();
  });

  test('deve ter headings hierárquicos', async ({ page }) => {
    // Verificar estrutura de headings
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    const h2 = page.locator('h2');
    expect(await h2.count()).toBeGreaterThan(0);

    // Verificar que não há saltos na hierarquia
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    let currentLevel = 0;

    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const level = parseInt(tagName.charAt(1));

      // Verificar que não há saltos maiores que 1
      expect(level - currentLevel).toBeLessThanOrEqual(1);
      currentLevel = level;
    }
  });

  test('deve ter alt text em imagens', async ({ page }) => {
    // Verificar imagens têm alt text
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      const alt = await image.getAttribute('alt');

      // Imagens decorativas podem ter alt vazio, mas devem ter o atributo
      expect(alt).not.toBeNull();
    }
  });

  test('deve ter botões com texto descritivo', async ({ page }) => {
    // Verificar botões têm texto ou aria-label
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');

      // Botão deve ter texto ou aria-label
      expect(text?.trim() || ariaLabel).toBeTruthy();
    }
  });

  test('deve ter formulários acessíveis', async ({ page }) => {
    await page.goto('/checkout');

    // Verificar campos obrigatórios
    const requiredFields = page.locator('input[required], select[required], textarea[required]');
    const requiredCount = await requiredFields.count();

    for (let i = 0; i < requiredCount; i++) {
      const field = requiredFields.nth(i);
      const ariaRequired = await field.getAttribute('aria-required');

      // Campo obrigatório deve ter aria-required="true"
      expect(ariaRequired).toBe('true');
    }

    // Verificar mensagens de erro
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Verificar que mensagens de erro são anunciadas
    const errorMessages = page.locator('[role="alert"]');
    await expect(errorMessages).toBeVisible();
  });

  test('deve ter carrossel acessível', async ({ page }) => {
    // Verificar controles do carrossel
    const carousel = page.locator('[data-testid="carousel"]');
    if (await carousel.isVisible()) {
      // Verificar botões de navegação
      const prevButton = page.locator('[data-testid="carousel-prev"]');
      const nextButton = page.locator('[data-testid="carousel-next"]');

      await expect(prevButton).toHaveAttribute('aria-label', 'Slide anterior');
      await expect(nextButton).toHaveAttribute('aria-label', 'Próximo slide');

      // Verificar indicadores
      const indicators = page.locator('[data-testid="carousel-indicator"]');
      await expect(indicators).toBeVisible();
    }
  });

  test('deve ter modal acessível', async ({ page }) => {
    // Adicionar produto ao carrinho para mostrar modal
    await page.click('text=Ver Produtos');
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    await firstProduct.click();
    await page.click('button:has-text("Adicionar ao Carrinho")');

    // Verificar modal
    const modal = page.locator('[data-testid="upsell-modal"]');
    if (await modal.isVisible()) {
      // Verificar role
      await expect(modal).toHaveAttribute('role', 'dialog');

      // Verificar aria-labelledby
      await expect(modal).toHaveAttribute('aria-labelledby');

      // Verificar botão de fechar
      const closeButton = page.locator('[data-testid="close-modal"]');
      await expect(closeButton).toHaveAttribute('aria-label', 'Fechar');

      // Verificar que foco foi capturado
      await expect(closeButton).toBeFocused();
    }
  });

  test('deve ter tabelas acessíveis', async ({ page }) => {
    await page.goto('/admin/reports');

    // Fazer login admin se necessário
    if (await page.locator('text=Login').isVisible()) {
      await page.fill('input[name="username"]', process.env.ADMIN_USERNAME || 'admin');
      await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
      await page.click('button[type="submit"]');
    }

    // Verificar tabelas
    const tables = page.locator('table');
    const tableCount = await tables.count();

    for (let i = 0; i < tableCount; i++) {
      const table = tables.nth(i);

      // Verificar caption ou aria-label
      const caption = await table.locator('caption').textContent();
      const ariaLabel = await table.getAttribute('aria-label');

      expect(caption || ariaLabel).toBeTruthy();

      // Verificar headers
      const headers = table.locator('th');
      const headerCount = await headers.count();

      for (let j = 0; j < headerCount; j++) {
        const header = headers.nth(j);
        const scope = await header.getAttribute('scope');

        // Header deve ter scope
        expect(scope).toBeTruthy();
      }
    }
  });

  test('deve ter lista acessível', async ({ page }) => {
    await page.click('text=Ver Produtos');

    // Verificar lista de produtos
    const productList = page.locator('[data-testid="product-grid"]');
    await expect(productList).toHaveAttribute('role', 'list');

    const productItems = page.locator('[data-testid="product-card"]');
    await expect(productItems.first()).toHaveAttribute('role', 'listitem');
  });

  test('deve ter busca acessível', async ({ page }) => {
    await page.click('text=Ver Produtos');

    // Verificar campo de busca
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toHaveAttribute('type', 'search');
    await expect(searchInput).toHaveAttribute('aria-label', 'Buscar produtos');

    // Verificar botão de busca
    const searchButton = page.locator('[data-testid="search-button"]');
    await expect(searchButton).toHaveAttribute('aria-label', 'Buscar');
  });

  test('deve ter filtros acessíveis', async ({ page }) => {
    await page.click('text=Ver Produtos');

    // Verificar filtros
    const filters = page.locator('[data-testid="filters"]');
    await expect(filters).toHaveAttribute('role', 'group');
    await expect(filters).toHaveAttribute('aria-label', 'Filtros de produtos');

    // Verificar checkboxes
    const checkboxes = page.locator('input[type="checkbox"]');
    const checkboxCount = await checkboxes.count();

    for (let i = 0; i < checkboxCount; i++) {
      const checkbox = checkboxes.nth(i);
      const id = await checkbox.getAttribute('id');
      const label = page.locator(`label[for="${id}"]`);

      // Checkbox deve ter label associada
      await expect(label).toBeVisible();
    }
  });

  test('deve ter paginação acessível', async ({ page }) => {
    await page.click('text=Ver Produtos');

    // Verificar paginação
    const pagination = page.locator('[data-testid="pagination"]');
    if (await pagination.isVisible()) {
      await expect(pagination).toHaveAttribute('role', 'navigation');
      await expect(pagination).toHaveAttribute('aria-label', 'Navegação de páginas');

      // Verificar botões
      const prevButton = page.locator('[data-testid="prev-page"]');
      const nextButton = page.locator('[data-testid="next-page"]');

      await expect(prevButton).toHaveAttribute('aria-label', 'Página anterior');
      await expect(nextButton).toHaveAttribute('aria-label', 'Próxima página');
    }
  });

  test('deve ter breadcrumbs acessíveis', async ({ page }) => {
    await page.click('text=Ver Produtos');
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    await firstProduct.click();

    // Verificar breadcrumbs
    const breadcrumbs = page.locator('[data-testid="breadcrumbs"]');
    if (await breadcrumbs.isVisible()) {
      await expect(breadcrumbs).toHaveAttribute('role', 'navigation');
      await expect(breadcrumbs).toHaveAttribute('aria-label', 'Navegação breadcrumb');

      // Verificar separadores
      const separators = breadcrumbs.locator('[aria-hidden="true"]');
      await expect(separators).toBeVisible();
    }
  });

  test('deve ter loading states acessíveis', async ({ page }) => {
    // Simular carregamento
    await page.route('**/api/products', route =>
      setTimeout(() => {
        route.fulfill({
          status: 200,
          body: JSON.stringify([]),
        });
      }, 2000)
    );

    await page.click('text=Ver Produtos');

    // Verificar loading
    const loading = page.locator('[data-testid="loading-skeleton"]');
    await expect(loading).toHaveAttribute('aria-live', 'polite');
    await expect(loading).toHaveAttribute('aria-label', 'Carregando produtos');
  });

  test('deve ter mensagens de erro acessíveis', async ({ page }) => {
    // Simular erro
    await page.route('**/api/products', route => route.abort());

    await page.click('text=Ver Produtos');

    // Verificar mensagem de erro
    const errorMessage = page.locator('[role="alert"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveAttribute('aria-live', 'assertive');
  });

  test('deve ter zoom adequado', async ({ page }) => {
    // Testar zoom de 200%
    await page.setViewportSize({ width: 800, height: 600 });

    // Verificar que conteúdo ainda é acessível
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();

    // Verificar que não há overflow horizontal
    const body = page.locator('body');
    const overflow = await body.evaluate(el => window.getComputedStyle(el).overflowX);

    expect(overflow).not.toBe('auto');
  });

  test('deve ter redução de movimento', async ({ page }) => {
    // Simular preferência de redução de movimento
    await page.addInitScript(() => {
      Object.defineProperty(window.matchMedia, 'matches', {
        value: true,
        writable: true,
      });
    });

    await page.reload();

    // Verificar que animações foram reduzidas
    const animatedElements = page.locator('[data-testid="animated"]');
    const animationCount = await animatedElements.count();

    for (let i = 0; i < animationCount; i++) {
      const element = animatedElements.nth(i);
      const animation = await element.evaluate(el => window.getComputedStyle(el).animation);

      // Animação deve ser reduzida ou removida
      expect(animation).toBe('none');
    }
  });
});
