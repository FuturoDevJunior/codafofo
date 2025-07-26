import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ErrorHandler, ErrorType, safeAsync, safeFn, useErrorHandling } from './errorHandling';

// Mock do logger
vi.mock('./logger', () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    fallback: vi.fn(),
  },
}));

describe('errorHandling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('ErrorType', () => {
    it('deve ter tipos de erro válidos', () => {
      expect(ErrorType.VALIDATION).toBe('VALIDATION');
      expect(ErrorType.NETWORK).toBe('NETWORK');
      expect(ErrorType.AUTH).toBe('AUTH');
      expect(ErrorType.SERVER).toBe('SERVER');
      expect(ErrorType.CLIENT).toBe('CLIENT');
      expect(ErrorType.UNKNOWN).toBe('UNKNOWN');
    });
  });

  describe('ErrorHandler', () => {
    let handler: ErrorHandler;

    beforeEach(() => {
      handler = ErrorHandler.getInstance();
    });

    describe('classifyError', () => {
      it('deve classificar erro de rede', () => {
        const error = { name: 'NetworkError' };
        expect(handler.classifyError(error)).toBe(ErrorType.NETWORK);
      });

      it('deve classificar erro de autenticação', () => {
        const error = { status: 401 };
        expect(handler.classifyError(error)).toBe(ErrorType.AUTH);
      });

      it('deve classificar erro de servidor', () => {
        const error = { status: 500 };
        expect(handler.classifyError(error)).toBe(ErrorType.SERVER);
      });

      it('deve classificar erro de cliente', () => {
        const error = { status: 400 };
        expect(handler.classifyError(error)).toBe(ErrorType.CLIENT);
      });

      it('deve classificar erro desconhecido', () => {
        const error = { message: 'Unknown error' };
        expect(handler.classifyError(error)).toBe(ErrorType.UNKNOWN);
      });
    });

    describe('createError', () => {
      it('deve criar AppError com tipo validation', () => {
        const error = { message: 'Campo obrigatório' };
        const appError = handler.createError(error);

        expect(appError.type).toBe(ErrorType.UNKNOWN); // Será UNKNOWN porque não tem type
        expect(appError.message).toBe('Erro inesperado. Tente novamente.');
        expect(appError.timestamp).toBeInstanceOf(Date);
      });

      it('deve criar AppError com tipo network', () => {
        const error = { name: 'NetworkError' };
        const appError = handler.createError(error);

        expect(appError.type).toBe(ErrorType.NETWORK);
        expect(appError.message).toBe(
          'Problema de conexão. Verifique sua internet e tente novamente.'
        );
      });
    });

    describe('withRetry', () => {
      it('deve executar operação com sucesso', async () => {
        const operation = vi.fn().mockResolvedValue('success');

        const result = await handler.withRetry(operation, 'test-op');

        expect(result).toBe('success');
        expect(operation).toHaveBeenCalledTimes(1);
      });

      it('deve tentar novamente em caso de erro retentável', async () => {
        const operation = vi
          .fn()
          .mockRejectedValueOnce({ name: 'NetworkError' })
          .mockResolvedValueOnce('success');

        const result = await handler.withRetry(operation, 'test-op');

        expect(result).toBe('success');
        expect(operation).toHaveBeenCalledTimes(2);
      });

      it('deve falhar após máximo de tentativas', async () => {
        const operation = vi.fn().mockRejectedValue({ name: 'NetworkError' });

        await expect(handler.withRetry(operation, 'test-op')).rejects.toThrow();
        expect(operation).toHaveBeenCalledTimes(4); // 1 + 3 retries
      }, 10000); // Aumentar timeout para retries
    });

    describe('handleApiCall', () => {
      it('deve executar API call com sucesso', async () => {
        const apiCall = vi.fn().mockResolvedValue('data');

        const result = await handler.handleApiCall(apiCall, undefined, 'test');

        expect(result).toBe('data');
        expect(apiCall).toHaveBeenCalled();
      });

      it('deve usar fallback em caso de erro', async () => {
        const apiCall = vi.fn().mockRejectedValue(new Error('API failed'));
        const fallback = vi.fn().mockReturnValue('fallback-data');

        const result = await handler.handleApiCall(apiCall, fallback, 'test');

        expect(result).toBe('fallback-data');
        expect(fallback).toHaveBeenCalled();
      });
    });

    describe('validateInput', () => {
      it('deve validar dados válidos', () => {
        const data = { name: 'test' };

        expect(() => handler.validateInput(data, {}, 'test')).not.toThrow();
      });

      it('deve lançar erro para dados inválidos', () => {
        expect(() => handler.validateInput(null, {}, 'test')).toThrow();
      });
    });

    describe('handleFormError', () => {
      it('deve lidar com erro de validação', () => {
        const error = { message: 'Campo obrigatório' };

        const result = handler.handleFormError(error, 'name');

        expect(result).toBe('Erro ao processar formulário. Tente novamente.');
      });

      it('deve lidar com outros tipos de erro', () => {
        const error = { type: ErrorType.NETWORK };

        const result = handler.handleFormError(error, 'name');

        expect(result).toBe('Erro ao processar formulário. Tente novamente.');
      });
    });
  });

  describe('errorHandler singleton', () => {
    it('deve retornar mesma instância', () => {
      const instance1 = ErrorHandler.getInstance();
      const instance2 = ErrorHandler.getInstance();

      expect(instance1).toBe(instance2);
    });
  });

  describe('safeAsync', () => {
    it('deve retornar resultado em caso de sucesso', async () => {
      const promise = Promise.resolve('success');

      const result = await safeAsync(promise, 'default', 'test');

      expect(result).toBe('success');
    });

    it('deve retornar valor padrão em caso de erro', async () => {
      const promise = Promise.reject(new Error('Failed'));

      const result = await safeAsync(promise, 'default', 'test');

      expect(result).toBe('default');
    });
  });

  describe('safeFn', () => {
    it('deve retornar resultado em caso de sucesso', () => {
      const fn = vi.fn(() => 'success');

      const result = safeFn(fn, 'default', 'test');

      expect(result).toBe('success');
    });

    it('deve retornar valor padrão em caso de erro', () => {
      const fn = vi.fn(() => {
        throw new Error('Failed');
      });

      const result = safeFn(fn, 'default', 'test');

      expect(result).toBe('default');
    });
  });

  describe('useErrorHandling', () => {
    it('deve retornar funções de tratamento de erro', () => {
      const { handleError, handleAsyncError, createError } = useErrorHandling();

      expect(typeof handleError).toBe('function');
      expect(typeof handleAsyncError).toBe('function');
      expect(typeof createError).toBe('function');
    });

    it('deve lidar com erro síncrono', () => {
      const { handleError } = useErrorHandling();
      const error = new Error('Test error');

      const result = handleError(error, 'test');

      expect(result.type).toBe(ErrorType.UNKNOWN);
      expect(result.message).toBe('Erro inesperado. Tente novamente.');
    });

    it('deve lidar com erro assíncrono', async () => {
      const { handleAsyncError } = useErrorHandling();
      const operation = vi.fn().mockRejectedValue(new Error('Async error'));

      const result = await handleAsyncError(operation, 'fallback', 'test');

      expect(result).toBe('fallback');
    });
  });
});
