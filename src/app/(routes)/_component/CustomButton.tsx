// components/CustomButton.js
import Link from 'next/link';
import React from 'react';

const CustomButton = ({ href , title, text }) => {
  return (
    <Link
    href={href}
    title={title}
    className="inline-block px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
  >
    {text}
  </Link>
  );
};

export default CustomButton;
