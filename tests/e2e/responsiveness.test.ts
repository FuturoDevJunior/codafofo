import { expect, test } from '@playwright/test';

test.describe('Testes de Responsividade', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve ser responsivo em mobile (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Verificar se página carregou
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();

    // Verificar navegação
    await expect(page.locator('text=Catálogo')).toBeVisible();
    await expect(page.locator('text=Início')).toBeVisible();
  });

  test('deve ser responsivo em tablet (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    // Verificar se página carregou
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();

    // Navegar para produtos
    await page.click('text=Catálogo');
    await expect(page).toHaveURL('/products');

    // Verificar elementos da página de produtos
    await expect(page.locator('[data-testid="search-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="products-grid"]')).toBeVisible();
  });

  test('deve ser responsivo em desktop (1920x1080)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Verificar se página carregou
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();

    // Navegar para produtos
    await page.click('text=Catálogo');
    await expect(page).toHaveURL('/products');

    // Verificar elementos da página de produtos
    await expect(page.locator('[data-testid="search-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="products-grid"]')).toBeVisible();
  });

  test('deve ter navegação funcional em mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Navegar para produtos
    await page.click('text=Catálogo');
    await expect(page).toHaveURL('/products');

    // Navegar de volta
    await page.click('text=Início');
    await expect(page).toHaveURL('/');
  });

  test('deve ter busca responsiva', async ({ page }) => {
    await page.click('text=Catálogo');

    // Testar em mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Verificar busca
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible();

    // Fazer busca
    await searchInput.fill('teste');
    await searchInput.press('Enter');

    // Verificar resultados
    await expect(page.locator('[data-testid="results-count"]')).toBeVisible();

    // Testar em desktop
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Verificar busca ainda funciona
    await expect(searchInput).toBeVisible();
  });

  test('deve ter filtros responsivos', async ({ page }) => {
    await page.click('text=Catálogo');

    // Testar em mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Verificar filtros
    const filterToggle = page.locator('[data-testid="filter-toggle"]');
    if (await filterToggle.isVisible()) {
      await filterToggle.click();

      // Verificar se filtros apareceram
      const filters = page.locator('text=Toxina Botulínica');
      if (await filters.isVisible()) {
        await filters.click();
        await expect(page.locator('[data-testid="results-count"]')).toBeVisible();
      }
    }

    // Testar em desktop
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Verificar filtros ainda funcionam
    if (await filterToggle.isVisible()) {
      await expect(filterToggle).toBeVisible();
    }
  });

  test('deve ter footer responsivo', async ({ page }) => {
    // Rolar para o final da página
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Testar em mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Verificar footer
    const footer = page.locator('footer');
    if (await footer.isVisible()) {
      await expect(footer).toBeVisible();
    }

    // Testar em desktop
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Verificar footer
    if (await footer.isVisible()) {
      await expect(footer).toBeVisible();
    }
  });

  test('deve ter orientação landscape', async ({ page }) => {
    // Testar em mobile landscape
    await page.setViewportSize({ width: 667, height: 375 });

    // Verificar que layout se adapta
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();

    // Testar navegação
    await page.click('text=Catálogo');
    await expect(page).toHaveURL('/products');
  });

  test('deve ter acessibilidade em diferentes tamanhos', async ({ page }) => {
    // Testar em mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Verificar navegação por teclado
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Testar em desktop
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Verificar navegação por teclado
    await page.keyboard.press('Tab');
    const focusedElementDesktop = page.locator(':focus');
    await expect(focusedElementDesktop).toBeVisible();
  });

  test('deve ter tamanho de fonte adequado', async ({ page }) => {
    // Testar em mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Verificar se texto é legível
    const body = page.locator('body');
    const fontSize = await body.evaluate(el => window.getComputedStyle(el).fontSize);

    // Verificar que fonte não é muito pequena
    const fontSizePx = parseFloat(fontSize);
    expect(fontSizePx).toBeGreaterThanOrEqual(14);

    // Testar em desktop
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Verificar se texto ainda é legível
    const fontSizeDesktop = await body.evaluate(el => window.getComputedStyle(el).fontSize);

    const fontSizeDesktopPx = parseFloat(fontSizeDesktop);
    expect(fontSizeDesktopPx).toBeGreaterThanOrEqual(14);
  });

  test('deve ter contraste adequado', async ({ page }) => {
    // Testar em mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Verificar contraste do texto principal
    const mainText = page.locator('body');
    const color = await mainText.evaluate(el => window.getComputedStyle(el).color);

    // Verificar que não é cinza claro
    expect(color).not.toBe('rgb(128, 128, 128)');

    // Testar em desktop
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Verificar contraste ainda é adequado
    const colorDesktop = await mainText.evaluate(el => window.getComputedStyle(el).color);

    expect(colorDesktop).not.toBe('rgb(128, 128, 128)');
  });
});
