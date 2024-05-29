import { useEpisodeDetails } from '@application/usePodcastEpisode';
import Episode from '@presentation/pages/Episode/Episode';
import { render, screen } from '@testing-library/react';
import {
  MemoryRouter,
  Routes,
  Route,
  useParams,
  useLocation,
} from 'react-router-dom';

jest.mock('@application/usePodcastEpisode');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

describe('Episode Component Tests', () => {
  beforeEach(() => {
    // Mock useParams y useLocation
    (useParams as jest.Mock).mockReturnValue({
      podcastId: '123',
      episodeId: '456',
    });
    (useLocation as jest.Mock).mockReturnValue({
      state: {
        episode: {
          title: 'Initial Episode',
          description: 'Initial Description',
          audioUrl: 'http://example.com/audio.mp3',
        },
      },
    });

    (useEpisodeDetails as jest.Mock).mockReturnValue({
      podcast: { id: '123', title: 'Test Podcast' },
      episode: {
        id: '456',
        title: 'Test Episode',
        description: 'Test Description',
        audioUrl: 'http://example.com/audio.mp3',
      },
      loading: false,
      error: null,
    });
  });

  const renderEpisode = () => {
    render(
      <MemoryRouter initialEntries={['/podcast/123/episode/456']}>
        <Routes>
          <Route
            path="podcast/:podcastId/episode/:episodeId"
            element={<Episode />}
          />
        </Routes>
      </MemoryRouter>,
    );
  };

  it('Renderiza los detalles del episodio correctamente', () => {
    renderEpisode();
    expect(screen.getByText('Test Episode')).toBeInTheDocument();
    expect(screen.getByText('Test Podcast')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByTestId('audio-element')).toBeInTheDocument();
  });

  it('Muestra el estado de carga correctamente', () => {
    (useEpisodeDetails as jest.Mock).mockReturnValue({
      podcast: null,
      episode: null,
      loading: true,
      error: null,
    });
    renderEpisode();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('Muestra un error cuando falla la obtención de datos ', () => {
    (useEpisodeDetails as jest.Mock).mockReturnValue({
      podcast: null,
      episode: null,
      loading: false,
      error: 'Failed to fetch episode details',
    });
    renderEpisode();
    expect(
      screen.getByText(/Error: Failed to fetch episode details/i),
    ).toBeInTheDocument();
  });
});
