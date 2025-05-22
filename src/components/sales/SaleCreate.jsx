import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { TwoRowForm } from '../common/TwoRowForm';

const API_URL = import.meta.env.VITE_API_URL;

export const SaleCreate = ({ onSaleCreated }) => {
  const navigate = useNavigate();
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
        await axios.post(`${API_URL}/ventas/create`, payload);
        return 'Venta creada correctamente';
      } catch (error) {
        console.error('Error creating sale:', error);
        throw error;
      }
    };

    toast.promise(savePromise(), {
      loading: 'Creando venta...',
      success: (data) => {
        if (onSaleCreated) onSaleCreated();
        navigate('/admin/sales');
        return data;
      },
      error: () => 'Error al crear venta',
    });
  };

  const handleCancel = () => {
    navigate('/admin/sales');
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
      options: productos.map(p => ({ value: p.id, label: p.nombreProducto})),
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
    { label: 'Valor', pattern: '[0-9]*', name: 'valor', type: 'text',  value: sale.valor, onChange: handleChange, required: true },
    { label: 'Cantidad', pattern: '[0-9]*', name: 'cantidad', type: 'text', value: sale.cantidad, onChange: handleChange, required: true },
  ];

  return (
    <div>
      <TwoRowForm
        inputs={inputs}
        onSubmit={e => { e.preventDefault(); handleSaveSale(); }}
        title="Crear Venta"
        buttons={[
          {
            type: 'submit',
            className: "px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            text: 'Crear'
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
