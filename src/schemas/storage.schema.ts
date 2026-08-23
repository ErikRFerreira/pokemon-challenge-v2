import { z } from 'zod';
import { PokemonFavoriteSchema } from '@/schemas/pokemon.schema';

export const PokemonFavoritesSchema = z.array(PokemonFavoriteSchema);

export type PokemonFavorites = z.infer<typeof PokemonFavoritesSchema>;
