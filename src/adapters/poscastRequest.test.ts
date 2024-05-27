import { fetchPodcasts } from './podcastsRequest';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';

describe('fetchPodcasts', () => {
  it('should fetch and return the top podcasts', async () => {
    const podcasts = await fetchPodcasts();
    expect(podcasts).toEqual([
      {
        id: { attributes: { 'im:id': '123' } },
        'im:name': { label: 'Test Podcast' },
      },
    ]);
  });

  it('should throw an error if the network response is not ok', async () => {
    server.use(
      http.get('https://api.allorigins.win/get', () => {
        return HttpResponse.json(
          { message: 'Network response was not ok' },
          { status: 500 },
        );
      }),
    );

    await expect(fetchPodcasts()).rejects.toThrow(
      'Network response was not ok',
    );
  });

  it('should handle fetch errors', async () => {
    server.use(
      http.get('https://api.allorigins.win/get', () => {
        return HttpResponse.json(
          { message: 'Network response was not ok' },
          { status: 500 },
        );
      }),
    );

    await expect(fetchPodcasts()).rejects.toThrow(
      'Network response was not ok',
    );
  });
});
