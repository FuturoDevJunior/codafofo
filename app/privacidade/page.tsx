import { ArrowLeft, CheckCircle, Database, Eye, Lock, Shield } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function PrivacidadePage() {
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
              <Shield className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Política de Privacidade</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12">
        {/* Intro Section */}
        <div className="bg-white mb-8 rounded-2xl border border-vitale-primary/20 p-8 shadow-lg">
          <div className="mb-8 text-center">
            <div className="bg-green-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <Lock className="text-green-600 h-8 w-8" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-vitale-primary">Política de Privacidade</h2>
            <p className="text-lg leading-relaxed text-neutral-600">
              Comprometidos com a proteção dos seus dados pessoais conforme a LGPD.
              <br />
              <strong>Última atualização:</strong>Dezembro de 2024
            </p>
          </div>

          {/* LGPD Badge */}
          <div className="bg-green-50 border-green-200 mb-6 rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <Shield className="text-green-600 mt-0.5 h-5 w-5" />
              <div>
                <h3 className="text-green-800 mb-1 font-semibold">Conformidade LGPD</h3>
                <p className="text-green-700 text-sm">
                  Esta política está em total conformidade com a{' '}
                  <strong>Lei Geral de Proteção de Dados</strong>
                  (Lei nº 13.709/2018) e regulamentações aplicáveis do setor de saúde.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {/* Section 1 - Dados Coletados */}
          <section className="bg-white rounded-xl border border-vitale-primary/10 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-vitale-primary">
              <Database className="h-6 w-6" />
              1. Dados Pessoais Coletados
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-700">
              <p>
                A Vytalle coleta e processa dados pessoais estritamente necessários para fornecer
                nossos serviços especializados a profissionais da saúde.
              </p>

              <h4 className="font-semibold text-vitale-primary">
                Dados de Identificação Profissional
              </h4>
              <ul className="list-disc space-y-1 pl-6">
                <li>Nome completo e nome social (quando aplicável)</li>
                <li>CPF e/ou CNPJ</li>
                <li>Número de registro profissional (CRM, CRO, COREN, etc.)</li>
                <li>Especialidade e área de atuação</li>
                <li>Instituição de formação e certificações</li>
              </ul>

              <h4 className="font-semibold text-vitale-primary">Dados de Contato</h4>
              <ul className="list-disc space-y-1 pl-6">
                <li>E-mail profissional e pessoal</li>
                <li>Telefone comercial e celular</li>
                <li>Endereço do consultório/clínica</li>
                <li>Endereço de entrega (quando diferente)</li>
              </ul>

              <h4 className="font-semibold text-vitale-primary">Dados Comerciais</h4>
              <ul className="list-disc space-y-1 pl-6">
                <li>Histórico de compras e preferências</li>
                <li>Dados de pagamento (criptografados)</li>
                <li>Interações comerciais e comunicações</li>
                <li>Avaliações e feedback sobre produtos</li>
              </ul>

              <h4 className="font-semibold text-vitale-primary">Dados Técnicos</h4>
              <ul className="list-disc space-y-1 pl-6">
                <li>Endereço IP e localização aproximada</li>
                <li>Dados de navegação e uso do site</li>
                <li>Tipo de dispositivo e navegador</li>
                <li>Cookies e tecnologias similares</li>
              </ul>
            </div>
          </section>

          {/* Section 2 - Finalidades */}
          <section className="bg-white rounded-xl border border-vitale-primary/10 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-vitale-primary">
              <Eye className="h-6 w-6" />
              2. Finalidades do Tratamento
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-700">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-vitale-primary">Finalidades Primárias</h4>
                  <ul className="list-disc space-y-1 pl-6 text-sm">
                    <li>Verificação de habilitação profissional</li>
                    <li>Processamento de pedidos e pagamentos</li>
                    <li>Entrega de produtos e logística</li>
                    <li>Atendimento ao cliente e suporte técnico</li>
                    <li>Cumprimento de obrigações legais</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-vitale-primary">
                    Finalidades Secundárias
                  </h4>
                  <ul className="list-disc space-y-1 pl-6 text-sm">
                    <li>Marketing direcionado (com consentimento)</li>
                    <li>Análise de perfil de compra</li>
                    <li>Melhoria de produtos e serviços</li>
                    <li>Comunicações educacionais</li>
                    <li>Pesquisas de satisfação</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border-blue-200 mt-4 rounded-lg border p-4">
                <h4 className="text-blue-800 mb-2 font-semibold">Base Legal do Tratamento</h4>
                <ul className="text-blue-700 list-disc space-y-1 pl-4 text-sm">
                  <li>
                    <strong>Execução de contrato:</strong> Para fornecer produtos e serviços
                  </li>
                  <li>
                    <strong>Legítimo interesse:</strong> Para segurança e prevenção de fraudes
                  </li>
                  <li>
                    <strong>Cumprimento legal:</strong> Para atender obrigações regulatórias
                  </li>
                  <li>
                    <strong>Consentimento:</strong> Para marketing e comunicações promocionais
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 - Compartilhamento */}
          <section className="bg-white rounded-xl border border-vitale-primary/10 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-vitale-primary">
              <CheckCircle className="h-6 w-6" />
              3. Compartilhamento de Dados
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-700">
              <p className="font-semibold text-vitale-primary">
                A Vytalle NÃO vende, aluga ou compartilha dados pessoais para fins comerciais.
              </p>

              <h4 className="font-semibold text-vitale-primary">Compartilhamento Necessário</h4>
              <p>Seus dados podem ser compartilhados apenas nas seguintes situações:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Fornecedores de serviços:</strong> Empresas de logística, pagamento e
                  tecnologia (sob rigorosos contratos de confidencialidade)
                </li>
                <li>
                  <strong>Autoridades competentes:</strong> Quando exigido por lei, ordem judicial
                  ou órgãos reguladores (ANVISA, Conselhos de Classe)
                </li>
                <li>
                  <strong>Transferência de negócios:</strong> Em caso de fusão, aquisição ou
                  reorganização empresarial (com notificação prévia)
                </li>
              </ul>

              <div className="bg-yellow-50 border-yellow-200 rounded-lg border p-4">
                <h4 className="text-yellow-800 mb-2 font-semibold">Parceiros Autorizados</h4>
                <ul className="text-yellow-700 list-disc space-y-1 pl-4 text-sm">
                  <li>Transportadoras licenciadas para produtos médicos</li>
                  <li>Gateways de pagamento certificados (PCI DSS)</li>
                  <li>Provedores de tecnologia em nuvem (AWS, Google Cloud)</li>
                  <li>Sistemas de CRM e atendimento ao cliente</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 - Segurança */}
          <section className="bg-white rounded-xl border border-vitale-primary/10 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-vitale-primary">
              <Shield className="h-6 w-6" />
              4. Segurança dos Dados
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-700">
              <p>
                Implementamos medidas técnicas e organizacionais de segurança de nível hospitalar
                para proteger seus dados pessoais.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-vitale-primary">Medidas Técnicas</h4>
                  <ul className="list-disc space-y-1 pl-6 text-sm">
                    <li>Criptografia SSL/TLS 256-bit</li>
                    <li>Certificados de segurança atualizados</li>
                    <li>Firewall e sistemas anti-intrusão</li>
                    <li>Backup automático criptografado</li>
                    <li>Monitoramento 24/7 de segurança</li>
                    <li>Autenticação multifator</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-vitale-primary">
                    Medidas Organizacionais
                  </h4>
                  <ul className="list-disc space-y-1 pl-6 text-sm">
                    <li>Treinamento em proteção de dados</li>
                    <li>Controle de acesso por função</li>
                    <li>Auditoria regular de segurança</li>
                    <li>Políticas internas rigorosas</li>
                    <li>Plano de resposta a incidentes</li>
                    <li>Teste de penetração periódico</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 border-green-200 rounded-lg border p-4">
                <h4 className="text-green-800 mb-2 font-semibold">Certificações de Segurança</h4>
                <p className="text-green-700 text-sm">
                  Nossos sistemas são regularmente auditados e certificados conforme padrões
                  internacionais de segurança da informação (ISO 27001, SOC 2) e específicos do
                  setor de saúde.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 - Retenção */}
          <section className="bg-white rounded-xl border border-vitale-primary/10 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-vitale-primary">
              <CheckCircle className="h-6 w-6" />
              5. Retenção de Dados
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-700">
              <p>
                Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as
                finalidades para as quais foram coletados.
              </p>

              <div className="rounded-lg bg-neutral-50 p-4">
                <h4 className="mb-3 font-semibold text-vitale-primary">Prazos de Retenção</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-1">
                    <span>Dados de cadastro profissional:</span>
                    <span className="font-semibold">Enquanto conta ativa + 5 anos</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-1">
                    <span>Histórico de compras:</span>
                    <span className="font-semibold">10 anos (obrigação fiscal)</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-1">
                    <span>Dados de navegação:</span>
                    <span className="font-semibold">12 meses</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-1">
                    <span>Comunicações de marketing:</span>
                    <span className="font-semibold">Até revogação do consentimento</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Dados para defesa legal:</span>
                    <span className="font-semibold">Conforme prazo prescricional</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 - Direitos do Titular */}
          <section className="bg-white rounded-xl border border-vitale-primary/10 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-vitale-primary">
              <CheckCircle className="h-6 w-6" />
              6. Seus Direitos como Titular
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-700">
              <p>Conforme a LGPD, você possui os seguintes direitos sobre seus dados pessoais:</p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-blue-800 mb-2 font-semibold">Direitos de Acesso</h4>
                  <ul className="text-blue-700 list-disc space-y-1 pl-4 text-sm">
                    <li>Confirmar existência de tratamento</li>
                    <li>Acessar seus dados pessoais</li>
                    <li>Solicitar correção de dados incompletos</li>
                    <li>Obter portabilidade dos dados</li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="text-purple-800 mb-2 font-semibold">Direitos de Controle</h4>
                  <ul className="text-purple-700 list-disc space-y-1 pl-4 text-sm">
                    <li>Revogar consentimento a qualquer momento</li>
                    <li>Solicitar eliminação dos dados</li>
                    <li>Opor-se ao tratamento</li>
                    <li>Solicitar revisão de decisões automatizadas</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 border-green-200 rounded-lg border p-4">
                <h4 className="text-green-800 mb-2 font-semibold">Como Exercer Seus Direitos</h4>
                <p className="text-green-700 mb-2 text-sm">
                  Para exercer qualquer direito, entre em contato conosco:
                </p>
                <ul className="text-green-700 list-disc space-y-1 pl-4 text-sm">
                  <li>
                    <strong>E-mail:</strong> privacidade@vytalle.com.br
                  </li>
                  <li>
                    <strong>WhatsApp:</strong> (21) 99619-2890
                  </li>
                  <li>
                    <strong>Prazo de resposta:</strong> Até 15 dias úteis
                  </li>
                  <li>
                    <strong>Gratuito:</strong> Primeira solicitação sempre gratuita
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7 - Cookies */}
          <section className="bg-white rounded-xl border border-vitale-primary/10 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-vitale-primary">
              <CheckCircle className="h-6 w-6" />
              7. Cookies e Tecnologias Similares
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-700">
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência e
                personalizar nossos serviços.
              </p>

              <div className="space-y-3">
                <div className="border-green-500 border-l-4 pl-4">
                  <h4 className="text-green-700 font-semibold">Cookies Essenciais</h4>
                  <p className="text-sm">
                    Necessários para funcionamento básico do site (sempre ativos)
                  </p>
                </div>
                <div className="border-blue-500 border-l-4 pl-4">
                  <h4 className="text-blue-700 font-semibold">Cookies de Funcionalidade</h4>
                  <p className="text-sm">Lembram suas preferências e configurações</p>
                </div>
                <div className="border-purple-500 border-l-4 pl-4">
                  <h4 className="text-purple-700 font-semibold">Cookies Analíticos</h4>
                  <p className="text-sm">Ajudam a entender como você usa o site (anônimos)</p>
                </div>
                <div className="border-orange-500 border-l-4 pl-4">
                  <h4 className="text-orange-700 font-semibold">Cookies de Marketing</h4>
                  <p className="text-sm">Personalizam anúncios e conteúdo (com consentimento)</p>
                </div>
              </div>

              <p className="text-sm">
                Você pode gerenciar cookies através das configurações do seu navegador ou através do
                nosso painel de privacidade disponível no rodapé do site.
              </p>
            </div>
          </section>

          {/* Section 8 - Contato */}
          <section className="bg-white rounded-xl border border-vitale-primary/10 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-vitale-primary">
              <CheckCircle className="h-6 w-6" />
              8. Contato e DPO
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-700">
              <div className="space-y-3 rounded-lg bg-vitale-primary/5 p-4">
                <h4 className="font-semibold text-vitale-primary">
                  Encarregado de Proteção de Dados (DPO)
                </h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Nome:</strong> [Nome do DPO]
                  </p>
                  <p>
                    <strong>E-mail:</strong>{' '}
                    <a href="mailto:dpo@vytalle.com.br" className="text-vitale-primary underline">
                      dpo@vytalle.com.br
                    </a>
                  </p>
                  <p>
                    <strong>Telefone:</strong> (21) 99619-2890
                  </p>
                </div>

                <h4 className="mt-4 font-semibold text-vitale-primary">Contato Geral</h4>
                <div className="space-y-1 text-sm">
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
                    <strong>Horário:</strong> Segunda a Sexta, 8h às 18h
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-yellow-200 rounded-lg border p-4">
                <h4 className="text-yellow-800 mb-2 font-semibold">
                  Autoridade Nacional de Proteção de Dados (ANPD)
                </h4>
                <p className="text-yellow-700 text-sm">
                  Caso não fique satisfeito com nossas respostas, você pode registrar uma reclamação
                  junto à ANPD através do site:
                  <a href="https://www.gov.br/anpd" className="ml-1 underline">
                    www.gov.br/anpd
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 space-y-4 text-center">
          <div className="bg-green-50 border-green-200 rounded-lg border p-6">
            <h3 className="text-green-800 mb-2 font-semibold">🔒 Privacidade Garantida</h3>
            <p className="text-green-700 text-sm">
              Seus dados estão seguros conosco. Seguimos as melhores práticas de segurança e
              privacidade do setor de saúde.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/">
              <Button className="text-white bg-vitale-primary hover:bg-vitale-secondary">
                Voltar ao Site
              </Button>
            </Link>
            <Link href="/termos">
              <Button
                variant="outline"
                className="hover:text-white border-vitale-primary text-vitale-primary hover:bg-vitale-primary"
              >
                Ver Termos de Uso
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
