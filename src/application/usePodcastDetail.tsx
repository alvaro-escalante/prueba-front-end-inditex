import { getPodcastDetails } from '@domain/detailService';
import type { PodcastDetail } from '@src/types/podcastDetail';
import { useEffect, useState } from 'react';

// Custom hook encargado de obtener los datos de los detalles del podcast
export const usePodcastDetail = (id: string) => {
  const [data, setData] = useState<PodcastDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetcher = async () => {
    try {
      const podcastDetails = await getPodcastDetails(id);

      setData(podcastDetails);
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
  }, [id]);

  return { data, loading, error };
};
