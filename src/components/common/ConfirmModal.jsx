import React from 'react';

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message
}) => {
  if (!isOpen) return null;

  // Función para cerrar el modal si haces clic fuera del modal
  const handleBackgroundClick = (e) => {
    // Cerrar el modal solo si el clic ocurrió fuera del contenido del modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={handleBackgroundClick} // Detectar clic fuera del modal
    >
      <div
        className="relative w-[384px] max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6"
        onClick={(e) => e.stopPropagation()} // Evitar que el clic en el contenido del modal cierre el modal
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-600 my-4">{message}</p>
        </div>
        <hr className="border-t border-gray-300 px-2 p-2 w-full" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-500 focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
