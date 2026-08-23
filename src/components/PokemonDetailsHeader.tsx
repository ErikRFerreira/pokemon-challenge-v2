import type { PokemonDetails } from '@/schemas/pokemon.schema';

type Props = Pick<PokemonDetails, 'description' | 'id' | 'name' | 'types'>;

function PokemonDetailsHeader({ description, id, name, types }: Props) {
  return (
    <header className="relative overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <div className="mb-md flex flex-col justify-between gap-md md:flex-row md:items-end">
        <div>
          <span className="font-stats-num text-stats-num tracking-widest text-tertiary">
            #{String(id).padStart(3, '0')}
          </span>
          <h1
            className="mt-xs font-display-lg text-display-lg capitalize tracking-tight text-on-surface"
            id="pokemon-name"
          >
            {name}
          </h1>
        </div>
        <div className="flex gap-sm">
          {types.map(({ type }, index) => (
            <span
              className={
                index === 0
                  ? 'rounded-full border border-primary-container/20 bg-primary-container/15 px-md py-1.5 font-label-caps text-label-caps capitalize text-primary-container shadow-sm'
                  : 'rounded-full border border-secondary-container/50 bg-secondary-container/30 px-md py-1.5 font-label-caps text-label-caps capitalize text-secondary shadow-sm'
              }
              key={type.name}
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-sm max-w-2xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
        {description}
      </p>
    </header>
  );
}

export default PokemonDetailsHeader;
