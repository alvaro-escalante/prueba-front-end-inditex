import type { Podcast } from '@src/types/podcasts';

// Constantes para el almacenamiento local
const CACHE_KEY = 'podcastData';
const CACHE_EXPIRY = 'podcastDataExpiry';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

// Guarda los podcasts en el almacenamiento localStorage
export const getCachedPodcasts = () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedDate = localStorage.getItem(CACHE_EXPIRY);
  const now = new Date().getTime();

  if (cachedData && cachedDate && now < parseInt(cachedDate)) {
    return JSON.parse(cachedData) as Podcast[];
  }

  return null;
};

// Obtiene los podcasts del almacenamiento localStorage
export const setCachedPodcasts = (podcasts: Podcast[]) => {
  const now = new Date().getTime();
  console.log('Setting cached podcasts:', podcasts);
  localStorage.setItem(CACHE_KEY, JSON.stringify(podcasts));
  localStorage.setItem(CACHE_EXPIRY, (now + CACHE_DURATION).toString());
};
