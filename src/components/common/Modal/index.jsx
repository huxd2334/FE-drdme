import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './index.css';
import Button from '../Button/index';
import { XCircle } from 'lucide-react';

const Modal = ({
  children,
  open,
  isOpen,
  onClose,
  title,
  footer,
  size = 'md',
  className = '',
  closeOnEscape = true,
  closeOnBackdropClick = true,
  showCloseButton = true,
  container,
  ...rest
}) => {
  const visible = open ?? isOpen ?? false;

  // ❗️TẤT CẢ HOOKS Ở TRÊN, GỌI MỖI LẦN RENDER
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);
  const prevOverflow = useRef('');
  const titleIdRef = useRef(`modal-title-${Math.random().toString(36).slice(2)}`);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };
  const panelWidth = sizeClasses[size] || sizeClasses.md;

  // Lock scroll + focus
  useEffect(() => {
    if (!visible) return;
    previouslyFocusedElement.current = document.activeElement;
    prevOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modalRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow.current || '';
      previouslyFocusedElement.current?.focus?.();
    };
  }, [visible]);

  // ESC to close
  useEffect(() => {
    if (!visible || !closeOnEscape) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible, closeOnEscape, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) onClose?.();
  };

  // ✅ return sau khi đã gọi hết hooks
  if (!visible) return null;

  const portalTarget = container ?? document.body;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleIdRef.current : undefined}
        className={`bg-white rounded-lg shadow-xl w-full ${panelWidth} ${className} flex flex-col`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        {...rest}
      >
        {(title || showCloseButton) && (
          <div className="relative border-b p-4">
            {title && (
              <h2 id={titleIdRef.current} className="text-lg font-semibold pr-8">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={onClose}
                aria-label="Close"
              >
                &times;
              </button>


            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">{children}</div>

        {footer && <div className="border-t p-4">{footer}</div>}
      </div>
    </div>,
    portalTarget
  );
};

export default Modal;
