function PokemonCardSkeleton() {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-ambient overflow-hidden">
      <div className="h-[184px] skeleton-shimmer border-b border-outline-variant/50"></div>
      <div className="p-md">
        <div className="h-6 w-2/3 skeleton-shimmer rounded mb-sm"></div>
        <div className="flex gap-xs">
          <div className="h-6 w-16 skeleton-shimmer rounded-full"></div>
          <div className="h-6 w-16 skeleton-shimmer rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCardSkeleton;
