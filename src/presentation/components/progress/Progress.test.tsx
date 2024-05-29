import { render } from '@testing-library/react';

import Progress from './Progress';

describe('Progress component', () => {
  it('Muestrar el indicador visual cuando isLoading es true', () => {
    const { getByRole } = render(<Progress isLoading={true} />);
    const spinnerElement = getByRole('progressbar');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement.getAttribute('aria-valuetext')).toBe('true');
  });

  it('No Muestra el indicador visual cuando isLoading es false', () => {
    const { queryByRole } = render(<Progress isLoading={false} />);
    const spinnerElement = queryByRole('progressbar');
    expect(spinnerElement).toBeNull();
  });
});
