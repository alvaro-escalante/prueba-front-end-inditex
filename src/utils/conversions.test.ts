import {
  formatDateString,
  secondsToTimeString,
  formatDesc,
} from './conversions';

describe('Formatear fecha', () => {
  it('Devuelve una cadena de fecha ISO en el formato DD/MM/YYYY', () => {
    const isoDateString = '2022-01-01T00:00:00Z';
    const formattedDateString = formatDateString(isoDateString);
    expect(formattedDateString).toBe('01/01/2022');
  });

  it('Devuelve una cadena vacía si la entrada no es una cadena de fecha ISO válida', () => {
    const invalidDateString = 'not-a-date';
    const formattedDateString = formatDateString(invalidDateString);
    expect(formattedDateString).toBe('');
  });
});

describe('Milisegundos a minutos y segundos', () => {
  it('debería convertir milisegundos en el formato HH:MM:SS', () => {
    const milliseconds = 3661000;
    const timeString = secondsToTimeString(milliseconds);
    expect(timeString).toBe('01:01:01');
  });

  it('debería devolver una cadena vacía si la entrada no es un número válido', () => {
    const invalidMilliseconds = NaN;
    const timeString = secondsToTimeString(invalidMilliseconds);
    expect(timeString).toBe('');
  });
});

describe('Formatear saltos de lineas', () => {
  it('Devuelve una cadena de texto con saltos de línea en párrafos HTML', () => {
    const description = 'Línea 1\nLínea 2\nLínea 3';
    const formattedDesc = formatDesc(description);
    expect(formattedDesc).toBe('<p>Línea 1</p><p>Línea 2</p><p>Línea 3</p>');
  });

  it('Devuelve una cadena vacía si la entrada es indefinida', () => {
    const undefinedDesc = undefined;
    const formattedDesc = formatDesc(undefinedDesc);
    expect(formattedDesc).toBe('');
  });
});
