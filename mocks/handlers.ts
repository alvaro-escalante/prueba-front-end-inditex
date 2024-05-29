import { http, HttpResponse } from 'msw';

export const handlers = [
  // Top podcast
  http.get('https://api.allorigins.win/get', async ({ request }) => {
    const urlString = new URL(request.url);
    const url = urlString.searchParams.get('url');

    if (
      url ===
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
    ) {
      return HttpResponse.json(
        {
          contents: JSON.stringify({
            feed: {
              entry: [
                {
                  id: { attributes: { 'im:id': '123' } },
                  'im:name': { label: 'Test Podcast' },
                  'im:image': { label: 'https://example.com/podcast.jpg' },
                  'im:author': { label: 'Test Author' },
                },
              ],
            },
          }),
        },
        { status: 200 },
      );
    }
    if (
      url ===
      'https://itunes.apple.com/lookup?id=123&media=podcast&entity=podcastEpisode&limit=20'
    ) {
      return HttpResponse.json(
        {
          contents: JSON.stringify({
            results: [
              {
                wrapperType: 'track',
                collectionId: 123,
                collectionName: 'Test Podcast Collection',
                artworkUrl100: 'https://example.com/podcast.jpg',
                artistName: 'Test Artist',
                shortDescription: 'Short description of the podcast.',
                longDescription: 'Long description of the podcast.',
                description: 'Detailed description of the podcast.',
                trackId: 456,
                trackName: 'Test Podcast Episode',
                releaseDate: '2021-01-01T00:00:00Z',
                trackTimeMillis: 3000000,
                episodeUrl: 'https://example.com/episode.mp3',
              },
            ],
          }),
        },
        { status: 200 },
      );
    }
    return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
  }),
];
