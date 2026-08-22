import PageHeader from '@/components/PageHeader';
import { ArrowRight, Code2, Database, Info } from 'lucide-react';

const technologies = [
  {
    abbreviation: 'Re',
    name: 'React',
    badgeClass: 'bg-primary-container text-on-primary-container',
  },
  {
    abbreviation: 'TS',
    name: 'TypeScript',
    badgeClass: 'bg-secondary-container text-on-secondary-container',
  },
  {
    abbreviation: 'Vt',
    name: 'Vite',
    badgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  },
  {
    abbreviation: 'Tw',
    name: 'Tailwind CSS',
    badgeClass: 'bg-primary-fixed text-on-primary-fixed-variant',
  },
  {
    abbreviation: 'Rq',
    name: 'TanStack Query',
    badgeClass: 'bg-secondary-fixed text-on-secondary-fixed-variant',
  },
  {
    abbreviation: 'Z',
    name: 'Zod',
    badgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  },
  {
    abbreviation: 'Vi',
    name: 'Vitest',
    badgeClass: 'bg-primary-fixed text-on-primary-fixed-variant',
  },
];

function About() {
  return (
    <>
      <PageHeader
        title="Pokédex"
        subtitle="A demo project built to explore modern React development."
      />

      <section className="grid grid-cols-1 gap-gutter mb-xl md:grid-cols-12">
        <div className="space-y-lg md:col-span-8">
          <article className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-ambient">
            <h2 className="font-headline-md text-headline-md text-on-background mb-md flex items-center gap-sm">
              <Info className="text-primary" size={24} aria-hidden="true" />
              The Project
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md">
              This Pokédex started as a challenge to build a complete app with
              modern React and the practices used in production projects. It
              turns data from PokéAPI into a fast, responsive catalogue while
              keeping the code type-safe, reusable, and easy to maintain.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              The project separates pages, reusable components, custom hooks,
              API services, and validation schemas. Server data is cached and
              synchronized independently from the UI, keeping each layer easy to
              understand and test as the app grows.
            </p>
          </article>
        </div>

        <div className="space-y-lg md:col-span-4">
          <article className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-ambient">
            <h2 className="font-headline-md text-headline-md text-on-background mb-md flex items-center gap-sm">
              <Code2 className="text-secondary" size={24} aria-hidden="true" />
              Tech Stack
            </h2>
            <ul className="space-y-sm">
              {technologies.map(({ abbreviation, name, badgeClass }) => (
                <li
                  key={name}
                  className="flex items-center gap-sm p-sm rounded-lg border border-transparent transition-colors hover:bg-surface-container-low hover:border-outline-variant"
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-label-caps text-label-caps ${badgeClass}`}
                  >
                    {abbreviation}
                  </span>
                  <span className="font-body-md text-body-md text-on-background">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <article className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-ambient">
            <h2 className="font-headline-md text-headline-md text-on-background mb-md flex items-center gap-sm">
              <Database
                className="text-tertiary"
                size={24}
                aria-hidden="true"
              />
              Data Source
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md">
              All biological data and statistics are reliably sourced from the
              open-source PokéAPI.
            </p>
            <a
              className="inline-flex items-center gap-xs text-primary font-label-caps text-label-caps transition-colors hover:text-on-primary-fixed-variant"
              href="https://pokeapi.co/"
              target="_blank"
              rel="noreferrer"
            >
              VISIT POKÉAPI
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </article>
        </div>
      </section>
    </>
  );
}

export default About;
