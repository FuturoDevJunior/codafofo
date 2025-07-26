import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

import { generatePDF } from '../pdf-gen/index.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

serve(async req => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const { customer_name, customer_phone, items, total } = await req.json();

  const { data: order } = await supabase
    .from('orders')
    .insert({ customer_name, customer_phone, items, total })
    .select()
    .single();

  const pdfBytes = await generatePDF(order);
  const { data: upload } = await supabase.storage
    .from('notes')
    .upload(`order-${order.id}.pdf`, pdfBytes, { contentType: 'application/pdf', upsert: true });
  const pdfUrl = supabase.storage.from('notes').getPublicUrl(upload.path).data.publicUrl;

  await supabase.from('orders').update({ pdf_url: pdfUrl }).eq('id', order.id);

  // Mensagem WhatsApp Cliente
  const items_list = items
    .map((item: any) => `• ${item.name} - Qtd: ${item.quantity} - Valor: R$${item.price}`)
    .join('\n');

  const message = `Prezado(a) ${customer_name},

Agradecemos o seu interesse em nossos insumos estéticos de alta performance.

Abaixo, apresentamos o detalhamento da sua cotação:

${items_list}

**Valor total da cotação: R$${total}**

Um dos nossos vendedores irá finalizar sua compra.

Nossa equipe está à sua disposição para qualquer esclarecimento.

Atenciosamente,
        Equipe Vytalle Estética & Viscosuplementação

PDF da cotação: ${pdfUrl}`;

  // Aqui você pode integrar com a API do WhatsApp Cloud se desejar

  return new Response(JSON.stringify({ whatsappMessage: message, pdfUrl }), { status: 200 });
});
