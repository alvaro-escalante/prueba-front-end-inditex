export type ApiPodcast = {
  id: { attributes: { 'im:id': string } };
  'im:name': { label: string };
  'im:image': Array<{ label: string }>;
  'im:artist': { label: string };
  summary: { label: string };
};

export type Podcast = {
  id: string;
  title: string;
  image: string;
  author: string;
  summary: string;
};
