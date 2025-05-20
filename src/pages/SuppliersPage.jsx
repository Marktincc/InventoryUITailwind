import { useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { SuppliersTable } from '@/components/suppliers/SuppliersTable';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;

export const SuppliersPage = () => {
  const location = useLocation();
  const isListView = location.pathname === '/admin/suppliers';
  const queryClient = useQueryClient();

  const { data: suppliers = [], isLoading, error, refetch } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/proveedores/getAll`);
      return response.data.map((supplier) => ({
        id: supplier.id,
        nombre: supplier.nombre,
        nit: supplier.nit,
        direccion: supplier.direccion,
        telefono: supplier.telefono,
        correo: supplier.correo,
      }));
    },
    enabled: isListView,
  });

  const handleDeleteSupplier = async (id) => {
    const deletePromise = async () => {
      try {
        await axios.delete(`${API_URL}/proveedores/delete/${id}`);
        queryClient.invalidateQueries(['suppliers']);
        return 'Proveedor eliminado correctamente';
      } catch (error) {
        throw error;
      }
    };
    toast.promise(deletePromise(), {
      loading: 'Eliminando proveedor...',
      success: (data) => data,
      error: () => 'Error al eliminar el proveedor'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isListView ? (
        <SuppliersTable
          suppliers={suppliers}
          loading={isLoading}
          error={error}
          onDelete={handleDeleteSupplier}
        />
      ) : (
        <Outlet context={{ fetchSuppliers: refetch }} />
      )}
    </div>
  );
};