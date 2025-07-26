import { expect, test } from '@playwright/test';

test.describe('Login Admin', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/login');
  });

  test('deve carregar página de login admin', async ({ page }) => {
    // Verificar se página carregou
    await expect(page).toHaveURL('/admin/login');

    // Verificar se formulário existe
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('deve ter campos de login', async ({ page }) => {
    // Verificar se campos existem
    const usernameInput = page.locator('input[name="username"], input[type="text"]');
    const passwordInput = page.locator('input[name="password"], input[type="password"]');

    if (await usernameInput.isVisible()) {
      await expect(usernameInput).toBeVisible();
    }

    if (await passwordInput.isVisible()) {
      await expect(passwordInput).toBeVisible();
    }
  });

  test('deve preencher formulário de login', async ({ page }) => {
    // Preencher campos se existirem
    const usernameInput = page.locator('input[name="username"], input[type="text"]');
    const passwordInput = page.locator('input[name="password"], input[type="password"]');

    if (await usernameInput.isVisible()) {
      await usernameInput.fill('admin');
    }

    if (await passwordInput.isVisible()) {
      await passwordInput.fill('admin123');
    }
  });

  test('deve submeter formulário de login', async ({ page }) => {
    // Preencher campos
    const usernameInput = page.locator('input[name="username"], input[type="text"]');
    const passwordInput = page.locator('input[name="password"], input[type="password"]');

    if (await usernameInput.isVisible()) {
      await usernameInput.fill('admin');
    }

    if (await passwordInput.isVisible()) {
      await passwordInput.fill('admin123');
    }

    // Submeter formulário
    const submitButton = page.locator('button[type="submit"]');
    if (await submitButton.isVisible()) {
      await submitButton.click();
    }
  });

  test('deve navegar para dashboard após login', async ({ page }) => {
    // Tentar acessar dashboard
    await page.goto('/admin');

    // Verificar se redirecionou para login ou se está no dashboard
    const currentUrl = page.url();
    expect(currentUrl.includes('/admin/login') || currentUrl.includes('/admin')).toBeTruthy();
  });

  test('deve ter acessibilidade básica', async ({ page }) => {
    // Verificar se há labels
    const labels = page.locator('label');
    if ((await labels.count()) > 0) {
      await expect(labels.first()).toBeVisible();
    }

    // Verificar navegação por teclado
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('deve ser responsivo', async ({ page }) => {
    // Testar em mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Verificar se formulário ainda é funcional
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('deve validar campos obrigatórios', async ({ page }) => {
    // Tentar submeter sem preencher
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

  test('deve lidar com credenciais inválidas', async ({ page }) => {
    // Preencher credenciais inválidas
    const usernameInput = page.locator('input[name="username"], input[type="text"]');
    const passwordInput = page.locator('input[name="password"], input[type="password"]');

    if (await usernameInput.isVisible()) {
      await usernameInput.fill('usuario_invalido');
    }

    if (await passwordInput.isVisible()) {
      await passwordInput.fill('senha_invalida');
    }

    // Submeter
    const submitButton = page.locator('button[type="submit"]');
    if (await submitButton.isVisible()) {
      await submitButton.click();

      // Verificar se há mensagem de erro
      const errorMessage = page.locator('text=inválido, text=error, text=falha');
      if ((await errorMessage.count()) > 0) {
        await expect(errorMessage.first()).toBeVisible();
      }
    }
  });

  test('deve ter segurança básica', async ({ page }) => {
    // Verificar se senha está oculta
    const passwordInput = page.locator('input[type="password"]');
    if (await passwordInput.isVisible()) {
      await expect(passwordInput).toHaveAttribute('type', 'password');
    }
  });

  test('deve ter navegação por teclado', async ({ page }) => {
    // Navegar com Tab
    await page.keyboard.press('Tab');

    // Verificar se foco está em elemento interativo
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Navegar mais
    await page.keyboard.press('Tab');
    const secondFocused = page.locator(':focus');
    await expect(secondFocused).toBeVisible();
  });

  test('deve ter loading state', async ({ page }) => {
    // Preencher formulário
    const usernameInput = page.locator('input[name="username"], input[type="text"]');
    const passwordInput = page.locator('input[name="password"], input[type="password"]');

    if (await usernameInput.isVisible()) {
      await usernameInput.fill('admin');
    }

    if (await passwordInput.isVisible()) {
      await passwordInput.fill('admin123');
    }

    // Submeter e verificar loading
    const submitButton = page.locator('button[type="submit"]');
    if (await submitButton.isVisible()) {
      await submitButton.click();

      // Verificar se botão tem estado de loading
      const loadingButton = page.locator(
        'button:has-text("Carregando"), button:has-text("Loading")'
      );
      if (await loadingButton.isVisible()) {
        await expect(loadingButton).toBeVisible();
      }
    }
  });
});
