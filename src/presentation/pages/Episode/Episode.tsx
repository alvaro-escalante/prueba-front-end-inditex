import { useEpisodeDetails } from '@application/usePodcastEpisode';
import Sidebar from '@components/Sidebar/Sidebar';
import { formatDesc } from '@src/utils/conversions';
import { useParams, useLocation } from 'react-router-dom';
import './Episode.css';

export default function DetalleEpisodio() {
  const { podcastId, episodeId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();
  const location = useLocation();
  const initialEpisode = location.state?.episode;
  const { podcast, episode, loading, error } = useEpisodeDetails(
    podcastId!,
    episodeId!,
    initialEpisode,
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!podcast || !episode) {
    return <div>Podcast or episode not found</div>;
  }

  return (
    <div className="episode-detail">
      <Sidebar podcast={podcast} />
      <div className="episode-detail__main">
        <h2>{episode.title}</h2>
        <div
          className="episode-detail__description"
          dangerouslySetInnerHTML={{ __html: formatDesc(episode.description) }}
        />
        <audio controls data-testid="audio-element">
          <source src={episode.audioUrl} type="audio/mpeg" />
          <track kind="captions" label="No captions available" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}
