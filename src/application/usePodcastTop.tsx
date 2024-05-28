import { getPodcasts } from '@domain/topService';
import type { Podcast } from '@src/types/podcastsTops';
import { useEffect, useState } from 'react';

// Custom hook encargado de obtener los datos de los podcasts populares
export const usePodcastData = () => {
  const [data, setData] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetcher = async () => {
    try {
      const podcasts = await getPodcasts();
      setData(podcasts);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
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
