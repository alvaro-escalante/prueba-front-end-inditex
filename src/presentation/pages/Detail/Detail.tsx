import { usePodcastDetail } from '@application/usePodcastDetail';
import { useLoading } from '@presentation/context/LoadingContext';
import Sidebar from '@src/presentation/components/Sidebar/Sidebar';
import { formatDateString, secondsToTimeString } from '@src/utils/conversions';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Detail.css';

export default function Detail() {
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
      <div className="episodes">
        <div className="episodes__header">
          <span className="episodes__count">
            Episodes: {podcast.episodes.length}
          </span>
        </div>
        <div className="episodes__wrapper">
          <table className="episodes__table">
            <thead className="episodes__table-header">
              <tr>
                <th className="episodes__table-header-cell">Title</th>
                <th className="episodes__table-header-cell">Date</th>
                <th className="episodes__table-header-cell">Duration</th>
              </tr>
            </thead>
            <tbody className="episodes__table-body">
              {podcast.episodes.map((episode, index) => (
                <tr className="episodes__table-row" key={index}>
                  <td className="episodes__table-cell title">
                    <Link to={`/podcast/${podcast.id}/episode/${episode.id}`}>
                      {episode.title}
                    </Link>
                  </td>
                  <td className="episodes__table-cell">
                    {formatDateString(episode.publicationDate)}
                  </td>
                  <td className="episodes__table-cell duration">
                    {secondsToTimeString(episode.duration)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
