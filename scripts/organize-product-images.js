#!/usr/bin/env node

/**
 * Script para organizar e otimizar imagens dos produtos Vytalle
 * Garante que cada produto tenha uma imagem apropriada baseada na categoria
 */

const fs = require('fs');
const path = require('path');

// Mapeamento de categorias para imagens disponíveis
const categoryImageMap = {
  TOXINA_BOTULINICA: [
    'botox-medical.jpg',
    'dysport-medical.jpg',
    'xeomin-medical.jpg',
    'botox-icon.svg',
    'dysport-icon.svg',
    'xeomin-icon.svg',
  ],
  BIOESTIMULADOR: [
    'bioestimulador-medical.jpg',
    'bioestimulador-icon.svg',
    'categories/bioestimulador-product.png',
    'categories/bioestimulador-product.svg',
  ],
  BIORREMODELADOR: [
    'bioestimulador-medical.jpg', // Usar imagens similares
    'bioestimulador-icon.svg',
    'categories/bioestimulador-product.png',
  ],
  SKINBOOSTER: [
    'skinbooster-icon.svg',
    'bioestimulador-medical.jpg', // Imagem similar
  ],
  PREENCHEDOR: [
    'preenchedor-medical.jpg',
    'preenchedor-icon.svg',
    'categories/preenchedor-product.png',
    'categories/preenchedor-product.svg',
  ],
  FIOS_BIOESTIMULACAO: [
    'fio-medical.jpg',
    'fio-icon.svg',
    'categories/fio-product.png',
    'categories/fio-product.svg',
  ],
  MICROCANULA: [
    'microcanula-medical.jpg',
    'microcanula-icon.svg',
    'categories/microcanula-product.png',
    'categories/microcanula-product.svg',
  ],
  ENZIMA: ['enzima-medical.jpg', 'categories/enzima-product.png', 'categories/enzima-product.svg'],
};

// Lista de produtos com base nos dados reais
const products = [
  // Toxinas Botulínicas
  { name: 'DL BOTOX 50UI', category: 'TOXINA_BOTULINICA', slug: 'dl-botox-50ui' },
  { name: 'DL BOTOX 100UI', category: 'TOXINA_BOTULINICA', slug: 'dl-botox-100ui' },
  { name: 'DL BOTOX 200UI', category: 'TOXINA_BOTULINICA', slug: 'dl-botox-200ui' },
  { name: 'DL BOTULIFT 100UI', category: 'TOXINA_BOTULINICA', slug: 'dl-botulift-100ui' },
  { name: 'DL BOTULIFT 150UI', category: 'TOXINA_BOTULINICA', slug: 'dl-botulift-150ui' },
  { name: 'DL BOTULIFT 200UI', category: 'TOXINA_BOTULINICA', slug: 'dl-botulift-200ui' },
  { name: 'DL BOTULIM 50UI', category: 'TOXINA_BOTULINICA', slug: 'dl-botulim-50ui' },
  { name: 'DL BOTULIM 100UI', category: 'TOXINA_BOTULINICA', slug: 'dl-botulim-100ui' },
  { name: 'DL BOTULIM 200UI', category: 'TOXINA_BOTULINICA', slug: 'dl-botulim-200ui' },
  { name: 'DL DYSPORT 300UI', category: 'TOXINA_BOTULINICA', slug: 'dl-dysport-300ui' },
  { name: 'DL DYSPORT 500UI', category: 'TOXINA_BOTULINICA', slug: 'dl-dysport-500ui' },
  { name: 'DL NABOTA 100UI', category: 'TOXINA_BOTULINICA', slug: 'dl-nabota-100ui' },
  { name: 'DL XEOMIN 100UI', category: 'TOXINA_BOTULINICA', slug: 'dl-xeomin-100ui' },

  // Bioestimuladores
  { name: 'DL ELLANSE M', category: 'BIOESTIMULADOR', slug: 'dl-ellanse-m' },
  { name: 'DL ELLANSE S', category: 'BIOESTIMULADOR', slug: 'dl-ellanse-s' },
  { name: 'DL HARMONYCA 2ML', category: 'BIOESTIMULADOR', slug: 'dl-harmonyca-2ml' },
  { name: 'DL HIALUROX BIO 1ML', category: 'BIOESTIMULADOR', slug: 'dl-hialurox-bio-1ml' },
  { name: 'DL NUTRIEX CIENTIFIC', category: 'BIOESTIMULADOR', slug: 'dl-nutriex-cientific' },
  { name: 'DL RADIESSE DUO 1.5CC', category: 'BIOESTIMULADOR', slug: 'dl-radiesse-duo-1-5cc' },
  { name: 'DL RADIESSE DUO 3.0CC', category: 'BIOESTIMULADOR', slug: 'dl-radiesse-duo-3-0cc' },
  { name: 'DL RADIESSE PLUS LIDO', category: 'BIOESTIMULADOR', slug: 'dl-radiesse-plus-lido' },
  {
    name: 'DL RENNOVA DIAMOND INTENSE',
    category: 'BIOESTIMULADOR',
    slug: 'dl-rennova-diamond-intense',
  },
  { name: 'DL RENNOVA ELLEVA 150MG', category: 'BIOESTIMULADOR', slug: 'dl-rennova-elleva-150mg' },
  { name: 'DL RENNOVA ELLEVA 210MG', category: 'BIOESTIMULADOR', slug: 'dl-rennova-elleva-210mg' },
  {
    name: 'DL RENNOVA ELLEVA X 630MG',
    category: 'BIOESTIMULADOR',
    slug: 'dl-rennova-elleva-x-630mg',
  },
  { name: 'DL SCULPTRA 2 FRASCOS', category: 'BIOESTIMULADOR', slug: 'dl-sculptra-2-frascos' },

  // Mais produtos poderiam ser adicionados aqui...
];

