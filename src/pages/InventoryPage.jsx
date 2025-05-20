import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { DashboardContent } from '../components/inventory/DashboardContent';
import { AlertsDashboard } from '../components/inventory/AlertsDashboard';
import { useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;
const LOW_STOCK_THRESHOLD = 10;

export const InventoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAlertsRoute = location.pathname.includes('/alerts');

  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ['inventory-products'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/productos/getAll`);
      return response.data;
    }
  });

  const lowStockProducts = useMemo(
    () => products.filter(product => product.cantidad < LOW_STOCK_THRESHOLD),
    [products]
  );
  const inventoryStats = useMemo(
    () => ({
      totalProducts: products.length,
      lowStock: lowStockProducts.length,
      outOfStock: products.filter(product => product.cantidad === 0).length
    }),
    [products, lowStockProducts]
  );

  const handleNotificationClick = () => {
    if (isAlertsRoute) {
      navigate('/dashboard/inventory');
    } else {
      navigate('alerts');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Panel de Control de Inventario</h1>
        <div className="relative">
          <button
            onClick={handleNotificationClick}
            className={`relative w-10 h-10 flex items-center justify-center text-gray-300 ${isAlertsRoute ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'
              } rounded-lg focus:outline-none transition-colors duration-200`}
          >
            <i className="bi bi-bell text-xl"></i>
            {lowStockProducts.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {lowStockProducts.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600"></div>
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="bi bi-exclamation-triangle text-red-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error?.message || 'Error al cargar los productos.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        !isAlertsRoute ? (
          <DashboardContent
            inventoryStats={inventoryStats}
            lowStockProducts={lowStockProducts}
            lowStockThreshold={LOW_STOCK_THRESHOLD}
          />
        ) : (
          <AlertsDashboard alerts={lowStockProducts} />
        )
      )}
    </div>
  );
};