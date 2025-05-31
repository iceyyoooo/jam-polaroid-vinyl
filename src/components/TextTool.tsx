
import React, { useState } from 'react';
import { X, Type } from 'lucide-react';

interface TextToolProps {
  onDelete: () => void;
  initialText?: string;
  initialFont?: string;
  initialColor?: string;
  initialSize?: number;
}

export const TextTool = ({ 
  onDelete, 
  initialText = 'Add your text here...', 
  initialFont = 'Arial',
  initialColor = '#000000',
  initialSize = 16
}: TextToolProps) => {
  const [text, setText] = useState(initialText);
  const [font, setFont] = useState(initialFont);
  const [color, setColor] = useState(initialColor);
  const [size, setSize] = useState(initialSize);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const fonts = [
    { value: 'Arial', label: 'Arial', category: 'Formal' },
    { value: 'Georgia', label: 'Georgia', category: 'Formal' },
    { value: 'Times New Roman', label: 'Times New Roman', category: 'Formal' },
    { value: 'Helvetica', label: 'Helvetica', category: 'Formal' },
    { value: 'Dancing Script', label: 'Dancing Script', category: 'Cursive' },
    { value: 'Pacifico', label: 'Pacifico', category: 'Cursive' },
    { value: 'Great Vibes', label: 'Great Vibes', category: 'Cursive' },
    { value: 'Kaushan Script', label: 'Kaushan Script', category: 'Handwritten' },
    { value: 'Caveat', label: 'Caveat', category: 'Handwritten' },
    { value: 'Amatic SC', label: 'Amatic SC', category: 'Handwritten' },
    { value: 'Indie Flower', label: 'Indie Flower', category: 'Handwritten' },
    { value: 'Playfair Display', label: 'Playfair Display', category: 'Vintage' },
    { value: 'Crimson Text', label: 'Crimson Text', category: 'Vintage' },
    { value: 'Old Standard TT', label: 'Old Standard TT', category: 'Vintage' },
    { value: 'UnifrakturMaguntia', label: 'UnifrakturMaguntia', category: 'Vintage' }
  ];

  const colors = [
    '#000000', '#333333', '#666666', '#999999',
    '#FF0000', '#FF6B6B', '#FF8E53', '#FF6B35',
    '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE'
  ];

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Text Display */}
      <div 
        className="relative cursor-pointer select-none"
        onClick={() => setIsEditing(true)}
        style={{
          fontFamily: font,
          color: color,
          fontSize: `${size}px`,
          lineHeight: 1.2,
          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}
      >
        {text}
      </div>

      {/* Edit Panel */}
      {isEditing && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50" style={{ minWidth: '300px' }}>
          <div className="space-y-3">
            {/* Text Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
                rows={3}
                placeholder="Enter your text..."
              />
            </div>

            {/* Font Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Font</label>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {fonts.map(fontOption => (
                  <option key={fontOption.value} value={fontOption.value}>
                    {fontOption.label} ({fontOption.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Size Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size: {size}px</label>
              <input
                type="range"
                min="12"
                max="72"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Color Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <div className="grid grid-cols-8 gap-1">
                {colors.map(colorOption => (
                  <button
                    key={colorOption}
                    onClick={() => setColor(colorOption)}
                    className={`w-6 h-6 rounded border-2 ${color === colorOption ? 'border-gray-600' : 'border-gray-300'}`}
                    style={{ backgroundColor: colorOption }}
                    title={colorOption}
                  />
                ))}
              </div>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full mt-2 h-8 rounded border border-gray-300"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete button */}
      {isHovered && !isEditing && (
        <button
          onClick={onDelete}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg z-10"
          title="Delete"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
