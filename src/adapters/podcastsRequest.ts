// Adaptador para realizar peticiones a la API de iTunes
const ENDPOINT =
  'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

const PROXY = `https://api.allorigins.win/get?url=${encodeURIComponent(
  ENDPOINT,
)}`;

export async function fetchPodcasts() {
  try {
    const response = await fetch(PROXY);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const { contents } = await response.json();
    const podcasts = JSON.parse(contents).feed.entry;
    return podcasts;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
