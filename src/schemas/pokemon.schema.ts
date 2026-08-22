import { z } from 'zod';

/**
 * PokemonReferenceSchema validates a name/url pair used by the PokeAPI to
 * reference a resource (e.g. a pokemon, ability, or stat) without its full details.
 */
export const PokemonReferenceSchema = z.object({
  name: z.string(),
  url: z.url(),
});

/**
 * PokemonListResponseSchema validates the raw paginated list response from the
 * PokeAPI, including the total count and links to the next/previous pages.
 */
export const PokemonListResponseSchema = z.object({
  count: z.number().int().nonnegative(),
  next: z.url().nullable(),
  previous: z.url().nullable(),
  results: z.array(PokemonReferenceSchema),
});

// PokemonListItemSchema extends a reference with the pokemon's avatar image url.
const PokemonListItemSchema = PokemonReferenceSchema.extend({
  avatar: z.url(),
});

// PokemonListSchema is the list response enriched with avatar urls for each entry.
export const PokemonListSchema = PokemonListResponseSchema.extend({
  results: z.array(PokemonListItemSchema),
});

// PokemonAbilitySchema validates a single ability entry, including whether it's hidden.
const PokemonAbilitySchema = z.object({
  ability: PokemonReferenceSchema,
  is_hidden: z.boolean(),
  slot: z.number().int().positive(),
});

// PokemonTypeSchema validates a single elemental type entry and its slot order.
const PokemonTypeSchema = z.object({
  slot: z.number().int().positive(),
  type: PokemonReferenceSchema,
});

// PokemonStatSchema validates a single base stat entry (e.g. speed, attack).
const PokemonStatSchema = z.object({
  base_stat: z.number().int().nonnegative(),
  effort: z.number().int().nonnegative(),
  stat: PokemonReferenceSchema,
});

/**
 * PokemonDetailsSchema validates the full pokemon detail response from the
 * PokeAPI, combining identity, physical, and gameplay data (abilities, types, stats, sprites).
 */
export const PokemonDetailsSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  height: z.number().int().nonnegative(),
  weight: z.number().int().nonnegative(),
  base_experience: z.number().int().nonnegative(),
  abilities: z.array(PokemonAbilitySchema),
  types: z.array(PokemonTypeSchema),
  stats: z.array(PokemonStatSchema),
  sprites: z.object({
    front_default: z.url().nullable(),
    front_shiny: z.url().nullable(),
  }),
});

export type PokemonReference = z.infer<typeof PokemonReferenceSchema>;
export type PokemonList = z.infer<typeof PokemonListSchema>;
export type PokemonDetails = z.infer<typeof PokemonDetailsSchema>;
export type PokemonListItem = z.infer<typeof PokemonListItemSchema>;
