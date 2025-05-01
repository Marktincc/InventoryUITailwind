import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuthContext } from '@/context/AuthContext';

export const Navbar = () => {
  const { user } = useAuthContext();
  const userRole = user?.rol || 'guest';
  const navigate = useNavigate();
  const location = useLocation();

  const commonMenuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'bi-speedometer2',
    },
    {
      label: 'Inventario',
      path: '/dashboard/inventory',
      icon: 'bi-box-seam',
    },
    {
      label: 'Reportes',
      path: '/dashboard/reports',
      icon: 'bi-bar-chart',
    },
  ]
  const adminMenuItems = [
    {
      label: 'Panel Admin',
      path: '/admin',
      icon: 'bi-gear',
    },
    {
      label: 'Usuarios',
      path: '/admin/users',
      icon: 'bi-people',
    },
    {
      label: 'Categorías',
      path: '/admin/categories',
      icon: 'bi-tags',
    },
    {
      label: 'Productos',
      path: '/admin/products',
      icon: 'bi-cart2',
    },
    {
      label: 'Proveedores',
      path: '/admin/suppliers',
      icon: 'bi-shop',
    },
    {
      label: 'Configuración',
      path: '/admin/settings',
      icon: 'bi-sliders',
    },
  ];
  const menuItems = userRole === 'admin' ? [...commonMenuItems, ...adminMenuItems] : commonMenuItems;
  const isActiveRoute = (path) => {
    // Si la ruta es '/admin', sólo será activa cuando estemos exactamente en '/admin' y no en '/admin/anything'
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    if (path === '/dashboard') {
      // Aquí también chequeamos exactamente si la ruta es '/dashboard' y no cualquier cosa que empiece con '/dashboard'
      return location.pathname === '/dashboard';
    }
    // Para otras rutas, se activa si la ruta comienza con `path`
    return location.pathname.startsWith(path);
  };
  return (
    <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6">
      <ul className="space-y-1 -mx-3 px-6">
        {menuItems.map((item, index) => (
          <li key={index} className="overflow-hidden">
            <NavLink
              to={item.path}
              className={({ isActive }) =>  isActiveRoute(item.path) 
              ? 'text-white flex gap-3 rounded-lg px-3 py-2 font-medium transition bg-gray-300/5' 
              : 'text-gray-400 flex gap-3 rounded-lg px-3 py-2 font-medium transition hover:bg-gray-500/5 focus:bg-gray-500/5'
          }
              end>
              <i className={`${item.icon} text-sm`}></i>
              <span className="text-sm">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
