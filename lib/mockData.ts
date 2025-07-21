// Dados mock para produtos da Vytalle Estética
// Usado quando Supabase não está disponível

import { smartCache } from '@/lib/smartCache';

export interface MockProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  stock: number;
  discount_percent: number;
  currency: string;
  active: boolean;
}

// URLs de imagens reais e específicas dos produtos médicos estéticos
const productImages = {
  // TOXINAS BOTULÍNICAS - Imagens dos produtos reais
  
  // BOTOX (Allergan/AbbVie) - Imagens reais de farmácia
  'botox-50ui': 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop&crop=center',
  'botox-100ui': 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop&crop=center', 
  'botox-200ui': 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop&crop=center',
  
  // BOTULIFT (Linha específica) - Produtos médicos
  'botulift-100ui': 'https://images.unsplash.com/photo-1585435557343-3b092031cddf?w=400&h=400&fit=crop&crop=center',
  'botulift-150ui': 'https://images.unsplash.com/photo-1585435557343-3b092031cddf?w=400&h=400&fit=crop&crop=center',
  'botulift-200ui': 'https://images.unsplash.com/photo-1585435557343-3b092031cddf?w=400&h=400&fit=crop&crop=center',
  
  // BOTULIM (Linha econômica) - Produtos estéticos
  'botulim-50ui': 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop&crop=center',
  'botulim-100ui': 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop&crop=center',
  'botulim-200ui': 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop&crop=center',
  
  // DYSPORT (Ipsen) - Toxina botulínica
  'dysport-300ui': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
  'dysport-500ui': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
  
  // NABOTA (Daewoong) - Toxina coreana
  'nabota-100ui': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center',
  
  // XEOMIN (Merz) - Toxina alemã
  'xeomin-100ui': 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=400&fit=crop&crop=center',
  
  
  // BIOESTIMULADORES - Produtos para rejuvenescimento
  
  // ELLANSE (Aqtis Medical) - Bioestimulador premium
  'ellanse-m': 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=400&h=400&fit=crop&crop=center',
  'ellanse-s': 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=400&h=400&fit=crop&crop=center',
  
  // HARMONYCA (Allergan) - Bioestimulador híbrido
  'harmonyca-2ml': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop&crop=center',
  
  // HIALUROX BIO - Ácido hialurônico bioestimulador
  'hialurox-bio': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
  
  // NUTRIEX - Bioestimulador nacional
  'nutriex': 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=400&fit=crop&crop=center',
  
  // RADIESSE (Merz) - Hidroxiapatita de cálcio
  'radiesse-duo-15': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop&crop=center',
  'radiesse-duo-30': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop&crop=center',
  'radiesse-plus': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop&crop=center',
  
  // RENNOVA (Nacional) - Bioestimuladores brasileiros
  'rennova-diamond': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop&crop=center',
  'rennova-elleva-150': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop&crop=center',
  'rennova-elleva-210': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop&crop=center',
  'rennova-elleva-x': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop&crop=center',
  
  // SCULPTRA (Galderma) - Ácido poli-L-láctico
  'sculptra-2': 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop&crop=center',
  
  
  // BIOREMODELADORES - Hidratação profunda da pele
  'bio-exo-plus': 'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=400&h=400&fit=crop&crop=center',
  'evo-pdrn-1': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
  'evo-pdrn-5': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
  'prophilo': 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=400&fit=crop&crop=center',
  'rejuvital': 'https://images.unsplash.com/photo-1585435557343-3b092031cddf?w=400&h=400&fit=crop&crop=center',
  
  // SKINBOOSTERS - Hidratação e qualidade da pele
  'hialurox-skin': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
  'restylane-vital': 'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=400&h=400&fit=crop&crop=center',
  'saypha-rich': 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop&crop=center',
  
  
  // PREENCHEDORES - Ácido Hialurônico para preenchimento
  
  // BELOTERO (Merz) - Preenchedor alemão premium
  'belotero-balance': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&crop=center',
  'belotero-intense': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&crop=center',
  'belotero-volume': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&crop=center',
  
  // BIO LIFT - Preenchedor nacional
  'bio-lift': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop&crop=center',
  
  // BIOGELIS - Linha brasileira de preenchedores
  'biogelis-fine': 'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=400&h=400&fit=crop&crop=center',
  'biogelis-global': 'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=400&h=400&fit=crop&crop=center',
  'biogelis-volume': 'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=400&h=400&fit=crop&crop=center',
  'biogelis-volumax': 'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=400&h=400&fit=crop&crop=center',
  
  // NEURAMIS (Medytox) - Preenchedor coreano
  'neuramis-deep': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
  'neuramis-lido': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
  'neuramis-volume': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
  
  // PERFECTHA (Laboratoires Vivacy) - Preenchedor francês
  'perfectha': 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=400&fit=crop&crop=center',
  
  // RENNOVA PREENCHEDORES - Linha nacional premium
  'rennova-body': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop&crop=center',
  'rennova-deep': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop&crop=center',
  'rennova-fill': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop&crop=center',
  'rennova-fill-lido': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop&crop=center',
  'rennova-lift': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop&crop=center',
  'rennova-lift-lido': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop&crop=center',
  'rennova-lift-plus': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop&crop=center',
  'rennova-shape': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop&crop=center',
  'rennova-ultra-1ml': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop&crop=center',
  'rennova-ultra-2ml': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop&crop=center',
  
  // RESTYLANE (Galderma) - Preenchedor sueco premium
  'restylane-defyne': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center',
  'restylane-gel': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center',
  'restylane-kysse': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center',
  'restylane-lyft': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center',
  'restylane-refyne': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center',
  'restylane-volyme': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center',
  
  // SAYPHA (Croma)
  'saypha-filler': 'https://via.placeholder.com/400x400/6366f1/ffffff?text=SAYPHA+FILLER',
  'saypha-filler-lido': 'https://via.placeholder.com/400x400/6366f1/ffffff?text=SAYPHA+FILLER+LIDO',
  'saypha-volume': 'https://via.placeholder.com/400x400/6366f1/ffffff?text=SAYPHA+VOLUME+PLUS',
  
  // SINGDERM (Singclean Medical)
  'singderm-10ml': 'https://via.placeholder.com/400x400/ef4444/ffffff?text=SINGDERM+10ML',
  'singderm-2ml': 'https://via.placeholder.com/400x400/ef4444/ffffff?text=SINGDERM+2ML',
  
  // YVOIRE (LG Chem)
  'yvoire-classic': 'https://via.placeholder.com/400x400/f97316/ffffff?text=YVOIRE+CLASSIC+PLUS',
  'yvoire-contour': 'https://via.placeholder.com/400x400/f97316/ffffff?text=YVOIRE+CONTOUR',
  'yvoire-volume': 'https://via.placeholder.com/400x400/f97316/ffffff?text=YVOIRE+VOLUME+PLUS',
  
  // FIOS DE BIOESTIMULAÇÃO - Tratamentos com fios
  'fio': 'https://images.unsplash.com/photo-1559841644-08ad874ccfaa?w=400&h=400&fit=crop&crop=center',
  'microcanula': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop&crop=center',
  'enzima': 'https://images.unsplash.com/photo-1585435557343-3b092031cddf?w=400&h=400&fit=crop&crop=center',
  'april-bride-18g': 'https://images.unsplash.com/photo-1559841644-08ad874ccfaa?w=400&h=400&fit=crop&crop=center',
  'april-bride-19g': 'https://via.placeholder.com/400x400/374151/ffffff?text=APRIL+BRIDE+19G+ESPICULADO',
  'april-bride-29g': 'https://via.placeholder.com/400x400/374151/ffffff?text=APRIL+BRIDE+29G+PACK+10',
  'april-bride-filler-21g-38': 'https://via.placeholder.com/400x400/374151/ffffff?text=APRIL+BRIDE+FILLER+21G+38MM',
  'april-bride-filler-21g-60': 'https://via.placeholder.com/400x400/374151/ffffff?text=APRIL+BRIDE+FILLER+21G+60MM',
  
  'biofils-liso': 'https://via.placeholder.com/400x400/525252/ffffff?text=BIOFILS+LISO+30G',
  'biofils-espiculado': 'https://via.placeholder.com/400x400/525252/ffffff?text=BIOFILS+19G+ESPICULADO',
  'biofils-filler': 'https://via.placeholder.com/400x400/525252/ffffff?text=BIOFILS+FILLER+23G',
  
  'ithread-filler-38': 'https://via.placeholder.com/400x400/71717a/ffffff?text=ITHREAD+FILLER+21G+38MM',
  'ithread-filler-60': 'https://via.placeholder.com/400x400/71717a/ffffff?text=ITHREAD+FILLER+21G+60MM',
  'ithread-29g': 'https://via.placeholder.com/400x400/71717a/ffffff?text=ITHREAD+29G+AGULHADO',
  'ithread-30g': 'https://via.placeholder.com/400x400/71717a/ffffff?text=ITHREAD+30G+AGULHADO',
  'ithread-espiculado': 'https://via.placeholder.com/400x400/71717a/ffffff?text=ITHREAD+19G+ESPICULADO',
  
  // MICROCÂNULAS
  'microcanula-22g-50': 'https://via.placeholder.com/400x400/1f2937/ffffff?text=MICROCÂNULA+22G+50MM',
  'microcanula-25g-50': 'https://via.placeholder.com/400x400/1f2937/ffffff?text=MICROCÂNULA+25G+50MM',
  'microcanula-22g-70': 'https://via.placeholder.com/400x400/1f2937/ffffff?text=MICROCÂNULA+22G+70MM',
  'microcanula-18g-100': 'https://via.placeholder.com/400x400/1f2937/ffffff?text=MICROCÂNULA+18G+100MM',
  'microcanula-18g-70': 'https://via.placeholder.com/400x400/1f2937/ffffff?text=MICROCÂNULA+18G+70MM',
  'microcanula-25g-38': 'https://via.placeholder.com/400x400/1f2937/ffffff?text=MICROCÂNULA+25G+38MM',
  
  // ENZIMAS
  'hialuronidase': 'https://via.placeholder.com/400x400/dc2626/ffffff?text=HIALURONIDASE+3+VIALS+2000+UTR',
  
  // Fallback genérico
  default: 'https://via.placeholder.com/400x400/6b7280/ffffff?text=PRODUTO+MÉDICO'
};

