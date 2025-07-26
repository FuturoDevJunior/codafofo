export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'vendedor';
  commission_percent?: number; // Apenas para vendedores
  active: boolean;
  created_at: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expires_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
