'use client';

import { useState } from 'react';

import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/browser';

export default function AdminLoginForm() {
  const [email, setEmail] = useState('admin@vytalle.com.br');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        if (authError.message.includes('Invalid login credentials')) {
          setError('Email ou senha incorretos.');
        } else {
          setError('Erro no login. Tente novamente.');
        }
        return;
      }

      if (!authData.user) {
        setError('Erro inesperado no login.');
        return;
      }

      router.push('/admin');
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="via-white flex min-h-screen items-center justify-center bg-gradient-to-br from-vitale-primary/10 to-vitale-secondary/10 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-vitale-primary/10">
            <Shield className="h-10 w-10 text-vitale-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-vitale-primary">Painel Admin</h1>
          <p className="text-neutral-600">Acesso restrito - Supabase Auth</p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-vitale-primary/20 p-8 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-vitale-primary">
                Email Administrativo
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-vitale-primary" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="rounded-xl border-2 border-vitale-primary/30 py-4 pl-12 text-lg focus:border-vitale-primary"
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold text-vitale-primary">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-vitale-primary" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="rounded-xl border-2 border-vitale-primary/30 py-4 pl-12 pr-12 text-lg focus:border-vitale-primary"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform text-vitale-primary"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-red-200 rounded-xl border-2 p-4">
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="text-white min-h-[56px] w-full rounded-xl bg-vitale-primary py-4 text-lg font-bold hover:bg-vitale-secondary"
            >
              {isLoading ? 'Verificando...' : 'Entrar com Supabase'}
            </Button>
          </form>

          <div className="bg-blue-50 border-blue-200 mt-6 rounded-xl border p-4">
            <p className="text-blue-800 text-sm font-medium">
              🔒 Autenticação 100% segura via Supabase
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
