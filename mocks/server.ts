import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Configuracion para poder usar el server en los test
export const server = setupServer(...handlers);
