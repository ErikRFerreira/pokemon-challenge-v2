import { Link } from 'react-router-dom';

function AppLogo() {
  return (
    <Link className="shrink-0" to="/">
      <img
        src="/pokedex_logo.svg"
        alt="Pokédex"
        className="h-7 w-auto md:h-8"
      />
    </Link>
  );
}

export default AppLogo;
