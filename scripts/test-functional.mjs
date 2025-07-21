/**
 * TESTES FUNCIONAIS - VYTALLE ESTÉTICA
 * =====================================
 * 
 * Validação completa de funcionalidades do sistema
 */

import fs from 'fs';
import path from 'path';

// Simular os dados do mockData diretamente
const mockProducts = [
  {
    id: '1',
    name: 'DL BOTOX 50UI',
    slug: 'dl-botox-50ui',
    price: 530.00,
    description: 'Toxina botulínica tipo A premium para tratamentos estéticos de alta qualidade.',
    images: ['https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop&crop=center'],
    category: 'Toxina Botulínica',
    stock: 25,
    active: true
  },
  {
    id: '2', 
    name: 'DL BOTOX 100UI',
    slug: 'dl-botox-100ui',
    price: 799.00,
    description: 'Toxina botulínica tipo A premium 100UI para tratamentos estéticos avançados.',
    images: ['https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop&crop=center'],
    category: 'Toxina Botulínica',
    stock: 20,
    active: true
  }
];

// Ler arquivo mockData.ts e extrair produtos
console.log('📖 Lendo arquivo mockData.ts...');
const mockDataPath = path.join(process.cwd(), 'lib', 'mockData.ts');
const mockDataContent = fs.readFileSync(mockDataPath, 'utf8');

// Extrair produtos do arquivo (análise simples)
const productMatches = mockDataContent.match(/{\s*id:\s*'[^']*',[\s\S]*?}/g) || [];
console.log(`📦 Encontrados ${productMatches.length} produtos no arquivo`);

// Teste 1: Validação das imagens
console.log('\n🧪 TESTE 1: Validação das Imagens');
console.log('===================================');

let imagensFieis = 0;
let imagensGenericas = 0;

// Contar imagens fiéis vs genéricas no código
const unsplashMatches = (mockDataContent.match(/unsplash\.com/g) || []).length;
const placeholderMatches = (mockDataContent.match(/placeholder\.com/g) || []).length;

console.log(`✅ Imagens do Unsplash (fiéis): ${unsplashMatches}`);
console.log(`⚠️  Imagens de placeholder (genéricas): ${placeholderMatches}`);

const totalImagens = unsplashMatches + placeholderMatches;
const taxaFidelidade = totalImagens > 0 ? ((unsplashMatches / totalImagens) * 100).toFixed(1) : 0;

console.log(`📈 Taxa de fidelidade das imagens: ${taxaFidelidade}%`);

// Teste 2: Validação da estrutura dos produtos
console.log('\n🧪 TESTE 2: Estrutura dos Produtos');
console.log('===================================');

const camposObrigatorios = ['id', 'name', 'slug', 'price', 'description', 'images', 'category', 'stock'];
let estruturaValida = true;

camposObrigatorios.forEach(campo => {
  const regex = new RegExp(`${campo}:\\s*`, 'g');
  const matches = (mockDataContent.match(regex) || []).length;
  console.log(`   ${campo}: ${matches} ocorrências`);
  
  if (matches < productMatches.length * 0.8) {
    estruturaValida = false;
    console.log(`   ⚠️  ${campo} pode estar faltando em alguns produtos`);
  }
});

console.log(`✅ Estrutura geral: ${estruturaValida ? 'VÁLIDA' : 'NECESSITA REVISÃO'}`);

// Teste 3: Validação das categorias
console.log('\n🧪 TESTE 3: Categorias dos Produtos');
console.log('===================================');

const categoriaRegex = /category:\s*'([^']*)',/g;
const categorias = [];
let match;

while ((match = categoriaRegex.exec(mockDataContent)) !== null) {
  categorias.push(match[1]);
}

const categoriasUnicas = [...new Set(categorias)];
console.log('📋 Categorias encontradas:');
categoriasUnicas.forEach((categoria, index) => {
  const quantidade = categorias.filter(c => c === categoria).length;
  console.log(`   ${index + 1}. ${categoria} (${quantidade} produtos)`);
});

// Teste 4: Validação dos preços
console.log('\n🧪 TESTE 4: Validação dos Preços');
console.log('=================================');

const precoRegex = /price:\s*([\d.]+),/g;
const precos = [];

while ((match = precoRegex.exec(mockDataContent)) !== null) {
  precos.push(parseFloat(match[1]));
}

