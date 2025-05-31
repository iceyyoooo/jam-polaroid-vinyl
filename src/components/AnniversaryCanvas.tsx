
import React, { useState, useRef, useCallback } from 'react';
import { PolaroidFrame } from './PolaroidFrame';
import { VinylPlayer } from './VinylPlayer';
import { LetterTemplate } from './LetterTemplate';
import { PhotoboothTemplate } from './PhotoboothTemplate';
import { StickerCollection } from './StickerCollection';
import { Sticker } from './Sticker';
import { TextTool } from './TextTool';
import { Toolbar } from './Toolbar';

export interface CanvasItem {
  id: string;
  type: 'polaroid' | 'vinyl' | 'letter' | 'photobooth' | 'stickers' | 'sticker' | 'text';
  x: number;
  y: number;
  data?: any;
}

export const AnniversaryCanvas = () => {
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [selectedTool, setSelectedTool] = useState<'polaroid' | 'vinyl' | 'letter' | 'photobooth' | 'stickers' | 'text' | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const addItem = useCallback((type: 'polaroid' | 'vinyl' | 'letter' | 'photobooth' | 'stickers' | 'text', x: number, y: number) => {
    const newItem: CanvasItem = {
      id: `${type}-${Date.now()}`,
      type,
      x,
      y,
      data: type === 'letter' ? { template: 'vintage', content: '' } : 
            type === 'text' ? { text: 'Add your text here...', font: 'Arial', color: '#000000', size: 16 } :
            type === 'polaroid' ? { size: 'medium' } :
            type === 'photobooth' ? { size: 'medium' } : {}
    };
    setItems(prev => [...prev, newItem]);
  }, []);

  const addSticker = useCallback((stickerContent: string, x: number, y: number) => {
    const newSticker: CanvasItem = {
      id: `sticker-${Date.now()}`,
      type: 'sticker',
      x,
      y,
      data: { content: stickerContent }
    };
    setItems(prev => [...prev, newSticker]);
  }, []);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (!selectedTool) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    addItem(selectedTool, x, y);
    setSelectedTool(null);
  }, [selectedTool, addItem]);

  const handleStickerSelect = useCallback((stickerContent: string) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = Math.random() * (rect.width - 100) + 50;
    const y = Math.random() * (rect.height - 100) + 50;
    
    addSticker(stickerContent, x, y);
  }, [addSticker]);

  const handleMouseDown = useCallback((e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const item = items.find(i => i.id === itemId);
    if (!item) return;

    setDraggedItem(itemId);
    setDragOffset({
      x: e.clientX - rect.left - item.x,
      y: e.clientY - rect.top - item.y
    });
  }, [items]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggedItem) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;

    setItems(prev => prev.map(item => 
      item.id === draggedItem ? { ...item, x, y } : item
    ));
  }, [draggedItem, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setDraggedItem(null);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  const updateItemData = useCallback((itemId: string, data: any) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, data: { ...item.data, ...data } } : item
    ));
  }, []);

  const deleteItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 overflow-hidden relative">
      <Toolbar 
        selectedTool={selectedTool} 
        onToolSelect={setSelectedTool}
      />
      
      <div 
        ref={canvasRef}
        className="w-full h-full cursor-crosshair relative"
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Canvas items */}
        {items.map(item => {
          const style = {
            position: 'absolute' as const,
            left: item.x,
            top: item.y,
            cursor: draggedItem === item.id ? 'grabbing' : 'grab'
          };

          switch (item.type) {
            case 'polaroid':
              return (
                <div 
                  key={item.id} 
                  style={style}
                  onMouseDown={(e) => handleMouseDown(e, item.id)}
                >
                  <PolaroidFrame 
                    onImageUpload={(imageData) => updateItemData(item.id, { image: imageData })}
                    onDelete={() => deleteItem(item.id)}
                    imageData={item.data?.image}
                    size={item.data?.size || 'medium'}
                    onSizeChange={(size) => updateItemData(item.id, { size })}
                  />
                </div>
              );
            case 'photobooth':
              return (
                <div 
                  key={item.id} 
                  style={style}
                  onMouseDown={(e) => handleMouseDown(e, item.id)}
                >
                  <PhotoboothTemplate 
                    onDelete={() => deleteItem(item.id)}
                    size={item.data?.size || 'medium'}
                    onSizeChange={(size) => updateItemData(item.id, { size })}
                  />
                </div>
              );
            case 'vinyl':
              return (
                <div 
                  key={item.id} 
                  style={style}
                  onMouseDown={(e) => handleMouseDown(e, item.id)}
                >
                  <VinylPlayer 
                    onDelete={() => deleteItem(item.id)}
                  />
                </div>
              );
            case 'letter':
              return (
                <div 
                  key={item.id} 
                  style={style}
                  onMouseDown={(e) => handleMouseDown(e, item.id)}
                >
                  <LetterTemplate 
                    template={item.data?.template || 'vintage'}
                    content={item.data?.content || ''}
                    onContentChange={(content) => updateItemData(item.id, { content })}
                    onTemplateChange={(template) => updateItemData(item.id, { template })}
                    onDelete={() => deleteItem(item.id)}
                  />
                </div>
              );
            case 'stickers':
              return (
                <div 
                  key={item.id} 
                  style={style}
                  onMouseDown={(e) => handleMouseDown(e, item.id)}
                >
                  <StickerCollection 
                    onDelete={() => deleteItem(item.id)}
                    onStickerSelect={handleStickerSelect}
                  />
                </div>
              );
            case 'sticker':
              return (
                <div 
                  key={item.id} 
                  style={style}
                  onMouseDown={(e) => handleMouseDown(e, item.id)}
                >
                  <Sticker 
                    content={item.data?.content || '❤️'}
                    onDelete={() => deleteItem(item.id)}
                  />
                </div>
              );
            case 'text':
              return (
                <div 
                  key={item.id} 
                  style={style}
                  onMouseDown={(e) => handleMouseDown(e, item.id)}
                >
                  <TextTool
                    onDelete={() => deleteItem(item.id)}
                    initialText={item.data?.text}
                    initialFont={item.data?.font}
                    initialColor={item.data?.color}
                    initialSize={item.data?.size}
                  />
                </div>
              );
            default:
              return null;
          }
        })}

        {/* Tool cursor indicator */}
        {selectedTool && (
          <div className="fixed pointer-events-none z-50 top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-amber-100 border-2 border-amber-300 rounded-lg px-4 py-2 shadow-lg">
              <span className="text-amber-800 font-medium">
                Click anywhere to add {selectedTool}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
