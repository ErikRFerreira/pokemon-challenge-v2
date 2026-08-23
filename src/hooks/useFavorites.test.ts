import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useFavorites } from '@/hooks/useFavorites';
import { PokemonFavoritesSchema } from '@/schemas/storage.schema';
import { pokemonFavoritesMock } from '@/test/mock';

const FAVORITES_STORAGE_KEY = 'favorites';

describe('useFavorites', () => {
  it('loads schema-valid favorites from localStorage', () => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(pokemonFavoritesMock),
    );

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual(pokemonFavoritesMock);
  });

  it.each([null, 'not valid JSON', JSON.stringify({ id: 1 })])(
    'uses an empty collection when stored data is missing or invalid',
    (storedValue) => {
      if (storedValue !== null) {
        localStorage.setItem(FAVORITES_STORAGE_KEY, storedValue);
      }

      const { result } = renderHook(() => useFavorites());

      expect(result.current.favorites).toEqual([]);
    },
  );

  it('adds a favorite, persists it, and prevents duplicates', () => {
    const { result } = renderHook(() => useFavorites());
    const favorite = pokemonFavoritesMock[0];

    act(() => result.current.addFavorite(favorite));
    act(() => result.current.addFavorite(favorite));

    expect(result.current.favorites).toEqual([favorite]);
    expect(
      PokemonFavoritesSchema.parse(
        JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? 'null'),
      ),
    ).toEqual([favorite]);
  });

  it('removes a favorite and persists the remaining collection', () => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(pokemonFavoritesMock),
    );
    const { result } = renderHook(() => useFavorites());

    act(() => result.current.removeFavorite(pokemonFavoritesMock[0].id));

    expect(result.current.favorites).toEqual([pokemonFavoritesMock[1]]);
    expect(JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? 'null')).toEqual([
      pokemonFavoritesMock[1],
    ]);
  });
});
