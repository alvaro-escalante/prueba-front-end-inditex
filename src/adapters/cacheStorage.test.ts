import { getCachedData, setCachedData, CACHE_DURATION } from './cacheStorage';

type CacheData = {
  property1: string;
  property2: number;
};

describe('Cache Utils', () => {
  const mockSetItem = jest.fn();
  const mockGetItem = jest.fn();
  const mockClear = jest.fn();

  beforeAll(() => {
    // Simular los métodos de localStorage
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem,
        clear: mockClear,
      },
      writable: true,
    });
  });

  beforeEach(() => {
    // Clear all mocks before each test
    mockSetItem.mockClear();
    mockGetItem.mockClear();
    mockClear.mockClear();
  });

  it('Establece y obtiene datos en caché', () => {
    const cacheKey = 'testCacheKey';
    const expiryKey = 'testExpiryKey';
    const testData = { key: 'value' };

    // Mock Date.now() para controlar el tiempo
    const now = Date.now();
    jest.spyOn(Date, 'now').mockImplementation(() => now);

    // Set the cached data
    setCachedData(cacheKey, expiryKey, testData, CACHE_DURATION);

    // Verificar que localStorage.setItem fue llamado con los datos correctos
    expect(mockSetItem).toHaveBeenCalledWith(
      cacheKey,
      JSON.stringify(testData),
    );
    expect(mockSetItem).toHaveBeenCalledWith(
      expiryKey,
      (now + CACHE_DURATION).toString(),
    );

    // Mock localStorage.getItem para devolver los datos almacenados
    mockGetItem.mockImplementation((key) => {
      if (key === cacheKey) return JSON.stringify(testData);
      if (key === expiryKey) return (now + CACHE_DURATION).toString();
      return null;
    });

    // Cache data
    const cachedData = getCachedData<typeof testData>(cacheKey, expiryKey);

    // Verificar que los datos almacenados son iguales a los datos originales
    expect(cachedData).toEqual(testData);
  });

  it('Devuelve null si los datos caducan', () => {
    const cacheKey = 'testCacheKey';
    const expiryKey = 'testExpiryKey';
    const testData = { key: 'value' };

    // Mock Date.now() para controlar el tiempo
    const now = Date.now();
    jest.spyOn(Date, 'now').mockImplementation(() => now);

    // Mock localStorage.getItem con datos expirados
    mockGetItem.mockImplementation((key) => {
      if (key === cacheKey) return JSON.stringify(testData);
      if (key === expiryKey) return (now - 1000).toString(); // Expiry time in the past
      return null;
    });

    // Optener los datos almacenados en caché
    const cachedData = getCachedData<typeof testData>(cacheKey, expiryKey);

    // Verifirar que los datos almacenados son nulos
    expect(cachedData).toBeNull();
  });

  it('Devuelve null si no se encuentran datos en caché', () => {
    const cacheKey = 'testCacheKey';
    const expiryKey = 'testExpiryKey';

    // Mock localStorage.getItem para devolver null
    mockGetItem.mockImplementation(() => null);

    // Optener los datos almacenados en caché
    const cachedData = getCachedData<CacheData>(cacheKey, expiryKey);

    // verificar que los datos almacenados son nulos
    expect(cachedData).toBeNull();
  });
});
