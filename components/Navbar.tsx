
// Componente Navbar - Cabeçalho translúcido da aplicação
// Contém links de navegação e está fixo no topo

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white hover:text-purple-400 transition-colors">
            Destinote
          </Link>

          {/* Links de navegação */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-white/90 hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              A Lista
            </Link>
            <Link 
              href="/categorias" 
              className="text-white/90 hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              Categorias
            </Link>
            <Link 
              href="/minha-lista" 
              className="text-white/90 hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              Criar minha lista
            </Link>
            <Link 
              href="/sobre" 
              className="text-white/90 hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              Sobre
            </Link>
            <Link 
              href="/idioma" 
              className="text-white/90 hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              Idioma
            </Link>
            <Link 
              href="/entrar" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm uppercase tracking-wider"
            >
              Entrar
            </Link>
          </div>

          {/* Menu mobile (placeholder para futuro) */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
