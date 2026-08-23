import AppLogo from './AppLogo';
import Navigation from './Navigation';
import SearchBar from './SearchBar';

function AppHeader() {
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center border-b border-outline-variant bg-surface/80 px-md shadow-sm backdrop-blur-md md:px-xl">
      <div className="flex w-full min-w-0 items-center gap-sm md:gap-xl">
        <AppLogo />
        <Navigation />
        <SearchBar />
      </div>
    </header>
  );
}

export default AppHeader;
