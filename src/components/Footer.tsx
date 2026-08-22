function Footer() {
  const year = new Date().getFullYear();
  const api_url = 'https://pokeapi.co/';

  return (
    <footer className="w-full py-lg px-xl flex flex-col md:flex-row justify-between items-center gap-md bg-surface-container border-t border-outline-variant mt-auto">
      <div className="font-headline-md text-headline-md text-primary font-bold">
        Pokédex
      </div>
      <div className="text-on-surface-variant font-body-md text-body-md text-sm">
        © {year} Erik Ferreira. Data provided by{' '}
        <a
          href={api_url}
          className="text-on-surface-variant hover:text-primary transition-colors"
        >
          PokéAPI
        </a>
        .
      </div>
    </footer>
  );
}

export default Footer;
