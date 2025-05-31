
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface StickerProps {
  content: string;
  onDelete: () => void;
}

export const Sticker = ({ content, onDelete }: StickerProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sticker */}
      <div className="text-4xl transform hover:scale-110 transition-transform duration-200 drop-shadow-lg">
        {content}
      </div>

      {/* Delete button */}
      {isHovered && (
        <button
          onClick={onDelete}
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg text-xs"
          title="Delete"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