export const mockProducts = [
  // =============================================
  // TOXINAS BOTULÍNICAS (Preços PIX)
  // =============================================
  
  // DL BOTOX
  {
    id: '1',
    name: 'DL BOTOX 50UI',
    slug: 'dl-botox-50ui',
    price: 530.00,
    description: 'Toxina botulínica tipo A premium para tratamentos estéticos de alta qualidade. Indicada para rugas de expressão e linhas finas.',
    images: [productImages['botox-50ui']],
    category: 'Toxina Botulínica',
    stock: 50,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },
  {
    id: '2',
    name: 'DL BOTOX 100UI',
    slug: 'dl-botox-100ui',
    price: 799.00,
    description: 'Toxina botulínica tipo A premium 100UI para tratamentos estéticos avançados. Ideal para áreas extensas e múltiplas aplicações.',
    images: [productImages['botox-100ui']],
    category: 'Toxina Botulínica',
    stock: 30,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },
  {
    id: '3',
    name: 'DL BOTOX 200UI',
    slug: 'dl-botox-200ui',
    price: 1400.00,
    description: 'Toxina botulínica tipo A premium 200UI para tratamentos estéticos profissionais. Máxima potência para resultados excepcionais.',
    images: [productImages['botox-200ui']],
    category: 'Toxina Botulínica',
    stock: 20,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },
  
  // DL BOTULIFT
  {
    id: '4',
    name: 'DL BOTULIFT 100UI',
    slug: 'dl-botulift-100ui',
    price: 775.00,
    description: 'Toxina botulínica especializada para lifting facial. Tecnologia avançada para rejuvenescimento e lifting natural.',
    images: [productImages['botulift-100ui']],
    category: 'Toxina Botulínica',
    stock: 25,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },
  {
    id: '5',
    name: 'DL BOTULIFT 150UI',
    slug: 'dl-botulift-150ui',
    price: 940.00,
    description: 'Toxina botulínica para lifting facial 150UI. Concentração ideal para tratamentos de rejuvenescimento extensivos.',
    images: [productImages['botulift-150ui']],
    category: 'Toxina Botulínica',
    stock: 20,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },
  {
    id: '6',
    name: 'DL BOTULIFT 200UI',
    slug: 'dl-botulift-200ui',
    price: 1245.00,
    description: 'Toxina botulínica para lifting facial 200UI. Máxima concentração para tratamentos de rejuvenescimento profissionais.',
    images: [productImages['botulift-200ui']],
    category: 'Toxina Botulínica',
    stock: 15,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },
  
  // DL BOTULIM
  {
    id: '7',
    name: 'DL BOTULIM 50UI',
    slug: 'dl-botulim-50ui',
    price: 499.00,
    description: 'Toxina botulínica tipo A com excelente custo-benefício. Eficácia comprovada para tratamentos estéticos básicos.',
    images: [productImages['botulim-50ui']],
    category: 'Toxina Botulínica',
    stock: 40,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },
  {
    id: '8',
    name: 'DL BOTULIM 100UI',
    slug: 'dl-botulim-100ui',
    price: 649.00,
    description: 'Toxina botulínica tipo A 100UI com ótimo custo-benefício. Ideal para clínicas que buscam qualidade e economia.',
    images: [productImages['botulim-100ui']],
    category: 'Toxina Botulínica',
    stock: 35,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },
  {
    id: '9',
    name: 'DL BOTULIM 200UI',
    slug: 'dl-botulim-200ui',
    price: 1065.00,
    description: 'Toxina botulínica tipo A 200UI econômica. Concentração elevada com excelente relação custo-benefício.',
    images: [productImages['botulim-200ui']],
    category: 'Toxina Botulínica',
    stock: 25,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },
  
  // DL DYSPORT
  {
    id: '10',
    name: 'DL DYSPORT 300UI',
    slug: 'dl-dysport-300ui',
    price: 959.00,
    description: 'Toxina botulínica Dysport 300UI. Tecnologia europeia com difusão otimizada para resultados naturais.',
    images: [productImages['dysport-300ui']],
    category: 'Toxina Botulínica',
    stock: 20,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },
  {
    id: '11',
    name: 'DL DYSPORT 500UI',
    slug: 'dl-dysport-500ui',
    price: 1349.00,
    description: 'Toxina botulínica Dysport 500UI. Alta concentração com tecnologia avançada para tratamentos profissionais.',
    images: [productImages['dysport-500ui']],
    category: 'Toxina Botulínica',
    stock: 15,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },
  
  // DL NABOTA
  {
    id: '12',
    name: 'DL NABOTA 100UI',
    slug: 'dl-nabota-100ui',
    price: 620.00,
    description: 'Toxina botulínica coreana Nabota 100UI. Tecnologia asiática com alta pureza e eficácia comprovada.',
    images: [productImages['nabota-100ui']],
    category: 'Toxina Botulínica',
    stock: 30,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },
  
  // DL XEOMIN
  {
    id: '13',
    name: 'DL XEOMIN 100UI',
    slug: 'dl-xeomin-100ui',
    price: 620.00,
    description: 'Toxina botulínica alemã Xeomin 100UI. Proteína pura sem complexantes para resultados precisos.',
    images: [productImages['xeomin-100ui']],
    category: 'Toxina Botulínica',
    stock: 25,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },

  // =============================================
  // BIOESTIMULADORES (Preços PIX)
  // =============================================
  {
    id: '14',
    name: 'DL ELLANSE M',
    slug: 'dl-ellanse-m',
    price: 1199.00,
    description: 'Bioestimulador de colágeno Ellanse M com duração média. Estimula a produção natural de colágeno para rejuvenescimento facial.',
    images: [productImages['ellanse-m']],
    category: 'Bioestimulador',
    stock: 15,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },
  {
    id: '15',
    name: 'DL ELLANSE S',
    slug: 'dl-ellanse-s',
    price: 1020.00,
    description: 'Bioestimulador de colágeno Ellanse S com duração curta. Ideal para quem busca resultados naturais e graduais.',
    images: [productImages['ellanse-s']],
    category: 'Bioestimulador',
    stock: 20,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },
  {
    id: '16',
    name: 'DL HARMONYCA 2ML',
    slug: 'dl-harmonyca-2ml',
    price: 1850.00,
    description: 'Bioestimulador híbrido Harmonyca 2ML. Combina ácido hialurônico com microesferas de hidroxiapatita de cálcio.',
    images: [productImages['harmonyca-2ml']],
    category: 'Bioestimulador',
    stock: 10,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },
  {
    id: '17',
    name: 'DL SCULPTRA 2 FRASCOS',
    slug: 'dl-sculptra-2-frascos',
    price: 2149.00,
    description: 'Bioestimulador Sculptra kit com 2 frascos. Poli-L-láctico premium para rejuvenescimento facial profundo.',
    images: [productImages['sculptra-2']],
    category: 'Bioestimulador',
    stock: 8,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },

  // =============================================
  // PREENCHEDORES (Preços PIX) - Amostra
  // =============================================
  {
    id: '18',
    name: 'DL BELOTERO BALANCE LIDO',
    slug: 'dl-belotero-balance-lido',
    price: 265.00,
    description: 'Preenchedor Belotero Balance com lidocaína para rugas finas. Tecnologia Cohesive Polydensified Matrix.',
    images: [productImages['belotero-balance']],
    category: 'Preenchedor',
    stock: 40,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },
  {
    id: '19',
    name: 'DL RESTYLANE KYSSE 1ML',
    slug: 'dl-restylane-kysse-1ml',
    price: 420.00,
    description: 'Preenchedor Restylane Kysse 1ML para lábios. Tecnologia OBT para resultados naturais e duradouros.',
    images: [productImages['restylane-kysse']],
    category: 'Preenchedor',
    stock: 30,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },

  // =============================================
  // FIOS DE BIOESTIMULAÇÃO (Preços PIX) - Amostra
  // =============================================
  {
    id: '20',
    name: 'DL APRIL BRIDE 18GX100MMX160MM ESPICULADO PACK 4 FIOS',
    slug: 'dl-april-bride-18gx100mmx160mm-espiculado-pack-4-fios',
    price: 380.00,
    description: 'Fios April Bride 18G espiculados pack 4 unidades. Bioestimulação intensiva com espículas para máximo estímulo de colágeno.',
    images: [productImages.fio],
    category: 'Fio Bioestimulação',
    stock: 20,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },

  // =============================================
  // MICROCÂNULAS (Preços PIX) - Amostra
  // =============================================
  {
    id: '21',
    name: 'DL MICROCÂNULA PRO DEEP (22GX50MM)',
    slug: 'dl-microcanula-pro-deep-22gx50mm',
    price: 15.00,
    description: 'Microcânula Pro Deep 22G x 50mm. Aplicação profunda com máxima precisão e mínimo trauma tecidual.',
    images: [productImages.microcanula],
    category: 'Microcânula',
    stock: 100,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  },

  // =============================================
  // ENZIMAS (Preços PIX)
  // =============================================
  {
    id: '22',
    name: 'DL HIALURONIDASE 3 VIALS 2.000 UTR',
    slug: 'dl-hialuronidase-3-vials-2000-utr',
    price: 170.00,
    description: 'Hialuronidase 3 vials 2.000 UTR. Enzima para dissolução de ácido hialurônico em procedimentos de correção e emergência.',
    images: [productImages.enzima],
    category: 'Enzima',
    stock: 25,
    discount_percent: 0,
    currency: 'BRL',
    active: true
  }
];

// Função para obter produtos mock (síncrona - compatibilidade)
export function getMockProducts(): MockProduct[] {
  return mockProducts.filter(product => product.active);
}

// Função para obter produto por slug (síncrona - compatibilidade)
export function getMockProductBySlug(slug: string): MockProduct | undefined {
  return mockProducts.find(product => product.slug === slug && product.active);
}

// Versões com cache inteligente (assíncronas - performance)
export async function getMockProductsCached(): Promise<MockProduct[]> {
  return smartCache.getOrSet(
    'products:all:active',
    () => Promise.resolve(getMockProducts()),
    10 * 60 * 1000 // 10 minutos de cache
  );
}

export async function getMockProductBySlugCached(slug: string): Promise<MockProduct | undefined> {
  return smartCache.getOrSet(
    `product:slug:${slug}`,
    () => Promise.resolve(getMockProductBySlug(slug)),
    15 * 60 * 1000 // 15 minutos de cache (produtos individuais duram mais)
  );
} 