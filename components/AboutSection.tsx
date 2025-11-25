// Componente AboutSection - Seção "Sobre" com informações sobre o projeto
// Inclui foto do criador e botões de contato

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, MessageCircle, Linkedin, Instagram, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function AboutSection() {
  const [portfolioUrl, setPortfolioUrl] = useState(''); // Para ser configurado pelo usuário

  // Contatos - preparados para serem configurados
  const contacts = {
    whatsapp: '', // Adicionar número com código do país: 5511999999999
    instagram: '', // Adicionar username: @seu_usuario
    linkedin: '', // Adicionar URL completo
    email: '', // Adicionar email
  };

  const handleContactClick = (type: string) => {
    switch(type) {
      case 'whatsapp':
        if (contacts.whatsapp) {
          window.open(`https://wa.me/${contacts.whatsapp}`, '_blank');
        }
        break;
      case 'instagram':
        if (contacts.instagram) {
          window.open(`https://instagram.com/${contacts.instagram.replace('@', '')}`, '_blank');
        }
        break;
      case 'linkedin':
        if (contacts.linkedin) {
          window.open(contacts.linkedin, '_blank');
        }
        break;
      case 'email':
        if (contacts.email) {
          window.location.href = `mailto:${contacts.email}`;
        }
        break;
    }
  };

  return (
    <section className="relative py-32 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-12 text-center">
            Sobre o Projeto
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Coluna da esquerda - Foto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative cursor-pointer group"
              onClick={() => portfolioUrl && window.open(portfolioUrl, '_blank')}
            >
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-purple-600 shadow-2xl">
                <Image
                  src="/images/fellipe.jpg"
                  alt="Fellipe - Criador do Destinote"
                  fill
                  className="object-cover"
                />
              </div>
              {portfolioUrl && (
                <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-white text-center">
                    <ExternalLink size={32} className="mx-auto mb-2" />
                    <p className="text-sm font-semibold">Ver Portfólio</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Coluna da direita - Texto e Contatos */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Texto extraído de head.png - PLACEHOLDER */}
            <div className="text-white/90 space-y-4 text-lg leading-relaxed">
              <p>
                <strong className="text-purple-400">Destinote</strong> é mais do que uma lista - 
                é uma jornada de autodescoberta e realização de sonhos.
              </p>
              <p>
                Este projeto nasceu da paixão por experiências únicas e da vontade de 
                inspirar pessoas a viverem vidas mais ricas e significativas.
              </p>
              <p>
                Cada um dos <strong className="text-purple-400">1000+ objetivos</strong> foi 
                cuidadosamente selecionado para oferecer uma mistura perfeita de desafios, 
                aventuras, aprendizado e diversão.
              </p>
              <p className="text-sm text-white/70 italic">
                💡 Dica: Para editar este texto, modifique o componente AboutSection.tsx 
                com o conteúdo real extraído de head.png
              </p>
            </div>

            {/* Botões de Contato */}
            <div className="pt-6">
              <h3 className="text-2xl font-bold text-white mb-4">Vamos Conectar?</h3>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleContactClick('whatsapp')}
                  disabled={!contacts.whatsapp}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all ${
                    contacts.whatsapp 
                      ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer' 
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleContactClick('instagram')}
                  disabled={!contacts.instagram}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all ${
                    contacts.instagram 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white cursor-pointer' 
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Instagram size={20} />
                  Instagram
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleContactClick('linkedin')}
                  disabled={!contacts.linkedin}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all ${
                    contacts.linkedin 
                      ? 'bg-blue-700 hover:bg-blue-800 text-white cursor-pointer' 
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Linkedin size={20} />
                  LinkedIn
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleContactClick('email')}
                  disabled={!contacts.email}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all ${
                    contacts.email 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer' 
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Mail size={20} />
                  Email
                </motion.button>
              </div>

              {/* Nota sobre configuração */}
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-sm text-yellow-200">
                  📝 <strong>Nota:</strong> Configure seus contatos editando o arquivo 
                  <code className="mx-1 px-2 py-1 bg-black/30 rounded">
                    components/AboutSection.tsx
                  </code>
                  e adicionando suas informações de contato e URL do portfólio.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
