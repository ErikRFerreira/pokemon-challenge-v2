import { describe, expect, it } from 'vitest';
import {
  formatLabel,
  getPaginationRange,
  getPokemonId,
  getPokemonImage,
} from '@/utils/utils';

describe('Pokémon utilities', () => {
  it('extracts an id and builds its official artwork URL', () => {
    expect(getPokemonId('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25);
    expect(getPokemonImage(25)).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    );
  });

  it('formats API labels for display', () => {
    expect(formatLabel('special-attack')).toBe('special attack');
  });
});

describe('getPaginationRange', () => {
  it.each([
    [1, 3, [1, 2, 3]],
    [1, 10, [1, 2, 3, 4, 5, 'ellipsis', 10]],
    [5, 10, [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]],
    [10, 10, [1, 'ellipsis', 6, 7, 8, 9, 10]],
  ])('builds the range for page %s of %s', (page, totalPages, expected) => {
    expect(getPaginationRange(page as number, totalPages as number)).toEqual(
      expected,
    );
  });
});
