import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { TwoRowForm } from '../common/TwoRowForm';

export const SupplierCreate = ({ onSupplierCreated }) => {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    nombre: '',
    nit: '',
    direccion: '',
    telefono: '',
    correo: '',
  });
  const handdleChange = (e) => {
    setSupplier({
      ...supplier,
      [e.target.name]: e.target.value,
    });
  };
  const [createAnother, setCreateAnother] = useState(false);

  const handleSaveSupplier = async (shouldCreateAnother) => {
    const savePromise = async () => {
      try {
        const response = await axios.post('http://localhost:8080/proveedores/create', {
          nombre: supplier.nombre,
          nit: supplier.nit,
          direccion: supplier.direccion,
          telefono: supplier.telefono,
          correo: supplier.correo,
        });
        return 'Proveedor creado correctamente';

      } catch (error) {
        console.error('Error creating supplier:', error);
        throw error;
      }
    };

    toast.promise(savePromise, {
      loading: 'Creando proveedor...',
      success: (data) => {
        if (onSupplierCreated) {
          onSupplierCreated();
        } if (shouldCreateAnother) {
          setSupplier({
            nombre: '',
            nit: '',
            direccion: '',
            telefono: '',
            correo: '',
          });
        } else {
          navigate('/admin/suppliers');
        } return data;
      },
      error: (error) => {
        console.error('Error creating supplier:', error);
        return 'Error al crear proveedor';
      },
    });
  };
  const handleCreateAndCreateAnother = (e) => {
    e.preventDefault();
    handleSaveSupplier(true);
  };
  const handleCancel = () => {
    navigate('/admin/suppliers');
  };
  const inputs = [
    {
      label: 'Nombre',
      name: 'nombre',
      type: 'text',
      value: supplier.nombre,
      onChange: handdleChange,
      required: true,
    },
    {
      label: 'NIT',
      name: 'nit',
      type: 'text',
      value: supplier.nit,
      onChange: handdleChange,
      required: true,
    },
    {
      label: 'Dirección',
      name: 'direccion',
      type: 'text',
      value: supplier.direccion,
      onChange: handdleChange,
      required: true,
    },
    {
      label: 'Teléfono',
      name: 'telefono',
      type: 'text',
      value: supplier.telefono,
      onChange: handdleChange,
      required: true,
    },
    {
      label: 'Correo',
      name: 'correo',
      type: 'text',
      value: supplier.correo,
      onChange: handdleChange,
      required: true,
    }
  ]
  return (
    <>
      <div className="">
        <TwoRowForm
          inputs={inputs}
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveSupplier(createAnother);
            setCreateAnother(false);
          }}
          title="Crear proveedor"
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
  )
};