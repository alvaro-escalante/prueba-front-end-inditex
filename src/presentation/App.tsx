import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './layout/Layout';
import DetalleEpisodio from './pages/DetalleEpisodio';
import DetallesPodcast from './pages/DetallePodcast';
import Principal from './pages/home/Principal';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Principal />,
      },
      {
        path: 'podcast/:podcastId',
        element: <DetallesPodcast />,
      },
      {
        path: 'podcast/:podcastId/episode/:episodeId',
        element: <DetalleEpisodio />,
      },
    ],
  },
]);

// Router app con Layout como contenedor
export default function App() {
  return <RouterProvider router={router} />;
}
