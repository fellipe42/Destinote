// Componente RotatingGlobe - Globo terrestre que gira conforme o scroll
// Aparece depois dos backgrounds de transição
/* SPRINT 1 - CORREÇÃO #1 e #9: 
 * - Removido fundo sólido que causava tela preta (linha 27-31)
 * - Adicionada rotação automática contínua 
 * - Ajustado z-index para não bloquear conteúdo
 * - Mantida opacidade controlada por scroll
 */

'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

export default function RotatingGlobe() {
  const { scrollYProgress } = useScroll();
  
  // GUIDE: Controle de opacidade do globo - aparece após 60% do scroll
  // TODO: Ajustar valores [0.6, 0.65, 0.8, 0.85] para mudar quando o globo aparece/desaparece
  const opacity = useTransform(scrollYProgress, [0.6, 0.65, 0.8, 0.85], [0, 1, 1, 0]);
  
  // CORREÇÃO #9: Rotação automática + rotação por scroll combinadas
  const scrollRotation = useTransform(scrollYProgress, [0.6, 0.85], [0, 180]);
  const autoRotation = useRef(0);
  
  // Animação de rotação automática contínua
  useEffect(() => {
    let animationFrameId: number;
    let startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      // Rotação lenta: 1 volta completa a cada 30 segundos
      // TODO: Ajustar divisor (30000) para mudar velocidade da rotação automática
      autoRotation.current = (elapsed / 30000) * 360;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
  
  // Escala sutil que aumenta e diminui
  // TODO: Ajustar valores [0.8, 1, 1, 0.8] para mudar escala do globo
  const scale = useTransform(scrollYProgress, [0.6, 0.7, 0.8, 0.85], [0.8, 1, 1, 0.8]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed inset-0 -z-10 flex items-center justify-center pointer-events-none"
      style={{ opacity }}
    >
      {/* CORREÇÃO #1: Fundo sólido REMOVIDO para não bloquear backgrounds */}
      {/* ANTES: <motion.div className="absolute inset-0 bg-[#0a1628]" /> */}
      {/* AGORA: Apenas globo transparente sobre os backgrounds */}
      
      {/* Globo rotativo com rotação automática + scroll */}
      <motion.div
        className="relative"
        style={{ 
          // Combina rotação automática com rotação do scroll
          rotate: useTransform(
            scrollRotation, 
            (latest) => latest + autoRotation.current
          ),
          scale: smoothScale,
        }}
      >
        <div className="relative w-[600px] h-[600px]">
          {/* TODO: Trocar imagem do globo em /public/images/globe-earth.png */}
          <Image
            src="/images/globe-earth.png"
            alt="Globo terrestre"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </motion.div>

      {/* Efeito de brilho/glow ao redor do globo - agora mais sutil */}
      {/* GUIDE: Ajustar opacidade do glow editando bg-blue-500/10 (valores de 0 a 100) */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full bg-blue-500/5 blur-3xl"
        style={{ scale: smoothScale }}
      />
    </motion.div>
  );
}
