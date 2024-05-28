import { getCachedData, setCachedData } from '@adapters/cacheStorage';
import { fetchTopPodcasts } from '@src/adapters/topRequest';
import processPodcasts from '@src/domain/topProcess';
import type { Podcast, ApiPodcast } from '@src/types/podcasts';

const PODCASTS_KEY = 'podcastData';
const PODCASTS_EXPIRY_KEY = 'podcastDataExpiry';

// Entregar los podcast y almacenarlos en LocalStorage
export async function getPodcasts(): Promise<Podcast[]> {
  const cachedPodcasts = getCachedData<Podcast[]>(
    PODCASTS_KEY,
    PODCASTS_EXPIRY_KEY,
  );
  if (cachedPodcasts) {
    return cachedPodcasts;
  }

  const rawPodcasts: ApiPodcast[] = await fetchTopPodcasts();
  const processedPodcasts = processPodcasts(rawPodcasts);
  setCachedData(PODCASTS_KEY, PODCASTS_EXPIRY_KEY, processedPodcasts);
  return processedPodcasts;
}
