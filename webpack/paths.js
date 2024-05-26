// Utilidades para manejar rutas de archivos
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
// ESM modules no tienen __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Definimos y exportamos las rutas principales

const rootDir = resolve(__dirname, '..');
const srcDir = resolve(rootDir, 'src');
const publicDir = resolve(rootDir, 'public');
const distDir = resolve(rootDir, 'dist');

export const paths = {
  root: rootDir,
  src: srcDir,
  public: publicDir,
  dist: distDir,
};
