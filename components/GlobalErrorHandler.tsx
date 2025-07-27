'use client';

import React, { useEffect } from 'react';
import { ErrorHandler } from '@/lib/errorHandling';

/**
 * SISTEMA DE CAPTURA GLOBAL DE ERROS
 * ===================================
 * 
 * Captura erros não tratados e promessas rejeitadas
 * para monitoramento e debugging completo
 */

interface GlobalErrorHandlerProps {
  children: React.ReactNode;
}

export function GlobalErrorHandler({ children }: GlobalErrorHandlerProps) {
  useEffect(() => {
    const errorHandler = ErrorHandler.getInstance();

    // Capturar erros JavaScript não tratados
    const handleUnhandledError = (event: ErrorEvent) => {
      const appError = errorHandler.createError(event.error, 'Unhandled JavaScript Error');
      
      console.error('Erro JavaScript não tratado:', appError);

      // Reportar erro para API
      fetch('/api/error-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'unhandled_error',
          error: event.message,
          stack: event.error?.stack,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          severity: 'high',
        }),
      }).catch(reportError => {
        console.error('Falha ao reportar erro:', reportError);
      });
    };

    // Capturar promessas rejeitadas não tratadas
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const appError = errorHandler.createError(event.reason, 'Unhandled Promise Rejection');
      
      console.error('Promise rejeitada não tratada:', appError);

      // Reportar erro para API
      fetch('/api/error-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'unhandled_rejection',
          error: event.reason?.message || String(event.reason),
          stack: event.reason?.stack,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          severity: 'high',
        }),
      }).catch(reportError => {
        console.error('Falha ao reportar promise rejection:', reportError);
      });

      // Prevenir que o erro apareça no console (opcional)
      event.preventDefault();
    };

    // Registrar event listeners
    window.addEventListener('error', handleUnhandledError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup ao desmontar
    return () => {
      window.removeEventListener('error', handleUnhandledError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return <>{children}</>;
}

export default GlobalErrorHandler;