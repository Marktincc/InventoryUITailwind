import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { TwoRowForm } from '../common/TwoRowForm';
import { ConfirmModal } from '../common/ConfirmModal';

export const ProductsEdit = ({ onProductsUpdated }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    nombreProducto: '',
    cantidad: 0,
    valor: 0,
    providerId: 0,
    categoriaId: '',
  });
  const [proveedores, setProveedores] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [provRes, catRes] = await Promise.all([
          axios.get('http://localhost:8080/proveedores/getAll'),
          axios.get('http://localhost:8080/categorias/getAll'),
        ]);
        setProveedores(provRes.data);
        setCategorias(catRes.data);

      } catch (err) {
        console.error('Error cargando proveedores o categorías:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/productos/getById/${id}`);
        const product = response.data;
        setProduct({
          nombreProducto: product.nombreProducto,
          cantidad: product.cantidad,
          valor: product.valor,
          providerId: product.providerId,
          categoriaId: product.categoriaId,
        });

      } catch (error) {
        console.error('Error cargando producto:', error);
        toast.error('Error cargando producto');
        navigate('/admin/products');
      }
    };
    fetchProduct();
  }, [id, navigate]);
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleSaveProduct = async () => {
    const savePromise = async () => {
      try {
        console.log('Producto a enviar:', product);
        const response = await axios.patch(`http://localhost:8080/productos/update/${id}`, {
          nombreProducto: product.nombreProducto,
          cantidad: product.cantidad,
          valor: product.valor,
          providerId: product.providerId,
          categoriaId: product.categoriaId,
        });
        return 'Producto actualizado correctamente';
      } catch (error) {
        console.error('Error actualizando producto:', error);
        throw error;
      }
    };
    toast.promise(savePromise, {
      loading: 'Guardando producto...',
      success: (data) => {
        if (onProductsUpdated) {
          onProductsUpdated();
        }
        navigate('/admin/products');
        return data;
      },
      error: (err) => {
        console.error('Error guardando producto:', err);
        return 'Error al guardar el producto';
      },
    })
  }

  const handleCancel = () => {
    navigate('/admin/products');
  };
  const inputs = [
    {
      id: 'nombreProducto',
      label: 'Nombre Producto',
      name: 'nombreProducto',
      value: product.nombreProducto,
      onChange: handleChange,
    },
    {
      id: 'cantidad',
      label: 'Cantidad',
      name: 'cantidad',
      value: product.cantidad,
      onChange: handleChange,

    },
    {
      id: 'valor',
      label: 'Valor',
      name: 'valor',
      value: product.valor,
      onChange: handleChange,

    },
    {
      id: 'providerId',
      label: 'Proveedor',
      name: 'providerId',
      value: product.providerId,
      onChange: handleChange,
      type: 'select',
      options: proveedores.map((p) => ({
        value: p.id,
        label: p.nombre,
      })),
      valuedisable: 'Seleccione un proveedor',
    },
    {
      id: 'categoriaId',
      label: 'Categoría',
      name: 'categoriaId',
      value: product.categoriaId,
      onChange: handleChange,
      type: 'select',
      options: categorias.map((c) => ({
        value: c.id,
        label: c.name,
      })),
      valuedisable: 'Seleccione una categoría',
    },
  ];

  const handleDeleteProduct = async () => {
    const deletePromise = async () => {
      try {
        const response = await axios.delete(`http://localhost:8080/productos/delete/${id}`);
        
        return 'Producto eliminado correctamente';   
      }catch (error) {
        console.error('Error al eliminar el producto:', error);
       throw error;
      }
    };
    toast.promise(deletePromise(), {
      loading: 'Eliminando producto...',
      success: (data) => {
        if (onProductsUpdated) {
          onProductsUpdated();
        }
        navigate('/admin/products');
        return data;
      },
      error: (err)=>{
        return 'Error al eliminar el producto'
      },
    });
    
  }
  return (
    <>
      <div className="">
        <TwoRowForm inputs={inputs} onSubmit={(e) => {
          e.preventDefault();
          handleSaveProduct();

        }}
        onDelete={handleDeleteProduct}
        title={'Editar Producto'}
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
}