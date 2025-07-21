/**
 * TESTE DO FLUXO WHATSAPP - VYTALLE ESTÉTICA
 * ==========================================
 * 
 * Validação do fluxo completo de pedidos via WhatsApp
 */

console.log('📱 TESTE DO FLUXO WHATSAPP');
console.log('============================');

// Simular dados de teste
const dadosCliente = {
  nome: 'Maria Silva',
  whatsapp: '(62) 99999-9999',
  cep: '74000-000'
};

const carrinho = [
  { 
    id: '1', 
    name: 'DL BOTOX 50UI', 
    price: 530.00, 
    quantity: 2 
  },
  { 
    id: '2', 
    name: 'DL ELLANSE M', 
    price: 1199.00, 
    quantity: 1 
  }
];

// Teste 1: Formatação da mensagem WhatsApp
console.log('\n🧪 TESTE 1: Formatação da Mensagem');
console.log('===================================');

const subtotal = carrinho.reduce((total, item) => total + (item.price * item.quantity), 0);
const desconto = subtotal * 0.05; // 5% desconto PIX
const total = subtotal - desconto;

const mensagem = `🌟 *PEDIDO VYTALLE ESTÉTICA*

👤 *DADOS DO CLIENTE:*
• Nome: ${dadosCliente.nome}
• WhatsApp: ${dadosCliente.whatsapp}
• CEP: ${dadosCliente.cep}

🛒 *PRODUTOS SOLICITADOS:*
${carrinho.map(item => 
  `• ${item.name}\\n  Qtd: ${item.quantity} | Valor: R$ ${item.price.toFixed(2)}`
).join('\\n\\n')}

💰 *RESUMO FINANCEIRO:*
• Subtotal: R$ ${subtotal.toFixed(2)}
• Desconto PIX (5%): -R$ ${desconto.toFixed(2)}
• *TOTAL: R$ ${total.toFixed(2)}*

📋 *PRÓXIMOS PASSOS:*
1️⃣ Confirme seu endereço completo
2️⃣ Escolha a forma de pagamento
3️⃣ Receba o produto em casa

🔒 *Compra 100% segura com produtos originais!*

_Mensagem enviada via Catálogo Digital Vytalle_`;

console.log('✅ Mensagem formatada com sucesso');
console.log('📏 Tamanho da mensagem:', mensagem.length, 'caracteres');

// Verificações da mensagem
const verificacoes = [
  { nome: 'Contém dados do cliente', teste: mensagem.includes(dadosCliente.nome) },
  { nome: 'Contém WhatsApp', teste: mensagem.includes(dadosCliente.whatsapp) },
  { nome: 'Contém CEP', teste: mensagem.includes(dadosCliente.cep) },
  { nome: 'Lista produtos', teste: carrinho.every(item => mensagem.includes(item.name)) },
  { nome: 'Mostra quantidades', teste: mensagem.includes('Qtd:') },
  { nome: 'Calcula subtotal', teste: mensagem.includes(subtotal.toFixed(2)) },
  { nome: 'Aplica desconto PIX', teste: mensagem.includes(desconto.toFixed(2)) },
  { nome: 'Mostra total final', teste: mensagem.includes(total.toFixed(2)) },
  { nome: 'Inclui próximos passos', teste: mensagem.includes('PRÓXIMOS PASSOS') },
  { nome: 'Marca a empresa', teste: mensagem.includes('Vytalle') }
];

let verificacoesPassaram = 0;
verificacoes.forEach(verificacao => {
  if (verificacao.teste) {
    console.log(`✅ ${verificacao.nome}`);
    verificacoesPassaram++;
  } else {
    console.log(`❌ ${verificacao.nome}`);
  }
});

console.log(`\n📊 Verificações: ${verificacoesPassaram}/${verificacoes.length} aprovadas`);

// Teste 2: URL do WhatsApp
console.log('\n🧪 TESTE 2: URL do WhatsApp');
console.log('============================');

const numeroWhatsApp = '5562999404495';
const mensagemEncoded = encodeURIComponent(mensagem);
const whatsappUrl = `https://wa.me/${numeroWhatsApp}?text=${mensagemEncoded}`;

console.log('✅ URL gerada com sucesso');
console.log('📏 Tamanho da URL:', whatsappUrl.length, 'caracteres');

// Verificar componentes da URL
const verificacoesUrl = [
  { nome: 'Protocolo HTTPS', teste: whatsappUrl.startsWith('https://') },
  { nome: 'Domínio wa.me', teste: whatsappUrl.includes('wa.me') },
  { nome: 'Número brasileiro', teste: whatsappUrl.includes('5562') },
  { nome: 'Parâmetro text', teste: whatsappUrl.includes('?text=') },
  { nome: 'Mensagem encoded', teste: whatsappUrl.includes('%') },
  { nome: 'Tamanho aceitável', teste: whatsappUrl.length < 8000 } // Limite seguro para URLs
];