function getImageForProduct(product) {
  const categoryImages = categoryImageMap[product.category] || [];

  // Priorizar imagens específicas baseadas no nome do produto
  if (product.name.includes('BOTOX')) {
    return categoryImages.find(img => img.includes('botox')) || categoryImages[0];
  }
  if (product.name.includes('DYSPORT')) {
    return categoryImages.find(img => img.includes('dysport')) || categoryImages[0];
  }
  if (product.name.includes('XEOMIN')) {
    return categoryImages.find(img => img.includes('xeomin')) || categoryImages[0];
  }

  // Usar primeira imagem disponível da categoria
  return categoryImages[0] || 'medical-syringe-search-2025-07-21T00-40-42-033Z.png';
}

function generateImageMapping() {
  console.warn('=== MAPEAMENTO DE IMAGENS PARA PRODUTOS VYTALLE ===\n');

  const mapping = {};

  products.forEach(product => {
    const imageName = getImageForProduct(product);
    const imagePath = `/images/products/${imageName}`;

    mapping[product.slug] = imagePath;

    console.warn(`${product.name}`);
    console.warn(`  Categoria: ${product.category}`);
    console.warn(`  Slug: ${product.slug}`);
    console.warn(`  Imagem: ${imagePath}`);
    console.warn('  ---');
  });

  // Salvar mapeamento em arquivo JSON
  const mappingPath = path.join(__dirname, '..', 'public', 'images', 'product-image-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));

  console.warn(`\n✅ Mapeamento salvo em: ${mappingPath}`);
  console.warn(`📊 Total de produtos mapeados: ${Object.keys(mapping).length}`);

  return mapping;
}

// Verificar se existem imagens ausentes
function checkMissingImages() {
  const imagesDir = path.join(__dirname, '..', 'public', 'images', 'products');
  const existingImages = fs
    .readdirSync(imagesDir, { recursive: true })
    .filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.svg'));

  console.warn('\n=== VERIFICAÇÃO DE IMAGENS ===');
  console.warn(`📁 Imagens disponíveis: ${existingImages.length}`);
  console.warn('📋 Imagens encontradas:');
  existingImages.forEach(img => console.warn(`  - ${img}`));

  const requiredImages = new Set();
  Object.values(categoryImageMap)
    .flat()
    .forEach(img => requiredImages.add(img));

  const missingImages = Array.from(requiredImages).filter(img => {
    const exists = existingImages.some(existing => existing.includes(img.split('/').pop()));
    return !exists;
  });

  if (missingImages.length > 0) {
    console.warn('\n❌ Imagens ausentes:');
    missingImages.forEach(img => console.warn(`  - ${img}`));
  } else {
    console.warn('\n✅ Todas as imagens necessárias estão disponíveis!');
  }
}

// Executar script
if (require.main === module) {
  console.warn('🚀 Iniciando organização das imagens dos produtos...\n');

  try {
    generateImageMapping();
    checkMissingImages();

    console.warn('\n🎉 Organização concluída com sucesso!');
    console.warn('\n💡 Próximos passos:');
    console.warn('  1. Revisar o arquivo product-image-mapping.json');
    console.warn('  2. Atualizar a migração do banco com os caminhos corretos');
    console.warn('  3. Adicionar imagens reais dos produtos quando disponíveis');
  } catch (error) {
    console.error('❌ Erro ao organizar imagens:', error);
    process.exit(1);
  }
}

module.exports = {
  categoryImageMap,
  getImageForProduct,
  generateImageMapping,
};
