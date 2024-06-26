import { SelectOption } from "@/utils/types";
import { find, isEqual, isUndefined } from "lodash";
import React, { useEffect, useState } from "react";

interface ISelectProps {
  label?: string;
  selected?: any;
  placeholder?: string;
  id?: string;
  classname?: string;
  onChange?: (value: any) => void;
  options: SelectOption<any>[];
  typeahead?: boolean;
  required?: boolean;
  validated?: "default" | "error";
  errorMsg?: string;
  isInline?: boolean;
  open?: boolean;
}

export default function Select({
  label,
  selected,
  onChange,
  placeholder,
  id,
  classname,
  options,
  typeahead = false,
  required,
  validated,
  errorMsg,
  isInline = false,
  open = false,
}: ISelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [selectedOption, setSelectedOption] = useState<SelectOption<any>>();
  const [query, setQuery] = useState<string>("");

  const handleSelect = (option: SelectOption<any>) => {
    onChange && onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const _selectedOption = find(options, (o) => {
      return isEqual(o.value, selected);
    });
    if (!isUndefined(_selectedOption)) setSelectedOption(_selectedOption);
  }, [selected, options, label]);

  return (
    <div className={`${classname} select-none`}>
      {label && (
        <label htmlFor={id} className="block mb-2 font-semibold">
          <span>{label}</span>
          {required && <span className="text-red-600">*</span>}
        </label>
      )}

      <div className="w-full relative">
        <div
          className={`${
            isInline ? "" : "px-2 border border-gray-300 min-h-9"
          } w-full  flex items-center rounded-md cursor-pointer`}
          onClick={() => setIsOpen((pre) => !pre)}
        >
          {selectedOption ? (
            <>{selectedOption.keyNode || selectedOption?.label}</>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border-gray-400 rounded-b-sm shadow-lg z-10 p-2 max-h-[300px] overflow-y-auto min-w-fit">
            {(options || []).map((option, index) => (
              <div
                className={`${
                  isInline ? "p-1" : "p-2"
                }  cursor-pointer hover:bg-gray-100 focus:bg-gray-200 min-w-fit ${
                  isEqual(option.value, selected) && "bg-gray-200"
                }`}
                key={index}
                onClick={() => handleSelect(option)}
              >
                {option.keyNode || option.label}
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
