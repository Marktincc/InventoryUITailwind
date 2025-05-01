
import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { CategoriesTable } from '@/components/categories/CategoriesTable';
import axios from 'axios';
import { toast } from 'sonner';


export const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const isListView = location.pathname === '/admin/categories';

  useEffect(() => {
    if (isListView) {
      fetchCategories();
    }
  }, [isListView]);

  useEffect(() => {
    console.log('Categorías actualizadas:', categories);
  }, [categories]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/categorias/getAll');
      console.log('Respuesta del servidor:', response.data);

      const formattedCategories = response.data.map(category => ({
        id: category.id,
        name: category.name,
      }));

      console.log('Categorías formateadas:', formattedCategories);
      setCategories(formattedCategories);
      setError(null);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('No se pudieron cargar las categorías. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    } 
  };  

  const handleDeleteCategorie = async (id) => {
    const deletePromise = async () => {
      try {
        const response = await axios.delete(`http://localhost:8080/categorias/delete/${id}`);
        setCategories(categories.filter((category) => category.id !== id));
        return 'Categoría eliminada correctamente';
      } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
      }
    };
    toast.promise(deletePromise(), {
      loading: 'Eliminando categoría...',
      success: (data) => {
        return data;
      },
      error: (err) => {
        return 'Error al eliminar la categoría';
      },
    });
    
  }
  return (
    <div className="container mx-auto px-4 py-8">
      {isListView ? (
        <CategoriesTable
          categories={categories}
          loading={loading}
          error={error}
          onDelete={handleDeleteCategorie}
        />
      ) : (
        <Outlet context={{ fetchCategories }} />
      )}
    </div>
  );
};