import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { logger, measureAsyncPerformance, measurePerformance } from './logger';

// Mock do console
const consoleSpy = {
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
  warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
  debug: vi.spyOn(console, 'debug').mockImplementation(() => {}),
};

describe('logger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset para nível padrão
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('ENABLE_DEBUG', 'true');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('logger instance', () => {
    it('deve ter métodos de logging', () => {
      expect(typeof logger.info).toBe('function');
      expect(typeof logger.warn).toBe('function');
      expect(typeof logger.error).toBe('function');
      expect(typeof logger.debug).toBe('function');
    });

    it('deve ter métodos utilitários', () => {
      expect(typeof logger.fallback).toBe('function');
      expect(typeof logger.performance).toBe('function');
    });
  });

  describe('info', () => {
    it('deve logar mensagem info em desenvolvimento', () => {
      logger.info('Mensagem de informação');

      expect(consoleSpy.warn).toHaveBeenCalledWith(expect.stringContaining('[INFO]'), '');
    });

    it('deve logar com contexto', () => {
      logger.info('Mensagem com contexto', 'TEST_CONTEXT');

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        expect.stringContaining('[INFO]'),
        'TEST_CONTEXT'
      );
    });

    it('deve logar com dados', () => {
      const data = { test: 'data' };
      logger.info('Mensagem com dados', data);

      expect(consoleSpy.warn).toHaveBeenCalledWith(expect.stringContaining('[INFO]'), data);
    });
  });

  describe('warn', () => {
    it('deve ter método warn disponível', () => {
      expect(typeof logger.warn).toBe('function');
    });

    it('deve aceitar mensagem e contexto', () => {
      expect(() => logger.warn('Mensagem de aviso')).not.toThrow();
      expect(() => logger.warn('Mensagem de aviso', 'TEST_CONTEXT')).not.toThrow();
    });
  });

  describe('error', () => {
    it('deve ter método error disponível', () => {
      expect(typeof logger.error).toBe('function');
    });

    it('deve aceitar mensagem, erro e contexto', () => {
      expect(() => logger.error('Mensagem de erro')).not.toThrow();
      expect(() => logger.error('Mensagem de erro', new Error('Test'))).not.toThrow();
      expect(() => logger.error('Mensagem de erro', undefined, 'TEST_CONTEXT')).not.toThrow();
    });
  });

  describe('debug', () => {
    it('deve logar mensagem debug em desenvolvimento', () => {
      logger.debug('Mensagem de debug');

      expect(consoleSpy.warn).toHaveBeenCalledWith(expect.stringContaining('[DEBUG]'), '');
    });

    it('deve logar com dados', () => {
      const data = { debug: 'info' };
      logger.debug('Mensagem de debug', data);

      expect(consoleSpy.warn).toHaveBeenCalledWith(expect.stringContaining('[DEBUG]'), data);
    });
  });

  describe('fallback', () => {
    it('deve logar fallback', () => {
      logger.fallback('API', 'cache', 'Erro de rede');

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        expect.stringContaining('Fallback: API -> cache'),
        'FALLBACK'
      );
    });
  });

  describe('performance', () => {
    it('deve logar métrica de performance', () => {
      logger.performance('test-operation', 150, 'TEST');

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        expect.stringContaining('test-operation'),
        expect.objectContaining({
          duration: 150,
          operation: 'test-operation',
        })
      );
    });
  });

  describe('measurePerformance', () => {
    it('deve medir performance de função síncrona', () => {
      const fn = vi.fn(() => 'result');

      const result = measurePerformance('test-op', fn, 'TEST');

      expect(result).toBe('result');
      expect(fn).toHaveBeenCalled();
      expect(consoleSpy.warn).toHaveBeenCalledWith(
        expect.stringContaining('test-op'),
        expect.objectContaining({
          operation: 'test-op',
        })
      );
    });

    it('deve lidar com erro em função síncrona', () => {
      const fn = vi.fn(() => {
        throw new Error('Test error');
      });

      expect(() => measurePerformance('test-op', fn, 'TEST')).toThrow('Test error');
    });
  });

  describe('measureAsyncPerformance', () => {
    it('deve medir performance de função assíncrona', async () => {
      const fn = vi.fn(async () => 'async-result');

      const result = await measureAsyncPerformance('test-op', fn, 'TEST');

      expect(result).toBe('async-result');
      expect(fn).toHaveBeenCalled();
      expect(consoleSpy.warn).toHaveBeenCalledWith(
        expect.stringContaining('test-op'),
        expect.objectContaining({
          operation: 'test-op',
        })
      );
    });

    it('deve lidar com erro em função assíncrona', async () => {
      const fn = vi.fn(async () => {
        throw new Error('Async error');
      });

      await expect(measureAsyncPerformance('test-op', fn, 'TEST')).rejects.toThrow('Async error');
    });
  });

  describe('ambiente de produção', () => {
    beforeEach(() => {
      vi.stubEnv('NODE_ENV', 'production');
    });

    it('não deve logar info em produção', () => {
      logger.info('Teste');

      expect(consoleSpy.warn).not.toHaveBeenCalled();
    });

    it('não deve logar debug em produção', () => {
      logger.debug('Teste');

      expect(consoleSpy.warn).not.toHaveBeenCalled();
    });
  });

  describe('formatação de mensagem', () => {
    it('deve incluir timestamp', () => {
      logger.info('Teste');

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/),
        ''
      );
    });

    it('deve incluir nível em maiúsculo', () => {
      logger.info('Teste');

      expect(consoleSpy.warn).toHaveBeenCalledWith(expect.stringContaining('[INFO]'), '');
    });

    it('deve incluir contexto quando fornecido', () => {
      logger.info('Teste', undefined, 'CONTEXT');

      expect(consoleSpy.warn).toHaveBeenCalledWith(expect.stringContaining('[CONTEXT]'), '');
    });
  });
});
