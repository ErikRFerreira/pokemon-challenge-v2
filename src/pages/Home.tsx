import { useGetPokemonList } from '@/hooks/useGetPokemonList';
import { PaginationParamSchema } from '@/schemas/params.schema';
import { useValidatedParams } from '@/hooks/useValidateParams';
import Pagination from '@/components/Pagination';
import PageHeader from '@/components/PageHeader';
import PokemonCard from '@/components/PokemonCard';
import PokemonCardSkeleton from '@/components/PokemonCardSkeleton';
import CardsList from '@/components/CardsList';
import { Navigate, useSearchParams } from 'react-router-dom';

const PAGE_SIZE = 10;

function Home() {
  const [searchParams] = useSearchParams();
  const params = useValidatedParams(PaginationParamSchema);

  if (!params) return <Navigate to="/" replace />;

  const rawPage = searchParams.get('page');

  if (rawPage !== null && rawPage !== String(params.page)) {
    const canonicalParams = new URLSearchParams(searchParams);
    canonicalParams.set('page', String(params.page));

    return <Navigate to={`?${canonicalParams.toString()}`} replace />;
  }

  return <HomeContent page={params.page} />;
}

function HomeContent({ page }: { page: number }) {
  const {
    data: pokemonList,
    isPending,
    isLoadingError,
    isRefetching,
    error,
  } = useGetPokemonList(page, PAGE_SIZE);

  return (
    <>
      {isRefetching && <p>Updating...</p>}

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
