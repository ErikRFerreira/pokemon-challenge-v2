type Props = {
  name: string;
};

function PokemonDetailsSkeleton({ name }: Props) {
  return (
    <section aria-label={`Loading ${name}`} className="animate-pulse">
      <div className="grid grid-cols-1 items-start gap-lg lg:grid-cols-12 lg:gap-xl">
        <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-lg lg:col-span-5 lg:min-h-[600px]">
          <div className="size-64 rounded-full bg-surface-container-highest lg:size-80" />
        </div>
        <div className="flex flex-col gap-lg lg:col-span-7">
          <div className="space-y-md rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-xl">
            <div className="h-4 w-16 rounded bg-surface-container-highest" />
            <div className="h-14 w-1/2 rounded bg-surface-container-highest" />
            <div className="h-20 rounded bg-surface-container-highest" />
          </div>
          <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
            <div className="h-36 rounded-xl border border-outline-variant/50 bg-surface-container-lowest" />
            <div className="h-36 rounded-xl border border-outline-variant/50 bg-surface-container-lowest" />
          </div>
          <div className="space-y-md rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-xl">
            <div className="h-8 w-40 rounded bg-surface-container-highest" />
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="h-5 rounded bg-surface-container-highest" key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PokemonDetailsSkeleton;
