import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

export const SalesDashboardContent = ({ salesStats, topProducts, monthlyStats, sales }) => {
  const [selectedMonth, setSelectedMonth] = useState('');

  // Obtener meses disponibles
  const availableMonths = useMemo(
    () => Array.from(new Set(monthlyStats.map(m => m.mes))),
    [monthlyStats]
  );

  // Filtrar ventas y estadísticas por mes seleccionado
  const filteredSales = useMemo(() => {
    if (!selectedMonth) return sales;
    return sales.filter(s => {
      let fecha = s.fecha_venta || s.fecha;
      if (!fecha) return false;
      const date = new Date(fecha);
      const mes = `${[
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
      ][date.getMonth()]} ${date.getFullYear()}`;
      return mes === selectedMonth;
    });
  }, [sales, selectedMonth]);

  // Estadísticas generales filtradas
  const filteredStats = useMemo(() => {
    const totalSales = filteredSales.length;
    const totalRevenue = filteredSales.reduce((acc, s) => acc + (Number(s.valor_total || s.valor) || 0), 0);
    const productMap = {};
    filteredSales.forEach(s => {
      const nombre = s.productoNombre || s.nombreProducto || 'Desconocido';
      productMap[nombre] = (productMap[nombre] || 0) + (Number(s.cantidad) || 0);
    });
    let topProduct = '';
    let max = 0;
    Object.entries(productMap).forEach(([nombre, cantidad]) => {
      if (cantidad > max) {
        max = cantidad;
        topProduct = nombre;
      }
    });
    return {
      totalSales,
      totalRevenue,
      topProduct,
    };
  }, [filteredSales]);

  // Productos más vendidos filtrados
  const filteredTopProducts = useMemo(() => {
    const map = {};
    filteredSales.forEach(s => {
      const nombre = s.productoNombre || s.nombreProducto || 'Desconocido';
      map[nombre] = (map[nombre] || 0) + (Number(s.cantidad) || 0);
    });
    return Object.entries(map).map(([nombreProducto, cantidadVendida]) => ({
      nombreProducto,
      cantidadVendida,
    }));
  }, [filteredSales]);

  // Pie chart filtrado
  const pieData = useMemo(() => {
    const map = {};
    filteredSales.forEach(s => {
      const nombre = s.productoNombre || s.nombreProducto || 'Desconocido';
      map[nombre] = (map[nombre] || 0) + (Number(s.cantidad) || 0);
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [filteredSales]);
  const pieColors = ['#6366f1', '#a21caf', '#16a34a', '#f59e42', '#ef4444', '#0ea5e9', '#fbbf24', '#10b981'];

  // Estadísticas adicionales filtradas
  const avgSaleValue = filteredStats.totalSales > 0 ? (filteredStats.totalRevenue / filteredStats.totalSales).toFixed(2) : 0;
  const totalProductsSold = filteredSales.reduce((acc, s) => acc + (Number(s.cantidad) || 0), 0);
  const uniqueClients = new Set(filteredSales.map(s => s.clienteNombre || s.idUsuario)).size;

  return (
    <>
      {/* Selector de mes */}
      <div className="mb-4 flex items-center gap-2">
        <label className="text-sm font-medium text-gray-200">Filtrar por mes:</label>
        <select
          className="rounded-md px-3 py-1 text-sm bg-gray-700 text-white border border-gray-600"
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
        >
          <option value="">Todos</option>
          {availableMonths.map(mes => (
            <option key={mes} value={mes}>{mes}</option>
          ))}
        </select>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="p-6 bg-gray rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total de Ventas</h3>
          <p className="text-3xl font-bold text-blue-600">{filteredStats.totalSales}</p>
        </Card>
        <Card className="p-6 bg-gray rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Ingresos</h3>
          <p className="text-3xl font-bold text-green-600">${filteredStats.totalRevenue}</p>
        </Card>
        <Card className="p-6 bg-gray rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Promedio por Venta</h3>
          <p className="text-3xl font-bold text-cyan-600">${avgSaleValue}</p>
        </Card>
        <Card className="p-6 bg-gray rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Clientes Únicos</h3>
          <p className="text-3xl font-bold text-orange-500">{uniqueClients}</p>
        </Card>
      </div>

      {/* Más estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-6 bg-gray rounded-lg shadow flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Total de Productos Vendidos</h3>
          <p className="text-3xl font-bold text-purple-600">{totalProductsSold}</p>
        </Card>
        <Card className="p-6 bg-gray rounded-lg shadow flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Producto Más Vendido</h3>
          <p className="text-3xl font-bold text-fuchsia-600">{filteredStats.topProduct || 'N/A'}</p>
        </Card>
      </div>

      {/* Gráfica de productos más vendidos */}
      <div className="mb-6">
        <Card className="p-6 bg-gray rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Productos más vendidos {selectedMonth && `en ${selectedMonth}`}</h2>
          <div className="overflow-x-auto w-full">
            <BarChart width={884} height={300} data={filteredTopProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombreProducto" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidadVendida" fill="#a21caf" name="Cantidad Vendida" />
            </BarChart>
          </div>
        </Card>
      </div>

      {/* Gráfica de ventas por mes (no se filtra) */}
      <div className="mb-6">
        <Card className="p-6 bg-gray rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Ventas por Mes</h2>
          <div className="overflow-x-auto w-full">
            <BarChart width={884} height={300} data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalVentas" fill="#2563eb" name="Total Ventas" />
              <Bar dataKey="totalIngresos" fill="#16a34a" name="Total Ingresos" />
            </BarChart>
          </div>
        </Card>
      </div>

      {/* Pie chart de distribución de ventas por producto */}
      <div className="mb-6">
        <Card className="p-6 bg-gray rounded-lg shadow flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Distribución de Ventas por Producto {selectedMonth && `en ${selectedMonth}`}</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#6366f1"
              label
            >
              {pieData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={['#6366f1', '#a21caf', '#16a34a', '#f59e42', '#ef4444', '#0ea5e9', '#fbbf24', '#10b981'][idx % 8]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Card>
      </div>
    </>
  );
};
