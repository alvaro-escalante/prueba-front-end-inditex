// Convertir una fecha en formato ISO a una fecha en formato DD/MM/YYYY
export function formatDateString(dateTimeString: string): string {
  const date = new Date(dateTimeString);

  if (isNaN(date.getTime())) {
    return '';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// Convertir milisegundos a una cadena de tiempo en formato HH:MM:SS
export function secondsToTimeString(milliseconds: number): string {
  if (isNaN(milliseconds)) {
    return '';
  }
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Formatear los números a dos dígitos
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  if (hours > 0) {
    const formattedHours = String(hours).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `${formattedMinutes}:${formattedSeconds}`;
  }
}

// Convertir una cadena de texto con saltos de línea a un HTML con párrafos
export function formatDesc(description?: string): string {
  // Sino hay descripción retornar un string vacío
  if (!description) {
    return '';
  }
  // Split la string en líneas y mapear cada línea a un párrafo
  return description
    .split('\n')
    .map((line) => `<p>${line}</p>`)
    .join('');
}
