import { useNavigate } from 'react-router-dom';
import { DataTable } from '@/components/common/DataTable';

export const ProductsTable = ({ products, loading, error, onDelete }) => {
  const navigate = useNavigate();

  const columns = [
    { field: 'id', header: 'ID', sorteable: true },
    { field: 'cantidad', header: 'Cantidad', sorteable: true },
    { field: 'nombreProducto', header: 'Nombre', sorteable: true },
    { field: 'valor', header: 'Precio', sorteable: true },
    { field: 'categoria', header: 'Categoría', sorteable: true },
    { field: 'proveedor', header: 'Proveedor', sorteable: true },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <i className="bi bi-exclamation-triangle text-red-400"></i>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const handleDeleteProduct = (id) => {
    onDelete(id);
  };
  console.log(products);
  return (
    <div className="">
      <DataTable
        data={products}
        columns={columns}
        onEdit={(item) => navigate(`${item.id}/edit`)}
        onDelete={(item) => handleDeleteProduct(item.id)}
        onAdd={() => navigate('new')}
        title='Productos'
        buttonText='Crear Producto'
      />
    </div>
  );
}