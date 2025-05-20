import { useAuthContext } from '@/context/AuthContext';
import { useNavigate, useLocation, Link, NavLink } from 'react-router-dom';

export const HeaderOutlet = ({ onMenuClick }) => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // O '/login' si es lo adecuado
  };

  const location = useLocation();

  // Filtra las partes de la URL, pero omite 'admin' y las partes numéricas
  const pathnames = location.pathname
    .split('/')
    .filter((x) => x && x !== 'admin' && isNaN(Number(x)));

  const isAdminRoute = location.pathname.startsWith('/admin');

  // Si estamos en '/admin' exactamente, la miga de pan no debería mostrar más nada
  if (location.pathname === '/admin') {
    pathnames.push('Admin'); // Esto añadirá solo "Admin" cuando estamos en "/admin"
  }

  const prependAdmin = (route) => (isAdminRoute ? '/admin' + route : route);

  const getInitials = (name) => {
    if (!name) return 'U'; // Si no hay nombre, devolver "U" de Usuario
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0][0].toUpperCase(); // Solo la primera letra
    }
    return (words[0][0] + words[1][0]).toUpperCase(); // Primera letra de la primera y segunda palabra
  };

  return (
    <header className="sticky top-0 z-10 bg-gray-800 flex h-16 w-full shrink-0 items-center border-b border-gray-800 ">
      <div className="flex w-full items-center px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center">
            {/* Botón hamburguesa solo en móvil */}
            <button
              className="md:hidden mr-4 text-2xl text-gray-300"
              onClick={onMenuClick}
              aria-label="Abrir menú"
            >
              <i className="bi bi-list"></i>
            </button>
            <div className="flex-1">
              <ul className="hidden items-center gap-4 text-sm font-medium lg:flex">
                {/* Si estamos en '/admin', mostramos solo la palabra 'Admin' */}
                {pathnames.length > 0 && pathnames.map((name, index) => {
                  const routeTo = prependAdmin('/' + pathnames.slice(0, index + 1).join('/'));
                  const isLast = index === pathnames.length - 1;
                  return (
                    <li key={routeTo} className="flex items-center gap-2">
                      <span className="text-gray-400">/</span>
                      {isLast ? (
                        <span className="text-white font-bold capitalize">{decodeURIComponent(name)}</span>
                      ) : (
                        <Link
                          to={routeTo}
                          className="text-gray-400 hover:text-white capitalize"
                        >
                          {decodeURIComponent(name)}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="ml-4 flex items-center rtl:ml-0 rtl:mr-4" bis_skin_checked="1" wire:id="header-menu-button">
          </div>
          <div className="ml-4 flex items-center rtl:ml-0 rtl:mr-4">
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none"
                onClick={() => document.getElementById('user-menu').classList.toggle('hidden')}
              >
                <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="text-white text-sm">{getInitials(user?.nombre)}</span>
                </div>
                <span className="hidden md:block">{user?.nombre || 'Usuario'}</span>
                <i className="bi bi-chevron-down"></i>
              </button>

              <div
                id="user-menu"
                className="hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-gray-500 ring-opacity-5"
              >
                <div className="py-1" role="menu" aria-orientation="vertical">
                
                  <NavLink to="/admin/settings" className="block px-4 py-2 text-sm text-white-700 hover:bg-gray-400/5" role="menuitem">
                    <i className="bi bi-gear mr-2"></i>
                    Perfil
                  </NavLink>
                  <div className="border-t border-gray-400"></div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-400/5" role="menuitem">
                    <i className="bi bi-box-arrow-right mr-2"></i>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
