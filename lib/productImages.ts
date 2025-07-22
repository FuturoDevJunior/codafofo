/**
 * MAPEAMENTO DE IMAGENS DOS PRODUTOS VYTALLE
 * ==========================================
 * 
 * Sistema inteligente de fallback para imagens de produtos
 * Garante que sempre há uma imagem válida sendo exibida
 */

// Mapeamento de slugs para imagens reais dos produtos
export const productImageMap: Record<string, string[]> = {
  // TOXINAS BOTULÍNICAS - imagens reais dos produtos
  'dl-botox-100ui': ['/images/products/dl-botox-100ui.jpg'],
  'dl-botox-200ui': ['/images/products/dl-botox-200ui.jpg'],  
  'dl-botox-50ui': ['/images/products/dl-botox-50ui.jpg'],
  'dl-botulift-100ui': ['/images/products/dl-botulift-100ui.jpg'],
  'dl-botulift-150ui': ['/images/products/dl-botulift-150ui.jpg'],
  'dl-botulift-200ui': ['/images/products/dl-botulift-200ui.jpg'],
  'dl-botulim-100ui': ['/icons/syringe-icon.svg'], // fallback para ícone
  'dl-botulim-200ui': ['/icons/syringe-icon.svg'], // fallback para ícone
  'dl-botulim-50ui': ['/icons/syringe-icon.svg'], // fallback para ícone
  'dl-dysport-300ui': ['/images/products/dl-dysport-300ui.jpg'],
  'dl-dysport-500ui': ['/images/products/dl-dysport-500ui.jpg'],
  'dl-nabota-100ui': ['/icons/syringe-icon.svg'], // fallback para ícone
  'dl-xeomin-100ui': ['/images/products/dl-xeomin-100ui.jpg'],

  // BIOESTIMULADORES - imagens reais dos produtos
  'dl-ellanse-m': ['/images/products/dl-ellanse-m.jpg'],
  'dl-ellanse-s': ['/images/products/dl-ellanse-s.jpg'],
  'dl-hialurox-bio-1ml': ['/icons/collagen-icon.svg'], // fallback para ícone
  'dl-nutriex-cientific': ['/icons/collagen-icon.svg'], // fallback para ícone
  'dl-radiesse-duo-1-5cc': ['/images/products/dl-radiesse-duo-1-5cc.jpg'],
  'dl-radiesse-duo-3-0cc': ['/icons/collagen-icon.svg'], // fallback para ícone
  'dl-radiesse-plus-lido': ['/icons/collagen-icon.svg'], // fallback para ícone
  'dl-rennova-diamond-intense': ['/icons/collagen-icon.svg'], // fallback para ícone
  'dl-rennova-elleva-150mg': ['/icons/collagen-icon.svg'], // fallback para ícone
  'dl-rennova-elleva-210mg': ['/icons/collagen-icon.svg'], // fallback para ícone
  'dl-rennova-elleva-x-630mg': ['/icons/collagen-icon.svg'], // fallback para ícone
  'dl-sculptra-2-frascos': ['/images/products/dl-sculptra-2-frascos.jpg'],

  // BIOREMODELADORES - usando ícone de regeneração
  'dl-bio-exo-plus-7ml': ['/icons/regeneration-icon.svg'],
  'dl-evo-pdrn-triple-3ml': ['/icons/regeneration-icon.svg'],
  'dl-prophilo-2ml': ['/icons/regeneration-icon.svg'],
  'dl-rejuvital-pdrn-5-vials': ['/icons/regeneration-icon.svg'],

  // SKINBOOSTERS - imagens reais dos produtos
  'dl-hialurox-skin-plus-3-vials': ['/images/products/dl-hialurox-skin-plus-3-vials.jpg'],
  'dl-saypha-rich': ['/images/products/dl-saypha-rich.jpg'],

  // PREENCHEDORES - imagens reais onde disponíveis
  'dl-belotero-balance-lido': ['/icons/filler-icon.svg'],
  'dl-belotero-intense-lido': ['/icons/filler-icon.svg'],
  'dl-belotero-volume-lido': ['/icons/filler-icon.svg'],
  'dl-bio-lift-24mg': ['/icons/filler-icon.svg'],
  'dl-biogelis-fine-lines-2ml': ['/icons/filler-icon.svg'],
  'dl-biogelis-global-2ml': ['/icons/filler-icon.svg'],
  'dl-biogelis-volume-2ml': ['/icons/filler-icon.svg'],
  'dl-biogelis-volumax-2ml': ['/icons/filler-icon.svg'],
  'dl-biogelis-global-2x-1-25ml': ['/icons/filler-icon.svg'],
  'dl-biogelis-volume-2x-1-25ml': ['/icons/filler-icon.svg'],
  'eptq-s300': ['/icons/filler-icon.svg'],
  'eptq-s500': ['/icons/filler-icon.svg'],
  'dl-evo-derm-1ml': ['/icons/filler-icon.svg'],
  'dl-evo-ultra-deep-1ml': ['/icons/filler-icon.svg'],
  'dl-neuramis-deep': ['/icons/filler-icon.svg'],
  'dl-neuramis-lidocaine-volume': ['/icons/filler-icon.svg'],
  'dl-neuramis-lidocaine': ['/icons/filler-icon.svg'],
  'dl-perfectha-subskin': ['/icons/filler-icon.svg'],
  'dl-hialurox-ultra-1ml': ['/images/products/dl-hialurox-ultra-1ml.jpg'],
  'dl-hialurox-ultra-2ml': ['/images/products/dl-hialurox-ultra-2ml.jpg'],
  'dl-revit-filler-1ml': ['/images/products/dl-revit-filler-1ml.jpg'],
  'dl-revit-filler-2ml': ['/images/products/dl-revit-filler-2ml.jpg'],
  'dl-rennova-hyaluronic-30-3ml': ['/icons/filler-icon.svg'],
  'dl-rennova-deep-line-lido': ['/icons/filler-icon.svg'],
  'dl-rennova-fill': ['/icons/filler-icon.svg'],
  'dl-rennova-fill-lido': ['/icons/filler-icon.svg'],
  'dl-rennova-lift': ['/icons/filler-icon.svg'],
  'dl-rennova-lift-lido': ['/icons/filler-icon.svg'],
  'dl-rennova-lift-plus-lido': ['/icons/filler-icon.svg'],
  'dl-rennova-lift-shape-2ml': ['/icons/filler-icon.svg'],
  'dl-rennova-ultra-volume-lido-1ml': ['/icons/filler-icon.svg'],
  'dl-rennova-ultra-volume-lido-2ml': ['/icons/filler-icon.svg'],
  'dl-restylane-defyne-1ml': ['/icons/filler-icon.svg'],
  'dl-restylane-gel': ['/icons/filler-icon.svg'],
  'dl-restylane-lyft-lido': ['/icons/filler-icon.svg'],
  'dl-restylane-lyft-sem-lido': ['/icons/filler-icon.svg'],
  'dl-restylane-refyne-1ml': ['/icons/filler-icon.svg'],
  'dl-restylane-volyme-1ml': ['/icons/filler-icon.svg'],
  'dl-saypha-filler-lido': ['/icons/filler-icon.svg'],
  'dl-saypha-filler-sem-lido': ['/icons/filler-icon.svg'],
  'dl-saypha-volume-plus-lido': ['/icons/filler-icon.svg'],
  'dl-singderm-10ml': ['/icons/filler-icon.svg'],
  'dl-singderm-2ml': ['/icons/filler-icon.svg'],
  'dl-sofiderm-sub-skin-10ml': ['/icons/filler-icon.svg'],
  'dl-yvoire-classic-plus': ['/icons/filler-icon.svg'],
  'dl-yvoire-contour': ['/icons/filler-icon.svg'],
  'dl-yvoire-volume-plus': ['/icons/filler-icon.svg'],

  // FIOS BIOESTIMULAÇÃO - imagens reais onde disponíveis
  'dl-fio-absorbivel-pdo-30g': ['/images/products/dl-fio-absorbivel-pdo-30g.jpg'],
  'dl-fio-cogwheel-19g': ['/images/products/dl-fio-cogwheel-19g.jpg'],
  'dl-april-bride-18g-espiculado-pack-4': ['/icons/thread-icon.svg'],
  'dl-april-bride-19g-espiculado-pack-4': ['/icons/thread-icon.svg'],
  'dl-april-bride-29g-pack-10': ['/icons/thread-icon.svg'],
  'dl-april-bride-filler-21g-38mm-pack-4': ['/icons/thread-icon.svg'],
  'dl-april-bride-filler-21g-60mm-pack-4': ['/icons/thread-icon.svg'],
  'dl-biofils-liso-30g-pack-10': ['/icons/thread-icon.svg'],
  'dl-biofils-19g-espiculado-pack-4': ['/icons/thread-icon.svg'],
  'dl-biofils-23g-filler-pack-4': ['/icons/thread-icon.svg'],
  'dl-ithread-21g-38mm-pack-20': ['/icons/thread-icon.svg'],
  'dl-ithread-21g-60mm-pack-20': ['/icons/thread-icon.svg'],
  'dl-ithread-29g-38mm-pack-20': ['/icons/thread-icon.svg'],
  'dl-ithread-30g-25mm-pack-20': ['/icons/thread-icon.svg'],
  'dl-ithread-espiculado-19g-pack-20': ['/icons/thread-icon.svg'],

  // MICROCÂNULAS - imagens reais onde disponíveis
  'dl-microcanula-25g-50mm': ['/images/products/dl-microcanula-25g-50mm.jpg'],
  'dl-microcanula-27g-40mm': ['/images/products/dl-microcanula-27g-40mm.jpg'],
  'dl-microcanula-22g-50mm': ['/icons/needle-icon.svg'],
  'dl-microcanula-22g-70mm': ['/icons/needle-icon.svg'],
  'dl-microcanula-18g-100mm': ['/icons/needle-icon.svg'],
  'dl-microcanula-18g-70mm': ['/icons/needle-icon.svg'],

  // ENZIMAS - imagens reais onde disponíveis
  'dl-hialuronidase-1500ui': ['/images/products/dl-hialuronidase-1500ui.jpg'],
  'dl-hialuronidase-3-vials': ['/icons/enzyme-icon.svg']
};

