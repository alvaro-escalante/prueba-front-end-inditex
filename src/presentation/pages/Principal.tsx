import { usePodcastData } from '@application/usePodcastData';

export default function MainView() {
  const { data, loading, error } = usePodcastData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main-view">
      {data && data.length && <span>{data.length}</span>}

      <ul>
        {data &&
          data.map((podcast) => (
            <li key={podcast.id}>
              <h2>{podcast.title}</h2>
              <img src={podcast.image} alt={podcast.title} />
              <p>{podcast.summary}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
