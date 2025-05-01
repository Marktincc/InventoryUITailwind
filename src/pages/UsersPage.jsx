import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { UsersTable } from '@/components/users/UsersTable';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const isListView = location.pathname === '/admin/users';

  useEffect(() => {
    if (isListView) {
      fetchUsers();
    }
  }, [isListView]);



  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/usuarios/getAll');
      
      const formattedUsers = response.data.map(user => ({
        id: user.id,
        nombre: user.nombre,
        apellidos: user.apellidos,
        direccion: user.direccion,
        correo: user.correo,
        telefono: user.telefono || '',
        rol: user.rol,
        estado: user.estado ? 'active' : 'inactive'
      }));

      
      setUsers(formattedUsers);
      setError(null);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      setError('No se pudieron cargar los usuarios. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteUser = async (id) => {
    const deletePromise = async () => {
      try {
        const response = await axios.delete(`http://localhost:8080/usuarios/delete/${id}`);
        setUsers(users.filter(user => user.id !== id));
        return 'Usuario eliminado correctamente';
      } catch (error) {
        console.error('Error eliminando usuario:', error);
        throw error;
      }
    };
  
    toast.promise(deletePromise(), {
      loading: 'Eliminando usuario...',
      success: (data) => {
       return data;
      
      },
      error: (err) => {
        console.error('Error eliminando usuario:', err);
        return 'Error al eliminar el usuario';
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isListView ? (
        <UsersTable
          users={users}
          loading={loading}
          error={error}
          onDelete={handleDeleteUser}
        />
      ) : (
        <Outlet context={{ fetchUsers }} />
      )}
    </div>
  );
};