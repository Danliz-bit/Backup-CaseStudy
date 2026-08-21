import { ChevronUp, ChevronDown } from 'lucide-react';

export default function InputField({ label, type = "text", placeholder = "", className = "", labelColor = "text-white", required = false }) {
  const isNumber = type === 'number';
  
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className={`text-sm font-bold ${labelColor}`}>
        {label} {required && <span className="text-wb-red">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          className="wb-input pr-10"
        />
        {isNumber && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col -space-y-1 pointer-events-none">
            <ChevronUp size={14} className="text-black" />
            <ChevronDown size={14} className="text-black" />
          </div>
        )}
      </div>
    </div>
  );
}