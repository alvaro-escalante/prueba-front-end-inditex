import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { server } from './mocks/server';
// Hacer userEvent global para que se pueda usar en todos los test
global.userEvent = userEvent;

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that are declared as a part of our tests
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
