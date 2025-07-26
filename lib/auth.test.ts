import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthService, useAuth } from './auth';

// Mock do localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    AuthService.logout();
  });

  describe('login', () => {
    it('deve fazer login com credenciais válidas', async () => {
      const credentials = {
        email: 'admin@vytalle.com',
        password: 'admin123',
      };

      const session = await AuthService.login(credentials);

      expect(session).toBeDefined();
      expect(session?.user.email).toBe('admin@vytalle.com');
      expect(session?.user.role).toBe('admin');
      expect(session?.token).toBeDefined();
      expect(session?.expires_at).toBeDefined();
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('deve rejeitar credenciais inválidas', async () => {
      const credentials = {
        email: 'admin@vytalle.com',
        password: 'senhaerrada',
      };

      await expect(AuthService.login(credentials)).rejects.toThrow('Email ou senha incorretos');
    });

    it('deve rejeitar usuário inativo', async () => {
      const credentials = {
        email: 'usuario@inativo.com',
        password: 'senha123',
      };

      await expect(AuthService.login(credentials)).rejects.toThrow('Email ou senha incorretos');
    });

    it('deve rejeitar email inexistente', async () => {
      const credentials = {
        email: 'inexistente@email.com',
        password: 'senha123',
      };

      await expect(AuthService.login(credentials)).rejects.toThrow('Email ou senha incorretos');
    });
  });

  describe('logout', () => {
    it('deve limpar sessão do localStorage', () => {
      AuthService.logout();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('vytalle_session');
    });
  });

  describe('getCurrentSession', () => {
    it('deve retornar sessão válida do localStorage', () => {
      const mockSession = {
        user: { id: '1', email: 'admin@vytalle.com', role: 'admin' },
        token: 'mock-token',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSession));

      const session = AuthService.getCurrentSession();

      expect(session).toEqual(mockSession);
    });

    it('deve retornar null quando não há sessão', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const session = AuthService.getCurrentSession();

      expect(session).toBeNull();
    });

    it('deve retornar null quando sessão expirou', () => {
      const expiredSession = {
        user: { id: '1', email: 'admin@vytalle.com', role: 'admin' },
        token: 'mock-token',
        expires_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(expiredSession));

      const session = AuthService.getCurrentSession();

      expect(session).toBeNull();
      expect(localStorageMock.removeItem).toHaveBeenCalled();
    });

    it('deve retornar null quando localStorage é inválido', () => {
      localStorageMock.getItem.mockReturnValue('invalid-json');

      const session = AuthService.getCurrentSession();

      expect(session).toBeNull();
    });

    it('deve retornar null em ambiente SSR', () => {
      // Simular ambiente sem window
      const originalWindow = global.window;
      (global as any).window = undefined;

      const session = AuthService.getCurrentSession();

      expect(session).toBeNull();

      global.window = originalWindow;
    });
  });

  describe('getCurrentUser', () => {
    it('deve retornar usuário da sessão atual', () => {
      const mockUser = { id: '1', email: 'admin@vytalle.com', role: 'admin' };
      const mockSession = {
        user: mockUser,
        token: 'mock-token',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSession));

      const user = AuthService.getCurrentUser();

      expect(user).toEqual(mockUser);
    });

    it('deve retornar null quando não há sessão', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const user = AuthService.getCurrentUser();

      expect(user).toBeNull();
    });
  });

  describe('isAdmin', () => {
    it('deve retornar true para usuário admin', () => {
      const mockSession = {
        user: { id: '1', email: 'admin@vytalle.com', role: 'admin' },
        token: 'mock-token',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSession));

      const isAdmin = AuthService.isAdmin();

      expect(isAdmin).toBe(true);
    });

    it('deve retornar false para usuário não-admin', () => {
      const mockSession = {
        user: { id: '2', email: 'joao@vendedor.com', role: 'vendedor' },
        token: 'mock-token',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSession));

      const isAdmin = AuthService.isAdmin();

      expect(isAdmin).toBe(false);
    });

    it('deve retornar false quando não há usuário', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const isAdmin = AuthService.isAdmin();

      expect(isAdmin).toBe(false);
    });
  });

  describe('isVendedor', () => {
    it('deve retornar true para usuário vendedor', () => {
      const mockSession = {
        user: { id: '2', email: 'joao@vendedor.com', role: 'vendedor' },
        token: 'mock-token',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSession));

      const isVendedor = AuthService.isVendedor();

      expect(isVendedor).toBe(true);
    });

    it('deve retornar false para usuário admin', () => {
      const mockSession = {
        user: { id: '1', email: 'admin@vytalle.com', role: 'admin' },
        token: 'mock-token',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSession));

      const isVendedor = AuthService.isVendedor();

      expect(isVendedor).toBe(false);
    });
  });

  describe('getUserCommission', () => {
    it('deve retornar comissão do vendedor', () => {
      const mockSession = {
        user: {
          id: '2',
          email: 'joao@vendedor.com',
          role: 'vendedor',
          commission_percent: 5,
        },
        token: 'mock-token',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSession));

      const commission = AuthService.getUserCommission();

      expect(commission).toBe(5);
    });

    it('deve retornar 0 para usuário sem comissão', () => {
      const mockSession = {
        user: { id: '1', email: 'admin@vytalle.com', role: 'admin' },
        token: 'mock-token',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSession));

      const commission = AuthService.getUserCommission();

      expect(commission).toBe(0);
    });
  });

  describe('requireAuth', () => {
    it('deve retornar usuário autenticado', () => {
      const mockUser = { id: '1', email: 'admin@vytalle.com', role: 'admin' };
      const mockSession = {
        user: mockUser,
        token: 'mock-token',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSession));

      const user = AuthService.requireAuth();

      expect(user).toEqual(mockUser);
    });

    it('deve lançar erro quando não há usuário autenticado', () => {
      localStorageMock.getItem.mockReturnValue(null);

      expect(() => AuthService.requireAuth()).toThrow('Acesso negado. Faça login primeiro.');
    });
  });

  describe('requireAdmin', () => {
    it('deve retornar usuário admin', () => {
      const mockUser = { id: '1', email: 'admin@vytalle.com', role: 'admin' };
      const mockSession = {
        user: mockUser,
        token: 'mock-token',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSession));

      const user = AuthService.requireAdmin();

      expect(user).toEqual(mockUser);
    });

    it('deve lançar erro quando usuário não é admin', () => {
      const mockSession = {
        user: { id: '2', email: 'joao@vendedor.com', role: 'vendedor' },
        token: 'mock-token',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSession));

      expect(() => AuthService.requireAdmin()).toThrow('Acesso negado. Apenas administradores.');
    });

    it('deve lançar erro quando não há usuário autenticado', () => {
      localStorageMock.getItem.mockReturnValue(null);

      expect(() => AuthService.requireAdmin()).toThrow('Acesso negado. Faça login primeiro.');
    });
  });
});

describe('useAuth', () => {
  it('deve retornar todas as funções de autenticação', () => {
    const auth = useAuth();

    expect(auth.getCurrentUser).toBeDefined();
    expect(auth.isAuthenticated).toBeDefined();
    expect(auth.isAdmin).toBeDefined();
    expect(auth.isVendedor).toBeDefined();
    expect(auth.login).toBeDefined();
    expect(auth.logout).toBeDefined();
  });

  it('deve verificar se usuário está autenticado', () => {
    const mockUser = { id: '1', email: 'admin@vytalle.com', role: 'admin' };
    const mockSession = {
      user: mockUser,
      token: 'mock-token',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSession));

    const auth = useAuth();
    const isAuthenticated = auth.isAuthenticated();

    expect(isAuthenticated).toBe(true);
  });

  it('deve verificar se usuário não está autenticado', () => {
    localStorageMock.getItem.mockReturnValue(null);

    const auth = useAuth();
    const isAuthenticated = auth.isAuthenticated();

    expect(isAuthenticated).toBe(false);
  });
});
