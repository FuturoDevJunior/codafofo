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

import SmartImage from '@/components/SmartImage';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockProducts } from '@/lib/mockData';

export default function Home() {
  // Featured products para showcase
  const featuredProducts = mockProducts.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section Otimizado */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-vitale-primary/8 via-white to-vitale-secondary/5">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iIzg5NzQ2NiIvPgo8L3N2Zz4K')] bg-repeat"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center space-y-12 relative z-10">
          {/* Logo Principal Otimizado */}
          <div className="flex justify-center mb-8">
            <SmartImage 
              src="/Vytalle_Logo_Gold.png" 
              alt="Vytalle Estética & Viscosuplementação - Logo Oficial" 
              width={160} 
              height={160}
              className="h-32 w-32 sm:h-40 sm:w-40 lg:h-44 lg:w-44 object-contain transition-all duration-500 ease-out" 
              priority={true}
            />
          </div>
          
          {/* Título Principal com Melhor Hierarquia */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-vitale-primary leading-tight">
              Produtos Premium para
              <span className="block text-vitale-secondary">Estética Profissional</span>
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-700 font-medium leading-relaxed max-w-3xl mx-auto">
              <strong className="text-vitale-primary">Sua excelência profissional começa aqui.</strong>
              <br />
              Produtos originais, certificados ANVISA, com entrega expressa e suporte consultivo especializado para clínicas e profissionais em todo Brasil.
            </p>

            {/* Badges de Confiança */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-6">
              <div className="flex items-center gap-3 bg-white/80 px-4 py-2 rounded-full shadow-md">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-neutral-800">Compra 100% Segura</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 px-4 py-2 rounded-full shadow-md">
                <Award className="w-5 h-5 text-vitale-primary" />
                <span className="text-sm font-semibold text-neutral-800">Produtos Certificados</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 px-4 py-2 rounded-full shadow-md">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-neutral-800">Entrega em 24-48h</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 px-4 py-2 rounded-full shadow-md">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-semibold text-neutral-800">+2000 Profissionais</span>
              </div>
            </div>
          </div>

          {/* Call to Actions Otimizados */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link href="/products">
              <Button className="group px-10 py-5 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 bg-vitale-primary text-white hover:bg-vitale-secondary rounded-2xl transform hover:scale-105">
                <span className="flex items-center gap-3">
                  <Package className="w-6 h-6" />
                  Explorar Catálogo Completo
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
            </Link>

            <a
              href="https://www.instagram.com/vytalle.estetica/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Button className="flex items-center gap-4 px-8 py-5 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                <Instagram className="w-6 h-6" />
                <span>Siga no Instagram</span>
              </Button>
            </a>

            <a
              href="https://wa.me/5521996192890?text=Olá! Gostaria de conhecer os produtos da Vytalle Estética & Viscosuplementação."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="px-8 py-5 text-lg font-semibold bg-green-600 text-white hover:bg-green-700 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3 transform hover:scale-105">
                <MessageCircle className="w-6 h-6" />
                <span>Consultor Especializado</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque - NOVA SEÇÃO */}
      <section className="py-20 bg-gradient-to-br from-vitale-primary/5 via-white to-vitale-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-vitale-primary">
              Produtos em Destaque
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Conheça nossa seleção premium de produtos mais procurados por profissionais de estética
            </p>
            <div className="flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              ))}
              <span className="ml-2 text-lg font-semibold text-neutral-700">5.0 | +500 Avaliações</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 border-2 border-vitale-primary/20 hover:border-vitale-primary/50 bg-white/90 backdrop-blur-sm transform hover:-translate-y-2">
                <CardHeader className="relative overflow-hidden rounded-t-lg">
                  <div className="aspect-square relative bg-gradient-to-br from-vitale-primary/10 to-vitale-secondary/10 rounded-lg">
                    <SmartImage
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                      productName={product.name}
                    />
                    {/* Badge de Categoria */}
                    <div className="absolute top-3 right-3 bg-vitale-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.category}
                    </div>
                    {/* Badge de Novidade */}
                    {index < 2 && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                        NOVO
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <CardTitle className="text-xl font-bold text-vitale-primary group-hover:text-vitale-secondary transition-colors">
                      {product.name}
                    </CardTitle>
                    <p className="text-neutral-600 text-sm mt-2 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  
                  {/* Preço e CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-vitale-primary/20">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-vitale-primary">
                        R$ {product.price_pix?.toFixed(2) || '0,00'}
                      </div>
                      <div className="text-sm text-neutral-500">
                        À vista no PIX
                      </div>
                    </div>
                    <Link href={`/products/${product.slug}`}>
                      <Button className="bg-vitale-primary text-white hover:bg-vitale-secondary px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                        Ver Detalhes
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA para ver todos os produtos */}
          <div className="text-center mt-16">
            <Link href="/products">
              <Button className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-vitale-primary to-vitale-secondary text-white hover:from-vitale-secondary hover:to-vitale-primary rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                Ver Todos os Produtos
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sobre Nós Section Melhorada */}
      <section className="py-20 bg-gradient-to-br from-vitale-primary/8 via-transparent to-vitale-primary/8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-vitale-primary">
                Sobre a Vytalle Estética
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-vitale-primary to-vitale-secondary rounded-full mx-auto"></div>
              <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
                Mais de 5 anos transformando a excelência em estética profissional
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-vitale-primary flex items-center gap-3">
                    <Award className="w-8 h-8" />
                    Nossa Missão
                  </h3>
                  <p className="text-lg text-neutral-700 leading-relaxed">
                    <strong className="text-vitale-primary">Seu diferencial profissional começa com o produto certo.</strong> 
                    Distribuímos produtos estéticos e de viscosuplementação de altíssima qualidade, garantindo procedência internacional, 
                    autenticidade certificada e excelência comprovada para profissionais da área da saúde em todo o Brasil.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-vitale-primary flex items-center gap-3">
                    <Star className="w-8 h-8" />
                    Nossa Visão
                  </h3>
                  <p className="text-lg text-neutral-700 leading-relaxed">
                    Ser a principal referência nacional na distribuição de produtos médicos estéticos premium, 
                    reconhecida pela qualidade incomparável, confiabilidade absoluta e excelência no atendimento consultivo personalizado.
                  </p>
                </div>

                {/* Certificações e Compliance */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-vitale-primary">Certificações & Compliance</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 bg-white/80 p-3 rounded-lg shadow-md">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">ANVISA Certificado</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 p-3 rounded-lg shadow-md">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">ISO 13485</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 p-3 rounded-lg shadow-md">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">GMP Compliance</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 p-3 rounded-lg shadow-md">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">LGPD Conforme</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Estatísticas Visuais */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-8 bg-white/90 rounded-2xl shadow-xl border-2 border-vitale-primary/20">
                  <div className="text-5xl font-bold text-vitale-primary mb-2">+2K</div>
                  <p className="text-neutral-700 font-medium">Profissionais Atendidos</p>
                </div>
                <div className="text-center p-8 bg-white/90 rounded-2xl shadow-xl border-2 border-vitale-primary/20">
                  <div className="text-5xl font-bold text-vitale-primary mb-2">+80</div>
                  <p className="text-neutral-700 font-medium">Produtos Premium</p>
                </div>
                <div className="text-center p-8 bg-white/90 rounded-2xl shadow-xl border-2 border-vitale-primary/20">
                  <div className="text-5xl font-bold text-vitale-primary mb-2">5+</div>
                  <p className="text-neutral-700 font-medium">Anos de Excelência</p>
                </div>
                <div className="text-center p-8 bg-white/90 rounded-2xl shadow-xl border-2 border-vitale-primary/20">
                  <div className="text-5xl font-bold text-vitale-primary mb-2">100%</div>
                  <p className="text-neutral-700 font-medium">Produtos Originais</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias Expandidas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-vitale-primary">
              Categorias de Produtos Premium
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              <strong className="text-vitale-primary">As melhores marcas mundiais, sempre originais e certificadas</strong>
              <br />
              Produtos exclusivos para profissionais que exigem o melhor para seus pacientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group text-center hover:shadow-2xl transition-all duration-300 border-2 border-vitale-primary/20 hover:border-vitale-primary/50 bg-gradient-to-br from-white to-vitale-primary/5 transform hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-vitale-primary/20 to-vitale-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Package className="w-10 h-10 text-vitale-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-vitale-primary">Toxina Botulínica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-neutral-700 leading-relaxed">
                  Toxinas originais das principais marcas internacionais: Botox®, Dysport®, Xeomin® para uso profissional certificado.
                </p>
                <div className="text-sm text-vitale-primary font-semibold">
                  Marcas: Allergan, Ipsen, Merz
                </div>
              </CardContent>
            </Card>

            <Card className="group text-center hover:shadow-2xl transition-all duration-300 border-2 border-vitale-primary/20 hover:border-vitale-primary/50 bg-gradient-to-br from-white to-vitale-primary/5 transform hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-vitale-primary/20 to-vitale-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-vitale-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-vitale-primary">Preenchedores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-neutral-700 leading-relaxed">
                  Preenchedores de ácido hialurônico premium das marcas líderes mundiais com tecnologia de ponta.
              </p>
              <div className="text-sm text-vitale-primary font-semibold">
                Marcas: Juvederm, Restylane, Belotero
              </div>
            </CardContent>
          </Card>

            <Card className="group text-center hover:shadow-2xl transition-all duration-300 border-2 border-vitale-primary/20 hover:border-vitale-primary/50 bg-gradient-to-br from-white to-vitale-primary/5 transform hover:-translate-y-2">
            <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-vitale-primary/20 to-vitale-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-10 h-10 text-vitale-primary" />
              </div>
                <CardTitle className="text-2xl font-bold text-vitale-primary">Bioestimuladores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-neutral-700 leading-relaxed">
                  Produtos avançados para bioestimulação e regeneração tecidual com resultados duradouros e naturais.
              </p>
              <div className="text-sm text-vitale-primary font-semibold">
                Marcas: Sculptra, Radiesse, Ellansé
              </div>
            </CardContent>
          </Card>

            <Card className="group text-center hover:shadow-2xl transition-all duration-300 border-2 border-vitale-primary/20 hover:border-vitale-primary/50 bg-gradient-to-br from-white to-vitale-primary/5 transform hover:-translate-y-2">
            <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-vitale-primary/20 to-vitale-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-10 h-10 text-vitale-primary" />
              </div>
                <CardTitle className="text-2xl font-bold text-vitale-primary">Acessórios Premium</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-neutral-700 leading-relaxed">
                  Microcânulas, fios de sustentação, enzimas e produtos complementares de alta qualidade profissional.
              </p>
              <div className="text-sm text-vitale-primary font-semibold">
                Linha Completa Profissional
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </section>

      {/* CTA Final Otimizado */}
      <section className="py-20 bg-gradient-to-br from-vitale-primary/10 via-vitale-secondary/5 to-vitale-primary/10">
        <div className="container mx-auto px-4 text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-vitale-primary">
              Pronto para Elevar sua Prática Profissional?
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
              <strong className="text-vitale-primary">Catálogo premium completo</strong>, entrega expressa em 24-48h e suporte consultivo especializado para sua clínica.
              <br />
              <span className="text-lg">Mais de 2.000 profissionais já confiam na Vytalle.</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/products">
              <Button className="px-12 py-6 text-xl font-bold shadow-2xl bg-vitale-primary text-white hover:bg-vitale-secondary rounded-2xl transition-all duration-300 transform hover:scale-105 group">
                <Package className="w-6 h-6 mr-3" />
                Explorar Catálogo Completo
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            
            <a
              href="https://www.instagram.com/vytalle.estetica/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="flex items-center gap-4 px-10 py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                <Instagram className="w-6 h-6" />
                <span>Siga no Instagram</span>
              </Button>
            </a>

            <a
              href="https://wa.me/5521996192890?text=Olá! Gostaria de conhecer os produtos da Vytalle Estética & Viscosuplementação."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="px-10 py-6 text-lg font-semibold bg-green-600 text-white hover:bg-green-700 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3 transform hover:scale-105">
                <MessageCircle className="w-6 h-6" />
                <span>Consultor Especializado</span>
              </Button>
            </a>
          </div>

          {/* Garantias e Trust Signals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-12">
            <div className="text-center space-y-3">
              <Shield className="w-12 h-12 text-green-600 mx-auto" />
              <h4 className="text-lg font-bold text-vitale-primary">Garantia Total</h4>
              <p className="text-sm text-neutral-700">100% produtos originais ou seu dinheiro de volta</p>
            </div>
            <div className="text-center space-y-3">
              <Truck className="w-12 h-12 text-blue-600 mx-auto" />
              <h4 className="text-lg font-bold text-vitale-primary">Entrega Expressa</h4>
              <p className="text-sm text-neutral-700">Logística especializada para produtos médicos</p>
            </div>
            <div className="text-center space-y-3">
              <MessageCircle className="w-12 h-12 text-green-600 mx-auto" />
              <h4 className="text-lg font-bold text-vitale-primary">Suporte 24/7</h4>
              <p className="text-sm text-neutral-700">Consultoria especializada via WhatsApp</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}