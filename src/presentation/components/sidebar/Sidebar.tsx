import './Sidebar.css';
import type { Podcast } from '@src/types/podcasts';

// Componente Sidebar que muestra la información de un podcast
export default function Sidebar({ podcast }: { podcast: Podcast }) {
  return (
    <aside>
      <img className="sidebar__img" src={podcast.image} alt={podcast.title} />
      <div className="sidebar__info">
        <h4>{podcast.title}</h4>
        <p>by {podcast.title}</p>
      </div>
      <div className="sidebar__summary">
        <h5>Description:</h5>
        <p>{podcast.summary}</p>
      </div>
    </aside>
  );
}
