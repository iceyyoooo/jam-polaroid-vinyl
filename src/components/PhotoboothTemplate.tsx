
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface PhotoboothTemplateProps {
  onDelete: () => void;
  size?: 'small' | 'medium' | 'large';
  onSizeChange?: (size: 'small' | 'medium' | 'large') => void;
}

export const PhotoboothTemplate = ({ onDelete, size = 'medium', onSizeChange }: PhotoboothTemplateProps) => {
  const [images, setImages] = useState<string[]>(['', '', '', '']);
  const [isHovered, setIsHovered] = useState(false);

  const sizes = {
    small: { width: 120, photoHeight: 60, padding: 2, textSize: 'text-xs' },
    medium: { width: 180, photoHeight: 80, padding: 4, textSize: 'text-sm' },
    large: { width: 240, photoHeight: 100, padding: 6, textSize: 'text-base' }
  };

  const currentSize = sizes[size];

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImages = [...images];
      newImages[index] = e.target?.result as string;
      setImages(newImages);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photo strip background */}
      <div 
        className="bg-white rounded-lg shadow-xl border-4 border-gray-200" 
        style={{ 
          width: `${currentSize.width}px`,
          padding: `${currentSize.padding * 4}px`
        }}
      >
        {/* Header */}
        <div className="text-center mb-3">
          <div className={`${currentSize.textSize} font-bold text-gray-700 tracking-wider`}>PHOTOBOOTH</div>
          <div className={`${currentSize.textSize} text-gray-500`}>❤️ ANNIVERSARY ❤️</div>
        </div>

        {/* Photo slots */}
        <div className="space-y-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <div 
                className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center overflow-hidden"
                style={{ height: `${currentSize.photoHeight}px` }}
              >
                {image ? (
                  <img 
                    src={image} 
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                    <span className="text-xs text-gray-400">Photo {index + 1}</span>
                  </div>
                )}
              </div>
              
              {/* Upload overlay */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(index, file);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-3">
          <div className={`${currentSize.textSize} text-gray-500`}>Keep this memory forever</div>
        </div>
      </div>

      {/* Size controls */}
      {isHovered && (
        <div className="absolute -top-2 -right-2 flex flex-col gap-1">
          <div className="flex gap-1">
            {(['small', 'medium', 'large'] as const).map(sizeOption => (
              <button
                key={sizeOption}
                onClick={() => onSizeChange?.(sizeOption)}
                className={`w-4 h-4 rounded border-2 ${
                  size === sizeOption ? 'bg-blue-500 border-blue-600' : 'bg-white border-gray-300'
                } hover:scale-110 transition-transform`}
                title={`${sizeOption} size`}
              />
            ))}
          </div>

          <button
            onClick={onDelete}
            className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg z-10"
            title="Delete"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
