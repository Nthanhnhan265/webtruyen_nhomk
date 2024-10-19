import React from 'react'

interface ButtonProps {
  buttonName: string
  hexBgColor: string
  hexTextColor: string
  icon: any
  handle: () => any
}

const Button: React.FC<ButtonProps> = ({
  buttonName,
  handle,
  icon,
  hexBgColor,
  hexTextColor,
}) => {
  return (
    <button
      style={{
        backgroundColor: hexBgColor,
        color: hexTextColor,
      }}
      className="text-xs font-medium tracking-normal py-1.5 px-1 rounded-md w-14 box-content shadow"
      onClick={handle}
    >
      {buttonName}
    </button>
  )
}

export default Button
