
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LetterTemplateProps {
  template: string;
  content: string;
  onContentChange: (content: string) => void;
  onDelete: () => void;
}

export const LetterTemplate = ({ template, content, onContentChange, onDelete }: LetterTemplateProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const templates = {
    vintage: {
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-900',
      pattern: 'vintage-lines'
    },
    romantic: {
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      textColor: 'text-rose-900',
      pattern: 'romantic-hearts'
    },
    classic: {
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-900',
      pattern: 'classic-simple'
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
      <div className={`w-64 h-80 ${currentTemplate.bgColor} ${currentTemplate.borderColor} border-2 shadow-lg p-6 relative`}>
        {/* Decorative header */}
        <div className="text-center mb-4">
          <div className="text-lg font-bold" style={{ fontFamily: 'cursive' }}>
            💕 Our Love Story 💕
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30 mt-2"></div>
        </div>

        {/* Letter content */}
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="My dearest love,&#10;&#10;Write your heart out here...&#10;&#10;Forever yours,&#10;Your Love"
          className={`w-full h-48 ${currentTemplate.bgColor} ${currentTemplate.textColor} text-sm resize-none border-none outline-none`}
          style={{ 
            fontFamily: 'cursive',
            lineHeight: '1.8',
            background: 'transparent'
          }}
        />

        {/* Decorative footer */}
        <div className="absolute bottom-4 right-6">
          <div className="text-2xl">💌</div>
        </div>

        {/* Paper texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 24px,
              currentColor 24px,
              currentColor 25px
            )`
          }}></div>
        </div>
      </div>

      {/* Template selector */}
      <div className="mt-2 flex justify-center gap-1">
        {Object.keys(templates).map(templateKey => (
          <button
            key={templateKey}
            onClick={() => {}} // Template switching can be added later
            className={`w-3 h-3 rounded-full border ${
              templateKey === template ? 'bg-amber-400' : 'bg-white'
            }`}
            title={`${templateKey} template`}
          />
        ))}
      </div>

      {/* Delete button */}
      {isHovered && (
        <button
          onClick={onDelete}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
          title="Delete"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
