export type Episode = {
  id: string;
  title: string;
  publicationDate: string;
  duration: number;
};

export type PodcastDetail = {
  id: string;
  title: string;
  image: string;
  author: string;
  summary: string;
  episodes: Episode[];
};

export type ApiPodcastDetail = {
  wrapperType: string;
  collectionId: number;
  collectionName: string;
  artworkUrl100: string;
  artistName: string;
  shortDescription?: string;
  longDescription?: string;
  description?: string;
  trackId: number;
  trackName: string;
  releaseDate: string;
  trackTimeMillis: number;
};
