import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { TwoRowForm } from '../common/TwoRowForm';

const API_URL = import.meta.env.VITE_API_URL;

export const CategoriesEdit = ({ onCategoryUpdated }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({
    name: '',
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${API_URL}/categorias/getById/${id}`);
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category:', error);
        toast.error('Error al cargar los datos de la categoría');
        navigate('/admin/categories');
      }
    };
    fetchCategory();
  }, [id, navigate]);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSaveCategory = async () => {
    const savePromise = async () => {
      try {
        const response = await axios.patch(`${API_URL}/categorias/update/${id}`, {
          name: category.name,
        });
        toast.success('Categoría actualizada correctamente');
        navigate('/admin/categories');
      } catch (error) {
        console.error('Error updating category:', error);
        toast.error('Error al actualizar la categoría');
      }
    };

    toast.promise(savePromise, {
      loading: 'Actualizando categoría...',
      success: (data) => {
        if (onCategoryUpdated) {
          onCategoryUpdated();
        }
        navigate('/admin/categories');
        return data;
      },
      error: (err) => {
        console.error('Error updating category:', err);
        return 'Error al actualizar la categoría';
      },
    });
  };

  const handleCancel = () => {
    navigate('/admin/categories');
  };

  const handleDeleteCategorie = async () => {
    const deletePromise = async () => {
      try {
        const response = await axios.delete(`${API_URL}/categorias/delete/${id}`);
        return 'Categoría eliminada correctamente';
      } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
      }
    };
    toast.promise(deletePromise(), {
      loading: 'Eliminando categoría...',
      success: (data) => {
        if (onCategoryUpdated) {
          onCategoryUpdated();
        }
        navigate('/admin/categories');
        return data;
      },
      error: (err) => {
        return 'Error al eliminar la categoría';
      },
    });

  }
  const inputs = [
    {
      id: 'name',
      label: 'Nombre',
      name: 'name',
      value: category.name,
      onChange: handleChange,
      required: true,
    },
  ];

  return (
    <>
      <div className="">
        <TwoRowForm inputs={inputs} onSubmit={(e) => {
          e.preventDefault();
          handleSaveCategory();
        }}
          title="Editar Categoría"
          onDelete={handleDeleteCategorie}
          buttons={[
            {
              type: 'submit',
              className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              text: 'Actualizar',
            },
            {
              type: 'button',
              className: 'px-4 py-2 border-2 border-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
              text: 'Cancelar',
              onClick: handleCancel,
            },
          ]}
        />
      </div>
    </>
  );
};
