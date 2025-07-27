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
      sm: 'h-9 px-3 text-sm min-h-[36px]',
      md: 'h-11 px-4 text-base min-h-[44px]',
      lg: 'h-12 px-5 text-lg min-h-[48px]',
    };

    const variantClasses = {
      default:
        'border-2 border-neutral-200 bg-white focus:border-vitale-primary focus:ring-2 focus:ring-vitale-primary/20 shadow-sm focus:shadow-md hover:border-neutral-300',
      outline:
        'border-2 border-neutral-300 bg-transparent focus:border-vitale-primary focus:ring-2 focus:ring-vitale-primary/20 hover:border-neutral-400',
      filled:
        'border-2 border-transparent bg-neutral-50 focus:border-vitale-primary focus:ring-2 focus:ring-vitale-primary/20 focus:bg-white hover:bg-neutral-100',
    };

    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50' : '';

    const baseClasses = cn(
      'flex w-full items-center rounded-lg transition-all duration-200 font-medium',
      'placeholder:text-neutral-500 placeholder:font-normal',
      'text-neutral-800 focus:text-neutral-900',
      'disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-neutral-100',
      'focus:outline-none touch-friendly',
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
