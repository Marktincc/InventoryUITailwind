import { useNavigate } from 'react-router-dom';
import { DataTable } from '@/components/common/DataTable';

export const SuppliersTable = ({ suppliers, loading,error,onDelete }) => {
const navigate = useNavigate();
  const columns = [
    { header: 'ID', field: 'id', sorteable: true },
    { header: 'Nombre', field: 'nombre', sorteable: true },
    { header: 'Dirección', field: 'direccion', sorteable: true },
    { header: 'Teléfono', field: 'telefono', sorteable: true },
    { header: 'Email', field: 'correo', sorteable: true },
    { header: 'NIT', field: 'nit', sorteable: true },
   
  ]
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
  const handleDeleteSupplier = (id) => {
    onDelete(id);
  };

  return (
    <div className=''>
      <DataTable
        columns={columns}
        data={suppliers}
        onEdit={(item) => navigate(`${item.id}/edit`)}
        onDelete={(item) => handleDeleteSupplier(item.id)}
        title='Proveedores'
        buttonText='Crear Proveedor'

      />
    </div>
  )
}