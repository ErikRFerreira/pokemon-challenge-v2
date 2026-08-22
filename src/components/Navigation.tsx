import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul className="hidden md:flex items-center gap-lg">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? 'text-primary border-b-2 border-primary pb-1 transition-colors'
                : 'text-on-surface-variant hover:text-primary transition-colors'
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? 'text-primary border-b-2 border-primary pb-1 transition-colors'
                : 'text-on-surface-variant hover:text-primary transition-colors'
            }
          >
            Favorites
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'text-primary border-b-2 border-primary pb-1 transition-colors'
                : 'text-on-surface-variant hover:text-primary transition-colors'
            }
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
