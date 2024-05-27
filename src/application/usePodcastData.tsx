import GetPodcasts from '@domain/podcastService';
import type { Podcast } from '@src/types/podcasts';
import { useEffect, useState } from 'react';

// Custom hook encargado de obtener los datos de los podcasts solo
export const usePodcastData = () => {
  const [data, setData] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetcher = async () => {
    try {
      const podcasts = await GetPodcasts();
      setData(podcasts);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  return { data, loading, error };
};
