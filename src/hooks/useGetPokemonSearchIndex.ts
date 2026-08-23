import { useQuery } from '@tanstack/react-query';
import { getPokemonSearchIndex } from '@/services/pokemon.service';

const ONE_HOUR = 1000 * 60 * 60;

export function useGetPokemonSearchIndex(enabled: boolean) {
  return useQuery({
    queryKey: ['pokemonSearchIndex'],
    queryFn: getPokemonSearchIndex,
    enabled,
    staleTime: ONE_HOUR,
  });
}
