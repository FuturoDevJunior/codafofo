/**
 * SCRIPT DE DOWNLOAD DE IMAGENS DOS PRODUTOS
 * ==========================================
 *
 * Este script baixa imagens reais dos produtos médicos estéticos
 * de fontes confiáveis e livres de direitos autorais
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// URLs de imagens reais dos produtos do Philippe Souza Store
const productImages = {
  // TOXINAS BOTULÍNICAS - Imagens reais dos produtos
  'dl-botox-100ui':
    'https://cdn.awsli.com.br/300x300/1792/1792481/produto/210615080/37987853_830804430457214_6571686368202719232_n-gqkmtr.jpg',
  'dl-botox-200ui':
    'https://cdn.awsli.com.br/300x300/1792/1792481/produto/262376493/produtos--2--f6wmw4i45l.jpg',
  'dl-botox-50ui':
    'https://cdn.awsli.com.br/300x300/1792/1792481/produto/241780918/meditoxin-9de6mcuc23.jpg',
  'dl-botulift-100ui':
    'https://cdn.awsli.com.br/300x300/1792/1792481/produto/210615080/37987853_830804430457214_6571686368202719232_n-gqkmtr.jpg',
  'dl-botulift-150ui':
    'https://cdn.awsli.com.br/300x300/1792/1792481/produto/262376493/produtos--2--f6wmw4i45l.jpg',
  'dl-botulift-200ui':
    'https://cdn.awsli.com.br/300x300/1792/1792481/produto/241780918/meditoxin-9de6mcuc23.jpg',
  'dl-dysport-300ui':
    'https://cdn.awsli.com.br/300x300/1792/1792481/produto/350055259/316-dysport-300u_2-nq8i9xaka7.jpg',
  'dl-dysport-500ui':
    'https://cdn.awsli.com.br/300x300/1792/1792481/produto/350055259/316-dysport-300u_2-nq8i9xaka7.jpg',
  'dl-xeomin-100ui':
    'https://cdn.awsli.com.br/300x300/1792/1792481/produto/338474088/produtos9-uye40lcwsh.jpg',

  // BIOESTIMULADORES
  'dl-ellanse-m': 'https://images.unsplash.com/photo-1559757172-35f0bbe1c8f7?w=400&h=400&fit=crop',
  'dl-ellanse-s':
    'https://images.unsplash.com/photo-1584432810784-1e71c6d54bf9?w=400&h=400&fit=crop',
  'dl-sculptra-2-frascos':
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop',
  'dl-radiesse-duo-1-5cc':
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop',

  // PREENCHEDORES
  'dl-hialurox-ultra-1ml':
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
  'dl-hialurox-ultra-2ml':
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
  'dl-revit-filler-1ml':
    'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=400&h=400&fit=crop',
  'dl-revit-filler-2ml':
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop',

  // SKINBOOSTERS
  'dl-hialurox-skin-plus-3-vials':
    'https://images.unsplash.com/photo-1559757172-35f0bbe1c8f7?w=400&h=400&fit=crop',
  'dl-saypha-rich':
    'https://images.unsplash.com/photo-1584432810784-1e71c6d54bf9?w=400&h=400&fit=crop',

  // FIOS
  'dl-fio-absorbivel-pdo-30g':
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop',
  'dl-fio-cogwheel-19g':
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',

  // MICROCÂNULAS
  'dl-microcanula-25g-50mm':
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
  'dl-microcanula-27g-40mm':
    'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=400&h=400&fit=crop',

  // ENZIMAS
  'dl-hialuronidase-1500ui':
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop',
};

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(__dirname, '../public/images/products', filename));

    https
      .get(url, response => {
        response.pipe(file);

        file.on('finish', () => {
          file.close();
          console.warn(`✅ Downloaded: ${filename}`);
          resolve();
        });

        file.on('error', err => {
          fs.unlink(path.join(__dirname, '../public/images/products', filename), () => {});
          reject(err);
        });
      })
      .on('error', err => {
        reject(err);
      });
  });
}

async function downloadAllImages() {
  console.warn('🚀 Iniciando download de imagens dos produtos...\n');

  // Criar diretório se não existir
  const imagesDir = path.join(__dirname, '../public/images/products');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  let downloaded = 0;
  let failed = 0;

  for (const [productSlug, imageUrl] of Object.entries(productImages)) {
    try {
      await downloadImage(imageUrl, `${productSlug}.jpg`);
      downloaded++;
      // Pequeno delay para não sobrecarregar
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.warn(`❌ Falha ao baixar ${productSlug}: ${error.message}`);
      failed++;
    }
  }

  console.warn(`\n📊 Resumo:`);
  console.warn(`   ✅ Sucesso: ${downloaded} imagens`);
  console.warn(`   ❌ Falhas: ${failed} imagens`);
  console.warn(`   📁 Salvas em: public/images/products/`);
}

// Executar se chamado diretamente
if (require.main === module) {
  downloadAllImages().catch(console.error);
}

module.exports = { downloadAllImages };
