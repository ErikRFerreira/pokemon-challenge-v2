import { useQuery } from '@tanstack/react-query';
import { getPokemonList } from '@/services/pokemon.service';

export function useGetPokemonList(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['pokemonList', page, limit],
    queryFn: () => getPokemonList(page, limit),
    staleTime: 1000 * 60 * 60,
  });
}
