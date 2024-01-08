import React, { useState } from "react";

interface ITextInputProps {
  label?: string;
  value?: string;
  placeholder?: string;
  id?: string;
  classname?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, v: string) => void;
  required?: boolean;
  validated?: "default" | "error";
  errorMsg?: string;
}

export default function TextInput({
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
      <input
        type="text"
        id={id}
        value={value || ""}
        onChange={(e) => onChange && onChange(e, e.target.value)}
        placeholder={placeholder}
        className="border border-gray-800 w-full px-2 py-2 rounded-sm bg-gray-100 focus:bg-white "
      />
      {validated === "error" && (
        <span className="text-red-600 text-xs pt-2">{errorMsg || ""}</span>
      )}
    </div>
  );
}
