import React, { forwardRef } from 'react';
import './index.css';

const Select = forwardRef(({
    label,
    value,
    placeholder = 'Chọn một tùy chọn...',
    options = [],
    size = 'md',
    variant = 'default',
    className = '',
    error = '',
    disabled = false,
    onChange,
    ...props
}, ref) => {
    const baseClasses = 'block w-full rounded-md focus:ring-2 focus:ring-offset-2 transition-colors duration-200 cursor-pointer';

    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg',
    };

    const variantClasses = {
        default: error
            ? 'border-red-500 bg-red-50 text-red-900 focus:ring-red-500'
            : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500',
        outline: error
            ? 'border-red-500 text-red-900 focus:ring-red-500'
            : 'border-gray-300 text-gray-900 focus:ring-blue-500',
        filled: error
            ? 'bg-red-50 text-red-900 focus:ring-red-500'
            : 'bg-gray-100 text-gray-900 focus:ring-blue-500',
    };

    const disabledClasses = disabled
        ? 'opacity-50 cursor-not-allowed bg-gray-50'
        : '';

    const selectClasses = `
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabledClasses}
        ${className}`
        .trim().replace(/\s+/g, ' ');

    const handleChange = (e) => {
        if (disabled) return;
        onChange?.(e);
    };

    return(
        <div className="inputContainer">
            {label &&
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            }

            <div className="relative">
                <select
                    ref={ref}
                    value={value}
                    className={selectClasses}
                    onChange={handleChange}
                    disabled={disabled}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}

                    {options.map((option, index) => {
                        const optionValue = typeof option === 'string' ? option : option.value;
                        const optionLabel = typeof option === 'string' ? option : option.label;
                        const isDisabled = typeof option === 'object' && option.disabled;

                        return (
                            <option
                                key={optionValue || index}
                                value={optionValue}
                                disabled={isDisabled}
                            >
                                {optionLabel}
                            </option>
                        );
                    })}
                </select>



            </div>

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
});

Select.displayName = 'Select';
export default Select;