import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { TwoRowForm } from '../common/TwoRowForm';

const API_URL = import.meta.env.VITE_API_URL;

export const UserCreate = ({ onUserCreated }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nombre: '',
    apellidos: '',
    direccion: '',
    correo: '',
    telefono: '',
    password: '',
    rol: 'user',
    estado: 'active'
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const [createAnother, setCreateAnother] = useState(false);


  const handleSaveUser = async (shouldCreateAnother = false) => {
    // Validar que las contraseñas coincidan
    if (user.password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    const savePromise = async () => {
      try {
        const response = await axios.post(`${API_URL}/usuarios/create`, {
          nombre: user.nombre,
          apellidos: user.apellidos,
          direccion: user.direccion,
          correo: user.correo,
          telefono: user.telefono,
          password: user.password,
          rol: user.rol,
          estado: user.estado === 'active'
        });
        return 'Usuario creado correctamente';
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
    };

    toast.promise(savePromise, {
      loading: 'Guardando usuario...',
      success: (data) => {
        // Notificar al componente padre para actualizar el listado
        if (onUserCreated) {
          onUserCreated();
        }

        if (shouldCreateAnother) {
          // Limpiar el formulario para crear otro usuario
          setUser({
            nombre: '',
            apellidos: '',
            direccion: '',
            correo: '',
            telefono: '',
            password: '',
            rol: 'user',
            estado: 'active'
          });
          setConfirmPassword('');
        } else {
          // redirigir al listado
          navigate('/admin/users');
        }
        return data;
      },
      error: (err) => {
        console.error('Error saving user:', err);
        return 'Error al guardar el usuario';
      },
    });
  };

  const handleCreateAndCreateAnother = (e) => {
    e.preventDefault();
    handleSaveUser(true);
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
      id: 'password',
      label: 'Contraseña',
      name: 'password',
      type: 'password',
      value: user.password,
      onChange: handleChange,
      required: true
    },
    {
      id: 'confirmPassword',
      label: 'Confirmar contraseña',
      name: 'confirmPassword',
      type: 'password',
      value: confirmPassword,
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
    }
  ];

  return (
    <>

      <div className="">
        <TwoRowForm
          inputs={inputs}
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveUser(createAnother);
            setCreateAnother(false);
          }}
          title='Crear Usuario'
          buttons={[
            {
              type: 'submit',
              className: "px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              text: 'Crear'
            },
            {
              type: 'submit',
              className: 'px-4 py-2 border-2 border-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
              text: 'Crear & Crear otro',
              onClick: () => setCreateAnother(true),
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

