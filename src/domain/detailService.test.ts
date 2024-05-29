import { getCachedData, setCachedData } from '@adapters/cacheStorage';
import { fetchPodcastDetails } from '@adapters/detailRequest';
import processPodcastDetail from '@domain/detailProcess';
import { getPodcasts } from '@domain/topService';
import type { PodcastDetail, ApiPodcastDetail } from '@src/types/podcastDetail';
import type { Podcast } from '@src/types/podcastsTops';

import { getPodcastDetails } from './detailService';

jest.mock('@adapters/cacheStorage', () => ({
  getCachedData: jest.fn(),
  setCachedData: jest.fn(),
}));

jest.mock('@adapters/detailRequest', () => ({
  fetchPodcastDetails: jest.fn(),
}));

jest.mock('@domain/detailProcess', () => jest.fn());

jest.mock('@domain/topService', () => ({
  getPodcasts: jest.fn(),
}));

describe('getPodcastDetails', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Retorna detalles del podcast en caché si están disponibles', async () => {
    const mockCachedPodcastDetail: PodcastDetail = {
      id: '123',
      title: 'Test Podcast',
      image: 'https://example.com/podcast.jpg',
      author: 'Test Author',
      summary: 'Test Summary',
      episodes: [],
    };

    (getCachedData as jest.Mock).mockReturnValue(mockCachedPodcastDetail);

    const result = await getPodcastDetails('123');

    expect(getCachedData).toHaveBeenCalledWith(
      'podcastDetailData_123',
      'podcastDetailDataExpiry_123',
    );
    expect(result).toEqual(mockCachedPodcastDetail);
    expect(fetchPodcastDetails).not.toHaveBeenCalled();
    expect(setCachedData).not.toHaveBeenCalled();
  });

  it('Obtiene, procesa y almacena en caché los detalles del podcast si no están en caché', async () => {
    const mockApiPodcastDetails: ApiPodcastDetail[] = [
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

    const mockProcessedPodcastDetail: PodcastDetail = {
      id: '123',
      title: 'Test Podcast Collection',
      image: 'https://example.com/podcast.jpg',
      author: 'Test Artist',
      summary: 'Test Summary',
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

    const mockTopPodcasts: Podcast[] = [
      {
        id: '123',
        title: 'Test Podcast Collection',
        image: 'https://example.com/podcast.jpg',
        author: 'Test Author',
        summary: 'Test Summary',
      },
    ];

    (getCachedData as jest.Mock).mockReturnValue(null);
    (fetchPodcastDetails as jest.Mock).mockResolvedValue(mockApiPodcastDetails);
    (processPodcastDetail as jest.Mock).mockReturnValue(
      mockProcessedPodcastDetail,
    );
    (getPodcasts as jest.Mock).mockResolvedValue(mockTopPodcasts);

    const result = await getPodcastDetails('123');

    expect(getCachedData).toHaveBeenCalledWith(
      'podcastDetailData_123',
      'podcastDetailDataExpiry_123',
    );
    expect(fetchPodcastDetails).toHaveBeenCalledWith('123');
    expect(processPodcastDetail).toHaveBeenCalledWith(
      mockApiPodcastDetails,
      'Test Summary',
    );
    expect(setCachedData).toHaveBeenCalledWith(
      'podcastDetailData_123',
      'podcastDetailDataExpiry_123',
      mockProcessedPodcastDetail,
    );
    expect(result).toEqual(mockProcessedPodcastDetail);
  });
});
