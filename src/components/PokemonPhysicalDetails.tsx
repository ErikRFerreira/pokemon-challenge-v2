import PokemonDetail from '@/components/PokemonDetail';
import { Ruler, Weight } from 'lucide-react';

type Props = {
  height: number;
  weight: number;
};

function PokemonPhysicalDetails({ height, weight }: Props) {
  return (
    <dl className="flex flex-col justify-center gap-md rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-lg shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <PokemonDetail
        icon={<Ruler aria-hidden="true" size={18} />}
        label="Height"
        value={`${height / 10} m`}
        withBorder
      />
      <PokemonDetail
        icon={<Weight aria-hidden="true" size={18} />}
        label="Weight"
        value={`${weight / 10} kg`}
      />
    </dl>
  );
}

export default PokemonPhysicalDetails;
