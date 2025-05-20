import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { CategoriesTable } from '@/components/categories/CategoriesTable';
import axios from 'axios';
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;

export const CategoriesPage = () => {
  const location = useLocation();
  const isListView = location.pathname === '/admin/categories';
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading, error, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/categorias/getAll`);
      return response.data.map(category => ({
        id: category.id,
        name: category.name,
      }));
    },
    enabled: isListView,
  });

  const handleDeleteCategorie = async (id) => {
    const deletePromise = async () => {
      try {
        await axios.delete(`${API_URL}/categorias/delete/${id}`);
        queryClient.invalidateQueries(['categories']);
        return 'Categoría eliminada correctamente';
      } catch (error) {
        throw error;
      }
    };
    toast.promise(deletePromise(), {
      loading: 'Eliminando categoría...',
      success: (data) => data,
      error: () => 'Error al eliminar la categoría',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isListView ? (
        <CategoriesTable
          categories={categories}
          loading={isLoading}
          error={error}
          onDelete={handleDeleteCategorie}
        />
      ) : (
        <Outlet context={{ fetchCategories: refetch }} />
      )}
    </div>
  );
};