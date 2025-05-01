import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { TwoRowForm } from '../common/TwoRowForm';
import { ConfirmModal } from '../common/ConfirmModal';


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
        const response = await axios.get(`http://localhost:8080/categorias/getById/${id}`);
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
        const response = await axios.patch(`http://localhost:8080/categorias/update/${id}`, {
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
  const handleDeleteClick = () => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  }
  const handleDeleteCategorie = async () => {
    const deletePromise = async () => {
      try {
        const response = await axios.delete(`http://localhost:8080/categorias/delete/${itemToDelete}`);
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
      <header className='items-start justify-between space-y-2 sm:flex sm:space-x-4 sm:space-y-0 sm:py-4 sm:rtl:space-x-reverse mb-16'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Editar Categoría</h1>
        </div>
        <div className='flex flex-wrap items-center gap-4 justify-start shrink-0'>
            <button
              type='button'
              className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              onClick={handleDeleteClick}
            >
              Eliminar
            </button>

          </div>
      </header>
      <div className="">
        <TwoRowForm inputs={inputs} onSubmit={(e) => {
          e.preventDefault();
          handleSaveCategory();
        }}
          buttons={[
            {
              type: 'submit',
              className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              text: 'Actualizar',
            },
            {
              type: 'button',
              className: 'px-4 py-2 border-2 border-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
              text: 'Cancelar',
              onClick: handleCancel,
            },
          ]}
        />
      </div>
      <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            handleDeleteCategorie();
          }}
          title="Eliminar categoria"
          message="¿Estás seguro de que deseas eliminar esta categoria y los productos asociados?"
        />
    </>
  );
};
