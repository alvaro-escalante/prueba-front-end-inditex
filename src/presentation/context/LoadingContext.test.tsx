import { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react';
import { LoadingProvider, useLoading } from './LoadingContext';

describe('Loading Context Provider', () => {
  it('Estableze el estado', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <LoadingProvider>{children}</LoadingProvider>
    );
    const { result } = renderHook(() => useLoading(), { wrapper });

    // Check initial state
    expect(result.current.loading).toBe(false);

    // Actualizar el estado
    act(() => {
      result.current.setLoading(true);
    });

    // Ahora el estado debería ser true
    expect(result.current.loading).toBe(true);
  });
});