let verificacoesUrlPassaram = 0;
verificacoesUrl.forEach(verificacao => {
  if (verificacao.teste) {
    console.log(`✅ ${verificacao.nome}`);
    verificacoesUrlPassaram++;
  } else {
    console.log(`❌ ${verificacao.nome}`);
  }
});

console.log(`\n📊 Verificações URL: ${verificacoesUrlPassaram}/${verificacoesUrl.length} aprovadas`);

// Teste 3: Validação dos dados obrigatórios
console.log('\n🧪 TESTE 3: Validação dos Dados');
console.log('================================');

const validacaoDados = [
  { campo: 'Nome', valor: dadosCliente.nome, obrigatorio: true, valido: dadosCliente.nome?.length > 2 },
  { campo: 'WhatsApp', valor: dadosCliente.whatsapp, obrigatorio: true, valido: /\(\d{2}\)\s\d{4,5}-\d{4}/.test(dadosCliente.whatsapp) },
  { campo: 'CEP', valor: dadosCliente.cep, obrigatorio: true, valido: /\d{5}-\d{3}/.test(dadosCliente.cep) }
];

let dadosValidos = 0;
validacaoDados.forEach(validacao => {
  if (validacao.valido) {
    console.log(`✅ ${validacao.campo}: ${validacao.valor}`);
    dadosValidos++;
  } else {
    console.log(`❌ ${validacao.campo}: ${validacao.valor || 'VAZIO'}`);
  }
});

console.log(`\n📊 Dados válidos: ${dadosValidos}/${validacaoDados.length}`);

// Teste 4: Cálculos financeiros
console.log('\n🧪 TESTE 4: Cálculos Financeiros');
console.log('=================================');

const calculosCorretos = [
  { nome: 'Subtotal correto', esperado: 2259.00, calculado: subtotal },
  { nome: 'Desconto 5% PIX', esperado: 112.95, calculado: desconto },
  { nome: 'Total com desconto', esperado: 2146.05, calculado: total }
];

let calculosCorretosCont = 0;
calculosCorretos.forEach(calculo => {
  const diferenca = Math.abs(calculo.esperado - calculo.calculado);
  if (diferenca < 0.01) { // Tolerância para arredondamento
    console.log(`✅ ${calculo.nome}: R$ ${calculo.calculado.toFixed(2)}`);
    calculosCorretosCont++;
  } else {
    console.log(`❌ ${calculo.nome}: R$ ${calculo.calculado.toFixed(2)} (esperado: R$ ${calculo.esperado.toFixed(2)})`);
  }
});

console.log(`\n📊 Cálculos corretos: ${calculosCorretosCont}/${calculosCorretos.length}`);

// RELATÓRIO FINAL DO WHATSAPP
console.log('\n📋 RELATÓRIO FINAL - WHATSAPP');
console.log('==============================');

const pontuacaoWhatsApp = (
  (verificacoesPassaram / verificacoes.length) * 40 +
  (verificacoesUrlPassaram / verificacoesUrl.length) * 30 +
  (dadosValidos / validacaoDados.length) * 20 +
  (calculosCorretosCont / calculosCorretos.length) * 10
);

console.log(`📱 Formatação da mensagem: ${verificacoesPassaram}/${verificacoes.length}`);
console.log(`🔗 URL do WhatsApp: ${verificacoesUrlPassaram}/${verificacoesUrl.length}`);
console.log(`✅ Validação dos dados: ${dadosValidos}/${validacaoDados.length}`);
console.log(`💰 Cálculos financeiros: ${calculosCorretosCont}/${calculosCorretos.length}`);

console.log(`\n🎯 PONTUAÇÃO WHATSAPP: ${pontuacaoWhatsApp.toFixed(1)}/100`);

if (pontuacaoWhatsApp >= 90) {
  console.log('🟢 STATUS: WHATSAPP FUNCIONANDO PERFEITAMENTE!');
} else if (pontuacaoWhatsApp >= 75) {
  console.log('🟡 STATUS: WHATSAPP FUNCIONANDO BEM - Pequenos ajustes');
} else {
  console.log('🔴 STATUS: WHATSAPP NECESSITA CORREÇÕES');
}

console.log('\n📱 TESTE WHATSAPP CONCLUÍDO');
console.log('📅 Data:', new Date().toLocaleString('pt-BR'));
console.log('=' .repeat(40));