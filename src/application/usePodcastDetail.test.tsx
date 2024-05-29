import { renderHook, waitFor } from '@testing-library/react';
import { usePodcastDetail } from './usePodcastDetail';
import { getPodcastDetails } from '@domain/detailService';
import { PodcastDetail } from '@src/types/podcastDetail';

// Mock la función getPodcastDetails
jest.mock('@domain/detailService', () => ({
  getPodcastDetails: jest.fn(),
}));

describe('usePodcastDetail', () => {
  it('Fetches los datos de detalles del podcast exitosamente', async () => {
    const mockPodcastDetail: PodcastDetail = {
      id: '123',
      title: 'Test Podcast',
      image: 'https://example.com/podcast.jpg',
      author: 'Test Author',
      summary: 'Test Summary',
      episodes: [],
    };

    (getPodcastDetails as jest.Mock).mockResolvedValue(mockPodcastDetail);

    const { result } = renderHook(() => usePodcastDetail('123'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockPodcastDetail);
    expect(result.current.error).toBeNull();
  });

  it('Maneja error correctamente', async () => {
    const errorMessage = 'Failed to fetch';

    (getPodcastDetails as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => usePodcastDetail('123'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(errorMessage);
  });
});
