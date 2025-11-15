
// Componente GoalCard - Card individual para cada goal
// Suporta variações visuais especiais para os Top 10 items

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Category {
  id: number;
  name: string;
  color: string | null;
}

interface GoalCardProps {
  id: number;
  title: string;
  category: Category;
  isTopTen?: boolean;
  imageUrl?: string | null;
  local?: string | null;
  onClick?: () => void;
}

export default function GoalCard({
  id,
  title,
  category,
  isTopTen = false,
  imageUrl,
  local,
  onClick,
}: GoalCardProps) {
  const [showCategory, setShowCategory] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  // Handler para mostrar categoria após 1 segundo de hover
  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      setShowCategory(true);
    }, 1000); // 1 segundo
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }
    setShowCategory(false);
  };

  // Converter cor hex para rgba
  const getCategoryColor = () => {
    if (!category.color) return 'rgba(128, 128, 128, 0.2)';
    const hex = category.color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="cursor-pointer relative"
    >
      <Card 
        className={`
          overflow-hidden border-2 transition-all duration-300
          ${isTopTen ? 'min-h-[300px]' : 'min-h-[120px]'}
        `}
        style={{
          borderColor: category.color ? `#${category.color}` : '#888',
          background: `linear-gradient(135deg, ${getCategoryColor()}, rgba(0, 0, 0, 0.8))`,
        }}
      >
        {/* Imagem para Top 10 */}
        {isTopTen && imageUrl && (
          <div className="relative h-48 overflow-hidden">
            {/* Placeholder de imagem */}
            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="text-white text-6xl font-bold opacity-50">
                {id}
              </span>
            </div>
            {/* Badge de Top 10 */}
            <div className="absolute top-2 right-2">
              <Badge className="bg-yellow-500 text-black">⭐ Top 10</Badge>
            </div>
          </div>
        )}

        {/* Conteúdo do card */}
        <div className="p-4">
          {/* ID pequeno no canto */}
          <span className="text-xs text-white/50">#{id}</span>
          
          {/* Título */}
          <h3 className={`
            text-white font-semibold mt-2
            ${isTopTen ? 'text-xl' : 'text-lg'}
          `}>
            {title}
          </h3>

          {/* Local (se houver) */}
          {local && (
            <p className="text-sm text-white/70 mt-1">
              📍 {local}
            </p>
          )}

          {/* Categoria (aparece após 1s de hover) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: showCategory ? 1 : 0,
              y: showCategory ? 0 : 10,
            }}
            className="mt-3"
          >
            <Badge 
              style={{
                backgroundColor: category.color ? `#${category.color}` : '#888',
                color: category.color === 'FFFFFF' ? '#000' : '#fff',
              }}
            >
              {category.name}
            </Badge>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
