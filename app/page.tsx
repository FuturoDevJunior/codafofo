import {
  ArrowRight,
  Award,
  CheckCircle,
  Instagram,
  MessageCircle,
  Shield,
  Star,
  Truck,
  Users,
} from 'lucide-react';
import Link from 'next/link';

import CatalogButton from '@/components/CatalogButton';
import CategoryCard from '@/components/CategoryCard';
import ComplianceDisclaimer from '@/components/ComplianceDisclaimer';
import Header from '@/components/Header';
import SmartImage from '@/components/SmartImage';
import StarRating from '@/components/StarRating';
import StatsCard from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProductsMinimal } from '@/lib/productCache';

export default function Home() {
  // Featured products para showcase - carregamento otimizado
  const minimalProducts = getProductsMinimal().slice(0, 6);
  const featuredProducts = minimalProducts.map(product => ({
    ...product,
    currency: 'BRL' as const,
    images: [`/images/products/${product.slug}.webp`],
    description: `Produto premium ${product.name} da categoria ${product.category}`,
  }));

  return (
    <div className='min-h-screen'>
      <Header />

      <main id='main-content' role='main'>
        {/* Hero Section Redesign - Sem logo gigante, foco no conteúdo */}
        <section className='via-white relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-vitale-primary/10 to-vitale-secondary/10'>
          {/* Background Pattern Melhorado */}
          <div className='absolute inset-0 opacity-[0.03]'>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iIzg5NzQ2NiIvPgo8L3N2Zz4K')] bg-repeat"></div>
          </div>

          {/* Elementos decorativos */}
          <div className='absolute left-10 top-20 h-72 w-72 rounded-full bg-vitale-primary/5 blur-3xl'></div>
          <div className='absolute bottom-20 right-10 h-96 w-96 rounded-full bg-vitale-secondary/5 blur-3xl'></div>

          <div className='max-w-responsive-lg container relative z-10 mx-auto space-y-8 px-4 text-center md:space-y-12'>
            {/* Título Principal com Melhor Hierarquia */}
            <div className='max-w-responsive mx-auto space-y-6 md:space-y-8'>
              <h1 className='text-high-contrast xl:text-7xl font-heading text-4xl font-extrabold leading-tight tracking-tight md:text-5xl md:leading-snug md:tracking-wide lg:text-6xl lg:leading-tight xl:leading-tight'>
                Produtos Premium para
                <span className='mt-2 block'>
                  <span className='text-high-contrast'>Estética</span>{' '}
                  <span className='text-emphasis font-black tracking-wide drop-shadow-lg'>
                    Profissional
                  </span>
                </span>
              </h1>
              <p className='mx-auto max-w-4xl px-4 text-lg font-medium leading-relaxed text-neutral-800 md:text-xl md:leading-relaxed lg:text-2xl lg:leading-relaxed'>
                <strong className='text-high-contrast font-heading text-xl font-bold tracking-wide md:text-2xl md:tracking-wide lg:text-3xl lg:tracking-wide'>
                  Sua excelência profissional começa aqui.
                </strong>
                <br className='hidden md:block' />
                <span className='mt-4 block leading-relaxed text-neutral-700 md:mt-2 md:leading-relaxed'>
                  Produtos originais, certificados ANVISA, com entrega expressa e suporte consultivo
                  especializado para clínicas e profissionais em todo Brasil.
                </span>
              </p>

              {/* Disclaimer de Conformidade */}
              <div className='mx-auto max-w-2xl'>
                <ComplianceDisclaimer variant='banner' />
              </div>

              {/* Badges de Confiança */}
              <div className='flex flex-wrap items-center justify-center gap-4 pt-6 md:gap-6 lg:gap-8'>
                <div className='bg-white/90 border-green-200/50 flex items-center gap-3 rounded-full border px-4 py-3 shadow-lg md:px-6 md:py-4'>
                  <Shield
                    className='text-green-600 h-5 w-5 md:h-6 md:w-6'
                    aria-label='Escudo de segurança'
                  />
                  <span className='text-sm font-bold tracking-wide text-neutral-800 md:text-base md:tracking-wide'>
                    Compra 100% Segura
                  </span>
                </div>
                <div className='bg-white/90 flex items-center gap-3 rounded-full border border-vitale-primary/30 px-4 py-3 shadow-lg md:px-6 md:py-4'>
                  <Award
                    className='h-5 w-5 text-vitale-primary md:h-6 md:w-6'
                    aria-label='Prêmio de certificação'
                  />
                  <span className='text-sm font-bold tracking-wide text-neutral-800 md:text-base md:tracking-wide'>
                    Produtos Certificados
                  </span>
                </div>
                <div className='bg-white/90 border-blue-200/50 flex items-center gap-3 rounded-full border px-4 py-3 shadow-lg md:px-6 md:py-4'>
                  <Truck
                    className='text-blue-600 h-5 w-5 md:h-6 md:w-6'
                    aria-label='Caminhão de entrega'
                  />
                  <span className='text-sm font-bold tracking-wide text-neutral-800 md:text-base md:tracking-wide'>
                    Entrega em 24-48h
                  </span>
                </div>
                <div className='bg-white/90 border-purple-200/50 flex items-center gap-3 rounded-full border px-4 py-3 shadow-lg md:px-6 md:py-4'>
                  <Users
                    className='text-purple-600 h-5 w-5 md:h-6 md:w-6'
                    aria-label='Grupo de profissionais'
                  />
                  <span className='text-sm font-bold tracking-wide text-neutral-800 md:text-base md:tracking-wide'>
                    +2000 Profissionais
                  </span>
                </div>
              </div>

              {/* CTAs Principais */}
              <div className='flex flex-col items-center justify-center gap-4 pt-8 md:gap-6 lg:flex-row'>
                <CatalogButton size='large' />
                <a
                  href='https://www.instagram.com/vytalle.estetica/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group w-full sm:w-auto'
                >
                  <Button className='from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:shadow-2xl flex min-h-[56px] w-full transform items-center justify-center gap-3 rounded-xl bg-gradient-to-r px-8 py-4 text-lg font-bold shadow-xl transition-all duration-300 hover:scale-105 sm:w-auto md:min-h-[64px] md:gap-4 md:rounded-2xl md:px-10 md:py-6 md:text-xl'>
                    <Instagram className='h-6 w-6 md:h-7 md:w-7' aria-hidden='true' />
                    <span className='font-bold tracking-wide'>Siga no Instagram</span>
                  </Button>
                </a>
                <a
                  href='https://wa.me/5521996192890?text=Olá! Gostaria de conhecer os produtos da Vytalle Estética & Viscosuplementação.'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-full sm:w-auto'
                >
                  <Button className='bg-green-600 text-white hover:bg-green-700 hover:shadow-2xl flex min-h-[56px] w-full transform items-center justify-center gap-3 rounded-xl px-8 py-4 text-lg font-bold shadow-xl transition-all duration-300 hover:scale-105 sm:w-auto md:min-h-[64px] md:gap-4 md:rounded-2xl md:px-10 md:py-6 md:text-xl'>
                    <MessageCircle className='h-6 w-6 md:h-7 md:w-7' aria-hidden='true' />
                    <span className='font-bold tracking-wide'>Consultor Especializado</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Produtos em Destaque */}
        <section className='section-padding via-white bg-gradient-to-br from-vitale-primary/5 to-vitale-secondary/5'>
          <div className='max-w-responsive-lg container mx-auto px-4'>
            <div className='mb-12 space-y-6 text-center md:mb-16 md:space-y-8'>
              <h2 className='font-heading text-3xl font-bold leading-tight tracking-tight text-vitale-primary md:text-4xl md:leading-snug md:tracking-wide lg:text-5xl lg:leading-tight xl:text-6xl xl:leading-tight'>
                Produtos em Destaque
              </h2>
              <p className='mx-auto max-w-4xl px-4 text-lg leading-relaxed text-neutral-700 md:text-xl md:leading-relaxed lg:text-2xl lg:leading-relaxed'>
                Conheça nossa seleção premium de produtos mais procurados por profissionais de
                estética
              </p>
              <StarRating rating={5} size='lg' />
            </div>

            <div className='grid-responsive gap-responsive'>
              {featuredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  data-testid='card'
                  className='hover:shadow-2xl bg-white/95 group transform rounded-xl border-2 border-vitale-primary/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-3 hover:border-vitale-primary/50 md:rounded-2xl'
                >
                  <CardHeader
                    data-testid='card-header'
                    className='relative overflow-hidden rounded-t-lg'
                  >
                    <div className='relative aspect-square rounded-lg bg-gradient-to-br from-vitale-primary/10 to-vitale-secondary/10'>
                      <SmartImage
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className='rounded-lg object-cover transition-transform duration-500 group-hover:scale-110'
                        productName={product.name}
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        priority={index < 3}
                      />
                      <div className='text-white absolute right-3 top-3 rounded-full bg-vitale-primary px-3 py-1 text-xs font-bold'>
                        {product.category}
                      </div>
                      {index === 0 && (
                        <div className='bg-red-600 text-white absolute left-3 top-3 animate-pulse rounded-full px-3 py-1 text-xs font-bold'>
                          NOVO
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent data-testid='card-content' className='space-y-4 p-6'>
                    <div>
                      <CardTitle
                        data-testid='card-title'
                        className='text-xl font-bold text-vitale-primary transition-colors group-hover:text-vitale-secondary'
                      >
                        {product.name}
                      </CardTitle>
                      <p className='mt-2 line-clamp-2 text-sm text-neutral-600'>
                        {product.description}
                      </p>
                    </div>

                    <div className='flex items-center justify-between border-t border-vitale-primary/20 pt-4'>
                      <div className='space-y-1'>
                        <div className='text-2xl font-bold text-vitale-primary'>
                          R${' '}
                          {product.price_pix?.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }) || '0,00'}
                        </div>
                        <div className='text-sm text-neutral-500'>À vista no PIX</div>
                      </div>
                      <Link href={`/products/${product.slug}`}>
                        <Button className='text-white transform rounded-xl bg-vitale-primary px-6 py-3 transition-all duration-300 hover:scale-105 hover:bg-vitale-secondary'>
                          Ver Detalhes
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className='mt-16 text-center'>
              <CatalogButton>
                <span className='flex items-center gap-3'>
                  Ver Todos os Produtos
                  <ArrowRight className='h-6 w-6' />
                </span>
              </CatalogButton>
            </div>
          </div>
        </section>

        {/* Seção Sobre */}
        <section className='from-vitale-primary/8 via-transparent to-vitale-primary/8 bg-gradient-to-br py-20'>
          <div className='container mx-auto px-4'>
            <div className='mx-auto max-w-6xl'>
              <div className='mb-16 space-y-6 text-center'>
                <h2 className='text-4xl font-bold text-vitale-primary sm:text-5xl'>
                  Sobre a Vytalle Estética
                </h2>
                <div className='mx-auto h-1 w-32 rounded-full bg-gradient-to-r from-vitale-primary to-vitale-secondary'></div>
                <p className='mx-auto max-w-3xl text-xl text-neutral-700'>
                  Mais de 5 anos transformando a excelência em estética profissional
                </p>
              </div>

              <div className='grid items-center gap-12 lg:grid-cols-2'>
                <div className='space-y-8'>
                  <div className='space-y-6'>
                    <h3 className='flex items-center gap-3 text-3xl font-bold text-vitale-primary'>
                      <Award className='h-8 w-8' />
                      Nossa Missão
                    </h3>
                    <p className='text-lg leading-relaxed text-neutral-700'>
                      <strong className='text-vitale-primary'>
                        Seu diferencial profissional começa com o produto certo.
                      </strong>
                      Distribuímos produtos estéticos e de viscosuplementação de altíssima
                      qualidade, garantindo procedência internacional, autenticidade certificada e
                      excelência comprovada para profissionais da área da saúde em todo o Brasil.
                    </p>
                  </div>

                  <div className='space-y-6'>
                    <h3 className='flex items-center gap-3 text-3xl font-bold text-vitale-primary'>
                      <Star className='h-8 w-8' />
                      Nossa Visão
                    </h3>
                    <p className='text-lg leading-relaxed text-neutral-700'>
                      Ser a principal referência nacional na distribuição de produtos médicos
                      estéticos premium, reconhecida pela qualidade incomparável, confiabilidade
                      absoluta e excelência no atendimento consultivo personalizado.
                    </p>
                  </div>

                  <div className='space-y-4'>
                    <h4 className='text-xl font-semibold text-vitale-primary'>
                      Certificações & Compliance
                    </h4>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='bg-white/80 flex items-center gap-2 rounded-lg p-3 shadow-md'>
                        <CheckCircle className='text-green-600 h-5 w-5' />
                        <span className='text-sm font-medium'>ANVISA Certificado</span>
                      </div>
                      <div className='bg-white/80 flex items-center gap-2 rounded-lg p-3 shadow-md'>
                        <CheckCircle className='text-green-600 h-5 w-5' />
                        <span className='text-sm font-medium'>ISO 13485</span>
                      </div>
                      <div className='bg-white/80 flex items-center gap-2 rounded-lg p-3 shadow-md'>
                        <CheckCircle className='text-green-600 h-5 w-5' />
                        <span className='text-sm font-medium'>GMP Compliance</span>
                      </div>
                      <div className='bg-white/80 flex items-center gap-2 rounded-lg p-3 shadow-md'>
                        <CheckCircle className='text-green-600 h-5 w-5' />
                        <span className='text-sm font-medium'>LGPD Conforme</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-6'>
                  <StatsCard
                    iconName='Users'
                    value='+2K'
                    label='Profissionais Atendidos'
                    color='primary'
                  />
                  <StatsCard
                    iconName='Package'
                    value='+80'
                    label='Produtos Premium'
                    color='secondary'
                  />
                  <StatsCard
                    iconName='Award'
                    value='5+'
                    label='Anos de Excelência'
                    color='accent'
                  />
                  <StatsCard
                    iconName='Shield'
                    value='100%'
                    label='Produtos Originais'
                    color='primary'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section className='bg-white py-20'>
          <div className='container mx-auto px-4'>
            <div className='mb-16 space-y-6 text-center'>
              <h2 className='text-4xl font-bold text-vitale-primary sm:text-5xl'>
                Categorias de Produtos Premium
              </h2>
              <p className='mx-auto max-w-3xl text-xl text-neutral-700'>
                <strong className='text-vitale-primary'>
                  As melhores marcas mundiais, sempre originais e certificadas
                </strong>
                <br />
                Produtos exclusivos para profissionais que exigem o melhor para seus pacientes
              </p>
            </div>

            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
              <CategoryCard
                title='Toxina Botulínica'
                description='Toxinas originais das principais marcas internacionais: Botox®, Dysport®, Xeomin® para uso profissional certificado.'
                brands='Marcas: Allergan, Ipsen, Merz'
                category='toxina'
              />
              <CategoryCard
                title='Preenchedores'
                description='Preenchedores de ácido hialurônico premium das marcas líderes mundiais com tecnologia de ponta.'
                brands='Marcas: Juvederm, Restylane, Belotero'
                category='preenchedor'
              />
              <CategoryCard
                title='Bioestimuladores'
                description='Produtos avançados para bioestimulação e regeneração tecidual com resultados duradouros e naturais.'
                brands='Marcas: Sculptra, Radiesse, Ellansé'
                category='bioestimulador'
              />
              <CategoryCard
                title='Acessórios Premium'
                description='Microcânulas, fios de sustentação, enzimas e produtos complementares de alta qualidade profissional.'
                brands='Linha Completa Profissional'
                category='acessorio'
              />
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className='bg-gradient-to-br from-vitale-primary/10 via-vitale-secondary/5 to-vitale-primary/10 py-20'>
          <div className='container mx-auto space-y-12 px-4 text-center'>
            <div className='space-y-6'>
              <h2 className='text-4xl font-bold text-vitale-primary sm:text-5xl'>
                Pronto para Elevar sua Prática Profissional?
              </h2>
              <p className='mx-auto max-w-3xl text-xl leading-relaxed text-neutral-700'>
                <strong className='text-vitale-primary'>Catálogo premium completo</strong>
                , entrega expressa em 24-48h e suporte consultivo especializado para sua clínica.
                <br />
                <span className='text-lg'>Mais de 2.000 profissionais já confiam na Vytalle.</span>
              </p>
            </div>

            <div className='flex flex-col items-center justify-center gap-6 sm:flex-row'>
              <CatalogButton variant='secondary' />
              <a
                href='https://www.instagram.com/vytalle.estetica/'
                target='_blank'
                rel='noopener noreferrer'
                className='group w-full sm:w-auto'
              >
                <Button className='from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:shadow-2xl flex min-h-[56px] w-full transform items-center justify-center gap-4 rounded-2xl bg-gradient-to-r px-10 py-6 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 sm:w-auto'>
                  <Instagram className='h-6 w-6 md:h-7 md:w-7' aria-hidden='true' />
                  <span>Siga no Instagram</span>
                </Button>
              </a>
              <a
                href='https://wa.me/5521996192890?text=Olá! Gostaria de conhecer os produtos da Vytalle Estética & Viscosuplementação.'
                target='_blank'
                rel='noopener noreferrer'
                className='w-full sm:w-auto'
              >
                <Button className='bg-green-600 text-white hover:bg-green-700 hover:shadow-2xl flex min-h-[56px] w-full transform items-center justify-center gap-3 rounded-2xl px-10 py-6 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 sm:w-auto'>
                  <MessageCircle className='h-6 w-6 md:h-7 md:w-7' aria-hidden='true' />
                  <span>Consultor Especializado</span>
                </Button>
              </a>
            </div>

            <div className='mx-auto grid max-w-4xl grid-cols-1 gap-6 pt-12 sm:grid-cols-3'>
              <div className='space-y-3 text-center'>
                <Shield className='text-green-600 mx-auto h-12 w-12' aria-hidden='true' />
                <h4 className='text-lg font-bold text-vitale-primary'>Garantia Total</h4>
                <p className='text-sm text-neutral-700'>
                  100% produtos originais ou seu dinheiro de volta
                </p>
              </div>
              <div className='space-y-3 text-center'>
                <Truck className='text-blue-600 mx-auto h-12 w-12' aria-hidden='true' />
                <h4 className='text-lg font-bold text-vitale-primary'>Entrega Expressa</h4>
                <p className='text-sm text-neutral-700'>
                  Logística especializada para produtos médicos
                </p>
              </div>
              <div className='space-y-3 text-center'>
                <MessageCircle className='text-green-600 mx-auto h-12 w-12' aria-hidden='true' />
                <h4 className='text-lg font-bold text-vitale-primary'>Suporte 24/7</h4>
                <p className='text-sm text-neutral-700'>Consultoria especializada via WhatsApp</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className='bg-white/95 mt-12 w-full border-t border-neutral-200 backdrop-blur-md'
        role='contentinfo'
      >
        <div className='container mx-auto px-4 py-8 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {/* Informações da Empresa */}
            <div className='space-y-6 lg:col-span-2'>
              <div className='flex items-center gap-4'>
                <img
                  src='/Vytalle_Logo_Gold.png'
                  alt='Logo Vytalle Estética'
                  width={64}
                  height={64}
                  className='h-16 w-16 object-contain drop-shadow-lg'
                />
                <div className='flex flex-col justify-center'>
                  <span className='text-xl font-bold text-vitale-primary'>
                    Vytalle Estética & Viscosuplementação
                  </span>
                  <span className='text-sm font-medium text-vitale-secondary'>
                    Excelência em Produtos Médicos
                  </span>
                </div>
              </div>

              <div className='space-y-3 text-neutral-700'>
                <p className='max-w-md text-sm leading-relaxed'>
                  <strong className='text-vitale-primary'>Distribuidora especializada</strong> em
                  produtos médicos estéticos premium. Mais de 5 anos servindo profissionais da área
                  da saúde com produtos certificados ANVISA.
                </p>

                {/* Certificações */}
                <div className='flex flex-wrap gap-2'>
                  <span className='bg-green-100 text-green-800 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium'>
                    ✓ ANVISA Certificado
                  </span>
                  <span className='bg-blue-100 text-blue-800 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium'>
                    ✓ LGPD Conforme
                  </span>
                  <span className='bg-purple-100 text-purple-800 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium'>
                    ✓ ISO 13485
                  </span>
                </div>
              </div>
            </div>

            {/* Links Rápidos */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-vitale-primary'>Links Rápidos</h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/'
                    className='text-sm text-neutral-700 transition-colors hover:text-vitale-primary'
                  >
                    Início
                  </Link>
                </li>
                <li>
                  <Link
                    href='/products'
                    className='text-sm text-neutral-700 transition-colors hover:text-vitale-primary'
                  >
                    Catálogo Completo
                  </Link>
                </li>
                <li>
                  <Link
                    href='/cart'
                    className='text-sm text-neutral-700 transition-colors hover:text-vitale-primary'
                  >
                    Carrinho
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contato */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-vitale-primary'>Contato</h3>
              <div className='space-y-3'>
                <div className='text-sm text-neutral-700'>
                  <strong>WhatsApp:</strong>
                  <br />
                  <a
                    href='https://wa.me/5521996192890'
                    className='text-green-600 hover:text-green-700 font-medium'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    (21) 99619-2890
                  </a>
                </div>
                <div className='text-sm text-neutral-700'>
                  <strong>Instagram:</strong>
                  <br />
                  <a
                    href='https://www.instagram.com/vytalle.estetica/'
                    className='text-pink-600 hover:text-pink-700 font-medium'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    @vytalle.estetica
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé Inferior */}
          <div className='mt-8 border-t border-neutral-200 pt-8'>
            <div className='flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left'>
              <div className='text-sm text-neutral-600'>
                © 2024 Vytalle Estética & Viscosuplementação. Todos os direitos reservados.
              </div>
              <div className='flex flex-wrap items-center gap-4 text-sm'>
                <Link
                  href='/termos'
                  className='text-neutral-600 transition-colors hover:text-vitale-primary'
                >
                  Termos de Uso
                </Link>
                <Link
                  href='/privacidade'
                  className='text-neutral-600 transition-colors hover:text-vitale-primary'
                >
                  Política de Privacidade
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
