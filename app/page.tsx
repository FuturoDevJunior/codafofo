import Link from 'next/link';
import { Sparkles, Shield, Users, Phone, ArrowRight, Star } from 'lucide-react';
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
        <div className="absolute inset-0 bg-gradient-to-br from-vitale-primary/5 via-transparent to-vitale-secondary/5 rounded-3xl -z-10"></div>
        
        <div className="space-y-6 lg:space-y-8">
          {/* Logo Principal */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-vitale-primary to-vitale-secondary rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <SmartImage 
                src="/icons/icon-192.png" 
                alt="Vytalle Estética" 
                width={112} 
                height={112}
                className="relative h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 rounded-2xl shadow-2xl ring-4 ring-vitale-primary/20 group-hover:ring-vitale-primary/40 transition-all duration-300 interactive" 
                priority={true}
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 bg-success-500 rounded-full flex items-center justify-center shadow-lg animate-pulse-soft">
                <span className="text-sm text-white font-bold">✓</span>
              </div>
            </div>
          </div>
          
          {/* Título e Descrição */}
          <div className="space-y-4 lg:space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-vitale-primary tracking-tight leading-tight">
                Vytalle Estética
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-warning-500 fill-current" />
                <Star className="w-5 h-5 text-warning-500 fill-current" />
                <Star className="w-5 h-5 text-warning-500 fill-current" />
                <Star className="w-5 h-5 text-warning-500 fill-current" />
                <Star className="w-5 h-5 text-warning-500 fill-current" />
                <span className="text-sm text-neutral-600 ml-2">Excelência comprovada</span>
              </div>
            </div>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Excelência em tratamentos estéticos avançados e produtos premium para profissionais da saúde
            </p>
            
            {/* Status Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse-soft"></div>
                <span className="text-neutral-600 font-medium">Catálogo Digital Ativo</span>
              </div>
              <span className="text-neutral-400" aria-hidden="true">•</span>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-vitale-primary" />
                <span className="text-neutral-600 font-medium">Pedidos via WhatsApp</span>
              </div>
              <span className="text-neutral-400" aria-hidden="true">•</span>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success-500" />
                <span className="text-neutral-600 font-medium">Produtos Originais</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link href="/products">
            <Button className="group px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-vitale-primary text-white hover:bg-vitale-secondary rounded-2xl interactive">
              <span className="flex items-center gap-2">
                Ver Catálogo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
          <Button className="px-8 py-4 text-lg font-semibold border-2 border-vitale-primary text-vitale-primary hover:bg-vitale-primary/10 hover:border-vitale-secondary hover:text-vitale-secondary rounded-2xl transition-all duration-300 focus-ring">
            Falar com Especialista
          </Button>
        </div>
      </section>

      {/* Sobre Nós Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-primary">Sobre a Vytalle Estética</h2>
            <div className="w-24 h-1 bg-primary/20 rounded-full mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary">Nossa Missão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fornecer produtos estéticos de alta qualidade, garantindo segurança, eficácia e resultados excepcionais para nossos clientes. 
                Nosso compromisso é com a excelência em cada tratamento oferecido.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary">Nossa Visão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser referência no mercado de estética, reconhecida pela qualidade dos produtos, 
                atendimento personalizado e resultados comprovados em tratamentos estéticos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços Especializados */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-primary">Nossos Serviços Especializados</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Oferecemos uma ampla gama de tratamentos estéticos avançados
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-xl transition-all border-primary/20 hover:border-primary/40">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💉</span>
              </div>
              <CardTitle className="text-primary">Toxina Botulínica</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Botox, Dysport e Xeomin para redução de rugas e linhas de expressão
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all border-primary/20 hover:border-primary/40">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💎</span>
              </div>
              <CardTitle className="text-primary">Viscosuplementação</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-muted-foreground text-sm">
                Ácido hialurônico para hidratação, preenchimento e rejuvenescimento
            </p>
          </CardContent>
        </Card>

          <Card className="text-center hover:shadow-xl transition-all border-primary/20 hover:border-primary/40">
          <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
            </div>
              <CardTitle className="text-primary">Tratamentos Faciais</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-muted-foreground text-sm">
                Procedimentos especializados para rejuvenescimento facial
            </p>
          </CardContent>
        </Card>

          <Card className="text-center hover:shadow-xl transition-all border-primary/20 hover:border-primary/40">
          <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
            </div>
              <CardTitle className="text-primary">Consultoria Especializada</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-muted-foreground text-sm">
                Orientação personalizada para escolha dos melhores tratamentos
            </p>
          </CardContent>
        </Card>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-primary">Por que escolher a Vytalle?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nossos diferenciais que garantem a melhor experiência
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-primary">Qualidade Garantida</h3>
              <p className="text-muted-foreground">
                Produtos originais e certificados, com procedência garantida e eficácia comprovada
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">👩‍⚕️</span>
              </div>
              <h3 className="text-xl font-semibold text-primary">Profissionais Qualificados</h3>
              <p className="text-muted-foreground">
                Equipe especializada com formação e experiência em tratamentos estéticos
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-primary">Atendimento Digital</h3>
              <p className="text-muted-foreground">
                Pedidos facilitados via WhatsApp com atendimento personalizado e ágil
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
              <div className="text-4xl font-bold text-primary">+500</div>
              <p className="text-muted-foreground">Clientes Satisfeitos</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">+50</div>
              <p className="text-muted-foreground">Produtos Premium</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">5+</div>
              <p className="text-muted-foreground">Anos de Experiência</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">100%</div>
              <p className="text-muted-foreground">Produtos Originais</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="text-center py-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-primary">
            Pronto para descobrir nossos produtos?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore nosso catálogo completo e encontre os melhores tratamentos estéticos para você
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/products">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg bg-primary text-white hover:bg-primary/90">
              Explorar Catálogo
            </Button>
          </Link>
            <Button className="px-8 py-4 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary/10">
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
