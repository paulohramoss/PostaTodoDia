# PostaTodoDia

Aplicação SaaS-like para gerar conteúdo de Instagram (stories, posts, carrosséis, reels, calendário e ideias rápidas), salvar histórico local e copiar textos prontos.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Prisma + SQLite

## Como rodar
1. Instale dependências:
```bash
npm install
```
2. Copie variáveis:
```bash
cp .env.example .env
```
3. Gere o client do Prisma:
```bash
npm run prisma:generate
```
4. Rode migração inicial:
```bash
npm run prisma:migrate
```
5. Suba o projeto:
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Estrutura
- `src/app`: páginas (landing, dashboard, gerar, histórico)
- `src/components`: componentes reutilizáveis
- `src/lib/generate-content.ts`: motor local de geração
- `src/server/actions/content-actions.ts`: ações para salvar/listar/excluir
- `prisma/schema.prisma`: modelagem SQLite
