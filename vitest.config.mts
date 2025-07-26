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
      'node_modules/sqids/**/*',
      'node_modules/tsconfig-paths/**/*',
      'node_modules/entities/**/*',
      'node_modules/next/**/*',
      'node_modules/**/*.test.{js,ts}',
      'node_modules/**/*.spec.{js,ts}'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    silent: false,
    reporters: ['verbose'],
    onConsoleLog(log: string) {
      // Filtrar warnings que não afetam funcionalidade
      if (log.includes('Received `true` for a non-boolean attribute') ||
          log.includes('Warning: ReactDOM.render is deprecated') ||
          log.includes('Warning: validateDOMNesting')) {
        return false;
      }
      return true;
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
}); 