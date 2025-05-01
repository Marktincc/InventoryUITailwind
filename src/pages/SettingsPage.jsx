import { useAuthContext } from '@/context/AuthContext';
import { TwoRowForm } from '@/components/common/TwoRowForm';
import axios from 'axios';
import { toast } from 'sonner';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



export const SettingsPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [users, setUsers] = useState({
    nombre: '',
    apellidos: '',
    direccion: '',
    correo: '',
    telefono: '',
    password: '',
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/usuarios/getById/${user.id}`);
        const userData = response.data;
        setUsers({
          nombre: userData.nombre,
          apellidos: userData.apellidos,
          direccion: userData.direccion,
          correo: userData.correo,
          telefono: userData.telefono,
          password: userData.password,
          rol: userData.rol,
          estado: userData.estado ? 'active' : 'inactive'
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Error al cargar los datos del usuario');
        // navigate('/admin/users');
      }
    };

    fetchUser();
  }, [user.id, navigate]);

  const handleChange = (e) => {
    setUsers({ ...user, [e.target.name]: e.target.value });
  };

  const handleSaveUser = async () => {
    const savePromise = async () => {
      try {
        const response = await axios.patch(`http://localhost:8080/usuarios/update/${user.id}`, {
          nombre: user.nombre,
          apellidos: user.apellidos,
          direccion: user.direccion,
          correo: user.correo,
          telefono: user.telefono,
          rol: user.rol,
          estado: user.estado === 'active'
        });
        return 'Usuario actualizado correctamente';
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    };

    toast.promise(savePromise, {
      loading: 'Actualizando usuario...',
      success: (data) => {
        // Notificar al componente padre para actualizar el listado
      
        // redirigir al listado
        // navigate('/admin/users');
        return data;
      },
      error: (err) => {
        console.error('Error updating user:', err);
        return 'Error al actualizar el usuario';
      },
    });
  };
  const inputs = [
    {
      id: 'nombre',
      label: 'Nombre',
      name: 'nombre',
      value: users.nombre,
      onChange: handleChange,
      required: true
    },
    {
      id: 'apellidos',
      label: 'Apellidos',
      name: 'apellidos',
      value: users.apellidos,
      onChange: handleChange,
      required: true
    },
    {
      id: 'direccion',
      label: 'Dirección',
      name: 'direccion',
      value: users.direccion,
      onChange: handleChange,
      required: true
    },
    {
      id: 'correo',
      label: 'Correo',
      name: 'correo',
      type: 'email',
      value: users.correo,
      onChange: handleChange,
      required: true
    },
    {
      id: 'password',
      label: 'Contraseña',
      name: 'password',
      type: 'password',
      value: users.password,
      onChange: handleChange,
      required: true
    },
    {
      id: 'telefono',
      label: 'Teléfono',
      name: 'telefono',
      value: users.telefono,
      onChange: handleChange,
      required: true
    },
    {
      id: 'rol',
      label: 'Rol',
      name: 'rol',
      value: users.rol,
      onChange: handleChange,
      required: true,
      type: 'input',
      disabled: true

    },
    {
      id: 'estado',
      label: 'Estado',
      name: 'estado',
      value: users.estado,
      onChange: handleChange,
      required: true,
      type: 'input',
      disabled: true
    }
  ];
  return (
    <>
      <div className="">
        <TwoRowForm inputs={inputs} onSubmit={(e) => {
          e.preventDefault();
          handleSaveUser();
        }}
          title="Configuración"
          buttons={[
            {
              type: 'submit',
              className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              text: 'Actualizar'
            },

          ]}
        />
      </div>
    </>
  )
}