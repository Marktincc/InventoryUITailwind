import { useNavigate } from 'react-router-dom';

import { DataTable } from '@/components/common/DataTable';

export const UsersTable = ({ users, loading, error, onDelete }) => {
  const navigate = useNavigate();


  const columns = [
    { field: 'id', header: 'ID', sorteable: true },
    { field: 'nombre', header: 'Nombre', sorteable: true },
    { field: 'apellidos', header: 'Apellidos', sorteable: true },
    { field: 'direccion', header: 'Dirección', sorteable: true },
    { field: 'correo', header: 'Correo', sorteable: true },
    { field: 'telefono', header: 'Teléfono', sorteable: true },
    { field: 'rol', header: 'Rol', sorteable: true },
    {
      field: 'estado',
      header: 'Estado',
      sorteable: true,
      render: (rowData) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${rowData.estado === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          {rowData.estado === 'active' ? 'Activo' : 'Inactivo'}
        </span>
      ),
    },
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

  const handleDeleteUser = (id) => {
    onDelete(id);
  };

  return (

    <div className="mt-8">
      <DataTable
        data={users}
        columns={columns}
        onEdit={(item) => navigate(`${item.id}/edit`)}
        onDelete={(item) => handleDeleteUser(item.id)}
        title='Usuarios'
        buttonText='Crear Usuario'
      />
    </div>

  );
}; 