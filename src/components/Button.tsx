import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  isLoading = false,
  className = '',
  ...props 
}: ButtonProps) => {
  const baseStyles = 'w-full px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center';
  
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90',
    secondary: 'border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : children}
    </button>
  );
};

export default Button;