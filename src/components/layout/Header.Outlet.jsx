import { useAuthContext } from '@/context/AuthContext';
import { useNavigate, useLocation, Link, NavLink } from 'react-router-dom';

export const HeaderOutlet = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const location = useLocation();
  const pathnames = location.pathname
    .split('/')
    .filter((x) => x && x !== 'admin' && isNaN(Number(x)));

  const prependAdmin = (route) => '/admin' + route;
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
          <div className="flex-1">
            <ul className="hidden items-center gap-4 text-sm font-medium lg:flex">
              {pathnames.map((name, index) => {
                const routeTo = prependAdmin('/' + pathnames.slice(0, index + 1).join('/'));
                const isLast = index === pathnames.length - 1;
                const label = decodeURIComponent(name);
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
                  <a href="#" className="block px-4 py-2 text-sm text-white-700 hover:bg-gray-400/5" role="menuitem">
                    <i className="bi bi-person mr-2"></i>
                    Perfil
                  </a>
                  <NavLink to="/admin/settings" className="block px-4 py-2 text-sm text-white-700 hover:bg-gray-400/5" role="menuitem">
                    <i className="bi bi-gear mr-2"></i>
                    Configuración
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
  )
}
