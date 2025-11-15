// API Route: GET /api/goals
// Retorna a lista de todos os goals com suas categorias
// Suporta paginação e filtros por categoria

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Extrair parâmetros de query string
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const categoryId = searchParams.get('categoryId');
    const topTenOnly = searchParams.get('topTen') === 'true';
    
    // Calcular skip para paginação
    const skip = (page - 1) * limit;
    
    // Construir filtros
    const where: { categoryId?: number; isTopTen?: boolean } = {};
    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }
    if (topTenOnly) {
      where.isTopTen = true;
    }
    
    // Buscar goals com suas categorias
    const goals = await prisma.goal.findMany({
      where,
      include: {
        category: true, // Incluir dados da categoria
      },
      orderBy: {
        id: 'asc', // Ordenar por ID (mantém ordem do CSV)
      },
      skip,
      take: limit,
    });
    
    // Contar total de goals (para paginação)
    const total = await prisma.goal.count({ where });
    
    // Retornar resposta com dados e metadados de paginação
    return NextResponse.json({
      success: true,
      data: goals,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
    
  } catch (error) {
    console.error('Erro ao buscar goals:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar goals',
      },
      { status: 500 }
    );
  }
}

// Preparado para expansão futura: POST, PUT, DELETE
// export async function POST(request: NextRequest) { ... }
// export async function PUT(request: NextRequest) { ... }
// export async function DELETE(request: NextRequest) { ... }
