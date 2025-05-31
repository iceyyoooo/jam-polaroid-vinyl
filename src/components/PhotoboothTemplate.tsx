
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface PhotoboothTemplateProps {
  onDelete: () => void;
}

export const PhotoboothTemplate = ({ onDelete }: PhotoboothTemplateProps) => {
  const [images, setImages] = useState<string[]>(['', '', '', '']);
  const [isHovered, setIsHovered] = useState(false);

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
      <div className="bg-white p-4 rounded-lg shadow-xl border-4 border-gray-200" style={{ width: '180px' }}>
        {/* Header */}
        <div className="text-center mb-3">
          <div className="text-xs font-bold text-gray-700 tracking-wider">PHOTOBOOTH</div>
          <div className="text-xs text-gray-500">❤️ ANNIVERSARY ❤️</div>
        </div>

        {/* Photo slots */}
        <div className="space-y-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <div className="w-full h-20 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center overflow-hidden">
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
          <div className="text-xs text-gray-500">Keep this memory forever</div>
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
