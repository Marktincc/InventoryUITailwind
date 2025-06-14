import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { TwoRowForm } from '../common/TwoRowForm';

const API_URL = import.meta.env.VITE_API_URL;

export const SupplierEdit = ({ onSupplierUpdated }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [supplier, setSupplier] = useState({
    nombre: '',
    nit: '',
    direccion: '',
    telefono: '',
    correo: '',
  });
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`${API_URL}/proveedores/getById/${id}`);
        const supplierData = response.data;
        setSupplier({
          nombre: supplierData.nombre,
          nit: supplierData.nit,
          direccion: supplierData.direccion,
          telefono: supplierData.telefono,
          correo: supplierData.correo,
        });
      } catch (error) {
        console.error('Error fetching supplier:', error);
        toast.error('Error al cargar los datos del proveedor');
        navigate('/admin/suppliers');
      }
    };
    fetchSupplier();
  }, [id, navigate]);

  const handleChange = (e) => {
    setSupplier({
      ...supplier,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveSupplier = async () => {
    const savePromise = async () => {
      try {
        const response = await axios.patch(`${API_URL}/proveedores/update/${id}`, {
          nombre: supplier.nombre,
          nit: supplier.nit,
          direccion: supplier.direccion,
          telefono: supplier.telefono,
          correo: supplier.correo,
        });
        return 'Proveedor actualizado correctamente';
      } catch (error) {
        console.error('Error updating supplier:', error);
        throw error;
      };
    };
    toast.promise(savePromise(), {
      loading: 'Actualizando proveedor...',
      success: (data) => {
        if (onSupplierUpdated) {
          onSupplierUpdated();
        }
        navigate('/admin/suppliers');
        return data;
      },
      error: (error) => {
        return 'Error al actualizar el proveedor';
      },
    });
  };
  const handleCancel = () => {
    navigate('/admin/suppliers');
  };
  const inputs = [
    {
      id: 'nombre',
      label: 'Nombre',
      type: 'text',
      value: supplier.nombre,
      onChange: handleChange,
      required: true,
    },
    {
      id: 'nit',
      label: 'NIT',
      type: 'text',
      value: supplier.nit,
      onChange: handleChange,
      required: true,
    },
    {
      id: 'direccion',
      label: 'Dirección',
      type: 'text',
      value: supplier.direccion,
      onChange: handleChange,
      required: true,
    },
    {
      id: 'telefono',
      label: 'Teléfono',
      type: 'text',
      value: supplier.telefono,
      onChange: handleChange,
      required: true,
    },
    {
      id: 'correo',
      label: 'Correo',
      type: 'email',
      value: supplier.correo,
      onChange: handleChange,
      required: true,
    },
  ];

  const handleDeleteSupplier = async () => {
    const daletePromise = async () => {
      try {
        const response = await axios.delete(`${API_URL}/proveedores/delete/${id}`);
        return 'Proveedor eliminado correctamente';
      } catch (error) {
        console.error('Error deleting supplier:', error);
        throw error;
      }
    };
    toast.promise(daletePromise(), {
      loading: 'Eliminando proveedor...',
      success: (data) => {
        if (onSupplierUpdated) {
          onSupplierUpdated();
        }
        navigate('/admin/suppliers');
        return data;
      },
      error: (error) => {
        return 'Error al eliminar el proveedor';
      },
    });
  };
  return (
    <>
      <div className="">
        <TwoRowForm inputs={inputs} onSubmit={(e) => {
          e.preventDefault();
          handleSaveSupplier();

        }}
          title="Editar Proveedor"
          onDelete={handleDeleteSupplier}
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