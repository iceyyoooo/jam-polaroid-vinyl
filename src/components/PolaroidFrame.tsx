
import React, { useState, useRef } from 'react';
import { Plus, X, Scissors, Move, RotateCw } from 'lucide-react';

interface PolaroidFrameProps {
  onImageUpload: (imageData: string) => void;
  onDelete: () => void;
  imageData?: string;
  size?: 'small' | 'medium' | 'large';
  onSizeChange?: (size: 'small' | 'medium' | 'large') => void;
}

export const PolaroidFrame = ({ 
  onImageUpload, 
  onDelete, 
  imageData, 
  size = 'medium',
  onSizeChange 
}: PolaroidFrameProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCropControls, setShowCropControls] = useState(false);
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const [cropScale, setCropScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizes = {
    small: { width: 120, height: 90, padding: 3, textSize: 'text-xs' },
    medium: { width: 192, height: 144, padding: 4, textSize: 'text-sm' },
    large: { width: 256, height: 192, padding: 5, textSize: 'text-base' }
  };

  const currentSize = sizes[size];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onImageUpload(result);
        setShowCropControls(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Polaroid Frame */}
      <div 
        className="bg-white shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300 border border-gray-200"
        style={{ 
          padding: `${currentSize.padding * 4}px`,
          paddingBottom: `${currentSize.padding * 16}px`
        }}
      >
        <div 
          className="bg-gray-100 border border-gray-200 relative overflow-hidden"
          style={{ 
            width: `${currentSize.width}px`, 
            height: `${currentSize.height}px` 
          }}
        >
          {imageData ? (
            <div className="w-full h-full relative">
              <img 
                src={imageData} 
                alt="Polaroid" 
                className="absolute w-full h-full object-cover transition-transform duration-200"
                style={{
                  transform: `translate(${cropPosition.x}px, ${cropPosition.y}px) scale(${cropScale}) rotate(${rotation}deg)`,
                  transformOrigin: 'center'
                }}
              />
              
              {/* Crop overlay */}
              {showCropControls && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-white text-xs bg-black/50 px-2 py-1 rounded">
                    Crop Mode
                  </div>
                </div>
              )}
            </div>
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
        </div>
        
        {/* Polaroid text area */}
        <div className="mt-2 text-center">
          <input
            type="text"
            placeholder="Add a caption..."
            className={`w-full text-center ${currentSize.textSize} text-gray-600 bg-transparent border-none outline-none placeholder-gray-400`}
            style={{ fontFamily: 'cursive' }}
          />
        </div>
      </div>

      {/* Controls */}
      {isHovered && (
        <div className="absolute -top-2 -right-2 flex flex-col gap-1">
          {/* Size controls */}
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

          {/* Image controls */}
          {imageData && (
            <div className="flex gap-1">
              <button
                onClick={() => setShowCropControls(!showCropControls)}
                className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                  showCropControls ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-blue-50'
                }`}
                title="Crop tool"
              >
                <Scissors className="w-3 h-3" />
              </button>
              <button
                onClick={() => setRotation(prev => prev + 90)}
                className="w-6 h-6 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors shadow-lg"
                title="Rotate"
              >
                <RotateCw className="w-3 h-3" />
              </button>
            </div>
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

      {/* Crop Controls Panel */}
      {showCropControls && imageData && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-50">
          <div className="space-y-2 text-xs">
            <div>
              <label className="block text-gray-600">Position X</label>
              <input
                type="range"
                min="-50"
                max="50"
                value={cropPosition.x}
                onChange={(e) => setCropPosition(prev => ({ ...prev, x: Number(e.target.value) }))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-gray-600">Position Y</label>
              <input
                type="range"
                min="-50"
                max="50"
                value={cropPosition.y}
                onChange={(e) => setCropPosition(prev => ({ ...prev, y: Number(e.target.value) }))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-gray-600">Scale</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={cropScale}
                onChange={(e) => setCropScale(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <button
              onClick={() => setShowCropControls(false)}
              className="w-full bg-blue-500 text-white rounded px-2 py-1 text-xs hover:bg-blue-600"
            >
              Done
            </button>
          </div>
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
