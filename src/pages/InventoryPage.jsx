import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

export const InventoryPage = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [inventoryStats, setInventoryStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0
  });

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/productos/getAll');
      const products = response.data;
      
      // Filtrar productos con bajo stock (menos de 10 unidades)
      const lowStock = products.filter(product => product.cantidad < 10);
      setLowStockProducts(lowStock);

      // Calcular estadísticas
      setInventoryStats({
        totalProducts: products.length,
        lowStock: lowStock.length,
        outOfStock: products.filter(product => product.cantidad === 0).length
      });
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Control de Inventario</h1>
      
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6 bg-gray rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total de Productos</h3>
          <p className="text-3xl font-bold text-blue-600">{inventoryStats.totalProducts}</p>
        </Card>
        
        <Card className="p-6 bg-gray rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Productos Bajo Stock</h3>
          <p className="text-3xl font-bold text-yellow-600">{inventoryStats.lowStock}</p>
        </Card>
        
        <Card className="p-6 bg-gray rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Sin Stock</h3>
          <p className="text-3xl font-bold text-red-600">{inventoryStats.outOfStock}</p>
        </Card>
      </div>

      {/* Gráfica de barras */}
      <div className="mb-6">
        <Card className="p-6 bg-gray rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Niveles de Inventario</h2>
          <div className="overflow-x-auto w-full">
            <BarChart width={1000} height={300} data={lowStockProducts} className='w-full'>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombreProducto" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#4F46E5" />
            </BarChart>
          </div>
        </Card>
      </div>

      {/* Alertas de bajo stock */}
      <div className="mb-6">
        <Card className="p-6 bg-gray rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Alertas de Bajo Stock</h2>
          <div className="space-y-4">
            {lowStockProducts.map(product => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-yellow-800">{product.nombreProducto}</h3>
                  <p className="text-sm text-yellow-600">Stock actual: {product.cantidad} unidades</p>
                </div>
                <span className="px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">
                  Bajo Stock
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};