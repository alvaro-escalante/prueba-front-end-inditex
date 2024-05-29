import { usePodcastDetail } from '@application/usePodcastDetail';
import Layout from '@presentation/layout/Layout';
import Detail from '@presentation/pages/Detail/Detail';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Mock el hook usePodcastDetail
jest.mock('@application/usePodcastDetail', () => ({
  usePodcastDetail: jest.fn(),
}));

// Utilidad para renderizar Detail con la ruta correcta
const renderDetailWithRoute = (podcastId: string) => {
  render(
    <MemoryRouter initialEntries={[`/podcast/${podcastId}`]}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="podcast/:podcastId" element={<Detail />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
};

describe('Detail renderiza correctamente', () => {
  // Resetea el mock antes de cada test
  beforeEach(() => {
    (usePodcastDetail as jest.Mock).mockReset();
  });

  it('Muestra correctamente la carga antes de que se obtengan los datos', () => {
    (usePodcastDetail as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    renderDetailWithRoute('123');
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });

  it('Muestra error cuando falla la obtención de datos ', () => {
    (usePodcastDetail as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: 'Failed to fetch podcast details',
    });

    renderDetailWithRoute('123');
    expect(
      screen.getByText(/Error: Failed to fetch podcast details/i),
    ).toBeInTheDocument();
  });

  it('Renderiza podcast correctamente cuando hay datos', () => {
    (usePodcastDetail as jest.Mock).mockReturnValue({
      data: {
        id: '123',
        title: 'Incredible Podcast',
        episodes: [
          {
            id: '1',
            title: 'First Episode',
            publicationDate: '2021-10-01',
            duration: 3600,
          },
        ],
      },
      loading: false,
      error: null,
    });

    renderDetailWithRoute('123');
    expect(screen.getByText('Incredible Podcast')).toBeInTheDocument();
    expect(screen.getByText('Episodes: 1')).toBeInTheDocument();
    expect(screen.getByText('First Episode')).toBeInTheDocument();
    expect(screen.getByText('01/10/2021')).toBeInTheDocument();
  });

  it('Renderiza varios episodios correctamente', () => {
    (usePodcastDetail as jest.Mock).mockReturnValue({
      data: {
        id: '123',
        title: 'Incredible Podcast',
        episodes: [
          {
            id: '1',
            title: 'First Episode',
            publicationDate: '2021-10-01',
            duration: 3600000,
          },
          {
            id: '2',
            title: 'Second Episode',
            publicationDate: '2021-10-02',
            duration: 7200000,
          },
        ],
      },
      loading: false,
      error: null,
    });

    renderDetailWithRoute('123');
    expect(screen.getByText('First Episode')).toBeInTheDocument();
    expect(screen.getByText('Second Episode')).toBeInTheDocument();
    expect(screen.getByText('01:00:00')).toBeInTheDocument();
    expect(screen.getByText('02:00:00')).toBeInTheDocument();
  });
});
