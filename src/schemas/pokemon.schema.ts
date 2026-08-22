import { z } from 'zod';

export const PokemonReferenceSchema = z.object({
  name: z.string(),
  url: z.url(),
});

export const PokemonListResponseSchema = z.object({
  count: z.number().int().nonnegative(),
  next: z.url().nullable(),
  previous: z.url().nullable(),
  results: z.array(PokemonReferenceSchema),
});

const PokemonListItemSchema = PokemonReferenceSchema.extend({
  avatar: z.url(),
});

export const PokemonListSchema = PokemonListResponseSchema.extend({
  results: z.array(PokemonListItemSchema),
});

const PokemonAbilitySchema = z.object({
  ability: PokemonReferenceSchema,
  is_hidden: z.boolean(),
  slot: z.number().int().positive(),
});

const PokemonTypeSchema = z.object({
  slot: z.number().int().positive(),
  type: PokemonReferenceSchema,
});

const PokemonStatSchema = z.object({
  base_stat: z.number().int().nonnegative(),
  effort: z.number().int().nonnegative(),
  stat: PokemonReferenceSchema,
});

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
