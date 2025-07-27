import { expect, test } from '@playwright/test';

// Configuração para testes cross-browser
test.describe('Cross-Browser Compatibility', () => {
  test('Página inicial deve funcionar em todos os navegadores', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar elementos essenciais
    await expect(page).toHaveTitle(/Vytalle|Estética/);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();

    // Verificar se o JavaScript está funcionando
    const jsWorking = await page.evaluate(() => {
      return (
        typeof window !== 'undefined' &&
        typeof document !== 'undefined' &&
        typeof fetch !== 'undefined'
      );
    });

    expect(jsWorking).toBe(true);
  });

  test('Navegação deve funcionar consistentemente', async ({ page }) => {
    await page.goto('/');

    // Testar navegação para produtos
    await page.click('a[href="/products"]');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*products/);

    // Testar navegação para carrinho
    await page.click('a[href="/cart"]');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*cart/);

    // Testar navegação de volta
    await page.goBack();
    await expect(page).toHaveURL(/.*products/);
  });

  test('Formulários devem funcionar em todos os navegadores', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');

    // Testar preenchimento de formulário
    const formInputs = page.locator('input, select, textarea');
    const inputCount = await formInputs.count();

    for (let i = 0; i < Math.min(inputCount, 3); i++) {
      const input = formInputs.nth(i);
      const inputType = await input.getAttribute('type');
      const inputName = await input.getAttribute('name');

      if (inputType !== 'hidden' && inputName) {
        // Testar diferentes tipos de input
        if (inputType === 'text' || inputType === 'email') {
          await input.fill('test@example.com');
          await expect(input).toHaveValue('test@example.com');
        } else if (inputType === 'number') {
          await input.fill('123');
          await expect(input).toHaveValue('123');
        } else if (inputType === 'tel') {
          await input.fill('11999887766');
          await expect(input).toHaveValue('11999887766');
        }
      }
    }
  });

  test('CSS deve ser aplicado corretamente', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar se estilos estão sendo aplicados
    const primaryButton = page.locator('.bg-vitale-primary').first();
    if ((await primaryButton.count()) > 0) {
      const backgroundColor = await primaryButton.evaluate(
        el => window.getComputedStyle(el).backgroundColor
      );

      // Verificar se a cor foi aplicada
      expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    }

    // Verificar responsividade
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(100);

    const mobileLayout = await page.evaluate(() => {
      const body = document.body;
      return window.getComputedStyle(body).display !== 'none';
    });

    expect(mobileLayout).toBe(true);
  });

  test('JavaScript deve funcionar em todos os navegadores', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Testar funcionalidades JavaScript
    const jsFeatures = await page.evaluate(() => {
      return {
        es6: typeof Promise !== 'undefined',
        fetch: typeof fetch !== 'undefined',
        localStorage: typeof localStorage !== 'undefined',
        sessionStorage: typeof sessionStorage !== 'undefined',
        webWorkers: typeof Worker !== 'undefined',
        serviceWorkers: 'serviceWorker' in navigator,
        webGL: typeof WebGLRenderingContext !== 'undefined',
        canvas: typeof HTMLCanvasElement !== 'undefined',
      };
    });

    // Verificar recursos essenciais
    expect(jsFeatures.es6).toBe(true);
    expect(jsFeatures.fetch).toBe(true);
    expect(jsFeatures.localStorage).toBe(true);
    expect(jsFeatures.sessionStorage).toBe(true);
  });

  test('APIs modernas devem ter fallbacks', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Testar APIs com fallbacks
    const apiSupport = await page.evaluate(() => {
      return {
        intersectionObserver: 'IntersectionObserver' in window,
        resizeObserver: 'ResizeObserver' in window,
        mutationObserver: 'MutationObserver' in window,
        requestAnimationFrame: typeof requestAnimationFrame !== 'undefined',
        requestIdleCallback: typeof requestIdleCallback !== 'undefined',
      };
    });

    // APIs essenciais devem estar disponíveis
    expect(apiSupport.intersectionObserver).toBe(true);
    expect(apiSupport.mutationObserver).toBe(true);
    expect(apiSupport.requestAnimationFrame).toBe(true);
  });

  test('Eventos devem funcionar consistentemente', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Testar eventos de clique
    const clickableElements = page.locator('button, a, [role="button"]');
    const elementCount = await clickableElements.count();

    if (elementCount > 0) {
      const firstElement = clickableElements.first();

      // Verificar se o elemento é clicável
      const isClickable = await firstElement.isEnabled();
      expect(isClickable).toBe(true);

      // Testar evento de clique
      await firstElement.click();
      await page.waitForTimeout(100);
    }

    // Testar eventos de teclado
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);

    // Verificar se o foco mudou
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('Imagens devem carregar em todos os navegadores', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar se as imagens carregaram
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < Math.min(imageCount, 3); i++) {
      const image = images.nth(i);

      // Verificar se a imagem tem src
      const src = await image.getAttribute('src');
      expect(src).toBeTruthy();

      // Verificar se a imagem carregou
      const isLoaded = await image.evaluate(img => (img as HTMLImageElement).complete);
      expect(isLoaded).toBe(true);
    }
  });

  test('Fontes devem carregar corretamente', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar se as fontes estão carregadas
    const fontLoading = await page.evaluate(() => {
      if ('fonts' in document) {
        return document.fonts.ready.then(() => true).catch(() => false);
      }
      return true; // Fallback para navegadores sem Font Loading API
    });

    expect(fontLoading).toBe(true);

    // Verificar se as fontes estão sendo aplicadas
    const textElement = page.locator('h1, h2, h3, p').first();
    if ((await textElement.count()) > 0) {
      const fontFamily = await textElement.evaluate(el => window.getComputedStyle(el).fontFamily);

      expect(fontFamily).toBeTruthy();
    }
  });

  test('Cookies e storage devem funcionar', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Testar localStorage
    const localStorageTest = await page.evaluate(() => {
      try {
        localStorage.setItem('test', 'value');
        const value = localStorage.getItem('test');
        localStorage.removeItem('test');
        return value === 'value';
      } catch (e) {
        return false;
      }
    });

    expect(localStorageTest).toBe(true);

    // Testar sessionStorage
    const sessionStorageTest = await page.evaluate(() => {
      try {
        sessionStorage.setItem('test', 'value');
        const value = sessionStorage.getItem('test');
        sessionStorage.removeItem('test');
        return value === 'value';
      } catch (e) {
        return false;
      }
    });

    expect(sessionStorageTest).toBe(true);
  });

  test('Performance deve ser aceitável em todos os navegadores', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Verificar métricas de performance
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        totalResources: performance.getEntriesByType('resource').length,
      };
    });

    // Verificar se os tempos estão dentro de limites aceitáveis
    expect(loadTime).toBeLessThan(5000); // 5 segundos
    expect(performanceMetrics.domContentLoaded).toBeLessThan(2000); // 2 segundos
    expect(performanceMetrics.loadComplete).toBeLessThan(3000); // 3 segundos
  });

  test('Acessibilidade deve funcionar em todos os navegadores', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar elementos de acessibilidade
    const accessibilityChecks = await page.evaluate(() => {
      return {
        hasMain: !!document.querySelector('main'),
        hasNav: !!document.querySelector('nav'),
        hasHeading: !!document.querySelector('h1'),
        hasAltText: Array.from(document.querySelectorAll('img')).every(img => img.alt),
        hasAriaLabels: Array.from(document.querySelectorAll('[aria-label]')).length > 0,
        hasSkipLinks: !!document.querySelector('a[href^="#"]'),
        hasFocusableElements:
          document.querySelectorAll('button, a, input, select, textarea').length > 0,
      };
    });

    // Verificar requisitos básicos de acessibilidade
    expect(accessibilityChecks.hasMain).toBe(true);
    expect(accessibilityChecks.hasNav).toBe(true);
    expect(accessibilityChecks.hasHeading).toBe(true);
    expect(accessibilityChecks.hasFocusableElements).toBe(true);
  });
});
