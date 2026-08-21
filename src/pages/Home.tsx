import { useGetPokemonList } from '@/hooks/useGetPokemonList';

function Home() {
  const {
    data: pokemonList,
    isPending,
    isLoadingError,
    isRefetching,
    isRefetchError,
    error,
  } = useGetPokemonList();

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (isLoadingError) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <>
      {isRefetching && <p>Updating...</p>}
      {isRefetchError && <p>Could not refresh: {error.message}</p>}

      <h1>Pokémon</h1>
      <ul>
        {pokemonList.results.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </>
  );
}

export default Home;
