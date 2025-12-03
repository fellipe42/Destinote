# ✅ CHECKLIST DE TESTES - SPRINT 1

Use este checklist para verificar que todas as correções estão funcionando corretamente.

---

## 🔧 Pré-Instalação

- [ ] Backup do projeto atual feito
- [ ] Node.js 18+ instalado
- [ ] Arquivos baixados/copiados

---

## 📦 Instalação

- [ ] Navegado até pasta do projeto no terminal
- [ ] Executado `npm install` com sucesso
- [ ] Executado `npm run dev` sem erros
- [ ] Aberto `http://localhost:3000` no navegador

---

## ✅ CORREÇÃO #1: Tela Preta Removida

**Como testar:**
1. [ ] Abrir a página
2. [ ] Rolar até aproximadamente 60% da página
3. [ ] **✅ ESPERADO:** Globo aparece transparente sobre backgrounds coloridos
4. [ ] **❌ ERRO:** Se aparecer tela azul escura/preta, o arquivo não foi substituído

**Status:** ⬜ Passou ⬜ Falhou

---

## ✅ CORREÇÃO #2: Cards Sem Pulos

**Como testar:**
1. [ ] Rolar até seção "Todos os Objetivos"
2. [ ] Observar cards aparecendo na tela
3. [ ] **✅ ESPERADO:** Cards aparecem suavemente com fade-in
4. [ ] **❌ ERRO:** Se cards "pularem" ou tiverem animação brusca, verificar page.tsx

**Status:** ⬜ Passou ⬜ Falhou

---

## ✅ CORREÇÃO #3: Categoria Reposicionada

