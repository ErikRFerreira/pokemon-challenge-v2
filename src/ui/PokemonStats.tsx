import type { PokemonDetails } from '@/schemas/pokemon.schema';
import { formatLabel } from '@/utils/utils';
import { BarChart3 } from 'lucide-react';

type Props = {
  stats: PokemonDetails['stats'];
};

function PokemonStats({ stats }: Props) {
  const total = stats.reduce((sum, { base_stat }) => sum + base_stat, 0);

  return (
    <section className="rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <h2 className="mb-lg flex items-center gap-sm font-headline-md text-headline-md text-on-surface">
        <BarChart3 aria-hidden="true" className="text-primary" />
        Base Stats
      </h2>
      <dl className="flex flex-col gap-md">
        {stats.map(({ base_stat, stat }) => (
          <div
            className="flex items-center gap-md"
            key={stat.name}
          >
            <dt className="w-16 text-right font-label-caps text-label-caps uppercase text-on-surface-variant">
              {getStatLabel(stat.name)}
            </dt>
            <dd className="w-8 text-right font-stats-num text-stats-num text-on-surface">
              {base_stat}
            </dd>
            <div
              aria-hidden="true"
              className="h-2 flex-grow overflow-hidden rounded-full bg-surface-variant"
            >
              <div
                className={`h-full rounded-full ${getStatColor(stat.name)}`}
                style={{ width: `${Math.min((base_stat / 200) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
        <div className="mt-sm flex items-center justify-between border-t border-outline-variant/30 pt-sm text-on-surface-variant">
          <dt className="font-label-caps text-label-caps">TOTAL</dt>
          <dd className="font-stats-num text-[16px] font-bold text-on-surface">
            {total}
          </dd>
        </div>
      </dl>
    </section>
  );
}

const statLabels: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

function getStatLabel(name: string) {
  return statLabels[name] ?? formatLabel(name);
}

function getStatColor(name: string) {
  if (name === 'hp' || name === 'speed') return 'bg-secondary';
  if (name === 'defense' || name === 'special-defense') {
    return 'bg-primary-container';
  }
  return 'bg-primary';
}

export default PokemonStats;
