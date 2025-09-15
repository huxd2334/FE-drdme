import React, { forwardRef } from 'react';
import './index.css';

const Input = forwardRef(({
    label,
    value,
    placeholder = '',
    type = 'text',
    size = 'md',
    variant = 'filled',
    className = '',
    error = '',
    onChange,
    disabled = false,
    ...props
}, ref) => {
    const baseClasses = 'block w-full rounded-md focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg',
    };
    const variantClasses = {
        default: error ? 'border-red-500 bg-red-50 text-red-900 focus:ring-red-500' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500',
        outline: error ? 'border-red-500 text-red-900 focus:ring-red-500' : 'border-gray-300 text-gray-900 focus:ring-blue-500',
        filled: error ? 'bg-red-50 text-red-900 focus:ring-red-500' : 'bg-gray-100 text-gray-900 focus:ring-blue-500',
    };

    const inputClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}`
    .trim().replace(/\s+/g, ' ');

    const handleChange = (e) => {
        if (disabled) return;
        onChange && onChange(e);
    }
    return(
        <div className="inputContainer">
            {label &&
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>}

            <div className="relative">

            <input
                ref={ref}
                type={type}
                value={value}
                placeholder={placeholder}
                className={inputClasses}
                onChange={handleChange}
                {...props}
            />

            </div>
            <div className="min-h-[18px] mt-1 text-sm text-red-600">
              {error && <span>{error}</span>}
            </div>
        </div>
    );
    }
)
Input.displayName = 'Input';
export default Input;