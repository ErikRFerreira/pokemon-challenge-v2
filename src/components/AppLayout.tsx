import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

function AppLayout() {
  return (
    <main>
      <Navigation />
      <Outlet />
    </main>
  );
}

export default AppLayout;
