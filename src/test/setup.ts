import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './server';

beforeAll(() => {
  // Start the server before all tests run
  server.listen({
    onUnhandledRequest: 'error',
  });
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  server.resetHandlers();
});

afterAll(() => {
  // Stop the server after all tests have run
  server.close();
});
