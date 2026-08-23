import type { PokemonListItem } from '@/schemas/pokemon.schema';
import { getPokemonId } from '@/utils/utils';
import { Link } from 'react-router-dom';

type Props = {
  pokemon: PokemonListItem;
};

function PokemonCard({ pokemon }: Props) {
  const { name } = pokemon;
  const pokemonId = getPokemonId(pokemon.url);

  return (
    <Link
      className="group block overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-ambient transition-transform duration-300 hover:-translate-y-1"
      to={`/pokemon/${name}`}
    >
      <div className="relative flex justify-center bg-surface-container/30 px-md pb-md pt-lg">
        <span className="absolute right-sm top-sm font-stats-num text-stats-num text-on-surface-variant/50">
          #{String(pokemonId).padStart(3, '0')}
        </span>
        <img
          className="h-32 w-32 object-contain transition-transform duration-300 group-hover:scale-110"
          src={pokemon.avatar}
          alt={pokemon.name}
        />
      </div>
      <div className="p-md">
        <h2 className="mb-sm font-headline-md text-headline-md capitalize text-on-surface">
          {pokemon.name}
        </h2>
      </div>
    </Link>
  );
}

export default PokemonCard;
