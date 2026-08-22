import AppLogo from './AppLogo';
import Navigation from './Navigation';
import SearchBar from './SearchBar';

function AppHeader() {
  return (
    <nav className="bg-surface border-b border-outline-variant shadow-sm fixed top-0 w-full z-50 flex justify-between items-center px-lg md:px-xl h-16 bg-surface/80 backdrop-blur-md">
      <div className="flex items-center justify-between gap-s w-full">
        <div className="flex items-center gap-xl">
          <AppLogo />
          <Navigation />
        </div>
        <SearchBar />
      </div>
    </nav>
  );
}

export default AppHeader;
