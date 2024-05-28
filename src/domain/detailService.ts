import { getCachedData, setCachedData } from '@adapters/cacheStorage';
import { fetchPodcastDetails } from '@src/adapters/detailRequest';
import processPodcastDetail from '@src/domain/detailProcess';
import { getPodcasts } from '@src/domain/topService';
import type { PodcastDetail, ApiPodcastDetail } from '@src/types/podcastDetail';

const PODCAST_KEY = 'podcastDetailData_';
const PODCAST_EXPIRY_KEY = 'podcastDetailDataExpiry';

// Fetch and cache podcast details, supplementing with summary from top podcasts
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

  // Fetch top podcasts to get summary
  const topPodcasts = await getPodcasts();
  const topPodcast = topPodcasts.find((podcast) => podcast.id === id);
  const summary = topPodcast?.summary || '';

  // Fetch podcast details
  const rawPodcastDetails: ApiPodcastDetail[] = await fetchPodcastDetails(id);
  const processedPodcastDetails = processPodcastDetail(
    rawPodcastDetails,
    summary,
  );

  setCachedData(cacheKey, cacheExpiryKey, processedPodcastDetails);
  return processedPodcastDetails;
}
