import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { SuppliersTable } from '@/components/suppliers/SuppliersTable';

export const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const isListView = location.pathname === '/admin/suppliers';
 

  useEffect(() => {
    if (isListView) {
      fetchSuppliers();
    }
  }, [isListView]);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/proveedores/getAll');
      const formattedSuppliers = response.data.map((supplier) => ({
        id: supplier.id,
        nombre: supplier.nombre,
        nit: supplier.nit,
        direccion: supplier.direccion,
        telefono: supplier.telefono,
        correo: supplier.correo,
      }));
      setSuppliers(formattedSuppliers);
      setError(null);
    }catch (error) {
      console.error('Error fetching suppliers:', error);
      setError('No se pudieron cargar los proveedores. Inténtalo de nuevo más tarde.');
    }finally {
      setLoading(false);
    }
  };
  const handleDeleteSupplier = async (id) => {
    const deletePromise = async () => {
      try {
        const response = await axios.delete(`http://localhost:8080/proveedores/delete/${id}`);
        setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
        return 'Proveedor eliminado correctamente';
      }catch (error) {
        console.error('Error deleting supplier:', error);
        throw error;
      }
    };
    toast.promise(deletePromise(), {
      loading: 'Eliminando proveedor...',
      success: (data) => {
        return data;
      },
      error: (error) => {
        return 'Error al eliminar el proveedor';
      }
    });
  }
  return (
    <div className="container mx-auto px-4 py-8">
    {isListView ? (
      <SuppliersTable
        suppliers={suppliers}
        loading={loading}
        error={error}
        onDelete={handleDeleteSupplier}
        
      />
    ) : (
      <Outlet context={{ fetchSuppliers }} />
    )}
  </div>
  )
};