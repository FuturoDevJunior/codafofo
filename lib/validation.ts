/**
 * SISTEMA DE VALIDAÇÃO RIGOROSA - SEGURANÇA MÁXIMA
 * ================================================
 *
 * Validação e sanitização de todos os inputs do sistema
 */

import type { ContactForm, LoginForm, ProductForm, ValidationResult } from '@/types';

// Interfaces de validação
interface ProductFormData {
  name: string;
  price: number;
  price_pix?: number;
  price_card?: number;
  price_prazo?: number;
  description?: string;
  category: string;
  image?: string;
  images?: string[];
  stock?: number;
  active?: boolean;
}

interface AdminCredentials {
  email: string;
  username?: string;
  password: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  whatsapp?: string;
  cep?: string;
}

// Padrões de segurança
const SECURITY_PATTERNS = {
  sqlInjection: /(\b(union|select|insert|update|delete|drop|create|alter|exec|execute|script)\b)/i,
  xss: /(<script|javascript:|vbscript:|onload=|onerror=)/i,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s\-\+\(\)]+$/,
  whatsapp: /^55\d{10,11}$/,
  cep: /^\d{5}-?\d{3}$/,
};

// Função de sanitização de string
export function sanitizeString(input: string | undefined | null): string {
  if (!input || typeof input !== 'string') return '';

  let sanitized = input.trim();

  // Remover tags HTML perigosas mas preservar conteúdo
  sanitized = sanitized.replace(/<script[^>]*>.*?<\/script>/gi, '');
  sanitized = sanitized.replace(/<[^>]*>/g, '');

  // Remover padrões de SQL Injection
  const sqlPatterns = /\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\b/gi;
  sanitized = sanitized.replace(sqlPatterns, '');

  // Limitar tamanho a 1000 caracteres
  if (sanitized.length > 1000) {
    sanitized = sanitized.substring(0, 1000);
  }

  return sanitized;
}

// Função de sanitização de número
function sanitizeNumber(input: string | number | undefined): number {
  if (typeof input === 'number') return input;
  if (!input) return 0;
  const parsed = parseFloat(input.toString().replace(/[^\d.-]/g, ''));
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Valida dados de produto com segurança máxima
 */
export function validateProductData(data: Partial<ProductForm>): ValidationResult {
  const errors: string[] = [];

  // Validação de nome
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Nome é obrigatório');
  } else if (data.name.length > 200) {
    errors.push('Nome muito longo (máx 200 caracteres)');
  }

  // Validação de preço
  if (data.price === undefined || data.price === null) {
    errors.push('Preço é obrigatório');
  } else {
    // Verificar se é um número válido antes de sanitizar
    if (typeof data.price === 'string' && isNaN(Number(data.price))) {
      errors.push('Preço deve ser um número positivo válido');
    } else {
      const price = sanitizeNumber(data.price);
      if (price <= 0 || isNaN(price)) {
        errors.push('Preço deve ser um número positivo válido');
      } else if (price > 999999) {
        errors.push('Preço deve ser um número positivo válido');
      }
    }
  }

  // Validação de descrição
  if (
    !data.description ||
    typeof data.description !== 'string' ||
    data.description.trim().length === 0
  ) {
    errors.push('Descrição é obrigatória');
  } else if (data.description.length > 2000) {
    errors.push('Descrição muito longa (máx 2000 caracteres)');
  }

  // Validação de categoria
  const validCategories = [
    'Toxina Botulínica',
    'Preenchedor',
    'Bioestimulador',
    'Fios de Sustentação',
    'Microcânulas',
    'Enzimas',
    'Skinboosters',
    'Biorremodeladores',
    'Fio Bioestimulação',
    'Microcânula',
    'Enzima',
  ];
  if (!data.category || !validCategories.includes(data.category)) {
    errors.push('Categoria inválida');
  }

  // Validação de desconto percentual
  if (
    'discount_percent' in data &&
    data.discount_percent !== undefined &&
    data.discount_percent !== null
  ) {
    const discount = sanitizeNumber(data.discount_percent as number);
    if (
      discount < 0 ||
      discount > 100 ||
      (typeof data.discount_percent === 'string' && isNaN(Number(data.discount_percent)))
    ) {
      errors.push('Desconto deve estar entre 0 e 100%');
    }
  }

  // Validação de imagens
  let images: string[] = [];
  if (data.images && Array.isArray(data.images)) {
    // Filtrar URLs válidas
    images = data.images
      .filter(img => typeof img === 'string' && img.trim().length > 0)
      .filter(img => img.startsWith('http') || img.startsWith('/'))
      .map(img => sanitizeString(img));

    // Limitar a 10 imagens sem gerar erro
    if (images.length > 10) {
      images = images.slice(0, 10);
    }
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
      sanitizedData: undefined,
    };
  }

  // Dados sanitizados
  const sanitizedData: ProductFormData = {
    name: sanitizeString(data.name),
    price: sanitizeNumber(data.price),
    price_pix: data.price_pix !== undefined ? sanitizeNumber(data.price_pix) : undefined,
    price_card: data.price_card !== undefined ? sanitizeNumber(data.price_card) : undefined,
    price_prazo: data.price_prazo !== undefined ? sanitizeNumber(data.price_prazo) : undefined,
    description: sanitizeString(data.description),
    category: sanitizeString(data.category),
    image: sanitizeString(data.image),
    images: images.length > 0 ? images : [],
    stock: data.stock !== undefined ? sanitizeNumber(data.stock) : undefined,
    active: data.active !== undefined ? Boolean(data.active) : undefined,
  };

  return {
    isValid: true,
    errors: [],
    sanitizedData: sanitizedData as unknown as Record<string, unknown>,
  };
}

