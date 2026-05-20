# PostaTodoDia

Gerador de conteúdo para Instagram com IA — posts, stories, reels, carrosseis e muito mais, personalizados para o seu nicho.

## Tecnologias

- Next.js 15 (App Router)
- TypeScript
- Prisma + SQLite
- Tailwind CSS
- Gemini API (texto + imagem generativa)

## Configuração

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas chaves:

```bash
cp .env.example .env
```

Abra o `.env` e preencha:

```env
DATABASE_URL="file:./dev.db"
GEMINI_API_KEY="..."
GEMINI_IMAGE_MODEL="imagen-4.0-generate-001"
```

> **Como obter sua chave Gemini:**
> 1. Acesse [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
> 2. Faça login ou crie uma conta
> 3. Crie uma nova API key
> 4. Copie a chave e cole no `.env`

### 3. Configure o banco de dados

```bash
npx prisma migrate dev --name init
```

### 4. Inicie o servidor

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## Como funciona a geração com IA

Quando você clica em **"Gerar com IA"**, o app:

1. Monta um prompt estratégico usando o **template do seu nicho**
2. Envia para o Gemini via **Server Action** (a chave nunca sai do servidor)
3. Valida o JSON retornado com **Zod**
4. Gera uma imagem generativa para o preview visual do Instagram
5. Exibe o conteúdo formatado pronto para copiar e postar, junto com o mockup de Stories, Reels, Post ou Carrossel

Se a `GEMINI_API_KEY` não estiver configurada ou a IA falhar, o app usa automaticamente o **gerador local** como fallback e exibe um aviso na tela. Se apenas a imagem falhar, o conteúdo continua disponível e o preview usa uma composição local.

---

## Templates por nicho

O app tem templates estratégicos para 12 nichos:

| Nicho | CTA padrão |
|---|---|
| Corretor de imóveis | IMÓVEL |
| Imobiliária | IMÓVEL |
| Personal trainer | TREINO |
| Nutricionista | DIETA |
| Clínica de estética | ESTÉTICA |
| Loja de roupas | MODA |
| Social media | SOCIAL |
| Mentor/infoprodutor | MENTORIA |
| Barbearia | CORTE |
| Restaurante | CARDÁPIO |
| Prestador de serviço | SERVIÇO |
| Outro | (baseado no produto) |

Cada template define o perfil do público, as dores mais comuns, os ângulos de conteúdo que funcionam, CTAs testados e frases/abordagens a evitar — tudo isso é injetado no prompt da IA.

---

## Estrutura do projeto

```
src/
├── app/               # Páginas Next.js (App Router)
├── components/        # Componentes reutilizáveis
├── lib/
│   ├── ai/            # Integração Gemini
│   │   ├── build-prompt.ts       # Monta o prompt estratégico
│   │   ├── generate-with-ai.ts   # Chama a API e valida com Zod
│   │   └── generate-visual-preview.ts # Gera imagem de preview
│   ├── templates/     # Templates por nicho
│   │   ├── niches.ts             # Dados dos 12 nichos
│   │   └── get-template-by-niche.ts
│   └── generate-content.ts       # Fallback local
├── server/actions/    # Server Actions (backend)
└── types/             # Tipos TypeScript
```

---

## Segurança

- A `GEMINI_API_KEY` é lida apenas no servidor (Server Action)
- Nunca é exposta no frontend ou nos logs do cliente
- O `.env` está no `.gitignore` — nunca commite suas chaves
