import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';
import type { GenerateInput, GeneratedContent } from '@/types/content';
import { buildPrompt } from './build-prompt';

// ── Zod schemas per format ────────────────────────────────────────────────────

const StoriesSchema = z.object({
  format: z.literal('Stories'),
  title: z.string().min(1),
  items: z.array(z.object({
    story: z.number(),
    objective: z.string().min(1),
    text: z.string().min(1),
    visualSuggestion: z.string().min(1),
  })).min(3).max(10),
  cta: z.string().min(1),
});

const PostSchema = z.object({
  format: z.literal('Post'),
  title: z.string().min(1),
  caption: z.string().min(10),
  cta: z.string().min(1),
  hashtags: z.array(z.string()).min(1).max(30),
  imageSuggestion: z.string().min(1),
});

const CarrosselSchema = z.object({
  format: z.literal('Carrossel'),
  title: z.string().min(1),
  slides: z.array(z.object({
    slide: z.number(),
    title: z.string().min(1),
    text: z.string().min(1),
  })).min(3).max(12),
  cta: z.string().min(1),
});

const ReelsSchema = z.object({
  format: z.literal('Reels'),
  hook: z.string().min(1),
  scenes: z.array(z.object({
    scene: z.number(),
    visual: z.string().min(1),
    spokenText: z.string().min(1),
    screenText: z.string().min(1),
  })).min(2).max(8),
  cta: z.string().min(1),
});

const CalendarioSchema = z.object({
  format: z.literal('Calendário semanal'),
  days: z.array(z.object({
    day: z.string().min(1),
    theme: z.string().min(1),
    format: z.string().min(1),
    caption: z.string().min(1),
    objective: z.string().min(1),
  })).length(7),
});

const IdeiasSchema = z.object({
  format: z.literal('Ideias rápidas'),
  ideas: z.array(z.object({
    title: z.string().min(1),
    angle: z.string().min(1),
    suggestedFormat: z.string().min(1),
  })).min(10).max(20),
});

function validateContent(raw: unknown, format: string): GeneratedContent {
  switch (format) {
    case 'Stories':            return StoriesSchema.parse(raw) as GeneratedContent;
    case 'Post':               return PostSchema.parse(raw) as GeneratedContent;
    case 'Carrossel':          return CarrosselSchema.parse(raw) as GeneratedContent;
    case 'Reels':              return ReelsSchema.parse(raw) as GeneratedContent;
    case 'Calendário semanal': return CalendarioSchema.parse(raw) as GeneratedContent;
    case 'Ideias rápidas':     return IdeiasSchema.parse(raw) as GeneratedContent;
    default: throw new Error(`Formato desconhecido: ${format}`);
  }
}

// ── Main function ─────────────────────────────────────────────────────────────

export async function generateWithAI(input: GenerateInput): Promise<GeneratedContent> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY não configurada');

  const { systemPrompt, userPrompt } = buildPrompt(input);

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: 'application/json',
      temperature: 0.85,
      maxOutputTokens: 2048,
    },
    contents: userPrompt,
  });

  const raw = response.text;
  if (!raw) throw new Error('Resposta vazia do Gemini');

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('Gemini retornou JSON inválido');
  }

  if (typeof parsed === 'object' && parsed !== null) {
    (parsed as Record<string, unknown>).format = input.format;
  }

  return validateContent(parsed, input.format);
}
