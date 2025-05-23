import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import inventoryManagement from '@/assets/inventory-management.webp';

export const Login = () => {
  const { formData, isLoading, handleChange, handleLogin } = useAuth();

  return (
    <>
      <div className='vh-screen'>
        <div className='flex flex-row h-screen'>
          {/* Formulario */}
          <div className='w-full md:w-1/2 flex justify-center items-center p-0 h-full'>
            <div className='overflow-hidden rounded-lg w-150 bg-gray-800 h-[80%] flex items-center shadow-lg'>
              <div className='px-8 py-10 w-full'>
                <LoginForm
                  formData={formData}
                  isLoading={isLoading}
                  handleChange={handleChange}
                  handleLogin={handleLogin}
                />
              </div>
            </div>
          </div>
          {/* Imagen al lado derecho, solo visible en md+ */}
          <div className='hidden md:flex w-1/2 h-full items-center justify-center bg-gray-900'>
            <img
              src={inventoryManagement}
              alt="Inventario"
              className="object-cover h-[80%] w-[90%] rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};