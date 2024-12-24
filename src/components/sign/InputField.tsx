// components/InputField.tsx
import React from 'react';

interface InputFieldProps {
  id: string; 
  label: string; 
  type?: string; 
  placeholder: string; 
  register: any; 
  error?: string; 
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type = 'text', placeholder, register, error }) => (
  <div className="mb-5">
    <label htmlFor={id} className="font-bold">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="border-softly border rounded-md block mt-2 px-2 py-1 w-full focus:outline-primary"
      {...register(id)} 
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default InputField;
