import type { ApiPodcastDetail, PodcastDetail } from '@src/types/podcastDetail';

import processPodcastDetail from './detailProcess';

describe('processPodcastDetail', () => {
  it('Procesa los detalles del podcast y los episodios correctamente', () => {
    const apiData: ApiPodcastDetail[] = [
      {
        wrapperType: 'track',
        collectionId: 123,
        collectionName: 'Test Podcast Collection',
        artworkUrl100: 'https://example.com/podcast.jpg',
        artistName: 'Test Artist',
        description: 'Podcast description',
        trackId: 1,
        trackName: '',
        releaseDate: '',
        trackTimeMillis: 0,
        episodeUrl: '',
      },
      {
        wrapperType: 'podcastEpisode',
        trackId: 456,
        trackName: 'Test Podcast Episode',
        releaseDate: '2021-01-01T00:00:00Z',
        description: 'Detailed description of the podcast episode.',
        trackTimeMillis: 3000000,
        episodeUrl: 'https://example.com/episode.mp3',
        collectionId: 0,
        collectionName: '',
        artworkUrl100: '',
        artistName: '',
      },
    ];

    const summary = 'Test Podcast Summary';
    const expectedPodcastDetail: PodcastDetail = {
      id: '123',
      title: 'Test Podcast Collection',
      image: 'https://example.com/podcast.jpg',
      author: 'Test Artist',
      summary: 'Test Podcast Summary',
      episodes: [
        {
          id: '456',
          title: 'Test Podcast Episode',
          publicationDate: '2021-01-01T00:00:00Z',
          description: 'Detailed description of the podcast episode.',
          duration: 3000000,
          audioUrl: 'https://example.com/episode.mp3',
        },
      ],
    };

    const result = processPodcastDetail(apiData, summary);

    expect(result).toEqual(expectedPodcastDetail);
  });

  it('Arroja un error si no se encuentran datos del podcast', () => {
    const apiData: ApiPodcastDetail[] = [
      {
        wrapperType: 'podcastEpisode',
        trackId: 456,
        trackName: 'Test Podcast Episode',
        releaseDate: '2021-01-01T00:00:00Z',
        description: 'Detailed description of the podcast episode.',
        trackTimeMillis: 3000000,
        episodeUrl: 'https://example.com/episode.mp3',
        collectionId: 0,
        collectionName: '',
        artworkUrl100: '',
        artistName: '',
      },
    ];

    const summary = 'Test Podcast Summary';

    expect(() => processPodcastDetail(apiData, summary)).toThrow(
      'Data del podcast no encontrado',
    );
  });
});
