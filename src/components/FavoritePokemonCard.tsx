import type { PokemonFavorite } from '@/schemas/pokemon.schema';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  pokemon: PokemonFavorite;
  onRemove: () => void;
};

function FavoritePokemonCard({ pokemon, onRemove }: Props) {
  const primaryType = pokemon.types[0]?.type.name ?? 'normal';

  return (
    <article className="glass-card group relative flex cursor-pointer flex-col overflow-hidden rounded-[1.5rem] transition-transform duration-300 hover:-translate-y-1">
      <Link
        aria-label={`View ${pokemon.name}`}
        className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
        to={`/pokemon/${pokemon.name}`}
      >
        <div
          className="favorite-image-panel relative flex h-32 items-center justify-center p-md"
          data-type={primaryType}
        >
          <img
            alt={pokemon.name}
            className="h-24 w-24 object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
            src={pokemon.avatar}
          />
        </div>

        <div className="flex-grow bg-surface-container-lowest p-md md:p-lg">
          <span className="font-label-caps text-label-caps text-tertiary">
            #{String(pokemon.id).padStart(4, '0')}
          </span>
          <h2 className="mt-xs font-headline-md text-headline-md capitalize text-on-surface">
            {pokemon.name}
          </h2>

          <div className="mt-sm flex flex-wrap gap-xs">
            {pokemon.types.map(({ type }) => (
              <span
                className="type-chip rounded-full px-3 py-1 font-label-caps text-label-caps capitalize"
                data-type={type.name}
                key={type.name}
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </Link>

      <button
        aria-label={`Remove ${pokemon.name} from favorites`}
        className="absolute right-md top-md z-10 rounded-full text-primary transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        onClick={onRemove}
        type="button"
      >
        <Heart
          aria-hidden="true"
          className="fill-current"
          size={20}
          strokeWidth={2.5}
        />
      </button>
    </article>
  );
}

export default FavoritePokemonCard;
