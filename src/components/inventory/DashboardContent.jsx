import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const DashboardContent = ({ inventoryStats, lowStockProducts }) => {
  return (
    <>
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
    </>
  );
};