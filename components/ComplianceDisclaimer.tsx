'use client';

import {
  AlertTriangle,
  Shield,
  UserCheck,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

interface ComplianceDisclaimerProps {
  variant?: 'banner' | 'card' | 'inline';
  className?: string;
}

export default function ComplianceDisclaimer({ 
  variant = 'banner', 
  className = '' 
}: ComplianceDisclaimerProps) {
  const variants = {
    banner: (
      <div className={`bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Venda Restrita
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                <Shield className="h-3 w-3 mr-1" />
                ANVISA Certificado
              </Badge>
            </div>
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Produtos de uso restrito:</strong> Venda exclusiva para profissionais de saúde licenciados 
              (médicos, dentistas, farmacêuticos). Documentação profissional obrigatória. 
              Produtos certificados ANVISA com registro ativo.
            </p>
            <div className="flex items-center gap-4 text-xs text-amber-700">
              <span className="flex items-center gap-1">
                <UserCheck className="h-3 w-3" />
                Profissionais licenciados
              </span>
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Certificação ANVISA
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    
    card: (
      <div className={`bg-white border-2 border-amber-200 rounded-lg p-3 ${className}`}>
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="text-xs font-medium text-amber-800">
              Venda restrita a profissionais licenciados
            </p>
            <p className="text-xs text-amber-700">
              Produtos certificados ANVISA. Documentação obrigatória.
            </p>
          </div>
        </div>
      </div>
    ),
    
    inline: (
      <span className={`inline-flex items-center gap-1 text-xs text-amber-700 ${className}`}>
        <AlertTriangle className="h-3 w-3" />
        Venda restrita - ANVISA certificado
      </span>
    )
  };

  return variants[variant];
} 