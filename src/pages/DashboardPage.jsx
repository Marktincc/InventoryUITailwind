import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '@/context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

export const DashboardPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const isAdmin = user?.rol === 'admin';

  // Estadísticas rápidas
  const { data: products = [] } = useQuery({
    queryKey: ['dashboard-products'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/productos/getAll`);
      return res.data;
    }
  });
  const { data: sales = [] } = useQuery({
    queryKey: ['dashboard-sales'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/ventas/getAllPrueba`);
      return res.data;
    }
  });
  const { data: suppliers = [] } = useQuery({
    queryKey: ['dashboard-suppliers'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/proveedores/getAll`);
      return res.data;
    }
  });
  const { data: categories = [] } = useQuery({
    queryKey: ['dashboard-categories'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/categorias/getAll`);
      return res.data;
    }
  });

  const stats = useMemo(() => ({
    totalProducts: products.length,
    totalSales: sales.length,
    totalSuppliers: suppliers.length,
    totalCategories: categories.length,
    totalRevenue: sales.reduce((acc, s) => acc + (Number(s.valor_total || s.valor) || 0), 0),
    avgSaleValue: sales.length > 0 ? (sales.reduce((acc, s) => acc + (Number(s.valor_total || s.valor) || 0), 0) / sales.length).toFixed(2) : 0,
    topProduct: (() => {
      const map = {};
      sales.forEach(s => {
        const nombre = s.productoNombre || s.nombreProducto || 'Desconocido';
        map[nombre] = (map[nombre] || 0) + (Number(s.cantidad) || 0);
      });
      let top = '';
      let max = 0;
      Object.entries(map).forEach(([nombre, cantidad]) => {
        if (cantidad > max) {
          max = cantidad;
          top = nombre;
        }
      });
      return top;
    })(),
  }), [products, sales, suppliers, categories]);

  // Acciones rápidas según rol
  const quickActions = [
    ...(isAdmin ? [{
      label: 'Crear Producto',
      icon: <i className="bi bi-plus-circle text-xl text-blue-500"></i>,
      onClick: () => navigate('/admin/products/create'),
    }] : []),
    ...(isAdmin ? [{
      label: 'Registrar Venta',
      icon: <i className="bi bi-cash-coin text-xl text-green-500"></i>,
      onClick: () => navigate('/admin/sales/create'),
    }] : []),
    ...(isAdmin ? [{
      label: 'Agregar Proveedor',
      icon: <i className="bi bi-person-plus text-xl text-yellow-500"></i>,
      onClick: () => navigate('/admin/suppliers/create'),
    }] : []),
   
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-100">¡Bienvenido, {user?.nombre || user?.name || 'Usuario'}!</h1>
      <p className="mb-8 text-gray-400">Este es tu panel principal. Accede rápidamente a las secciones más importantes y revisa las estadísticas de tu inventario y ventas.</p>

      {/* Acciones rápidas solo para admin */}
      {isAdmin && (
        <div className="flex flex-wrap gap-2 mb-8">
          {quickActions.map(action => (
            <button
              key={action.label}
              onClick={action.onClick}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg shadow transition"
              title={action.label}
            >
              {action.icon}
              <span className="hidden md:inline">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Tarjetas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gray rounded-lg shadow cursor-pointer hover:bg-gray-700 transition" onClick={isAdmin ? () => navigate('/admin/inventory') : undefined}>
          <h3 className="text-lg font-semibold mb-2 text-blue-400">Inventario</h3>
          <p className="text-gray-200">Consulta y gestiona el inventario de productos.</p>
          <div className="mt-4 text-3xl font-bold text-blue-500">{stats.totalProducts}</div>
        </Card>
        <Card className="p-6 bg-gray rounded-lg shadow cursor-pointer hover:bg-gray-700 transition" onClick={isAdmin ? () => navigate('/admin/sales') : undefined}>
          <h3 className="text-lg font-semibold mb-2 text-green-400">Ventas</h3>
          <p className="text-gray-200">Visualiza y registra ventas recientes.</p>
          <div className="mt-4 text-3xl font-bold text-green-500">{stats.totalSales}</div>
          <div className="text-sm text-green-300">Ingresos: ${stats.totalRevenue}</div>
        </Card>
        {isAdmin && (
          <Card className="p-6 bg-gray rounded-lg shadow cursor-pointer hover:bg-gray-700 transition" onClick={() => navigate('/admin/suppliers')}>
            <h3 className="text-lg font-semibold mb-2 text-yellow-400">Proveedores</h3>
            <p className="text-gray-200">Administra la información de proveedores.</p>
            <div className="mt-4 text-3xl font-bold text-yellow-500">{stats.totalSuppliers}</div>
          </Card>
        )}
        <Card className="p-6 bg-gray rounded-lg shadow cursor-pointer hover:bg-gray-700 transition" onClick={isAdmin ? () => navigate('/admin/categories') : undefined}>
          <h3 className="text-lg font-semibold mb-2 text-purple-400">Categorías</h3>
          <p className="text-gray-200">Gestiona las categorías de productos.</p>
          <div className="mt-4 text-3xl font-bold text-purple-500">{stats.totalCategories}</div>
        </Card>
        {isAdmin && (
          <Card className="p-6 bg-gray rounded-lg shadow cursor-pointer hover:bg-gray-x700 transition" onClick={() => navigate('/admin/users')}>
            <h3 className="text-lg font-semibold mb-2 text-red-400">Usuarios</h3>
            <p className="text-gray-200">Controla los usuarios y roles del sistema.</p>
          </Card>
        )}
      </div>

      {/* Estadísticas rápidas y destacadas */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Estadísticas Destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-4 bg-gray-800 rounded-lg shadow">
            <h4 className="text-md font-semibold text-gray-200 mb-1">Total Productos</h4>
            <p className="text-2xl font-bold text-blue-500">{stats.totalProducts}</p>
          </Card>
          <Card className="p-4 bg-gray-800 rounded-lg shadow">
            <h4 className="text-md font-semibold text-gray-200 mb-1">Total Ventas</h4>
            <p className="text-2xl font-bold text-green-500">{stats.totalSales}</p>
          </Card>
          <Card className="p-4 bg-gray-800 rounded-lg shadow">
            <h4 className="text-md font-semibold text-gray-200 mb-1">Ingresos Totales</h4>
            <p className="text-2xl font-bold text-green-400">${stats.totalRevenue}</p>
          </Card>
          <Card className="p-4 bg-gray-800 rounded-lg shadow">
            <h4 className="text-md font-semibold text-gray-200 mb-1">Promedio por Venta</h4>
            <p className="text-2xl font-bold text-cyan-400">${stats.avgSaleValue}</p>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="p-4 bg-gray-800 rounded-lg shadow">
            <h4 className="text-md font-semibold text-gray-200 mb-1">Producto Más Vendido</h4>
            <p className="text-2xl font-bold text-fuchsia-400">{stats.topProduct || 'N/A'}</p>
          </Card>
          {isAdmin && (
            <Card className="p-4 bg-gray-800 rounded-lg shadow">
              <h4 className="text-md font-semibold text-gray-200 mb-1">Total Proveedores</h4>
              <p className="text-2xl font-bold text-yellow-500">{stats.totalSuppliers}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
