import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LetterTemplateSelector } from './LetterTemplateSelector';

interface LetterTemplateProps {
  template: string;
  content: string;
  onContentChange: (content: string) => void;
  onTemplateChange?: (template: string) => void;
  onDelete: () => void;
}

export const LetterTemplate = ({ template, content, onContentChange, onTemplateChange, onDelete }: LetterTemplateProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const templates = {
    vintage: {
      bgStyle: {
        background: `
          radial-gradient(circle at 20% 80%, rgba(139,115,85,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(160,82,45,0.08) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(205,133,63,0.05) 0%, transparent 70%),
          linear-gradient(45deg, #f5f5dc 0%, #faf0e6 25%, #f5f5dc 50%, #fdf5e6 75%, #f5f5dc 100%)
        `
      },
      headerColor: 'text-amber-800',
      textColor: 'text-amber-900',
      borderColor: 'via-amber-400',
      title: '💕 Mon Amour 💕',
      decoration: '💌'
    },
    romantic: {
      bgStyle: {
        background: `
          radial-gradient(circle at 30% 70%, rgba(255,192,203,0.15) 0%, transparent 50%),
          radial-gradient(circle at 70% 30%, rgba(255,182,193,0.12) 0%, transparent 50%),
          linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #fbcfe8 50%, #f9a8d4 75%, #fdf2f8 100%)
        `
      },
      headerColor: 'text-pink-800',
      textColor: 'text-pink-900',
      borderColor: 'via-pink-400',
      title: '💖 My Beloved 💖',
      decoration: '💕'
    },
    classic: {
      bgStyle: {
        background: `
          linear-gradient(145deg, #ffffff 0%, #f8fafc 25%, #f1f5f9 50%, #e2e8f0 75%, #ffffff 100%)
        `
      },
      headerColor: 'text-gray-800',
      textColor: 'text-gray-900',
      borderColor: 'via-gray-400',
      title: '♡ Dear You ♡',
      decoration: '✉️'
    },
    elegant: {
      bgStyle: {
        background: `
          radial-gradient(circle at 25% 75%, rgba(139,69,19,0.08) 0%, transparent 50%),
          radial-gradient(circle at 75% 25%, rgba(160,82,45,0.06) 0%, transparent 50%),
          linear-gradient(160deg, #f7f3e9 0%, #f5f1e8 25%, #f0ebe2 50%, #ede7d9 75%, #f7f3e9 100%)
        `
      },
      headerColor: 'text-amber-900',
      textColor: 'text-amber-900',
      borderColor: 'via-amber-500',
      title: '✨ My Darling ✨',
      decoration: '🌹'
    }
  };

  const currentTemplate = templates[template as keyof typeof templates] || templates.vintage;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Letter Paper */}
      <div className="w-80 h-96 relative shadow-2xl transform rotate-1">
        {/* Main paper background */}
        <div 
          className="w-full h-full relative"
          style={currentTemplate.bgStyle}
        >
          {/* Handwritten text border - left side */}
          <div className="absolute left-2 top-4 bottom-4 w-8 overflow-hidden">
            <div 
              className="text-xs text-amber-700 opacity-40 transform -rotate-90 origin-left whitespace-nowrap"
              style={{ 
                fontFamily: 'Dancing Script, cursive',
                fontSize: '10px',
                lineHeight: '1.2',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed'
              }}
            >
              ma chérie mon amour pour toujours eternally yours mon coeur je t'aime
            </div>
          </div>

          {/* Handwritten text border - right side */}
          <div className="absolute right-2 top-4 bottom-4 w-8 overflow-hidden">
            <div 
              className="text-xs text-amber-700 opacity-40 transform rotate-90 origin-right whitespace-nowrap"
              style={{ 
                fontFamily: 'Dancing Script, cursive',
                fontSize: '10px',
                lineHeight: '1.2',
                writingMode: 'vertical-lr',
                textOrientation: 'mixed'
              }}
            >
              forever and always my heart my soul dear beloved sweetheart
            </div>
          </div>

          {/* Top floral decoration */}
          <div className="absolute top-4 right-8 transform rotate-12">
            <div className="relative">
              {/* Purple flower */}
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full opacity-70 transform rotate-12"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full opacity-80"></div>
                <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-300 rounded-full"></div>
              </div>
              {/* Green stem */}
              <div className="absolute bottom-0 left-3 w-0.5 h-6 bg-green-600 transform rotate-12"></div>
              {/* Small leaves */}
              <div className="absolute bottom-2 left-2 w-2 h-1 bg-green-500 rounded-full transform -rotate-45"></div>
              <div className="absolute bottom-1 left-4 w-2 h-1 bg-green-500 rounded-full transform rotate-45"></div>
            </div>
          </div>

          {/* Bottom left floral decoration */}
          <div className="absolute bottom-8 left-6 transform -rotate-12">
            <div className="relative">
              {/* Purple flower */}
              <div className="w-6 h-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full opacity-70"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full opacity-80"></div>
              </div>
              {/* Fern-like leaves */}
              <div className="absolute bottom-0 right-2">
                <div className="w-0.5 h-4 bg-green-600"></div>
                <div className="absolute top-0 left-0 w-1 h-0.5 bg-green-500 transform rotate-45"></div>
                <div className="absolute top-1 left-0 w-1 h-0.5 bg-green-500 transform rotate-45"></div>
                <div className="absolute top-2 left-0 w-1 h-0.5 bg-green-500 transform rotate-45"></div>
                <div className="absolute top-0 right-0 w-1 h-0.5 bg-green-500 transform -rotate-45"></div>
                <div className="absolute top-1 right-0 w-1 h-0.5 bg-green-500 transform -rotate-45"></div>
                <div className="absolute top-2 right-0 w-1 h-0.5 bg-green-500 transform -rotate-45"></div>
              </div>
            </div>
          </div>

          {/* Paper aging spots */}
          <div className="absolute top-12 left-16 w-2 h-2 bg-amber-200 rounded-full opacity-30"></div>
          <div className="absolute top-32 right-12 w-1 h-1 bg-amber-300 rounded-full opacity-40"></div>
          <div className="absolute bottom-24 left-20 w-1.5 h-1.5 bg-yellow-600 rounded-full opacity-20"></div>
          <div className="absolute top-20 left-32 w-1 h-1 bg-amber-400 rounded-full opacity-25"></div>

          {/* Main content area */}
          <div className="absolute inset-0 px-12 py-16">
            {/* Decorative header */}
            <div className="text-center mb-6">
              <div className={`text-lg font-bold ${currentTemplate.headerColor}`} style={{ fontFamily: 'Dancing Script, cursive' }}>
                {currentTemplate.title}
              </div>
              <div className={`w-full h-px bg-gradient-to-r from-transparent ${currentTemplate.borderColor} to-transparent opacity-30 mt-2`}></div>
            </div>

            {/* Letter content */}
            <textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              placeholder="Write your heart here..."
              className={`w-full h-56 bg-transparent ${currentTemplate.textColor} text-sm resize-none border-none outline-none leading-relaxed`}
              style={{ 
                fontFamily: 'Dancing Script, cursive',
                fontSize: '14px'
              }}
            />

            {/* Decorative footer */}
            <div className="absolute bottom-6 right-8">
              <div className="text-xl">{currentTemplate.decoration}</div>
            </div>
          </div>

          {/* Vintage paper texture overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 20px,
                  rgba(139,115,85,0.1) 20px,
                  rgba(139,115,85,0.1) 21px
                )
              `
            }}
          ></div>

          {/* Paper fold/crease effects */}
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-amber-300 to-transparent opacity-20"></div>
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-15"></div>
        </div>
      </div>

      {/* Template selector */}
      {onTemplateChange && (
        <LetterTemplateSelector 
          currentTemplate={template}
          onTemplateChange={onTemplateChange}
        />
      )}

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
