import { createContext, useState, useContext, ReactNode } from 'react';

// Definir el estado de loading
const loadingState = () => {
  const [loading, setLoading] = useState(false);
  return { loading, setLoading };
};

// Inferir el tipo de retorno de la función loadingState
type LoadingContextProps = ReturnType<typeof loadingState>;

// Crear el contexto de loading
const LoadingContext = createContext<LoadingContextProps | null>(null);

// Hook para consumir el estado de loading
export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading solo se puede utilizar en LoadingProvider');
  }
  return context;
};

// Proveedor de contexto para el estado de loading
export const LoadingProvider = ({ children }: { children: ReactNode }) => (
  <LoadingContext.Provider value={loadingState()}>
    {children}
  </LoadingContext.Provider>
);
