import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { SalesTable } from '@/components/sales/SalesTable';
import axios from 'axios';
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;

export const SalesPage = () => {
  const location = useLocation();
  const isListView = location.pathname === '/admin/sales';
  const queryClient = useQueryClient();

  const { data: sales = [], isLoading, error, refetch } = useQuery({
    queryKey: ['sales'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/ventas/getAllPrueba`);
      return response.data;
    },
    enabled: isListView,
  });

  const handleDeleteSale = async (id) => {
    const deletePromise = async () => {
      try {
        await axios.delete(`${API_URL}/ventas/delete/${id}`);
        queryClient.invalidateQueries(['sales']);
        return 'Venta eliminada correctamente';
      } catch (error) {
        throw error;
      }
    };
    toast.promise(deletePromise(), {
      loading: 'Eliminando venta...',
      success: (data) => data,
      error: () => 'Error al eliminar la venta',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isListView ? (
        <SalesTable
          sales={sales}
          loading={isLoading}
          error={error}
          onDelete={handleDeleteSale}
        />
      ) : (
        <Outlet context={{ fetchSales: refetch }} />
      )}
    </div>
  );
};
