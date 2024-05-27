import { usePodcastData } from '@application/usePodcastData';
import { useLoading } from '@presentation/context/LoadingContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Principal.css';
export default function MainView() {
  const [search, setSearch] = useState('');
  const { setLoading } = useLoading();
  const { data, loading, error } = usePodcastData();

  // Actualizar el estado de loading del hook al context
  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filtraje de podcasts por titulo o autor
  const filteredPodcasts = data.filter((podcast) =>
    [podcast.title, podcast.author].some((field) =>
      field.toLowerCase().includes(search.toLowerCase()),
    ),
  );

  return data ? (
    <div className="podcast-main-view">
      <div className="podcast-controls">
        <span className="podcast-num">{filteredPodcasts.length}</span>
        <input
          className="podcast-search"
          type="text"
          placeholder="Filter podcast..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul className="podcast-list">
        {filteredPodcasts.map((podcast) => (
          <li key={podcast.id} className="podcast-list__item">
            <Link to={`/podcast/${podcast.id}`}>
              <img
                src={podcast.image}
                alt={podcast.title}
                className="podcast-list__image"
              />

              <div className="podcast-list__content">
                <h4 className="podcast-list__title">{podcast.title}</h4>
                <p className="podcast-list__author">Author: {podcast.author}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}
