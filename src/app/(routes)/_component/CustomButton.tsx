// components/CustomButton.js
import Link from 'next/link';
import React from 'react';

const CustomButton = ({ title, link }) => {
  return (
    <Link href={link}>
      <div className="relative group">
        <button className="bg-blue-500 text-black font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:bg-blue-600 focus:outline-none">
          {title}
        </button>
        <span className="absolute left-0 -bottom-10 w-full text-center text-xs text-gray-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {title}
        </span>
      </div>
    </Link>
  );
};

export default CustomButton;
