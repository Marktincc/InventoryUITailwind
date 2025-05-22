import React, { useMemo } from 'react';
import axios from 'axios';
import { SalesDashboardContent } from '@/components/sales/SalesDashboardContent';
import { useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;

function getMonthName(monthNumber) {
  return [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ][monthNumber - 1] || monthNumber;
}

export const SalesDashboardPage = () => {
  const { data: sales = [], isLoading, isError, error } = useQuery({
    queryKey: ['sales-dashboard'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/ventas/getAllPrueba`);
      return response.data;
    }
  });

  // Estadísticas generales
  const salesStats = useMemo(() => {
    const totalSales = sales.length;
    const totalRevenue = sales.reduce((acc, s) => acc + (Number(s.valor_total || s.valor) || 0), 0);
    const productMap = {};
    sales.forEach(s => {
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
  }, [sales]);

  // Productos más vendidos
  const topProducts = useMemo(() => {
    const map = {};
    sales.forEach(s => {
      const nombre = s.productoNombre || s.nombreProducto || 'Desconocido';
      const mes = (() => {
        let fecha = s.fecha_venta || s.fecha;
        if (fecha) {
          const date = new Date(fecha);
          return `${getMonthName(date.getMonth() + 1)} ${date.getFullYear()}`;
        }
        return '';
      })();
      const key = mes ? `${nombre}__${mes}` : nombre;
      map[key] = map[key] || { nombreProducto: nombre, cantidadVendida: 0, mes };
      map[key].cantidadVendida += Number(s.cantidad) || 0;
    });
    return Object.values(map);
  }, [sales]);

  // Estadísticas por mes
  const monthlyStats = useMemo(() => {
    const map = {};
    sales.forEach(s => {
      let fecha = s.fecha_venta || s.fecha;
      if (fecha) {
        const date = new Date(fecha);
        const mes = `${getMonthName(date.getMonth() + 1)} ${date.getFullYear()}`;
        if (!map[mes]) map[mes] = { mes, totalVentas: 0, totalIngresos: 0 };
        map[mes].totalVentas += 1;
        map[mes].totalIngresos += Number(s.valor_total || s.valor) || 0;
      }
    });
    return Object.values(map).sort((a, b) => new Date(`01 ${a.mes}`) - new Date(`01 ${b.mes}`));
  }, [sales]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Estadísticas de Ventas</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600"></div>
        </div>
      ) : isError ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="bi bi-exclamation-triangle text-red-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error?.message || 'Error al cargar las ventas.'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <SalesDashboardContent
          salesStats={salesStats}
          topProducts={topProducts}
          monthlyStats={monthlyStats}
          sales={sales}
        />
      )}
    </div>
  );
};
