import { getCachedData, setCachedData } from '@adapters/cacheStorage';
import { fetchPodcastDetails } from '@adapters/detailRequest';
import processPodcastDetail from '@domain/detailProcess';
import { getPodcasts } from '@domain/topService';
import type { PodcastDetail, ApiPodcastDetail } from '@src/types/podcastDetail';

const PODCAST_KEY = 'podcastDetailData_';
const PODCAST_EXPIRY_KEY = 'podcastDetailDataExpiry_';

// Entregar los detalles podcast y almacenarlos en LocalStorage
export async function getPodcastDetails(id: string): Promise<PodcastDetail> {
  const cacheKey = `${PODCAST_KEY}${id}`;
  const cacheExpiryKey = `${PODCAST_EXPIRY_KEY}${id}`;

  const cachedPodcastDetails = getCachedData<PodcastDetail>(
    cacheKey,
    cacheExpiryKey,
  );
  if (cachedPodcastDetails) {
    return cachedPodcastDetails;
  }

  // Añadir summary al podcast para el sidebar
  const topPodcasts = await getPodcasts();
  const topPodcast = topPodcasts.find((podcast) => podcast.id === id);
  const summary = topPodcast?.summary || '';

  // Fetch detalles del podcast
  const rawPodcastDetails: ApiPodcastDetail[] = await fetchPodcastDetails(id);
  const processedPodcastDetails = processPodcastDetail(
    rawPodcastDetails,
    summary,
  );

  setCachedData(cacheKey, cacheExpiryKey, processedPodcastDetails);
  return processedPodcastDetails;
}
