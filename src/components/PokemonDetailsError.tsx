import Button, { ButtonLink } from '@/ui/button';
import { formatLabel } from '@/utils/utils';
import { ArrowLeft, RefreshCw } from 'lucide-react';

type Props = {
  name: string;
  error: Error;
  onRetry: () => void;
};

function PokemonDetailsError({ name, error, onRetry }: Props) {
  return (
    <section
      aria-labelledby="pokemon-error-title"
      className="mx-auto flex w-full max-w-2xl flex-col items-center rounded-xl border border-error/30 bg-error-container/20 p-xl text-center shadow-ambient"
    >
      <h1
        className="mb-sm font-headline-md text-headline-md text-error"
        id="pokemon-error-title"
      >
        We couldn't load {formatLabel(name)}
      </h1>
      <p className="mb-lg text-on-surface-variant">{error.message}</p>
      <div className="flex flex-wrap justify-center gap-md">
        <ButtonLink to="/" variant="outline">
          <ArrowLeft aria-hidden="true" size={20} />
          Back to Pokédex
        </ButtonLink>
        <Button onClick={onRetry} variant="primary">
          <RefreshCw aria-hidden="true" size={20} />
          Try again
        </Button>
      </div>
    </section>
  );
}

export default PokemonDetailsError;
