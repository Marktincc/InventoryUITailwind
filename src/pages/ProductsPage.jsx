import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { ProductsTable } from '@/components/products/ProductsTable';

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const isListView = location.pathname === '/admin/products';

  useEffect(() => {
    if (isListView) {
      fetchProducts();
    }
  }, [isListView]);

  useEffect(() => {
    console.log('Products actualizados:', products);
  }, [products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/productos/getAllPrueba');
      
      const formattedProducts = response.data.map(product => ({
        id: product.id,
        nombreProducto: product.nombreProducto,
        valor: product.valor,
        cantidad: product.cantidad,
        categoria: product.categoriaNombre, 
        proveedor: product.proveedorNombre
      }));

      setProducts(formattedProducts);
      setError(null);
     
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      setError('No se pudieron cargar los productos. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    const deletePromise = async () => {
      try {
        const response = await axios.delete(`http://localhost:8080/productos/delete/${id}`);
        setProducts(products.filter(product => product.id !== id));
        return 'Producto eliminado correctamente';   
      }catch (error) {
        console.error('Error al eliminar el producto:', error);
       throw error;
      }
    };
    toast.promise(deletePromise(), {
      loading: 'Eliminando producto...',
      success: (data) => {
        return data;
      },
      error: (err)=>{
        return 'Error al eliminar el producto'
      },
    });
    
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isListView ? (
        <ProductsTable
          products={products}
          loading={loading}
          error={error}
          onDelete={handleDeleteProduct}

        />
      ) : (
        <Outlet context={{ fetchProducts }} />
      )}
    </div>
  );

};