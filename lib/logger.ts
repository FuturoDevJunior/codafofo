/**
 * SISTEMA DE LOGGING PROFISSIONAL - VYTALLE ESTÉTICA
 * =================================================
 *
 * Sistema de logging que funciona apenas em development
 * e não expõe logs em produção
 */

import type { LogLevel } from '@/types';

interface LogConfig {
  isDevelopment: boolean;
  enableConsole: boolean;
  enableDebug: boolean;
}

class Logger {
  private config: LogConfig;

  constructor() {
    this.config = {
      isDevelopment: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test',
      enableConsole: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test',
      enableDebug: process.env.ENABLE_DEBUG === 'true' || process.env.NODE_ENV === 'test',
    };
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.config.enableConsole) return false;
    if (level === 'debug' && !this.config.enableDebug) return false;
    return this.config.isDevelopment;
  }

  private formatMessage(level: LogLevel, message: string, context?: string): string {
    const timestamp = new Date().toISOString();
    const prefix = context ? `[${context}]` : '';
    return `${timestamp} [${level.toUpperCase()}] ${prefix} ${message}`;
  }

  info(message: string, data?: unknown, context?: string): void {
    const logMessage = this.formatMessage('info' as LogLevel, message, context);
    if (this.config.isDevelopment) {
      console.warn(logMessage, data || '');
    }
    // Em produção, enviar para serviço de logging
  }

  warn(message: string, context?: string): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, context));
    }
  }

  error(message: string, error?: Error, context?: string): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message, context));
      if (error) {
        console.error('Error details:', error);
      }
    }
  }

  debug(message: string, data?: unknown, context?: string): void {
    if (this.config.isDevelopment) {
      const logMessage = this.formatMessage('debug' as LogLevel, message, context);
      console.warn(logMessage, data || '');
    }
  }

  // Método para logging de fallbacks
  fallback(source: string, fallbackTo: string, reason?: string): void {
    const message = `Fallback: ${source} -> ${fallbackTo}${reason ? ` (${reason})` : ''}`;
    this.info(message, 'FALLBACK');
  }

  // Método para logging de performance
  performance(operation: string, duration: number, context?: string): void {
    const message = `Operation "${operation}" took ${duration}ms`;
    this.debug(message, { operation, duration }, context || 'PERFORMANCE');
  }
}

// Singleton instance
export const logger = new Logger();

// Exportar a classe para testes
export { Logger };

// Utility para medir performance
export function measurePerformance<T>(operation: string, fn: () => T, context?: string): T {
  const start = Date.now();
  try {
    const result = fn();
    const duration = Date.now() - start;
    logger.performance(operation, duration, context);
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    logger.error(`Operation "${operation}" failed after ${duration}ms`, error as Error, context);
    throw error;
  }
}

// Utility para async operations
export async function measureAsyncPerformance<T>(
  operation: string,
  fn: () => Promise<T>,
  context?: string
): Promise<T> {
  const start = Date.now();
  try {
    const result = await fn();
    const duration = Date.now() - start;
    logger.performance(operation, duration, context);
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    logger.error(
      `Async operation "${operation}" failed after ${duration}ms`,
      error as Error,
      context
    );
    throw error;
  }
}

export default logger;
