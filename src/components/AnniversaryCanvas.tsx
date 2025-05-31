
import React, { useState, useRef, useCallback } from 'react';
import { PolaroidFrame } from './PolaroidFrame';
import { VinylPlayer } from './VinylPlayer';
import { LetterTemplate } from './LetterTemplate';
import { Toolbar } from './Toolbar';
import { Plus } from 'lucide-react';

export interface CanvasItem {
  id: string;
  type: 'polaroid' | 'vinyl' | 'letter';
  x: number;
  y: number;
  data?: any;
}

export const AnniversaryCanvas = () => {
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [selectedTool, setSelectedTool] = useState<'polaroid' | 'vinyl' | 'letter' | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const addItem = useCallback((type: 'polaroid' | 'vinyl' | 'letter', x: number, y: number) => {
    const newItem: CanvasItem = {
      id: `${type}-${Date.now()}`,
      type,
      x,
      y,
      data: type === 'letter' ? { template: 'vintage', content: '' } : {}
    };
    setItems(prev => [...prev, newItem]);
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
                    onDelete={() => deleteItem(item.id)}
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
