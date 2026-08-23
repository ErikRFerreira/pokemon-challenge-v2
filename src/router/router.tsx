import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Favorites from '@/pages/Favorites';
import NotFound from '@/pages/NotFound';
import Pokemon from '@/pages/Pokemon';
import Error from '@/pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/pokemon/:name',
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
