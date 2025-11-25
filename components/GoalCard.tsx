
// Componente GoalCard - Card individual para cada goal
// Suporta variações visuais especiais para os Top 10 items e cards regulares

'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
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
  isRegular?: boolean;
  imageUrl?: string | null;
  local?: string | null;
  onClick?: () => void;
}

export default function GoalCard({
  id,
  title,
  category,
  isTopTen = false,
  isRegular = false,
  imageUrl,
  local,
  onClick,
}: GoalCardProps) {
  const [showCategory, setShowCategory] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values para parallax/magnetic effect (só para cards regulares)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  // Handler para mostrar categoria (mais rápido para cards regulares)
  const handleMouseEnter = () => {
    const delay = isRegular ? 300 : 1000; // 300ms para regulares, 1s para top
    const timer = setTimeout(() => {
      setShowCategory(true);
    }, delay);
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }
    setShowCategory(false);
    if (isRegular) {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isRegular || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;
    
    mouseX.set(offsetX);
    mouseY.set(offsetY);
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

  // Estilo de borda com efeito blur/nuvem para cards regulares
  const getBorderStyle = () => {
    if (!isRegular) {
      return {
        borderColor: category.color ? `#${category.color}` : '#888',
      };
    }
    
    return {
      borderColor: 'transparent',
      boxShadow: category.color 
        ? `0 0 20px ${getCategoryColor()}, 0 0 40px ${getCategoryColor()}`
        : '0 0 20px rgba(128, 128, 128, 0.3)',
    };
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0.8}}
      animate={{ opacity: 1}}
      whileHover={{ 
        scale: isRegular ? 1.12 : 1.06, // Zoom maior para cards regulares
        boxShadow: isRegular 
          ? '0 30px 60px rgba(0, 0, 0, 0.5)' 
          : '0 20px 40px rgba(0, 0, 0, 0.3)',
      }}
      style={isRegular ? {
        rotateX,
        rotateY,
        transformPerspective: 1000,
      } : {}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className="cursor-pointer relative"
    >
      <Card 
        className={`
          overflow-hidden transition-all duration-300
          ${isTopTen ? 'min-h-[300px] border-2' : ''}
          ${isRegular ? 'min-h-[110px] border-0' : ''}
          ${!isTopTen && !isRegular ? 'min-h-[110px] border-2' : ''}
        `}
        style={{
          ...getBorderStyle(),
          background: `linear-gradient(135deg, ${getCategoryColor()}, rgba(0, 0, 0, 0.8))`,
          width: isRegular ? '100%' : 'auto',
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
          <h3 
            className={`
              text-white font-semibold mt-2
              ${isTopTen ? 'text-xl' : isRegular ? 'text-2xl' : 'text-lg'}
            `}
            style={isRegular ? {
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9), -1px -1px 2px rgba(0, 0, 0, 0.9)',
            } : {}}
          >
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
                color: category.color === 'FFFFFF' || category.color === 'FFC0CB' || category.color === '00FFFF' || category.color === 'C0C0C0' || category.color === '20C6B6' || category.color === '90EE90' || category.color === 'ADD8E6' ? '#000' : '#fff',
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
