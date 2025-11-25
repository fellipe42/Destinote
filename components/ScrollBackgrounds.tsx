'use client';

import { useEffect, useState, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.25) {
        setCurrentBgIndex(0);
      } else {
        const cycleProgress = (latest - 0.25) / 0.75;
        const cycleIndex = Math.floor(cycleProgress * 10) % 4;
        setCurrentBgIndex(cycleIndex + 1);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const sunsetOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-30">

      {/* BG 1 - Sunset */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity: sunsetOpacity }}
      >
        <Image
          src={backgrounds[0].src}
          alt={backgrounds[0].alt}
          fill
          priority
          className="object-cover brightness-[0.85]"
        />

        {/* Overlay extremamente leve */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30" />
      </motion.div>

      {/* BG 2–5 */}
      {backgrounds.slice(1).map((bg, index) => {
        const isActive = currentBgIndex === index + 1;

        return (
          <motion.div
            key={bg.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <Image
              src={bg.src}
              alt={bg.alt}
              fill
              className="object-cover brightness-[0.85]"
            />

            {/* Overlay leve */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30" />
          </motion.div>
        );
      })}

      {/* Overlay global super leve */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />
    </div>
  );
}
