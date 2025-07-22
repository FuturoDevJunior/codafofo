import { notFound } from 'next/navigation';

import { getProductBySlugFromSupabase } from '@/lib/productService.server';

import ProductDetailClient from './ProductDetailClient';

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlugFromSupabase(resolvedParams.slug);
  if (!product) notFound();

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <ProductDetailClient product={product} />
    </div>
  );
}
