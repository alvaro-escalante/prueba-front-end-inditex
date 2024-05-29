export const CACHE_DURATION = 24 * 60 * 60 * 1000; // Default duration of 24 hours

// Funcion retulizable para obtener datos de LocalStorage
export const getCachedData = <T>(
  cacheKey: string,
  expiryKey: string,
): T | null => {
  const cachedData = localStorage.getItem(cacheKey);
  const cachedExpiry = localStorage.getItem(expiryKey);
  const now = new Date().getTime();

  if (cachedData && cachedExpiry && now < parseInt(cachedExpiry)) {
    return JSON.parse(cachedData) as T;
  }

  return null;
};

// Funcion retulizable para establecer datos del LocalStorage
export const setCachedData = <T>(
  cacheKey: string,
  expiryKey: string,
  data: T,
  duration: number = CACHE_DURATION,
): void => {
  const now = new Date().getTime();
  localStorage.setItem(cacheKey, JSON.stringify(data));
  localStorage.setItem(expiryKey, (now + duration).toString());
};
