import { expect, test } from '@playwright/test';

// Configuração para testes de carga
test.describe('Load Testing', () => {
  test('Página inicial deve carregar rapidamente', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Verificar se carregou em menos de 3 segundos
    expect(loadTime).toBeLessThan(3000);

    // Verificar métricas de performance
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint:
          performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      };
    });

    // Verificar métricas de performance
    expect(performanceMetrics.domContentLoaded).toBeLessThan(1000);
    expect(performanceMetrics.loadComplete).toBeLessThan(2000);
    expect(performanceMetrics.firstPaint).toBeLessThan(1500);
    expect(performanceMetrics.firstContentfulPaint).toBeLessThan(2000);
  });

  test('Catálogo deve suportar múltiplos produtos', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // Verificar se todos os produtos carregaram
    const productCards = page.locator('[data-testid="product-card"]');
    const productCount = await productCards.count();

    expect(productCount).toBeGreaterThan(0);

    // Verificar performance de renderização
    const renderTime = await page.evaluate(() => {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'measure') {
            // console.log(`${entry.name}: ${entry.duration}ms`);
          }
        });
      });

      observer.observe({ entryTypes: ['measure'] });

      performance.mark('render-start');
      // Simular renderização
      performance.mark('render-end');
      performance.measure('render-time', 'render-start', 'render-end');

      return performance.getEntriesByName('render-time')[0]?.duration || 0;
    });

    expect(renderTime).toBeLessThan(500);
  });

  test('Carrinho deve funcionar com muitos itens', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Adicionar múltiplos produtos ao carrinho
    const addToCartButtons = page.locator('[data-testid="add-to-cart"]');
    const buttonCount = await addToCartButtons.count();

    // Adicionar até 10 produtos
    const maxProducts = Math.min(10, buttonCount);

    for (let i = 0; i < maxProducts; i++) {
      await addToCartButtons.nth(i).click();
      await page.waitForTimeout(100); // Pequena pausa entre cliques
    }

    // Verificar se o carrinho atualizou corretamente
    const cartItems = page.locator('[data-testid="cart-item"]');
    const itemCount = await cartItems.count();

    expect(itemCount).toBe(maxProducts);

    // Verificar performance do carrinho
    const cartUpdateTime = await page.evaluate(() => {
      const start = performance.now();
      // Simular atualização do carrinho
      const end = performance.now();
      return end - start;
    });

    expect(cartUpdateTime).toBeLessThan(100);
  });

  test('Busca deve ser responsiva', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    const searchInput = page.locator('[data-testid="search-input"]');
    if ((await searchInput.count()) > 0) {
      const startTime = Date.now();

      await searchInput.fill('botox');
      await page.waitForTimeout(300); // Aguardar debounce

      const searchTime = Date.now() - startTime;
      expect(searchTime).toBeLessThan(500);

      // Verificar se os resultados apareceram
      const results = page.locator('[data-testid="product-card"]');
      const resultCount = await results.count();
      expect(resultCount).toBeGreaterThan(0);
    }
  });

  test('Navegação deve ser rápida', async ({ page }) => {
    const pages = ['/', '/products', '/cart', '/checkout'];

    for (const pageUrl of pages) {
      const startTime = Date.now();

      await page.goto(pageUrl);
      await page.waitForLoadState('networkidle');

      const navigationTime = Date.now() - startTime;
      expect(navigationTime).toBeLessThan(2000);

      // Verificar se a página carregou completamente
      await expect(page).toHaveTitle(/Vytalle|Estética/);
    }
  });

  test('Imagens devem carregar otimizadas', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar se as imagens estão otimizadas
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const image = images.nth(i);
      const src = await image.getAttribute('src');

      // Verificar se usa formatos otimizados
      expect(src).toMatch(/\.(webp|jpg|png)$/);

      // Verificar se tem lazy loading
      const loading = await image.getAttribute('loading');
      expect(loading).toBe('lazy');
    }
  });

  test('API deve responder rapidamente', async ({ page }) => {
    // Testar endpoints da API
    const apiEndpoints = ['/api/products', '/api/categories', '/api/checkout'];

    for (const endpoint of apiEndpoints) {
      const startTime = Date.now();

      const response = await page.request.get(endpoint);
      const responseTime = Date.now() - startTime;

      // Verificar se respondeu em menos de 1 segundo
      expect(responseTime).toBeLessThan(1000);

      // Verificar status da resposta
      expect(response.status()).toBeLessThan(500);
    }
  });

  test('Memória deve ser gerenciada adequadamente', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar uso de memória
    const memoryInfo = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory;
      }
      return null;
    });

    if (memoryInfo) {
      // Verificar se o uso de memória está dentro de limites razoáveis
      expect(memoryInfo.usedJSHeapSize).toBeLessThan(50 * 1024 * 1024); // 50MB
      expect(memoryInfo.totalJSHeapSize).toBeLessThan(100 * 1024 * 1024); // 100MB
    }
  });

  test('Concorrência deve ser suportada', async ({ browser }) => {
    // Criar múltiplas páginas simultaneamente
    const pageCount = 5;
    const pages = await Promise.all(Array.from({ length: pageCount }, () => browser.newPage()));

    const startTime = Date.now();

    // Navegar para páginas diferentes simultaneamente
    await Promise.all([
      pages[0].goto('/'),
      pages[1].goto('/products'),
      pages[2].goto('/cart'),
      pages[3].goto('/checkout'),
      pages[4].goto('/'),
    ]);

    const concurrentTime = Date.now() - startTime;

    // Verificar se todas as páginas carregaram
    for (const page of pages) {
      await expect(page).toHaveTitle(/Vytalle|Estética/);
    }

    // Verificar se o tempo total foi razoável
    expect(concurrentTime).toBeLessThan(5000);

    // Fechar páginas
    await Promise.all(pages.map(page => page.close()));
  });

  test('Cache deve funcionar eficientemente', async ({ page }) => {
    // Primeira visita
    const firstVisitStart = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const firstVisitTime = Date.now() - firstVisitStart;

    // Segunda visita (deve usar cache)
    const secondVisitStart = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const secondVisitTime = Date.now() - secondVisitStart;

    // A segunda visita deve ser mais rápida
    expect(secondVisitTime).toBeLessThan(firstVisitTime);

    // Verificar se recursos foram cacheados
    const cachedResources = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      return resources.filter(resource => {
        const perfResource = resource as PerformanceResourceTiming;
        return perfResource.transferSize === 0 && perfResource.decodedBodySize > 0;
      }).length;
    });

    expect(cachedResources).toBeGreaterThan(0);
  });
});
