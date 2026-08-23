import { HttpResponse, http } from 'msw';
import { describe, expect, it } from 'vitest';
import {
  getPokemonDetails,
  getPokemonList,
} from '@/services/pokemon.service';
import {
  pokemonDetailsMock,
  pokemonDetailsResponseMock,
  pokemonListMock,
  pokemonSpeciesMock,
} from '@/test/mock';
import { server } from '@/test/server';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

describe('Pokemon Service', () => {
  it('requests the selected page and enriches list items with artwork', async () => {
    let requestedUrl = '';
    server.use(
      http.get(API_URL, ({ request }) => {
        requestedUrl = request.url;
        return HttpResponse.json(pokemonListMock);
      }),
    );

    const result = await getPokemonList(2, 10);

    expect(requestedUrl).toBe(`${API_URL}?offset=10&limit=10`);
    expect(result).toEqual({
      ...pokemonListMock,
      results: pokemonListMock.results.map((pokemon, index) => ({
        ...pokemon,
        avatar: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
      })),
    });
  });

  it('combines details with a normalized English description', async () => {
    server.use(
      http.get(`${API_URL}/bulbasaur`, () =>
        HttpResponse.json(pokemonDetailsResponseMock),
      ),
      http.get(pokemonDetailsResponseMock.species.url, () =>
        HttpResponse.json({
          ...pokemonSpeciesMock,
          flavor_text_entries: [
            {
              ...pokemonSpeciesMock.flavor_text_entries[0],
              flavor_text: 'A strange seed\n was planted\t on its back.',
            },
          ],
        }),
      ),
    );

    const result = await getPokemonDetails('bulbasaur');

    expect(result).toEqual({
      ...pokemonDetailsMock,
      description: 'A strange seed was planted on its back.',
    });
  });

  it('uses a fallback when an English description is unavailable', async () => {
    server.use(
      http.get(`${API_URL}/bulbasaur`, () =>
        HttpResponse.json(pokemonDetailsResponseMock),
      ),
      http.get(pokemonDetailsResponseMock.species.url, () =>
        HttpResponse.json({ flavor_text_entries: [] }),
      ),
    );

    const result = await getPokemonDetails('bulbasaur');

    expect(result.description).toMatch(/No description is available/);
  });

  it('rejects unsuccessful HTTP responses', async () => {
    server.use(
      http.get(API_URL, () => new HttpResponse(null, { status: 500 })),
    );

    await expect(getPokemonList()).rejects.toThrow(
      `Failed to fetch JSON from ${API_URL}?offset=0&limit=20`,
    );
  });

  it('rejects API payloads that do not match the schema', async () => {
    server.use(
      http.get(API_URL, () =>
        HttpResponse.json({ ...pokemonListMock, count: 'invalid' }),
      ),
    );

    await expect(getPokemonList()).rejects.toThrow();
  });
});
