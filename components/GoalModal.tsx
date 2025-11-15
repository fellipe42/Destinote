
// Componente GoalModal - Modal para exibir detalhes de um goal
// Abre sem trocar de página, com animações suaves

'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface Category {
  id: number;
  name: string;
  color: string | null;
}

interface Goal {
  id: number;
  title: string;
  local: string | null;
  category: Category;
  isTopTen: boolean;
  imageUrl: string | null;
  description: string | null;
  cod2: string | null;
  cod3: string | null;
  refBase: number | null;
}

interface GoalModalProps {
  goal: Goal | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GoalModal({ goal, isOpen, onClose }: GoalModalProps) {
  if (!goal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-900 text-white border-2 border-purple-600">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            {goal.title}
          </DialogTitle>
          {goal.local && (
            <DialogDescription className="text-lg text-white/70">
              📍 {goal.local}
            </DialogDescription>
          )}
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Imagem se for Top 10 */}
          {goal.isTopTen && goal.imageUrl && (
            <div className="relative h-64 rounded-lg overflow-hidden">
              {/* Placeholder de imagem */}
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <span className="text-white text-8xl font-bold opacity-30">
                  {goal.id}
                </span>
              </div>
              {goal.isTopTen && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-yellow-500 text-black text-lg px-4 py-2">
                    ⭐ Top 10
                  </Badge>
                </div>
              )}
            </div>
          )}

          {/* Categoria */}
          <div className="flex items-center gap-2">
            <span className="text-white/70">Categoria:</span>
            <Badge 
              className="text-lg px-4 py-1"
              style={{
                backgroundColor: goal.category.color ? `#${goal.category.color}` : '#888',
                color: goal.category.color === 'FFFFFF' ? '#000' : '#fff',
              }}
            >
              {goal.category.name}
            </Badge>
          </div>

          {/* Descrição (placeholder para futuro) */}
          <div className="bg-black/30 p-6 rounded-lg">
            <h4 className="text-xl font-semibold mb-3">Sobre este objetivo</h4>
            <p className="text-white/80 leading-relaxed">
              {goal.description || 
                `Este é um dos ${goal.isTopTen ? 'principais ' : ''}objetivos da lista Destinote. 
                Em breve, teremos mais informações, dicas e histórias de pessoas que já completaram este objetivo!`}
            </p>
          </div>

          {/* Informações adicionais */}
          <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
            <div>
              <span className="font-semibold">ID:</span> #{goal.id}
            </div>
            <div>
              <span className="font-semibold">Ref Base:</span> {goal.refBase || 'N/A'}
            </div>
          </div>

          {/* Botões de ação (placeholder para futuro) */}
          <div className="flex gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              ✓ Marcar como completo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              + Adicionar à minha lista
            </motion.button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
