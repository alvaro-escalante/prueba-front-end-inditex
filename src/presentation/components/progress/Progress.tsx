import './Progress.css';

// Componente que muestra un spinner de carga
export default function Progress({ isLoading }: { isLoading: boolean }) {
  return isLoading ? (
    <div
      className="spiner"
      role="progressbar"
      aria-valuetext={isLoading.toString()}
    >
      <img className="spiner__inner" src="/loading.png" alt="Cargando" />
    </div>
  ) : null;
}
