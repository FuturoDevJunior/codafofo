import path from 'path';
import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    exclude: [
      'tests/e2e/**/*',
      '**/*.e2e.test.{js,ts,jsx,tsx}',
      '**/*.e2e.spec.{js,ts,jsx,tsx}',
      'node_modules/**/*',
      '.next/**/*',
      'dist/**/*',
      'coverage/**/*'
    ],
    include: [
      '**/*.{test,spec}.{js,ts,jsx,tsx}',
      '**/__tests__/**/*.{js,ts,jsx,tsx}'
    ],
    testTimeout: 15000,
    hookTimeout: 10000,
    retry: process.env.CI ? 2 : 1,
    reporters: process.env.CI 
      ? ['default', 'json', 'junit'] 
      : ['default', 'verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/**/*',
        'tests/**/*',
        '**/*.test.{js,ts,jsx,tsx}',
        '**/*.spec.{js,ts,jsx,tsx}',
        '**/*.config.{js,ts,mjs}',
        'vitest.setup.ts',
        'playwright.config.ts',
        '.next/**/*',
        'dist/**/*',
        'coverage/**/*',
        'scripts/**/*',
        'supabase/**/*'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    },
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    },
    maxConcurrency: 1
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@/components': path.resolve(__dirname, './components'),
      '@/lib': path.resolve(__dirname, './lib'),
      '@/types': path.resolve(__dirname, './types'),
      '@/hooks': path.resolve(__dirname, './hooks'),
      '@/app': path.resolve(__dirname, './app')
    },
  },
  define: {
    'process.env.NODE_ENV': '"test"',
    'process.env.CI': JSON.stringify(process.env.CI || false)
  }
}); 