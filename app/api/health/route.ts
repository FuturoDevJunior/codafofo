import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Verificações básicas de saúde da aplicação
    const healthChecks = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      memory: process.memoryUsage(),
      platform: process.platform,
      nodeVersion: process.version,
    };

    // Verificar se as variáveis de ambiente essenciais estão configuradas
    const requiredEnvVars = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'];

    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

    if (missingEnvVars.length > 0) {
      return NextResponse.json(
        {
          status: 'unhealthy',
          message: `Missing environment variables: ${missingEnvVars.join(', ')}`,
          ...healthChecks,
        },
        { status: 503 }
      );
    }

    // Verificar conectividade com Supabase (opcional)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (supabaseUrl) {
        const response = await fetch(`${supabaseUrl}/rest/v1/`, {
          method: 'HEAD',
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
          },
        });

        if (!response.ok) {
          return NextResponse.json(
            {
              status: 'degraded',
              message: 'Supabase connection issues',
              ...healthChecks,
            },
            { status: 200 }
          );
        }
      }
    } catch (error) {
      // Supabase check failed, but app is still healthy
      console.warn('Supabase health check failed:', error);
    }

    return NextResponse.json(
      {
        status: 'healthy',
        message: 'Vytalle application is running normally',
        ...healthChecks,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check error:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        message: 'Internal server error during health check',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
