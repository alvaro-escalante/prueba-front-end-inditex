import { renderHook, act } from '@testing-library/react-hooks';
import { usePodcastData } from './usePodcastData';
import { getPodcasts } from '@domain/podcastService';

jest.mock('@domain/podcastService');

describe('usePodcastData', () => {
  it('fetches podcasts on mount', async () => {
    const mockPodcasts = [
      { id: '1', name: 'Podcast 1', url: 'http://example.com/1' },
      { id: '2', name: 'Podcast 2', url: 'http://example.com/2' },
    ];

    (getPodcasts as jest.Mock).mockResolvedValue(mockPodcasts);

    const { result, waitForNextUpdate } = renderHook(() => usePodcastData());

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockPodcasts);
    expect(result.current.error).toBe(null);
  });

  it('sets error state when fetch fails', async () => {
    const mockError = new Error('Failed to fetch podcasts');

    (getPodcasts as jest.Mock).mockRejectedValue(mockError);

    const { result, waitForNextUpdate } = renderHook(() => usePodcastData());

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch podcasts');
  });
});
