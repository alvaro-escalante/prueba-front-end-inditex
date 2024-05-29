import { fetchTopPodcasts } from './topRequest';

describe('fetchTopPodcasts', () => {
  it('fetches top podcasts data successfully', async () => {
    const podcasts = await fetchTopPodcasts();

    expect(podcasts).toHaveLength(1);
    const podcast = podcasts[0];
    expect(podcast.id.attributes['im:id']).toBe('123');
    expect(podcast['im:name'].label).toBe('Test Podcast');
    expect(podcast['im:image'].label).toBe('https://example.com/podcast.jpg');
    expect(podcast['im:author'].label).toBe('Test Author');
  });
});
