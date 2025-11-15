// API Route: GET /api/categories
// Retorna a lista de todas as categorias com contagem de goals

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Buscar todas as categorias com contagem de goals
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { goals: true }, // Conta quantos goals tem cada categoria
        },
      },
      orderBy: {
        name: 'asc', // Ordenar alfabeticamente
      },
    });
    
    // Transformar dados para incluir contagem no objeto principal
    const categoriesWithCount = categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      color: cat.color,
      goalsCount: cat._count.goals,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    }));
    
    // Retornar categorias
    return NextResponse.json({
      success: true,
      data: categoriesWithCount,
      total: categories.length,
    });
    
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar categorias',
      },
      { status: 500 }
    );
  }
}

// Preparado para expansão futura: POST, PUT, DELETE para gerenciar categorias
// export async function POST(request: NextRequest) { ... }
