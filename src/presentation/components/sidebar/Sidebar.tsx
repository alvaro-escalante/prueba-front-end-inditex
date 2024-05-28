import './Sidebar.css';
import type { PodcastDetail } from '@src/types/podcastDetail';
import { Link } from 'react-router-dom';

// Componente Sidebar que muestra la información de un podcast
export default function Sidebar({ podcast }: { podcast: PodcastDetail }) {
  return (
    <aside className="sidebar">
      <Link to={`/podcast/${podcast.id}`}>
        <img className="sidebar__img" src={podcast.image} alt={podcast.title} />
      </Link>
      <div className="sidebar__info">
        <h4>
          <Link to={`/podcast/${podcast.id}`}>{podcast.title}</Link>
        </h4>
        <p>
          <Link to={`/podcast/${podcast.id}`}>{podcast.author}</Link>
        </p>
      </div>
      <div className="sidebar__summary">
        <h5>Description:</h5>
        <p>{podcast.summary}</p>
      </div>
    </aside>
  );
}
