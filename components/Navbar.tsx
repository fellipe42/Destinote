
// Componente Navbar - Cabeçalho translúcido da aplicação
// Contém links de navegação e está fixo no topo

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  List, 
  Grid3x3, 
  CheckSquare, 
  Info, 
  Languages, 
  LogIn,
  Menu
} from 'lucide-react';

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
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              <List size={18} />
              A Lista
            </Link>
            <Link 
              href="/categorias" 
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              <Grid3x3 size={18} />
              Categorias
            </Link>
            <Link 
              href="/minha-lista" 
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              <CheckSquare size={18} />
              Criar minha lista
            </Link>
            <Link 
              href="/sobre" 
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              <Info size={18} />
              Sobre
            </Link>
            <Link 
              href="/idioma" 
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              <Languages size={18} />
              Idioma
            </Link>
            <Link 
              href="/entrar" 
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm uppercase tracking-wider"
            >
              <LogIn size={18} />
              Entrar
            </Link>
          </div>

          {/* Menu mobile (placeholder para futuro) */}
          <button className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
