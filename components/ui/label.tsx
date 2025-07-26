import React from 'react';

import { cn } from '@/lib/utils';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'required' | 'optional';
  error?: boolean;
}

export function Label({
  className,
  size = 'md',
  variant = 'default',
  error = false,
  children,
  ...props
}: LabelProps) {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const variantClasses = {
    default: 'text-vitale-primary font-medium',
    required: 'text-vitale-primary font-semibold',
    optional: 'text-neutral-600 font-medium',
  };

  const errorClasses = error ? 'text-red-600' : '';

  const baseClasses = cn(
    'block mb-2 transition-colors duration-200',
    'focus-within:text-vitale-secondary',
    sizeClasses[size],
    variantClasses[variant],
    errorClasses,
    className
  );

  return (
    <label className={baseClasses} {...props}>
      {children}
      {variant === 'required' && (
        <span className="text-red-500 ml-1" aria-label="campo obrigatório">
          *
        </span>
      )}
      {variant === 'optional' && <span className="ml-1 text-xs text-neutral-400">(opcional)</span>}
    </label>
  );
}
