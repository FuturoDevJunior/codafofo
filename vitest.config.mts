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
      'node_modules/**/*'
    ],
    testTimeout: 10000,
    hookTimeout: 5000,
    retry: 1,
    reporters: ['default']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  }
}); 