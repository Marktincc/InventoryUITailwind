import { useNavigate } from 'react-router-dom';
import { DataTable } from '@/components/common/DataTable';

export const SalesTable = ({ sales, loading, error, onDelete }) => {
  const navigate = useNavigate();
  const columns = [
    { header: 'ID Venta', field: 'id_venta', sorteable: true },
    { header: 'Fecha', field: 'fecha_venta', sorteable: true },
    { header: 'Producto', field: 'productoNombre', sorteable: true },
    { header: 'Cliente', field: 'clienteNombre', sorteable: true },
    { header: 'Cantidad', field: 'cantidad', sorteable: true },
    { header: 'Valor Total', field: 'valor_total', sorteable: true },
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
  const handleDeleteSale = (id) => {
    onDelete(id);
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={sales}
        onEdit={(item) => navigate(`${item.id_venta}/edit`)}
        onDelete={(item) => handleDeleteSale(item.id_venta)}
        title="Ventas"
        buttonText="Crear Venta"
      />
    </div>
  );
};
