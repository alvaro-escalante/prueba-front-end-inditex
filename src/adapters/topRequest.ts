import { fetchFromApi } from './apiRequest';

// Optener los podcasts más populares
export async function fetchTopPodcasts() {
  // URL for fetching top podcasts
  const ENDPOINT =
    'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

  // Proxy URL para evitar problemas de CORS
  const PROXY = `https://api.allorigins.win/get?url=${encodeURIComponent(
    ENDPOINT,
  )}`;

  const { contents } = await fetchFromApi<{ contents: string }>(PROXY);
  const podcasts = JSON.parse(contents).feed.entry;
  return podcasts;
}
