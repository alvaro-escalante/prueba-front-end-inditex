import { getCachedData, setCachedData } from '@adapters/cacheStorage';
import { fetchPodcasts } from '@adapters/podcastsRequest';
import processPodcasts from '@domain/podcastProcess';
import type { Podcast, ApiPodcast } from '@src/types/podcasts';

const PODCAST_CACHE_KEY = 'podcastData';
const PODCAST_CACHE_EXPIRY_KEY = 'podcastDataExpiry';

export async function getPodcasts(): Promise<Podcast[]> {
  const cachedPodcasts = getCachedData<Podcast[]>(
    PODCAST_CACHE_KEY,
    PODCAST_CACHE_EXPIRY_KEY,
  );
  if (cachedPodcasts) {
    return cachedPodcasts;
  }

  const rawPodcasts: ApiPodcast[] = await fetchPodcasts();
  const processedPodcasts = processPodcasts(rawPodcasts);
  setCachedData(PODCAST_CACHE_KEY, PODCAST_CACHE_EXPIRY_KEY, processedPodcasts);
  return processedPodcasts;
}
