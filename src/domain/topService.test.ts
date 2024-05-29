import { getCachedData, setCachedData } from '@adapters/cacheStorage';
import { fetchTopPodcasts } from '@adapters/topRequest';
import processPodcasts from '@domain/topProcess';
import type { Podcast, ApiPodcast } from '@src/types/podcastsTops';

import { getPodcasts } from './topService';

jest.mock('@adapters/cacheStorage', () => ({
  getCachedData: jest.fn(),
  setCachedData: jest.fn(),
}));

jest.mock('@adapters/topRequest', () => ({
  fetchTopPodcasts: jest.fn(),
}));

jest.mock('@domain/topProcess', () => jest.fn());

describe('getPodcasts', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Retorna podcasts en caché si están disponibles', async () => {
    const mockCachedPodcasts: Podcast[] = [
      {
        id: '123',
        title: 'Test Podcast',
        image: 'https://example.com/podcast.jpg',
        author: 'Test Author',
        summary: 'Test Summary',
      },
    ];

    (getCachedData as jest.Mock).mockReturnValue(mockCachedPodcasts);

    const result = await getPodcasts();

    expect(getCachedData).toHaveBeenCalledWith(
      'podcastData',
      'podcastDataExpiry',
    );
    expect(result).toEqual(mockCachedPodcasts);
    expect(fetchTopPodcasts).not.toHaveBeenCalled();
    expect(setCachedData).not.toHaveBeenCalled();
  });

  it('Obtiene, procesa y almacena en caché los podcasts si no están en caché', async () => {
    const mockApiPodcasts: ApiPodcast[] = [
      {
        id: { attributes: { 'im:id': '123' } },
        'im:name': { label: 'Test Podcast' },
        'im:image': [
          { label: 'https://example.com/podcast-small.jpg' },
          { label: 'https://example.com/podcast-medium.jpg' },
          { label: 'https://example.com/podcast-large.jpg' },
        ],
        'im:artist': { label: 'Test Author' },
        summary: { label: 'Test Summary' },
      },
    ];

    const mockProcessedPodcasts: Podcast[] = [
      {
        id: '123',
        title: 'Test Podcast',
        image: 'https://example.com/podcast-large.jpg',
        author: 'Test Author',
        summary: 'Test Summary',
      },
    ];

    (getCachedData as jest.Mock).mockReturnValue(null);
    (fetchTopPodcasts as jest.Mock).mockResolvedValue(mockApiPodcasts);
    (processPodcasts as jest.Mock).mockReturnValue(mockProcessedPodcasts);

    const result = await getPodcasts();

    expect(getCachedData).toHaveBeenCalledWith(
      'podcastData',
      'podcastDataExpiry',
    );
    expect(fetchTopPodcasts).toHaveBeenCalled();
    expect(processPodcasts).toHaveBeenCalledWith(mockApiPodcasts);
    expect(setCachedData).toHaveBeenCalledWith(
      'podcastData',
      'podcastDataExpiry',
      mockProcessedPodcasts,
    );
    expect(result).toEqual(mockProcessedPodcasts);
  });
});
