import { ChevronUp, ChevronDown } from 'lucide-react';

export default function InputField({
  label,
  type = 'text',
  placeholder = '',
  className = '',
  labelColor = 'text-white',
  required = false,
  name,
  value,
  onChange,
  min,
  max,
}) {
  const isNumber = type === 'number';

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className={`text-sm font-bold ${labelColor}`}>
        {label} {required && <span className="text-wb-red">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          className="wb-input pr-13"
        />
      </div>
    </div>
  );
}