import { fetchPodcastDetails } from './detailRequest';

describe('fetchPodcastDetails', () => {
  it('fetches podcast detail data successfully', async () => {
    const podcastDetails = await fetchPodcastDetails('123');

    expect(podcastDetails).toHaveLength(1);
    const detail = podcastDetails[0];
    expect(detail.collectionId).toBe(123);
    expect(detail.collectionName).toBe('Test Podcast Collection');
    expect(detail.artworkUrl100).toBe('https://example.com/podcast.jpg');
    expect(detail.artistName).toBe('Test Artist');
    expect(detail.trackId).toBe(456);
    expect(detail.trackName).toBe('Test Podcast Episode');
    expect(detail.releaseDate).toBe('2021-01-01T00:00:00Z');
    expect(detail.trackTimeMillis).toBe(3000000);
    expect(detail.episodeUrl).toBe('https://example.com/episode.mp3');
    expect(detail.description).toBe('Detailed description of the podcast.');
  });
});
