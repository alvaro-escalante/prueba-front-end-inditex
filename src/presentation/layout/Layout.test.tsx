import { LoadingProvider } from '@presentation/context/LoadingContext';
import Home from '@presentation/pages/Home/Home';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './Layout';

// Utlidad para renderizar el Layout con el contexto de carga
const renderLayout = () => {
  return render(
    <BrowserRouter>
      <LoadingProvider>
        <Layout />
      </LoadingProvider>
    </BrowserRouter>,
  );
};

// Utilidad para simular el hook useLoading
const mockUseLoading = (loading: boolean) => {
  jest.doMock('@presentation/context/LoadingContext', () => ({
    ...jest.requireActual('@presentation/context/LoadingContext'),
    useLoading: jest.fn().mockReturnValue({ loading }),
  }));
};

// Mock de react-router-dom para simular el Outlet
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <Home />,
}));

// Reseteo de mocks
afterEach(() => {
  jest.resetAllMocks();
});

describe('Layout render', () => {
  it('Renderiza sin error', () => {
    renderLayout();
  });

  it('Contiene enlace a la vista principal', () => {
    renderLayout();

    const link = screen.getByRole('link', { name: /podcaster/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('Renderiza children con Outlet de react router', () => {
    renderLayout();

    const loadingText = screen.getByText(/loading.../i);
    expect(loadingText).toBeInTheDocument();
  });

  it('Pasa la propiedad isLoading correcta al componente Progress', () => {
    mockUseLoading(true);

    renderLayout();

    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuetext', 'true');
  });

  it('No muestra el indicador visual cuando no está cargando', async () => {
    mockUseLoading(false);

    renderLayout();

    await waitFor(() => {
      const progressBar = screen.queryByRole('progressbar');
      expect(progressBar).not.toBeInTheDocument();
    });
  });
});
