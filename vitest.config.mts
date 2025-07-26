import path from 'path';
import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
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