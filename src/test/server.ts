import { setupServer } from 'msw/node';

/*
 * This is not a real HTTP server.
 *
 * It intercepts requests made inside the test process and lets individual
 * tests decide what response the imaginary API should return.
 */
export const server = setupServer();
