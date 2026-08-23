const API_URL = 'https://pokeapi.co/api/v2/pokemon';
import { describe, expect, it } from 'vitest';
import { getPokemonDetails, getPokemonList } from '@/services/pokemon.service';
import {
  pokemonDetailsMock,
  pokemonDetailsResponseMock,
  pokemonListMock,
  pokemonSpeciesMock,
} from '@/test/mock';
import { http, HttpResponse } from 'msw';
import { server } from '@/test/server';

describe('Pokemon Service', () => {
  it('should fetch total results plus a list of pokémons', async () => {
    // Arrange: Mock the API response for the Pokémon list
    server.use(
      http.get(API_URL, () => {
        return HttpResponse.json(pokemonListMock);
      }),
    );

    // Act: Call the getPokemonList function
    const result = await getPokemonList(1, 2);
    // Assert: Verify the API fields match without coupling this test to enrichment.
    expect(result).toMatchObject(pokemonListMock);
  });

  it('should fetch the details of a specific Pokémon', async () => {
    // Arrange: Mock the API response for the Pokémon details
    server.use(
      http.get(`${API_URL}/bulbasaur`, () => {
        return HttpResponse.json(pokemonDetailsResponseMock);
      }),
      http.get('https://pokeapi.co/api/v2/pokemon-species/1/', () => {
        return HttpResponse.json(pokemonSpeciesMock);
      }),
    );

    // Act: Call the getPokemonDetails function
    const result = await getPokemonDetails('bulbasaur');
    // Assert: Verify the details and species description are combined.
    expect(result).toEqual(pokemonDetailsMock);
  });
});
