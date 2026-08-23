import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './server';

beforeAll(() => {
  // Start the server before all tests run
  server.listen({
    onUnhandledRequest: 'error',
  });
});

afterEach(() => {
  // Remove React components rendered by the previous test.
  //cleanup();

  // Remove request behavior added by an individual test.
  server.resetHandlers();
});

afterAll(() => {
  // Stop the server after all tests have run
  server.close();
});
