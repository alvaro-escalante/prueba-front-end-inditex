import './Progress.css';

// Componente que muestra un spinner de carga
export default function Progress({ isLoading }: { isLoading: boolean }) {
  return isLoading ? (
    <div className="spiner">
      <img className="spiner__inner" src="loading.png" alt="Cargando" />
    </div>
  ) : null;
}
