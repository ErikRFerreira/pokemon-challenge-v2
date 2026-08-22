import { Link } from 'react-router-dom';

function AppLogo() {
  return (
    <Link to="/">
      <img src="/pokedex_logo.svg" alt="Pokédex" className="h-8 w-auto" />
    </Link>
  );
}

export default AppLogo;
