'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  href?: string;
  label: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav
      className={`flex ${className}`}
      aria-label='Navegação breadcrumb'
      data-testid='breadcrumbs'
      role='navigation'
    >
      <ol className='inline-flex items-center space-x-1 md:space-x-3'>
        {/* Home link */}
        <li className='inline-flex items-center'>
          <Link
            href='/'
            className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-vitale-primary focus-ring rounded-md px-2 py-1'
            aria-label='Ir para página inicial'
          >
            <Home className='w-4 h-4 mr-2' />
            Início
          </Link>
        </li>

        {/* Breadcrumb items */}
        {items.map((item, index) => (
          <li key={index}>
            <div className='flex items-center'>
              <ChevronRight className='w-4 h-4 text-gray-400' aria-hidden='true' />
              {item.href && !item.current ? (
                <Link
                  href={item.href}
                  className='ml-1 text-sm font-medium text-gray-700 hover:text-vitale-primary md:ml-2 focus-ring rounded-md px-2 py-1'
                  aria-label={`Ir para ${item.label}`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className='ml-1 text-sm font-medium text-gray-500 md:ml-2'
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
