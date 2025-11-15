
# 🎨 Destinote - Documentação Técnica Frontend

Documentação detalhada sobre a arquitetura, componentes e decisões técnicas do frontend do Destinote.

## 📋 Índice

- [Arquitetura Frontend](#arquitetura-frontend)
- [Stack Tecnológica](#stack-tecnológica)
- [Sistema de Design](#sistema-de-design)
- [Componentes](#componentes)
- [Animações](#animações)
- [Estado e Dados](#estado-e-dados)
- [Otimizações](#otimizações)
- [Padrões de Código](#padrões-de-código)

## 🏗 Arquitetura Frontend

### Next.js 14 App Router

O projeto usa o **App Router** do Next.js 14, a nova arquitetura baseada em React Server Components.

#### Estrutura de Pastas

```
app/
├── api/          # API Routes (Backend)
├── layout.tsx    # Layout raiz (shared entre páginas)
├── page.tsx      # Página principal (/)
└── globals.css   # Estilos globais
```

#### Benefícios do App Router

- ✅ **Server Components por padrão** - Melhor performance
- ✅ **Layouts aninhados** - Reutilização de UI
- ✅ **Loading & Error states** - UX melhorada
- ✅ **Streaming** - Carregamento progressivo
- ✅ **API Routes integradas** - Backend no mesmo projeto

### Client vs Server Components

```typescript
// Server Component (padrão)
export default function ServerComponent() {
  // Pode buscar dados diretamente
  // Renderizado no servidor
  return <div>...</div>
}

// Client Component (interativo)
'use client'
export default function ClientComponent() {
  // Pode usar hooks (useState, useEffect)
  // Renderizado no cliente
  return <div>...</div>
}
```

**Quando usar cada um:**
- **Server**: Conteúdo estático, fetch de dados, SEO
- **Client**: Interatividade, animações, hooks do React

## 🛠 Stack Tecnológica

### Core

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| Next.js | 14 | Framework React fullstack |
| React | 18 | Biblioteca UI |
| TypeScript | 5 | Tipagem estática |
| TailwindCSS | 3.4 | Estilização utility-first |

### UI & Animações

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| Framer Motion | 12 | Animações React declarativas |
| GSAP | 3.13 | Animações avançadas, scroll triggers |
| ShadCN UI | Latest | Componentes UI acessíveis |
| Radix UI | Latest | Primitivos UI sem estilo |

### Justificativas

#### Por que Next.js?
- SSR/SSG para melhor SEO
- API Routes integradas (backend + frontend no mesmo projeto)
- Otimizações automáticas (imagens, fonts, code splitting)
- Developer Experience superior

#### Por que TypeScript?
- Autocomplete inteligente
- Menos bugs em runtime
- Melhor manutenibilidade
- Documentação "viva" no código

#### Por que Tailwind?
- Desenvolvimento rápido
- Consistência de design
- Bundle size pequeno (purge de CSS não usado)
- Mobile-first por padrão

#### Por que Framer Motion + GSAP?
- **Framer Motion**: Animações React-friendly, fácil de usar
- **GSAP**: Animações complexas, scroll triggers avançados
- Complementam-se: FM para UI, GSAP para efeitos especiais

## 🎨 Sistema de Design

### Paleta de Cores

#### Cores Primárias

```css
/* Tema escuro (padrão) */
--background: 222.2 84% 4.9%;      /* Cinza muito escuro */
--foreground: 210 40% 98%;         /* Branco suave */
--primary: 217.2 91.2% 59.8%;      /* Azul */
--accent: 217.2 32.6% 17.5%;       /* Cinza médio */
```

#### Cores das Categorias

Cada uma das 22 categorias tem cor única (hex):

```typescript
{
  'Lifestyle': '#FF5D5D',     // Vermelho
  'Aprender': '#00B000',      // Verde
  'Participar': '#4343FF',    // Azul
  'Visitar': '#FFFF00',       // Amarelo
  'Comer': '#EF6E03',         // Laranja
  // ... 17 mais
}
```

### Tipografia

```typescript
// Fonte principal
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

// Fonte monoespaçada
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});
```

### Breakpoints

```javascript
// tailwind.config.ts
screens: {
  'sm': '640px',   // Mobile large
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Desktop large
  '2xl': '1536px', // Desktop XL
}
```

## 🧩 Componentes

### Componentes Principais

#### 1. Navbar

**Localização**: `components/Navbar.tsx`

**Características**:
- Fixo no topo (fixed positioning)
- Backdrop blur (translúcido)
- Animação de entrada (slide from top)
- Responsivo (menu hamburger no mobile)

**Props**: Nenhuma (stateless)

**Código-chave**:
```typescript
<motion.nav
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  className="fixed top-0 z-50 backdrop-blur-md"
>
```

#### 2. GlobeBackground

**Localização**: `components/GlobeBackground.tsx`

**Características**:
- Canvas HTML5 animado
- Gradiente radial dinâmico
- Partículas/estrelas flutuantes
- Performance otimizada (requestAnimationFrame)

**Técnicas usadas**:
- Canvas 2D Context
- Gradientes radiais
- Animações com Math.sin/cos
- Framer Motion para partículas

**Código-chave**:
```typescript
const gradient = ctx.createRadialGradient(
  canvas.width / 2 + Math.sin(frame * 0.01) * 200,
  canvas.height / 2 + Math.cos(frame * 0.01) * 200,
  // ...
);
```

#### 3. GoalCard

**Localização**: `components/GoalCard.tsx`

**Características**:
- Dois layouts: Top 10 (com imagem) e Regular
- Hover state com timer de 1s
- Categoria aparece gradualmente
- Cores dinâmicas baseadas na categoria
- Animação de scale no hover

**Props**:
```typescript
interface GoalCardProps {
  id: number;
  title: string;
  category: Category;
  isTopTen?: boolean;
  imageUrl?: string | null;
  local?: string | null;
  onClick?: () => void;
}
```

**Lógica de hover**:
```typescript
const handleMouseEnter = () => {
  const timer = setTimeout(() => {
    setShowCategory(true);
  }, 1000); // 1 segundo
  setHoverTimer(timer);
};
```

#### 4. GoalModal

**Localização**: `components/GoalModal.tsx`

**Características**:
- Dialog acessível (ShadCN)
- Animações de entrada
- Placeholder de imagem para Top 10
- Botões de ação (preparado para funcionalidades futuras)
- Escape key para fechar

**Props**:
```typescript
interface GoalModalProps {
  goal: Goal | null;
  isOpen: boolean;
  onClose: () => void;
}
```

### Componentes ShadCN UI

Localizados em `components/ui/`:

- **Button** - Botões estilizados
- **Card** - Container de conteúdo
- **Dialog** - Modal/overlay
- **Badge** - Tags/labels

Todos seguem padrões de acessibilidade (WAI-ARIA).

## ✨ Animações

### Framer Motion

**Uso**: Animações de UI, transições entre estados

**Exemplos no projeto**:

1. **Fade in + Slide up**:
```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
```

2. **Hover scale**:
```typescript
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

3. **Scroll-based**:
```typescript
const { scrollYProgress } = useScroll();
const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
```

### GSAP

**Uso**: Animações complexas, scroll triggers

**Exemplo no projeto**:

```typescript
gsap.fromTo(
  '.goal-card',
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    stagger: 0.1,  // Anima um após o outro
    scrollTrigger: {
      trigger: '.goals-grid',
      start: 'top 80%',
    },
  }
);
```

### Performance de Animações

**Boas práticas aplicadas**:
- ✅ Usar `transform` e `opacity` (GPU-accelerated)
- ✅ `will-change` para propriedades que vão animar
- ✅ `requestAnimationFrame` para animações canvas
- ✅ Cleanup de event listeners e timers
- ✅ Lazy loading de componentes pesados

## 📊 Estado e Dados

### Fetch de Dados

**Client-side fetching** (usado atualmente):

```typescript
useEffect(() => {
  async function fetchGoals() {
    const response = await fetch('/api/goals?limit=1000');
    const data = await response.json();
    setGoals(data.data);
  }
  fetchGoals();
}, []);
```

**Vantagens**:
- Simples de implementar
- Atualização em tempo real
- Bom para dados que mudam frequentemente

**Alternativa futura** (Server Components):

```typescript
// Fetch direto no Server Component
export default async function GoalsPage() {
  const goals = await prisma.goal.findMany();
  return <GoalsList goals={goals} />;
}
```

**Vantagens**:
- Zero JavaScript no cliente para fetch
- SEO melhorado
- Tempo de carregamento inicial reduzido

### Estado Local

**useState** para estado de UI:

```typescript
const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [loading, setLoading] = useState(true);
```

**useRef** para referências DOM:

```typescript
const canvasRef = useRef<HTMLCanvasElement>(null);
const heroRef = useRef<HTMLDivElement>(null);
```

### Futuros: Estado Global

Para features futuras (auth, carrinho, etc), considerar:

- **React Context** - Simples, nativo
- **Zustand** - Leve, fácil de usar
- **Redux Toolkit** - Complexo, mas robusto

## ⚡ Otimizações

### Performance

1. **Code Splitting Automático**
   - Next.js faz automaticamente
   - Cada rota = chunk separado

2. **Image Optimization**
   - Usar `next/image` quando adicionar imagens reais
   - Lazy loading automático
   - Responsive images

3. **Font Optimization**
   - Fontes locais (não CDN)
   - Variable fonts (tamanho menor)
   - `font-display: swap`

4. **CSS Purging**
   - Tailwind remove CSS não usado
   - Build de produção ~95% menor

### SEO

1. **Metadata**:
```typescript
export const metadata: Metadata = {
  title: "Destinote - 1000 coisas para fazer na vida",
  description: "...",
};
```

2. **Semantic HTML**:
```html
<main>, <section>, <article>, <nav>, <header>, <footer>
```

3. **Acessibilidade**:
- ARIA labels
- Keyboard navigation
- Focus states
- Alt text em imagens

### Bundle Size

**Atual**:
- First Load JS: ~100KB (excelente)
- Main bundle: ~80KB

**Otimizações aplicadas**:
- Tree shaking (importar apenas o necessário)
- Dynamic imports para componentes pesados
- Tailwind purge de CSS

## 📝 Padrões de Código

### Naming Conventions

```typescript
// Componentes: PascalCase
export default function GoalCard() {}

// Funções: camelCase
function fetchGoals() {}

// Constantes: UPPER_SNAKE_CASE
const API_BASE_URL = "...";

// Interfaces: PascalCase com I (opcional)
interface GoalCardProps {}
```

### Estrutura de Componente

```typescript
// 1. Imports
import { useState } from 'react';
import { motion } from 'framer-motion';

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Component
export default function MyComponent({ props }: Props) {
  // 3.1 Hooks
  const [state, setState] = useState();
  
  // 3.2 Handlers
  const handleClick = () => {};
  
  // 3.3 Effects
  useEffect(() => {}, []);
  
  // 3.4 Render
  return <div>...</div>;
}
```

### Comentários

**Comentários em PORTUGUÊS** em todo o código:

```typescript
// Buscar goals da API
async function fetchGoals() {
  // ...
}

// Handler para abrir modal
const handleGoalClick = (goal: Goal) => {
  // ...
};
```

**JSDoc para funções complexas**:

```typescript
/**
 * Converte cor hex para rgba
 * @param hex - Cor em hexadecimal (ex: "FF5D5D")
 * @param alpha - Opacidade de 0 a 1
 * @returns String rgba
 */
function hexToRgba(hex: string, alpha: number): string {
  // ...
}
```

### TypeScript

**Sempre tipar props**:
```typescript
interface Props {
  title: string;
  count?: number;  // Opcional
  onClick: () => void;
}
```

**Evitar `any`**:
```typescript
// ❌ Ruim
const data: any = await fetch();

// ✅ Bom
const data: Goal[] = await fetch();
```

**Use type inference**:
```typescript
// TypeScript já sabe que é number
const count = 5;

// Mas tipagem explícita em funções
function add(a: number, b: number): number {
  return a + b;
}
```

## 🔮 Próximos Passos Técnicos

### Melhorias de Performance

1. **Virtualização de lista**
   - React Window ou TanStack Virtual
   - Renderizar apenas goals visíveis
   - Importante com 1000+ items

2. **Server Components**
   - Migrar fetch de dados para server
   - Reduzir JavaScript no cliente

3. **Imagens otimizadas**
   - next/image para todas as imagens
   - WebP/AVIF automático
   - Blur placeholder

### Features UI

1. **Filtros e busca**
   - Filtrar por categoria
   - Busca por texto
   - Ordenação customizada

2. **Modo escuro/claro**
   - Toggle theme
   - Persistir preferência

3. **Animações temáticas**
   - Água: efeito de ondas/gotas
   - Países: bandeiras animadas
   - Partículas 3D com Three.js

### Acessibilidade

1. **Keyboard navigation completa**
2. **Screen reader testing**
3. **Focus indicators melhorados**
4. **Modo de alto contraste**

---

**Questões?** Abra uma issue ou consulte a documentação oficial das tecnologias:
- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/docs/)
- [TailwindCSS](https://tailwindcss.com/docs)
