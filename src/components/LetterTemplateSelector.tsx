
import React from 'react';

interface LetterTemplateSelectorProps {
  currentTemplate: string;
  onTemplateChange: (template: string) => void;
}

export const LetterTemplateSelector = ({ currentTemplate, onTemplateChange }: LetterTemplateSelectorProps) => {
  const templates = [
    { id: 'vintage', name: 'Vintage', preview: '📜' },
    { id: 'romantic', name: 'Romantic', preview: '💝' },
    { id: 'classic', name: 'Classic', preview: '📄' },
    { id: 'elegant', name: 'Elegant', preview: '✨' }
  ];

  return (
    <div className="flex justify-center gap-2 mt-4">
      {templates.map(template => (
        <button
          key={template.id}
          onClick={() => onTemplateChange(template.id)}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all ${
            currentTemplate === template.id 
              ? 'border-amber-400 bg-amber-50' 
              : 'border-gray-300 bg-white hover:border-amber-300'
          }`}
          title={template.name}
        >
          <span className="text-lg">{template.preview}</span>
          <span className="text-xs text-gray-600">{template.name}</span>
        </button>
      ))}
    </div>
  );
};
