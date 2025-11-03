import '@testing-library/jest-dom';

// Suppress expected console warnings in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    // Check if any argument contains the patterns we want to suppress
    const shouldSuppress = args.some(arg => {
      if (typeof arg === 'string') {
        // Suppress DOM nesting warnings from test mocks
        if (arg.includes('validateDOMNesting')) return true;
        // Suppress warnings about charset and http-equiv (these are correct HTML attributes)
        if (arg.includes('charset')) return true;
        if (arg.includes('http-equiv')) return true;
      }
      return false;
    });

    if (!shouldSuppress) {
      originalError.call(console, ...args);
    }
  };
});

afterAll(() => {
  console.error = originalError;
});
