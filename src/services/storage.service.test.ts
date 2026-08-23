import { beforeEach, describe, expect, it } from 'vitest';
import { PokemonFavoritesSchema } from '@/schemas/storage.schema';
import { getItem, removeItem, setItem } from '@/services/storage.service';
import { pokemonFavoritesMock } from '@/test/mock';

const FAVORITES_STORAGE_KEY = 'favorites';

describe('Storage Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('reads all stored items', () => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(pokemonFavoritesMock),
    );

    const result = getItem(FAVORITES_STORAGE_KEY);

    expect(result).toEqual(pokemonFavoritesMock);
    expect(PokemonFavoritesSchema.safeParse(result).success).toBe(true);
  });

  it('adds an item', () => {
    const favorite = pokemonFavoritesMock[0];

    setItem(FAVORITES_STORAGE_KEY, [favorite]);

    expect(getItem(FAVORITES_STORAGE_KEY)).toEqual([favorite]);
  });

  it('deletes an item', () => {
    setItem(FAVORITES_STORAGE_KEY, pokemonFavoritesMock);

    removeItem(FAVORITES_STORAGE_KEY);

    expect(getItem(FAVORITES_STORAGE_KEY)).toBeNull();
  });
});
