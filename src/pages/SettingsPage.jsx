import { useAuthContext } from '@/context/AuthContext';
import { TwoRowForm } from '@/components/common/TwoRowForm';
import axios from 'axios';
import { toast } from 'sonner';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/usuarios/getById/${user.id}`);
        const userData = response.data;
        setUsers({
          nombre: userData.nombre,
          apellidos: userData.apellidos,
          direccion: userData.direccion,
          correo: userData.correo,
          telefono: userData.telefono,
          password: '', // No mostrar la contraseña encriptada
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
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
    if (name === 'password') setPasswordTouched(true);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSaveUser = async () => {
    // Solo validar confirmación si el usuario intenta cambiar la contraseña
    if (passwordTouched && users.password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    const savePromise = async () => {
      try {
        // Solo incluir la contraseña si el usuario la modificó
        const payload = {
          nombre: users.nombre,
          apellidos: users.apellidos,
          direccion: users.direccion,
          correo: users.correo,
          telefono: users.telefono,
          rol: users.rol,
          estado: users.estado === 'active'
        };
        if (passwordTouched && users.password) {
          payload.password = users.password;
        }
        const response = await axios.patch(`${API_URL}/usuarios/update/${user.id}`, payload);
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
        required: passwordTouched // Solo requerido si se va a cambiar
    },
    {
      id: 'confirmPassword',
      label: 'Confirmar contraseña',
      name: 'confirmPassword',
      type: 'password',
      value: confirmPassword,
      onChange: handleConfirmPasswordChange,
      required: passwordTouched,
      hidden: !passwordTouched
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
      type: 'select',
      options: [
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' }
      ]
    }
  ].filter(input => !input.hidden);
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