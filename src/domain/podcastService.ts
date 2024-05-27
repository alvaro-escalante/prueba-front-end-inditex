import { getCachedPodcasts, setCachedPodcasts } from '@adapters/cacheStorage';
import { fetchPodcasts } from '@adapters/podcastsRequest';
import type { Podcast, ApiPodcast } from '@src/types/podcasts';

import processPodcasts from './podcastProcess';

// Optener los podcasts, cachearlos y procesarlos
export async function getPodcasts(): Promise<Podcast[]> {
  const cachedPodcasts = getCachedPodcasts();
  if (cachedPodcasts) {
    return cachedPodcasts;
  }

  const rawPodcasts: ApiPodcast[] = await fetchPodcasts();
  const processedPodcasts = processPodcasts(rawPodcasts);
  setCachedPodcasts(processedPodcasts);
  return processedPodcasts;
}
