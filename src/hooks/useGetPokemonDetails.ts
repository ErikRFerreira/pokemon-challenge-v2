import { useQuery } from '@tanstack/react-query';
import { getPokemonDetails } from '@/services/pokemon.service';

export function useGetPokemonDetails(name: string) {
  return useQuery({
    queryKey: ['pokemonDetails', name],
    queryFn: () => getPokemonDetails(name),
    staleTime: 1000 * 60 * 60,
  });
}
