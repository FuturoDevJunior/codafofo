import React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'filled';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputSize = 'md',
      variant = 'default',
      leftIcon,
      rightIcon,
      error = false,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'h-8 px-2 text-sm',
      md: 'h-10 px-3 text-base',
      lg: 'h-12 px-4 text-lg',
    };

    const variantClasses = {
      default:
        'border-2 border-vitale-primary/30 bg-white focus:border-vitale-primary focus:ring-2 focus:ring-vitale-primary/20',
      outline:
        'border-2 border-neutral-300 bg-transparent focus:border-vitale-primary focus:ring-2 focus:ring-vitale-primary/20',
      filled:
        'border-2 border-transparent bg-vitale-neutral/50 focus:border-vitale-primary focus:ring-2 focus:ring-vitale-primary/20',
    };

    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '';

    const baseClasses = cn(
      'flex w-full items-center rounded-xl transition-all duration-200',
      'placeholder:text-neutral-400',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'focus:outline-none',
      sizeClasses[inputSize],
      variantClasses[variant],
      errorClasses,
      className
    );

    const iconClasses = cn(
      'absolute top-1/2 -translate-y-1/2',
      inputSize === 'sm' ? 'h-4 w-4' : inputSize === 'lg' ? 'h-6 w-6' : 'h-5 w-5'
    );

    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className={cn(iconClasses, 'left-3 text-vitale-primary')}>{leftIcon}</div>
        )}
        <input
          ref={ref}
          className={cn(baseClasses, leftIcon && 'pl-10', rightIcon && 'pr-10')}
          {...props}
        />
        {rightIcon && (
          <div className={cn(iconClasses, 'right-3 text-vitale-primary')}>{rightIcon}</div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
