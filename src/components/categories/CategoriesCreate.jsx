import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { TwoRowForm } from '../common/TwoRowForm';

const API_URL = import.meta.env.VITE_API_URL;

export const CategoriesCreate = ({ onCategoryCreated }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: '',
  });

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };
  const [createAnother, setCreateAnother] = useState(false);
  const handleSaveCategory = async (shouldCreateAnother = false) => {
    const savePromise = async () => {
      try {
        const response = await axios.post(`${API_URL}/categorias/create`, {
          name: category.name,
        });
        return 'Categoría creada correctamente';
      } catch (error) {
        console.error('Error creating category:', error);
        throw error;
      }
    };

    toast.promise(savePromise, {
      loading: 'Guardando categoría...',
      success: (data) => {
        if (onCategoryCreated) {
          onCategoryCreated();
        }

        if (shouldCreateAnother) {
          setCategory({
            name: '',
          });
        } else {
          navigate('/admin/categories');
        }
        return data;
      },
      error: (err) => {
        console.error('Error creating category:', err);
        return 'Error al crear la categoría';
      },
    });
  };

  const handleCreateAndCreateAnother = (e) => {
    e.preventDefault();
    handleSaveCategory(true);
  };

  const handleCancel = () => {
    navigate('/admin/categories');
  };

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
          handleSaveCategory(createAnother);
          setCreateAnother(false);
        }}
          title={'Crear categoría'}
          buttons={[
            {
              type: 'submit',
              className: "px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              text: 'Crear',
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
              onClick: handleCancel,
            },
          ]}
        />
      </div>
    </>
  );
};
