import type { ApiPodcastDetail } from '@src/types/podcastDetail';

import { fetchFromApi } from './apiRequest';

describe('fetchFromApi', () => {
  it('fetches podcast data successfully', async () => {
    const targetUrl =
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
    const apiUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
      targetUrl,
    )}`;

    const data = await fetchFromApi<{ contents: string }>(apiUrl);

    if (typeof data.contents === 'string') {
      const parsedData = JSON.parse(data.contents);

      expect(parsedData.feed).toBeDefined();
      expect(parsedData.feed.entry).toHaveLength(1);
      expect(parsedData.feed.entry[0]['im:name'].label).toBe('Test Podcast');
    } else {
      throw new Error('Expected contents to be a string');
    }
  });

  it('fetches podcast detail data successfully', async () => {
    const targetUrl =
      'https://itunes.apple.com/lookup?id=123&media=podcast&entity=podcastEpisode&limit=20';
    const apiUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
      targetUrl,
    )}`;

    const data = await fetchFromApi<{ contents: string }>(apiUrl);

    if (typeof data.contents === 'string') {
      const parsedData = JSON.parse(data.contents);
      const podcastDetail: ApiPodcastDetail = parsedData.results[0];

      expect(podcastDetail).toHaveProperty('collectionId', 123);
      expect(podcastDetail).toHaveProperty(
        'collectionName',
        'Test Podcast Collection',
      );
      expect(podcastDetail).toHaveProperty(
        'artworkUrl100',
        'https://example.com/podcast.jpg',
      );
      expect(podcastDetail).toHaveProperty('artistName', 'Test Artist');
      expect(podcastDetail).toHaveProperty('trackName', 'Test Podcast Episode');
      expect(podcastDetail).toHaveProperty(
        'releaseDate',
        '2021-01-01T00:00:00Z',
      );
      expect(podcastDetail).toHaveProperty(
        'episodeUrl',
        'https://example.com/episode.mp3',
      );
    } else {
      throw new Error('Expected contents to be a string');
    }
  });
});
