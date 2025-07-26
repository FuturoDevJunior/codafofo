import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(_config: FullConfig) {
  const browser = await chromium.launch();
  const _page = await browser.newPage();

  // Setup global aqui se necessário
  // Por exemplo, login global, configurações de estado, etc.

  await browser.close();
}

export default globalSetup;