**Como testar:**
1. [ ] Passar mouse sobre qualquer card regular
2. [ ] Aguardar ~300ms
3. [ ] **✅ ESPERADO:** Badge de categoria aparece ao lado do ID no TOPO (#123 [Categoria])
4. [ ] **❌ ERRO:** Se categoria aparecer embaixo, arquivo não foi substituído

**Testar também Top 10:**
1. [ ] Passar mouse sobre card Top 10
2. [ ] Aguardar ~1 segundo
3. [ ] **✅ ESPERADO:** Categoria aparece ao lado do ID

**Status:** ⬜ Passou ⬜ Falhou

---

## ✅ CORREÇÃO #4: Local ao Lado do Título

**Como testar (títulos curtos):**
1. [ ] Procurar card com título curto E local definido
2. [ ] **✅ ESPERADO:** 📍 + local aparece ao lado direito do título (mesma linha)

**Como testar (títulos longos):**
1. [ ] Procurar card com título longo
2. [ ] **✅ ESPERADO:** 📍 + local aparece em linha separada abaixo do título

**Status:** ⬜ Passou ⬜ Falhou

---

## ✅ CORREÇÃO #5: Parallax 3D Melhorado

**Como testar:**
1. [ ] Passar mouse sobre um card regular (não Top 10)
2. [ ] Mover mouse devagar ao redor do card
3. [ ] **✅ ESPERADO:** Card inclina em 3D seguindo o mouse
4. [ ] **✅ ESPERADO:** Sensação de "card flutuando no espaço"
5. [ ] **✅ ESPERADO:** Rotação visível nos eixos X e Y

**Status:** ⬜ Passou ⬜ Falhou

---

## ✅ CORREÇÃO #6: Cards Arredondados

**Como testar:**
1. [ ] Observar cantos de qualquer card
2. [ ] **✅ ESPERADO:** Cantos bem arredondados (efeito "nuvem")
3. [ ] **✅ ESPERADO:** Border-radius de ~24px para cards regulares

**Status:** ⬜ Passou ⬜ Falhou

---

## ✅ CORREÇÃO #7: Padding Reduzido

**Como testar:**
1. [ ] Comparar visualmente cards regulares com Top 10
2. [ ] **✅ ESPERADO:** Cards regulares mais compactos verticalmente
3. [ ] **✅ ESPERADO:** Mais cards visíveis na tela ao mesmo tempo
4. [ ] **✅ ESPERADO:** Cards Top 10 mantêm padding maior

**Status:** ⬜ Passou ⬜ Falhou

---

## ✅ CORREÇÃO #8: Scroll Infinito

**Como testar:**
1. [ ] Abrir DevTools (F12) → Tab "Network" ou "Console"
2. [ ] Rolar até "Todos os Objetivos"
3. [ ] **✅ ESPERADO:** Aparecem inicialmente apenas ~20 cards
4. [ ] Continuar rolando
5. [ ] **✅ ESPERADO:** Mensagem "Carregando mais objetivos..." aparece
6. [ ] **✅ ESPERADO:** Novos 20 cards carregam suavemente
7. [ ] Rolar até o final
8. [ ] **✅ ESPERADO:** Mensagem "✨ Você viu todos os XXX objetivos! ✨"
9. [ ] **✅ ESPERADO:** Contador mostra "(mostrando X de Y)"

**Teste de Performance:**
1. [ ] Abrir DevTools → Performance tab
2. [ ] Recarregar página
3. [ ] **✅ ESPERADO:** Carregamento inicial rápido (~0.5s)
4. [ ] **❌ ERRO:** Se demorar >3s, todos os cards podem estar sendo renderizados

**Status:** ⬜ Passou ⬜ Falhou

---

## ✅ CORREÇÃO #9: Globo Girando Sozinho

**Como testar:**
1. [ ] Rolar até aproximadamente 60-80% da página
2. [ ] Aguardar globo aparecer
3. [ ] **PARAR DE ROLAR** (importante!)
4. [ ] Observar o globo por ~10 segundos
5. [ ] **✅ ESPERADO:** Globo continua girando lentamente sozinho
6. [ ] Voltar a rolar
7. [ ] **✅ ESPERADO:** Rotação do scroll se combina com rotação automática

**Velocidade esperada:**
- 1 volta completa a cada ~30 segundos
- Rotação suave e contínua

**Status:** ⬜ Passou ⬜ Falhou

---

## ✅ CORREÇÃO #10: Transições Suaves de Background

**Como testar:**
1. [ ] Rolar a página LENTAMENTE do início ao fim
2. [ ] Prestar atenção nas mudanças de imagem de fundo
3. [ ] **✅ ESPERADO:** Transições suaves e graduais (~2 segundos)
4. [ ] **✅ ESPERADO:** Leve blur durante a troca de imagem
5. [ ] **✅ ESPERADO:** Crossfade entre backgrounds (uma imagem "derrete" na outra)
6. [ ] **❌ ERRO:** Se houver momentos de "tela preta" entre backgrounds

**Backgrounds esperados:**
- 0-25%: Pôr do sol (bg-1)
- 25-100%: Ciclo entre bg-2, bg-3, bg-4, bg-5

**Status:** ⬜ Passou ⬜ Falhou

---

## 🎨 Testes Visuais Gerais

- [ ] **Layout:** Tudo alinhado corretamente
- [ ] **Responsividade:** Testar em janela redimensionada
- [ ] **Cores:** Badges de categoria com cores corretas
- [ ] **Imagens:** Todas as imagens carregam
- [ ] **Texto:** Sem texto cortado ou sobreposto
- [ ] **Hover:** Todos os efeitos de hover funcionam
- [ ] **Cliques:** Cards abrem modal corretamente

---

## 🐛 Teste de Erros

**Abrir Console (F12):**
- [ ] **✅ ESPERADO:** Sem erros vermelhos no console
- [ ] **✅ ESPERADO:** Sem warnings críticos

**Se houver erros:**
1. [ ] Verificar que todos os 4 arquivos foram substituídos
2. [ ] Executar `npm install` novamente
3. [ ] Limpar cache: `npm cache clean --force`
4. [ ] Recarregar página em modo incógnito

---

## 📊 Teste de Performance

**DevTools → Performance:**
1. [ ] Recarregar página com Performance recording
2. [ ] **✅ ESPERADO:** FPS estável (~60fps)
3. [ ] **✅ ESPERADO:** Sem lag durante scroll
4. [ ] **✅ ESPERADO:** Memória estável (não cresce indefinidamente)

**Lighthouse (opcional):**
1. [ ] Rodar Lighthouse audit
2. [ ] **✅ META:** Performance > 80
3. [ ] **✅ META:** Accessibility > 90

---

## 🌐 Testes em Diferentes Navegadores

- [ ] **Chrome:** Tudo funciona
- [ ] **Firefox:** Tudo funciona
- [ ] **Edge:** Tudo funciona
- [ ] **Safari (Mac):** Tudo funciona

---

## 📱 Teste Responsivo

**Tamanhos de tela:**
- [ ] **Desktop (>1200px):** Layout correto
- [ ] **Tablet (768-1200px):** Layout adaptado
- [ ] **Mobile (<768px):** Layout mobile funcional

---

## ✅ RESULTADO FINAL

### Aprovado ✅
- [ ] Todas as 10 correções passaram
- [ ] Sem erros no console
- [ ] Performance satisfatória
- [ ] Visual consistente

### Problemas Encontrados ⚠️
Liste aqui qualquer problema:
1. _____________________________
2. _____________________________
3. _____________________________

---

## 📝 Notas Adicionais

Use este espaço para anotar observações:

```
_______________________________________________
_______________________________________________
_______________________________________________
_______________________________________________
_______________________________________________
```

---

## 🎉 Conclusão

Se todos os itens acima foram marcados como "Passou":

**🎊 PARABÉNS! A Sprint 1 foi implementada com sucesso! 🎊**

Caso tenha encontrado problemas, consulte:
- `SPRINT1_CHANGES.md` → Seção "Troubleshooting"
- `LEIA-ME_SPRINT1.txt` → Seção "Problemas Comuns"

---

**Data do Teste:** _____________________  
**Testador:** _____________________  
**Navegador/OS:** _____________________  
**Resultado:** ⬜ Aprovado ⬜ Reprovado  
