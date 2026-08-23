import { HttpResponse, http } from 'msw';
import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import Favorites from '@/pages/Favorites';
import Home from '@/pages/Home';
import Pokemon from '@/pages/Pokemon';
import { PokemonFavoritesSchema } from '@/schemas/storage.schema';
import {
  pokemonDetailsResponseMock,
  pokemonFavoritesMock,
  pokemonListMock,
  pokemonSpeciesMock,
} from '@/test/mock';
import { renderWithProviders } from '@/test/render';
import { server } from '@/test/server';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const FAVORITES_STORAGE_KEY = 'favorites';

describe('Home page', () => {
  it('displays the roster and moves to the next page', async () => {
    server.use(
      http.get(API_URL, () => HttpResponse.json(pokemonListMock)),
    );
    const { router, user } = renderWithProviders(<Home />, {
      path: '/',
      route: '/?page=1',
    });

    expect(await screen.findByRole('heading', { name: 'bulbasaur' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'ivysaur' })).toBeVisible();
    expect(screen.getByText('Showing 2 of 1118')).toBeVisible();
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => expect(router.state.location.search).toBe('?page=2'));
  });

  it('shows an API error', async () => {
    server.use(
      http.get(API_URL, () => new HttpResponse(null, { status: 500 })),
    );
    renderWithProviders(<Home />, { path: '/', route: '/' });

    expect(await screen.findByText(/^Error:/)).toBeVisible();
  });
});

describe('Pagination', () => {
  it.each([
    [1, true, false],
    [112, false, true],
  ])(
    'disables navigation at the boundary for page %s',
    (page, previousDisabled, nextDisabled) => {
      renderWithProviders(<Pagination page={page} totalPages={112} />, {
        route: `/?page=${page}`,
      });

      expect(screen.getByRole('button', { name: /previous/i })).toHaveProperty(
        'disabled',
        previousDisabled,
      );
      expect(screen.getByRole('button', { name: /next/i })).toHaveProperty(
        'disabled',
        nextDisabled,
      );
    },
  );
});

describe('Pokemon details page', () => {
  it('renders details and toggles the favorite in localStorage', async () => {
    server.use(
      http.get(`${API_URL}/bulbasaur`, () =>
        HttpResponse.json(pokemonDetailsResponseMock),
      ),
      http.get(pokemonDetailsResponseMock.species.url, () =>
        HttpResponse.json(pokemonSpeciesMock),
      ),
    );
    const { user } = renderWithProviders(<Pokemon />, {
      path: '/pokemon/:name',
      route: '/pokemon/bulbasaur',
    });

    expect(screen.getByLabelText('Loading bulbasaur')).toBeVisible();
    expect(
      await screen.findByRole('heading', { level: 1, name: 'bulbasaur' }),
    ).toBeVisible();
    expect(
      screen.getByText('A strange seed was planted on its back at birth.'),
    ).toBeVisible();

    await user.click(
      screen.getByRole('button', { name: 'Add to Favorites' }),
    );

    expect(
      screen.getByRole('button', { name: 'Remove from Favorites' }),
    ).toBeVisible();
    expect(
      PokemonFavoritesSchema.parse(
        JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? 'null'),
      ),
    ).toMatchObject([
      {
        id: 1,
        name: 'bulbasaur',
        types: pokemonDetailsResponseMock.types,
      },
    ]);

    await user.click(
      screen.getByRole('button', { name: 'Remove from Favorites' }),
    );

    expect(JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? 'null')).toEqual(
      [],
    );
  });

  it('shows a useful error when details cannot be loaded', async () => {
    server.use(
      http.get(
        `${API_URL}/missingno`,
        () => new HttpResponse(null, { status: 404 }),
      ),
    );
    renderWithProviders(<Pokemon />, {
      path: '/pokemon/:name',
      route: '/pokemon/missingno',
    });

    expect(
      await screen.findByRole('heading', {
        name: /we couldn't load missingno/i,
      }),
    ).toBeVisible();
    expect(screen.getByRole('button', { name: /try again/i })).toBeVisible();
  });
});

describe('Favorites page', () => {
  it('displays saved Pokemon and becomes empty after removal', async () => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify([pokemonFavoritesMock[0]]),
    );
    const { user } = renderWithProviders(<Favorites />, {
      path: '/favorites',
      route: '/favorites',
    });

    expect(screen.getByRole('heading', { name: 'bulbasaur' })).toBeVisible();

    await user.click(
      screen.getByRole('button', {
        name: 'Remove bulbasaur from favorites',
      }),
    );

    expect(screen.getByText('No favorites yet :(')).toBeVisible();
    expect(JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? 'null')).toEqual(
      [],
    );
  });
});

describe('Search', () => {
  it('shows matching Pokemon and navigates to the selected result', async () => {
    server.use(
      http.get(API_URL, () => HttpResponse.json(pokemonListMock)),
    );
    const { router, user } = renderWithProviders(<SearchBar />);

    await user.type(screen.getByRole('combobox'), 'bul');
    const result = await screen.findByRole('option', { name: /bulbasaur/i });
    await user.click(result);

    expect(router.state.location.pathname).toBe('/pokemon/bulbasaur');
  });
});
