// Script de seed para popular o banco de dados
// Lê o CSV e insere as categorias e goals no banco

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Mapeamento de categorias com suas cores (baseado nas especificações)
const categoryColorMap: Record<string, string | null> = {
  'Lifestyle': 'FF5D5D',
  'Aprender': '00B000',
  'Participar': '4343FF',
  'Visitar': 'FFFF00',
  'Comer': 'EF6E03',
  'Assistir': '800080',
  'Ter': '00FFFF',
  'Criativos': 'FF00FF',
  'Amor': 'A52A2A',
  'Humanitário': 'FFC0CB',
  'Ler': '808080',
  'Esporte': '525252',
  'Hard': 'FFFFFF',
  'Experiência': 'C0C0C0',
  'Top': 'EBB903',
  'Ouvir/jogar': '20C6B6',
  'Cômico': '90EE90',
  'Simples': 'ADD8E6',
  'Milestone': '6F6FE3', // Marco foi chamado de Milestone no CSV
  'Nerd': 'F5F5DC',
  'Adulto +18': null,
  'Premium': null,
};

// Função para ler e parsear o CSV
function parseCSV(filePath: string): any[] {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n');
  const headers = lines[0].split(',');
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue; // Pula linhas vazias
    
    const values = lines[i].split(',');
    const row: any = {};
    
    headers.forEach((header, index) => {
      row[header.trim()] = values[index]?.trim() || null;
    });
    
    data.push(row);
  }
  
  return data;
}

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // 1. Criar categorias
  console.log('📂 Criando categorias...');
  const categories = Object.keys(categoryColorMap);
  
  for (const categoryName of categories) {
    await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: {
        name: categoryName,
        color: categoryColorMap[categoryName],
      },
    });
  }
  
  console.log(`✅ ${categories.length} categorias criadas/atualizadas`);

  // 2. Ler o CSV
const csvPath = "C:/Projetos/Destinote/Uploads/1000 Main - online - Lista Principal.csv"
  console.log(`📖 Lendo CSV de ${csvPath}...`);
  const csvData = parseCSV(csvPath);
  console.log(`✅ ${csvData.length} linhas lidas do CSV`);

  // 3. Criar goals
  console.log('🎯 Criando goals...');
  let createdCount = 0;
  
  for (let i = 0; i < csvData.length; i++) {
    const row = csvData[i];
    
    // Validar que tem pelo menos título e categoria
    if (!row.Title || !row.Categories) continue;
    
    // Buscar a categoria no banco
    const category = await prisma.category.findUnique({
      where: { name: row.Categories },
    });
    
    if (!category) {
      console.warn(`⚠️  Categoria não encontrada: ${row.Categories} para goal: ${row.Title}`);
      continue;
    }
    
    // Determinar se é top 10 (primeiros 10 itens)
    const isTopTen = i < 10;
    
    // Criar goal
    await prisma.goal.create({
      data: {
        title: row.Title,
        local: row['Local (opcional)'] || null,
        categoryId: category.id,
        cod2: row['Cod 2'] || null,
        cod3: row['Cod 3'] || null,
        refBase: row['REF base'] ? parseInt(row['REF base']) : null,
        isTopTen,
        // Placeholder de imagem para os top 10
        imageUrl: isTopTen ? `/images/placeholder-${i + 1}.jpg` : null,
        description: null, // Pode ser expandido futuramente
      },
    });
    
    createdCount++;
    
    // Log de progresso a cada 100 itens
    if (createdCount % 100 === 0) {
      console.log(`   📝 ${createdCount} goals criados...`);
    }
  }
  
  console.log(`✅ ${createdCount} goals criados com sucesso!`);

  // 4. Estatísticas finais
  const totalCategories = await prisma.category.count();
  const totalGoals = await prisma.goal.count();
  const topTenGoals = await prisma.goal.count({ where: { isTopTen: true } });
  
  console.log('\n📊 Estatísticas do banco de dados:');
  console.log(`   📂 Categorias: ${totalCategories}`);
  console.log(`   🎯 Goals totais: ${totalGoals}`);
  console.log(`   ⭐ Top 10 goals: ${topTenGoals}`);
  console.log('\n✨ Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
