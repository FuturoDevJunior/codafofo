import ProductCard from '@/components/ProductCard';
import { getMockProductsCached } from '@/lib/mockData';
import { Product } from '@/types/product';

export const revalidate = 3600; // ISR

export default async function Products() {
  // Usar cache inteligente para máxima performance
  const products = await getMockProductsCached();

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">📦</span>
          </div>
          <h2 className="text-2xl font-bold text-muted-foreground">Nenhum produto disponível</h2>
          <p className="text-muted-foreground">Volte em breve para novos produtos</p>
        </div>
      </div>
    );
  }

  // Agrupar produtos por categoria
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="space-y-12">
      {/* Header da Página */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            Catálogo Vytalle Estética
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa seleção premium de tratamentos estéticos e viscosuplementação
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{products.length} produtos disponíveis</span>
          </div>
          <div className="w-px h-4 bg-border/50"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>{Object.keys(productsByCategory).length} categorias</span>
          </div>
        </div>
      </div>

      {/* Produtos por Categoria */}
      <div className="space-y-16">
        {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
          <div key={category} className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">{category}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {category === 'Toxina Botulínica' && 'Toxinas botulínicas para redução de rugas e rejuvenescimento facial'}
                {category === 'Bioestimulador' && 'Bioestimuladores para regeneração celular e estímulo de colágeno'}
                {category === 'Preenchedor' && 'Preenchedores com ácido hialurônico para contorno e volume facial'}
                {category === 'Fio Bioestimulação' && 'Fios de bioestimulação para lifting e regeneração de colágeno'}
                {category === 'Microcânula' && 'Microcânulas profissionais para aplicação precisa e segura'}
                {category === 'Enzima' && 'Enzimas para dissolução e correção de tratamentos estéticos'}
                {category === 'Skinbooster' && 'Skinboosters para hidratação profunda e melhora da qualidade da pele'}
                {category === 'Bioremodelador' && 'Bioremodeladores para regeneração tecidual e rejuvenescimento'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Final */}
      <div className="text-center py-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-primary">Pronto para começar?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Entre em contato conosco para agendar sua consulta e descobrir qual tratamento é ideal para você.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/5562999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              <span>WhatsApp</span>
              <span className="text-lg">💬</span>
            </a>
            <a
              href="tel:+5562999999999"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <span>Ligar</span>
              <span className="text-lg">📞</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
