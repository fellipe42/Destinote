// Componente RotatingGlobe - Globo terrestre que gira conforme o scroll
// Aparece depois dos backgrounds de transição

'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function RotatingGlobe() {
  const { scrollYProgress } = useScroll();
  
  // O globo aparece após 60% do scroll e fica até 80%
  const opacity = useTransform(scrollYProgress, [0.6, 0.65, 0.8, 0.85], [0, 1, 1, 0]);
  
  // Rotação baseada no scroll - 360 graus completos
  const rotation = useTransform(scrollYProgress, [0.6, 0.85], [0, 360]);
  
  // Escala sutil que aumenta e diminui
  const scale = useTransform(scrollYProgress, [0.6, 0.7, 0.8, 0.85], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      className="fixed inset-0 -z-10 flex items-center justify-center pointer-events-none"
      style={{ opacity }}
    >
      {/* Fundo sólido azul escuro por trás do globo */}
      <motion.div 
        className="absolute inset-0 bg-[#0a1628]"
        style={{ opacity }}
      />
      
      {/* Globo rotativo */}
      <motion.div
        className="relative"
        style={{ 
          rotate: rotation,
          scale: scale,
        }}
      >
        <div className="relative w-[600px] h-[600px]">
          <Image
            src="/images/globe-earth.png"
            alt="Globo terrestre"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </motion.div>

      {/* Efeito de brilho/glow ao redor do globo */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full bg-blue-500/10 blur-3xl"
        style={{ scale }}
      />
    </motion.div>
  );
}
