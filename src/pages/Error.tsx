import { ArrowLeft, RefreshCw, TriangleAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/ui/button';

function Error() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-md py-xl font-body-md">
      <section
        aria-labelledby="error-title"
        className="flex w-full max-w-[670px] flex-col items-center rounded-xl border border-error/30 bg-error-container/20 px-lg py-xl text-center shadow-ambient sm:px-xl"
      >
        <div className="mb-lg flex size-16 items-center justify-center rounded-full bg-error-container text-on-error-container">
          <TriangleAlert aria-hidden="true" size={30} strokeWidth={2.5} />
        </div>

        <h1
          id="error-title"
          className="mb-md font-headline-md text-headline-md text-error"
        >
          Oops! Something went wrong
        </h1>

        <p className="mb-lg max-w-[480px] text-body-md text-on-surface-variant sm:mb-xl">
          We encountered an error while trying to retrieve biological data from
          the Pokédex server. Please ensure your connection is stable and try
          again.
        </p>

        <div className="flex w-full flex-col justify-center gap-md sm:w-auto sm:flex-row">
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft aria-hidden="true" size={20} strokeWidth={2} />
            Previous Page
          </Button>
          <Button onClick={() => window.location.reload()} variant="primary">
            <RefreshCw aria-hidden="true" size={20} strokeWidth={2.25} />
            Retry Connection
          </Button>
        </div>
      </section>
    </main>
  );
}

export default Error;
