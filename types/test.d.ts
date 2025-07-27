/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />
/// <reference types="@playwright/test" />

// Declarações globais para vitest
declare global {
  const describe: (typeof import('vitest'))['describe'];
  const it: (typeof import('vitest'))['it'];
  const test: (typeof import('vitest'))['test'];
  const expect: (typeof import('vitest'))['expect'];
  const beforeEach: (typeof import('vitest'))['beforeEach'];
  const afterEach: (typeof import('vitest'))['afterEach'];
  const beforeAll: (typeof import('vitest'))['beforeAll'];
  const afterAll: (typeof import('vitest'))['afterAll'];
  const vi: (typeof import('vitest'))['vi'];

  namespace jest {
    interface Matchers<R> {
      toHaveScreenshot: (name?: string, options?: any) => R;
    }
  }
}

// Declarações para vitest
declare module 'vitest' {
  interface TestContext {
    page?: any;
  }
}

// Declarações para playwright
declare module '@playwright/test' {
  interface Page {
    // Adicionar tipos específicos se necessário
  }
}

// Suprimir erros de tipos implícitos para testes
declare module '*.test.ts' {
  const content: any;
  export default content;
}

declare module '*.test.tsx' {
  const content: any;
  export default content;
}

declare module '*.spec.ts' {
  const content: any;
  export default content;
}

declare module '*.spec.tsx' {
  const content: any;
  export default content;
}
