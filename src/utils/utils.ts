export function getPokemonId(url: string): number {
  const segments = url.split('/').filter(Boolean);
  return Number(segments.at(-1));
}

export function getPokemonImage(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
