import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

export async function POST(_request: NextRequest) {
  try {
    // Verificar se as variáveis de ambiente estão definidas
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'Variáveis de ambiente do Supabase não configuradas',
          missing: {
            url: !supabaseUrl,
            serviceKey: !supabaseServiceKey,
          },
        },
        { status: 400 }
      );
    }

    // Criar cliente com service role
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const adminEmail = 'admin@vytalle.com.br';

    // Verificar se o usuário já existe
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();

    if (listError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Erro ao verificar usuários existentes',
          details: listError.message,
        },
        { status: 500 }
      );
    }

    const existingAdmin = existingUsers.users.find(user => user.email === adminEmail);

    if (existingAdmin) {
      return NextResponse.json({
        success: true,
        message: 'Usuário admin já existe',
        userExists: true,
        userId: existingAdmin.id,
      });
    }

    // Criar novo usuário admin
    const adminPassword = 'VytalleAdmin2024!@#';

    const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        role: 'admin',
        name: 'Administrador Vytalle',
      },
    });

    if (createError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Erro ao criar usuário admin',
          details: createError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Usuário admin criado com sucesso!',
      credentials: {
        email: adminEmail,
        password: adminPassword,
      },
      userId: createData.user?.id,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}
