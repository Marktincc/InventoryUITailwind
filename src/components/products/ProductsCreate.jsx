import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { TwoRowForm } from '../common/TwoRowForm';

export const ProductsCreate = ({ onProductsCreated }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    nombreProducto: '',
    cantidad: 0,
    valor: 0,
    providerId: '',
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

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const [createAnother, setCreateAnother] = useState(false);

  const handleSaveProduct = async (shouldCreateAnother = false) => {
    const savePromise = async () => {
      try {
        await axios.post('http://localhost:8080/productos/create', {
          nombreProducto: product.nombreProducto,
          cantidad: product.cantidad,
          valor: product.valor,
          providerId: product.providerId,
          categoriaId: product.categoriaId,
        });
        return 'Producto creado correctamente';
      } catch (error) {
        console.error('Error creando producto:', error);
        throw error;
      }
    };

    toast.promise(savePromise, {
      loading: 'Creando Producto...',
      success: (data) => {
        if (onProductsCreated) {
          onProductsCreated();
         
        }if (shouldCreateAnother){
          setProduct({
            nombreProducto: '',
            cantidad: 0,
            valor: 0,
            providerId: '',
            categoriaId: '',
          });
        }
         else {
          navigate('/admin/products');
        }
        return data;
      },
      error: (err) => {
        console.error('Error saving user:', err);
        return 'Error al guardar el producto';
      },
    });
  };

  const handleCreateAndCreateAnother = (e) => {
    e.preventDefault();
    handleSaveProduct(true);
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  const inputs = [
    {
      id: 'nombreProducto',
      label: 'Nombre Producto',
      name: 'nombreProducto',
      required: true,
      value: product.nombreProducto,
      onChange: handleChange,
    },
    {
      id: 'cantidad',
      label: 'Cantidad',
      name: 'cantidad',
      value: product.cantidad,
      pattern: '[0-9]*',
      onChange: handleChange,

    },
    {
      id: 'valor',
      label: 'Valor',
      name: 'valor',
      pattern: '[0-9]*',
      value: product.valor,
      onChange: handleChange,

    },
    {
      id: 'providerId',
      label: 'Proveedor',
      name: 'providerId',
      value: product.providerId,
      onChange: handleChange,
      required: true,
      type: 'select',
      options: [
        { value : "",
        label : "Seleccione un proveedor",
        disabled : true},
        ...proveedores.map((p) => ({
          value: p.id,
          label: p.nombre,
        }))
      ],
      valuedisable: 'Seleccione un proveedor',
    },
    {
      id: 'categoriaId',
      label: 'Categoría',
      name: 'categoriaId',
      value: product.categoriaId,
      onChange: handleChange,
      required: true,
      type: 'select',
      options: [
       { value : "",
        label : "Seleccione una categoría",
        disabled : true},
        ...categorias.map((c) => ({
          value: c.id,
          label: c.name,
        }))
      ] ,
     valuedisable: 'Seleccione una categoría',
    },
  ];

  return (
    <div className="">
      
      <TwoRowForm
        inputs={inputs}
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveProduct(createAnother);
          setCreateAnother(false);
        }}
        title="Crear Producto"
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
  );
};
