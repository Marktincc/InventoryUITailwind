import React, { useState, useEffect } from 'react';
import { FloatingSelect } from './FloatingSelect';
import { NavLink, useLocation } from 'react-router-dom';
import { ConfirmModal } from './ConfirmModal';

export const DataTable = ({
  data,
  columns,
  onEdit,
  onChange,
  onDelete,
  itemsPerPageOptions = [10, 25, 50, 100],
  defaultItemsPerPage = 10,
  onRowClick,
  selectedRow,
  title,
  buttonText
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [search, setSearch] = useState('');
  const path = useLocation().pathname;

  // Filtrado simple global
  const filteredData = data.filter(item =>
    columns.some(col =>
      String(item[col.field] ?? '')
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  // Calcular índices para paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Manejar cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Manejar selección de items
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Manejar selección de todos los items
  const handleSelectAll = () => {
    if (selectedItems.length === currentItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentItems.map(item => item.id));
    }
  };

  return (
    <>
      <header className='items-start justify-between space-y-2 sm:flex sm:space-x-4 sm:space-y-0 sm:py-4 sm:rtl:space-x-reverse'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
        </div>
        <div className="flex gap-2 items-center">
          {/* Búsqueda global */}
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-md h-9.5 px-3 py-1 text-sm bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Buscar en la tabla"
          />
          <NavLink to={`${path}/create`} className='inline-flex items-center justify-center py-2 gap-2 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-gray-600 hover:bg-gray-500 focus:bg-gray-700 focus:ring-offset-gray-700'>
            <span className='inline-flex items-center gap-2'>
              <i className='bi bi-plus text-sm text-bold'></i>
              {buttonText}
            </span>
          </NavLink>
        </div>
      </header>
      <div className="bg-gray-800 rounded-xl border border-gray-900 bg-gray shadow-sm mt-6 overflow-hidden">
        <div className='relative overflow-x-auto '>
          <table className="w-full table-auto divide-y text-start">
            <thead>
              <tr className='bg-gray-500/5 h-10'>
                <th scope="col" className="w-4 whitespace-nowrap px-6 py-4 text-center">
                  <label>
                    <input
                      className="block rounded border-gray-300 text-primary-600 shadow-sm outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                      type="checkbox"
                      checked={selectedItems.length === currentItems.length && currentItems.length > 0}
                      onChange={handleSelectAll}
                    />
                  </label>
                </th>
                {columns.map((column) => (
                  <th
                    key={column.field}
                    className="px-6 py-4 text-center"
                  >
                    {column.header}
                  </th>
                ))}
                <th scope="col" className="w-5 text-white px-6 py-4 text-center">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y whitespace-nowrap">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 2} className="text-center py-8 text-gray-400">
                    No hay datos para mostrar.
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id} className={`transition hover:bg-gray-600 ${selectedItems.includes(item.id) ? 'table-active' : ''} ${selectedRow === item.id ? 'table-gray' : ''}`} onClick={() => onRowClick && onRowClick(item)} style={{ cursor: onRowClick ? 'pointer' : 'default' }}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                        />
                      </div>
                    </td>
                    {columns.map((column) => (
                      <td key={column.field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                        {column.render ? column.render(item) : item[column.field]}
                        {column.field === 'status' && (
                          <span className={`status-indicator ${item.status ? 'status-active' : 'status-inactive'}`}></span>
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {onEdit && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(item);
                            }}
                            className="text-white-400 hover:text-white-300 hover:underline"
                          >
                            <i className="bi bi-pencil"> Editar</i>
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDeleteModal(true);
                              setItemToDelete(item);
                            }}
                            className="text-red-400 hover:text-amaranth-300 hover:underline"
                          >
                            <i className="bi bi-trash"> Eliminar</i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className='border-t p-2'>
          <nav aria-label="flex items-center justify-between">
            <div className='hidden flex-1 grid-cols-3 items-center lg:grid'>
              <div className='flex items-center'>
                <div className='pl-2 text-sm font-medium'>
                  Mostrando del {indexOfFirstItem + 1} al {Math.min(indexOfLastItem, data.length)} de {data.length} resultados
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-2 rtl:space-x-reverse">
                  <label className="flex items-center gap-2 text-sm font-mediun">
                    <select
                      id="pageSizeSelect"
                      name="itemsPerPage"
                      value={itemsPerPage.toString()}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="h-8 rounded-md border border-gray-300 bg-gray-800 px-3 text-sm text-white shadow-sm outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                    >
                      {itemsPerPageOptions.map((size) => (
                        <option key={size} value={size.toString()} className='bg-gray-800 text-white'>
                          {size}
                        </option>
                      ))}
                    </select>
                    <span className='text-sm font-medium text-white'>Filas por página:</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <nav
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-gray-800 p-1 shadow-sm"
                >
                  <button
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>

                  {[...Array(totalPages).keys()].map((_, idx) => {
                    const page = idx + 1
                    const isActive = page === currentPage

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`inline-flex h-8 min-w-[2rem] items-center justify-center rounded-md px-2 text-sm font-medium transition ${isActive
                          ? 'bg-gray-500 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                          }`}
                      >
                        {page}
                      </button>
                    )
                  })}

                  <button
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </nav>
              </div>

            </div>
          </nav>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          if (itemToDelete) {
            onDelete(itemToDelete);
          }
          setShowDeleteModal(false);
          setItemToDelete(null);
        }}
        title="Eliminar registro"
        message="¿Estás seguro de que deseas eliminar este registro?"
      />

    </>
  );
};
