import type {
  PodcastDetail,
  Episode,
  ApiPodcastDetail,
} from '@src/types/podcastDetail';

// Procesar los detalles de un podcast pare detalles y episodios
export default function processPodcastDetail(
  data: ApiPodcastDetail[],
  summary: string,
): PodcastDetail {
  // Extraer el podcast de la respuesta si es track
  const podcast = data.find((item) => item.wrapperType === 'track');
  if (!podcast) {
    throw new Error('Data del podcast no encontrado');
  }

  // Extraer los episodios de la respuesta
  const episodes = data.filter((item) => item.wrapperType === 'podcastEpisode');

  // Mapear los episodios
  const mappedEpisodes: Episode[] = episodes.map((episode) => ({
    id: episode.trackId.toString(),
    title: episode.trackName,
    publicationDate: episode.releaseDate,
    description: episode.description,
    duration: episode.trackTimeMillis,
    audioUrl: episode.episodeUrl,
  }));

  // Retorna data para sidebar y episodios
  return {
    id: podcast.collectionId.toString(),
    title: podcast.collectionName,
    image: podcast.artworkUrl100,
    author: podcast.artistName,
    summary,
    episodes: mappedEpisodes,
  };
}