/**
 * Valida credenciais administrativas
 */
export function validateAdminCredentials(data: Partial<LoginForm>): ValidationResult {
  const errors: string[] = [];

  // Validação de email/username
  if (!data.email && !data.username) {
    errors.push('Email ou nome de usuário é obrigatório');
  } else {
    const email = data.email || data.username || '';
    if (!SECURITY_PATTERNS.email.test(email)) {
      errors.push('Email inválido');
    }
  }

  // Validação de username específica
  if (data.username && data.username.length < 3) {
    errors.push('Username deve ter pelo menos 3 caracteres');
  }

  // Validação de senha
  if (!data.password || typeof data.password !== 'string' || data.password.length < 6) {
    errors.push('Senha deve ter pelo menos 6 caracteres');
  }

  // Verificação de padrões maliciosos
  const emailCheck = data.email ? SECURITY_PATTERNS.sqlInjection.test(data.email) : false;
  const usernameCheck = data.username ? SECURITY_PATTERNS.sqlInjection.test(data.username) : false;
  const passwordCheck = data.password ? SECURITY_PATTERNS.sqlInjection.test(data.password) : false;

  if (emailCheck || usernameCheck || passwordCheck) {
    errors.push('Caracteres inválidos detectados');
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
      sanitizedData: undefined,
    };
  }

  // Dados sanitizados
  const sanitizedData: AdminCredentials = {
    email: sanitizeString(data.email),
    username: data.username ? sanitizeString(data.username) : undefined,
    password: data.password || '',
  };

  return {
    isValid: true,
    errors: [],
    sanitizedData: sanitizedData as unknown as Record<string, unknown>,
  };
}

/**
 * Valida dados de contato
 */
export function validateContactForm(data: Partial<ContactForm>): ValidationResult {
  const errors: string[] = [];

  // Validação de nome
  if (!data.name || typeof data.name !== 'string' || data.name.length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  } else {
    // Verificar caracteres inválidos no nome
    const invalidNamePattern = /[<>{}]/;
    if (invalidNamePattern.test(data.name)) {
      errors.push('Nome contém caracteres inválidos');
    }
  }

  // Validação de email
  if (!data.email || typeof data.email !== 'string' || !SECURITY_PATTERNS.email.test(data.email)) {
    errors.push('Email válido é obrigatório');
  }

  // Validação de mensagem
  if (!data.message || typeof data.message !== 'string' || data.message.length < 10) {
    errors.push('Mensagem deve ter pelo menos 10 caracteres');
  }

  // Validação de WhatsApp (opcional)
  if (data.whatsapp) {
    const cleanWhatsapp = data.whatsapp.replace(/[^0-9]/g, '');
    if (
      cleanWhatsapp.length >= 12 &&
      cleanWhatsapp.length <= 13 &&
      cleanWhatsapp.startsWith('55')
    ) {
      // Formato válido
    } else {
      errors.push('WhatsApp deve estar no formato: 5511999887766');
    }
  }

  // Validação de CEP (opcional)
  if (data.cep) {
    const cleanCep = data.cep.replace(/[^0-9-]/g, '');
    if (/^\d{5}-?\d{3}$/.test(cleanCep)) {
      // Formato válido
    } else {
      errors.push('CEP deve estar no formato brasileiro válido');
    }
  }

  // Verificação de padrões maliciosos
  const nameCheck = data.name ? SECURITY_PATTERNS.sqlInjection.test(data.name) : false;
  const messageCheck = data.message ? SECURITY_PATTERNS.xss.test(data.message) : false;

  if (nameCheck || messageCheck) {
    errors.push('Dados contêm padrões suspeitos');
  }

  // Dados sanitizados (sempre retornar, mesmo com erros)
  const sanitizedData: ContactFormData = {
    name: sanitizeString(data.name),
    email: sanitizeString(data.email),
    message: sanitizeString(data.message),
    phone: data.phone ? sanitizeString(data.phone) : undefined,
    whatsapp: data.whatsapp ? data.whatsapp.replace(/[^0-9]/g, '') : undefined,
    cep: data.cep ? data.cep.replace(/[^0-9-]/g, '') : undefined,
  };

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
      sanitizedData: sanitizedData as unknown as Record<string, unknown>,
    };
  }

  return {
    isValid: true,
    errors: [],
    sanitizedData: sanitizedData as unknown as Record<string, unknown>,
  };
}

/**
 * Rate limiting simples (armazenamento em memória)
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = identifier;

  const current = rateLimitStore.get(key) || { count: 0, resetTime: now + windowMs };

  // Reset se janela de tempo passou
  if (now > current.resetTime) {
    current.count = 0;
    current.resetTime = now + windowMs;
  }

  current.count++;
  rateLimitStore.set(key, current);

  const allowed = current.count <= maxRequests;
  const remaining = Math.max(0, maxRequests - current.count);

  return {
    allowed,
    remaining,
    resetTime: current.resetTime,
  };
}

/**
 * Validação de arquivo de imagem
 */
export function validateImageFile(file: File): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    errors.push('Tipo de arquivo não permitido. Use JPEG, PNG ou WebP.');
  }

  if (file.size > maxSize) {
    errors.push('Arquivo muito grande. Máximo 5MB.');
  }

  if (file.name.length > 255) {
    errors.push('Nome do arquivo muito longo.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
