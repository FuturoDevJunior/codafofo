'use client';

import React, { Component, ReactNode, useRef, useState } from 'react';

import { AlertTriangle, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  resetKeys?: any[];
  title?: string;
  message?: string;
  onError?: (_error: Error, _errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: any;
  reporting: boolean;
  reported: boolean;
  reportError: string | null;
}

function areEqual(a?: any[], b?: any[]): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
    reporting: false,
    reported: false,
    reportError: null,
  };

  static getDerivedStateFromError(error: any): State {
    return { hasError: true, error, reporting: false, reported: false, reportError: null };
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.resetKeys &&
      prevProps.resetKeys &&
      !areEqual(this.props.resetKeys, prevProps.resetKeys)
    ) {
      this.setState({
        hasError: false,
        error: undefined,
        reporting: false,
        reported: false,
        reportError: null,
      });
    }
  }

  public componentDidCatch(error: any, errorInfo: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    if (process.env.NODE_ENV === 'production') {
      // Sentry.captureException(error, { extra: errorInfo });
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: undefined,
      reporting: false,
      reported: false,
      reportError: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReport = async () => {
    this.setState({ reporting: true, reportError: null });
    try {
      const { error } = this.state;
      const payload = {
        error: error instanceof Error ? error.toString() : String(error),
        stack: error?.stack || '',
        url: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
        timestamp: new Date().toISOString(),
        component: 'ErrorBoundary',
        severity: 'high',
        context: {
          props: this.props,
          state: this.state,
        },
      };

      const res = await fetch('/api/error-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Falha ao reportar erro: ${res.status} - ${errorText}`);
      }

      if (typeof window !== 'undefined') {
        this.setState({ reporting: false, reported: true, reportError: null });
      }
    } catch (reportingError) {
      console.error('Erro ao reportar erro:', reportingError);
      if (typeof window !== 'undefined') {
        this.setState({
          reporting: false,
          reportError:
            reportingError instanceof Error ? reportingError.message : 'Falha ao reportar erro',
        });
      }
    }
  };

  renderErrorUI() {
    const { title, message } = this.props;
    const { error, reporting, reported, reportError } = this.state;
    const displayTitle = title || 'Ops! Algo deu errado';
    const displayMessage =
      message ||
      'Encontramos um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver.';
    return (
      <ErrorDetailsUI
        displayTitle={displayTitle}
        displayMessage={displayMessage}
        error={error}
        reporting={reporting}
        reported={reported}
        reportError={reportError}
        onReset={this.handleReset}
        onReload={this.handleReload}
        onGoHome={this.handleGoHome}
        onReport={this.handleReport}
      />
    );
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return this.renderErrorUI();
    }
    return this.props.children;
  }
}

function ErrorDetailsUI({
  displayTitle,
  displayMessage,
  error,
  reporting,
  reported,
  reportError,
  onReset,
  onReload,
  onGoHome,
  onReport,
}: {
  displayTitle: string;
  displayMessage: string;
  error: any;
  reporting: boolean;
  reported: boolean;
  reportError: string | null;
  onReset: () => void;
  onReload: () => void;
  onGoHome: () => void;
  onReport: () => void;
}) {
  // Workaround para ambiente de teste: controlar open manualmente
  const [open, setOpen] = useState(true);
  const summaryRef = useRef<HTMLElement>(null);
  // Em ambiente de teste, simular o toggle manualmente
  // const isTest = typeof process !== 'undefined' && process.env && process.env.VITEST;
  const handleSummaryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(o => !o);
  };
  return (
    <div
      role="alert"
      tabIndex={-1}
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-vitale-neutral via-neutral-50 to-vitale-light p-4"
    >
      <div className="bg-white w-full max-w-md rounded-2xl border border-neutral-200 p-8 text-center shadow-lg">
        <div className="mb-4 flex justify-center">
          <div className="bg-red-100 flex h-16 w-16 items-center justify-center rounded-full">
            <AlertTriangle className="text-red-600 h-8 w-8" />
          </div>
        </div>
        <h2 className="mb-2 text-xl font-bold text-neutral-800">{displayTitle}</h2>
        <p className="mb-6 text-neutral-600">{displayMessage}</p>
        <div className="space-y-3">
          <Button
            onClick={onReset}
            className="text-white w-full bg-vitale-primary hover:bg-vitale-secondary"
            aria-label="Tentar Novamente"
          >
            Tentar Novamente
          </Button>
          <Button
            onClick={onReload}
            className="text-white w-full bg-vitale-primary hover:bg-vitale-secondary"
            aria-label="Recarregar Página"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Recarregar Página
          </Button>
          <Button
            onClick={onGoHome}
            variant="outline"
            className="hover:text-white w-full border-vitale-primary text-vitale-primary hover:bg-vitale-primary"
            aria-label="Voltar ao Início"
          >
            Voltar ao Início
          </Button>
          <Button
            onClick={onReport}
            className="bg-yellow-600 hover:bg-yellow-700 text-white w-full"
            aria-label="Reportar Erro"
            disabled={reporting || reported}
          >
            {reporting ? 'Enviando...' : reported ? 'Erro reportado com sucesso!' : 'Reportar Erro'}
          </Button>
          {reportError && <div className="text-red-600 text-sm">{reportError}</div>}
        </div>
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mt-6 text-left" open={open}>
            <summary
              className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-700"
              ref={summaryRef}
              onClick={handleSummaryClick}
            >
              Detalhes do Erro
            </summary>
            {open && (
              <pre className="mt-2 max-h-40 overflow-auto rounded bg-neutral-100 p-3 text-xs">
                {error?.stack || String(error)}
              </pre>
            )}
          </details>
        )}
      </div>
    </div>
  );
}

export default ErrorBoundary;
