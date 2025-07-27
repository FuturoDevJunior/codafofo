import '@testing-library/jest-dom';

// Mock do Intersection Observer
// Implementa todas as propriedades exigidas pelo TypeScript
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

global.IntersectionObserver = MockIntersectionObserver as any;

// Mock do ResizeObserver
global.ResizeObserver = class MockResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock do matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock do URL.createObjectURL
global.URL.createObjectURL = () => 'mocked-url';

// Mock do fetch
global.fetch = () =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  } as Response);

// Mock do localStorage
const localStorageMock = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  length: 0,
  key: () => null,
};
global.localStorage = localStorageMock;

// Mock do sessionStorage
const sessionStorageMock = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  length: 0,
  key: () => null,
};
global.sessionStorage = sessionStorageMock;

// Mock do window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
});

// Mock do window.open
Object.defineProperty(window, 'open', {
  writable: true,
  value: () => {},
});

// Mock do navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  writable: true,
  value: {
    writeText: () => Promise.resolve(),
    readText: () => Promise.resolve(''),
  },
});

// Mock do crypto.randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'test-uuid',
  },
});

// Mock do performance.now
Object.defineProperty(global, 'performance', {
  value: {
    now: () => Date.now(),
  },
});

// Mock do requestAnimationFrame
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
  return 1;
};

global.cancelAnimationFrame = () => {};

// Mock do setTimeout e setInterval
global.setTimeout = ((callback: any, _delay: any) => {
  if (typeof callback === 'function') {
    callback();
  }
  return 1;
}) as any;

global.setInterval = ((callback: any, _delay: any) => {
  if (typeof callback === 'function') {
    callback();
  }
  return 1;
}) as any;

global.clearTimeout = () => {};
global.clearInterval = () => {};
