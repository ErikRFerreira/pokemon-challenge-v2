import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Favorites from '@/pages/Favorites';
import NotFound from '@/pages/NotFound';
import Pokemon from '@/pages/Pokemon';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/pokemon/:id',
        element: <Pokemon />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/favorites',
        element: <Favorites />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
