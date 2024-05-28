import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './layout/Layout';
import Detail from './pages/Detail/Detail';
import Episode from './pages/Episode/Episode';
import Home from './pages/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'podcast/:podcastId',
        element: <Detail />,
      },
      {
        path: 'podcast/:podcastId/episode/:episodeId',
        element: <Episode />,
      },
    ],
  },
]);

// Router app con Layout como contenedor
export default function App() {
  return <RouterProvider router={router} />;
}
