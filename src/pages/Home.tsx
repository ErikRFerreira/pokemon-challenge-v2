import { useGetPokemonList } from '@/hooks/useGetPokemonList';
import { PaginationParamSchema } from '@/schemas/params.schema';
import { useValidatedParams } from '@/hooks/useValidateParams';
import Pagination from '@/components/Pagination';
import PageHeader from '@/components/PageHeader';
import PokemonCard from '@/components/PokemonCard';
import PokemonCardSkeleton from '@/components/PokemonCardSkeleton';
import CardsList from '@/components/CardsList';

const PAGE_SIZE = 10;

function Home() {
  const { page } = useValidatedParams(PaginationParamSchema);

  const {
    data: pokemonList,
    isPending,
    isLoadingError,
    isRefetching,
    isRefetchError,
    error,
  } = useGetPokemonList(page, PAGE_SIZE);

  return (
    <>
      {isRefetching && <p>Updating...</p>}
      {isRefetchError && <p>Could not refresh: {error.message}</p>}

      <PageHeader
        title="Poké Dex"
        subtitle={
          pokemonList
            ? `Showing ${pokemonList.results.length} of ${pokemonList.count}`
            : undefined
        }
      />

      {isPending ? (
        <CardsList>
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <PokemonCardSkeleton key={index} />
          ))}
        </CardsList>
      ) : isLoadingError ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <CardsList>
            {pokemonList.results.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </CardsList>
          <Pagination
            page={page}
            totalPages={Math.ceil(pokemonList.count / PAGE_SIZE)}
          />
        </>
      )}
    </>
  );
}

export default Home;
