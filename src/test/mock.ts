import type {
  PokemonDetails,
  PokemonDetailsResponse,
  PokemonListResponse,
  PokemonSpecies,
} from '@/schemas/pokemon.schema';
import { PokemonFavoritesSchema } from '@/schemas/storage.schema';

export const pokemonFavoritesMock = PokemonFavoritesSchema.parse([
  {
    id: 1,
    name: 'bulbasaur',
    avatar:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    types: [
      {
        slot: 1,
        type: {
          name: 'grass',
          url: 'https://pokeapi.co/api/v2/type/12/',
        },
      },
      {
        slot: 2,
        type: {
          name: 'poison',
          url: 'https://pokeapi.co/api/v2/type/4/',
        },
      },
    ],
  },
  {
    id: 4,
    name: 'charmander',
    avatar:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    types: [
      {
        slot: 1,
        type: {
          name: 'fire',
          url: 'https://pokeapi.co/api/v2/type/10/',
        },
      },
    ],
  },
]);

export const pokemonListMock: PokemonListResponse = {
  count: 1118,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

export const pokemonDetailsResponseMock: PokemonDetailsResponse = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  abilities: [
    {
      ability: {
        name: 'overgrow',
        url: 'https://pokeapi.co/api/v2/ability/65/',
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: 'chlorophyll',
        url: 'https://pokeapi.co/api/v2/ability/34/',
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
    {
      slot: 2,
      type: {
        name: 'poison',
        url: 'https://pokeapi.co/api/v2/type/4/',
      },
    },
  ],
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/',
      },
    },
    {
      base_stat: 49,
      effort: 0,
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/',
      },
    },
  ],
  species: {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  },
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    front_shiny:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
  },
};

export const pokemonSpeciesMock: PokemonSpecies = {
  flavor_text_entries: [
    {
      flavor_text: 'A strange seed was planted on its back at birth.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
    },
  ],
};

export const pokemonDetailsMock: PokemonDetails = {
  ...pokemonDetailsResponseMock,
  description: 'A strange seed was planted on its back at birth.',
};
