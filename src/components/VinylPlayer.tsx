
import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, X } from 'lucide-react';

interface VinylPlayerProps {
  onDelete: () => void;
}

export const VinylPlayer = ({ onDelete }: VinylPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSong, setCurrentSong] = useState('Our Song');

  const songs = [
    'Our Song',
    'First Dance',
    'Your Favorite Song',
    'That Special Song',
    'Anniversary Tune'
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Vinyl Record */}
      <div className="relative">
        <div className={`w-32 h-32 bg-gradient-to-br from-gray-900 to-black rounded-full shadow-xl transition-transform duration-500 ${isPlaying ? 'animate-spin' : ''}`}>
          {/* Record grooves */}
          <div className="absolute inset-2 border-2 border-gray-700 rounded-full"></div>
          <div className="absolute inset-4 border border-gray-600 rounded-full"></div>
          <div className="absolute inset-6 border border-gray-500 rounded-full"></div>
          
          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Needle */}
        <div className="absolute -top-2 right-8 w-16 h-1 bg-gray-400 rounded transform rotate-12 origin-right shadow-sm"></div>
      </div>

      {/* Controls */}
      <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
        <div className="flex items-center justify-center gap-2 mb-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <SkipBack className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            onClick={togglePlay}
            className="p-2 bg-amber-100 hover:bg-amber-200 rounded-full transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-amber-700" />
            ) : (
              <Play className="w-5 h-5 text-amber-700" />
            )}
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <SkipForward className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        <select 
          value={currentSong}
          onChange={(e) => setCurrentSong(e.target.value)}
          className="w-full text-xs bg-transparent border-none outline-none text-center text-gray-600"
        >
          {songs.map(song => (
            <option key={song} value={song}>{song}</option>
          ))}
        </select>
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
