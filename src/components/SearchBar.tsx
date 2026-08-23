import { useEffect, useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetPokemonSearchIndex } from '@/hooks/useGetPokemonSearchIndex';
import type { PokemonListItem } from '@/schemas/pokemon.schema';
import { getPokemonId } from '@/utils/utils';

const DEBOUNCE_DELAY = 250;
const MINIMUM_QUERY_LENGTH = 2;
const MAXIMUM_RESULTS = 8;
const RESULTS_ID = 'pokemon-search-results';

function normalizeQuery(value: string): string {
  return value.trim().toLowerCase();
}

function getMatchingPokemon(
  pokemon: PokemonListItem[],
  query: string,
): PokemonListItem[] {
  const exactMatches: PokemonListItem[] = [];
  const prefixMatches: PokemonListItem[] = [];
  const partialMatches: PokemonListItem[] = [];

  for (const item of pokemon) {
    const name = item.name.toLowerCase();

    if (name === query) {
      exactMatches.push(item);
    } else if (name.startsWith(query)) {
      prefixMatches.push(item);
    } else if (name.includes(query)) {
      partialMatches.push(item);
    }
  }

  return [...exactMatches, ...prefixMatches, ...partialMatches].slice(
    0,
    MAXIMUM_RESULTS,
  );
}

function SearchBar() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const currentQuery = normalizeQuery(value);
  const debouncedQuery = normalizeQuery(debouncedValue);
  const hasMinimumQuery = currentQuery.length >= MINIMUM_QUERY_LENGTH;
  const searchIsEnabled = debouncedQuery.length >= MINIMUM_QUERY_LENGTH;
  const isDebouncing = currentQuery !== debouncedQuery;

  const { data, isPending, isError } =
    useGetPokemonSearchIndex(searchIsEnabled);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedValue(value);
    }, DEBOUNCE_DELAY);

    return () => window.clearTimeout(timeout);
  }, [value]);

  const results = useMemo(() => {
    if (!data || !searchIsEnabled) return [];

    return getMatchingPokemon(data.results, debouncedQuery);
  }, [data, debouncedQuery, searchIsEnabled]);

  const resetSearch = () => {
    setValue('');
    setDebouncedValue('');
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (!hasMinimumQuery) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);

      if (results.length > 0 && !isDebouncing) {
        setActiveIndex((index) =>
          index < results.length - 1 ? index + 1 : 0,
        );
      }
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setIsOpen(true);

      if (results.length > 0 && !isDebouncing) {
        setActiveIndex((index) =>
          index > 0 ? index - 1 : results.length - 1,
        );
      }
      return;
    }

    if (
      event.key === 'Enter' &&
      isOpen &&
      activeIndex >= 0 &&
      results[activeIndex]
    ) {
      event.preventDefault();
      const selectedPokemon = results[activeIndex];
      resetSearch();
      navigate(`/pokemon/${selectedPokemon.name}`);
    }
  };

  const showDropdown = isOpen && hasMinimumQuery;
  const showLoading = isDebouncing || (searchIsEnabled && isPending);

  return (
    <div
      className="relative w-[clamp(10rem,36vw,28rem)] shrink-0"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
          setActiveIndex(-1);
        }
      }}
    >
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-md top-1/2 size-5 -translate-y-1/2 text-on-surface-variant"
          strokeWidth={2.5}
        />
        <input
          aria-activedescendant={
            activeIndex >= 0
              ? `pokemon-search-option-${activeIndex}`
              : undefined
          }
          aria-autocomplete="list"
          aria-controls={RESULTS_ID}
          aria-expanded={showDropdown}
          aria-label="Search Pokédex"
          className="h-11 w-full rounded-full border border-outline-variant bg-surface-container pl-11 pr-md text-on-surface shadow-sm outline-none transition-colors placeholder:text-on-surface-variant/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
          onChange={(event) => {
            const nextValue = event.target.value;
            setValue(nextValue);
            setActiveIndex(-1);
            setIsOpen(
              normalizeQuery(nextValue).length >= MINIMUM_QUERY_LENGTH,
            );
          }}
          onFocus={() => {
            if (hasMinimumQuery) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search Pokédex..."
          role="combobox"
          type="search"
          value={value}
        />
      </div>

      {showDropdown && (
        <div
          className="absolute right-0 top-full z-[60] mt-sm w-full min-w-72 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-xl"
          id={RESULTS_ID}
          role="listbox"
        >
          {showLoading ? (
            <SearchStatus>Searching...</SearchStatus>
          ) : isError ? (
            <SearchStatus>Couldn&apos;t load Pokémon. Try again.</SearchStatus>
          ) : results.length === 0 ? (
            <SearchStatus>No Pokémon found.</SearchStatus>
          ) : (
            <ul className="max-h-96 overflow-y-auto py-xs">
              {results.map((pokemon, index) => {
                const pokemonId = getPokemonId(pokemon.url);
                const isActive = activeIndex === index;

                return (
                  <li key={pokemon.name} role="presentation">
                    <Link
                      aria-selected={isActive}
                      className={`flex items-center gap-md px-md py-sm transition-colors ${
                        isActive
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'text-on-surface hover:bg-surface-container'
                      }`}
                      id={`pokemon-search-option-${index}`}
                      onClick={resetSearch}
                      onMouseEnter={() => setActiveIndex(index)}
                      role="option"
                      to={`/pokemon/${pokemon.name}`}
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-surface-container">
                        <img
                          alt=""
                          className="size-10 object-contain"
                          loading="lazy"
                          src={pokemon.avatar}
                        />
                      </span>
                      <span className="min-w-0 flex-1 truncate font-medium capitalize">
                        {pokemon.name}
                      </span>
                      <span className="font-stats-num text-stats-num text-on-surface-variant/70">
                        #{String(pokemonId).padStart(3, '0')}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function SearchStatus({ children }: { children: string }) {
  return (
    <p className="px-md py-lg text-center text-sm text-on-surface-variant">
      {children}
    </p>
  );
}

export default SearchBar;
