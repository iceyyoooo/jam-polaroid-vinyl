
import React from 'react';
import { Plus } from 'lucide-react';

interface ToolbarProps {
  selectedTool: 'polaroid' | 'vinyl' | 'letter' | 'photobooth' | 'stickers' | 'text' | null;
  onToolSelect: (tool: 'polaroid' | 'vinyl' | 'letter' | 'photobooth' | 'stickers' | 'text' | null) => void;
}

export const Toolbar = ({ selectedTool, onToolSelect }: ToolbarProps) => {
  const tools = [
    { id: 'polaroid', label: 'Polaroid', icon: '📷', description: 'Add photo frame' },
    { id: 'photobooth', label: 'Photobooth', icon: '📸', description: 'Add 4-photo strip' },
    { id: 'vinyl', label: 'Vinyl', icon: '🎵', description: 'Add music player' },
    { id: 'letter', label: 'Letter', icon: '💌', description: 'Add letter template' },
    { id: 'stickers', label: 'Stickers', icon: '✨', description: 'Add sticker collection' },
    { id: 'text', label: 'Text', icon: '📝', description: 'Add custom text' }
  ] as const;

  return (
    <div className="fixed top-6 left-6 z-50">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200 p-2">
        <div className="flex flex-col gap-2">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => onToolSelect(selectedTool === tool.id ? null : tool.id)}
              className={`
                group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${selectedTool === tool.id 
                  ? 'bg-amber-100 text-amber-800 shadow-inner' 
                  : 'text-gray-700 hover:bg-amber-50 hover:text-amber-700'
                }
              `}
              title={tool.description}
            >
              <span className="text-2xl">{tool.icon}</span>
              <span className="font-medium">{tool.label}</span>
              {selectedTool === tool.id && (
                <Plus className="w-4 h-4 ml-auto text-amber-600" />
              )}
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {tool.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
