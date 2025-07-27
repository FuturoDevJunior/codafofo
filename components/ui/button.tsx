import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' | 'success' | 'warning';
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    if (asChild) {
      return <>{props.children}</>;
    }

    const baseClasses =
      'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-ring touch-friendly disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed relative overflow-hidden group';

    const variants = {
      default:
        'bg-gradient-to-r from-vitale-primary to-vitale-secondary text-white shadow-vitale hover:from-vitale-secondary hover:to-vitale-primary hover:shadow-xl hover:scale-105 active:scale-95',
      outline:
        'border-2 border-vitale-primary text-vitale-primary bg-white hover:bg-vitale-primary hover:text-white shadow-sm hover:shadow-md',
      ghost: 'text-vitale-primary hover:bg-vitale-neutral/50 hover:text-vitale-secondary',
      destructive:
        'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg',
      secondary:
        'bg-neutral-100 text-neutral-700 border border-neutral-200 hover:bg-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md',
      success:
        'bg-gradient-to-r from-success-500 to-success-600 text-white shadow-md hover:from-success-600 hover:to-success-700 hover:shadow-lg',
      warning:
        'bg-gradient-to-r from-warning-500 to-warning-600 text-white shadow-md hover:from-warning-600 hover:to-warning-700 hover:shadow-lg',
    };

    const sizes = {
      default: 'h-11 px-6 py-3 text-sm min-w-[44px]',
      sm: 'h-9 px-4 py-2 text-xs min-w-[36px]',
      lg: 'h-12 px-8 py-3 text-base min-w-[48px]',
      xl: 'h-14 px-10 py-4 text-lg min-w-[56px]',
      icon: 'h-10 w-10 p-0 min-w-[40px]',
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {props.children}
        {/* Shimmer effect para feedback visual */}
        <div className='from-transparent via-white/20 to-transparent absolute inset-0 -left-4 w-6 skew-x-12 bg-gradient-to-r opacity-0 group-hover:animate-[shimmer_0.8s_ease-in-out] group-hover:opacity-100' />
      </button>
    );
  }
);

Button.displayName = 'Button';
