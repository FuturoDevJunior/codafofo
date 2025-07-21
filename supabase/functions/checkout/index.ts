import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

import { generatePDF } from '../pdf-gen/index.ts';

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const { customer_name, customer_phone, items, total } = await req.json();

  const { data: order } = await supabase.from('orders').insert({ customer_name, customer_phone, items, total }).select().single();

  const pdfBytes = await generatePDF(order);
  const { data: upload } = await supabase.storage.from('notes').upload(`order-${order.id}.pdf`, pdfBytes, { contentType: 'application/pdf', upsert: true });
  const pdfUrl = supabase.storage.from('notes').getPublicUrl(upload.path).data.publicUrl;

  await supabase.from('orders').update({ pdf_url: pdfUrl }).eq('id', order.id);

  // Mensagem WhatsApp Cliente
  let message = `Olá ${customer_name}, tudo bem? Gostaria de agendar/consultar estes serviços:\n`;
  items.forEach((item: any) => message += `• ${item.name} ×${item.quantity} → R$${item.price}\n`);
  message += `Total: R$${total}\nPDF: ${pdfUrl}`;

  // Aqui você pode integrar com a API do WhatsApp Cloud se desejar

  return new Response(JSON.stringify({ whatsappMessage: message, pdfUrl }), { status: 200 });
});
