import { usePodcastDetail } from '@application/usePodcastDetail';
import Sidebar from '@components/Sidebar/Sidebar';
import { useLoading } from '@presentation/context/LoadingContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PodcastDetail.css';

export default function DetallePodcast() {
  // Optener ID del podcast de los parámetros de la URL
  const { podcastId } = useParams<{ podcastId: string }>();
  // Obtener el podcast y el estado de carga del hook
  const { data: podcast, loading, error } = usePodcastDetail(podcastId!);
  // Obtener la función setLoading del loading context provider
  const { setLoading } = useLoading();

  // Actualizar el estado de loading del hook al context
  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!podcast) {
    return <div>Podcast no encontrado</div>;
  }

  return (
    <div className="podcast-detail">
      <Sidebar podcast={podcast} />
      <div>DetallePodcast</div>
    </div>
  );
}
