import type { PokemonDetails } from '@/schemas/pokemon.schema';
import { formatLabel } from '@/utils/utils';

type Props = {
  abilities: PokemonDetails['abilities'];
};

function PokemonAbilities({ abilities }: Props) {
  return (
    <section className="flex flex-col gap-sm rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-lg shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <h2 className="mb-xs font-label-caps text-label-caps text-tertiary">
        Abilities
      </h2>
      <div className="flex flex-col gap-xs">
        {abilities.map(({ ability, is_hidden }) => (
          <div
            className="flex items-center justify-between rounded-lg border border-surface-variant bg-surface p-sm"
            key={ability.name}
          >
            <span className="flex items-center gap-xs font-body-md text-body-md font-medium capitalize text-on-surface">
              {formatLabel(ability.name)}
              {is_hidden && (
                <span className="rounded bg-tertiary-container/20 px-1.5 py-0.5 font-label-caps text-[10px] text-tertiary">
                  Hidden
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PokemonAbilities;
