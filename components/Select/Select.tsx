import { SelectOption } from "@/utils/types";
import { isEqual } from "lodash";
import React, { useState } from "react";

interface ISelectProps {
  label?: string;
  value?: string;
  placeholder?: string;
  id?: string;
  classname?: string;
  onChange?: (value: any) => void;
  options: SelectOption<any>[] | string[];
  typeahead?: boolean;
  required?: boolean;
  validated?: "default" | "error";
  errorMsg?: string;
}

export default function Select({
  label,
  value,
  onChange,
  placeholder,
  id,
  classname,
  options,
  typeahead = false,
  required,
  validated,
  errorMsg,
}: ISelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: SelectOption<any> | string) => {
    onChange && onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`${classname}`}>
      <label htmlFor={id} className="block mb-2 font-semibold">
        <span>{label}</span>
        {required && <span className="text-red-600">*</span>}
      </label>

      <div className="w-full relative">
        <div
          className={`bg-white border-2 border-white p-3 rounded-md focus:outline-none focus:border-gray-500 w-full h-12`}
          onClick={() => setIsOpen((pre) => !pre)}
        >
          {value || ""}
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 mt-0 w-full bg-white border-t border-gray-300 rounded-b-md shadow-md z-10 p-2 max-h-[300px] overflow-y-auto">
            {options.map((option, index) => (
              <div
                className={`p-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-200 ${
                  isEqual(
                    typeof option === "string" ? option : option.label,
                    value
                  ) && "bg-gray-200"
                }`}
                key={index}
                onClick={() => handleSelect(option)}
              >
                {typeof option === "string" ? option : option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {validated === "error" && (
        <span className="text-red-600 text-xs pt-2">{errorMsg || ""}</span>
      )}
    </div>
  );
}
