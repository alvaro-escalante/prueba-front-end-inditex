import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Sidebar from './Sidebar';

describe('Sidebar', () => {
  const podcast = {
    id: '1',
    image: 'test-image.jpg',
    author: 'Test Author',
    summary: 'Test Summary',
    episodes: [],
    title: 'Test Podcast',
    description: 'This is a test podcast',
  };

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <Sidebar podcast={podcast} />
      </MemoryRouter>,
    );
  };

  it('Renderiza el componente Sidebar', () => {
    renderComponent();

    const titleElement = screen.getByText(podcast.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('Verifica si el enlace del podcast está presente', async () => {
    renderComponent();

    const linkElements = screen.getAllByRole('link');

    const podcastLink = linkElements.find(
      (link) => link.getAttribute('href') === `/podcast/${podcast.id}`,
    );
    expect(podcastLink).toBeDefined();
  });
});
