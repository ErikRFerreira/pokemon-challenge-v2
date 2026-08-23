type Props = {
  icon: React.ReactNode;
  label: string;
  value: string;
  withBorder?: boolean;
};

function PokemonDetail({ icon, label, value, withBorder = false }: Props) {
  return (
    <div
      className={`flex items-center justify-between pb-sm ${withBorder ? 'border-b border-outline-variant/30' : ''}`}
    >
      <dt className="flex items-center gap-xs font-body-md text-body-md text-on-surface-variant">
        {icon}
        {label}
      </dt>
      <dd className="font-stats-num text-stats-num text-on-surface">{value}</dd>
    </div>
  );
}

export default PokemonDetail;
