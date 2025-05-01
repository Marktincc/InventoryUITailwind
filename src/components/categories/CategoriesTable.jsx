import { useNavigate } from 'react-router-dom';
import { DataTable } from '@/components/common/DataTable';

export const CategoriesTable = ({ categories, loading, error,onDelete }) => {
  const navigate = useNavigate();

  const columns = [
    { field: 'id', header: 'ID', sorteable: true },
    { field: 'name', header: 'Name', sorteable: true },
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
  }  const handleDeleteCategorie = (id) => {
    onDelete(id);
  };
  return (
    <div className="">
      <DataTable
        data={categories}
        columns={columns}
        title='Categorías'
        buttonText='Crear Categoría'
        onEdit={(item) => navigate(`${item.id}/edit`)} 
        onDelete={(item) => handleDeleteCategorie(item.id)}
        />

    </div>
  );
};
