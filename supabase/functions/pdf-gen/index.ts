import {
  PDFDocument,
  rgb,
  StandardFonts,
} from 'pdf-lib';

export async function generatePDF(order: any) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.addPage([600, 400]);
  page.drawText('Nota Vytalle Estética', { x: 50, y: 350, size: 20, font, color: rgb(0.5, 0, 0.5) });
  page.drawText(`Cliente: ${order.customer_name}`, { x: 50, y: 320, size: 12, font });
  page.drawText(`Total: R$${order.total.toFixed(2)}`, { x: 50, y: 300, size: 12, font });
  // Adicione tabela itens
  let y = 280;
  order.items.forEach((item: any) => {
    page.drawText(`${item.name} x ${item.quantity} - R$${item.price}`, { x: 50, y, size: 10, font });
    y -= 20;
  });
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
