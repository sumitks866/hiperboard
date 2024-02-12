import React from "react";

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
  autoFocus?: boolean;
  fixedValue?: string;
  isInline?: boolean;
  disabled?: boolean;
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
  autoFocus,
  fixedValue = "",
  isInline = false,
  disabled,
}: ITextInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.startsWith(fixedValue)) {
      const modifiableValue = e.target.value.substring(fixedValue.length);
      onChange && onChange(e, modifiableValue);
    }
  };
  return (
    <div className={classname}>
      {label && (
        <label htmlFor={id} className="block mb-2 font-semibold">
          <span>{label}</span>
          {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <input
        type="text"
        id={id}
        value={fixedValue + value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`${
          isInline ? "focus:outline-none" : "border px-2 py-2 focus:bg-white"
        }  border-gray-300 w-full rounded-md`}
        autoFocus={autoFocus}
        disabled={disabled}
      />
      {validated === "error" && (
        <span className="text-red-600 text-xs pt-2">{errorMsg || ""}</span>
      )}
    </div>
  );
}
