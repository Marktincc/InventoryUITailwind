import React, { useState, useEffect } from 'react';
import { FloatingInput } from './FloatingInput';
import { FloatingSelect } from './FloatingSelect';
import { ConfirmModal } from '../common/ConfirmModal';


export const TwoRowForm = ({ inputs, onSubmit, buttons, title, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  }
  const handleConfirmDelete = () => {
    onDelete();
    setShowDeleteModal(false);
  }
  return (
    <>
      <header className='items-start justify-between space-y-2 sm:flex sm:space-x-4 sm:space-y-0 sm:py-4 sm:rtl:space-x-reverse'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
        </div>
        <div className='flex flex-wrap items-center gap-4 justify-start shrink-0'>
          {onDelete && (
            <button
              type='button'
              className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              onClick={handleDeleteClick}
            >
              Eliminar
            </button>
          )}
        </div>
      </header>
      <div className='rounded-xl border border-gray-300 bg-gray-800 p-6 mt-6'>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Fila de inputs con dos columnas en pantallas grandes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputs.map((input, index) => (
              <div key={index} className="w-full">
                {input.type === 'select' ? (
                  <FloatingSelect
                    id={input.id}
                    label={input.label}
                    name={input.name}
                    value={input.value}
                    onChange={input.onChange}
                    valuedisable={input.valuedisable}
                    required={input.required}
                    options={input.options}
                    disabled={input.disabled}
                  />
                ) : (
                  <FloatingInput
                    id={input.id}
                    label={input.label}
                    name={input.name}
                    type={input.type || 'text'}
                    value={input.value}
                    onChange={input.onChange}
                    required={input.required}
                    placeholder={input.placeholder}
                    disabled={input.disabled}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Botones */}
          {buttons && (
            <div className="flex justify-start mt-6 gap-4">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  type={button.type}
                  onClick={button.onClick}
                  className={button.className}
                >
                  {button.text}
                </button>
              ))}
            </div>
          )}
        </form>
      </div>
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title={title}
        message="¿Estás seguro de que deseas eliminar este producto?"
      />
    </>
  );
};
