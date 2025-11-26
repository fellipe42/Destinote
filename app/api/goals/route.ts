import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const role = session?.user?.role ?? "public";

    const LIMITS = {
      public: 100,
      user: 300,
      paid: 500,
      premium: 2000,
    };

    const maxLimit = LIMITS[role as keyof typeof LIMITS];

    const params = request.nextUrl.searchParams;

    const page = parseInt(params.get("page") || "1");
    const requestedLimit = parseInt(params.get("limit") || "30");

    const categoryId = params.get("categoryId");
    const topTenOnly = params.get("topTen") === "true";

    const limit = Math.min(requestedLimit, maxLimit);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (categoryId) where.categoryId = parseInt(categoryId);
    if (topTenOnly) where.isTopTen = true;

    const goals = await prisma.goal.findMany({
      where,
      include: { category: true },
      orderBy: { id: "asc" },
      skip,
      take: limit,
    });

    const total = await prisma.goal.count({ where });

    return NextResponse.json({
      success: true,
      role,
      data: goals,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Erro /api/goals:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

