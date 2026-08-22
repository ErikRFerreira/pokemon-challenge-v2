import { House } from 'lucide-react';
import Button from '@/ui/button';
import chamberImage from '@/assets/not-found-chamber.png';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="grid items-center gap-xl rounded-xl  bg-surface-container-lowest px-lg py-xl shadow-ambient sm:grid-cols-2 sm:px-xl">
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-sm text-[96px] font-bold leading-none tracking-[-0.06em] text-primary">
          404
        </h1>
        <h2 className="mb-md font-headline-lg text-headline-lg text-on-surface">
          Pokémon Not Found
        </h2>
        <p className="mb-lg max-w-[520px] font-body-lg text-body-lg text-on-surface-variant">
          The data you are looking for seems to have vanished into tall grass.
          Let&apos;s get you back to familiar territory.
        </p>
        <Button onClick={() => navigate('/')} variant="primary">
          <House aria-hidden="true" size={20} strokeWidth={2.25} />
          Go back home
        </Button>
      </div>

      <div className="h-64 w-full max-w-[448px] justify-self-center overflow-hidden rounded-lg sm:h-80">
        <img
          src={chamberImage}
          alt="An empty futuristic containment chamber in a laboratory"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}

export default NotFound;
