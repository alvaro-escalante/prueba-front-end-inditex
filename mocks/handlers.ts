import { http, HttpResponse } from 'msw';

export const handlers = [
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
                },
              ],
            },
          }),
        },
        { status: 200 },
      );
    }
    return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
  }),
];
