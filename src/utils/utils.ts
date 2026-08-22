export function getPokemonId(url: string): number {
  const segments = url.split('/').filter(Boolean);
  return Number(segments.at(-1));
}

export function getPokemonImage(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

const PAGINATION_SIBLING_COUNT = 1;

export type PaginationItem = number | 'ellipsis';

// Builds a compact page list like [1, 2, 3, 'ellipsis', 52] around the current page.
export function getPaginationRange(
  page: number,
  totalPages: number,
): PaginationItem[] {
  const totalPageNumbers = PAGINATION_SIBLING_COUNT * 2 + 5;

  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(page - PAGINATION_SIBLING_COUNT, 1);
  const rightSiblingIndex = Math.min(
    page + PAGINATION_SIBLING_COUNT,
    totalPages,
  );

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + PAGINATION_SIBLING_COUNT * 2;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis', totalPages];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + PAGINATION_SIBLING_COUNT * 2;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1,
    );
    return [1, 'ellipsis', ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i,
  );
  return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages];
}
