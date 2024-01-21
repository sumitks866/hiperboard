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
  autoFocus?: boolean;
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
  autoFocus,
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
        className={`border border-gray-400 w-full px-2 py-2 rounded-sm bg-gray-50 focus:bg-white`}
        rows={8}
        autoFocus={autoFocus}
      />
      {validated === "error" && (
        <span className="text-red-600 text-xs pt-2">{errorMsg || ""}</span>
      )}
    </div>
  );
}
