import { Ruler, Weight } from 'lucide-react';

type Props = {
  height: number;
  weight: number;
};

function PokemonPhysicalDetails({ height, weight }: Props) {
  return (
    <dl className="flex flex-col justify-center gap-md rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-lg shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-sm">
        <dt className="flex items-center gap-xs font-body-md text-body-md text-on-surface-variant">
          <Ruler aria-hidden="true" size={18} />
          Height
        </dt>
        <dd className="font-stats-num text-stats-num text-on-surface">
          {height / 10} m
        </dd>
      </div>
      <div className="flex items-center justify-between pb-sm">
        <dt className="flex items-center gap-xs font-body-md text-body-md text-on-surface-variant">
          <Weight aria-hidden="true" size={18} />
          Weight
        </dt>
        <dd className="font-stats-num text-stats-num text-on-surface">
          {weight / 10} kg
        </dd>
      </div>
    </dl>
  );
}

export default PokemonPhysicalDetails;
