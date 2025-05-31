
import React, { useState, useRef } from 'react';
import { Plus, X, Scissors } from 'lucide-react';

interface PolaroidFrameProps {
  onImageUpload: (imageData: string) => void;
  onDelete: () => void;
  imageData?: string;
}

export const PolaroidFrame = ({ onImageUpload, onDelete, imageData }: PolaroidFrameProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCutout, setShowCutout] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onImageUpload(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCutout = () => {
    setShowCutout(!showCutout);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Polaroid Frame */}
      <div className="bg-white p-4 pb-16 shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300 border border-gray-200">
        <div className="w-48 h-36 bg-gray-100 border border-gray-200 relative overflow-hidden">
          {imageData ? (
            <img 
              src={imageData} 
              alt="Polaroid" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full hover:bg-amber-200 transition-colors"
              >
                <Plus className="w-6 h-6 text-amber-600" />
              </button>
            </div>
          )}
          
          {/* Cutout overlay */}
          {showCutout && imageData && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                Cutout Mode Active
              </div>
            </div>
          )}
        </div>
        
        {/* Polaroid text area */}
        <div className="mt-2 text-center">
          <input
            type="text"
            placeholder="Add a caption..."
            className="w-full text-center text-sm text-gray-600 bg-transparent border-none outline-none placeholder-gray-400"
            style={{ fontFamily: 'cursive' }}
          />
        </div>
      </div>

      {/* Controls */}
      {isHovered && (
        <div className="absolute -top-2 -right-2 flex gap-1">
          {imageData && (
            <button
              onClick={handleCutout}
              className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                showCutout ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-blue-50'
              }`}
              title="Cutout tool"
            >
              <Scissors className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={onDelete}
            className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
            title="Delete"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};
