import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

type RenderOptions = {
  path?: string;
  route?: string;
};

export function renderWithProviders(
  element: ReactNode,
  { path = '*', route = '/' }: RenderOptions = {},
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 0,
        retry: false,
      },
    },
  });
  const router = createMemoryRouter([{ path, element }], {
    initialEntries: [route],
  });

  return {
    queryClient,
    router,
    user: userEvent.setup(),
    ...render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    ),
  };
}
