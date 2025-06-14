import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { TwoRowForm } from '../common/TwoRowForm';

const API_URL = import.meta.env.VITE_API_URL;

export const Useredit = ({ onUserUpdated }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    nombre: '',
    apellidos: '',
    direccion: '',
    correo: '',
    telefono: '',
    rol: 'user',
    estado: 'active'
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/usuarios/getById/${id}`);
        const userData = response.data;
        setUser({
          nombre: userData.nombre,
          apellidos: userData.apellidos,
          direccion: userData.direccion,
          correo: userData.correo,
          telefono: userData.telefono,
          rol: userData.rol,
          estado: userData.estado ? 'active' : 'inactive'
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Error al cargar los datos del usuario');
        navigate('/admin/users');
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
      setPasswordTouched(true);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSaveUser = async () => {
    // Validar password solo si se intenta cambiar
    if (passwordTouched && password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    const savePromise = async () => {
      try {
        const payload = {
          nombre: user.nombre,
          apellidos: user.apellidos,
          direccion: user.direccion,
          correo: user.correo,
          telefono: user.telefono,
          rol: user.rol,
          estado: user.estado === 'active'
        };
        if (passwordTouched && password) {
          payload.password = password;
        }
        const response = await axios.patch(`${API_URL}/usuarios/update/${id}`, payload);
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
        if (onUserUpdated) {
          onUserUpdated();
        }
        // redirigir al listado
        navigate('/admin/users');
        return data;
      },
      error: (err) => {
        console.error('Error updating user:', err);
        return 'Error al actualizar el usuario';
      },
    });
  };

  const handleCancel = () => {
    navigate('/admin/users');
  };

  const inputs = [
    {
      id: 'nombre',
      label: 'Nombre',
      name: 'nombre',
      value: user.nombre,
      onChange: handleChange,
      required: true
    },
    {
      id: 'apellidos',
      label: 'Apellidos',
      name: 'apellidos',
      value: user.apellidos,
      onChange: handleChange,
      required: true
    },
    {
      id: 'direccion',
      label: 'Dirección',
      name: 'direccion',
      value: user.direccion,
      onChange: handleChange,
      required: true
    },
    {
      id: 'correo',
      label: 'Correo',
      name: 'correo',
      type: 'email',
      value: user.correo,
      onChange: handleChange,
      required: true
    },
    {
      id: 'telefono',
      label: 'Teléfono',
      name: 'telefono',
      value: user.telefono,
      onChange: handleChange,
      required: true
    },
    {
      id: 'rol',
      label: 'Rol',
      name: 'rol',
      value: user.rol,
      onChange: handleChange,
      required: true,
      type: 'select',
      valuedisable: 'Seleccione un rol',
      options: [
        { value: 'user', label: 'Usuario' },
        { value: 'admin', label: 'Administrador' }
      ]
    },
    {
      id: 'estado',
      label: 'Estado',
      name: 'estado',
      value: user.estado,
      onChange: handleChange,
      required: true,
      type: 'select',
      valuedisable: 'Seleccione un estado',
      options: [
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' }
      ]
    },
    {
      id: 'password',
      label: 'Contraseña',
      name: 'password',
      type: 'password',
      value: password,
      onChange: handleChange,
      required: false
    },
    {
      id: 'confirmPassword',
      label: 'Confirmar contraseña',
      name: 'confirmPassword',
      type: 'password',
      value: confirmPassword,
      onChange: handleChange,
      required: passwordTouched,
      hidden: !passwordTouched
    }
  ].filter(input => !input.hidden);


  const handleDeleteUser = async () => {
    const deletePromise = async () => {
      try {
        const response = await axios.delete(`${API_URL}/usuarios/delete/${id}`);

        return 'Usuario eliminado correctamente';
      } catch (error) {
        console.error('Error eliminando usuario:', error);
        throw error;
      }
    };

    toast.promise(deletePromise(), {
      loading: 'Eliminando usuario...',
      success: (data) => {
        if (onUserUpdated) {
          onUserUpdated();
        }
        // redirigir al listado
        navigate('/admin/users');
        return data;
      },
      error: (err) => {
        console.error('Error eliminando usuario:', err);
        return 'Error al eliminar el usuario';
      },
    });
  };

  return (
    <>
      <div className="">
        <TwoRowForm inputs={inputs} onSubmit={(e) => {
          e.preventDefault();
          handleSaveUser();

        }}
          title='Editar Usuario'
          onDelete={handleDeleteUser}
          buttons={[
            {
              type: 'submit',
              className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              text: 'Actualizar'
            },
            {
              type: 'button',
              className: 'px-4 py-2 border-2 border-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
              text: 'Cancelar',
              onClick: handleCancel
            }
          ]}
        />

      </div>
    </>
  );
};
