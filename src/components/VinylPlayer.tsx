
import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, X, Volume2 } from 'lucide-react';

interface VinylPlayerProps {
  onDelete: () => void;
}

export const VinylPlayer = ({ onDelete }: VinylPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSong, setCurrentSong] = useState('Our Song');
  const [volume, setVolume] = useState(75);

  const songs = [
    'Our Song',
    'First Dance',
    'Your Favorite Song',
    'That Special Song',
    'Anniversary Tune',
    'Love Story',
    'Perfect',
    'All of Me'
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
      {/* Turntable base */}
      <div className="w-64 h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 border-4 border-gray-700">
        {/* Vinyl record and tonearm area */}
        <div className="flex items-center justify-between h-full">
          {/* Vinyl Record */}
          <div className="relative">
            <div className={`w-32 h-32 bg-gradient-to-br from-gray-900 to-black rounded-full shadow-xl transition-transform duration-500 ${isPlaying ? 'animate-spin' : ''}`}>
              {/* Record grooves */}
              <div className="absolute inset-1 border border-gray-700 rounded-full"></div>
              <div className="absolute inset-2 border border-gray-600 rounded-full"></div>
              <div className="absolute inset-3 border border-gray-500 rounded-full"></div>
              <div className="absolute inset-4 border border-gray-400 rounded-full"></div>
              <div className="absolute inset-6 border border-gray-300 rounded-full"></div>
              
              {/* Center label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-inner">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
              </div>

              {/* Record reflection */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent"></div>
            </div>

            {/* Tonearm */}
            <div className="absolute -top-4 -right-6">
              <div className="relative">
                {/* Tonearm base */}
                <div className="w-4 h-4 bg-silver-400 rounded-full shadow-lg"></div>
                {/* Tonearm */}
                <div className={`absolute top-2 left-2 w-20 h-1 bg-gradient-to-r from-gray-400 to-gray-300 rounded transform origin-left shadow-sm transition-transform duration-300 ${isPlaying ? 'rotate-12' : 'rotate-6'}`}>
                  {/* Needle */}
                  <div className="absolute right-0 top-0 w-1 h-1 bg-gray-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Control panel */}
          <div className="flex flex-col items-center space-y-3">
            {/* Speed selector */}
            <div className="text-xs text-gray-400 font-mono">33⅓ RPM</div>
            
            {/* Power LED */}
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></div>
            
            {/* Pitch control */}
            <div className="w-1 h-12 bg-gray-600 rounded-full relative">
              <div className="absolute top-6 left-0 w-full h-1 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls panel */}
      <div className="mt-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 shadow-lg border border-gray-300">
        {/* Main controls */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <SkipBack className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={togglePlay}
            className={`p-3 rounded-full transition-all shadow-md ${
              isPlaying 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <SkipForward className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Song selector */}
        <select 
          value={currentSong}
          onChange={(e) => setCurrentSong(e.target.value)}
          className="w-full text-sm bg-white border border-gray-300 rounded-lg px-3 py-2 text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          {songs.map(song => (
            <option key={song} value={song}>{song}</option>
          ))}
        </select>

        {/* Volume control */}
        <div className="flex items-center gap-2 mt-3">
          <Volume2 className="w-4 h-4 text-gray-600" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-600 w-8">{volume}%</span>
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
