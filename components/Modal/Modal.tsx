import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full overflow-auto flex justify-center pt-40 bg-gray-800 bg-opacity-50 z-[999]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-sm shadow-lg w-fit h-fit relative max-h-[80%] overflow-y-auto overflow-x-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          
          <i className="fa fa-times" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
