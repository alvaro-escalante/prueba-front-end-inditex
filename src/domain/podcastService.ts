import { fetchPodcasts } from '@adapters/podcastsRequest';
import type { Podcast, ApiPodcast } from '@src/types/podcasts';

import processPodcasts from './podcastProcess';

// Función encargada de obtener los podcasts y procesarlo
export default async function GetPodcasts(): Promise<Podcast[]> {
  const rawPodcasts: ApiPodcast[] = await fetchPodcasts();
  return processPodcasts(rawPodcasts);
}
