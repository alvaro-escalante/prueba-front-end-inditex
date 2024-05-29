// Adaptador para realizar peticiones a la API
export async function fetchFromApi<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Problema en la respuesta de la red');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
