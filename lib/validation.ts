/**
 * SISTEMA DE VALIDAÇÃO RIGOROSA - SEGURANÇA MÁXIMA
 * ================================================
 * 
 * Validação e sanitização de todos os inputs do sistema
 */

import DOMPurify from 'isomorphic-dompurify';

// Interfaces de validação
export interface ProductFormData {
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  discount_percent: number;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface ContactFormData {
  name: string;
  whatsapp: string;
  cep: string;
}

// Regexes de segurança
const SECURITY_PATTERNS = {
  // XSS Prevention
  xss: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  
  // SQL Injection Prevention  
  sqlInjection: /(union|select|insert|update|delete|drop|create|alter|exec|execute|\-\-|\/\*|\*\/)/gi,
  
  // Safe strings apenas
  safeString: /^[a-zA-Z0-9\s\-_.àáâãéêíóôõúüçÀÁÂÃÉÊÍÓÔÕÚÜÇ]+$/,
  
  // URLs válidas
  validUrl: /^https?:\/\/([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
  
  // CEP brasileiro
  cep: /^\d{5}-?\d{3}$/,
  
  // WhatsApp brasileiro
  whatsapp: /^55\d{2}9?\d{8}$/,
  
  // Preços válidos
  price: /^\d+(\.\d{1,2})?$/
};

/**
 * Sanitiza strings removendo elementos perigosos
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  // Remove tags HTML/Script
  let sanitized = DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [] 
  });
  
  // Remove caracteres perigosos
  sanitized = sanitized.replace(SECURITY_PATTERNS.xss, '');
  sanitized = sanitized.replace(SECURITY_PATTERNS.sqlInjection, '');
  
  // Limita tamanho
  return sanitized.substring(0, 1000);
}

/**
 * Valida dados de produto com segurança máxima
 */
export function validateProductData(data: any): { 
  isValid: boolean; 
  errors: string[]; 
  sanitizedData?: ProductFormData 
} {
  const errors: string[] = [];
  
  // Validação de nome
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Nome é obrigatório');
  } else if (data.name.length > 200) {
    errors.push('Nome muito longo (máx 200 caracteres)');
  }
  
  // Validação de preço
  const price = parseFloat(data.price);
  if (isNaN(price) || price <= 0 || price > 999999) {
    errors.push('Preço deve ser um número positivo válido');
  }
  
  // Validação de descrição
  if (!data.description || typeof data.description !== 'string') {
    errors.push('Descrição é obrigatória');
  } else if (data.description.length > 2000) {
    errors.push('Descrição muito longa (máx 2000 caracteres)');
  }
  
  // Validação de categoria
  const allowedCategories = [
    'Toxina Botulínica',
    'Bioestimulador', 
    'Preenchedor',
    'Fio Bioestimulação',
    'Microcânula',
    'Enzima'
  ];
  
  if (!allowedCategories.includes(data.category)) {
    errors.push('Categoria inválida');
  }
  
  
  // Validação de desconto
  const discount = parseFloat(data.discount_percent || 0);
  if (isNaN(discount) || discount < 0 || discount > 100) {
    errors.push('Desconto deve estar entre 0 e 100%');
  }
  
  // Validação de imagens
  let images: string[] = [];
  if (Array.isArray(data.images)) {
    images = data.images
      .filter((url: string) => typeof url === 'string' && SECURITY_PATTERNS.validUrl.test(url))
      .slice(0, 10); // Máximo 10 imagens
  }
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  return {
    isValid: true,
    errors: [],
    sanitizedData: {
      name: sanitizeString(data.name),
      price: price,
      description: sanitizeString(data.description),
      images: images,
      category: data.category,
      discount_percent: discount
    }
  };
}

/**
 * Valida credenciais administrativas
 */
export function validateAdminCredentials(data: any): {
  isValid: boolean;
  errors: string[];
  sanitizedData?: AdminCredentials;
} {
  const errors: string[] = [];
  
  if (!data.username || typeof data.username !== 'string' || data.username.length < 3) {
    errors.push('Username deve ter pelo menos 3 caracteres');
  }
  
  if (!data.password || typeof data.password !== 'string' || data.password.length < 6) {
    errors.push('Senha deve ter pelo menos 6 caracteres');
  }
  
  // Verificar padrões perigosos
  if (SECURITY_PATTERNS.sqlInjection.test(data.username) || 
      SECURITY_PATTERNS.sqlInjection.test(data.password)) {
    errors.push('Caracteres inválidos detectados');
  }
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  return {
    isValid: true,
    errors: [],
    sanitizedData: {
      username: sanitizeString(data.username),
      password: data.password // Senha não é sanitizada, será hasheada
    }
  };
}

/**
 * Valida dados de contato
 */
export function validateContactForm(data: any): {
  isValid: boolean;
  errors: string[];
  sanitizedData?: ContactFormData;
} {
  const errors: string[] = [];
  
  // Validação de nome
  if (!data.name || typeof data.name !== 'string' || data.name.length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  } else if (!SECURITY_PATTERNS.safeString.test(data.name)) {
    errors.push('Nome contém caracteres inválidos');
  }
  
  // Validação de WhatsApp
  const cleanWhatsapp = data.whatsapp?.replace(/[^0-9]/g, '') || '';
  if (!SECURITY_PATTERNS.whatsapp.test(cleanWhatsapp)) {
    errors.push('WhatsApp deve estar no formato brasileiro válido');
  }
  
  // Validação de CEP
  const cleanCep = data.cep?.replace(/[^0-9-]/g, '') || '';
  if (!SECURITY_PATTERNS.cep.test(cleanCep)) {
    errors.push('CEP deve estar no formato brasileiro válido');
  }
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  return {
    isValid: true,
    errors: [],
    sanitizedData: {
      name: sanitizeString(data.name),
      whatsapp: cleanWhatsapp,
      cep: cleanCep
    }
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
    resetTime: current.resetTime
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
    errors
  };
}