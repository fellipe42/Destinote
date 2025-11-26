"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import RotatingGlobe from "./RotatingGlobe";

/**
 * Timeline cinematográfica:
 * - type: "image" | "component"
 * - for "image" deve ter `src` (string)
 * - start/end = porcentagem do scroll (0..1)
 * - zoom = número (ex: 1.05)
 *
 * Ajuste a ordem aqui mesmo para controlar sequência.
 */
const timeline = [
  { id: "sunset1", type: "image", src: "/images/bg-1-sunset.png", start: 0.0, end: 0.20, zoom: 1, blur: 0 },
  { id: "globe-1", type: "component", component: <RotatingGlobe />, start: 0.20, end: 0.26 },
  { id: "bg2", type: "image", src: "/images/bg-2.png", start: 0.26, end: 0.40, zoom: 1.04, blur: 0 },
  { id: "bg3", type: "image", src: "/images/bg-3.png", start: 0.40, end: 0.56, zoom: 1.04, blur: 0 },
  { id: "globe-2", type: "component", component: <RotatingGlobe />, start: 0.56, end: 0.62 },
  { id: "bg4", type: "image", src: "/images/bg-4.png", start: 0.62, end: 0.80, zoom: 1.04, blur: 0 },
  { id: "sunset2", type: "image", src: "/images/bg-1-sunset.png", start: 0.80, end: 1.0, zoom: 1, blur: 0 },
];

export default function ScrollBackgrounds() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
      {timeline.map((item, index) => {
        // --- CASE: componente (globo) ---
        if (item.type === "component") {
          // opacity rápido entre start/end
          const opacity = useTransform(
            scrollYProgress,
            [item.start, item.start + 0.02, item.end - 0.02, item.end],
            [0, 1, 1, 0]
          );

          return (
            <motion.div
              key={item.id}
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity }}
            >
              {item.component}
            </motion.div>
          );
        }

        // --- CASE: imagem ---
        // Segurança: Typescript espera src definido para imagens. 
        // Se por acaso timeline foi configurada errado, pulamos.
        if (!item.src) return null;

        // Para o primeiro item (sunset1) queremos **sem fade/zoom**.
        const isFirst = index === 0;

        // Controle de opacidade: fade rápido (janela pequena) para evitar "parede preta".
        // Janela de transição reduzida: 0.03 (3% do scroll)
        const fadeWindow = 0.03;

        const opacity = useTransform(
          scrollYProgress,
          [item.start, item.start + fadeWindow, item.end - fadeWindow, item.end],
          [0, 1, 1, 0]
        );

        // scale: se for o primeiro, manter 1. Para os demais, leve zoom (ex: 1.04 -> 1).
        const scale = useTransform(
          scrollYProgress,
          [item.start, item.end],
          [isFirst ? 1 : (item.zoom ?? 1.04), 1]
        );

        // Não usamos blur (você pediu para remover), então deixamos sem filter.
        // Se futuramente quiser blur, colocar: const filter = useTransform(...)

        return (
          <motion.div
            key={item.id}
            className="absolute inset-0"
            style={{
              opacity,
              scale,
              // NB: não definimos `filter` (sem blur)
            }}
          >
            <Image
              src={item.src}
              alt={item.id}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        );
      })}

      {/* Overlay global bem discreto (opcional: mude ou remova) */}
      <div className="absolute inset-0 bg-black/6 pointer-events-none" />
    </div>
  );
}

