import React from 'react'

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div
    className="
      bg-red-100 text-red-800 
      border border-red-300 
      px-4 py-3 rounded 
      text-center
    "
    role="alert"
  >
    {message}
  </div>
)
