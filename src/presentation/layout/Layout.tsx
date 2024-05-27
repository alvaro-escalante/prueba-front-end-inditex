import { useNavigate, Outlet } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <header>
        <button onClick={() => navigate('/')} className="title-button">
          <h1>Podcaster</h1>
        </button>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2024 Alvaro prueba front end</p>
      </footer>
    </div>
  );
}
