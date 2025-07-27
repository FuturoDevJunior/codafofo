#!/usr/bin/env node

/**
 * EXTRAÇÃO DE PRODUTOS MÍNIMOS - VYTALLE ESTÉTICA
 * ===============================================
 *
 * Script para extrair apenas dados essenciais dos produtos
 * para reduzir uso de memória
 */

const fs = require('fs');
const path = require('path');

// Ler o arquivo mockData.ts
const mockDataPath = path.join(__dirname, '../lib/mockData.ts');
const mockDataContent = fs.readFileSync(mockDataPath, 'utf8');

// Regex para extrair produtos
const productRegex =
  /{\s*id:\s*'(\d+)',\s*name:\s*'([^']+)',\s*price_pix:\s*(\d+),\s*price_prazo:\s*(\d+),\s*price_card:\s*(\d+),\s*category:\s*'([^']+)',[\s\S]*?slug:\s*'([^']+)',[\s\S]*?active:\s*(true|false)/g;

const minimalProducts = [];
let match;

while ((match = productRegex.exec(mockDataContent)) !== null) {
  const [, id, name, price_pix, price_prazo, price_card, category, slug, active] = match;

  minimalProducts.push({
    id,
    name,
    price_pix: parseInt(price_pix),
    price_prazo: parseInt(price_prazo),
    price_card: parseInt(price_card),
    category,
    slug,
    active: active === 'true',
  });
}

// console.log(`Extraídos ${minimalProducts.length} produtos`);

// Gerar o código TypeScript
const tsCode = `/**
 * DADOS MÍNIMOS DOS PRODUTOS - VYTALLE ESTÉTICA
 * ============================================
 * 
 * Dados extraídos automaticamente do mockData.ts
 * Apenas informações essenciais para reduzir uso de memória
 */

// Interface para produto minimizado
interface ProductMinimal {
  id: string;
  name: string;
  price_pix: number;
  price_prazo: number;
  price_card: number;
  category: string;
  slug: string;
  active: boolean;
}

// Dados dos produtos (apenas essenciais, sem imagens)
export const productsMinimalData: ProductMinimal[] = ${JSON.stringify(minimalProducts, null, 2)};
`;

// Escrever o arquivo
const outputPath = path.join(__dirname, '../lib/productsMinimal.ts');
fs.writeFileSync(outputPath, tsCode);

// console.log(`✅ Arquivo gerado: ${outputPath}`);
// console.log(`📊 Total de produtos: ${minimalProducts.length}`);
// console.log(`💾 Redução estimada de memória: ~80%`);

// Estatísticas por categoria
const _categoryCounts = minimalProducts.reduce((acc, product) => {
  acc[product.category] = (acc[product.category] || 0) + 1;
  return acc;
}, {});

// console.log('\n📈 Produtos por categoria:');
// Object.entries(categoryCounts).forEach(([category, count]) => {
//   console.log(`  ${category}: ${count} produtos`);
// });
