import type { Podcast, ApiPodcast } from '@src/types/podcasts';

export default function ProcessPodcasts(podcasts: ApiPodcast[]): Podcast[] {
  return podcasts.map((podcast) => ({
    id: podcast.id.attributes['im:id'],
    title: podcast['im:name'].label,
    image: podcast['im:image'][2].label,
    author: podcast['im:artist'].label,
    summary: podcast.summary.label,
  }));
}
