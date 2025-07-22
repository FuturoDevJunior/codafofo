'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Lock,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Credenciais obtidas das variáveis de ambiente
  const ADMIN_CREDENTIALS = {
    username: process.env.ADMIN_USERNAME || 'vytalle',
    password: process.env.ADMIN_PASSWORD || 'admin2025'
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de verificação
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (
      credentials.username === ADMIN_CREDENTIALS.username && 
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      // Salvar sessão no localStorage (em produção, use JWT ou similar)
      localStorage.setItem('vytalle-admin-session', 'authenticated');
      
      toast({
        title: "✅ Login realizado!",
        description: "Bem-vindo ao painel administrativo.",
      });
      
      router.push('/admin/dashboard');
    } else {
      toast({
        title: "Usuário ou senha inválidos.",
        description: "",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitale-primary/10 via-white to-vitale-secondary/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-vitale-primary to-vitale-secondary rounded-2xl flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-neutral-800">
              Painel Administrativo
            </CardTitle>
            <p className="text-neutral-600 text-sm">
              Vytalle Estética - Acesso Restrito
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4" />
                  Usuário
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Digite seu usuário"
                  className="h-11 bg-white/50 border-neutral-200 focus:border-vitale-primary"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                  <Lock className="h-4 w-4" />
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Digite sua senha"
                    className="h-11 bg-white/50 border-neutral-200 focus:border-vitale-primary pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-neutral-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-neutral-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-vitale-primary to-vitale-secondary hover:from-vitale-primary/90 hover:to-vitale-secondary/90 text-white font-semibold transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Entrando...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span>Entrar no Painel</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-amber-700 mb-2">
                🔒 Acesso Restrito
              </h4>
              <div className="text-sm text-amber-600">
                <p>Entre em contato com o administrador para obter credenciais de acesso.</p>
              </div>
            </div>

            {/* Security Note */}
            <div className="text-center text-xs text-neutral-500">
              <p>🔒 Acesso seguro e protegido</p>
              <p>Desenvolvido por RET TECNOLOGIA</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}