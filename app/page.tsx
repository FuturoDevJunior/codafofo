import {
  ArrowRight,
  Instagram,
  MessageCircle,
  Package,
  Shield,
  Truck,
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

export default function Home() {
  return (
    <div className="space-y-16 lg:space-y-20">
      {/* Hero Section Moderno */}
      <section className="relative text-center space-y-8 py-12 sm:py-16 lg:py-20">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-vitale-primary/5 rounded-3xl -z-10"></div>
        
        <div className="space-y-8 lg:space-y-10">
          {/* Logo Principal */}
          <div className="flex justify-center">
            <div className="relative group">
              <SmartImage 
                src="/Vytalle_Logo_Gold.webp" 
                alt="Vytalle Estética" 
                width={112} 
                height={112}
                className="relative h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 rounded-2xl shadow-2xl ring-4 ring-vitale-primary/20 group-hover:ring-vitale-primary/40 transition-all duration-300 interactive" 
                priority={true}
              />
            </div>
          </div>
          
          {/* Título e Descrição */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-vitale-primary leading-tight mb-2">
            Produtos Premium para Estética Profissional
          </h2>
          <p className="text-lg sm:text-xl text-neutral-700 max-w-2xl mx-auto mb-6">
            Produtos originais, entrega rápida e suporte consultivo para clínicas e profissionais.
          </p>

          {/* Linha de benefícios enxuta */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm mt-4">
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-success-600" /> Compra Segura</span>
            <span className="flex items-center gap-2"><Package className="w-4 h-4 text-vitale-primary" /> Produtos Originais</span>
            <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-vitale-secondary" /> Entrega Rápida</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link href="/products">
            <Button className="group px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-vitale-primary text-white hover:bg-vitale-secondary rounded-2xl interactive">
              <span className="flex items-center gap-2">
                Explorar Catálogo Completo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>

          {/* Instagram Link com ícone elegante */}
          <a
            href="https://www.instagram.com/vytalle.estetica/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Button className="flex items-center gap-3 px-6 py-4 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl interactive">
              <Instagram className="w-6 h-6 text-purple-100 bg-white rounded-lg p-1" />
              <span className="group-hover:scale-105 transition-transform">
                Siga no Instagram
              </span>
            </Button>
          </a>
        </div>
      </section>

      {/* Sobre Nós Section */}
      <section className="py-16 bg-gradient-to-br from-vitale-primary/5 via-transparent to-vitale-primary/5 rounded-3xl">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-vitale-primary">Sobre a Vytalle Estética</h2>
            <div className="w-24 h-1 bg-vitale-primary/20 rounded-full mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-vitale-primary">Nossa Missão</h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-vitale-primary">Seu diferencial começa com o produto certo.</strong> 
                Distribuir produtos estéticos e viscosuplementação de alta qualidade, garantindo procedência, 
                autenticidade e excelência para profissionais da área da saúde em todo o Brasil.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-vitale-primary">Nossa Visão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser a principal referência na distribuição de produtos médicos estéticos, 
                reconhecida pela qualidade, confiabilidade e excelência no atendimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias de Produtos */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-vitale-primary">Nossas Categorias de Produtos</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            <strong className="text-vitale-primary">As melhores marcas, sempre originais e certificadas para sua clínica.</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-xl transition-all border-vitale-primary/20 hover:border-vitale-primary/40">
            <CardHeader>
              <div className="w-16 h-16 bg-vitale-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="text-3xl text-vitale-primary" />
              </div>
              <CardTitle className="text-vitale-primary">Toxina Botulínica</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Toxinas originais das principais marcas para uso profissional.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all border-vitale-primary/20 hover:border-vitale-primary/40">
            <CardHeader>
              <div className="w-16 h-16 bg-vitale-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-3xl text-vitale-primary" />
              </div>
              <CardTitle className="text-vitale-primary">Preenchedores</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-muted-foreground text-sm">
                Preenchedores de ácido hialurônico das marcas líderes.
            </p>
          </CardContent>
        </Card>

          <Card className="text-center hover:shadow-xl transition-all border-vitale-primary/20 hover:border-vitale-primary/40">
          <CardHeader>
              <div className="w-16 h-16 bg-vitale-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="text-3xl text-vitale-primary" />
            </div>
              <CardTitle className="text-vitale-primary">Bioestimuladores</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-muted-foreground text-sm">
                Produtos para bioestimulação e regeneração tecidual
            </p>
          </CardContent>
        </Card>

          <Card className="text-center hover:shadow-xl transition-all border-vitale-primary/20 hover:border-vitale-primary/40">
          <CardHeader>
              <div className="w-16 h-16 bg-vitale-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="text-3xl text-vitale-primary" />
            </div>
              <CardTitle className="text-vitale-primary">Acessórios</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-muted-foreground text-sm">
                Microcânulas, fios e outros produtos complementares
            </p>
          </CardContent>
        </Card>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 bg-gradient-to-r from-vitale-primary/5 to-vitale-primary/10 rounded-3xl">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-vitale-primary">Por que escolher a Vytalle?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nossos diferenciais que garantem a melhor experiência
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-vitale-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="text-4xl text-vitale-primary" />
              </div>
              <h3 className="text-xl font-semibold text-vitale-primary">Qualidade Garantida</h3>
              <p className="text-muted-foreground">
                Produtos originais e certificados, com procedência garantida e eficácia comprovada
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-vitale-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Truck className="text-4xl text-vitale-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-vitale-primary">Entrega Rápida</h3>
              <p className="text-muted-foreground">
                Logística especializada para entrega segura de produtos médicos em todo Brasil
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-vitale-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="text-4xl text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-vitale-primary">Vendas Digital</h3>
              <p className="text-muted-foreground">
                Pedidos facilitados via WhatsApp com processo de compra rápido e seguro
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-vitale-primary">+500</div>
              <p className="text-muted-foreground">Clientes Satisfeitos</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-vitale-primary">+50</div>
              <p className="text-muted-foreground">Produtos Premium</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-vitale-primary">5+</div>
              <p className="text-muted-foreground">Anos de Experiência</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-vitale-primary">100%</div>
              <p className="text-muted-foreground">Produtos Originais</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="text-center py-16 bg-gradient-to-r from-vitale-primary/5 to-vitale-primary/10 rounded-3xl">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-vitale-primary">
            Pronto para conhecer nossos produtos?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Catálogo completo, entrega rápida e suporte especializado para sua clínica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg bg-vitale-primary text-white hover:bg-vitale-secondary rounded-xl transition-all duration-300 interactive focus-ring">
                Explorar Catálogo Completo
              </Button>
            </Link>
            
            <a
              href="https://www.instagram.com/vytalle.estetica/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Button className="flex items-center gap-3 px-6 py-4 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl interactive">
                <Instagram className="w-5 h-5 text-purple-100 bg-white rounded-md p-1" />
                <span>Siga no Instagram</span>
              </Button>
            </a>

            <a
              href="https://wa.me/5521996192890?text=Olá! Gostaria de conhecer os produtos da Vytalle Estética & Viscosuplementação."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="px-8 py-4 text-lg font-semibold border-2 border-vitale-primary text-vitale-primary hover:bg-vitale-primary hover:text-white rounded-xl transition-all duration-300 focus-ring flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-success-600" />
                <span>Falar com Consultor</span>
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
