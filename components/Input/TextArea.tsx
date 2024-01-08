import React, { useState } from "react";

interface ITextInputProps {
  label?: string;
  value?: string;
  placeholder?: string;
  id?: string;
  classname?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>, v: string) => void;
  required?: boolean;
  validated?: "default" | "error";
  errorMsg?: string;
}

export default function TextArea({
  label,
  value,
  onChange,
  placeholder,
  id,
  classname,
  required,
  validated,
  errorMsg,
}: ITextInputProps) {
  return (
    <div className={classname}>
      <label htmlFor={id} className="block mb-2 font-semibold">
        <span>{label}</span>
        {required && <span className="text-red-600">*</span>}
      </label>
      <textarea
        id={id}
        value={value || ""}
        onChange={(e) => onChange && onChange(e, e.target.value)}
        placeholder={placeholder}
        className={`border-2 border-white px-3 py-2 rounded-md w-full focus:outline-none focus:border-gray-500`}
        rows={8}
      />
      {validated === "error" && (
        <span className="text-red-600 text-xs pt-2">{errorMsg || ""}</span>
      )}
    </div>
  );
}
