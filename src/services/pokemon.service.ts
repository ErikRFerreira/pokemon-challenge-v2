const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_SEARCH_INDEX_LIMIT = 100_000;
import { getJson } from '@/services/http';
import {
  PokemonListSchema,
  PokemonListResponseSchema,
  PokemonDetailsResponseSchema,
  PokemonDetailsSchema,
  PokemonSpeciesSchema,
} from '@/schemas/pokemon.schema';
import type { PokemonList, PokemonDetails } from '@/schemas/pokemon.schema';
import { getPokemonId, getPokemonImage } from '@/utils/utils';

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
  const data = PokemonListResponseSchema.parse(
    await getJson(`${API_URL}?offset=${(page - 1) * limit}&limit=${limit}`),
  );

  return PokemonListSchema.parse({
    ...data,
    results: data.results.map((pokemon) => ({
      ...pokemon,
      avatar: getPokemonImage(getPokemonId(pokemon.url)),
    })),
  });
}

/**
 * Fetches the complete Pokemon index used by the global search.
 *
 * The response follows the same validation and enrichment path as paginated
 * Pokemon lists, so consumers only receive schema-validated list items.
 */
export async function getPokemonSearchIndex(): Promise<PokemonList> {
  return getPokemonList(1, POKEMON_SEARCH_INDEX_LIMIT);
}

/**
 * Fetches the details of a specific Pokemon by its name from the PokeAPI.
 *
 * @param name - The name of the Pokemon to fetch details for.
 * @returns - A promise that resolves to a PokemonDetails object containing the fetched Pokemon details.
 */
export async function getPokemonDetails(name: string): Promise<PokemonDetails> {
  const details = PokemonDetailsResponseSchema.parse(
    await getJson(`${API_URL}/${name}`),
  );
  const species = PokemonSpeciesSchema.parse(
    await getJson(details.species.url),
  );
  const description =
    species.flavor_text_entries
      .find(({ language }) => language.name === 'en')
      ?.flavor_text.replace(/\s+/g, ' ')
      .trim() ?? 'No description is available for this Pokémon.';

  return PokemonDetailsSchema.parse({ ...details, description });
}
