import {
  LoadingProvider,
  useLoading,
} from '@presentation/context/LoadingContext';
import Progress from '@src/presentation/components/Progress/Progress';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

const LayoutContent = () => {
  const { loading } = useLoading();

  return (
    <div className="container">
      <header>
        <Link to="/">
          <h1>Podcaster</h1>
        </Link>
        <Progress isLoading={loading} />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2024 Alvaro prueba front end</p>
      </footer>
    </div>
  );
};

export default function Layout() {
  return (
    <LoadingProvider>
      <LayoutContent />
    </LoadingProvider>
  );
}
