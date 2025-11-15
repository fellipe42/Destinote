// Página Principal - Home do Destinote
// Exibe hero section e lista completa de goals

'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import GlobeBackground from '@/components/GlobeBackground';
import GoalCard from '@/components/GoalCard';
import GoalModal from '@/components/GoalModal';

// Registrar plugin do GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Category {
  id: number;
  name: string;
  color: string | null;
}

interface Goal {
  id: number;
  title: string;
  local: string | null;
  categoryId: number;
  category: Category;
  isTopTen: boolean;
  imageUrl: string | null;
  description: string | null;
  cod2: string | null;
  cod3: string | null;
  refBase: number | null;
}

export default function HomePage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [topTenGoals, setTopTenGoals] = useState<Goal[]>([]);
  const [regularGoals, setRegularGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Buscar goals da API
  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = await fetch('/api/goals?limit=1000');
        const data = await response.json();
        
        if (data.success) {
          const allGoals = data.data;
          setGoals(allGoals);
          
          // Separar Top 10 dos demais
          const top10 = allGoals.filter((goal: Goal) => goal.isTopTen);
          const regular = allGoals.filter((goal: Goal) => !goal.isTopTen);
          
          setTopTenGoals(top10);
          setRegularGoals(regular);
        }
      } catch (error) {
        console.error('Erro ao buscar goals:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGoals();
  }, []);

  // Animações com GSAP no scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Animar cards ao entrar na viewport
    gsap.fromTo(
      '.goal-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.goals-grid',
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [goals]);

  // Handler para abrir modal
  const handleGoalClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen relative">
      {/* Fundo animado */}
      <GlobeBackground />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center pt-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold text-white mb-6"
          >
            Destinote
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 mb-8"
          >
            1000 coisas para fazer na vida
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-white/70 mb-12 max-w-2xl mx-auto"
          >
            Uma lista épica de experiências, aventuras e objetivos que vão transformar sua vida.
            Do simples ao extraordinário, do cômico ao inspirador.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={() => {
                const element = document.getElementById('goals-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105"
            >
              Explorar a Lista ↓
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Goals Section */}
      <section id="goals-section" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-white text-xl">
              Carregando os objetivos...
            </div>
          ) : (
            <>
              {/* Top 10 Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
                  ⭐ Top 10 Experiências
                </h2>
                <p className="text-white/70 text-center mb-12">
                  Os 10 objetivos mais icônicos da lista
                </p>
                
                <div className="goals-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {topTenGoals.map((goal) => (
                    <div key={goal.id} className="goal-card">
                      <GoalCard
                        {...goal}
                        onClick={() => handleGoalClick(goal)}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Regular Goals Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
                  Todos os Objetivos
                </h2>
                <p className="text-white/70 text-center mb-12">
                  {regularGoals.length} experiências esperando por você
                </p>
                
                <div className="goals-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {regularGoals.map((goal) => (
                    <div key={goal.id} className="goal-card">
                      <GoalCard
                        {...goal}
                        onClick={() => handleGoalClick(goal)}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Modal de detalhes */}
      <GoalModal
        goal={selectedGoal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-white/60">
          <p className="mb-2">© 2025 Destinote - 1000 coisas para fazer na vida</p>
          <p className="text-sm">
            Criado com ❤️ para inspirar aventuras e experiências memoráveis
          </p>
        </div>
      </footer>
    </div>
  );
}
