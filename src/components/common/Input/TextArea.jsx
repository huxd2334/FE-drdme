import React, { forwardRef, useEffect, useId, useRef } from 'react';

/**
 * TextArea component
 * Props:
 * - label?: string
 * - helperText?: string
 * - error?: string | boolean
 * - success?: boolean
 * - value?: string
 * - defaultValue?: string
 * - onChange?: (e) => void
 * - rows?: number (default 4)
 * - maxLength?: number
 * - showCount?: boolean (default false)
 * - autoResize?: boolean (default false)
 * - disabled?: boolean
 * - readOnly?: boolean
 * - required?: boolean
 * - resize?: 'y' | 'x' | 'both' | 'none' (default 'y')
 * - variant?: 'outline' | 'filled' | 'ghost' (default 'outline')
 * - size?: 'sm' | 'md' | 'lg' (default 'md')
 * - className?: string
 * - wrapperClassName?: string
 */
const TextArea = forwardRef(({
  label,
  helperText,
  error = false,
  success = false,
  value,
  defaultValue,
  onChange,
  rows = 4,
  maxLength,
  showCount = false,
  autoResize = false,
  disabled = false,
  readOnly = false,
  required = false,
  resize = 'y',
  variant = 'outline',
  size = 'md',
  className = '',
  wrapperClassName = '',
  id,
  ...props
}, refFromParent) => {
  const internalId = useId();
  const textareaRef = useRef(null);
  const ref = refFromParent || textareaRef;

  // --- classes ---
  const sizeClasses = {
    sm: 'text-sm px-3 py-2 rounded-lg',
    md: 'text-base px-4 py-3 rounded-xl',
    lg: 'text-lg px-5 py-4 rounded-2xl',
  }[size];

  const variantClasses = {
    outline: `
      bg-white border border-slate-300
      focus:border-transparent focus:ring-4 focus:ring-blue-300/40
      shadow-sm
    `,
    filled: `
      bg-slate-50 border border-transparent
      focus:border-transparent focus:ring-4 focus:ring-blue-300/40
      shadow-inner
    `,
    ghost: `
      bg-transparent border border-transparent
      focus:border-transparent focus:ring-4 focus:ring-blue-300/40
    `,
  }[variant];

  const stateClasses = error
    ? 'border-red-400 focus:ring-red-300/40'
    : success
    ? 'border-emerald-400 focus:ring-emerald-300/40'
    : '';

  const disabledClasses = disabled
    ? 'opacity-60 cursor-not-allowed bg-slate-100 text-slate-500'
    : '';

  const resizeClass = {
    y: 'resize-y',
    x: 'resize-x',
    both: 'resize',
    none: 'resize-none',
  }[resize];

  // --- autoResize effect ---
  useEffect(() => {
    if (!autoResize) return;
    const el = (ref?.current) || textareaRef.current;
    if (!el) return;
    const adjust = () => {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    };
    adjust();
    // Adjust on input
    const handler = () => adjust();
    el.addEventListener('input', handler);
    return () => el.removeEventListener('input', handler);
  }, [autoResize, ref, value]);

  // --- counter ---
  const currentLen = (value ?? defaultValue ?? '')?.length ?? 0;

  const computedId = id || internalId;

  return (
    <div className={`flex flex-col gap-1 ${wrapperClassName}`}>
      {label && (
        <label
          htmlFor={computedId}
          className="text-sm font-medium text-slate-700 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <textarea
          id={computedId}
          ref={ref}
          className={`
            w-full outline-none
            ${sizeClasses}
            ${variantClasses}
            ${stateClasses}
            ${disabledClasses}
            ${resizeClass}
            transition-all duration-200
            placeholder:text-slate-400
            focus:shadow-lg
            ${className}
          `.replace(/\s+/g, ' ').trim()}
          rows={rows}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={!!error}
          aria-describedby={helperText ? `${computedId}-help` : undefined}
          {...props}
        />

        {showCount && maxLength && (
          <div className="pointer-events-none absolute bottom-1.5 right-2 text-xs text-slate-400">
            {currentLen}/{maxLength}
          </div>
        )}
      </div>

      {(helperText || error) && (
        <p
          id={`${computedId}-help`}
          className={`text-xs ${
            error ? 'text-red-600' : success ? 'text-emerald-600' : 'text-slate-500'
          }`}
        >
          {typeof error === 'string' ? error : helperText}
        </p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
