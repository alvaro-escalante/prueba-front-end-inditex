import { http, HttpResponse } from 'msw';

export const handlers = [
  // Intercept
  http.get('https://example.com/user', () => {
    // Respuesta
    return HttpResponse.json({});
  }),
];
