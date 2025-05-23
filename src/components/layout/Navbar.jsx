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
      label: 'Ventas',
      path: '/dashboard/sales',
      icon: 'bi-cart',
    }
    // {
    //   label: 'Reportes',
    //   path: '/dashboard/reports',
    //   icon: 'bi-bar-chart',
    // },
  ]
  const adminMenuItems = [
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
      label: 'Ventas',
      path: '/admin/sales',
      icon: 'bi-cart-check',
    },
    {
      label: 'Configuración',
      path: '/admin/settings',
      icon: 'bi-sliders',
    },
  ];
  const isActiveRoute = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6">
      <ul className="space-y-1 -mx-3 px-6">
        <li className="mb-2 mt-1">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-3">Usuario</span>
        </li>
        {commonMenuItems.map((item, index) => (
          <li key={index} className="overflow-hidden">
            <NavLink
              to={item.path}
              className={({ isActive }) => isActiveRoute(item.path)
                ? 'text-white flex gap-3 rounded-lg px-3 py-2 font-medium transition bg-gray-300/5'
                : 'text-gray-400 flex gap-3 rounded-lg px-3 py-2 font-medium transition hover:bg-gray-500/5 focus:bg-gray-500/5'
              }
              end>
              <i className={`${item.icon} text-sm`}></i>
              <span className="text-sm">{item.label}</span>
            </NavLink>
          </li>
        ))}
        {userRole === 'admin' && (
          <>
            <li className="mb-2 mt-4">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-3">Administrador</span>
            </li>
            {adminMenuItems.map((item, index) => (
              <li key={index} className="overflow-hidden">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => isActiveRoute(item.path)
                    ? 'text-white flex gap-3 rounded-lg px-3 py-2 font-medium transition bg-gray-300/5'
                    : 'text-gray-400 flex gap-3 rounded-lg px-3 py-2 font-medium transition hover:bg-gray-500/5 focus:bg-gray-500/5'
                  }
                  end>
                  <i className={`${item.icon} text-sm`}></i>
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </>
        )}
      </ul>
    </nav>
  )
}
