
// Componente GoalCard - Card individual para cada goal
// Suporta variações visuais especiais para os Top 10 items e cards regulares
/* SPRINT 1 - CORREÇÕES #3, #4, #5, #6, #7:
 * #3 - Categoria movida para cima ao lado do ID (#123 [Categoria])
 * #4 - Local adicionado ao lado do título com ícone 📍 (responsivo)
 * #5 - Parallax 3D melhorado com efeito flutuante (rotateX, rotateY, translateZ)
 * #6 - Border-radius aumentado para efeito nuvem (rounded-3xl)
 * #7 - Padding do ID reduzido para cards mais slim verticalmente
 */

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

  // CORREÇÃO #5: Motion values para parallax 3D melhorado
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Efeito 3D flutuante - mais pronunciado que antes
  // TODO: Ajustar multiplicadores (15, -15) para mais/menos inclinação
  const rotateX = useTransform(mouseY, [-100, 100], [15, -15]);
  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15]);
  // Novo: efeito de profundidade no eixo Z
  const translateZ = useTransform(mouseY, [-100, 100], [-20, 20]);

  // CORREÇÃO #3: Handler para mostrar categoria - agora no topo do card
  // TODO: Ajustar delays (300ms regulares, 1000ms top) para aparecer mais rápido/devagar
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
      // Reseta posição do mouse suavemente
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  // CORREÇÃO #5: Mouse move melhorado para efeito 3D
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isRegular || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;
    
    // Valores mais suaves para movimento fluido
    mouseX.set(offsetX * 0.5);
    mouseY.set(offsetY * 0.5);
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

  // CORREÇÃO #4: Função para determinar se deve mostrar local inline
  // Esconde local se título for muito longo (>40 caracteres)
  const shouldShowLocalInline = () => {
    // TODO: Ajustar número 40 para mostrar/esconder local com títulos maiores/menores
    return local && title.length <= 40;
  };

  return (
    <motion.div
      ref={cardRef}
      // CORREÇÃO #2: Removido initial opacity que causava "pulo"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      whileHover={{ 
        scale: isRegular ? 1.12 : 1.06, // Zoom maior para cards regulares
        boxShadow: isRegular 
          ? '0 30px 60px rgba(0, 0, 0, 0.5)' 
          : '0 20px 40px rgba(0, 0, 0, 0.3)',
      }}
      // CORREÇÃO #5: Aplica transformações 3D apenas para cards regulares
      style={isRegular ? {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
        // Efeito de profundidade no hover
        z: translateZ,
      } : {}}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
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
          ${isRegular ? 'min-h-[100px] border-0' : ''}
          ${!isTopTen && !isRegular ? 'min-h-[100px] border-2' : ''}
        `}
        style={{
          ...getBorderStyle(),
          background: `linear-gradient(135deg, ${getCategoryColor()}, rgba(0, 0, 0, 0.8))`,
          width: isRegular ? '100%' : 'auto',
          // CORREÇÃO #6: Border-radius aumentado para efeito nuvem
          borderRadius: isRegular ? '24px' : '20px', // rounded-3xl equivalente
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

        {/* CORREÇÃO #7: Conteúdo do card com padding reduzido */}
        <div className={`${isRegular ? 'p-3' : 'p-4'}`}>
          
          {/* CORREÇÃO #3: ID + Categoria na mesma linha (topo) */}
          <div className="flex items-center gap-2 mb-2">
            {/* GUIDE: ID do objetivo */}
            <span className="text-xs text-white/50">#{id}</span>
            
            {/* CORREÇÃO #3: Categoria aparece ao lado do ID após hover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: showCategory ? 1 : 0,
                scale: showCategory ? 1 : 0.8,
              }}
              transition={{ duration: 0.2 }}
            >
              {showCategory && (
                <Badge 
                  className="text-[10px] py-0 px-2"
                  style={{
                    backgroundColor: category.color ? `#${category.color}` : '#888',
                    color: category.color === 'FFFFFF' || category.color === 'FFC0CB' || category.color === '00FFFF' || category.color === 'C0C0C0' || category.color === '20C6B6' || category.color === '90EE90' || category.color === 'ADD8E6' ? '#000' : '#fff',
                  }}
                >
                  {category.name}
                </Badge>
              )}
            </motion.div>
          </div>
          
          {/* CORREÇÃO #4: Título + Local na mesma linha (se couber) */}
          <div className="flex items-start gap-2">
            <h3 
              className={`
                text-white font-semibold flex-1
                ${isTopTen ? 'text-xl' : isRegular ? 'text-2xl' : 'text-lg'}
              `}
              style={isRegular ? {
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9), -1px -1px 2px rgba(0, 0, 0, 0.9)',
              } : {}}
            >
              {title}
            </h3>

            {/* CORREÇÃO #4: Local inline se título não for muito longo */}
            {shouldShowLocalInline() && (
              <span className="text-sm text-white/70 whitespace-nowrap flex-shrink-0">
                📍 {local}
              </span>
            )}
          </div>

          {/* CORREÇÃO #4: Local em linha separada se título for longo */}
          {local && !shouldShowLocalInline() && (
            <p className="text-sm text-white/70 mt-1">
              📍 {local}
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
