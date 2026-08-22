import React from 'react';

interface MagicLinkButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  text?: string;
}

export const MagicLinkButton: React.FC<MagicLinkButtonProps> = ({
  onClick,
  isLoading = false,
  disabled = false,
  text = '✦ 魔法連結登入',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full py-2.5 px-4 text-sm sm:text-base font-serif text-[#D4AF37] hover:text-[#F6E7B7] flex items-center justify-center gap-2 rounded-xl transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.6)] focus:outline-none cursor-pointer ${
        disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <span className="text-base sm:text-lg">✦</span>
      <span className="tracking-wider">{isLoading ? '傳送中...' : text}</span>
    </button>
  );
};
