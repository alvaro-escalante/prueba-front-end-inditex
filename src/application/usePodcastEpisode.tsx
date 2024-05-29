import { getPodcastDetails } from '@domain/detailService';
import type { PodcastDetail, Episode } from '@src/types/podcastDetail';
import { useState, useEffect } from 'react';

// Custon hook encargado de obtener los detalles de un episodio
export const useEpisodeDetails = (
  podcastId: string,
  episodeId: string,
  initialEpisode?: Episode,
) => {
  const [podcast, setPodcast] = useState<PodcastDetail | null>(null);
  const [episode, setEpisode] = useState<Episode | null>(
    initialEpisode || null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        const podcastDetails = await getPodcastDetails(podcastId);

        setPodcast(podcastDetails);

        if (!initialEpisode) {
          const episodeDetails = podcastDetails.episodes.find(
            (episode) => episode.id === episodeId,
          );

          setEpisode(episodeDetails || null);
        }
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

    fetchPodcastDetails();
  }, [podcastId, episodeId, initialEpisode]);

  return { podcast, episode, loading, error };
};
