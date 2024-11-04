// components/CustomButton.js
import Link from 'next/link';
import React from 'react';

const CustomButton = ({ href , title, text }) => {
  return (
    <Link
    href={href}
    title={title}
    className="inline-block px-1 py-1 font-light bg-gray-200 text-black text-sm rounded hover:bg-gray-300 transition-colors duration-200"
    
  >
    {text}
  </Link>
  );
};

export default CustomButton;
