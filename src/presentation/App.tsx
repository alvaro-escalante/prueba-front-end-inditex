import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './layout/Layout';
import EpisodeDetail from './pages/Episode/EpisodeDetail';
import Home from './pages/Home/Home';
import PodcastDetail from './pages/Podcast/PodcastDetail';

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
        element: <PodcastDetail />,
      },
      {
        path: 'podcast/:podcastId/episode/:episodeId',
        element: <EpisodeDetail />,
      },
    ],
  },
]);

// Router app con Layout como contenedor
export default function App() {
  return <RouterProvider router={router} />;
}
