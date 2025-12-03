/* SPRINT 1 - CORREÇÃO #10: 
 * - Adicionado crossfade suave entre backgrounds
 * - Removidas telas pretas entre transições
 * - Implementado blur durante transição para suavidade
 * - Aumentada duração da transição para evitar cortes
 */

'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const backgrounds = [
  { id: 1, src: '/images/bg-1-sunset.png', alt: 'Pôr do sol' },
  { id: 2, src: '/images/bg-2.png', alt: 'Background 2' },
  { id: 3, src: '/images/bg-3.png', alt: 'Background 3' },
  { id: 4, src: '/images/bg-4.png', alt: 'Background 4' },
  { id: 5, src: '/images/bg-5.png', alt: 'Background 5' },
];

export default function ScrollBackgrounds() {
  const { scrollYProgress } = useScroll();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // CORREÇÃO #10: Transições suaves com debounce
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.25) {
        if (currentBgIndex !== 0) {
          setIsTransitioning(true);
          setCurrentBgIndex(0);
          // Marca fim da transição após duração completa
          setTimeout(() => setIsTransitioning(false), 2000);
        }
      } else {
        const cycleProgress = (latest - 0.25) / 0.75;
        const cycleIndex = Math.floor(cycleProgress * 10) % 4;
        const newIndex = cycleIndex + 1;
        
        if (newIndex !== currentBgIndex) {
          setIsTransitioning(true);
          setCurrentBgIndex(newIndex);
          setTimeout(() => setIsTransitioning(false), 2000);
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, currentBgIndex]);

  // GUIDE: Opacidade do primeiro background (sunset)
  // TODO: Ajustar [0, 0.25] para mudar quando o sunset desaparece
  const sunsetOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const sunsetBlur = useTransform(scrollYProgress, [0, 0.2, 0.25], [0, 5, 10]);

  return (
    <div className="fixed inset-0 -z-30">

      {/* BG 1 - Sunset (primeiro background) */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          opacity: sunsetOpacity,
        }}
      >
        {/* CORREÇÃO #10: Blur durante transição */}
        <motion.div
          className="w-full h-full"
          style={{
            filter: useTransform(sunsetBlur, (v) => `blur(${v}px)`),
          }}
        >
          <Image
            src={backgrounds[0].src}
            alt={backgrounds[0].alt}
            fill
            priority
            className="object-cover brightness-[0.85]"
          />
        </motion.div>

        {/* Overlay leve - mais sutil que antes */}
        {/* TODO: Ajustar opacidade do overlay editando from-black/5 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/15" />
      </motion.div>

      {/* BG 2–5 com crossfade suave */}
      {backgrounds.slice(1).map((bg, index) => {
        const isActive = currentBgIndex === index + 1;
        const isPrevious = currentBgIndex === index + 2 || 
                          (currentBgIndex === 1 && index === 3); // Wrap around

        return (
          <motion.div
            key={bg.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isActive ? 1 : 0,
              // CORREÇÃO #10: z-index para crossfade correto
              zIndex: isActive ? 2 : isPrevious ? 1 : 0,
            }}
            transition={{ 
              // CORREÇÃO #10: Transição mais longa e suave
              duration: 2.0, // Aumentado de 1.5 para 2.0
              ease: [0.43, 0.13, 0.23, 0.96], // Cubic bezier customizado
            }}
          >
            {/* CORREÇÃO #10: Blur sutil durante transição */}
            <motion.div
              className="w-full h-full"
              animate={{
                filter: isTransitioning && isActive 
                  ? 'blur(3px)' 
                  : 'blur(0px)',
              }}
              transition={{ duration: 1.0 }}
            >
              <Image
                src={bg.src}
                alt={bg.alt}
                fill
                className="object-cover brightness-[0.85]"
              />
            </motion.div>

            {/* Overlay leve - consistente com bg-1 */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/15" />
          </motion.div>
        );
      })}

      {/* CORREÇÃO #10: Overlay global MUITO sutil - reduzido de /5 para /3 */}
      {/* TODO: Ajustar bg-black/3 para deixar mais claro (/2) ou escuro (/5) */}
      <div className="absolute inset-0 bg-black/3 pointer-events-none" />
    </div>
  );
}
