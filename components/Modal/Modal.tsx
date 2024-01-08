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
    <div className="fixed top-0 left-0 w-full h-full overflow-auto flex justify-center pt-40 bg-gray-800 bg-opacity-50 z-[999]">
      <div className="bg-white p-4 rounded-sm shadow-lg w-fit h-fit relative">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <i className="fa fa-times" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
