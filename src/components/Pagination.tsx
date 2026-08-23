import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationParamSchema } from '@/schemas/params.schema';
import { getPaginationRange } from '@/utils/utils';

type Props = {
  page: number;
  totalPages: number;
};

function Pagination({ page, totalPages }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  function goToPage(targetPage: number) {
    const result = PaginationParamSchema.safeParse({
      ...Object.fromEntries(searchParams),
      page: targetPage,
    });

    if (!result.success) return;

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(result.data.page));
    setSearchParams(nextParams);
  }

  const pageNumbers = getPaginationRange(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="mt-xl flex justify-center items-center gap-sm"
    >
      <button
        className="px-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors flex items-center gap-xs disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
      >
        <ChevronLeft aria-hidden="true" size={18} />
        <span className="font-body-md text-body-md">Previous</span>
      </button>

      <div className="hidden md:flex items-center gap-xs">
        {pageNumbers.map((pageNumber, index) =>
          pageNumber === 'ellipsis' ? (
            <span
              aria-hidden="true"
              key={`ellipsis-${index}`}
              className="text-on-surface-variant px-2"
            >
              ...
            </span>
          ) : (
            <button
              aria-current={pageNumber === page ? 'page' : undefined}
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={
                pageNumber === page
                  ? 'w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-stats-num text-stats-num font-bold'
                  : 'w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors font-stats-num text-stats-num'
              }
            >
              {pageNumber}
            </button>
          ),
        )}
      </div>

      <button
        className="px-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors flex items-center gap-xs disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => goToPage(page + 1)}
        disabled={page >= totalPages}
      >
        <span className="font-body-md text-body-md">Next</span>
        <ChevronRight aria-hidden="true" size={18} />
      </button>
    </nav>
  );
}

export default Pagination;
