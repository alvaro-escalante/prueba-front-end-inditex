import { renderHook, waitFor } from '@testing-library/react';
import { usePodcastData } from './usePodcastTop';

import { getPodcasts } from '@domain/topService';
import { Podcast } from '@src/types/podcastsTops';

// Mock de la función getPodcasts
jest.mock('@domain/topService', () => ({
  getPodcasts: jest.fn(),
}));

describe('usePodcastData', () => {
  it('fetches podcast data successfully', async () => {
    const mockPodcasts: Podcast[] = [
      {
        id: '123',
        title: 'Test Podcast',
        image: 'https://example.com/podcast.jpg',
        author: 'Test Author',
        summary: 'Test Summary',
      },
    ];

    (getPodcasts as jest.Mock).mockResolvedValue(mockPodcasts);

    const { result } = renderHook(() => usePodcastData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockPodcasts);
    expect(result.current.error).toBeNull();
  });

  it('handles error correctly', async () => {
    const errorMessage = 'Failed to fetch';

    (getPodcasts as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => usePodcastData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });
});
