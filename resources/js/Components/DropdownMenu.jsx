// resources/js/Components/DropdownMenu.jsx
import React from 'react';
import { createPortal } from 'react-dom';
import { Link } from '@inertiajs/react';

export default function DropdownMenu({ children, isOpen, onClose, position }) {
  if (!isOpen) return null;

  const style = {
    top: position.top + position.height,
    left: position.left,
    transform: 'translateX(-100%)', // Align to the right of the button
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      {/* Menu */}
      <div
        className="fixed z-50 mt-2 w-48 rounded-lg bg-white shadow-xl border border-gray-200"
        style={style}
      >
        <div className="py-1">{children}</div>
      </div>
    </>,
    document.body
  );
}