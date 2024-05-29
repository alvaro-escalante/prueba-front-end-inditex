import { renderHook, waitFor } from '@testing-library/react';
import { useEpisodeDetails } from './usePodcastEpisode';

import { getPodcastDetails } from '@domain/detailService';
import { PodcastDetail, Episode } from '@src/types/podcastDetail';

// Mock la función getPodcastDetails
jest.mock('@domain/detailService', () => ({
  getPodcastDetails: jest.fn(),
}));

describe('useEpisodeDetails', () => {
  it('Fetch detalles del episodio exitosamente con el episodio inicia', async () => {
    const initialEpisode: Episode = {
      id: '456',
      title: 'Test Episode',
      publicationDate: '2021-01-01T00:00:00Z',
      description: 'Test Description',
      duration: 3600,
      audioUrl: 'https://example.com/episode.mp3',
    };

    const mockPodcastDetail: PodcastDetail = {
      id: '123',
      title: 'Test Podcast',
      image: 'https://example.com/podcast.jpg',
      author: 'Test Author',
      summary: 'Test Summary',
      episodes: [initialEpisode],
    };

    (getPodcastDetails as jest.Mock).mockResolvedValue(mockPodcastDetail);

    const { result } = renderHook(() =>
      useEpisodeDetails('123', '456', initialEpisode),
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.podcast).toEqual(mockPodcastDetail);
    expect(result.current.episode).toEqual(initialEpisode);
    expect(result.current.error).toBeNull();
  });

  it('Fetches los detalles del episodio exitosamente sin el episodio inicial', async () => {
    const mockEpisode: Episode = {
      id: '456',
      title: 'Test Episode',
      publicationDate: '2021-01-01T00:00:00Z',
      description: 'Test Description',
      duration: 3600,
      audioUrl: 'https://example.com/episode.mp3',
    };

    const mockPodcastDetail: PodcastDetail = {
      id: '123',
      title: 'Test Podcast',
      image: 'https://example.com/podcast.jpg',
      author: 'Test Author',
      summary: 'Test Summary',
      episodes: [mockEpisode],
    };

    (getPodcastDetails as jest.Mock).mockResolvedValue(mockPodcastDetail);

    const { result } = renderHook(() => useEpisodeDetails('123', '456'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.podcast).toEqual(mockPodcastDetail);
    expect(result.current.episode).toEqual(mockEpisode);
    expect(result.current.error).toBeNull();
  });

  it('Maneja error correctamente', async () => {
    const errorMessage = 'Failed to fetch';

    (getPodcastDetails as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useEpisodeDetails('123', '456'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.podcast).toBeNull();
    expect(result.current.episode).toBeNull();
    expect(result.current.error).toBe(errorMessage);
  });
});
