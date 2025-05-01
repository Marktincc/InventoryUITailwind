import React from 'react';
import { FloatingInput } from './FloatingInput';
import { FloatingSelect } from './FloatingSelect';

export const TwoRowForm = ({ inputs, onSubmit, buttons }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
  );
};
