import {
  ArrowRight,
  Award,
  CheckCircle,
  Instagram,
  MessageCircle,
  Package,
  Shield,
  Star,
  Truck,
  Users,
} from 'lucide-react';
import Link from 'next/link';

import CatalogButton from '@/components/CatalogButton';
import SmartImage from '@/components/SmartImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProducts } from '@/lib/mockData';

export default function Home() {
  // Featured products para showcase
  const featuredProducts = mockProducts.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section Otimizado */}
      <section className="from-vitale-primary/8 via-white relative flex min-h-[85vh] items-center justify-center bg-gradient-to-br to-vitale-secondary/5">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iIzg5NzQ2NiIvPgo8L3N2Zz4K')] bg-repeat"></div>
        </div>

        <div className="max-w-responsive-lg container relative z-10 mx-auto space-y-8 px-4 text-center md:space-y-12">
          {/* Logo Principal Otimizado */}
          <div className="mb-8 flex justify-center">
            <SmartImage
              src="/Vytalle_Logo_Gold.png"
              alt="Vytalle Estética & Viscosuplementação - Logo Oficial"
              width={160}
              height={160}
              className="h-32 w-32 object-contain transition-all duration-500 ease-out sm:h-40 sm:w-40 lg:h-44 lg:w-44"
              priority={true}
            />
          </div>

          {/* Título Principal com Melhor Hierarquia */}
          <div className="max-w-responsive mx-auto space-y-6 md:space-y-8">
            <h1 className="xl:text-7xl text-4xl font-extrabold leading-tight text-vitale-primary md:text-5xl lg:text-6xl">
              Produtos Premium para
              <span className="mt-2 block text-vitale-secondary">Estética Profissional</span>
            </h1>
            <p className="mx-auto max-w-4xl px-4 text-lg font-medium leading-relaxed text-neutral-700 md:text-xl lg:text-2xl">
              <strong className="text-xl text-vitale-primary md:text-2xl lg:text-3xl">
                Sua excelência profissional começa aqui.
              </strong>
              <br className="hidden md:block" />
              <span className="mt-4 block md:mt-2">
                Produtos originais, certificados ANVISA, com entrega expressa e suporte consultivo
                especializado para clínicas e profissionais em todo Brasil.
              </span>
            </p>

            {/* Badges de Confiança */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 md:gap-6 lg:gap-8">
              <div className="bg-white/90 border-green-200/50 flex items-center gap-3 rounded-full border px-4 py-3 shadow-lg md:px-6 md:py-4">
                <Shield className="text-green-600 h-5 w-5 md:h-6 md:w-6" />
                <span className="text-sm font-bold text-neutral-800 md:text-base">
                  Compra 100% Segura
                </span>
              </div>
              <div className="bg-white/90 flex items-center gap-3 rounded-full border border-vitale-primary/30 px-4 py-3 shadow-lg md:px-6 md:py-4">
                <Award className="h-5 w-5 text-vitale-primary md:h-6 md:w-6" />
                <span className="text-sm font-bold text-neutral-800 md:text-base">
                  Produtos Certificados
                </span>
              </div>
              <div className="bg-white/90 border-blue-200/50 flex items-center gap-3 rounded-full border px-4 py-3 shadow-lg md:px-6 md:py-4">
                <Truck className="text-blue-600 h-5 w-5 md:h-6 md:w-6" />
                <span className="text-sm font-bold text-neutral-800 md:text-base">
                  Entrega em 24-48h
                </span>
              </div>
              <div className="bg-white/90 border-purple-200/50 flex items-center gap-3 rounded-full border px-4 py-3 shadow-lg md:px-6 md:py-4">
                <Users className="text-purple-600 h-5 w-5 md:h-6 md:w-6" />
                <span className="text-sm font-bold text-neutral-800 md:text-base">
                  +2000 Profissionais
                </span>
              </div>
            </div>
          </div>

          {/* Call to Actions Otimizados */}
          <div className="flex flex-col items-center justify-center gap-4 pt-8 md:gap-6 lg:flex-row">
            <CatalogButton size="large" />

            <a
              href="https://www.instagram.com/vytalle.estetica/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto"
            >
              <Button className="from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:shadow-2xl flex min-h-[56px] w-full transform items-center justify-center gap-3 rounded-xl bg-gradient-to-r px-8 py-4 text-lg font-bold shadow-xl transition-all duration-300 hover:scale-105 sm:w-auto md:min-h-[64px] md:gap-4 md:rounded-2xl md:px-10 md:py-6 md:text-xl">
                <Instagram className="h-6 w-6 md:h-7 md:w-7" />
                <span className="font-bold">Siga no Instagram</span>
              </Button>
            </a>

            <a
              href="https://wa.me/5521996192890?text=Olá! Gostaria de conhecer os produtos da Vytalle Estética & Viscosuplementação."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button className="bg-green-600 text-white hover:bg-green-700 hover:shadow-2xl flex min-h-[56px] w-full transform items-center justify-center gap-3 rounded-xl px-8 py-4 text-lg font-bold shadow-xl transition-all duration-300 hover:scale-105 sm:w-auto md:min-h-[64px] md:gap-4 md:rounded-2xl md:px-10 md:py-6 md:text-xl">
                <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
                <span className="font-bold">Consultor Especializado</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque - NOVA SEÇÃO */}
      <section className="section-padding via-white bg-gradient-to-br from-vitale-primary/5 to-vitale-secondary/5">
        <div className="max-w-responsive-lg container mx-auto px-4">
          <div className="mb-12 space-y-6 text-center md:mb-16 md:space-y-8">
            <h2 className="text-3xl font-bold text-vitale-primary md:text-4xl lg:text-5xl xl:text-6xl">
              Produtos em Destaque
            </h2>
            <p className="mx-auto max-w-4xl px-4 text-lg leading-relaxed text-neutral-700 md:text-xl lg:text-2xl">
              Conheça nossa seleção premium de produtos mais procurados por profissionais de
              estética
            </p>
            <div className="flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-500 fill-yellow-500 h-6 w-6" />
              ))}
              <span className="ml-2 text-lg font-semibold text-neutral-700">
                5.0 | +500 Avaliações
              </span>
            </div>
          </div>

          <div className="grid-responsive gap-responsive">
            {featuredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="hover:shadow-2xl bg-white/95 group transform rounded-xl border-2 border-vitale-primary/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-3 hover:border-vitale-primary/50 md:rounded-2xl"
              >
                <CardHeader className="relative overflow-hidden rounded-t-lg">
                  <div className="relative aspect-square rounded-lg bg-gradient-to-br from-vitale-primary/10 to-vitale-secondary/10">
                    <SmartImage
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="rounded-lg object-cover transition-transform duration-500 group-hover:scale-110"
                      productName={product.name}
                    />
                    {/* Badge de Categoria */}
                    <div className="text-white absolute right-3 top-3 rounded-full bg-vitale-primary px-3 py-1 text-xs font-bold">
                      {product.category}
                    </div>
                    {/* Badge de Novidade */}
                    {index < 2 && (
                      <div className="bg-red-600 text-white absolute left-3 top-3 animate-pulse rounded-full px-3 py-1 text-xs font-bold">
                        NOVO
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div>
                    <CardTitle className="text-xl font-bold text-vitale-primary transition-colors group-hover:text-vitale-secondary">
                      {product.name}
                    </CardTitle>
                    <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                      {product.description}
                    </p>
                  </div>

                  {/* Preço e CTA */}
                  <div className="flex items-center justify-between border-t border-vitale-primary/20 pt-4">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-vitale-primary">
                        R${' '}
                        {product.price_pix?.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }) || '0,00'}
                      </div>
                      <div className="text-sm text-neutral-500">À vista no PIX</div>
                    </div>
                    <Link href={`/products/${product.slug}`}>
                      <Button className="text-white transform rounded-xl bg-vitale-primary px-6 py-3 transition-all duration-300 hover:scale-105 hover:bg-vitale-secondary">
                        Ver Detalhes
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA para ver todos os produtos */}
          <div className="mt-16 text-center">
            <CatalogButton>
              <span className="flex items-center gap-3">
                Ver Todos os Produtos
                <ArrowRight className="h-6 w-6" />
              </span>
            </CatalogButton>
          </div>
        </div>
      </section>

      {/* Sobre Nós Section Melhorada */}
      <section className="from-vitale-primary/8 via-transparent to-vitale-primary/8 bg-gradient-to-br py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 space-y-6 text-center">
              <h2 className="text-4xl font-bold text-vitale-primary sm:text-5xl">
                Sobre a Vytalle Estética
              </h2>
              <div className="mx-auto h-1 w-32 rounded-full bg-gradient-to-r from-vitale-primary to-vitale-secondary"></div>
              <p className="mx-auto max-w-3xl text-xl text-neutral-700">
                Mais de 5 anos transformando a excelência em estética profissional
              </p>
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="flex items-center gap-3 text-3xl font-bold text-vitale-primary">
                    <Award className="h-8 w-8" />
                    Nossa Missão
                  </h3>
                  <p className="text-lg leading-relaxed text-neutral-700">
                    <strong className="text-vitale-primary">
                      Seu diferencial profissional começa com o produto certo.
                    </strong>
                    Distribuímos produtos estéticos e de viscosuplementação de altíssima qualidade,
                    garantindo procedência internacional, autenticidade certificada e excelência
                    comprovada para profissionais da área da saúde em todo o Brasil.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="flex items-center gap-3 text-3xl font-bold text-vitale-primary">
                    <Star className="h-8 w-8" />
                    Nossa Visão
                  </h3>
                  <p className="text-lg leading-relaxed text-neutral-700">
                    Ser a principal referência nacional na distribuição de produtos médicos
                    estéticos premium, reconhecida pela qualidade incomparável, confiabilidade
                    absoluta e excelência no atendimento consultivo personalizado.
                  </p>
                </div>

                {/* Certificações e Compliance */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-vitale-primary">
                    Certificações & Compliance
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/80 flex items-center gap-2 rounded-lg p-3 shadow-md">
                      <CheckCircle className="text-green-600 h-5 w-5" />
                      <span className="text-sm font-medium">ANVISA Certificado</span>
                    </div>
                    <div className="bg-white/80 flex items-center gap-2 rounded-lg p-3 shadow-md">
                      <CheckCircle className="text-green-600 h-5 w-5" />
                      <span className="text-sm font-medium">ISO 13485</span>
                    </div>
                    <div className="bg-white/80 flex items-center gap-2 rounded-lg p-3 shadow-md">
                      <CheckCircle className="text-green-600 h-5 w-5" />
                      <span className="text-sm font-medium">GMP Compliance</span>
                    </div>
                    <div className="bg-white/80 flex items-center gap-2 rounded-lg p-3 shadow-md">
                      <CheckCircle className="text-green-600 h-5 w-5" />
                      <span className="text-sm font-medium">LGPD Conforme</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estatísticas Visuais */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/90 rounded-2xl border-2 border-vitale-primary/20 p-8 text-center shadow-xl">
                  <div className="mb-2 text-5xl font-bold text-vitale-primary">+2K</div>
                  <p className="font-medium text-neutral-700">Profissionais Atendidos</p>
                </div>
                <div className="bg-white/90 rounded-2xl border-2 border-vitale-primary/20 p-8 text-center shadow-xl">
                  <div className="mb-2 text-5xl font-bold text-vitale-primary">+80</div>
                  <p className="font-medium text-neutral-700">Produtos Premium</p>
                </div>
                <div className="bg-white/90 rounded-2xl border-2 border-vitale-primary/20 p-8 text-center shadow-xl">
                  <div className="mb-2 text-5xl font-bold text-vitale-primary">5+</div>
                  <p className="font-medium text-neutral-700">Anos de Excelência</p>
                </div>
                <div className="bg-white/90 rounded-2xl border-2 border-vitale-primary/20 p-8 text-center shadow-xl">
                  <div className="mb-2 text-5xl font-bold text-vitale-primary">100%</div>
                  <p className="font-medium text-neutral-700">Produtos Originais</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias Expandidas */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 space-y-6 text-center">
            <h2 className="text-4xl font-bold text-vitale-primary sm:text-5xl">
              Categorias de Produtos Premium
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-neutral-700">
              <strong className="text-vitale-primary">
                As melhores marcas mundiais, sempre originais e certificadas
              </strong>
              <br />
              Produtos exclusivos para profissionais que exigem o melhor para seus pacientes
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-2xl from-white group transform border-2 border-vitale-primary/20 bg-gradient-to-br to-vitale-primary/5 text-center transition-all duration-300 hover:-translate-y-2 hover:border-vitale-primary/50">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-vitale-primary/20 to-vitale-secondary/20 transition-transform duration-300 group-hover:scale-110">
                  <Package className="h-10 w-10 text-vitale-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-vitale-primary">
                  Toxina Botulínica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-relaxed text-neutral-700">
                  Toxinas originais das principais marcas internacionais: Botox®, Dysport®,
                  Xeomin® para uso profissional certificado.
                </p>
                <div className="text-sm font-semibold text-vitale-primary">
                  Marcas: Allergan, Ipsen, Merz
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl from-white group transform border-2 border-vitale-primary/20 bg-gradient-to-br to-vitale-primary/5 text-center transition-all duration-300 hover:-translate-y-2 hover:border-vitale-primary/50">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-vitale-primary/20 to-vitale-secondary/20 transition-transform duration-300 group-hover:scale-110">
                  <Shield className="h-10 w-10 text-vitale-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-vitale-primary">
                  Preenchedores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-relaxed text-neutral-700">
                  Preenchedores de ácido hialurônico premium das marcas líderes mundiais com
                  tecnologia de ponta.
                </p>
                <div className="text-sm font-semibold text-vitale-primary">
                  Marcas: Juvederm, Restylane, Belotero
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl from-white group transform border-2 border-vitale-primary/20 bg-gradient-to-br to-vitale-primary/5 text-center transition-all duration-300 hover:-translate-y-2 hover:border-vitale-primary/50">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-vitale-primary/20 to-vitale-secondary/20 transition-transform duration-300 group-hover:scale-110">
                  <Award className="h-10 w-10 text-vitale-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-vitale-primary">
                  Bioestimuladores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-relaxed text-neutral-700">
                  Produtos avançados para bioestimulação e regeneração tecidual com resultados
                  duradouros e naturais.
                </p>
                <div className="text-sm font-semibold text-vitale-primary">
                  Marcas: Sculptra, Radiesse, Ellansé
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl from-white group transform border-2 border-vitale-primary/20 bg-gradient-to-br to-vitale-primary/5 text-center transition-all duration-300 hover:-translate-y-2 hover:border-vitale-primary/50">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-vitale-primary/20 to-vitale-secondary/20 transition-transform duration-300 group-hover:scale-110">
                  <Star className="h-10 w-10 text-vitale-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-vitale-primary">
                  Acessórios Premium
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-relaxed text-neutral-700">
                  Microcânulas, fios de sustentação, enzimas e produtos complementares de alta
                  qualidade profissional.
                </p>
                <div className="text-sm font-semibold text-vitale-primary">
                  Linha Completa Profissional
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final Otimizado */}
      <section className="bg-gradient-to-br from-vitale-primary/10 via-vitale-secondary/5 to-vitale-primary/10 py-20">
        <div className="container mx-auto space-y-12 px-4 text-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-vitale-primary sm:text-5xl">
              Pronto para Elevar sua Prática Profissional?
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-neutral-700">
              <strong className="text-vitale-primary">Catálogo premium completo</strong>, entrega
              expressa em 24-48h e suporte consultivo especializado para sua clínica.
              <br />
              <span className="text-lg">Mais de 2.000 profissionais já confiam na Vytalle.</span>
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <CatalogButton variant="secondary" />

            <a
              href="https://www.instagram.com/vytalle.estetica/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:shadow-2xl flex transform items-center gap-4 rounded-2xl bg-gradient-to-r px-10 py-6 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105">
                <Instagram className="h-6 w-6" />
                <span>Siga no Instagram</span>
              </Button>
            </a>

            <a
              href="https://wa.me/5521996192890?text=Olá! Gostaria de conhecer os produtos da Vytalle Estética & Viscosuplementação."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-600 text-white hover:bg-green-700 hover:shadow-2xl flex transform items-center gap-3 rounded-2xl px-10 py-6 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105">
                <MessageCircle className="h-6 w-6" />
                <span>Consultor Especializado</span>
              </Button>
            </a>
          </div>

          {/* Garantias e Trust Signals */}
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 pt-12 sm:grid-cols-3">
            <div className="space-y-3 text-center">
              <Shield className="text-green-600 mx-auto h-12 w-12" />
              <h4 className="text-lg font-bold text-vitale-primary">Garantia Total</h4>
              <p className="text-sm text-neutral-700">
                100% produtos originais ou seu dinheiro de volta
              </p>
            </div>
            <div className="space-y-3 text-center">
              <Truck className="text-blue-600 mx-auto h-12 w-12" />
              <h4 className="text-lg font-bold text-vitale-primary">Entrega Expressa</h4>
              <p className="text-sm text-neutral-700">
                Logística especializada para produtos médicos
              </p>
            </div>
            <div className="space-y-3 text-center">
              <MessageCircle className="text-green-600 mx-auto h-12 w-12" />
              <h4 className="text-lg font-bold text-vitale-primary">Suporte 24/7</h4>
              <p className="text-sm text-neutral-700">Consultoria especializada via WhatsApp</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
