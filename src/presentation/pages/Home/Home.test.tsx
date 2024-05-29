import { usePodcastData } from '@application/usePodcastTop';
import Layout from '@presentation/layout/Layout';
import Home from '@presentation/pages/Home/Home';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Mock de usePodcastData
jest.mock('@application/usePodcastTop', () => ({
  usePodcastData: jest.fn(),
}));

// Utilidad para renderizar Home con Layout
const renderHome = () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>,
  );
};

describe('Renderiza correctamente con y sin data', () => {
  // Reset the mock before each test
  beforeEach(() => {
    (usePodcastData as jest.Mock).mockReset();
  });

  it('Muestra loading correctamente antes de obtener los datos', () => {
    const usePodcastDataMock = jest.fn().mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    (usePodcastData as jest.Mock) = usePodcastDataMock;

    renderHome();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('Renderiza correctamente', () => {
    const usePodcastDataMock = jest.fn().mockReturnValue({
      data: [
        {
          id: '123',
          title: 'Test Podcast',
          image: 'https://example.com/podcast.jpg',
          author: 'Test Author',
        },
      ],
      loading: false,
      error: null,
    });

    (usePodcastData as jest.Mock) = usePodcastDataMock;

    renderHome();
    // Validar que el podcast se renderiza correctamente
    const image = screen.getByAltText('Test Podcast') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://example.com/podcast.jpg');
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
  });

  it('Validar que se muestra un mensaje de error cuando falla', () => {
    const usePodcastDataMock = jest.fn().mockReturnValue({
      data: null,
      loading: false,
      error: 'Failed to fetch podcasts',
    });
    (usePodcastData as jest.Mock) = usePodcastDataMock;

    renderHome();
    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });
});

describe('Filtrado podcasts', () => {
  // Aplicar el mock de usePodcastData
  const usePodcastDataMock = jest.fn().mockReturnValue({
    data: [
      {
        id: '1',
        title: 'Test Podcast 1',
        image: 'https://example.com/podcast1.jpg',
        author: 'Author 1',
      },
      {
        id: '2',
        title: 'Test Podcast 2',
        image: 'https://example.com/podcast2.jpg',
        author: 'Author 2',
      },
    ],
    loading: false,
    error: null,
  });

  beforeEach(() => {
    // Aplicar el mock de usePodcastData
    (usePodcastData as jest.Mock) = usePodcastDataMock;
    renderHome();
  });

  it('Filtra podcasts correctamente por titulo', async () => {
    // Simular escribir en el input de filtro el titulo
    userEvent.type(
      screen.getByPlaceholderText('Filter podcast...'),
      'Test Podcast 1',
    );

    // Esperar a que se renderice el podcast correcto y verificar
    await waitFor(() => {
      expect(screen.getByText('Test Podcast 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Podcast 2')).not.toBeInTheDocument();
    });
  });

  it('Filtra podcasts correctamente por autor', async () => {
    // Simular escribir en el input de filtro el autor
    userEvent.type(
      screen.getByPlaceholderText('Filter podcast...'),
      'Author 1',
    );

    // Esperar a que se renderice el podcast correcto y verificar
    await waitFor(() => {
      expect(screen.getByText('Author: Author 1')).toBeInTheDocument();
      expect(screen.queryByText('Author: Author 2')).not.toBeInTheDocument();
    });
  });
});
