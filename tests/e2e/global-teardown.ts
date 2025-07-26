import { chromium, FullConfig } from '@playwright/test';

async function globalTeardown(_config: FullConfig) {
  const browser = await chromium.launch();
  const _page = await browser.newPage();

  // Cleanup global aqui se necessário
  // Por exemplo, limpar dados de teste, logout, etc.

  await browser.close();
}

export default globalTeardown;
