import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';
import { DashboardContent } from '../components/inventory/DashboardContent';
import { AlertsDashboard } from '../components/inventory/AlertsDashboard';

export const InventoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [inventoryStats, setInventoryStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0
  });

  const isAlertsRoute = location.pathname.includes('/alerts');

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/productos/getAll');
      const products = response.data;
      
      const lowStock = products.filter(product => product.cantidad < 10);
      setLowStockProducts(lowStock);

      setInventoryStats({
        totalProducts: products.length,
        lowStock: lowStock.length,
        outOfStock: products.filter(product => product.cantidad === 0).length
      });
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

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
            className={`relative w-10 h-10 flex items-center justify-center text-gray-300 ${
              isAlertsRoute ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'
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

      {!isAlertsRoute ? (
        <DashboardContent inventoryStats={inventoryStats} lowStockProducts={lowStockProducts} />
      ) : (
        <AlertsDashboard alerts={lowStockProducts} />
      )}
    </div>
  );
};