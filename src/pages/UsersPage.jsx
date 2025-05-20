import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { UsersTable } from '@/components/users/UsersTable';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;

export const UsersPage = () => {
  const [error, setError] = useState(null);
  const location = useLocation();
  const isListView = location.pathname === '/admin/users';
  const queryClient = useQueryClient();

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/usuarios/getAll`);
      return response.data.map(user => ({
        id: user.id,
        nombre: user.nombre,
        apellidos: user.apellidos,
        direccion: user.direccion,
        correo: user.correo,
        telefono: user.telefono || '',
        rol: user.rol,
        estado: user.estado ? 'active' : 'inactive'
      }));
    },
    onError: () => setError('No se pudieron cargar los usuarios. Inténtalo de nuevo más tarde.'),
    enabled: isListView,
  });

  const handleDeleteUser = async (id) => {
    const deletePromise = async () => {
      try {
        await axios.delete(`${API_URL}/usuarios/delete/${id}`);
        queryClient.invalidateQueries(['users']);
        return 'Usuario eliminado correctamente';
      } catch (error) {
        throw error;
      }
    };

    toast.promise(deletePromise(), {
      loading: 'Eliminando usuario...',
      success: (data) => data,
      error: () => 'Error al eliminar el usuario',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isListView ? (
        <UsersTable
          users={users}
          loading={isLoading}
          error={error}
          onDelete={handleDeleteUser}
        />
      ) : (
        <Outlet context={{ fetchUsers: refetch }} />
      )}
    </div>
  );
};