import { fetchFromApi } from './apiRequest';

// Dinamicamente crear la URL para obtener los detalles de un podcast
const getEndpoint = (id: string) =>
  `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`;

// Optener los detalles de un podcast
export async function fetchPodcastDetails(id: string) {
  const ENDPOINT = getEndpoint(id);
  const PROXY = `https://api.allorigins.win/get?url=${encodeURIComponent(
    ENDPOINT,
  )}`;
  const { contents } = await fetchFromApi<{ contents: string }>(PROXY);
  const podcastDetails = JSON.parse(contents).results;
  return podcastDetails;
}