// Fallbacks por categoria
export const categoryImageFallbacks: Record<string, string> = {
  'Toxina Botulínica': '/icons/syringe-icon.svg',
  'Bioestimuladores': '/icons/collagen-icon.svg',
  'Bioremodeladores': '/icons/regeneration-icon.svg',
  'Skinboosters': '/icons/hydration-icon.svg',
  'Preenchedores': '/icons/filler-icon.svg',
  'Fios Bioestimulação': '/icons/thread-icon.svg',
  'Microcânulas': '/icons/needle-icon.svg',
  'Enzimas': '/icons/enzyme-icon.svg'
};

// Fallback final
export const defaultProductImage = '/icons/icon-192.png';

/**
 * Obter imagens para um produto baseado no slug
 */
export function getProductImages(slug: string, category: string): string[] {
  // Tentar encontrar imagens específicas do produto
  if (productImageMap[slug]) {
    return productImageMap[slug];
  }
  
  // Fallback para categoria
  if (categoryImageFallbacks[category]) {
    return [categoryImageFallbacks[category]];
  }
  
  // Fallback final
  return [defaultProductImage];
}

/**
 * Obter primeira imagem do produto
 */
export function getProductMainImage(slug: string, category: string): string {
  const images = getProductImages(slug, category);
  return images[0];
}