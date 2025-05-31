
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface StickerCollectionProps {
  onDelete: () => void;
  onStickerSelect: (sticker: string) => void;
}

export const StickerCollection = ({ onDelete, onStickerSelect }: StickerCollectionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'hearts' | 'text' | 'misc'>('hearts');

  // Sticker collections based on the uploaded images
  const stickers = {
    hearts: [
      '❤️', '💕', '💖', '💗', '💓', '💘', '💝', '💋', '🫶', '💌',
      '🌹', '🌷', '🌺', '🌻', '🥰', '😍', '😘', '🥳', '✨', '💫'
    ],
    text: [
      'LOVE', 'XOXO', 'KISS', 'HUG', 'CUTE', 'SWEET', 'DEAR', 'MINE',
      'FOREVER', 'ALWAYS', 'YOURS', 'BABE', 'HONEY', 'ANGEL', 'PERFECT'
    ],
    misc: [
      '⭐', '🎀', '🎈', '🎊', '🎉', '🍎', '🌈', '☁️', '🦋', '🌸',
      '📮', '💐', '🎵', '🎶', '📷', '✉️', '🔖', '🎁', '🧸', '🍭'
    ]
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sticker collection panel */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-pink-200 p-4" style={{ width: '280px', height: '320px' }}>
        {/* Header */}
        <div className="text-center mb-3">
          <h3 className="text-lg font-bold text-pink-800">Sticker Collection</h3>
          <p className="text-xs text-pink-600">Click to add stickers to canvas</p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 mb-3">
          {Object.keys(stickers).map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as any)}
              className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                selectedCategory === category 
                  ? 'bg-pink-200 text-pink-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-pink-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Sticker grid */}
        <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto">
          {stickers[selectedCategory].map((sticker, index) => (
            <button
              key={index}
              onClick={() => onStickerSelect(sticker)}
              className="w-10 h-10 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg border border-pink-200 flex items-center justify-center hover:scale-110 hover:shadow-md transition-all duration-200 text-lg"
              title={`Add ${sticker} sticker`}
            >
              {sticker}
            </button>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">Drag stickers around after placing them!</p>
        </div>
      </div>

      {/* Delete button */}
      {isHovered && (
        <button
          onClick={onDelete}
          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg z-10"
          title="Delete"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
