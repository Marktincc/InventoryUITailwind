import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { TwoRowForm } from '../common/TwoRowForm';

const API_URL = import.meta.env.VITE_API_URL;

export const SaleEdit = ({ onSaleUpdated }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sale, setSale] = useState({
    fecha: '',
    valor: '',
    cantidad: '',
    idProducto: '',
    idUsuario: '',
  });

  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/usuarios/getAll`)
      .then(res => setUsuarios(res.data))
      .catch(() => setUsuarios([]));
    axios.get(`${API_URL}/productos/getAllPrueba`)
      .then(res => setProductos(res.data))
      .catch(() => setProductos([]));
  }, []);

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await axios.get(`${API_URL}/ventas/getById/${id}`);
        // Si la fecha viene como "2025-05-14T19:00:00", extrae solo la parte yyyy-MM-dd para el input type="date"
        const data = { ...response.data };
        if (data.fecha && typeof data.fecha === 'string' && data.fecha.includes('T')) {
          data.fecha = data.fecha.split('T')[0];
        }
        setSale(data);
      } catch (error) {
        toast.error('Error al cargar la venta');
        navigate('/admin/sales');
      }
    };
    fetchSale();
  }, [id, navigate]);

  const handleChange = (e) => {
    setSale({
      ...sale,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveSale = async () => {
    const savePromise = async () => {
      try {
        const { id, ...payload } = sale;
        if (!payload.idProducto) delete payload.idProducto;
        if (!payload.idUsuario) delete payload.idUsuario;
        // Formatear fecha con la hora actual si es solo yyyy-MM-dd
        if (payload.fecha && /^\d{4}-\d{2}-\d{2}$/.test(payload.fecha)) {
          const now = new Date();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const seconds = String(now.getSeconds()).padStart(2, '0');
          payload.fecha = `${payload.fecha}T${hours}:${minutes}:${seconds}`;
        }
        await axios.patch(`${API_URL}/ventas/update/${id}`, payload);
        return 'Venta actualizada correctamente';
      } catch (error) {
        throw error;
      }
    };

    toast.promise(savePromise(), {
      loading: 'Actualizando venta...',
      success: (data) => {
        if (onSaleUpdated) onSaleUpdated();
        navigate('/admin/sales');
        return data;
      },
      error: () => 'Error al actualizar la venta',
    });
  };

  const handleCancel = () => {
    navigate('/admin/sales');
  };

  const handleDeleteSale = async () => {
    const deletePromise = async () => {
      try {
        await axios.delete(`${API_URL}/ventas/delete/${id}`);
        return 'Venta eliminada correctamente';
      } catch (error) {
        throw error;
      }
    };
    toast.promise(deletePromise(), {
      loading: 'Eliminando venta...',
      success: (data) => {
        if (onSaleUpdated) onSaleUpdated();
        navigate('/admin/sales');
        return data;
      },
      error: () => 'Error al eliminar la venta',
    });
  };

  const inputs = [
    { label: 'Fecha', name: 'fecha', type: 'date', value: sale.fecha, onChange: handleChange, required: true },
    {
      label: 'Producto',
      name: 'idProducto',
      type: 'select',
      value: sale.idProducto,
      onChange: handleChange,
      required: true,
      options: productos.map(p => ({ value: p.id, label: p.nombreProducto })),
    },
    {
      label: 'Usuario',
      name: 'idUsuario',
      type: 'select',
      value: sale.idUsuario,
      onChange: handleChange,
      required: true,
      options: usuarios.map(u => ({ value: u.id, label: u.nombre || u.name || u.email || u.id })),
    },
    { label: 'Valor', pattern: '[0-9]*', name: 'valor', type: 'text', value: sale.valor, onChange: handleChange, required: true },
    { label: 'Cantidad', pattern: '[0-9]*', name: 'cantidad', type: 'text', value: sale.cantidad, onChange: handleChange, required: true },
  ];

  return (
    <div>
      <TwoRowForm
        inputs={inputs}
        onSubmit={e => { e.preventDefault(); handleSaveSale(); }}
        title="Editar Venta"
        onDelete={handleDeleteSale}
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
  );
};
