import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  onForgotPassword?: () => void;
  showForgotPassword?: boolean;
  forgotPasswordText?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = '••••••••',
  label = '密碼',
  required = true,
  error,
  disabled = false,
  onForgotPassword,
  showForgotPassword = true,
  forgotPasswordText = '忘記密碼？',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full text-left">
      <div className="flex items-center justify-between mb-1.5 ml-0.5">
        {label && (
          <label className="block text-xs sm:text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
      </div>

      <div className="relative rounded-xl overflow-hidden group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8A9E] group-focus-within:text-[#D4AF37] transition-colors duration-300">
          <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete="current-password"
          className={`w-full bg-[#18112C]/90 text-gray-100 placeholder-[#605B73] text-sm sm:text-base rounded-xl py-3 pl-11 pr-11 border transition-all duration-300 outline-none ${
            error
              ? 'border-red-500/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/30'
              : 'border-[#D4AF37]/30 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#7B4DFF]/40 focus:bg-[#20163B]'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        
        {/* Toggle password visibility button */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? '隱藏密碼' : '顯示密碼'}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8A8A9E] hover:text-[#F6E7B7] transition-colors duration-200 focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>

      {showForgotPassword && onForgotPassword && (
        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-xs sm:text-sm text-[#D4AF37] hover:text-[#F6E7B7] hover:underline focus:outline-none transition-all duration-200 drop-shadow-[0_0_5px_rgba(212,175,55,0.3)]"
          >
            {forgotPasswordText}
          </button>
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-400 ml-1">{error}</p>}
    </div>
  );
};
