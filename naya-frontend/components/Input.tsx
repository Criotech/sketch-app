import React, { FC } from 'react';

interface IProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
  name: string;
}

const Input: FC<IProps> = ({ handleChange, type, placeholder, name }) => {
  return (
    <input
      className='py-2.5 px-[13px] border-gray-300 outline-none border-2 rounded-md w-full text-sm'
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={handleChange}
      required
    />
  );
};

export default Input;
