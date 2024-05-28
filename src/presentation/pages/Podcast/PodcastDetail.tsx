import { usePodcastData } from '@application/usePodcastData';
import Sidebar from '@components/Sidebar/Sidebar';
import { useLoading } from '@presentation/context/LoadingContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PodcastDetail.css';

export default function DetallePodcast() {
  const { podcastId } = useParams<{ podcastId: string }>();
  const { data: podcasts, loading, error } = usePodcastData();
  const { setLoading } = useLoading();

  // Actualizar el estado de loading del hook al context
  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const podcast = podcasts.find((entry) => entry.id === podcastId);

  if (!podcast) {
    return <div>Podcast not found</div>;
  }

  return (
    <div className="podcast-detail">
      <Sidebar podcast={podcast} />
      <div>DetallePodcast</div>
    </div>
  );
}
