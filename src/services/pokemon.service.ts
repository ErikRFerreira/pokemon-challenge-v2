const API_URL = 'https://pokeapi.co/api/v2/pokemon';
import { getJson } from '@/services/http';
import {
  PokemonListSchema,
  PokemonDetailsSchema,
} from '@/schemas/pokemon.schema';
import type { PokemonList, PokemonDetails } from '@/schemas/pokemon.schema';

/**
 * Fetches a list of Pokemon from the PokeAPI.
 *
 * @param page - The page number to fetch (default is 1).
 * @param limit - The number of Pokemon to fetch per page (default is 20).
 * @returns - A promise that resolves to a PokemonList object containing the fetched Pokemon data.
 */
export async function getPokemonList(
  page = 1,
  limit = 20,
): Promise<PokemonList> {
  const data: unknown = await getJson(
    `${API_URL}?offset=${(page - 1) * limit}&limit=${limit}`,
  );

  return PokemonListSchema.parse(data);
}

/**
 * Fetches the details of a specific Pokemon by its name from the PokeAPI.
 *
 * @param name - The name of the Pokemon to fetch details for.
 * @returns - A promise that resolves to a PokemonDetails object containing the fetched Pokemon details.
 */
export async function getPokemonDetails(name: string): Promise<PokemonDetails> {
  const data: unknown = await getJson(`${API_URL}/${name}`);

  return PokemonDetailsSchema.parse(data);
}
