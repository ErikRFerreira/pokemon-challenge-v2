import PokemonAbilities from '@/components/PokemonAbilities';
import PokemonDetailsError from '@/components/PokemonDetailsError';
import PokemonDetailsHeader from '@/components/PokemonDetailsHeader';
import PokemonDetailsSkeleton from '@/components/PokemonDetailsSkeleton';
import PokemonHero from '@/components/PokemonHero';
import PokemonPhysicalDetails from '@/components/PokemonPhysicalDetails';
import { useFavorites } from '@/hooks/useFavorites';
import { useGetPokemonDetails } from '@/hooks/useGetPokemonDetails';
import PokemonStats from '@/ui/PokemonStats';
import { getPokemonImage } from '@/utils/utils';
import { ArrowLeft } from 'lucide-react';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

function Pokemon() {
  const { name } = useParams<'name'>();
  const location = useLocation();
  const navigate = useNavigate();

  if (!name) return <Navigate to="/404" replace />;

  function handleBack(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    if (location.key === 'default') {
      navigate('/');
      return;
    }

    navigate(-1);
  }

  return (
    <>
      <a
        className="flex w-fit items-center gap-sm font-medium text-primary transition-colors hover:text-primary-container focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        href="/"
        onClick={handleBack}
      >
        <ArrowLeft aria-hidden="true" size={20} strokeWidth={2.25} />
        Back to roster
      </a>
      <PokemonDetails name={name} />
    </>
  );
}

type PokemonDetailsProps = {
  name: string;
};

function PokemonDetails({ name }: PokemonDetailsProps) {
  const {
    data: pokemonDetails,
    isPending,
    isError,
    error,
    refetch,
  } = useGetPokemonDetails(name);

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  if (isPending) {
    return <PokemonDetailsSkeleton name={name} />;
  }

  if (isError) {
    return (
      <PokemonDetailsError
        error={error}
        name={name}
        onRetry={() => void refetch()}
      />
    );
  }

  const isFavorite = favorites.some((favorite) => favorite.name === name);

  function handleToggleFavorite() {
    if (!pokemonDetails) return;

    if (isFavorite) {
      removeFavorite(pokemonDetails.id);
    } else {
      const newFavorite = {
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        avatar: getPokemonImage(pokemonDetails.id),
        types: pokemonDetails.types,
      };

      addFavorite(newFavorite);
    }
  }

  return (
    <section aria-labelledby="pokemon-name">
      <div className="grid grid-cols-1 items-start gap-lg lg:grid-cols-12 lg:gap-xl">
        <PokemonHero
          image={getPokemonImage(pokemonDetails.id)}
          isFavorite={isFavorite}
          name={pokemonDetails.name}
          toggleFavorite={handleToggleFavorite}
        />
        <div className="flex flex-col gap-lg lg:col-span-7">
          <PokemonDetailsHeader
            description={pokemonDetails.description}
            id={pokemonDetails.id}
            name={pokemonDetails.name}
            types={pokemonDetails.types}
          />
          <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
            <PokemonPhysicalDetails
              height={pokemonDetails.height}
              weight={pokemonDetails.weight}
            />
            <PokemonAbilities abilities={pokemonDetails.abilities} />
          </div>
          <PokemonStats stats={pokemonDetails.stats} />
        </div>
      </div>
    </section>
  );
}

export default Pokemon;
