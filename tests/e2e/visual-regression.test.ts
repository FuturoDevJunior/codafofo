import {
  expect,
  test,
} from '@playwright/test';

// Configuração para testes de regressão visual
test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Configurar viewport consistente
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Configurar user agent consistente
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Playwright Visual Test'
    });
  });

  test('Página inicial deve manter aparência visual', async ({ page }) => {
    await page.goto('/');
    
    // Aguardar carregamento completo
    await page.waitForLoadState('networkidle');
    
    // Capturar screenshot da página completa
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      threshold: 0.1, // 10% de tolerância para mudanças
      maxDiffPixels: 1000 // Máximo de pixels diferentes
    });
    
    // Capturar screenshot da área visível
    await expect(page).toHaveScreenshot('homepage-viewport.png', {
      fullPage: false,
      threshold: 0.05, // 5% de tolerância
      maxDiffPixels: 500
    });
  });

  test('Catálogo de produtos deve manter layout', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    
    // Capturar screenshot do catálogo
    await expect(page).toHaveScreenshot('products-catalog.png', {
      fullPage: true,
      threshold: 0.1,
      maxDiffPixels: 1500
    });
    
    // Verificar cards de produtos
    const productCards = page.locator('[data-testid="product-card"]');
    await expect(productCards.first()).toHaveScreenshot('product-card.png', {
      threshold: 0.05,
      maxDiffPixels: 200
    });
  });

  test('Carrinho deve manter aparência', async ({ page }) => {
    await page.goto('/cart');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('cart-page.png', {
      fullPage: true,
      threshold: 0.1,
      maxDiffPixels: 1000
    });
  });

  test('Checkout deve manter layout', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('checkout-page.png', {
      fullPage: true,
      threshold: 0.1,
      maxDiffPixels: 1200
    });
  });

  test('Página de produto deve manter design', async ({ page }) => {
    await page.goto('/products/botox-50u');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('product-detail.png', {
      fullPage: true,
      threshold: 0.1,
      maxDiffPixels: 1000
    });
  });

  test('Responsividade em mobile deve ser consistente', async ({ page }) => {
    // Testar em diferentes tamanhos de tela
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1024, height: 768, name: 'desktop-small' },
      { width: 1920, height: 1080, name: 'desktop-large' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot(`homepage-${viewport.name}.png`, {
        fullPage: true,
        threshold: 0.15, // Maior tolerância para diferentes resoluções
        maxDiffPixels: 2000
      });
    }
  });

  test('Componentes UI devem manter aparência', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Testar componentes específicos
    const components = [
      { selector: '[data-testid="header"]', name: 'header' },
      { selector: '[data-testid="footer"]', name: 'footer' },
      { selector: '[data-testid="product-card"]', name: 'product-card' },
      { selector: '[data-testid="category-card"]', name: 'category-card' },
      { selector: '[data-testid="cart-sidebar"]', name: 'cart-sidebar' }
    ];

    for (const component of components) {
      const element = page.locator(component.selector);
      if (await element.count() > 0) {
        await expect(element.first()).toHaveScreenshot(`${component.name}.png`, {
          threshold: 0.05,
          maxDiffPixels: 100
        });
      }
    }
  });

  test('Estados de loading devem ser consistentes', async ({ page }) => {
    // Simular carregamento lento
    await page.route('**/*', route => {
      route.fulfill({ status: 200, body: 'Loading...' });
    });
    
    await page.goto('/');
    
    // Capturar estado de loading
    await expect(page).toHaveScreenshot('loading-state.png', {
      fullPage: true,
      threshold: 0.1,
      maxDiffPixels: 500
    });
  });

  test('Estados de erro devem manter design', async ({ page }) => {
    // Simular erro 404
    await page.goto('/pagina-inexistente');
    
    await expect(page).toHaveScreenshot('error-404.png', {
      fullPage: true,
      threshold: 0.1,
      maxDiffPixels: 800
    });
  });

  test('Animações devem ser suaves', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Capturar frames de animação
    const frames = [0, 100, 200, 300, 400, 500]; // ms
    
    for (const frame of frames) {
      await page.waitForTimeout(frame);
      await expect(page).toHaveScreenshot(`animation-frame-${frame}ms.png`, {
        fullPage: false,
        threshold: 0.2, // Maior tolerância para animações
        maxDiffPixels: 3000
      });
    }
  });

  test('Temas e cores devem ser consistentes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verificar cores específicas
    const colorChecks = [
      { selector: '.bg-vitale-primary', expectedColor: 'rgb(59, 130, 246)' },
      { selector: '.text-vitale-secondary', expectedColor: 'rgb(16, 185, 129)' },
      { selector: '.bg-white', expectedColor: 'rgb(255, 255, 255)' }
    ];

    for (const check of colorChecks) {
      const element = page.locator(check.selector);
      if (await element.count() > 0) {
        const color = await element.first().evaluate(el => 
          window.getComputedStyle(el).backgroundColor
        );
        expect(color).toBe(check.expectedColor);
      }
    }
  });
}); 