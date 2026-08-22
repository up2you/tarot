import React from 'react';
import { Mail } from 'lucide-react';

interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  placeholder = 'your@email.com',
  label = '電子郵件',
  required = true,
  error,
  disabled = false,
}) => {
  return (
    <div className="w-full text-left">
      {label && (
        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-0.5">
          {label}
        </label>
      )}
      <div className="relative rounded-xl overflow-hidden group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8A9E] group-focus-within:text-[#D4AF37] transition-colors duration-300">
          <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <input
          type="email"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete="email"
          className={`w-full bg-[#18112C]/90 text-gray-100 placeholder-[#605B73] text-sm sm:text-base rounded-xl py-3 pl-11 pr-4 border transition-all duration-300 outline-none ${
            error
              ? 'border-red-500/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/30'
              : 'border-[#D4AF37]/30 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#7B4DFF]/40 focus:bg-[#20163B]'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-400 ml-1">{error}</p>}
    </div>
  );
};
