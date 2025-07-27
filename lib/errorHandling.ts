/**
 * SISTEMA DE TRATAMENTO DE ERROS ROBUSTO - VYTALLE ESTÉTICA
 * ========================================================
 *
 * Sistema centralizado para tratar diferentes tipos de erros
 * com fallbacks e recovery automático
 */

import { logger } from './logger';

/* eslint-disable no-unused-vars */
export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTH = 'AUTH',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  UNKNOWN = 'UNKNOWN',
}
/* eslint-enable no-unused-vars */

export interface AppError {
  type: ErrorType;
  message: string;
  code?: string;
  details?: any;
  timestamp: Date;
  retryable: boolean;
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  private retryAttempts = new Map<string, number>();
  private maxRetries = 3;
  private baseRetryDelay = 1000; // 1 segundo

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  // Classificar tipo de erro
  classifyError(error: any): ErrorType {
    if (!error) return ErrorType.UNKNOWN;

    // Erros de rede
    if (
      error.name === 'NetworkError' ||
      error.message?.includes('fetch') ||
      error.code === 'NETWORK_ERROR'
    ) {
      return ErrorType.NETWORK;
    }

    // Erros de autenticação
    if (error.status === 401 || error.status === 403) {
      return ErrorType.AUTH;
    }

    // Erros de não encontrado
    if (error.status === 404) {
      return ErrorType.NOT_FOUND;
    }

    // Erros de servidor
    if (error.status >= 500) {
      return ErrorType.SERVER;
    }

    // Erros de cliente
    if (error.status >= 400) {
      return ErrorType.CLIENT;
    }

    return ErrorType.UNKNOWN;
  }

  // Criar AppError padronizado
  createError(error: any, context?: string): AppError {
    const type = this.classifyError(error);

    return {
      type,
      message: this.getErrorMessage(error, type),
      code: error.code || error.status?.toString(),
      details: {
        originalError: error.message || error,
        context,
        stack: error.stack,
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        timestamp: new Date().toISOString(),
        severity: this.getSeverity(type),
      },
      timestamp: new Date(),
      retryable: this.isRetryable(type),
    };
  }

  // Determinar severidade do erro
  private getSeverity(type: ErrorType): string {
    switch (type) {
      case ErrorType.SERVER:
      case ErrorType.AUTH:
        return 'high';
      case ErrorType.NETWORK:
      case ErrorType.NOT_FOUND:
        return 'medium';
      case ErrorType.VALIDATION:
      case ErrorType.CLIENT:
        return 'low';
      default:
        return 'unknown';
    }
  }

  // Obter mensagem amigável para o usuário
  private getErrorMessage(error: any, type: ErrorType): string {
    switch (type) {
      case ErrorType.NETWORK:
        return 'Problema de conexão. Verifique sua internet e tente novamente.';
      case ErrorType.AUTH:
        return 'Acesso não autorizado. Faça login novamente.';
      case ErrorType.NOT_FOUND:
        return 'Recurso não encontrado.';
      case ErrorType.SERVER:
        return 'Erro interno do servidor. Tente novamente em alguns minutos.';
      case ErrorType.CLIENT:
        return 'Dados inválidos. Verifique as informações e tente novamente.';
      case ErrorType.VALIDATION:
        return error.message || 'Dados inválidos.';
      default:
        return 'Erro inesperado. Tente novamente.';
    }
  }

  // Verificar se erro é retentável
  private isRetryable(type: ErrorType): boolean {
    return [ErrorType.NETWORK, ErrorType.SERVER].includes(type);
  }

  // Executar operação com retry automático
  async withRetry<T>(
    operation: () => Promise<T>,
    operationId: string,
    context?: string
  ): Promise<T> {
    const attempts = this.retryAttempts.get(operationId) || 0;

    try {
      const result = await operation();
      // Reset contador de tentativas em caso de sucesso
      this.retryAttempts.delete(operationId);
      return result;
    } catch (error) {
      const appError = this.createError(error, context);

      logger.error(`Operation failed: ${operationId}`, error as Error, context);

      // Se não é retentável ou excedeu tentativas, lançar erro
      if (!appError.retryable || attempts >= this.maxRetries) {
        this.retryAttempts.delete(operationId);
        throw appError;
      }

      // Incrementar contador e tentar novamente
      this.retryAttempts.set(operationId, attempts + 1);
      const delay = this.baseRetryDelay * Math.pow(2, attempts); // Backoff exponencial

      logger.warn(
        `Retrying operation ${operationId} in ${delay}ms (attempt ${attempts + 1}/${this.maxRetries})`,
        context
      );

      await new Promise(resolve => setTimeout(resolve, delay));
      return this.withRetry(operation, operationId, context);
    }
  }

  // Handler para erros de API
  async handleApiCall<T>(
    apiCall: () => Promise<T>,
    fallback?: () => T,
    context?: string
  ): Promise<T> {
    try {
      return await this.withRetry(apiCall, `api-${context || 'unknown'}`, context);
    } catch (error) {
      logger.error(`API call failed: ${context}`, error as Error);

      if (fallback) {
        logger.fallback('API', 'fallback function', 'API call failed');
        return fallback();
      }

      throw error;
    }
  }

  // Validar dados de entrada
  validateInput(data: any, schema: any, context?: string): void {
    // Implementar validação básica
    if (!data) {
      throw this.createError(
        {
          type: ErrorType.VALIDATION,
          message: 'Dados são obrigatórios',
        },
        context
      );
    }

    // Aqui você poderia integrar com uma biblioteca de validação como Yup ou Zod
  }

  // Handler para formulários
  handleFormError(error: any, fieldName?: string): string {
    const appError = this.createError(error, `form-${fieldName}`);

    if (appError.type === ErrorType.VALIDATION) {
      return appError.message;
    }

    return 'Erro ao processar formulário. Tente novamente.';
  }

  // Limpar cache de tentativas
  clearRetryCache(): void {
    this.retryAttempts.clear();
  }
}

// Instância singleton
export const errorHandler = ErrorHandler.getInstance();

// Utility functions
export function safeAsync<T>(promise: Promise<T>, defaultValue: T, context?: string): Promise<T> {
  return promise.catch(error => {
    logger.error(`Safe async operation failed: ${context}`, error, context);
    return defaultValue;
  });
}

export function safeFn<T>(fn: () => T, defaultValue: T, context?: string): T {
  try {
    return fn();
  } catch (error) {
    logger.error(`Safe function execution failed: ${context}`, error as Error, context);
    return defaultValue;
  }
}

// Hook para componentes React
export function useErrorHandling() {
  const handleError = (error: any, context?: string) => {
    const appError = errorHandler.createError(error, context);
    logger.error(appError.message, error, context);
    return appError;
  };

  const handleAsyncError = async <T>(
    operation: () => Promise<T>,
    fallback?: T,
    context?: string
  ): Promise<T | undefined> => {
    try {
      return await operation();
    } catch (error) {
      handleError(error, context);
      return fallback;
    }
  };

  return {
    handleError,
    handleAsyncError,
    createError: (error: any, context?: string) => errorHandler.createError(error, context),
  };
}

export default errorHandler;
