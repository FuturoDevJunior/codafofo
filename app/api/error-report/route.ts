import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar dados obrigatórios
    if (!body.error || !body.timestamp) {
      return NextResponse.json({ error: 'Dados obrigatórios não fornecidos' }, { status: 400 });
    }

    // Aqui você pode implementar a lógica real de salvamento do erro
    // Por exemplo, salvar no Supabase, enviar para serviço de monitoramento, etc.

    // Log do erro para desenvolvimento
    console.error('Error Report:', {
      error: body.error,
      stack: body.stack,
      url: body.url,
      userAgent: body.userAgent,
      timestamp: body.timestamp,
    });

    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json(
      { success: true, message: 'Erro reportado com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao processar report:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
