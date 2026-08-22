import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import Footer from './Footer';

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col font-body-md text-body-md bg-surface">
      <AppHeader />
      <main className="flex-grow pt-[100px] pb-xl px-md md:px-xl max-w-container-max mx-auto w-full flex flex-col gap-lg relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
