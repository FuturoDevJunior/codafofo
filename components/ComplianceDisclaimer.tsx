'use client';

import { AlertTriangle, Shield, UserCheck } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

interface ComplianceDisclaimerProps {
  variant?: 'banner' | 'card' | 'inline';
  className?: string;
}

export default function ComplianceDisclaimer({
  variant = 'banner',
  className = '',
}: ComplianceDisclaimerProps) {
  const variants = {
    banner: (
      <div
        className={`from-amber-50 to-orange-50 border-amber-200 rounded-xl border bg-gradient-to-r p-4 ${className}`}
      >
        <div className='flex items-start gap-3'>
          <Shield className='text-amber-600 mt-0.5 h-5 w-5 flex-shrink-0' />
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Badge variant='secondary' className='bg-amber-100 text-amber-800 border-amber-200'>
                <AlertTriangle className='mr-1 h-3 w-3' />
                Venda Restrita
              </Badge>
              <Badge variant='secondary' className='bg-green-100 text-green-800 border-green-200'>
                <Shield className='mr-1 h-3 w-3' />
                ANVISA Certificado
              </Badge>
            </div>
            <p className='text-amber-800 text-sm leading-relaxed'>
              <strong>Produtos de uso restrito:</strong> Venda exclusiva para profissionais de saúde
              licenciados (médicos, dentistas, farmacêuticos). Documentação profissional
              obrigatória. Produtos certificados ANVISA com registro ativo.
            </p>
            <div className='text-amber-700 flex items-center gap-4 text-xs'>
              <span className='flex items-center gap-1'>
                <UserCheck className='h-3 w-3' />
                Profissionais licenciados
              </span>
              <span className='flex items-center gap-1'>
                <Shield className='h-3 w-3' />
                Certificação ANVISA
              </span>
            </div>
          </div>
        </div>
      </div>
    ),

    card: (
      <div className={`bg-white border-amber-200 rounded-lg border-2 p-3 ${className}`}>
        <div className='flex items-start gap-2'>
          <AlertTriangle className='text-amber-600 mt-0.5 h-4 w-4 flex-shrink-0' />
          <div className='space-y-1'>
            <p className='text-amber-800 text-xs font-medium'>
              Venda restrita a profissionais licenciados
            </p>
            <p className='text-amber-700 text-xs'>
              Produtos certificados ANVISA. Documentação obrigatória.
            </p>
          </div>
        </div>
      </div>
    ),

    inline: (
      <span className={`text-amber-700 inline-flex items-center gap-1 text-xs ${className}`}>
        <AlertTriangle className='h-3 w-3' />
        Venda restrita - ANVISA certificado
      </span>
    ),
  };

  return variants[variant];
}
