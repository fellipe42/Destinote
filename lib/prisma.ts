// Biblioteca para gerenciar a conexão com o Prisma Client
// Evita múltiplas instâncias do Prisma Client em desenvolvimento

import { PrismaClient } from '@prisma/client';

// Declaração global para TypeScript
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Criar ou reutilizar instância do Prisma Client
// Em desenvolvimento, reutiliza a instância para evitar warning de múltiplas conexões
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
