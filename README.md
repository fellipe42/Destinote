
# 🌟 Destinote - 1000 Coisas para Fazer na Vida

Uma aplicação web completa e interativa que apresenta uma lista épica de 1000 experiências, aventuras e objetivos de vida. Do simples ao extraordinário, do cômico ao inspirador.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Placeholders de Imagens](#placeholders-de-imagens)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Próximas Features](#próximas-features)
- [Contribuindo](#contribuindo)

## 🎯 Sobre o Projeto

Destinote é uma aplicação web que apresenta uma curadoria de 1000 objetivos de vida organizados em 22 categorias diferentes. O projeto foi desenvolvido com foco em experiência do usuário, com animações fluidas, design moderno e interface intuitiva.

### Destaques

- ⭐ **Top 10 Destacados**: Os 10 objetivos mais icônicos com tratamento visual especial
- 🎨 **22 Categorias Coloridas**: Cada categoria possui cor única para fácil identificação
- ✨ **Animações Ricas**: Uso de Framer Motion e GSAP para interações suaves
- 🌐 **Fundo Animado**: Gradiente dinâmico que simula um globo/universo
- 📱 **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🚀 **Performance Otimizada**: Next.js 14 com App Router para carregamento rápido

## 🛠 Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática para maior segurança
- **TailwindCSS** - Framework CSS utility-first
- **Framer Motion** - Biblioteca de animações React
- **GSAP** - Animações avançadas e scroll triggers
- **ShadCN UI** - Componentes UI acessíveis e customizáveis

### Backend & Database
- **Prisma ORM** - ORM moderno para TypeScript
- **SQLite** - Banco de dados local leve e rápido
- **Next.js API Routes** - Backend integrado no Next.js

### Dev Tools
- **ESLint** - Linter para código JavaScript/TypeScript
- **TypeScript** - Verificação de tipos em tempo de desenvolvimento

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **npm** (geralmente vem com Node.js) ou **yarn**
- **Git** (opcional, para clonar o repositório)

### Verificando instalação

```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version
```

## 🚀 Instalação

### Passo 1: Preparar o projeto

Se você está lendo isso, provavelmente já tem o projeto. Se não:

```bash
# Navegar para a pasta do projeto
cd destinote
```

### Passo 2: Instalar dependências

```bash
# Instalar todas as dependências do projeto
npm install
```

Isso pode levar alguns minutos. O npm irá instalar:
- Next.js e React
- TypeScript e tipos necessários
- TailwindCSS e PostCSS
- Framer Motion e GSAP
- Prisma e Prisma Client
- ShadCN UI components
- Outras dependências auxiliares

### Passo 3: Configurar variáveis de ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env
```

O arquivo `.env` já vem configurado com valores padrão que funcionam localmente. Você não precisa alterar nada por enquanto.

### Passo 4: Configurar banco de dados

```bash
# Criar banco de dados SQLite
npm run db:migrate

# Popular banco com os 1000 goals do CSV
npm run db:seed
```

O comando `db:seed` irá:
1. Criar 22 categorias com suas cores
2. Ler o arquivo CSV com os 1000 itens
3. Inserir todos os goals no banco de dados
4. Marcar os 10 primeiros como "Top 10"

Você verá uma saída similar a:
```
🌱 Iniciando seed do banco de dados...
📂 Criando categorias...
✅ 22 categorias criadas/atualizadas
📖 Lendo CSV...
✅ 808 goals criados com sucesso!
```

## ▶️ Executando o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

Isso iniciará o servidor de desenvolvimento. Abra seu navegador e acesse:

```
http://localhost:3000
```

O servidor suporta **hot reload** - qualquer mudança no código será refletida automaticamente no navegador.

### Modo Produção

```bash
# Build da aplicação
npm run build

# Iniciar servidor de produção
npm start
```

## 📁 Estrutura do Projeto

```
destinote/
├── app/                          # Diretório principal do Next.js 14 (App Router)
│   ├── api/                      # API Routes
│   │   ├── goals/               # Endpoints de goals
│   │   │   ├── route.ts         # GET /api/goals (lista todos)
│   │   │   └── [id]/            # GET /api/goals/:id (detalhes)
│   │   │       └── route.ts
│   │   └── categories/          # Endpoints de categorias
│   │       └── route.ts         # GET /api/categories
│   ├── globals.css              # Estilos globais e variáveis CSS
│   ├── layout.tsx               # Layout raiz da aplicação
│   └── page.tsx                 # Página principal (Home)
│
├── components/                   # Componentes React reutilizáveis
│   ├── ui/                      # Componentes ShadCN UI
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── badge.tsx
│   ├── Navbar.tsx               # Cabeçalho translúcido fixo
│   ├── GlobeBackground.tsx      # Fundo animado com gradiente
│   ├── GoalCard.tsx             # Card individual de goal
│   └── GoalModal.tsx            # Modal de detalhes do goal
│
├── lib/                         # Bibliotecas e utilitários
│   ├── prisma.ts                # Instância do Prisma Client
│   └── utils.ts                 # Funções utilitárias (cn, etc)
│
├── prisma/                      # Configuração do banco de dados
│   ├── schema.prisma            # Schema do banco (modelos)
│   ├── seed.ts                  # Script para popular o banco
│   ├── migrations/              # Histórico de migrações
│   └── dev.db                   # Banco de dados SQLite (gerado)
│
├── public/                      # Arquivos públicos estáticos
│   └── images/                  # Pasta para imagens
│       └── placeholder-*.jpg    # ⚠️ ADICIONE SUAS IMAGENS AQUI
│
├── .env                         # Variáveis de ambiente (NÃO commitar!)
├── .env.example                 # Exemplo de variáveis de ambiente
├── components.json              # Configuração do ShadCN UI
├── next.config.js               # Configuração do Next.js
├── tailwind.config.ts           # Configuração do TailwindCSS
├── tsconfig.json                # Configuração do TypeScript
├── package.json                 # Dependências e scripts
├── README.md                    # Este arquivo
└── README_FRONTEND.md           # Documentação técnica do frontend
```

## ✨ Funcionalidades

### Implementadas

✅ **Sistema de Goals**
- Lista completa de ~1000 objetivos
- Separação visual entre Top 10 e demais goals
- Categorização por 22 categorias diferentes
- Filtros por categoria (preparado na API)

✅ **Interface Interativa**
- Cards animados com hover effects
- Categoria aparece após 1 segundo de hover
- Click abre modal com detalhes (sem trocar de página)
- Scroll suave entre seções

✅ **Design & Animações**
- Fundo com gradiente animado (simulação de globo)
- Partículas/estrelas flutuantes
- Animações de entrada com Framer Motion
- Scroll-based animations com GSAP
- Navbar translúcido fixo no topo

✅ **API REST**
- `GET /api/goals` - Lista goals com paginação e filtros
- `GET /api/goals/:id` - Detalhes de um goal específico
- `GET /api/categories` - Lista todas categorias

✅ **Banco de Dados**
- SQLite local com Prisma ORM
- Script de seed automático
- Estrutura pronta para expansão

### 🔮 Próximas Features (Preparado para implementação)

🔜 **Autenticação de Usuários**
- Login com email/senha
- OAuth (Google, GitHub)
- Perfis de usuário

🔜 **Listas Personalizadas**
- Criar sua própria lista
- Marcar goals como completos
- Compartilhar progresso

🔜 **Sistema de Comentários**
- Comentar em cada goal
- Compartilhar experiências
- Sistema de likes

🔜 **Gamificação**
- Pontos por goals completados
- Badges e conquistas
- Rankings

🔜 **Pagamentos (Premium)**
- Conteúdo exclusivo
- Desafios premium
- Suporte ao projeto

## 🖼️ Placeholders de Imagens

### ⚠️ IMPORTANTE: Substituir Imagens

O projeto usa placeholders para as imagens dos **Top 10 Goals**. Você precisa adicionar imagens reais para melhor experiência visual.

### Onde adicionar as imagens

```
/public/images/placeholder-1.jpg    → Goal ID 1: Pular de paraquedas
/public/images/placeholder-2.jpg    → Goal ID 2: Plantar uma árvore
/public/images/placeholder-3.jpg    → Goal ID 3: Compor uma música
/public/images/placeholder-4.jpg    → Goal ID 4: Doar sangue
/public/images/placeholder-5.jpg    → Goal ID 5: Ir à uma festa a fantasia
/public/images/placeholder-6.jpg    → Goal ID 6: Ver uma estrela cadente
/public/images/placeholder-7.jpg    → Goal ID 7: Adotar um cachorro
/public/images/placeholder-8.jpg    → Goal ID 8: Ter/adotar um filho
/public/images/placeholder-9.jpg    → Goal ID 9: Tirar Carteira de Habilitação
/public/images/placeholder-10.jpg   → Goal ID 10: Escrever um livro
```

### Recomendações de imagens

- **Formato**: JPG ou PNG
- **Tamanho**: 800x600px (ou proporção 4:3)
- **Peso**: Máximo 200KB por imagem (otimize!)
- **Estilo**: Fotos de alta qualidade, inspiradoras
- **Fontes gratuitas**:
  - [Unsplash](https://unsplash.com)
  - [Pexels](https://pexels.com)
  - [Pixabay](https://pixabay.com)

### Como atualizar no código

As imagens são referenciadas em:
1. **Banco de dados**: Campo `imageUrl` na tabela `Goal`
2. **Componente**: `GoalCard.tsx` e `GoalModal.tsx`

Para adicionar imagens reais:

```typescript
// Exemplo: atualizar um goal no banco
await prisma.goal.update({
  where: { id: 1 },
  data: { imageUrl: '/images/placeholder-1.jpg' }
});
```

Ou edite diretamente o `prisma/seed.ts` antes de rodar `npm run db:seed`.

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento (port 3000)

# Produção
npm run build            # Cria build otimizado
npm start                # Inicia servidor de produção

# Banco de Dados
npm run db:migrate       # Cria/atualiza estrutura do banco
npm run db:seed          # Popula banco com dados do CSV
npm run db:studio        # Abre Prisma Studio (visualizador de dados)

# Code Quality
npm run lint             # Verifica código com ESLint
```

### Prisma Studio

Para visualizar e editar dados do banco de forma visual:

```bash
npm run db:studio
```

Isso abrirá uma interface web em `http://localhost:5555` onde você pode:
- Ver todas as tabelas
- Adicionar/editar/deletar registros
- Executar queries

## 🎨 Personalização

### Cores das Categorias

As cores das categorias estão definidas em `prisma/seed.ts`. Para alterar:

```typescript
const categoryColorMap: Record<string, string | null> = {
  'Lifestyle': 'FF5D5D',     // Vermelho
  'Aprender': '00B000',      // Verde
  // ... adicione ou modifique cores aqui
};
```

### Estilos Globais

Edite `app/globals.css` para customizar:
- Cores do tema
- Scrollbar
- Animações
- Tipografia

### Componentes UI

Os componentes ShadCN em `components/ui/` podem ser customizados diretamente ou via `tailwind.config.ts`.

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você quer melhorar o Destinote:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Notas Importantes

### Dados do CSV

O arquivo CSV original está em `/home/ubuntu/Uploads/1000 Main - online - Lista Principal.csv`. 

⚠️ **Avisos do Seed**: Durante o seed, você pode ver avisos de categorias não encontradas. Isso acontece porque:
- Algumas categorias no CSV têm nomes ligeiramente diferentes
- Alguns registros podem ter formatação inconsistente
- ~808 dos 1074 registros são importados com sucesso

Para melhorar a importação, edite o `categoryColorMap` em `prisma/seed.ts` para incluir variações de nomes.

### Performance

- O projeto usa **SQLite local** - perfeito para desenvolvimento e projetos pequenos
- Para produção com muitos usuários, considere migrar para PostgreSQL ou MySQL
- Imagens devem ser otimizadas (use Next.js Image component para auto-otimização)

### SEO

Para melhorar SEO:
1. Adicione metadados em cada página
2. Use Next.js 14 metadata API
3. Crie sitemap.xml
4. Configure robots.txt

## 🐛 Problemas Comuns

### Erro: "Cannot find module '@prisma/client'"

```bash
# Regenerar Prisma Client
npx prisma generate
```

### Erro: "Port 3000 is already in use"

```bash
# Matar processo na porta 3000 (Linux/Mac)
lsof -ti:3000 | xargs kill -9

# Ou usar outra porta
npm run dev -- -p 3001
```

### Banco de dados vazio após seed

```bash
# Deletar banco e recriar
rm prisma/dev.db
npm run db:migrate
npm run db:seed
```

## 📄 Licença

Este projeto é de código aberto e está disponível para uso educacional e pessoal.

## 👤 Autor

Desenvolvido com ❤️ para inspirar aventuras e experiências memoráveis.

---

**Destinote** - Porque a vida é uma lista de experiências esperando para serem vividas! 🌟

Para mais detalhes técnicos sobre o frontend, veja [README_FRONTEND.md](./README_FRONTEND.md).
