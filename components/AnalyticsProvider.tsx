"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/lib/analytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Track initial page view
    analytics.trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    // Track page view on route change
    analytics.trackPageView(pathname);
  }, [pathname]);

  return <>{children}</>;
}