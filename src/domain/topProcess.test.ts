import type { ApiPodcast, Podcast } from '@src/types/podcastsTops';

import processPodcasts from './topProcess';

describe('processPodcasts', () => {
  it('Procesa podcasts correctamente', () => {
    const apiPodcasts: ApiPodcast[] = [
      {
        id: { attributes: { 'im:id': '123' } },
        'im:name': { label: 'Test Podcast' },
        'im:image': [
          { label: 'https://example.com/podcast-small.jpg' },
          { label: 'https://example.com/podcast-medium.jpg' },
          { label: 'https://example.com/podcast-large.jpg' },
        ],
        'im:artist': { label: 'Test Author' },
        summary: { label: 'Test Summary' },
      },
    ];

    const expectedPodcasts: Podcast[] = [
      {
        id: '123',
        title: 'Test Podcast',
        image: 'https://example.com/podcast-large.jpg',
        author: 'Test Author',
        summary: 'Test Summary',
      },
    ];

    const result = processPodcasts(apiPodcasts);

    expect(result).toEqual(expectedPodcasts);
  });

  it('Maneja lista vacía de podcasts', () => {
    const apiPodcasts: ApiPodcast[] = [];
    const expectedPodcasts: Podcast[] = [];

    const result = processPodcasts(apiPodcasts);

    expect(result).toEqual(expectedPodcasts);
  });
});
