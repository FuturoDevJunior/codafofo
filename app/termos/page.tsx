import { ArrowLeft, CheckCircle, FileText, Scale, Shield } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function TermosPage() {
  return (
    <div className="via-white min-h-screen bg-gradient-to-br from-vitale-primary/5 to-vitale-secondary/5">
      {/* Header */}
      <header className="bg-white border-b border-vitale-primary/20 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button
                variant="outline"
                className="hover:text-white gap-2 border-vitale-primary/30 text-vitale-primary hover:bg-vitale-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Início
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-vitale-primary">
              <Scale className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Termos de Uso</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12">
        {/* Intro Section */}
        <div className="bg-white mb-8 rounded-2xl border border-vitale-primary/20 p-8 shadow-lg">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vitale-primary/10">
              <FileText className="h-8 w-8 text-vitale-primary" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-vitale-primary">
              Termos de Uso - Vytalle Estética
            </h2>
            <p className="text-lg leading-relaxed text-neutral-600">
              Estes termos regulam o uso dos serviços da Vytalle Estética & Viscosuplementação.
              <br />
              <strong>Última atualização:</strong>Dezembro de 2024
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50 border-amber-200 mb-6 rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <Shield className="text-amber-600 mt-0.5 h-5 w-5" />
              <div>
                <h3 className="text-amber-800 mb-1 font-semibold">Importante</h3>
                <p className="text-amber-700 text-sm">
                  Nossos produtos são destinados{' '}
                  <strong>exclusivamente a profissionais da área da saúde</strong>
                  habilitados. É necessário apresentar documento comprobatório da profissão.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section className="bg-white rounded-xl border border-vitale-primary/10 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-vitale-primary">
              <CheckCircle className="h-6 w-6" />
              1. Aceitação dos Termos
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-700">
              <p>
                Ao acessar e utilizar o site da{' '}
                <strong>Vytalle Estética & Viscosuplementação</strong>, você automaticamente
                concorda integralmente com estes Termos de Uso e com nossa Política de Privacidade.
              </p>
              <p>
                Caso não concorde com qualquer disposição destes termos, pedimos que
                <strong> não utilize nossos serviços</strong> e interrompa o acesso imediatamente.
              </p>
              <p>
                Estes termos constituem um acordo legal vinculativo entre você (o usuário) e a
                Vytalle Estética & Viscosuplementação.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-xl border border-vitale-primary/10 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-vitale-primary">
              <CheckCircle className="h-6 w-6" />
              2. Uso Autorizado do Site
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-700">
              <p className="font-semibold text-vitale-primary">
                PÚBLICO-ALVO RESTRITO: Profissionais da Saúde
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Médicos dermatologistas, cirurgiões plásticos e estetas</li>
                <li>Biomédicos especializados em estética</li>
                <li>Enfermeiros especialistas em procedimentos estéticos</li>
                <li>Fisioterapeutas dermatofuncionais</li>
                <li>Farmacêuticos especialistas em produtos estéticos</li>
                <li>Dentistas especializados em harmonização orofacial</li>
              </ul>
              <div className="bg-red-50 border-red-200 mt-4 rounded-lg border p-4">
                <h4 className="text-red-800 mb-2 font-semibold">Uso Proibido:</h4>
                <ul className="text-red-700 list-disc space-y-1 pl-4 text-sm">
                  <li>Revenda não autorizada de produtos</li>
                  <li>Uso por pessoas não habilitadas profissionalmente</li>
                  <li>Aplicação em procedimentos não regulamentados</li>
                  <li>Reprodução não autorizada de conteúdo</li>
                  <li>Atividades ilegais ou fraudulentas</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-xl border border-vitale-primary/10 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-vitale-primary">
              <CheckCircle className="h-6 w-6" />
              3. Produtos e Responsabilidades
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-700">
              <h4 className="font-semibold text-vitale-primary">Garantia de Autenticidade</h4>
              <p>
                Todos os produtos comercializados pela Vytalle são <strong>100% originais</strong>,
                importados diretamente dos fabricantes oficiais e possuem registro na ANVISA.
              </p>

              <h4 className="font-semibold text-vitale-primary">Responsabilidade Profissional</h4>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  O profissional é inteiramente responsável pela indicação, aplicação e
                  acompanhamento
                </li>
                <li>Deve seguir rigorosamente as instruções técnicas dos fabricantes</li>
                <li>Precisa possuir capacitação técnica adequada para cada produto</li>
                <li>Deve obter consentimento informado dos pacientes</li>
                <li>É obrigatório manter documentação completa dos procedimentos</li>
              </ul>

              <h4 className="font-semibold text-vitale-primary">Limitação de Responsabilidade</h4>
              <p>A Vytalle não se responsabiliza por:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Complicações decorrentes de má aplicação dos produtos</li>
                <li>Uso inadequado ou por profissionais não habilitados</li>
                <li>Reações adversas não previstas nas bulas dos produtos</li>
                <li>Resultados estéticos que não atendam às expectativas</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-xl border border-vitale-primary/10 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-vitale-primary">
              <CheckCircle className="h-6 w-6" />
              4. Propriedade Intelectual
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-700">
              <p>Todo o conteúdo do site, incluindo mas não limitado a:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Textos, imagens, vídeos e materiais educativos</li>
                <li>Marca Vytalle e logotipos associados</li>
                <li>Layout, design e interface do site</li>
                <li>Banco de dados de produtos e informações técnicas</li>
                <li>Protocolos e materiais didáticos exclusivos</li>
              </ul>
              <p>
                São protegidos por direitos autorais e propriedade intelectual, sendo vedada a
                reprodução sem autorização expressa e por escrito.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-white rounded-xl border border-vitale-primary/10 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-vitale-primary">
              <CheckCircle className="h-6 w-6" />
              5. Política de Compras e Pagamentos
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-700">
              <h4 className="font-semibold text-vitale-primary">Condições de Compra</h4>
              <ul className="list-disc space-y-1 pl-6">
                <li>Pedidos sujeitos à confirmação de estoque</li>
                <li>Preços válidos conforme tabela vigente no momento da compra</li>
                <li>Entrega mediante comprovação de habilitação profissional</li>
                <li>
                  Prazo de entrega de 24 a 48 horas para São Paulo (pode variar para outras regiões)
                </li>
              </ul>

              <h4 className="font-semibold text-vitale-primary">Formas de Pagamento</h4>
              <ul className="list-disc space-y-1 pl-6">
                <li>PIX (desconto especial)</li>
                <li>Cartão de crédito (parcelamento disponível)</li>
                <li>Transferência bancária</li>
                <li>Boleto bancário (consulte condições)</li>
              </ul>

              <h4 className="font-semibold text-vitale-primary">Política de Troca e Devolução</h4>
              <p>
                Produtos podem ser trocados em até <strong>7 dias</strong> desde que:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Estejam em perfeitas condições e embalagem original</li>
                <li>Não tenham sido violados os lacres de segurança</li>
                <li>Apresentem nota fiscal e comprovante de compra</li>
                <li>Cumpram as normas sanitárias para produtos médicos</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-xl border border-vitale-primary/10 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-vitale-primary">
              <CheckCircle className="h-6 w-6" />
              6. Privacidade e Proteção de Dados
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-700">
              <p>
                A Vytalle está comprometida com a proteção dos seus dados pessoais, seguindo
                rigorosamente as disposições da{' '}
                <strong>Lei Geral de Proteção de Dados (LGPD)</strong>.
              </p>
              <p>
                Para informações detalhadas sobre coleta, uso e proteção dos seus dados, consulte
                nossa{' '}
                <Link href="/privacidade" className="font-semibold text-vitale-primary underline">
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-white rounded-xl border border-vitale-primary/10 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-vitale-primary">
              <CheckCircle className="h-6 w-6" />
              7. Alterações dos Termos
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-700">
              <p>
                A Vytalle reserva-se o direito de alterar estes Termos de Uso a qualquer momento,
                visando melhorar nossos serviços e adequar-se às mudanças legais e regulamentares.
              </p>
              <p>
                <strong>Notificação de Mudanças:</strong> Alterações significativas serão
                comunicadas por e-mail e/ou aviso em destaque no site com antecedência mínima de 30
                dias.
              </p>
              <p>
                Recomendamos a <strong>revisão periódica</strong> deste documento para manter-se
                atualizado com nossas políticas.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="bg-white rounded-xl border border-vitale-primary/10 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-vitale-primary">
              <CheckCircle className="h-6 w-6" />
              8. Contato e Suporte
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-700">
              <p>Para dúvidas, solicitações ou qualquer questão relacionada a estes termos:</p>

              <div className="space-y-2 rounded-lg bg-vitale-primary/5 p-4">
                <p>
                  <strong>E-mail:</strong>{' '}
                  <a
                    href="mailto:contato.ferreirag@outlook.com"
                    className="text-vitale-primary underline"
                  >
                    contato.ferreirag@outlook.com
                  </a>
                </p>
                <p>
                  <strong>WhatsApp:</strong>{' '}
                  <a href="https://wa.me/5521996192890" className="text-vitale-primary underline">
                    (21) 99619-2890
                  </a>
                </p>
                <p>
                  <strong>Horário de Atendimento:</strong> Segunda a Sexta, 8h às 18h
                </p>
                <p>
                  <strong>Resposta:</strong> Até 24 horas em dias úteis
                </p>
              </div>

              <p className="text-sm text-neutral-600">
                <strong>Vytalle Estética & Viscosuplementação</strong>
                <br />
                CNPJ: [Número do CNPJ]
                <br />
                Endereço: [Endereço completo]
                <br />
                Data de entrada em vigor: Janeiro de 2024
              </p>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 space-y-4 text-center">
          <div className="bg-green-50 border-green-200 rounded-lg border p-6">
            <h3 className="text-green-800 mb-2 font-semibold">✓ Termos Aceitos</h3>
            <p className="text-green-700 text-sm">
              Ao continuar navegando em nosso site, você confirma que leu, compreendeu e concorda
              com todos os termos acima descritos.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/">
              <Button className="text-white bg-vitale-primary hover:bg-vitale-secondary">
                Voltar ao Site
              </Button>
            </Link>
            <Link href="/privacidade">
              <Button
                variant="outline"
                className="hover:text-white border-vitale-primary text-vitale-primary hover:bg-vitale-primary"
              >
                Ver Política de Privacidade
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
