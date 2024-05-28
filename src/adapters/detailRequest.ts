import { fetchFromApi } from './apiRequest';

// Optener los detalles de un podcast
export async function fetchPodcastDetails(id: string) {
  const ENDPOINT = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`;

  const PROXI_ENDPOINT = `https://api.allorigins.win/get?url=${encodeURIComponent(
    ENDPOINT,
  )}`;

  const { contents } = await fetchFromApi<{ contents: string }>(PROXI_ENDPOINT);
  const podcastDetails = JSON.parse(contents).results;
  return podcastDetails;
}
