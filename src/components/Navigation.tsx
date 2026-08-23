import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const MOBILE_MENU_ID = 'mobile-primary-navigation';
const navigationItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'Favorites', to: '/favorites', end: false },
  { label: 'About', to: '/about', end: false },
] as const;

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      setIsOpen(false);
      toggleRef.current?.focus();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <nav
      aria-label="Primary navigation"
      className="relative order-3 shrink-0 md:order-2"
    >
      <button
        ref={toggleRef}
        aria-controls={MOBILE_MENU_ID}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="flex size-11 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface-variant shadow-sm transition-colors hover:bg-surface-variant md:hidden"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        {isOpen ? (
          <X aria-hidden="true" size={22} />
        ) : (
          <Menu aria-hidden="true" size={22} />
        )}
      </button>

      <ul className="hidden md:flex items-center gap-lg">
        {navigationItems.map(({ label, to, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive
                  ? 'text-primary border-b-2 border-primary pb-1 transition-colors'
                  : 'text-on-surface-variant hover:text-primary transition-colors'
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {isOpen && (
        <ul
          className="absolute right-0 top-full mt-sm min-w-48 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest py-xs shadow-xl md:hidden"
          id={MOBILE_MENU_ID}
        >
          {navigationItems.map(({ label, to, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `block px-md py-sm transition-colors hover:bg-surface-container ${
                    isActive
                      ? 'font-medium text-primary'
                      : 'text-on-surface-variant'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
