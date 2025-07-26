'use client';

import { useEffect, useState } from 'react';

import { Shield } from 'lucide-react';
import dynamic from 'next/dynamic';

// Importação dinâmica do Supabase para evitar erro de prerendering
const AdminLoginForm = dynamic(() => import('./AdminLoginForm'), {
  ssr: false,
  loading: () => (
    <div className="via-white flex min-h-screen items-center justify-center bg-gradient-to-br from-vitale-primary/10 to-vitale-secondary/10 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-vitale-primary/10">
            <Shield className="h-10 w-10 text-vitale-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-vitale-primary">Painel Admin</h1>
          <p className="text-neutral-600">Carregando...</p>
        </div>
      </div>
    </div>
  ),
});

export default function AdminLogin() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="via-white flex min-h-screen items-center justify-center bg-gradient-to-br from-vitale-primary/10 to-vitale-secondary/10 p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-vitale-primary/10">
              <Shield className="h-10 w-10 text-vitale-primary" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-vitale-primary">Painel Admin</h1>
            <p className="text-neutral-600">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  return <AdminLoginForm />;
}
