import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-gray-800 rounded-xl border border-gray-700 ${className}`}>
      {children}
    </div>
  );
};