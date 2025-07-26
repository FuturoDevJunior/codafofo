import path from 'path';

import { expect, test } from '@playwright/test';

test.describe('Upload de Imagens', () => {
  test.beforeEach(async ({ page }) => {
    // Fazer login admin primeiro
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', process.env.ADMIN_USERNAME || 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/admin');
  });

  test('deve fazer upload de imagem com sucesso', async ({ page }) => {
    // Navegar para página de produtos
    await page.click('text=Produtos');
    await page.click('text=Adicionar Produto');

    // Preencher dados básicos do produto
    await page.fill('input[name="name"]', 'Produto Teste Upload');
    await page.fill('textarea[name="description"]', 'Descrição do produto teste');
    await page.fill('input[name="price_pix"]', '100.00');
    await page.selectOption('select[name="category"]', 'Toxina Botulínica');

    // Fazer upload de imagem
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, '../fixtures/test-image.jpg'));

    // Verificar preview da imagem
    await expect(page.locator('[data-testid="image-preview"]')).toBeVisible();

    // Salvar produto
    await page.click('button:has-text("Salvar Produto")');

    // Verificar sucesso
    await expect(page.locator('text=Produto salvo com sucesso')).toBeVisible();
  });

  test('deve validar tipos de arquivo permitidos', async ({ page }) => {
    await page.click('text=Produtos');
    await page.click('text=Adicionar Produto');

    // Tentar upload de arquivo não permitido
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, '../fixtures/test-document.pdf'));

    // Verificar mensagem de erro
    await expect(page.locator('text=Tipo de arquivo não permitido')).toBeVisible();
  });

  test('deve validar tamanho máximo do arquivo', async ({ page }) => {
    await page.click('text=Produtos');
    await page.click('text=Adicionar Produto');

    // Tentar upload de arquivo muito grande
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, '../fixtures/large-image.jpg'));

    // Verificar mensagem de erro
    await expect(page.locator('text=Arquivo muito grande')).toBeVisible();
  });

  test('deve permitir múltiplas imagens', async ({ page }) => {
    await page.click('text=Produtos');
    await page.click('text=Adicionar Produto');

    // Fazer upload de múltiplas imagens
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles([
      path.join(__dirname, '../fixtures/test-image-1.jpg'),
      path.join(__dirname, '../fixtures/test-image-2.jpg'),
      path.join(__dirname, '../fixtures/test-image-3.jpg'),
    ]);

    // Verificar previews de todas as imagens
    const previews = page.locator('[data-testid="image-preview"]');
    await expect(previews).toHaveCount(3);
  });

  test('deve permitir reordenar imagens', async ({ page }) => {
    await page.click('text=Produtos');
    await page.click('text=Adicionar Produto');

    // Fazer upload de múltiplas imagens
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles([
      path.join(__dirname, '../fixtures/test-image-1.jpg'),
      path.join(__dirname, '../fixtures/test-image-2.jpg'),
    ]);

    // Reordenar imagens usando drag and drop
    const firstImage = page.locator('[data-testid="image-preview"]').first();
    const secondImage = page.locator('[data-testid="image-preview"]').nth(1);

    await firstImage.dragTo(secondImage);

    // Verificar se a ordem foi alterada
    await expect(page.locator('[data-testid="image-order"]')).toContainText('2, 1');
  });

  test('deve permitir remover imagens', async ({ page }) => {
    await page.click('text=Produtos');
    await page.click('text=Adicionar Produto');

    // Fazer upload de imagem
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, '../fixtures/test-image.jpg'));

    // Verificar que imagem foi carregada
    await expect(page.locator('[data-testid="image-preview"]')).toBeVisible();

    // Remover imagem
    await page.click('[data-testid="remove-image"]');

    // Verificar que imagem foi removida
    await expect(page.locator('[data-testid="image-preview"]')).not.toBeVisible();
  });

  test('deve fazer crop de imagem', async ({ page }) => {
    await page.click('text=Produtos');
    await page.click('text=Adicionar Produto');

    // Fazer upload de imagem
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, '../fixtures/test-image.jpg'));

    // Abrir modal de crop
    await page.click('[data-testid="crop-image"]');

    // Verificar modal de crop
    await expect(page.locator('[data-testid="crop-modal"]')).toBeVisible();

    // Fazer crop
    const cropArea = page.locator('[data-testid="crop-area"]');
    await cropArea.dragTo(cropArea, { targetPosition: { x: 100, y: 100 } });

    // Aplicar crop
    await page.click('button:has-text("Aplicar")');

    // Verificar que crop foi aplicado
    await expect(page.locator('[data-testid="crop-modal"]')).not.toBeVisible();
  });

  test('deve otimizar imagem automaticamente', async ({ page }) => {
    await page.click('text=Produtos');
    await page.click('text=Adicionar Produto');

    // Fazer upload de imagem grande
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, '../fixtures/large-image.jpg'));

    // Verificar que otimização está em andamento
    await expect(page.locator('text=Otimizando imagem...')).toBeVisible();

    // Aguardar conclusão da otimização
    await expect(page.locator('[data-testid="image-preview"]')).toBeVisible();

    // Verificar informações da imagem otimizada
    await expect(page.locator('[data-testid="image-info"]')).toContainText('KB');
  });

  test('deve gerar thumbnails automaticamente', async ({ page }) => {
    await page.click('text=Produtos');
    await page.click('text=Adicionar Produto');

    // Fazer upload de imagem
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, '../fixtures/test-image.jpg'));

    // Verificar que thumbnail foi gerado
    await expect(page.locator('[data-testid="image-thumbnail"]')).toBeVisible();

    // Verificar tamanho do thumbnail
    const thumbnail = page.locator('[data-testid="image-thumbnail"] img');
    const src = await thumbnail.getAttribute('src');
    expect(src).toContain('thumbnail');
  });

  test('deve lidar com erro de upload', async ({ page }) => {
    // Simular erro de rede
    await page.route('**/api/upload', route => route.abort());

    await page.click('text=Produtos');
    await page.click('text=Adicionar Produto');

    // Tentar fazer upload
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, '../fixtures/test-image.jpg'));

    // Verificar mensagem de erro
    await expect(page.locator('text=Erro ao fazer upload')).toBeVisible();

    // Verificar botão de tentar novamente
    await page.click('button:has-text("Tentar Novamente")');
  });

  test('deve mostrar progresso do upload', async ({ page }) => {
    await page.click('text=Produtos');
    await page.click('text=Adicionar Produto');

    // Fazer upload de arquivo grande
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, '../fixtures/large-image.jpg'));

    // Verificar barra de progresso
    await expect(page.locator('[data-testid="upload-progress"]')).toBeVisible();

    // Aguardar conclusão
    await expect(page.locator('[data-testid="image-preview"]')).toBeVisible();
  });

  test('deve validar dimensões mínimas', async ({ page }) => {
    await page.click('text=Produtos');
    await page.click('text=Adicionar Produto');

    // Fazer upload de imagem muito pequena
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, '../fixtures/small-image.jpg'));

    // Verificar mensagem de erro
    await expect(page.locator('text=Imagem muito pequena')).toBeVisible();
  });

  test('deve permitir upload por URL', async ({ page }) => {
    await page.click('text=Produtos');
    await page.click('text=Adicionar Produto');

    // Clicar em upload por URL
    await page.click('text=Upload por URL');

    // Preencher URL da imagem
    await page.fill('input[name="imageUrl"]', 'https://example.com/test-image.jpg');
    await page.click('button:has-text("Carregar")');

    // Verificar preview da imagem
    await expect(page.locator('[data-testid="image-preview"]')).toBeVisible();
  });

  test('deve ter acessibilidade adequada', async ({ page }) => {
    await page.click('text=Produtos');
    await page.click('text=Adicionar Produto');

    // Verificar label do input de arquivo
    await expect(page.locator('label[for="image-upload"]')).toBeVisible();

    // Verificar descrição do input
    await expect(page.locator('input[type="file"]')).toHaveAttribute('aria-describedby');

    // Verificar navegação por teclado
    await page.keyboard.press('Tab');
    await expect(page.locator('input[type="file"]')).toBeFocused();
  });

  test('deve ser responsivo', async ({ page }) => {
    // Testar em mobile
    await page.setViewportSize({ width: 375, height: 667 });

    await page.click('text=Produtos');
    await page.click('text=Adicionar Produto');

    // Verificar se upload ainda funciona em mobile
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, '../fixtures/test-image.jpg'));

    await expect(page.locator('[data-testid="image-preview"]')).toBeVisible();
  });

  test('deve permitir preview em diferentes tamanhos', async ({ page }) => {
    await page.click('text=Produtos');
    await page.click('text=Adicionar Produto');

    // Fazer upload de imagem
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, '../fixtures/test-image.jpg'));

    // Verificar preview padrão
    await expect(page.locator('[data-testid="image-preview"]')).toBeVisible();

    // Clicar para ver em tamanho grande
    await page.click('[data-testid="image-preview"]');

    // Verificar modal de preview grande
    await expect(page.locator('[data-testid="image-modal"]')).toBeVisible();

    // Fechar modal
    await page.click('[data-testid="close-modal"]');
    await expect(page.locator('[data-testid="image-modal"]')).not.toBeVisible();
  });
});