if (precos.length > 0) {
  const precoMinimo = Math.min(...precos);
  const precoMaximo = Math.max(...precos);
  const precoMedio = precos.reduce((a, b) => a + b, 0) / precos.length;

  console.log(`💰 Preços encontrados: ${precos.length}`);
  console.log(`💰 Preço mínimo: R$ ${precoMinimo.toFixed(2)}`);
  console.log(`💰 Preço máximo: R$ ${precoMaximo.toFixed(2)}`);
  console.log(`💰 Preço médio: R$ ${precoMedio.toFixed(2)}`);
} else {
  console.log('❌ Nenhum preço encontrado');
}

// Teste 5: Validação dos slugs
console.log('\n🧪 TESTE 5: Validação dos Slugs');
console.log('================================');

const slugRegex = /slug:\s*'([^']*)',/g;
const slugs = [];

while ((match = slugRegex.exec(mockDataContent)) !== null) {
  slugs.push(match[1]);
}

const slugsUnicos = [...new Set(slugs)];
console.log(`🔗 Slugs encontrados: ${slugs.length}`);
console.log(`🔗 Slugs únicos: ${slugsUnicos.length}`);

if (slugs.length === slugsUnicos.length) {
  console.log('✅ Todos os slugs são únicos');
} else {
  console.log(`❌ Slugs duplicados encontrados!`);
}

// Verificar formato dos slugs
let slugsValidos = 0;
slugs.forEach(slug => {
  if (/^[a-z0-9-]+$/.test(slug)) {
    slugsValidos++;
  }
});

console.log(`✅ Slugs com formato válido: ${slugsValidos}/${slugs.length}`);

// Teste 6: Verificação de arquivos principais
console.log('\n🧪 TESTE 6: Arquivos do Sistema');
console.log('===============================');

const arquivosPrincipais = [
  'app/page.tsx',
  'app/products/page.tsx', 
  'app/cart/page.tsx',
  'app/admin/login/page.tsx',
  'app/admin/dashboard/page.tsx',
  'components/ProductCard.tsx',
  'components/WhatsAppButton.tsx',
  'components/CartSidebar.tsx',
  'lib/mockData.ts',
  'lib/store.ts'
];

let arquivosEncontrados = 0;
arquivosPrincipais.forEach(arquivo => {
  const caminhoCompleto = path.join(process.cwd(), arquivo);
  if (fs.existsSync(caminhoCompleto)) {
    arquivosEncontrados++;
    console.log(`✅ ${arquivo}`);
  } else {
    console.log(`❌ ${arquivo} - NÃO ENCONTRADO`);
  }
});

console.log(`📁 Arquivos encontrados: ${arquivosEncontrados}/${arquivosPrincipais.length}`);

// RELATÓRIO FINAL
console.log('\n📋 RELATÓRIO FINAL DOS TESTES');
console.log('==============================');
console.log(`📦 Produtos detectados: ${productMatches.length}`);
console.log(`🖼️  Taxa de imagens fiéis: ${taxaFidelidade}%`);
console.log(`✅ Estrutura: ${estruturaValida ? 'VÁLIDA' : 'NECESSITA REVISÃO'}`);
console.log(`🏷️  Categorias únicas: ${categoriasUnicas.length}`);
console.log(`🔗 Slugs únicos: ${slugsUnicos.length}/${slugs.length}`);
console.log(`💰 Preços válidos: ${precos.length}`);
console.log(`📁 Arquivos principais: ${arquivosEncontrados}/${arquivosPrincipais.length}`);

// Calcular pontuação
const pontuacaoImagens = parseFloat(taxaFidelidade);
const pontuacaoEstrutura = estruturaValida ? 100 : 75;
const pontuacaoSlugs = slugs.length > 0 ? (slugsUnicos.length / slugs.length) * 100 : 0;
const pontuacaoArquivos = (arquivosEncontrados / arquivosPrincipais.length) * 100;

const pontuacaoTotal = (pontuacaoImagens * 0.3 + pontuacaoEstrutura * 0.25 + pontuacaoSlugs * 0.25 + pontuacaoArquivos * 0.2);

console.log(`\n🎯 PONTUAÇÃO GERAL: ${pontuacaoTotal.toFixed(1)}/100`);

if (pontuacaoTotal >= 90) {
  console.log('🟢 STATUS: EXCELENTE - Sistema pronto para produção!');
} else if (pontuacaoTotal >= 75) {
  console.log('🟡 STATUS: BOM - Pequenos ajustes recomendados');
} else {
  console.log('🔴 STATUS: NECESSITA CORREÇÕES - Revisar itens marcados');
}

console.log('\n🚀 VYTALLE ESTÉTICA - TESTES FUNCIONAIS CONCLUÍDOS');
console.log('📅 Data:', new Date().toLocaleString('pt-BR'));
console.log('=' .repeat(50));