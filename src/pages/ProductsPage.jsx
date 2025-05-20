import { Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { ProductsTable } from '@/components/products/ProductsTable';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;

export const ProductsPage = () => {
  const location = useLocation();
  const isListView = location.pathname === '/admin/products';
  const queryClient = useQueryClient();

  const { data: products = [], isLoading, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/productos/getAllPrueba`);
      return response.data.map(product => ({
        id: product.id,
        nombreProducto: product.nombreProducto,
        valor: product.valor,
        cantidad: product.cantidad,
        categoria: product.categoriaNombre,
        proveedor: product.proveedorNombre
      }));
    },
    enabled: isListView,
  });

  const handleDeleteProduct = async (id) => {
    const deletePromise = async () => {
      try {
        await axios.delete(`${API_URL}/productos/delete/${id}`);
        queryClient.invalidateQueries(['products']);
        return 'Producto eliminado correctamente';
      } catch (error) {
        throw error;
      }
    };
    toast.promise(deletePromise(), {
      loading: 'Eliminando producto...',
      success: (data) => data,
      error: () => 'Error al eliminar el producto'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isListView ? (
        <ProductsTable
          products={products}
          loading={isLoading}
          error={error}
          onDelete={handleDeleteProduct}
        />
      ) : (
        <Outlet context={{ fetchProducts: refetch }} />
      )}
    </div>
  );
};