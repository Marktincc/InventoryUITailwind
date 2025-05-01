import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import inventoryManagement from '@/assets/inventory-management.png'

export const Login = () => {
  const { formData, isLoading, handleChange, handleLogin } = useAuth();

  return (
    <>
      <div className='vh-screen'>
        <div className='flex flex-row'>
          <div className='w-1/2 flex justify-center items-center p-10 h-screen'>
            <div className='overflow-hidden rounded-lg w-150 bg-gray-800 h-full'>
              <div className='px-4 py-5 sm:p-6'>
                <LoginForm
                  formData={formData}
                  isLoading={isLoading}
                  handleChange={handleChange}
                  handleLogin={handleLogin}
                />

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};