'use client';

import { User, AuthSession, LoginCredentials } from '@/types/user';

// Dados mockados dos usuários (em produção seria banco de dados)
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin Vytalle',
    email: 'admin@vytalle.com',
    role: 'admin',
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'João Vendedor',
    email: 'joao@vendedor.com',
    role: 'vendedor',
    commission_percent: 5,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Maria Representante',
    email: 'maria@vendedor.com',
    role: 'vendedor',
    commission_percent: 4,
    active: true,
    created_at: new Date().toISOString(),
  },
];

// Senhas mockadas (em produção seria hash)
const mockPasswords: Record<string, string> = {
  'admin@vytalle.com': 'admin123',
  'joao@vendedor.com': 'vendedor123',
  'maria@vendedor.com': 'vendedor456',
};

export class AuthService {
  private static readonly SESSION_KEY = 'vytalle_session';

  static async login(credentials: LoginCredentials): Promise<AuthSession | null> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay

    const user = mockUsers.find(u => u.email === credentials.email && u.active);
    const password = mockPasswords[credentials.email];

    if (!user || password !== credentials.password) {
      throw new Error('Email ou senha incorretos');
    }

    const session: AuthSession = {
      user,
      token: btoa(`${user.id}-${Date.now()}`),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h
    };

    // Salvar no localStorage
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));

    return session;
  }

  static logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  static getCurrentSession(): AuthSession | null {
    if (typeof window === 'undefined') return null;

    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return null;

      const session: AuthSession = JSON.parse(sessionData);

      // Verificar se não expirou
      if (new Date(session.expires_at) < new Date()) {
        this.logout();
        return null;
      }

      return session;
    } catch {
      return null;
    }
  }

  static getCurrentUser(): User | null {
    const session = this.getCurrentSession();
    return session?.user || null;
  }

  static isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  static isVendedor(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'vendedor';
  }

  static getUserCommission(): number {
    const user = this.getCurrentUser();
    return user?.commission_percent || 0;
  }

  static requireAuth(): User {
    const user = this.getCurrentUser();
    if (!user) {
      throw new Error('Acesso negado. Faça login primeiro.');
    }
    return user;
  }

  static requireAdmin(): User {
    const user = this.requireAuth();
    if (user.role !== 'admin') {
      throw new Error('Acesso negado. Apenas administradores.');
    }
    return user;
  }
}

// Hook personalizado
export function useAuth() {
  const getCurrentUser = () => AuthService.getCurrentUser();
  const isAuthenticated = () => !!getCurrentUser();
  const isAdmin = () => AuthService.isAdmin();
  const isVendedor = () => AuthService.isVendedor();
  const login = (credentials: LoginCredentials) => AuthService.login(credentials);
  const logout = () => AuthService.logout();

  return {
    getCurrentUser,
    isAuthenticated,
    isAdmin,
    isVendedor,
    login,
    logout,
  };
}
