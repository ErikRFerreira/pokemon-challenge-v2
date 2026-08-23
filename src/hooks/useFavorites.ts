import { useState } from 'react';
import type { PokemonFavorite } from '@/schemas/pokemon.schema';
import {
  PokemonFavoritesSchema,
  type PokemonFavorites,
} from '@/schemas/storage.schema';
import { getItem, setItem } from '@/services/storage.service';

const FAVORITES_STORAGE_KEY = 'favorites';

/**
 * Reads the favorites from local storage and returns them as a PokemonFavorites array. If the data is invalid or not present, it returns an empty array.
 *
 * @returns - An array of PokemonFavorite objects representing the user's favorite Pokémon.
 */
function readFavorites(): PokemonFavorites {
  const result = PokemonFavoritesSchema.safeParse(
    getItem(FAVORITES_STORAGE_KEY),
  );

  return result.success ? result.data : [];
}

/**
 * Writes the provided favorites to local storage after validating them against the PokemonFavoritesSchema. If the data is invalid, it will throw an error.
 *
 * @param favorites - An array of PokemonFavorite objects to be saved as the user's favorite Pokémon.
 */
function writeFavorites(favorites: PokemonFavorites): void {
  const validatedFavorites = PokemonFavoritesSchema.parse(favorites);

  setItem(FAVORITES_STORAGE_KEY, validatedFavorites);
}

/**
 * A custom React hook that provides functionality to manage a user's favorite Pokémon. It allows adding and removing favorites, and keeps the state synchronized with local storage.
 *
 * @returns - An object containing the user's favorite Pokémon, and functions to add and remove favorites.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites);

  function addFavorite(favorite: PokemonFavorite) {
    if (favorites.some(({ id }) => id === favorite.id)) return;

    const nextFavorites = [...favorites, favorite];

    writeFavorites(nextFavorites);
    setFavorites(nextFavorites);
  }

  function removeFavorite(id: PokemonFavorite['id']) {
    const nextFavorites = favorites.filter((favorite) => favorite.id !== id);

    writeFavorites(nextFavorites);
    setFavorites(nextFavorites);
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
  };
}
